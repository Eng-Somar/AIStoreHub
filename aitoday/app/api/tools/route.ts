import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Tool from '@/models/Tool';
import toolsData from '@/data/tools.json';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '24');
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const sort = searchParams.get('sort') || 'popularity';

    // Use static data for now (fallback if MongoDB is not available)
    let filteredTools = [...toolsData];

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filteredTools = filteredTools.filter(tool =>
        tool.name.toLowerCase().includes(searchLower) ||
        tool.description.toLowerCase().includes(searchLower)
      );
    }

    // Category filter
    if (category) {
      filteredTools = filteredTools.filter(tool => tool.category === category);
    }

    // Sort
    if (sort === 'popularity') {
      filteredTools.sort((a, b) => b.popularity - a.popularity);
    } else if (sort === 'name') {
      filteredTools.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'newest') {
      filteredTools.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    // Pagination
    const total = filteredTools.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedTools = filteredTools.slice(startIndex, endIndex);

    return NextResponse.json({
      tools: paginatedTools,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasMore: page < totalPages,
      },
    });
  } catch (error) {
    console.error('Error fetching tools:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tools' },
      { status: 500 }
    );
  }
}
