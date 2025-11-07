import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

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

export async function GET() {
  return NextResponse.json({ categories: CATEGORIES });
}
