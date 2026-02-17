import jsonServer from 'json-server';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = jsonServer.create();
const middlewares = jsonServer.defaults({ logger: false });

server.use(middlewares);

// Add test-simple endpoint
server.get('/api/test-simple', (req, res) => {
  res.json({ 
    status: 'ok', 
    cwd: process.cwd(), 
    dirname: __dirname,
    dbExists: fs.existsSync(path.resolve(__dirname, '../db.json'))
  });
});

try {
  const dbPath = path.resolve(__dirname, '../db.json');
  const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
  const router = jsonServer.router(db);

  server.use(jsonServer.rewriter({
    '/api/*': '/$1'
  }));
  
  server.use(router);
} catch (error) {
  server.get('/api/*', (req, res) => {
    res.status(500).json({ 
      error: 'Server initialization failed', 
      message: error.message,
      dirname: __dirname
    });
  });
}

export default (req, res) => {
  return server(req, res);
};
