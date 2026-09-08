import { defineConfig } from 'vite';
import { testMcpConnection, callMcpTool } from './mcpProxy.js';

function mcpDevProxyPlugin() {
  return {
    name: 'mcp-dev-proxy',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
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
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
});
