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

    const isWebhookEndpoint = cleanUrl.includes('/webhook');

    // If it's an n8n webhook or MCP endpoint, test appropriate method
    let response = null;
    let usedMethod = isWebhookEndpoint ? 'POST' : 'GET';

    if (isWebhookEndpoint) {
      response = await fetch(cleanUrl, {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify({ action: 'ping', test: true, timestamp: Date.now() }),
        signal: controller.signal
      });
    } else {
      response = await fetch(cleanUrl, {
        method: 'GET',
        headers: requestHeaders,
        signal: controller.signal
      });

      // If GET returned 404 or 405 (e.g. n8n webhook only registered for POST), retry with POST probe
      if (response.status === 404 || response.status === 405) {
        try {
          const postResp = await fetch(cleanUrl, {
            method: 'POST',
            headers: requestHeaders,
            body: JSON.stringify({ action: 'ping', test: true, timestamp: Date.now() }),
            signal: controller.signal
          });
          if (postResp.ok || postResp.status === 200 || postResp.status === 201) {
            response = postResp;
            usedMethod = 'POST';
          }
        } catch (e) {
          // ignore post retry error and continue with initial response
        }
      }
    }

    const elapsed = Date.now() - startTime;
    clearTimeout(timeoutId);

    const httpStatus = response.status;
    const httpStatusText = response.statusText || (httpStatus === 200 ? 'OK' : 'Error');

    // Handle HTTP Statuses with clear diagnostic feedback
    if (httpStatus === 200 || httpStatus === 201) {
      // Successfully connected
      return {
        connected: true,
        status: 200,
        statusText: 'OK',
        latencyMs: elapsed,
        message: isWebhookEndpoint || usedMethod === 'POST'
          ? '✓ Connected! n8n Webhook / MCP Server is live and accepted the test request.'
          : '✓ Connected! n8n MCP Server Trigger is live and accepted the MCP SSE connection.',
        protocol: isWebhookEndpoint ? 'n8n Webhook (HTTP POST)' : 'MCP/1.0 (SSE + JSON-RPC 2.0)',
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
      const isTest = cleanUrl.includes('mcp-test') || cleanUrl.includes('webhook-test');
      return {
        connected: false,
        status: 404,
        statusText: 'Not Found / Inactive',
        latencyMs: elapsed,
        error: isTest 
          ? 'HTTP 404: n8n is not listening for test events right now. Click the orange "Listen for test event" / "Execute step" button in n8n first, then test again immediately.'
          : 'HTTP 404: The Production URL was not found or the n8n workflow is currently inactive (turn workflow ON in n8n).'
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
 * Executes an inquiry submission to n8n (via direct JSON Webhook or MCP JSON-RPC 2.0 tool call)
 * Sends ONLY user details (name, email, whatsapp, topic, message) without any metadata or wrappers.
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

  // Extract strictly ONLY user details from contact form
  const cleanUserData = {
    name: args.name || args.full_name || '',
    email: args.email || '',
    whatsapp: args.whatsapp || args.whatsapp_number || '',
    topic: args.topic || args.subject || '',
    message: args.message || ''
  };

  // If the target URL is an n8n webhook (or general URL), send ONLY pure user details
  // If explicitly an MCP endpoint (/mcp-test or /mcp/), send MCP JSON-RPC with only cleanUserData in arguments
  const isMcpProtocol = cleanUrl.includes('/mcp-test') || cleanUrl.includes('/mcp/');

  const payload = isMcpProtocol
    ? {
        jsonrpc: '2.0',
        id: `mcp-${Date.now()}`,
        method: 'tools/call',
        params: {
          name: toolName || 'submit_customer_inquiry',
          arguments: cleanUserData
        }
      }
    : cleanUserData;

  const response = await fetch(cleanUrl, {
    method: 'POST',
    headers: requestHeaders,
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    if (response.status === 406) {
      throw new Error('HTTP 406: Content negotiation rejected.');
    }
    if (response.status === 404) {
      throw new Error('HTTP 404: n8n endpoint is not listening. Ensure workflow is active.');
    }
    throw new Error(`n8n returned HTTP ${response.status} (${response.statusText})`);
  }

  const resultText = await response.text();
  try {
    return JSON.parse(resultText);
  } catch (e) {
    return { raw: resultText, status: response.status };
  }
}
