import * as jsonServerModule from 'json-server';
import path from 'path';
import fs from 'fs';

// Version 1.0.0-beta.3 might not have a default export in some environments
const jsonServer = jsonServerModule.default || jsonServerModule;
const server = jsonServer.create();
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Add a simple health check endpoint at the root of the function
server.get('/api/test', (req, res) => {
  res.json({ message: 'API is alive', time: new Date().toISOString() });
});

// Custom middleware to strip /api prefix from URLs
server.use((req, res, next) => {
  if (req.url.startsWith('/api')) {
    req.url = req.url.replace('/api', '');
  }
  next();
});

// Load the database
const dbPath = path.resolve(process.cwd(), 'db.json');

try {
  const dbContent = fs.readFileSync(dbPath, 'utf8');
  const db = JSON.parse(dbContent);
  const router = jsonServer.router(db);
  server.use(router);
} catch (error) {
  server.use((req, res) => {
    res.status(500).json({ 
      error: 'Failed to initialize database', 
      message: error.message,
      path: dbPath
    });
  });
}

// Vercel expected export pattern
export default (req, res) => {
  return server(req, res);
};
