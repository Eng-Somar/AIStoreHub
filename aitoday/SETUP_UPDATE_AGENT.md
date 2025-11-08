# Quick Setup Guide - Update Agent

Get your AI tools database up-to-date in 5 minutes!

## 🚀 Quick Start

### Step 1: Install Dependencies

```bash
cd aitoday
npm install
```

This installs:
- `dotenv` - Environment variable management
- `node-cron` - Scheduled task automation
- `axios` - HTTP client (already installed)

### Step 2: Get Gemini API Key

1. Visit: **https://ai.google.dev/**
2. Click "Get API Key"
3. Create a new API key (FREE tier available)
4. Copy your API key

### Step 3: Configure Environment

```bash
# Create .env file from template
cp .env.example .env

# Edit .env and add your API key
nano .env  # or use any text editor
```

In `.env`, replace:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

With your actual key:
```env
GEMINI_API_KEY=AIzaSyDxxx_your_actual_key_here
```

### Step 4: Test Run

```bash
# Test with 10 tools (no changes saved)
npm run update:dry
```

Expected output:
```
[INFO] AI Tools Update Agent Started
[INFO] Loaded 1000 tools
[INFO] Processing 10 tools
[INFO] Processing [1] ChatGPT
...
[SUCCESS] Update completed successfully
```

### Step 5: Run First Update

```bash
# Update your database
npm run update
```

That's it! Your tools database is now updated with verified, fresh data.

---

## 📋 Available Commands

```bash
# Quick incremental update
npm run update

# Full update (checks all URLs)
npm run update:full

# Test with sample data
npm run update:dry

# Start automated scheduler
npm run update:schedule
```

Or use the bash script:
```bash
./scripts/quickUpdate.sh
./scripts/quickUpdate.sh --full
./scripts/quickUpdate.sh --dry-run --limit 10
```

---

## 🎯 What Gets Updated?

The agent automatically:

✅ **Verifies tool status** - Checks if tools are still active
✅ **Updates descriptions** - Improves outdated descriptions
✅ **Fixes rebrands** - Updates renamed tools (e.g., "Replit Ghostwriter" → "Replit AI")
✅ **Validates categories** - Ensures correct categorization
✅ **Checks links** - Detects dead/broken URLs
✅ **Updates pricing** - Verifies free/paid status

---

## 🔧 Troubleshooting

### "GEMINI_API_KEY not set"

**Solution**: Add your API key to `.env` file
```bash
echo "GEMINI_API_KEY=your_key_here" >> .env
```

### "Cannot find module 'dotenv'"

**Solution**: Install dependencies
```bash
npm install
```

### "Permission denied: quickUpdate.sh"

**Solution**: Make script executable
```bash
chmod +x scripts/quickUpdate.sh
```

---

## 📖 Full Documentation

See `docs/UPDATE_AGENT.md` for:
- Detailed configuration options
- Advanced usage examples
- Trusted data sources
- API cost breakdown
- Scheduling automation

---

## 🎓 Example Workflow

### Daily Updates (Recommended)

```bash
# 1. Start the scheduler
npm run update:schedule

# Runs automatically every day at 2 AM
```

### Manual Weekly Updates

```bash
# Every Sunday, run full update
./scripts/quickUpdate.sh --full > logs/weekly-update.log 2>&1
```

### Before Adding New Tools

```bash
# Add tools to data/tools.json, then verify
npm run update:dry
```

---

## ✨ Benefits

- **Always Fresh Data** - Automated updates keep your database current
- **Trusted Sources** - Uses Futurepedia, Product Hunt, and other verified platforms
- **AI-Powered** - Gemini API verifies and enhances descriptions
- **Safe Updates** - Automatic backups before any changes
- **Zero Maintenance** - Set it and forget it with scheduler

---

## 🆘 Need Help?

1. **Check logs**: `tail -f logs/update-agent.log`
2. **Test mode**: `npm run update:dry`
3. **Read docs**: `docs/UPDATE_AGENT.md`
4. **Verify config**: `config/trusted-resources.json`

---

## 🔐 Security Note

Your `.env` file contains sensitive API keys. It's automatically excluded from Git.

**Never commit or share your `.env` file!**

---

**Next Steps:**
1. ✅ Run `npm install`
2. ✅ Add Gemini API key to `.env`
3. ✅ Test with `npm run update:dry`
4. ✅ Run your first update with `npm run update`
5. ✅ Set up automation with `npm run update:schedule`

**Happy updating! 🚀**
