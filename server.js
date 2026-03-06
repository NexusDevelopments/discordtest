const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Disable caching for development
app.set('etag', false);

// Set proper headers for all responses
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Cache-Control', 'public, max-age=31536000');
  next();
});

// Serve CSS files with proper MIME type and headers
app.use('/css', express.static(path.join(__dirname, 'css'), {
  setHeaders: (res, filepath) => {
    res.setHeader('Content-Type', 'text/css; charset=utf-8');
    res.setHeader('X-Content-Type-Options', 'nosniff');
  }
}));

// Serve JS files with proper MIME type and headers
app.use('/js', express.static(path.join(__dirname, 'js'), {
  setHeaders: (res, filepath) => {
    res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
    res.setHeader('X-Content-Type-Options', 'nosniff');
  }
}));

// Handle /assets/ paths (Discord expects chunks here)
app.use('/assets', express.static(path.join(__dirname, 'js'), {
  setHeaders: (res, filepath) => {
    if (filepath.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
    } else if (filepath.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css; charset=utf-8');
    }
    res.setHeader('X-Content-Type-Options', 'nosniff');
  }
}));

// Serve all static files from root
app.use(express.static(__dirname, {
  setHeaders: (res, filepath) => {
    if (filepath.endsWith('.html')) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
    } else if (filepath.endsWith('.json')) {
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
    }
  }
}));

// Root route serves index.html
app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Fallback: try to serve from js/ folder for any missing chunks
app.get('*.js', (req, res, next) => {
  const filename = path.basename(req.path);
  const jsPath = path.join(__dirname, 'js', filename);
  res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
  res.sendFile(jsPath, (err) => {
    if (err) next();
  });
});

// 404 handler
app.use((req, res) => {
  console.log('404 Not Found:', req.path);
  res.status(404).send('404 - Not Found: ' + req.path);
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).send('Internal Server Error');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Visit: http://localhost:${PORT}`);
  console.log(`📁 Serving from: ${__dirname}`);
});
