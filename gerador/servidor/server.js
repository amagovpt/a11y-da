require('dotenv').config();
const http = require('http');
const https = require('https');
const url = require('url');

const hostname = '127.0.0.1';
const port = 3001;
const allowedOrigin = process.env.ALLOWED_ORIGIN || '*';

function loadAccessibilityStatement(url) { /* ... mesmo código ... */ }

const server = http.createServer(async (req, res) => {
    // CORS headers
    res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        return res.end();
    }

    const queryObject = url.parse(req.url, true).query;
    if (queryObject.url) {
        const statement = await loadAccessibilityStatement(queryObject.url);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(statement);
    } else {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'text/plain');
        res.end("No statement found");
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
