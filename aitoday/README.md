# AIToday - AI Tools Directory

A comprehensive directory of 1,000+ AI tools, built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **1,000+ AI Tools**: Comprehensive catalog of AI tools across 35+ categories
- **Advanced Search**: Real-time search with intelligent filtering
- **Category Filtering**: Browse tools by category with a responsive sidebar
- **Pagination**: Smooth pagination for browsing large datasets
- **Sorting Options**: Sort by popularity, name, or newest first
- **Product of the Day**: Featured tool highlighting
- **Submit Tool**: Community-driven tool submissions
- **Responsive Design**: Mobile-first, fully responsive layout
- **Modern UI**: Clean, professional design with Inter and Poppins fonts
- **Fast Performance**: Optimized with Next.js 14 and Turbopack

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3
- **Icons**: React Icons
- **Database**: MongoDB (optional - works with static JSON data)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd aitoday
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
aitoday/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── tools/        # Tools listing API
│   │   ├── submit/       # Tool submission API
│   │   └── categories/   # Categories API
│   ├── analytics/        # Analytics page
│   ├── login/           # Login page
│   ├── submit/          # Submit tool page
│   ├── subscribe/       # Subscribe page
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── components/            # React components
│   ├── Navbar.tsx       # Navigation bar
│   ├── Sidebar.tsx      # Category sidebar
│   ├── Footer.tsx       # Footer
│   ├── ToolCard.tsx     # Tool card component
│   └── SearchBar.tsx    # Search bar component
├── data/                  # Static data
│   └── tools.json       # 1,000 AI tools dataset
├── lib/                   # Utilities
│   └── mongodb.ts       # MongoDB connection
├── models/                # Database models
│   └── Tool.ts          # Tool model
├── scripts/               # Utility scripts
│   ├── generateTools.js # Generate tools data
│   └── seedDatabase.js  # Seed MongoDB
└── public/                # Static assets

```

## Data

The project includes a dataset of 1,000 AI tools with:
- Tool name
- Description
- URL
- Category
- Logo (via Clearbit API)
- Screenshot (via Thum.io API)
- Tags (free, popular, trending, new)
- Popularity score
- Rating

## API Routes

### GET /api/tools
Fetch tools with pagination, search, and filtering

Query parameters:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 24)
- `search`: Search query
- `category`: Filter by category
- `sort`: Sort by (popularity, name, newest)

### POST /api/submit
Submit a new tool

Body:
```json
{
  "name": "Tool Name",
  "url": "https://example.com",
  "description": "Tool description",
  "category": "Category Name"
}
```

### GET /api/categories
Get all available categories

## Environment Variables

Create a `.env.local` file (optional):

```env
# MongoDB Connection (optional - app works with static data)
MONGODB_URI=mongodb://localhost:27017/aitoday
```

## Deployment

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
cd aitoday
vercel
```

3. Follow the prompts to complete deployment

### Deploy with GitHub

1. Push code to GitHub
2. Import project in Vercel dashboard
3. Configure build settings (auto-detected)
4. Deploy

## Features Overview

### Homepage
- Hero section with search
- Product of the Day showcase
- Grid of tool cards
- Pagination controls
- Sort and filter options

### Tool Cards
- Tool logo
- Name and category
- Short description
- Tags (Free, Popular, Trending, New)
- Rating display
- External link

### Categories
35+ categories including:
- Artificial Intelligence
- Productivity
- Marketing
- Developer Tools
- Design
- Content Creation
- And many more...

## Contributing

Contributions are welcome! To add a new tool:
1. Visit the "Submit Tool" page
2. Fill in the tool details
3. Submit for review

## License

MIT License - feel free to use this project for your own purposes.

## Credits

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [React Icons](https://react-icons.github.io/react-icons/)
- Fonts from [Google Fonts](https://fonts.google.com/)
- Tool logos via [Clearbit Logo API](https://clearbit.com/logo)
- Screenshots via [Thum.io](https://www.thum.io/)

## Support

For issues or questions, please open an issue on GitHub.
