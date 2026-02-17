const fs = require('fs');
const path = require('path');

// Read the database
const dbPath = path.join(__dirname, '..', 'db.json');
let db;

try {
  const dbContent = fs.readFileSync(dbPath, 'utf8');
  db = JSON.parse(dbContent);
} catch (error) {
  console.error('Error reading database:', error);
  db = { products: [], users: [] };
}

// Helper functions
function setCORSHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

function parseJSONBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });
  });
}

// Main handler function
module.exports = async (req, res) => {
  // Set CORS headers
  setCORSHeaders(res);

  // Handle OPTIONS requests for CORS
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Parse URL
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathParts = url.pathname.split('/').filter(Boolean);

  try {
    // Health check
    if (pathParts[0] === 'api' && pathParts[1] === 'health') {
      res.status(200).json({ 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        dbLoaded: true
      });
      return;
    }

    // Products endpoints
    if (pathParts[0] === 'api' && pathParts[1] === 'products') {
      if (req.method === 'GET') {
        if (pathParts[2]) {
          // Get specific product
          const product = db.products.find(p => p.id === pathParts[2]);
          if (product) {
            res.status(200).json(product);
          } else {
            res.status(404).json({ error: 'Product not found' });
          }
        } else {
          // Get all products
          res.status(200).json(db.products);
        }
      }
      return;
    }

    // Users endpoints
    if (pathParts[0] === 'api' && pathParts[1] === 'users') {
      if (req.method === 'GET') {
        if (pathParts[2]) {
          // Get specific user
          const user = db.users.find(u => u.id === pathParts[2]);
          if (user) {
            res.status(200).json(user);
          } else {
            res.status(404).json({ error: 'User not found' });
          }
        } else {
          // Get all users
          res.status(200).json(db.users);
        }
      } else if (req.method === 'POST') {
        // Create new user
        const body = await parseJSONBody(req);
        const newUser = {
          id: Date.now().toString(),
          ...body,
          cart: []
        };
        db.users.push(newUser);
        res.status(201).json(newUser);
      } else if (req.method === 'PATCH' && pathParts[2]) {
        // Update user
        const body = await parseJSONBody(req);
        const userIndex = db.users.findIndex(u => u.id === pathParts[2]);
        if (userIndex !== -1) {
          db.users[userIndex] = { ...db.users[userIndex], ...body };
          res.status(200).json(db.users[userIndex]);
        } else {
          res.status(404).json({ error: 'User not found' });
        }
      }
      return;
    }

    // If no route matches
    res.status(404).json({ error: 'Not found' });

  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
};
