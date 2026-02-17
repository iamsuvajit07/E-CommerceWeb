import jsonServer from 'json-server';
import path from 'path';
import fs from 'fs';

const server = jsonServer.create();
const middlewares = jsonServer.defaults({ logger: false });

server.use(middlewares);

// Add a test-simple endpoint
server.get('/api/test-simple', (req, res) => {
  res.json({ 
    status: 'ok', 
    cwd: process.cwd(), 
    dbExists: fs.existsSync(path.join(process.cwd(), 'db.json'))
  });
});

try {
  const dbPath = path.join(process.cwd(), 'db.json');
  const dbContent = fs.readFileSync(dbPath, 'utf8');
  const db = JSON.parse(dbContent);
  const router = jsonServer.router(db);

  server.use(jsonServer.rewriter({
    '/api/*': '/$1'
  }));
  
  server.use(router);
} catch (error) {
  server.use((req, res) => {
    res.status(500).json({ 
      error: 'Server initialization failed', 
      message: error.message,
      cwd: process.cwd()
    });
  });
}

export default server;
