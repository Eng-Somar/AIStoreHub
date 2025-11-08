# AI Tools Update Agent

Automated system to keep your AI tools database fresh and accurate using trusted sources and Google Gemini API verification.

## Overview

The Update Agent is a sophisticated tool that:

- ✅ **Verifies tool information** using Google Gemini AI
- 🔍 **Checks for dead links** and inactive tools
- 🔄 **Updates outdated information** (e.g., rebranded tools like "Replit Ghostwriter" → "Replit AI")
- 📊 **Validates data quality** against trusted sources
- 🤖 **Runs automatically** on schedule
- 📝 **Provides detailed logging** of all changes

## Trusted Data Sources

The agent uses these verified sources:

### Primary Sources
- **Product Hunt** (trustScore: 9.5) - Leading product discovery platform
- **Futurepedia** (trustScore: 9.0) - 2,549+ AI tools, daily updates
- **There's An AI For That** (trustScore: 8.8) - Extensive database with natural language search
- **Toolify.ai** (trustScore: 8.5) - Comprehensive aggregator with user feedback

### Verification
- **Google Gemini API** (trustScore: 9.5) - AI-powered fact checking and description enhancement

See `config/trusted-resources.json` for complete list.

---

## Quick Start

### 1. Setup

```bash
# Navigate to project directory
cd aitoday

# Copy environment template
cp .env.example .env

# Edit .env and add your Gemini API key
nano .env  # or use your favorite editor
```

Get your free Gemini API key: https://ai.google.dev/

### 2. Test Run (Recommended First Step)

```bash
# Test with 10 tools (dry run - no changes saved)
./scripts/quickUpdate.sh --dry-run --limit 10
```

### 3. Run Update

```bash
# Quick incremental update
./scripts/quickUpdate.sh

# Or use Node directly
node scripts/updateAgent.js
```

---

## Usage

### Option 1: Quick Update Script (Easiest)

```bash
# Incremental update (default - updates changed tools)
./scripts/quickUpdate.sh

# Full update (checks all URLs, comprehensive)
./scripts/quickUpdate.sh --full

# Verification only (checks data accuracy)
./scripts/quickUpdate.sh --verify

# Test with limited tools
./scripts/quickUpdate.sh --dry-run --limit 20

# Verbose output
./scripts/quickUpdate.sh --verbose
```

### Option 2: Node.js Direct

```bash
# Basic usage
node scripts/updateAgent.js

# With options
node scripts/updateAgent.js --mode full --limit 50 --verbose

# Dry run
node scripts/updateAgent.js --dry-run --limit 10
```

### Option 3: Automated Scheduler

Run updates automatically on a schedule:

```bash
# Start scheduler (runs daily at 2 AM by default)
node scripts/scheduler.js

# Run immediately, then continue on schedule
node scripts/scheduler.js --run-now
```

Configure schedule in `.env`:
```env
UPDATE_AGENT_SCHEDULE=0 2 * * *  # Daily at 2 AM
UPDATE_AGENT_MODE=incremental
```

Cron syntax examples:
- `0 2 * * *` - Daily at 2 AM
- `0 */6 * * *` - Every 6 hours
- `0 0 * * 0` - Weekly on Sunday midnight
- `0 0 1 * *` - Monthly on the 1st

---

## Update Modes

### Incremental (Default)
Fast updates for changed tools only. Uses Gemini AI verification.

```bash
./scripts/quickUpdate.sh
```

**Use when:** Daily/regular updates
**Duration:** 5-30 minutes (depends on limit)

### Full
Comprehensive update checking all URLs and full verification.

```bash
./scripts/quickUpdate.sh --full
```

**Use when:** Weekly deep checks
**Duration:** 2-4 hours for 1000 tools

### Verify
Validates data accuracy without URL checks.

```bash
./scripts/quickUpdate.sh --verify
```

**Use when:** Data quality checks
**Duration:** 1-2 hours for 1000 tools

---

## Features in Detail

### 1. AI Verification (Gemini)

For each tool, Gemini AI checks:
- ✅ Is the tool still active?
- ✅ Is the description accurate?
- ✅ Has it been rebranded?
- ✅ Is the category correct?
- ✅ What's the pricing model?
- ✅ Overall trust score (0-10)

Example verification:
```javascript
{
  "active": true,
  "descriptionAccurate": true,
  "rebranded": false,
  "suggestedCategory": "Code Assistant",
  "improvedDescription": "AI-powered code completion and assistance tool",
  "pricing": "paid",
  "trustScore": 8.5
}
```

### 2. Dead Link Detection

Checks if tool URLs are accessible:
- HTTP status codes
- Redirect detection
- Timeout handling
- Tags dead links automatically

### 3. Known Outdated Tools

Automatically updates known rebranded tools:

```json
{
  "knownOutdatedTools": [
    {
      "name": "Replit Ghostwriter",
      "newName": "Replit AI",
      "reason": "Rebranded to Replit AI in 2023"
    }
  ]
}
```

### 4. Data Validation

Ensures data quality:
- Required fields check
- URL format validation
- Description length (20-200 chars)
- Category validation
- Type checking

### 5. Rate Limiting

Respects source limitations:
- 10 requests per minute
- 100 requests per hour
- 3-second delay between requests
- Configurable in `trusted-resources.json`

---

## Configuration

### Environment Variables (`.env`)

```env
# Required
GEMINI_API_KEY=your_api_key_here

# Optional
PRODUCT_HUNT_API_KEY=your_key
UPDATE_AGENT_MODE=incremental
UPDATE_AGENT_SCHEDULE=0 2 * * *
```

### Trusted Resources (`config/trusted-resources.json`)

Configure data sources, validation rules, and update schedules:

```json
{
  "dataSources": {
    "primary": [...],
    "verification": [...]
  },
  "scrapingRules": {
    "rateLimit": {
      "requestsPerMinute": 10,
      "delayBetweenRequests": 3000
    }
  },
  "dataValidation": {
    "requiredFields": ["name", "url", "description", "category"]
  }
}
```

---

## Output & Logging

### Console Output

```
[2025-01-30T10:30:00.000Z] [INFO] ============================================================
[2025-01-30T10:30:00.000Z] [INFO] AI Tools Update Agent Started
[2025-01-30T10:30:00.000Z] [INFO] Mode: incremental
[2025-01-30T10:30:00.000Z] [INFO] ============================================================
[2025-01-30T10:30:01.000Z] [INFO] Loaded 1000 tools
[2025-01-30T10:30:01.000Z] [INFO] Processing [1] ChatGPT
[2025-01-30T10:30:05.000Z] [SUCCESS] Verified ChatGPT with Gemini
[2025-01-30T10:30:05.000Z] [INFO] Processing [2] DALL-E 2
...
[2025-01-30T10:45:00.000Z] [INFO] ============================================================
[2025-01-30T10:45:00.000Z] [INFO] Update Agent Completed
[2025-01-30T10:45:00.000Z] [INFO] Duration: 900.00s
[2025-01-30T10:45:00.000Z] [INFO] Processed: 100
[2025-01-30T10:45:00.000Z] [INFO] Updated: 23
[2025-01-30T10:45:00.000Z] [INFO] Verified: 100
[2025-01-30T10:45:00.000Z] [INFO] Dead Links: 2
[2025-01-30T10:45:00.000Z] [INFO] Errors: 0
[2025-01-30T10:45:00.000Z] [INFO] ============================================================
```

### Log Files

Located in `logs/update-agent.log`:
- Timestamped entries
- All operations logged
- Error tracking
- Verification results

### Backups

Automatic backups before updates:
- `data/tools.backup.1706614800000.json`
- Timestamp-based naming
- Restore if needed

---

## Troubleshooting

### "GEMINI_API_KEY not set"

```bash
# Add to .env file
echo "GEMINI_API_KEY=your_key_here" >> .env
```

Get key: https://ai.google.dev/

### "Rate limit exceeded"

Adjust in `config/trusted-resources.json`:

```json
{
  "scrapingRules": {
    "rateLimit": {
      "requestsPerMinute": 5,
      "delayBetweenRequests": 6000
    }
  }
}
```

### "Dependencies not installed"

```bash
npm install
```

### "Permission denied: quickUpdate.sh"

```bash
chmod +x scripts/quickUpdate.sh
```

### Gemini API Errors

Check your API key and quota:
- Verify key at https://ai.google.dev/
- Check API quota limits
- Free tier: 60 requests per minute

---

## Best Practices

### 1. Start Small
```bash
# Test with 10 tools first
./scripts/quickUpdate.sh --dry-run --limit 10
```

### 2. Regular Updates
```bash
# Set up daily incremental updates
node scripts/scheduler.js
```

### 3. Weekly Deep Checks
```bash
# Run full update weekly
0 0 * * 0 cd /path/to/aitoday && ./scripts/quickUpdate.sh --full
```

### 4. Monitor Logs
```bash
# Check recent logs
tail -f logs/update-agent.log
```

### 5. Backup Before Major Updates
```bash
# Manual backup
cp data/tools.json data/tools.backup.$(date +%s).json
```

---

## API Costs

### Google Gemini API

Free tier (as of 2025):
- 60 requests per minute
- 1,500 requests per day
- ~$0 for moderate use

For 1000 tools:
- Incremental (100 tools): **FREE**
- Full update (1000 tools): **FREE** (spread over time)

Paid tier:
- $0.00025 per request
- 1000 tools = ~$0.25

Get API key: https://ai.google.dev/

### Product Hunt API (Optional)

Free tier:
- 200 requests per hour
- Personal use

See: https://api.producthunt.com/v2/docs

---

## Advanced Usage

### Custom Update Schedule

Edit `scheduler.js` or set in `.env`:

```javascript
// Every 6 hours
UPDATE_AGENT_SCHEDULE=0 */6 * * *

// Weekdays at 3 AM
UPDATE_AGENT_SCHEDULE=0 3 * * 1-5

// First day of month
UPDATE_AGENT_SCHEDULE=0 0 1 * *
```

### Filter Specific Categories

Modify `updateAgent.js`:

```javascript
const toolsToProcess = tools.filter(t =>
  t.category === 'Code Assistant' || t.category === 'Developer Tools'
);
```

### Add Custom Validation

In `trusted-resources.json`:

```json
{
  "dataValidation": {
    "requiredFields": ["name", "url", "description", "category", "rating"],
    "minRating": 3.0,
    "customRules": {
      "blockDomains": ["spam.com", "malicious.io"]
    }
  }
}
```

---

## Examples

### Example 1: Daily Auto-Update

```bash
# 1. Configure .env
UPDATE_AGENT_SCHEDULE=0 2 * * *
UPDATE_AGENT_MODE=incremental
GEMINI_API_KEY=your_key

# 2. Start scheduler
node scripts/scheduler.js

# Runs every day at 2 AM automatically
```

### Example 2: Manual Weekly Update

```bash
# Every Sunday, full update
./scripts/quickUpdate.sh --full > logs/weekly-update.log 2>&1
```

### Example 3: Test New Tools

```bash
# Add new tools to tools.json, then verify
./scripts/quickUpdate.sh --verify --limit 50 --verbose
```

---

## Project Structure

```
aitoday/
├── config/
│   └── trusted-resources.json      # Data sources configuration
├── data/
│   ├── tools.json                  # Main tools database
│   └── tools.backup.*.json         # Auto-generated backups
├── scripts/
│   ├── updateAgent.js              # Main update agent
│   ├── scheduler.js                # Automated scheduler
│   └── quickUpdate.sh              # Quick update script
├── logs/
│   └── update-agent.log            # Operation logs
├── docs/
│   └── UPDATE_AGENT.md             # This file
└── .env                            # Configuration (create from .env.example)
```

---

## FAQ

**Q: How often should I run updates?**
A: Incremental updates daily, full updates weekly.

**Q: Is Gemini API required?**
A: No, but strongly recommended for verification. The agent will run without it but skip AI verification.

**Q: What happens to my existing data?**
A: Automatic backups are created before any changes.

**Q: Can I undo changes?**
A: Yes, restore from `data/tools.backup.*.json` files.

**Q: How long does a full update take?**
A: 2-4 hours for 1000 tools (with rate limiting).

**Q: Can I run multiple updates simultaneously?**
A: No, the scheduler prevents concurrent runs.

**Q: Is my API key secure?**
A: Yes, stored in `.env` (not committed to git). Never share your `.env` file.

---

## Support

- **Documentation**: `docs/UPDATE_AGENT.md`
- **Configuration**: `config/trusted-resources.json`
- **Logs**: `logs/update-agent.log`
- **Issues**: Check logs first, then review validation errors

---

## License

Part of AIStoreHub/AIToday project - see main README.md for license information.

---

**Last Updated**: January 2025
**Version**: 1.0.0
