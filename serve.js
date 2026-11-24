/**
 * Media-Optimized Streaming Server for Ishant's Portfolio
 * Fully supports HTTP GET, HEAD, OPTIONS, Range requests (HTTP 206 Partial Content),
 * seeking, scrubbing, fast-start streaming, and health checks.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

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
  '.woff': 'font/woff',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8'
};

const server = http.createServer((req, res) => {
  // CORS Headers for all requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Range, Content-Type, Accept, Origin, User-Agent');
  res.setHeader('Access-Control-Expose-Headers', 'Content-Range, Content-Length, Accept-Ranges, Content-Type');

  // Handle CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Only GET and HEAD methods supported for content
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
    return;
  }

  const urlPath = req.url.split('?')[0];

  // Dedicated Health Check Endpoint
  if (urlPath === '/health' || urlPath === '/api/health') {
    const healthData = {
      status: 'ok',
      uptimeSeconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
      mediaServer: 'online',
      port: PORT
    };
    const body = JSON.stringify(healthData, null, 2);
    res.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(body),
      'Cache-Control': 'no-cache'
    });
    if (req.method === 'HEAD') {
      res.end();
    } else {
      res.end(body);
    }
    return;
  }

  let safePath = path.normalize(decodeURIComponent(urlPath));
  if (safePath === '/' || safePath === '\\') {
    safePath = '/index.html';
  }

  const filePath = path.join(__dirname, safePath);

  // Security check to avoid path traversal
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
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

    const isVideo = ['.mp4', '.mov', '.webm'].includes(ext);
    const isCode = ['.html', '.js', '.css', '.json'].includes(ext);
    const cacheHeader = isCode ? 'no-cache, no-store, must-revalidate' : 'public, max-age=3600';

    // Parse HTTP Range header if present
    const rangeHeader = req.headers.range;

    if (rangeHeader && isVideo) {
      // Standard range parsing: bytes=START-END, bytes=START-, or bytes=-SUFFIX
      const match = rangeHeader.match(/bytes=\s*(\d*)\s*-\s*(\d*)/i);

      if (!match) {
        res.writeHead(416, {
          'Content-Range': `bytes */${total}`,
          'Content-Type': 'text/plain'
        });
        res.end('Range Not Satisfiable');
        return;
      }

      let start = match[1] ? parseInt(match[1], 10) : NaN;
      let end = match[2] ? parseInt(match[2], 10) : NaN;

      if (isNaN(start) && !isNaN(end)) {
        // Suffix range: bytes=-500 (last 500 bytes)
        start = total - end;
        end = total - 1;
      } else if (!isNaN(start) && isNaN(end)) {
        // Open range: bytes=1000-
        end = total - 1;
      }

      // Default fallback
      if (isNaN(start)) start = 0;
      if (isNaN(end)) end = total - 1;

      // Range validation
      if (start < 0 || start >= total || end >= total || start > end) {
        res.writeHead(416, {
          'Content-Range': `bytes */${total}`,
          'Accept-Ranges': 'bytes',
          'Content-Type': 'text/plain'
        });
        res.end('Range Not Satisfiable');
        return;
      }

      const chunkSize = end - start + 1;
      const headers = {
        'Content-Range': `bytes ${start}-${end}/${total}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': contentType,
        'Cache-Control': cacheHeader,
        'Content-Disposition': 'inline'
      };

      res.writeHead(206, headers);

      // If HEAD request, terminate immediately without body
      if (req.method === 'HEAD') {
        res.end();
        return;
      }

      // Stream the requested byte slice efficiently
      const fileStream = fs.createReadStream(filePath, { start, end });

      // Clean up file descriptor on client disconnect/abort
      req.on('close', () => {
        fileStream.destroy();
      });

      fileStream.on('error', (streamErr) => {
        if (!res.headersSent) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Video Streaming Error');
        }
      });

      fileStream.pipe(res);
    } else {
      // Full content delivery (HTTP 200)
      const headers = {
        'Content-Length': total,
        'Accept-Ranges': 'bytes',
        'Content-Type': contentType,
        'Cache-Control': cacheHeader,
        'Content-Disposition': 'inline'
      };

      res.writeHead(200, headers);

      // If HEAD request, terminate immediately without body
      if (req.method === 'HEAD') {
        res.end();
        return;
      }

      const fileStream = fs.createReadStream(filePath);

      req.on('close', () => {
        fileStream.destroy();
      });

      fileStream.on('error', (streamErr) => {
        if (!res.headersSent) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Read Stream Error');
        }
      });

      fileStream.pipe(res);
    }
  });
});

server.listen(PORT, () => {
  console.log(`[MEDIA SERVER] Running at http://localhost:${PORT}`);
  console.log(`[MEDIA SERVER] Health check: http://localhost:${PORT}/health`);
});
