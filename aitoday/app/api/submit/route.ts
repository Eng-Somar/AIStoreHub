import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Tool from '@/models/Tool';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, url, description, category } = body;

    // Validate required fields
    if (!name || !url || !description || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Extract domain for logo
    const domain = url.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];

    // Create new tool object
    const newTool = {
      name,
      description,
      url: url.startsWith('http') ? url : `https://${url}`,
      category,
      logo: `https://logo.clearbit.com/${domain}`,
      screenshot: `https://image.thum.io/get/width/400/crop/800/noanimate/${url}`,
      tags: ['new', 'community'],
      isFree: false,
      popularity: 0,
      rating: '0.0',
      createdAt: new Date().toISOString(),
    };

    // For now, just return success
    // In production, you would save this to the database
    return NextResponse.json({
      success: true,
      message: 'Tool submitted successfully! It will be reviewed shortly.',
      tool: newTool,
    });
  } catch (error) {
    console.error('Error submitting tool:', error);
    return NextResponse.json(
      { error: 'Failed to submit tool' },
      { status: 500 }
    );
  }
}
