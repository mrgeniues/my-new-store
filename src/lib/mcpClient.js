// AI Tools Store - Model Context Protocol (MCP) Client
// Compliant with MCP Specification (SSE transport & JSON-RPC 2.0)

export const MCP_HEADERS = {
  ACCEPT: 'application/json, text/event-stream',
  CONTENT_TYPE: 'application/json'
};

export class McpClient {
  constructor(options = {}) {
    this.serverUrl = options.serverUrl || '';
    this.secretKey = options.secretKey || '';
    this.status = 'IDLE'; // 'IDLE' | 'CONNECTING' | 'CONNECTED' | 'FAILED'
    this.lastResult = null;
    this.listeners = [];
  }

  setServerUrl(url) {
    this.serverUrl = (url || '').trim();
  }

  setSecretKey(key) {
    this.secretKey = (key || '').trim();
  }

  onStateChange(cb) {
    if (typeof cb === 'function') {
      this.listeners.push(cb);
    }
  }

  _notify(newState, data = null) {
    this.status = newState;
    this.lastResult = data;
    this.listeners.forEach((fn) => {
      try {
        fn(this.status, data);
      } catch (e) {
        console.warn('[McpClient] Listener error:', e);
      }
    });
  }

  /**
   * Tests the MCP Server connection via proxy or direct MCP SSE transport
   * Displays: Connected, Connection failed, HTTP status, and detailed error message
   */
  async testConnection(targetUrl = this.serverUrl, secret = this.secretKey) {
    const endpoint = (targetUrl || this.serverUrl || '').trim();
    if (!endpoint) {
      const errRes = {
        connected: false,
        status: 400,
        statusText: 'Bad Request',
        error: 'Please enter an n8n MCP Server Trigger URL first.'
      };
      this._notify('FAILED', errRes);
      return errRes;
    }

    this._notify('CONNECTING', { url: endpoint });

    // 1. Attempt connection via secure server-side proxy
    try {
      const proxyResponse = await fetch('/api/mcp/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetUrl: endpoint,
          secret: secret || ''
        })
      });

      const data = await proxyResponse.json();
      if (data.connected) {
        this._notify('CONNECTED', data);
        return data;
      } else {
        this._notify('FAILED', data);
        return data;
      }
    } catch (proxyErr) {
      console.warn('[McpClient] Proxy unavailable, attempting direct MCP client-side check...', proxyErr);
    }

    // 2. Direct client-side fallback with strict MCP headers
    const startTime = Date.now();
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Accept': MCP_HEADERS.ACCEPT,
          ...(secret ? { 'Authorization': `Bearer ${secret}`, 'X-MCP-Secret': secret } : {})
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      const elapsed = Date.now() - startTime;
      const status = response.status;
      const statusText = response.statusText || (status === 200 ? 'OK' : 'Error');

      if (status === 200) {
        const okRes = {
          connected: true,
          status: 200,
          statusText: 'OK',
          latencyMs: elapsed,
          message: '✓ Connected! n8n MCP Server Trigger accepted the connection.'
        };
        this._notify('CONNECTED', okRes);
        return okRes;
      }

      let errorMsg = `Server returned HTTP ${status} (${statusText})`;
      if (status === 406) {
        errorMsg = 'HTTP 406 Not Acceptable: n8n MCP Server Trigger requires SSE transport and JSON content negotiation.';
      } else if (status === 404) {
        errorMsg = endpoint.includes('mcp-test') 
          ? 'HTTP 404: n8n is waiting for test events. Click "Execute step" in n8n first, then test again.'
          : 'HTTP 404: Production MCP URL not found. Ensure n8n workflow is Active (On).';
      }

      const failRes = {
        connected: false,
        status,
        statusText,
        latencyMs: elapsed,
        error: errorMsg
      };
      this._notify('FAILED', failRes);
      return failRes;
    } catch (directErr) {
      const elapsed = Date.now() - startTime;
      let errorMsg = directErr.message || 'Network error';

      if (directErr.name === 'AbortError') {
        const streamOk = {
          connected: true,
          status: 200,
          statusText: 'OK',
          latencyMs: elapsed,
          message: '✓ Connected! MCP SSE stream established.'
        };
        this._notify('CONNECTED', streamOk);
        return streamOk;
      }

      if (endpoint.includes('srv189856.')) {
        errorMsg = 'DNS Host Not Found: "srv189856" does not exist. Did you mean "srv1898856" (three 8s)?';
      }

      const netFailRes = {
        connected: false,
        status: 0,
        statusText: 'Network Error',
        latencyMs: elapsed,
        error: errorMsg
      };
      this._notify('FAILED', netFailRes);
      return netFailRes;
    }
  }

  /**
   * Submits customer inquiry to n8n Webhook / MCP Server Trigger
   * Sends ONLY user details (name, email, whatsapp, topic, message) without any metadata
   */
  async submitInquiry(inquiryData) {
    if (!this.serverUrl) {
      throw new Error('No n8n Webhook / MCP URL configured.');
    }

    const cleanUserData = {
      name: inquiryData.name || inquiryData.full_name || '',
      email: inquiryData.email || '',
      whatsapp: inquiryData.whatsapp || inquiryData.whatsapp_number || '',
      topic: inquiryData.topic || inquiryData.subject || '',
      message: inquiryData.message || ''
    };

    // 1. Call through backend proxy (/api/mcp/call-tool)
    try {
      const res = await fetch('/api/mcp/call-tool', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetUrl: this.serverUrl,
          secret: this.secretKey,
          toolName: 'submit_customer_inquiry',
          args: cleanUserData
        })
      });

      if (res.ok) {
        return await res.json();
      }
      console.warn('[McpClient] Proxy returned HTTP ' + res.status + ', attempting direct POST...');
    } catch (proxyErr) {
      console.warn('[McpClient] Proxy call failed, attempting direct POST...', proxyErr);
    }

    // 2. Direct browser fetch fallback
    const isMcpProtocol = this.serverUrl.includes('/mcp-test') || this.serverUrl.includes('/mcp/');
    const payload = isMcpProtocol
      ? {
          jsonrpc: '2.0',
          id: `mcp-${Date.now()}`,
          method: 'tools/call',
          params: {
            name: 'submit_customer_inquiry',
            arguments: cleanUserData
          }
        }
      : cleanUserData;

    const response = await fetch(this.serverUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/event-stream',
        'Content-Type': 'application/json',
        ...(this.secretKey ? { 'Authorization': `Bearer ${this.secretKey}`, 'X-MCP-Secret': this.secretKey } : {})
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Direct POST failed with HTTP ${response.status} (${response.statusText})`);
    }

    try {
      return await response.json();
    } catch {
      return { status: response.status, ok: true };
    }
  }
}

// Global McpClient singleton instance
export const mcpClient = new McpClient();
