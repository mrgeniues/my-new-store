// AI Tools Store - Production Node.js Server for Hostinger Web App
import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const distPath = path.join(__dirname, 'dist');

// Security & Performance Headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

import { testMcpConnection, callMcpTool } from './mcpProxy.js';
import { generateKnowledgePdf } from './knowledgePdfService.js';

// Body Parser Middleware for API endpoints
app.use(express.json());

// Dynamic AI Knowledge Base PDF Export for n8n RAG & Admin
app.get('/api/knowledge-pdf', async (req, res) => {
  try {
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="AI_Tools_Store_Knowledge_Base.pdf"');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    await generateKnowledgePdf(res);
  } catch (err) {
    console.error('[Knowledge PDF Error]:', err);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Failed to generate knowledge base PDF', details: err.message });
    }
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    appName: 'AI Tools Store',
    timestamp: new Date().toISOString(),
    nodeVersion: process.version
  });
});

// Configuration endpoint for client
app.get('/api/config', (req, res) => {
  res.json({
    VITE_SUPABASE_URL: process.env.VITE_SUPABASE_URL || 'https://rqemoitjanmxsmcmveso.supabase.co',
    VITE_SUPABASE_ANON_KEY: process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxZW1vaXRqYW5teHNtY212ZXNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg1Mjc1NjAsImV4cCI6MjEwNDEwMzU2MH0.GntFd-uwBQTg7RiN_ePtX2q3l1fnCF8n_KmvKes9oYk',
    VITE_DEFAULT_WHATSAPP_URL: process.env.VITE_DEFAULT_WHATSAPP_URL || 'https://whatsapp.com/channel/0029Vb5pEK34tRrkKVuBCy0Q',
    VITE_ADMIN_EMAILS: process.env.VITE_ADMIN_EMAILS || 'admin@aitools.store,numanali1n@gmail.com',
    DEFAULT_MCP_URL: process.env.MCP_SERVER_URL || 'https://n8n-1rsy.srv1898856.hstgr.cloud/mcp-test/69318bf8-f20c-4dab-91cf-604c84ce94b1',
    VITE_N8N_NEW_USER_WEBHOOK_URL: process.env.VITE_N8N_NEW_USER_WEBHOOK_URL || ''
  });
});

// Model Context Protocol (MCP) Proxy Endpoints
app.post('/api/mcp/test', async (req, res) => {
  try {
    const { targetUrl, secret } = req.body || {};
    const result = await testMcpConnection({ targetUrl, secret });
    res.status(result.connected ? 200 : (result.status || 500)).json(result);
  } catch (err) {
    res.status(500).json({
      connected: false,
      status: 500,
      statusText: 'Internal Error',
      error: err.message
    });
  }
});

app.post('/api/mcp/call-tool', async (req, res) => {
  try {
    const { targetUrl, secret, toolName, args } = req.body || {};
    const result = await callMcpTool({ targetUrl, secret, toolName, args });
    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

// n8n New User Registration Webhook Proxy Endpoint
app.post('/api/webhook/new-user', async (req, res) => {
  try {
    const { targetUrl, userData } = req.body || {};
    if (!targetUrl || !targetUrl.startsWith('http')) {
      return res.status(400).json({ success: false, error: 'Valid targetUrl starting with http is required' });
    }

    const payload = userData || {};
    let response;
    try {
      response = await fetch(targetUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'User-Agent': 'AI-Tools-Store-NewUser-Webhook-Proxy/1.0'
        },
        body: JSON.stringify(payload)
      });
    } catch (fetchErr) {
      if (targetUrl.includes('/webhook-test/')) {
        const prodUrl = targetUrl.replace('/webhook-test/', '/webhook/');
        response = await fetch(prodUrl, {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'User-Agent': 'AI-Tools-Store-NewUser-Webhook-Proxy/1.0'
          },
          body: JSON.stringify(payload)
        });
      } else {
        throw fetchErr;
      }
    }

    // Auto retry with production URL if test URL returned 404
    if (response.status === 404 && targetUrl.includes('/webhook-test/')) {
      const prodUrl = targetUrl.replace('/webhook-test/', '/webhook/');
      response = await fetch(prodUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'User-Agent': 'AI-Tools-Store-NewUser-Webhook-Proxy/1.0'
        },
        body: JSON.stringify(payload)
      });
    }

    const text = await response.text();
    let data;
    try { data = JSON.parse(text); } catch { data = { raw: text }; }
    res.status(response.status).json({ success: response.ok, status: response.status, data });
  } catch (err) {
    res.status(500).json({ success: false, status: 500, error: err.message });
  }
});

// Check if production build (dist/) exists
if (fs.existsSync(distPath)) {
  // Serve static assets with cache control (index: false so SPA route can inject runtime env)
  app.use(express.static(distPath, {
    maxAge: '1d',
    etag: true,
    index: false
  }));

  // SPA Route: Serve index.html with dynamically injected runtime environment variables
  app.use((req, res) => {
    const indexPath = path.join(distPath, 'index.html');
    if (!fs.existsSync(indexPath)) {
      return res.status(404).send('index.html not found');
    }

    try {
      let html = fs.readFileSync(indexPath, 'utf8');

      const runtimeEnv = {
        VITE_SUPABASE_URL: process.env.VITE_SUPABASE_URL || 'https://rqemoitjanmxsmcmveso.supabase.co',
        VITE_SUPABASE_ANON_KEY: process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxZW1vaXRqYW5teHNtY212ZXNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg1Mjc1NjAsImV4cCI6MjEwNDEwMzU2MH0.GntFd-uwBQTg7RiN_ePtX2q3l1fnCF8n_KmvKes9oYk',
        VITE_DEFAULT_WHATSAPP_URL: process.env.VITE_DEFAULT_WHATSAPP_URL || 'https://whatsapp.com/channel/0029Vb5pEK34tRrkKVuBCy0Q',
        VITE_ADMIN_EMAILS: process.env.VITE_ADMIN_EMAILS || 'admin@aitools.store,numanali1n@gmail.com',
        VITE_N8N_NEW_USER_WEBHOOK_URL: process.env.VITE_N8N_NEW_USER_WEBHOOK_URL || ''
      };

      const envScript = `<script id="hostinger-runtime-env">window.__ENV__ = ${JSON.stringify(runtimeEnv)};</script>`;
      html = html.replace('</head>', `${envScript}\n  </head>`);

      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.send(html);
    } catch (readErr) {
      console.error('[AI Tools Store] Error serving index.html:', readErr);
      res.sendFile(indexPath);
    }
  });
} else {
  // Fallback if dist/ is not yet generated
  app.use((req, res) => {
    res.status(503).send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>AI Tools Store - Building</title>
        <style>
          body { font-family: system-ui, sans-serif; background: #0b0f19; color: #fff; text-align: center; padding: 4rem 1rem; }
          .card { max-width: 500px; margin: 0 auto; background: #161f38; padding: 2rem; border-radius: 12px; border: 1px solid #2d3748; }
          code { color: #38bdf8; background: #0f172a; padding: 0.2rem 0.5rem; border-radius: 4px; }
        </style>
      </head>
      <body>
        <div class="card">
          <h2>Production Build in Progress</h2>
          <p>The application bundle has not been built yet on Hostinger.</p>
          <p>Please run <code>npm run build</code> in your terminal or via the Hostinger hPanel build console.</p>
        </div>
      </body>
      </html>
    `);
  });
}

// Start Server
app.listen(PORT, () => {
  console.log(`[AI Tools Store] Server listening on port ${PORT}`);
  console.log(`[AI Tools Store] Environment: ${process.env.NODE_ENV || 'production'}`);
});
