const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/aitoday';

const ToolSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true },
  category: { type: String, required: true },
  logo: { type: String, required: true },
  screenshot: { type: String, required: true },
  tags: [{ type: String }],
  isFree: { type: Boolean, default: false },
  popularity: { type: Number, default: 0 },
  rating: { type: String, default: '4.0' },
  createdAt: { type: String, default: () => new Date().toISOString() },
});

const Tool = mongoose.model('Tool', ToolSchema);

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    console.log('Clearing existing data...');
    await Tool.deleteMany({});
    console.log('✅ Cleared existing data');

    console.log('Reading tools data...');
    const toolsPath = path.join(__dirname, '..', 'data', 'tools.json');
    const toolsData = JSON.parse(fs.readFileSync(toolsPath, 'utf-8'));
    console.log(`✅ Loaded ${toolsData.length} tools`);

    console.log('Inserting tools into database...');
    await Tool.insertMany(toolsData);
    console.log('✅ Successfully seeded database');

    const count = await Tool.countDocuments();
    console.log(`📊 Total tools in database: ${count}`);

    await mongoose.connection.close();
    console.log('✅ Database connection closed');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
