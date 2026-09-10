// AI Tools Store - Global App Settings Service (n8n Webhook, MCP & WhatsApp)
import { defaultWhatsappUrl } from './supabase.js';
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

    const settings = {
      mcpWebhookUrl: activeUrl,
      mcpUrlType: parsed.mcpUrlType || (activeUrl.includes('-test') ? 'test' : 'production'),
      mcpSecretKey: parsed.mcpSecretKey || '',
      adminWhatsappNumber: parsed.adminWhatsappNumber || '',
      adminWhatsappUrl: parsed.adminWhatsappUrl || defaultWhatsappUrl || ''
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
      adminWhatsappNumber: '',
      adminWhatsappUrl: defaultWhatsappUrl || ''
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
  } catch (e) {
    console.warn('[Settings] Failed to save settings to localStorage:', e);
  }
  return merged;
}

// Delegate test to proper McpClient
export async function testMcpWebhook(url, secret = '') {
  return await mcpClient.testConnection(url, secret);
}

