import jsonServerModule from 'json-server';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Handle CommonJS / ESM differences in json-server exports
const jsonServer = jsonServerModule.default || jsonServerModule;

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

try {
  // Use db.json relative to this file
  const dbPath = path.resolve(__dirname, '../db.json');
  
  if (!fs.existsSync(dbPath)) {
    throw new Error(`db.json not found at ${dbPath}`);
  }

  const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  const router = jsonServer.router(db);

  server.use(middlewares);

  // Add a test route
  server.get('/api/test', (req, res) => {
    res.json({ message: 'API is working', dbExists: fs.existsSync(dbPath) });
  });

  // Strip /api from the URL
  server.use((req, res, next) => {
    if (req.url.startsWith('/api')) {
      req.url = req.url.replace('/api', '');
    }
    next();
  });

  server.use(router);
} catch (error) {
  server.get('*', (req, res) => {
    res.status(500).json({
      error: 'Failed to initialize json-server',
      message: error.message,
      stack: error.stack,
      dirname: __dirname,
      cwd: process.cwd(),
      dbExists: fs.existsSync(path.resolve(__dirname, '../db.json')),
      dbPath: path.resolve(__dirname, '../db.json')
    });
  });
}

export default server;
