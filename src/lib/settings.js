// AI Tools Store - Global App Settings Service (n8n Webhook, MCP & WhatsApp)
import { defaultWhatsappUrl } from './supabase.js';

export const APP_SETTINGS_KEY = 'ai_tools_app_settings_v1';

export function getAppSettings() {
  try {
    const raw = localStorage.getItem(APP_SETTINGS_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return {
      mcpWebhookUrl: parsed.mcpWebhookUrl || '',
      mcpSecretKey: parsed.mcpSecretKey || '',
      adminWhatsappNumber: parsed.adminWhatsappNumber || '',
      adminWhatsappUrl: parsed.adminWhatsappUrl || defaultWhatsappUrl || ''
    };
  } catch (e) {
    return {
      mcpWebhookUrl: '',
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
  } catch (e) {
    console.warn('[Settings] Failed to save settings to localStorage:', e);
  }
  return merged;
}

// Send test ping to n8n / MCP endpoint
export async function testMcpWebhook(url, secret = '') {
  if (!url || !url.trim().startsWith('http')) {
    throw new Error('Please enter a valid Webhook URL (starts with https:// or http://)');
  }

  const headers = { 'Content-Type': 'application/json' };
  if (secret && secret.trim()) {
    headers['Authorization'] = `Bearer ${secret.trim()}`;
    headers['X-MCP-Secret'] = secret.trim();
  }

  const payload = {
    event: 'mcp_test_ping',
    source: 'AI Tools Store Admin Panel',
    full_name: 'Admin Test Ping',
    email: 'admin@aitoolsstore.com',
    whatsapp_number: '+92 300 0000000',
    topic: 'License Activation (Test)',
    message: 'This is a test event dispatched from AI Tools Store Admin Panel to verify your n8n / MCP workflow.',
    timestamp: new Date().toISOString()
  };

  const response = await fetch(url.trim(), {
    method: 'POST',
    headers,
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`Webhook endpoint responded with status ${response.status}: ${response.statusText}`);
  }

  return true;
}
