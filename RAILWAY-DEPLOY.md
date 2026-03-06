# 🚂 Railway Deployment Guide

## Quick Deploy (3 Steps)

### 1. Connect GitHub Repository
1. Go to https://railway.app/new
2. Click "Deploy from GitHub repo"
3. Select `NexusDevelopments/discordtest`

### 2. Configure (Auto-detected)
Railway will automatically:
- ✅ Detect Node.js project (from `package.json`)
- ✅ Install dependencies (`npm install`)
- ✅ Start the server (`npm start`)
- ✅ Assign a public URL

### 3. Deploy!
- Click "Deploy"
- Wait ~30 seconds
- Your site is live! 🎉

## URLs
- **GitHub Repo:** https://github.com/NexusDevelopments/discordtest
- **Railway Dashboard:** https://railway.app/dashboard
- **Live Site:** (Railway assigns automatically)

## Environment Variables
None needed! This is a static site with Node.js server.

## Custom Domain (Optional)
In Railway dashboard:
1. Click on your service
2. Go to "Settings" → "Domains"
3. Add your custom domain

## Files Added for Deployment
- `server.js` - Express server to serve static files
- `package.json` - Node.js dependencies
- `.gitignore` - Ignore node_modules
- `README.md` - Project documentation

## Local Testing
```bash
npm install
npm start
# Visit http://localhost:3000
```

## Troubleshooting
If deployment fails:
1. Check Railway logs in dashboard
2. Verify `package.json` has `"start": "node server.js"`
3. Check that PORT is set correctly in `server.js` (process.env.PORT)

## Stack
- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Content:** Static HTML/CSS/JS
- **Hosting:** Railway (auto-scaling, free tier available)
