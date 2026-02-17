import { create, defaults, router, rewriter } from 'json-server';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = create();
const middlewares = defaults();

// Use an in-memory database by reading the file once
// This prevents crashes from trying to write to Vercel's read-only filesystem
const dbPath = path.join(__dirname, '../db.json');
let db = { products: [], users: [] };

try {
  if (fs.existsSync(dbPath)) {
    db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  }
} catch (err) {
  console.error('Error reading db.json:', err);
}

const dbRouter = router(db);

server.use(middlewares);

// Add a test endpoint to verify the API is working
server.get('/api/test', (req, res) => {
  res.json({ 
    status: 'ok', 
    dbFound: fs.existsSync(dbPath),
    dbPath: dbPath,
    cwd: process.cwd()
  });
});

// Vercel's request will still have /api prefix, so we need to rewrite it for json-server
server.use(rewriter({
  '/api/*': '/$1'
}));

server.use(dbRouter);

export default server;
