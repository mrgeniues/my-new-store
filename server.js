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

// Check if production build (dist/) exists
if (fs.existsSync(distPath)) {
  // Serve static assets with cache control
  app.use(express.static(distPath, {
    maxAge: '1d',
    etag: true
  }));

  // SPA Fallback: All unmatched routes redirect to index.html
  app.use((req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
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
