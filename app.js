const http = require('http');
const os = require('os');
const fs = require('fs');
const path = require('path');

// Change this on each push to test that updates go live
const APP_VERSION = 'v2';

const PORT = process.env.PORT || 3000;
const started = new Date();
const indexFile = path.join(__dirname, 'index.html');

function info() {
  return {
    status: 'ok',
    version: APP_VERSION,
    node: process.version,
    started: started.toISOString(),
    uptime: Math.floor(process.uptime()),
    pid: process.pid,
    hostname: os.hostname(),
    memoryMB: Math.round(process.memoryUsage().rss / 1024 / 1024),
    port: String(PORT),
  };
}

const server = http.createServer((req, res) => {
  const url = req.url.split('?')[0];

  if (url.endsWith('/health')) {
    res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
    return res.end(JSON.stringify(info()));
  }

  fs.readFile(indexFile, (err, html) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      return res.end('index.html not found');
    }
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT} (${APP_VERSION})`);
});
