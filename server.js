const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { spawn } = require('child_process');

const app = express();
const PORT = process.env.PORT || 3000;

const n8nProcess = spawn('npx', ['n8n', 'start'], {
  stdio: 'inherit',
  env: { ...process.env, N8N_PORT: '5678' }
});

app.use('/n8n', createProxyMiddleware({
  target: 'http://localhost:5678',
  changeOrigin: true,
  pathRewrite: {
    '^/n8n': '', 
  },
}));

app.get('/', (req, res) => {
  res.send('Hello from Express server! Akses /n8n untuk tampilan n8n.');
});

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
