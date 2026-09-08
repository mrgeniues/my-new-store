// AI Tools Store - Global App Settings Service (n8n Webhook, MCP & WhatsApp)
import { defaultWhatsappUrl } from './supabase.js';
import { mcpClient } from './mcpClient.js';

export const APP_SETTINGS_KEY = 'ai_tools_app_settings_v1';
export const DEFAULT_MCP_TEST_URL = 'https://n8n-1rsy.srv1898856.hstgr.cloud/mcp-test/69318bf8-f20c-4dab-91cf-604c84ce94b1';

export function getAppSettings() {
  try {
    const raw = localStorage.getItem(APP_SETTINGS_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    const settings = {
      mcpWebhookUrl: parsed.mcpWebhookUrl || DEFAULT_MCP_TEST_URL,
      mcpUrlType: parsed.mcpUrlType || (parsed.mcpWebhookUrl?.includes('mcp-test') ? 'test' : 'production'),
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
      mcpWebhookUrl: DEFAULT_MCP_TEST_URL,
      mcpUrlType: 'test',
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

