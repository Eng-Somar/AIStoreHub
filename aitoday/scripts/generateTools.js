const fs = require('fs');
const path = require('path');

const CATEGORIES = [
  'Artificial Intelligence',
  'Productivity',
  'Marketing',
  'Developer Tools',
  'Design',
  'SEO',
  'Chatbots',
  'Social Media',
  'Content Creation',
  'No Code',
  'Writing',
  'Customer Support',
  'Blogging',
  'Sales',
  'Productized Services',
  'Website Builders',
  'Analytics',
  'iOS',
  'Developer APIs',
  'Video',
  'Building Products',
  'Mac',
  'Feedback Tools',
  'Education',
  'Email',
  'Code Assistant',
  'Image Generation',
  'Audio',
  'Animation',
  'Logo Generation',
  'Photo Editing',
  'Search',
  'Healthcare',
  'Travel',
  'Business',
];

// Real AI tools from various sources
const realTools = [
  { name: 'ChatGPT', url: 'chat.openai.com', category: 'Chatbots', description: 'Powerful language model for text generation and understanding', isFree: true },
  { name: 'DALL-E 2', url: 'openai.com/dall-e-2', category: 'Image Generation', description: 'Create realistic images from text descriptions', isFree: true },
  { name: 'Midjourney', url: 'midjourney.com', category: 'Image Generation', description: 'AI art generator creating stunning visual artwork', isFree: false },
  { name: 'GitHub Copilot', url: 'github.com/features/copilot', category: 'Developer Tools', description: 'Your AI pair programmer powered by OpenAI Codex', isFree: false },
  { name: 'Jasper.ai', url: 'jasper.ai', category: 'Writing', description: 'AI content platform that helps you create amazing content 10x faster', isFree: true },
  { name: 'Copy.ai', url: 'copy.ai', category: 'Marketing', description: 'AI-powered copywriter for marketing content', isFree: true },
  { name: 'Writesonic', url: 'writesonic.com', category: 'Content Creation', description: 'AI writer that creates SEO-optimized content', isFree: true },
  { name: 'Grammarly', url: 'grammarly.com', category: 'Writing', description: 'AI-powered writing assistant', isFree: true },
  { name: 'Notion AI', url: 'notion.so/product/ai', category: 'Productivity', description: 'AI assistant built into Notion workspace', isFree: false },
  { name: 'Runway', url: 'runwayml.com', category: 'Video', description: 'Next-generation content creation suite', isFree: true },
  { name: 'Synthesia', url: 'synthesia.io', category: 'Video', description: 'Create AI videos from text in minutes', isFree: false },
  { name: 'Descript', url: 'descript.com', category: 'Video', description: 'All-in-one video and podcast editing', isFree: true },
  { name: 'Remove.bg', url: 'remove.bg', category: 'Photo Editing', description: 'Remove image backgrounds automatically', isFree: true },
  { name: 'Canva', url: 'canva.com', category: 'Design', description: 'Design platform with AI-powered features', isFree: true },
  { name: 'Figma', url: 'figma.com', category: 'Design', description: 'Collaborative design tool with AI plugins', isFree: true },
  { name: 'Looka', url: 'looka.com', category: 'Logo Generation', description: 'AI-powered logo maker and brand designer', isFree: true },
  { name: 'Brandmark', url: 'brandmark.io', category: 'Logo Generation', description: 'Create unique logos with AI', isFree: false },
  { name: 'Tabnine', url: 'tabnine.com', category: 'Developer Tools', description: 'AI code completion for all major IDEs', isFree: true },
  { name: 'Replit Ghostwriter', url: 'replit.com', category: 'Developer Tools', description: 'AI pair programmer in your IDE', isFree: false },
  { name: 'Soundraw', url: 'soundraw.io', category: 'Audio', description: 'Generate royalty-free music with AI', isFree: true },
  { name: 'Murf.ai', url: 'murf.ai', category: 'Audio', description: 'AI voice generator for voiceovers', isFree: false },
  { name: 'ElevenLabs', url: 'elevenlabs.io', category: 'Audio', description: 'AI voice generator and text to speech', isFree: true },
  { name: 'Krisp', url: 'krisp.ai', category: 'Audio', description: 'AI-powered noise cancellation', isFree: true },
  { name: 'Character.AI', url: 'character.ai', category: 'Chatbots', description: 'Create and chat with AI characters', isFree: true },
  { name: 'Perplexity AI', url: 'perplexity.ai', category: 'Search', description: 'Answer engine delivering accurate answers', isFree: true },
  { name: 'You.com', url: 'you.com', category: 'Search', description: 'AI search engine you control', isFree: true },
  { name: 'Bing AI', url: 'bing.com/chat', category: 'Search', description: 'Microsoft\'s AI-powered search', isFree: true },
  { name: 'Claude', url: 'claude.ai', category: 'Chatbots', description: 'AI assistant by Anthropic for analysis and creation', isFree: true },
  { name: 'Bard', url: 'bard.google.com', category: 'Chatbots', description: 'Google\'s conversational AI service', isFree: true },
  { name: 'Stable Diffusion', url: 'stability.ai', category: 'Image Generation', description: 'Open-source image generation model', isFree: true },
  { name: 'Adobe Firefly', url: 'adobe.com/products/firefly', category: 'Image Generation', description: 'AI art generator by Adobe', isFree: true },
  { name: 'Artbreeder', url: 'artbreeder.com', category: 'Image Generation', description: 'Create art by mixing images', isFree: true },
  { name: 'NightCafe', url: 'nightcafe.studio', category: 'Image Generation', description: 'AI art generator with multiple algorithms', isFree: true },
  { name: 'DeepL', url: 'deepl.com', category: 'Writing', description: 'AI-powered translator', isFree: true },
  { name: 'Quillbot', url: 'quillbot.com', category: 'Writing', description: 'AI paraphrasing and writing tool', isFree: true },
  { name: 'Wordtune', url: 'wordtune.com', category: 'Writing', description: 'AI writing companion', isFree: true },
  { name: 'Otter.ai', url: 'otter.ai', category: 'Productivity', description: 'AI meeting notes and transcription', isFree: true },
  { name: 'Fireflies.ai', url: 'fireflies.ai', category: 'Productivity', description: 'AI meeting assistant', isFree: true },
  { name: 'Calendly', url: 'calendly.com', category: 'Productivity', description: 'AI-powered scheduling', isFree: true },
  { name: 'Superhuman', url: 'superhuman.com', category: 'Email', description: 'Fastest email experience with AI', isFree: false },
  { name: 'SaneBox', url: 'sanebox.com', category: 'Email', description: 'AI email organizer', isFree: false },
  { name: 'HubSpot', url: 'hubspot.com', category: 'Marketing', description: 'CRM with AI-powered features', isFree: true },
  { name: 'Salesforce Einstein', url: 'salesforce.com/products/einstein', category: 'Sales', description: 'AI for CRM', isFree: false },
  { name: 'Intercom', url: 'intercom.com', category: 'Customer Support', description: 'AI customer support platform', isFree: false },
  { name: 'Zendesk', url: 'zendesk.com', category: 'Customer Support', description: 'Customer service with AI', isFree: false },
  { name: 'Zapier', url: 'zapier.com', category: 'No Code', description: 'Automation platform with AI features', isFree: true },
  { name: 'Make', url: 'make.com', category: 'No Code', description: 'Visual automation platform', isFree: true },
  { name: 'Airtable', url: 'airtable.com', category: 'Productivity', description: 'Spreadsheet-database hybrid with AI', isFree: true },
  { name: 'Monday.com', url: 'monday.com', category: 'Productivity', description: 'Work OS with AI capabilities', isFree: true },
  { name: 'ClickUp', url: 'clickup.com', category: 'Productivity', description: 'All-in-one productivity with AI', isFree: true },
];

function generateTools(targetCount) {
  const tools = [];
  let id = 1;

  // Add real tools first
  realTools.forEach(tool => {
    const domain = tool.url.replace('https://', '').replace('http://', '').split('/')[0];
    tools.push({
      id: id++,
      name: tool.name,
      description: tool.description,
      url: `https://${tool.url}`,
      category: tool.category,
      logo: `https://logo.clearbit.com/${domain}`,
      screenshot: `https://image.thum.io/get/width/400/crop/800/noanimate/https://${tool.url}`,
      tags: tool.isFree ? ['free', 'popular'] : ['popular'],
      isFree: tool.isFree,
      popularity: Math.floor(Math.random() * 15000) + 5000,
      rating: (Math.random() * 2 + 3).toFixed(1),
      createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
    });
  });

  // Generate remaining tools to reach target
  const toolPrefixes = [
    'AI', 'Smart', 'Auto', 'Quick', 'Pro', 'Super', 'Mega', 'Ultra', 'Power', 'Elite',
    'Genius', 'Wizard', 'Master', 'Expert', 'Instant', 'Rapid', 'Swift', 'Flash', 'Turbo',
    'Prime', 'Max', 'Plus', 'Advanced', 'Cloud', 'Digital', 'Neural', 'Deep', 'Machine',
    'Cognitive', 'Bright', 'Crystal', 'Diamond', 'Golden', 'Platinum', 'Silver', 'Stellar'
  ];

  const toolTypes = [
    'Writer', 'Generator', 'Creator', 'Builder', 'Maker', 'Assistant', 'Helper', 'Tool',
    'Studio', 'Lab', 'Hub', 'Platform', 'Suite', 'Workspace', 'Engine', 'Bot', 'Agent',
    'Craft', 'Forge', 'Factory', 'Works', 'Pro', 'Expert', 'Mentor', 'Guide', 'Companion',
    'Partner', 'Ally', 'Coach', 'Advisor', 'Consultant', 'Analyzer', 'Optimizer', 'Enhancer'
  ];

  const actionWords = [
    'create', 'generate', 'build', 'design', 'craft', 'make', 'produce', 'develop',
    'enhance', 'improve', 'optimize', 'automate', 'streamline', 'simplify', 'accelerate',
    'boost', 'supercharge', 'transform', 'revolutionize', 'innovate', 'elevate'
  ];

  while (tools.length < targetCount) {
    const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
    const prefix = toolPrefixes[Math.floor(Math.random() * toolPrefixes.length)];
    const type = toolTypes[Math.floor(Math.random() * toolTypes.length)];
    const action = actionWords[Math.floor(Math.random() * actionWords.length)];

    const name = Math.random() > 0.5 ? `${prefix}${type}` : `${prefix} ${type}`;
    const baseDomain = name.toLowerCase().replace(/\s/g, '');
    const tld = Math.random() > 0.7 ? '.ai' : (Math.random() > 0.5 ? '.io' : '.com');
    const domain = `${baseDomain}${tld}`;
    const isFree = Math.random() > 0.4;

    const descriptions = [
      `${action.charAt(0).toUpperCase() + action.slice(1)} amazing ${category.toLowerCase()} content with AI-powered automation`,
      `AI-powered ${category.toLowerCase()} platform that helps you ${action} professional content in minutes`,
      `Transform your ${category.toLowerCase()} workflow with intelligent automation and AI assistance`,
      `${action.charAt(0).toUpperCase() + action.slice(1)} stunning ${category.toLowerCase()} materials using advanced AI technology`,
      `Powerful AI tool designed to ${action} high-quality ${category.toLowerCase()} content effortlessly`,
      `Next-generation ${category.toLowerCase()} solution powered by artificial intelligence`,
      `Automate and ${action} your ${category.toLowerCase()} tasks with cutting-edge AI`,
      `Professional ${category.toLowerCase()} tool that uses AI to ${action} exceptional results`,
    ];

    const description = descriptions[Math.floor(Math.random() * descriptions.length)];

    const tags = [isFree ? 'free' : 'premium'];
    if (Math.random() > 0.6) tags.push('popular');
    if (Math.random() > 0.7) tags.push('trending');
    if (Math.random() > 0.8) tags.push('new');

    tools.push({
      id: id++,
      name: name,
      description: description,
      url: `https://${domain}`,
      category: category,
      logo: `https://logo.clearbit.com/${domain}`,
      screenshot: `https://image.thum.io/get/width/400/crop/800/noanimate/https://${domain}`,
      tags: tags,
      isFree: isFree,
      popularity: Math.floor(Math.random() * 10000) + 100,
      rating: (Math.random() * 2 + 3).toFixed(1),
      createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
    });
  }

  return tools;
}

// Generate exactly 1000 tools
const tools = generateTools(1000);

// Save to JSON
const outputPath = path.join(__dirname, '..', 'data', 'tools.json');
fs.writeFileSync(outputPath, JSON.stringify(tools, null, 2));

console.log(`✅ Generated ${tools.length} AI tools`);
console.log(`📁 Saved to ${outputPath}`);

// Category breakdown
const categoryCount = {};
tools.forEach(tool => {
  categoryCount[tool.category] = (categoryCount[tool.category] || 0) + 1;
});

console.log('\n📊 Category breakdown:');
Object.keys(categoryCount).sort().forEach(category => {
  console.log(`   ${category}: ${categoryCount[category]}`);
});

console.log(`\n💰 Free tools: ${tools.filter(t => t.isFree).length}`);
console.log(`💎 Premium tools: ${tools.filter(t => !t.isFree).length}`);
