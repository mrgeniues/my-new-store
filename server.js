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
    VITE_ADMIN_EMAILS: process.env.VITE_ADMIN_EMAILS || 'admin@aitools.store,numanali1n@gmail.com'
  });
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
        VITE_ADMIN_EMAILS: process.env.VITE_ADMIN_EMAILS || 'admin@aitools.store,numanali1n@gmail.com'
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
