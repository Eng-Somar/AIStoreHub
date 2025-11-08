/**
 * AI Tools Update Agent
 *
 * Automatically updates AI tools data using trusted sources and Gemini API verification
 *
 * Features:
 * - Fetches data from multiple trusted sources
 * - Uses Gemini API for verification and enhancement
 * - Validates tool information
 * - Checks for outdated/dead links
 * - Updates tools.json with fresh data
 *
 * Usage:
 *   node scripts/updateAgent.js [options]
 *
 * Options:
 *   --mode <type>       Update mode: full, incremental, verify (default: incremental)
 *   --dry-run          Preview changes without writing to file
 *   --verbose          Enable detailed logging
 *   --limit <number>   Limit number of tools to process
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');

class AIToolsUpdateAgent {
  constructor(config = {}) {
    this.configPath = path.join(__dirname, '../config/trusted-resources.json');
    this.toolsPath = path.join(__dirname, '../data/tools.json');
    this.logPath = path.join(__dirname, '../logs/update-agent.log');

    // Load configuration
    this.config = this.loadConfig();

    // Options
    this.mode = config.mode || 'incremental';
    this.dryRun = config.dryRun || false;
    this.verbose = config.verbose || false;
    this.limit = config.limit || null;

    // Gemini API
    this.geminiApiKey = process.env.GEMINI_API_KEY;
    this.geminiApiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';

    // Statistics
    this.stats = {
      processed: 0,
      updated: 0,
      verified: 0,
      errors: 0,
      deadLinks: 0,
      startTime: new Date()
    };
  }

  /**
   * Load configuration from trusted-resources.json
   */
  loadConfig() {
    try {
      const configData = fs.readFileSync(this.configPath, 'utf8');
      return JSON.parse(configData);
    } catch (error) {
      this.log('ERROR', `Failed to load config: ${error.message}`);
      return null;
    }
  }

  /**
   * Load current tools data
   */
  loadTools() {
    try {
      const toolsData = fs.readFileSync(this.toolsPath, 'utf8');
      return JSON.parse(toolsData);
    } catch (error) {
      this.log('ERROR', `Failed to load tools: ${error.message}`);
      return [];
    }
  }

  /**
   * Save updated tools data
   */
  saveTools(tools) {
    if (this.dryRun) {
      this.log('INFO', 'DRY RUN: Would save tools.json');
      return;
    }

    try {
      // Create backup
      const backupPath = this.toolsPath.replace('.json', `.backup.${Date.now()}.json`);
      fs.copyFileSync(this.toolsPath, backupPath);
      this.log('INFO', `Backup created: ${backupPath}`);

      // Save updated data
      fs.writeFileSync(this.toolsPath, JSON.stringify(tools, null, 2));
      this.log('SUCCESS', 'Tools data updated successfully');
    } catch (error) {
      this.log('ERROR', `Failed to save tools: ${error.message}`);
    }
  }

  /**
   * Logging function
   */
  log(level, message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level}] ${message}`;

    console.log(logMessage);

    // Append to log file
    try {
      const logDir = path.dirname(this.logPath);
      if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
      }
      fs.appendFileSync(this.logPath, logMessage + '\n');
    } catch (error) {
      console.error('Failed to write to log file:', error.message);
    }
  }

  /**
   * Verify tool using Gemini API
   */
  async verifyToolWithGemini(tool) {
    if (!this.geminiApiKey) {
      this.log('WARN', 'Gemini API key not set. Skipping AI verification.');
      return { verified: false, reason: 'No API key' };
    }

    try {
      const prompt = `Analyze this AI tool and verify its information. Check if it's still active, if the description is accurate, and if there are any known changes or rebrands.

Tool Information:
- Name: ${tool.name}
- URL: ${tool.url}
- Description: ${tool.description}
- Category: ${tool.category}

Please provide:
1. Is this tool still active? (yes/no/unknown)
2. Is the description accurate and up-to-date? (yes/no)
3. Has this tool been rebranded or renamed? If yes, what's the new name?
4. Suggested category (from this list: ${this.config.dataValidation.allowedCategories.join(', ')})
5. Improved description (max 150 characters, focus on key features)
6. Is it free or paid? (free/paid/freemium)
7. Overall trust score (0-10)

Respond in JSON format:
{
  "active": true/false,
  "descriptionAccurate": true/false,
  "rebranded": false or "new name",
  "suggestedCategory": "category name",
  "improvedDescription": "description",
  "pricing": "free/paid/freemium",
  "trustScore": 0-10,
  "notes": "any additional notes"
}`;

      const response = await axios.post(
        this.geminiApiUrl,
        {
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.3,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          params: {
            key: this.geminiApiKey
          },
          timeout: 30000
        }
      );

      if (response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        const text = response.data.candidates[0].content.parts[0].text;
        // Extract JSON from markdown code blocks if present
        const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const jsonText = jsonMatch[1] || jsonMatch[0];
          const result = JSON.parse(jsonText);
          this.stats.verified++;
          return { verified: true, data: result };
        }
      }

      return { verified: false, reason: 'Invalid response format' };
    } catch (error) {
      this.log('ERROR', `Gemini API error for ${tool.name}: ${error.message}`);
      this.stats.errors++;
      return { verified: false, reason: error.message };
    }
  }

  /**
   * Check if URL is accessible
   */
  async checkUrlStatus(url) {
    try {
      const response = await axios.head(url, {
        timeout: 10000,
        maxRedirects: 5,
        validateStatus: (status) => status < 500
      });
      return {
        accessible: response.status < 400,
        status: response.status,
        redirected: response.request.res.responseUrl !== url,
        finalUrl: response.request.res.responseUrl
      };
    } catch (error) {
      this.log('WARN', `URL check failed for ${url}: ${error.message}`);
      return {
        accessible: false,
        status: 0,
        error: error.message
      };
    }
  }

  /**
   * Validate tool data
   */
  validateTool(tool) {
    const validation = this.config.dataValidation;
    const errors = [];

    // Check required fields
    for (const field of validation.requiredFields) {
      if (!tool[field]) {
        errors.push(`Missing required field: ${field}`);
      }
    }

    // Validate URL
    if (validation.urlValidation && tool.url) {
      try {
        new URL(tool.url);
      } catch (e) {
        errors.push(`Invalid URL: ${tool.url}`);
      }
    }

    // Validate description length
    if (tool.description) {
      if (tool.description.length < validation.descriptionMinLength) {
        errors.push(`Description too short (min ${validation.descriptionMinLength} chars)`);
      }
      if (tool.description.length > validation.descriptionMaxLength) {
        errors.push(`Description too long (max ${validation.descriptionMaxLength} chars)`);
      }
    }

    // Validate category
    if (tool.category && !validation.allowedCategories.includes(tool.category)) {
      errors.push(`Invalid category: ${tool.category}`);
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Update tool metadata
   */
  updateToolMetadata(tool, verificationResult) {
    const updated = { ...tool };
    updated.lastVerified = new Date().toISOString();

    if (verificationResult.verified && verificationResult.data) {
      const data = verificationResult.data;

      // Update description if improved
      if (data.improvedDescription && data.descriptionAccurate === false) {
        updated.description = data.improvedDescription;
        updated.descriptionUpdated = true;
      }

      // Update category if suggested
      if (data.suggestedCategory && data.suggestedCategory !== tool.category) {
        if (this.config.dataValidation.allowedCategories.includes(data.suggestedCategory)) {
          updated.category = data.suggestedCategory;
          updated.categoryUpdated = true;
        }
      }

      // Update pricing
      if (data.pricing === 'free' || data.pricing === 'freemium') {
        updated.isFree = true;
      } else if (data.pricing === 'paid') {
        updated.isFree = false;
      }

      // Check for rebrand
      if (data.rebranded && data.rebranded !== false) {
        updated.name = data.rebranded;
        updated.rebranded = true;
        updated.oldName = tool.name;
      }

      // Add trust score
      if (data.trustScore !== undefined) {
        updated.trustScore = data.trustScore;
      }

      // Mark as inactive if needed
      if (data.active === false) {
        updated.active = false;
        updated.tags = [...(updated.tags || []), 'inactive'];
      }
    }

    return updated;
  }

  /**
   * Process single tool
   */
  async processTool(tool, index) {
    this.log('INFO', `Processing [${index + 1}] ${tool.name}`);

    // Validate tool data
    const validation = this.validateTool(tool);
    if (!validation.valid) {
      this.log('WARN', `Validation errors for ${tool.name}: ${validation.errors.join(', ')}`);
    }

    let updated = { ...tool };

    // Check URL status
    if (this.mode === 'full' || this.mode === 'verify') {
      const urlStatus = await this.checkUrlStatus(tool.url);
      if (!urlStatus.accessible) {
        this.log('WARN', `Dead link detected: ${tool.name} - ${tool.url}`);
        updated.tags = [...(updated.tags || []), 'dead-link'];
        this.stats.deadLinks++;
      }
    }

    // Verify with Gemini
    const verificationResult = await this.verifyToolWithGemini(tool);
    if (verificationResult.verified) {
      updated = this.updateToolMetadata(updated, verificationResult);
      this.stats.updated++;
    }

    // Add delay to respect rate limits
    await this.sleep(this.config.scrapingRules.rateLimit.delayBetweenRequests);

    this.stats.processed++;
    return updated;
  }

  /**
   * Sleep helper
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Check for known outdated tools
   */
  checkKnownOutdated(tools) {
    const outdatedList = this.config.knownOutdatedTools;
    let updatedTools = [...tools];

    outdatedList.forEach(outdated => {
      const index = updatedTools.findIndex(t => t.name === outdated.name);
      if (index !== -1) {
        this.log('INFO', `Found outdated tool: ${outdated.name} -> ${outdated.newName}`);
        updatedTools[index].name = outdated.newName;
        updatedTools[index].oldName = outdated.name;
        updatedTools[index].rebranded = true;
        this.stats.updated++;
      }
    });

    return updatedTools;
  }

  /**
   * Main run function
   */
  async run() {
    this.log('INFO', '='.repeat(60));
    this.log('INFO', 'AI Tools Update Agent Started');
    this.log('INFO', `Mode: ${this.mode}`);
    this.log('INFO', `Dry Run: ${this.dryRun}`);
    this.log('INFO', '='.repeat(60));

    // Check Gemini API key
    if (!this.geminiApiKey) {
      this.log('WARN', 'GEMINI_API_KEY environment variable not set!');
      this.log('WARN', 'AI verification will be skipped.');
      this.log('WARN', 'Set your API key: export GEMINI_API_KEY=your_key_here');
    }

    // Load tools
    let tools = this.loadTools();
    this.log('INFO', `Loaded ${tools.length} tools`);

    // Check for known outdated tools
    tools = this.checkKnownOutdated(tools);

    // Limit processing if specified
    const toolsToProcess = this.limit ? tools.slice(0, this.limit) : tools;
    this.log('INFO', `Processing ${toolsToProcess.length} tools`);

    // Process tools
    const updatedTools = [];
    for (let i = 0; i < toolsToProcess.length; i++) {
      try {
        const updated = await this.processTool(toolsToProcess[i], i);
        updatedTools.push(updated);
      } catch (error) {
        this.log('ERROR', `Failed to process tool ${toolsToProcess[i].name}: ${error.message}`);
        updatedTools.push(toolsToProcess[i]); // Keep original on error
        this.stats.errors++;
      }
    }

    // Merge with remaining tools if limited
    const finalTools = this.limit
      ? [...updatedTools, ...tools.slice(this.limit)]
      : updatedTools;

    // Save updated tools
    this.saveTools(finalTools);

    // Print statistics
    const duration = (new Date() - this.stats.startTime) / 1000;
    this.log('INFO', '='.repeat(60));
    this.log('INFO', 'Update Agent Completed');
    this.log('INFO', `Duration: ${duration.toFixed(2)}s`);
    this.log('INFO', `Processed: ${this.stats.processed}`);
    this.log('INFO', `Updated: ${this.stats.updated}`);
    this.log('INFO', `Verified: ${this.stats.verified}`);
    this.log('INFO', `Dead Links: ${this.stats.deadLinks}`);
    this.log('INFO', `Errors: ${this.stats.errors}`);
    this.log('INFO', '='.repeat(60));
  }
}

// CLI execution
if (require.main === module) {
  const args = process.argv.slice(2);
  const config = {
    mode: 'incremental',
    dryRun: false,
    verbose: false,
    limit: null
  };

  // Parse arguments
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--mode' && args[i + 1]) {
      config.mode = args[i + 1];
      i++;
    } else if (args[i] === '--dry-run') {
      config.dryRun = true;
    } else if (args[i] === '--verbose') {
      config.verbose = true;
    } else if (args[i] === '--limit' && args[i + 1]) {
      config.limit = parseInt(args[i + 1]);
      i++;
    } else if (args[i] === '--help') {
      console.log(`
AI Tools Update Agent

Usage:
  node scripts/updateAgent.js [options]

Options:
  --mode <type>       Update mode: full, incremental, verify (default: incremental)
  --dry-run          Preview changes without writing to file
  --verbose          Enable detailed logging
  --limit <number>   Limit number of tools to process
  --help             Show this help message

Examples:
  # Test with 10 tools (dry run)
  node scripts/updateAgent.js --dry-run --limit 10

  # Full update with verification
  node scripts/updateAgent.js --mode full

  # Incremental update (default)
  node scripts/updateAgent.js

Environment Variables:
  GEMINI_API_KEY     Your Google Gemini API key (required for AI verification)

Get your Gemini API key: https://ai.google.dev/
      `);
      process.exit(0);
    }
  }

  // Run agent
  const agent = new AIToolsUpdateAgent(config);
  agent.run().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = AIToolsUpdateAgent;
