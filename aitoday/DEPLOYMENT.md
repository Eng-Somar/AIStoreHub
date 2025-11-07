# Deployment Guide for AIToday

This guide will help you deploy the AIToday application to Vercel (recommended) or other hosting platforms.

## Deploy to Vercel (Recommended)

Vercel is the recommended platform for deploying Next.js applications, offering:
- Automatic deployments from Git
- Zero-config setup for Next.js
- Global CDN
- Automatic HTTPS
- Serverless functions support

### Method 1: Deploy with Vercel Dashboard (Easiest)

1. **Push your code to GitHub** (already done)

2. **Visit [Vercel](https://vercel.com)**
   - Sign up or log in with your GitHub account

3. **Import your project**
   - Click "Add New Project"
   - Select "Import Git Repository"
   - Choose your GitHub repository: `AIStoreHub`
   - Select the `aitoday` directory as the root directory

4. **Configure project settings**
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `aitoday`
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `.next` (auto-detected)
   - Install Command: `npm install` (auto-detected)

5. **Environment Variables** (Optional)
   - Add `MONGODB_URI` if you want to use MongoDB
   - The app works perfectly with static JSON data without MongoDB

6. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete (2-3 minutes)
   - Your site will be live at `https://your-project.vercel.app`

### Method 2: Deploy with Vercel CLI

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Navigate to project directory**
```bash
cd aitoday
```

3. **Login to Vercel**
```bash
vercel login
```

4. **Deploy**
```bash
vercel
```

5. **Follow the prompts**
   - Set up and deploy: Y
   - Which scope: Select your account
   - Link to existing project: N (first time)
   - Project name: aitoday (or custom name)
   - Directory: ./ (current directory)
   - Override settings: N

6. **Production deployment**
```bash
vercel --prod
```

## Deploy to Other Platforms

### Netlify

1. **Connect your GitHub repository**
   - Visit [Netlify](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub and select your repository

2. **Configure build settings**
   - Base directory: `aitoday`
   - Build command: `npm run build`
   - Publish directory: `.next`

3. **Deploy**

### Railway

1. **Visit [Railway](https://railway.app)**
2. **New Project → Deploy from GitHub**
3. **Select repository and configure**
   - Root directory: `aitoday`
   - Build command: `npm run build`
   - Start command: `npm start`

### DigitalOcean App Platform

1. **Visit [DigitalOcean](https://cloud.digitalocean.com/apps)**
2. **Create App → GitHub**
3. **Configure**
   - Source directory: `aitoday`
   - Build command: `npm run build`
   - Run command: `npm start`

## Custom Domain

After deployment, you can add a custom domain:

### On Vercel
1. Go to your project dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions

## Environment Variables (Optional)

If you want to use MongoDB instead of the static JSON data:

1. **Get MongoDB Atlas connection string**
   - Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free cluster
   - Get your connection string

2. **Add to Vercel**
   - Go to project settings → Environment Variables
   - Add `MONGODB_URI` with your connection string

3. **Seed the database**
```bash
node scripts/seedDatabase.js
```

## Post-Deployment Checklist

- [ ] Site is accessible at the deployment URL
- [ ] All pages load correctly (home, submit, analytics, login, subscribe)
- [ ] Search functionality works
- [ ] Category filtering works
- [ ] Pagination works
- [ ] Tool cards display properly with images
- [ ] Mobile responsiveness is working
- [ ] Forms submit successfully

## Troubleshooting

### Build fails
- Check that all dependencies are in package.json
- Ensure Node.js version is 18 or higher
- Review build logs for specific errors

### Images not loading
- Clearbit Logo API and Thum.io are free services
- Some logos might not be available for all domains
- Images have fallback SVGs with tool initials

### Performance optimization
- Images are optimized via Next.js Image component
- Static generation for most pages
- API routes are serverless functions

## Support

For deployment issues:
1. Check Vercel/Netlify build logs
2. Review Next.js documentation
3. Open an issue on GitHub

## Live Demo

Once deployed, your site will be available at:
- Vercel: `https://your-project.vercel.app`
- Custom domain: `https://your-domain.com`

Enjoy your deployed AI tools directory! 🚀
