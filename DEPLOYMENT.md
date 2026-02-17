# Vercel Deployment Guide

This project is now configured for successful deployment to Vercel with both frontend and API working together.

## What was fixed:

1. **Removed ES Modules from package.json** - Removed `"type": "module"` to ensure compatibility with Vercel serverless functions
2. **Rewrote API function** - Created a custom Node.js serverless function that doesn't depend on json-server runtime
3. **Updated vercel.json** - Proper configuration for serverless functions and routing
4. **Added CORS headers** - API now handles cross-origin requests properly
5. **Environment variables** - Production uses `/api` endpoint, development uses `localhost:5000`

## Deployment Steps:

### Option 1: Using Vercel CLI (Recommended)
```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Deploy to production
npm run deploy
```

### Option 2: Using Vercel Dashboard
1. Push your code to GitHub/GitLab/Bitbucket
2. Connect your repository to Vercel
3. Vercel will automatically detect the settings and deploy

## Environment Variables:
- `VITE_API_URL` is automatically set to `/api` in production
- Local development uses `http://localhost:5000` from `.env`

## API Endpoints:
- `GET /api/health` - Health check endpoint
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get specific product
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get specific user
- `POST /api/users` - Create new user
- `PATCH /api/users/:id` - Update user

## Database:
- Uses `db.json` as the database
- Database is included in the deployment bundle
- Changes to the database persist between deployments (since it's part of the code)

## Troubleshooting:
If you still encounter issues after deployment:
1. Check Vercel function logs in the dashboard
2. Test the health endpoint: `https://your-app.vercel.app/api/health`
3. Verify the build completes successfully locally with `npm run build`

## Local Development:
```bash
# Install dependencies
npm install

# Start development server (frontend only)
npm run dev

# Start JSON server for API (for local development)
npm run server
```

The project should now deploy successfully to Vercel with both frontend and API working properly!
