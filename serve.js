const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.mov': 'video/quicktime',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff'
};

const server = http.createServer((req, res) => {
  const urlPath = req.url.split('?')[0];
  let safePath = path.normalize(decodeURIComponent(urlPath));
  if (safePath === '/' || safePath === '\\') {
    safePath = '/index.html';
  }

  const filePath = path.join(__dirname, safePath);

  // Security check to avoid path traversal
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const total = stats.size;

    const isCode = ['.html', '.js', '.css', '.json'].includes(ext);
    const cacheHeader = isCode ? 'no-cache, no-store, must-revalidate' : 'public, max-age=3600';

    // Handle HTTP Range Requests (essential for video scrubbing and playback)
    const range = req.headers.range;
    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : total - 1;

      if (start >= total || end >= total || start > end) {
        res.writeHead(416, { 'Content-Range': `bytes */${total}` });
        res.end();
        return;
      }

      const chunksize = end - start + 1;
      const fileStream = fs.createReadStream(filePath, { start, end });
      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${total}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': contentType,
        'Cache-Control': cacheHeader,
        'Access-Control-Allow-Origin': '*'
      });
      fileStream.pipe(res);
    } else {
      res.writeHead(200, {
        'Content-Length': total,
        'Accept-Ranges': 'bytes',
        'Content-Type': contentType,
        'Cache-Control': cacheHeader,
        'Access-Control-Allow-Origin': '*'
      });
      fs.createReadStream(filePath).pipe(res);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Media-optimized server running at http://localhost:${PORT}`);
});
