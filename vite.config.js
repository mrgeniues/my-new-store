import { defineConfig } from 'vite';
import { testMcpConnection, callMcpTool } from './mcpProxy.js';
import { generateKnowledgePdf } from './knowledgePdfService.js';

function mcpDevProxyPlugin() {
  return {
    name: 'mcp-dev-proxy',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url.startsWith('/api/knowledge-pdf') && req.method === 'GET') {
          try {
            const isDownload = req.url.includes('download=1');
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `${isDownload ? 'attachment' : 'inline'}; filename="AI_Tools_Store_Knowledge_Base.pdf"`);
            res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
            await generateKnowledgePdf(res);
          } catch (err) {
            console.error('[Vite Knowledge PDF Error]:', err);
            if (!res.headersSent) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err.message }));
            }
          }
          return;
        }

        if (req.url === '/api/mcp/test' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', async () => {
            try {
              const data = body ? JSON.parse(body) : {};
              const result = await testMcpConnection(data);
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = result.connected ? 200 : (result.status || 500);
              res.end(JSON.stringify(result));
            } catch (err) {
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 500;
              res.end(JSON.stringify({ connected: false, status: 500, error: err.message }));
            }
          });
          return;
        }

        if (req.url === '/api/mcp/call-tool' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', async () => {
            try {
              const data = body ? JSON.parse(body) : {};
              const result = await callMcpTool(data);
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 200;
              res.end(JSON.stringify({ success: true, result }));
            } catch (err) {
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 500;
              res.end(JSON.stringify({ success: false, error: err.message }));
            }
          });
          return;
        }

        if (req.url === '/api/webhook/new-user' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', async () => {
            try {
              const { targetUrl, userData } = body ? JSON.parse(body) : {};
              if (!targetUrl || !targetUrl.startsWith('http')) {
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 400;
                res.end(JSON.stringify({ success: false, error: 'targetUrl is required' }));
                return;
              }

              let response;
              try {
                response = await fetch(targetUrl, {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(userData || {})
                });
              } catch (fErr) {
                if (targetUrl.includes('/webhook-test/')) {
                  const prodUrl = targetUrl.replace('/webhook-test/', '/webhook/');
                  response = await fetch(prodUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userData || {})
                  });
                } else {
                  throw fErr;
                }
              }

              if (response.status === 404 && targetUrl.includes('/webhook-test/')) {
                const prodUrl = targetUrl.replace('/webhook-test/', '/webhook/');
                response = await fetch(prodUrl, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(userData || {})
                });
              }

              const text = await response.text();
              let respData;
              try { respData = JSON.parse(text); } catch { respData = { raw: text }; }

              res.setHeader('Content-Type', 'application/json');
              res.statusCode = response.status;
              res.end(JSON.stringify({ success: response.ok, status: response.status, data: respData }));
            } catch (err) {
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 500;
              res.end(JSON.stringify({ success: false, status: 500, error: err.message }));
            }
          });
          return;
        }

        next();
      });
    }
  };
}

export default defineConfig({
  plugins: [mcpDevProxyPlugin()],
  server: {
    port: 3000,
    open: false,
    host: true,
    watch: {
      ignored: ['**/*.pdf', '**/*.log', '**/dist/**']
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
});
