/**
 * Update Agent Scheduler
 *
 * Runs the update agent on a schedule using cron-like syntax
 *
 * Usage:
 *   node scripts/scheduler.js
 *
 * Environment Variables:
 *   UPDATE_AGENT_SCHEDULE - Cron expression (default: "0 2 * * *" - daily at 2 AM)
 *   UPDATE_AGENT_MODE - Update mode (default: "incremental")
 *   GEMINI_API_KEY - Required for AI verification
 */

const cron = require('node-cron');
const AIToolsUpdateAgent = require('./updateAgent');
require('dotenv').config();

class UpdateScheduler {
  constructor() {
    this.schedule = process.env.UPDATE_AGENT_SCHEDULE || '0 2 * * *'; // Daily at 2 AM
    this.mode = process.env.UPDATE_AGENT_MODE || 'incremental';
    this.isRunning = false;
  }

  /**
   * Log message with timestamp
   */
  log(message) {
    console.log(`[${new Date().toISOString()}] [SCHEDULER] ${message}`);
  }

  /**
   * Run the update agent
   */
  async runUpdate() {
    if (this.isRunning) {
      this.log('Update already in progress, skipping...');
      return;
    }

    this.isRunning = true;
    this.log(`Starting update agent (mode: ${this.mode})...`);

    try {
      const agent = new AIToolsUpdateAgent({ mode: this.mode });
      await agent.run();
      this.log('Update completed successfully');
    } catch (error) {
      this.log(`Update failed: ${error.message}`);
      console.error(error);
    } finally {
      this.isRunning = false;
    }
  }

  /**
   * Start the scheduler
   */
  start() {
    this.log('='.repeat(60));
    this.log('Update Agent Scheduler Started');
    this.log(`Schedule: ${this.schedule}`);
    this.log(`Mode: ${this.mode}`);
    this.log('='.repeat(60));

    // Validate cron expression
    if (!cron.validate(this.schedule)) {
      this.log(`ERROR: Invalid cron expression: ${this.schedule}`);
      process.exit(1);
    }

    // Schedule the task
    const task = cron.schedule(this.schedule, () => {
      this.runUpdate();
    });

    this.log('Scheduler is running. Press Ctrl+C to stop.');

    // Handle graceful shutdown
    process.on('SIGINT', () => {
      this.log('Stopping scheduler...');
      task.stop();
      process.exit(0);
    });

    process.on('SIGTERM', () => {
      this.log('Stopping scheduler...');
      task.stop();
      process.exit(0);
    });

    // Run once immediately on start (optional)
    const runOnStart = process.argv.includes('--run-now');
    if (runOnStart) {
      this.log('Running update immediately...');
      this.runUpdate();
    }
  }
}

// CLI execution
if (require.main === module) {
  const scheduler = new UpdateScheduler();
  scheduler.start();
}

module.exports = UpdateScheduler;
