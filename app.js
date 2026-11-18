const http = require('http');

const PORT = process.env.PORT || 3000;
const started = new Date().toISOString();

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ status: 'ok', uptime: process.uptime() }));
  }

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <h1>Node app v2</h1>
    <p>Node version: ${process.version}</p>
    <p>Started: ${started}</p>
    <p>Path: ${req.url}</p>
  `);
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
