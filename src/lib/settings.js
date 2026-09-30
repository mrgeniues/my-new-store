// AI Tools Store - Global App Settings Service (n8n Webhook, MCP & WhatsApp)
import { defaultWhatsappUrl, supabase, getEnv } from './supabase.js';
import { mcpClient } from './mcpClient.js';

export const APP_SETTINGS_KEY = 'ai_tools_app_settings_v1';
export const DEFAULT_MCP_PRODUCTION_URL = 'https://n8n-1rsy.srv1898856.hstgr.cloud/webhook/0ea23bd6-b764-4bb3-a258-c6ab9969560f';
export const DEFAULT_MCP_TEST_URL = 'https://n8n-1rsy.srv1898856.hstgr.cloud/webhook-test/0ea23bd6-b764-4bb3-a258-c6ab9969560f';

export function getAppSettings() {
  try {
    const raw = localStorage.getItem(APP_SETTINGS_KEY);
    const parsed = raw ? JSON.parse(raw) : {};

    // Auto-migrate legacy dead test URLs
    let activeUrl = parsed.mcpWebhookUrl || DEFAULT_MCP_PRODUCTION_URL;
    if (activeUrl.includes('69318bf8-f20c-4dab-91cf-604c84ce94b1') || activeUrl.includes('srv189856.')) {
      activeUrl = DEFAULT_MCP_PRODUCTION_URL;
    }

    const defaultNewUserWebhook = getEnv('VITE_N8N_NEW_USER_WEBHOOK_URL', '');

    const settings = {
      mcpWebhookUrl: activeUrl,
      mcpUrlType: parsed.mcpUrlType || (activeUrl.includes('-test') ? 'test' : 'production'),
      mcpSecretKey: parsed.mcpSecretKey || '',
      newUserWebhookUrl: parsed.newUserWebhookUrl || defaultNewUserWebhook || '',
      newUserWebhookEnabled: parsed.newUserWebhookEnabled !== false,
      aiAgentEnabled: parsed.aiAgentEnabled !== false,
      aiAgentWebhookUrl: parsed.aiAgentWebhookUrl || '',
      adminWhatsappNumber: parsed.adminWhatsappNumber || '',
      adminWhatsappUrl: parsed.adminWhatsappUrl || defaultWhatsappUrl || '',
      globalDiscountPercent: parsed.globalDiscountPercent !== undefined ? parseInt(parsed.globalDiscountPercent, 10) : 0,
      globalDiscountActive: parsed.globalDiscountActive === true
    };

    // Synchronize global mcpClient
    mcpClient.setServerUrl(settings.mcpWebhookUrl);
    mcpClient.setSecretKey(settings.mcpSecretKey);

    return settings;
  } catch (e) {
    return {
      mcpWebhookUrl: DEFAULT_MCP_PRODUCTION_URL,
      mcpUrlType: 'production',
      mcpSecretKey: '',
      newUserWebhookUrl: getEnv('VITE_N8N_NEW_USER_WEBHOOK_URL', ''),
      newUserWebhookEnabled: true,
      aiAgentEnabled: true,
      aiAgentWebhookUrl: '',
      adminWhatsappNumber: '',
      adminWhatsappUrl: defaultWhatsappUrl || '',
      globalDiscountPercent: 0,
      globalDiscountActive: false
    };
  }
}

export function saveAppSettings(newSettings) {
  const current = getAppSettings();
  const merged = { ...current, ...newSettings };
  try {
    localStorage.setItem(APP_SETTINGS_KEY, JSON.stringify(merged));
    // Synchronize global mcpClient
    mcpClient.setServerUrl(merged.mcpWebhookUrl);
    mcpClient.setSecretKey(merged.mcpSecretKey);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('ai_tools_settings_changed', { detail: merged }));
    }

    // Optionally sync to Supabase app_settings table if it exists
    if (supabase) {
      supabase.from('app_settings').upsert({
        id: 'global',
        new_user_webhook_url: merged.newUserWebhookUrl || '',
        new_user_webhook_enabled: merged.newUserWebhookEnabled !== false,
        ai_agent_enabled: merged.aiAgentEnabled !== false,
        ai_agent_webhook_url: merged.aiAgentWebhookUrl || '',
        mcp_webhook_url: merged.mcpWebhookUrl || '',
        mcp_secret_key: merged.mcpSecretKey || '',
        admin_whatsapp_number: merged.adminWhatsappNumber || '',
        admin_whatsapp_url: merged.adminWhatsappUrl || '',
        global_discount_percent: merged.globalDiscountPercent || 0,
        global_discount_active: merged.globalDiscountActive === true,
        updated_at: new Date().toISOString()
      }).then(({ error }) => {
        if (error && !error.message?.includes('does not exist')) {
          console.warn('[Settings] Supabase settings sync notice:', error.message);
        }
      }).catch(() => {});
    }
  } catch (e) {
    console.warn('[Settings] Failed to save settings to localStorage:', e);
  }
  return merged;
}

// Background sync from Supabase app_settings table
export async function syncAppSettingsFromSupabase() {
  if (!supabase) return;
  try {
    const { data, error } = await supabase
      .from('app_settings')
      .select('*')
      .eq('id', 'global')
      .maybeSingle();

    if (!error && data) {
      const current = getAppSettings();
      const updated = {
        ...current,
        newUserWebhookUrl: data.new_user_webhook_url || current.newUserWebhookUrl,
        newUserWebhookEnabled: data.new_user_webhook_enabled !== undefined ? data.new_user_webhook_enabled : current.newUserWebhookEnabled,
        aiAgentEnabled: data.ai_agent_enabled !== undefined ? data.ai_agent_enabled : current.aiAgentEnabled,
        aiAgentWebhookUrl: data.ai_agent_webhook_url || current.aiAgentWebhookUrl,
        mcpWebhookUrl: data.mcp_webhook_url || current.mcpWebhookUrl,
        mcpSecretKey: data.mcp_secret_key || current.mcpSecretKey,
        adminWhatsappNumber: data.admin_whatsapp_number || current.adminWhatsappNumber,
        adminWhatsappUrl: data.admin_whatsapp_url || current.adminWhatsappUrl,
        globalDiscountPercent: data.global_discount_percent !== undefined ? data.global_discount_percent : current.globalDiscountPercent,
        globalDiscountActive: data.global_discount_active !== undefined ? data.global_discount_active : current.globalDiscountActive
      };
      localStorage.setItem(APP_SETTINGS_KEY, JSON.stringify(updated));
      mcpClient.setServerUrl(updated.mcpWebhookUrl);
      mcpClient.setSecretKey(updated.mcpSecretKey);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('ai_tools_settings_changed', { detail: updated }));
      }
    }
  } catch (e) {
    // Silent ignore if table not created
  }
}

// Delegate test to proper McpClient
export async function testMcpWebhook(url, secret = '') {
  return await mcpClient.testConnection(url, secret);
}

/**
 * Tests the n8n New User Registration Webhook
 * @param {string} rawUrl - Full n8n webhook URL
 * @returns {Promise<Object>} Diagnostic result { success, status, message }
 */
export async function testNewUserWebhook(rawUrl) {
  const url = (rawUrl || '').trim();
  if (!url || !url.startsWith('http')) {
    return {
      success: false,
      status: 400,
      message: 'Please provide a valid n8n Webhook URL starting with https:// or http://'
    };
  }

  const testPayload = {
    event: 'user.signup',
    test: true,
    user_id: 'test-' + Math.random().toString(36).substring(2, 10),
    full_name: 'Test Member (VIP)',
    name: 'Test Member (VIP)',
    email: 'test_user_' + Math.floor(Math.random() * 1000) + '@example.com',
    whatsapp_number: '+92 300 1234567',
    whatsapp: '+92 300 1234567',
    country: 'Pakistan',
    role: 'member',
    created_at: new Date().toISOString()
  };

  // 1. Try server-side proxy first (avoids CORS)
  try {
    const proxyRes = await fetch('/api/webhook/new-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ targetUrl: url, userData: testPayload })
    });

    if (proxyRes.ok) {
      const data = await proxyRes.json();
      if (data.success) {
        return {
          success: true,
          status: data.status || 200,
          message: '✓ Webhook connected! n8n successfully received test registration data.'
        };
      } else if (data.status === 404) {
        const isTest = url.includes('/webhook-test/');
        return {
          success: false,
          status: 404,
          message: isTest
            ? 'HTTP 404: n8n is not listening for test events right now. Click "Listen for test event" / "Execute step" in n8n first, then test again.'
            : 'HTTP 404: n8n webhook URL not found or workflow is inactive. Make sure the workflow is turned ON in n8n.'
        };
      }
    }
  } catch (proxyErr) {
    console.warn('[Settings] Proxy unavailable, attempting direct fetch...', proxyErr);
  }

  // 2. Direct client-side fetch fallback
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 7000);

    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testPayload),
      signal: controller.signal
    });
    clearTimeout(timeout);

    // If test URL gave 404, retry with production URL automatically
    if (response.status === 404 && url.includes('/webhook-test/')) {
      const prodUrl = url.replace('/webhook-test/', '/webhook/');
      try {
        const prodResp = await fetch(prodUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(testPayload)
        });
        if (prodResp.ok) response = prodResp;
      } catch {}
    }

    if (response.ok || response.status === 200 || response.status === 201) {
      return {
        success: true,
        status: response.status,
        message: '✓ Webhook connected! n8n received the test registration payload.'
      };
    }

    if (response.status === 404) {
      const isTest = url.includes('/webhook-test/');
      return {
        success: false,
        status: 404,
        message: isTest
          ? 'HTTP 404: n8n is not listening for test events. Click "Listen for test event" / "Execute step" in n8n first.'
          : 'HTTP 404: n8n webhook was not found. Please activate the workflow in n8n.'
      };
    }

    return {
      success: false,
      status: response.status,
      message: `n8n responded with HTTP ${response.status} (${response.statusText || 'Error'})`
    };
  } catch (err) {
    return {
      success: false,
      status: 0,
      message: err.name === 'AbortError' ? 'Connection timed out (7s)' : `Network / CORS error: ${err.message}`
    };
  }
}

/**
 * Triggers the n8n New User Registration Webhook
 * Called ONLY when a new user account is created.
 * @param {Object} userData - { id, fullName, email, whatsappNumber, country, role, createdAt }
 */
export async function triggerNewUserWebhook(userData) {
  const settings = getAppSettings();
  if (!settings.newUserWebhookEnabled) {
    return { skipped: true, reason: 'Webhook disabled in settings' };
  }

  const webhookUrl = (settings.newUserWebhookUrl || '').trim();
  if (!webhookUrl || !webhookUrl.startsWith('http')) {
    return { skipped: true, reason: 'No webhook URL configured' };
  }

  const payload = {
    event: 'user.signup',
    user_id: userData.id || '',
    full_name: userData.fullName || userData.name || '',
    name: userData.fullName || userData.name || '',
    email: userData.email || '',
    whatsapp_number: userData.whatsappNumber || userData.whatsapp || '',
    whatsapp: userData.whatsappNumber || userData.whatsapp || '',
    country: userData.country || 'Pakistan',
    role: userData.role || 'member',
    created_at: userData.createdAt || new Date().toISOString()
  };

  // 1. Try server-side proxy
  try {
    const proxyRes = await fetch('/api/webhook/new-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ targetUrl: webhookUrl, userData: payload })
    });

    if (proxyRes.ok) {
      const data = await proxyRes.json();
      if (data.success) {
        console.log('[NewUserWebhook] Successfully dispatched to n8n via proxy');
        return data;
      }
    }
  } catch (proxyErr) {
    console.warn('[NewUserWebhook] Proxy unavailable, attempting direct POST...', proxyErr);
  }

  // 2. Direct browser fetch fallback
  try {
    let response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    // Auto-retry with production URL if test URL returned 404
    if (response.status === 404 && webhookUrl.includes('/webhook-test/')) {
      const prodUrl = webhookUrl.replace('/webhook-test/', '/webhook/');
      response = await fetch(prodUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    }

    if (response.ok) {
      console.log('[NewUserWebhook] Successfully dispatched directly to n8n');
      return { success: true, status: response.status };
    } else {
      console.warn(`[NewUserWebhook] n8n returned HTTP ${response.status}`);
      return { success: false, status: response.status };
    }
  } catch (err) {
    console.warn('[NewUserWebhook] Direct fetch failed:', err.message);
    return { success: false, error: err.message };
  }
}

/**
 * Sends a chat message to the configured n8n AI Agent Webhook
 * @param {Object} options
 * @param {string} options.webhookUrl
 * @param {string} options.message
 * @param {string} [options.sessionId]
 * @returns {Promise<Object>} { success, responseText, error }
 */
export async function sendAiAgentMessage({ webhookUrl, message, sessionId = 'guest' }) {
  const url = (webhookUrl || '').trim();
  if (!url || !url.startsWith('http')) {
    return {
      success: false,
      responseText: 'Please configure the n8n AI Agent Webhook URL in Admin Settings to enable AI responses.'
    };
  }

  const payload = {
    message: message,
    chatInput: message,
    action: 'sendMessage',
    sessionId: sessionId,
    timestamp: new Date().toISOString()
  };

  // 1. Try local/production backend proxy first to avoid browser CORS issues
  try {
    const proxyRes = await fetch('/api/ai-agent/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ targetUrl: url, payload })
    });

    if (proxyRes.ok) {
      const data = await proxyRes.json();
      if (data && data.responseText) {
        return { success: true, responseText: data.responseText };
      }
    }
  } catch (proxyErr) {
    console.warn('[AiAgent] Proxy call failed, falling back to direct fetch:', proxyErr.message);
  }

  // 2. Direct fetch fallback
  try {
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    // Auto-retry with production URL if test URL returned 404
    if (response.status === 404 && url.includes('/webhook-test/')) {
      const prodUrl = url.replace('/webhook-test/', '/webhook/');
      response = await fetch(prodUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    }

    if (!response.ok) {
      return {
        success: false,
        responseText: `n8n webhook responded with status HTTP ${response.status}. Please check your n8n workflow execution.`
      };
    }

    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const json = await response.json();
      const reply = json.output || json.response || json.text || json.message || json.content || (typeof json === 'string' ? json : JSON.stringify(json));
      return { success: true, responseText: reply };
    } else {
      const text = await response.text();
      return { success: true, responseText: text || 'Message received by AI Agent.' };
    }
  } catch (err) {
    console.error('[AiAgent] Webhook fetch error:', err);
    return {
      success: false,
      responseText: `Could not reach n8n webhook: ${err.message}. If testing locally, ensure n8n has CORS allowed or workflow is Active.`
    };
  }
}

/**
 * Tests the n8n AI Agent Webhook connection
 */
export async function testAiAgentWebhook(rawUrl) {
  const url = (rawUrl || '').trim();
  if (!url || !url.startsWith('http')) {
    return { success: false, message: 'Please provide a valid URL starting with http:// or https://' };
  }

  const res = await sendAiAgentMessage({
    webhookUrl: url,
    message: 'Hello, this is a diagnostic test from AI Tools Store Admin Panel.',
    sessionId: 'admin-test'
  });

  if (res.success) {
    return { success: true, message: `Connected! Agent replied: "${res.responseText.slice(0, 100)}..."` };
  } else {
    return { success: false, message: res.responseText || 'Connection failed' };
  }
}

