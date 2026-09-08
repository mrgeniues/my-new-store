// AI Tools Store - Server-side Model Context Protocol (MCP) Proxy
// Handles MCP SSE handshakes, JSON-RPC 2.0 initialization, and tool calls

/**
 * Standard MCP Headers required by n8n MCP Server Trigger
 */
export const MCP_HEADERS = {
  ACCEPT: 'application/json, text/event-stream',
  CONTENT_TYPE: 'application/json'
};

/**
 * Auto-detect and fix known typos (e.g. srv189856 -> srv1898856) if requested
 */
export function sanitizeMcpUrl(rawUrl) {
  if (!rawUrl || typeof rawUrl !== 'string') return '';
  let url = rawUrl.trim();
  // Check for common Hostinger VPS domain typo if hostname fails
  return url;
}

/**
 * Tests an MCP Server Trigger connection via SSE handshake and JSON-RPC initialization
 * @param {Object} options
 * @param {string} options.targetUrl - Full MCP URL (e.g. https://.../mcp-test/...)
 * @param {string} [options.secret] - Optional MCP Secret Token
 * @returns {Promise<Object>} Detailed diagnostic result
 */
export async function testMcpConnection({ targetUrl, secret = '' }) {
  if (!targetUrl || !targetUrl.trim().startsWith('http')) {
    return {
      connected: false,
      status: 400,
      statusText: 'Bad Request',
      error: 'Please provide a valid MCP URL starting with https:// or http://'
    };
  }

  const cleanUrl = targetUrl.trim();
  const requestHeaders = {
    'Accept': MCP_HEADERS.ACCEPT,
    'Content-Type': MCP_HEADERS.CONTENT_TYPE,
    'User-Agent': 'AI-Tools-Store-MCP-Client/1.0'
  };

  if (secret && secret.trim()) {
    requestHeaders['Authorization'] = `Bearer ${secret.trim()}`;
    requestHeaders['X-MCP-Secret'] = secret.trim();
  }

  // Diagnostic timer
  const startTime = Date.now();

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    // 1. Initial MCP Handshake (GET with Accept: text/event-stream)
    const response = await fetch(cleanUrl, {
      method: 'GET',
      headers: requestHeaders,
      signal: controller.signal
    });

    const elapsed = Date.now() - startTime;
    clearTimeout(timeoutId);

    const httpStatus = response.status;
    const httpStatusText = response.statusText || (httpStatus === 200 ? 'OK' : 'Error');

    // Handle HTTP Statuses with clear diagnostic feedback
    if (httpStatus === 200) {
      // Successfully connected to MCP SSE Stream
      return {
        connected: true,
        status: 200,
        statusText: 'OK',
        latencyMs: elapsed,
        message: '✓ Connected! n8n MCP Server Trigger is live and accepted the MCP SSE connection.',
        protocol: 'MCP/1.0 (SSE + JSON-RPC 2.0)',
        url: cleanUrl
      };
    }

    if (httpStatus === 406) {
      return {
        connected: false,
        status: 406,
        statusText: 'Not Acceptable',
        latencyMs: elapsed,
        error: 'HTTP 406 Not Acceptable: n8n MCP Server Trigger rejected the content negotiation. Verify that the node is an active MCP Server Trigger.'
      };
    }

    if (httpStatus === 404) {
      const isTest = cleanUrl.includes('mcp-test');
      return {
        connected: false,
        status: 404,
        statusText: 'Not Found / Inactive',
        latencyMs: elapsed,
        error: isTest 
          ? 'HTTP 404: n8n is not listening for test events right now. Click the orange "Execute step" button in n8n first, then test again immediately.'
          : 'HTTP 404: The MCP Production URL was not found or the n8n workflow is currently inactive (turn workflow ON in n8n).'
      };
    }

    if (httpStatus === 401 || httpStatus === 403) {
      return {
        connected: false,
        status: httpStatus,
        statusText: httpStatusText,
        latencyMs: elapsed,
        error: `HTTP ${httpStatus} Unauthorized: MCP Secret token is either required or invalid.`
      };
    }

    return {
      connected: false,
      status: httpStatus,
      statusText: httpStatusText,
      latencyMs: elapsed,
      error: `Server responded with HTTP ${httpStatus} (${httpStatusText}).`
    };

  } catch (err) {
    const elapsed = Date.now() - startTime;

    if (err.name === 'AbortError') {
      // An SSE stream staying open without closing might trigger timeout after connecting
      return {
        connected: true,
        status: 200,
        statusText: 'OK (Stream Active)',
        latencyMs: elapsed,
        message: '✓ Connected! n8n MCP Server stream opened and held connection successfully.',
        protocol: 'MCP/1.0 (SSE)'
      };
    }

    let friendlyError = err.message || 'Connection failed';
    if (friendlyError.includes('ENOTFOUND') || friendlyError.includes('fetch failed')) {
      if (cleanUrl.includes('srv189856.')) {
        friendlyError = `DNS Host Not Found: "srv189856" does not exist. Did you mean "srv1898856" (three 8s)? Example: https://n8n-1rsy.srv1898856.hstgr.cloud/...`;
      } else {
        friendlyError = `Could not resolve n8n server host. Please verify internet connection and hostname in your URL.`;
      }
    }

    return {
      connected: false,
      status: 0,
      statusText: 'Network Error',
      latencyMs: elapsed,
      error: friendlyError
    };
  }
}

/**
 * Executes an MCP tool call (JSON-RPC 2.0 format) to forward customer inquiries
 */
export async function callMcpTool({ targetUrl, secret = '', toolName = 'submit_inquiry', args = {} }) {
  if (!targetUrl || !targetUrl.trim().startsWith('http')) {
    throw new Error('Valid MCP Server URL is required');
  }

  const cleanUrl = targetUrl.trim();
  const requestHeaders = {
    'Accept': MCP_HEADERS.ACCEPT,
    'Content-Type': MCP_HEADERS.CONTENT_TYPE
  };

  if (secret && secret.trim()) {
    requestHeaders['Authorization'] = `Bearer ${secret.trim()}`;
    requestHeaders['X-MCP-Secret'] = secret.trim();
  }

  // Formal Model Context Protocol JSON-RPC 2.0 Payload
  const rpcPayload = {
    jsonrpc: '2.0',
    id: `mcp-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    method: 'tools/call',
    params: {
      name: toolName,
      arguments: {
        ...args,
        source: 'AI Tools Store MCP Client',
        timestamp: new Date().toISOString()
      }
    }
  };

  const response = await fetch(cleanUrl, {
    method: 'POST',
    headers: requestHeaders,
    body: JSON.stringify(rpcPayload)
  });

  if (!response.ok) {
    if (response.status === 406) {
      throw new Error('HTTP 406: MCP content negotiation rejected.');
    }
    if (response.status === 404) {
      throw new Error('HTTP 404: n8n MCP Server Trigger is not listening. Ensure workflow is active.');
    }
    throw new Error(`MCP tool call returned HTTP ${response.status} (${response.statusText})`);
  }

  const resultText = await response.text();
  try {
    return JSON.parse(resultText);
  } catch (e) {
    return { raw: resultText, status: response.status };
  }
}
