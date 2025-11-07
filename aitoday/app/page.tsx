'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import SearchBar from '@/components/SearchBar';
import ToolCard from '@/components/ToolCard';
import { FiTrendingUp, FiChevronLeft, FiChevronRight, FiFilter } from 'react-icons/fi';

interface Tool {
  id: number;
  name: string;
  description: string;
  url: string;
  category: string;
  logo: string;
  screenshot: string;
  tags: string[];
  isFree: boolean;
  popularity: number;
  rating: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
}

export default function Home() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [featuredTool, setFeaturedTool] = useState<Tool | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 24,
    total: 0,
    totalPages: 0,
    hasMore: false,
  });

  useEffect(() => {
    fetchTools();
  }, [pagination.page, searchQuery, selectedCategory, sortBy]);

  const fetchTools = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        search: searchQuery,
        category: selectedCategory,
        sort: sortBy,
      });

      const response = await fetch(`/api/tools?${params}`);
      const data = await response.json();

      setTools(data.tools);
      setPagination(data.pagination);

      // Set featured tool (first tool or random popular tool)
      if (data.tools.length > 0 && !featuredTool) {
        const popularTools = data.tools.filter((t: Tool) => t.tags.includes('popular'));
        const featured = popularTools.length > 0
          ? popularTools[Math.floor(Math.random() * popularTools.length)]
          : data.tools[0];
        setFeaturedTool(featured);
      }
    } catch (error) {
      console.error('Error fetching tools:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPagination({ ...pagination, page: 1 });
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setPagination({ ...pagination, page: 1 });
  };

  const handlePageChange = (newPage: number) => {
    setPagination({ ...pagination, page: newPage });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold font-heading text-gray-900 mb-4">
              Discover the Best{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Tools
              </span>
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Explore 1,000+ AI-powered tools to supercharge your productivity
            </p>

            {/* Search Bar */}
            <SearchBar onSearch={handleSearch} />

            {/* Sort & Filter Options */}
            <div className="flex flex-wrap items-center gap-4 mt-6">
              <div className="flex items-center gap-2">
                <FiFilter className="text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Sort by:</span>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm font-medium"
              >
                <option value="popularity">Most Popular</option>
                <option value="name">Name (A-Z)</option>
                <option value="newest">Newest First</option>
              </select>

              {selectedCategory && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {selectedCategory}
                </span>
              )}

              {searchQuery && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                  Search: {searchQuery}
                </span>
              )}
            </div>
          </div>

          {/* Product of the Day */}
          {featuredTool && !searchQuery && !selectedCategory && (
            <div className="mb-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <FiTrendingUp className="w-6 h-6" />
                <h2 className="text-2xl font-bold font-heading">Product of the Day</h2>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 rounded-xl bg-white flex items-center justify-center flex-shrink-0">
                    <img
                      src={featuredTool.logo}
                      alt={featuredTool.name}
                      className="w-16 h-16 object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64'%3E%3Crect width='64' height='64' fill='%236366f1'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='32' font-weight='bold'%3E${featuredTool.name.charAt(0)}%3C/text%3E%3C/svg%3E`;
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">{featuredTool.name}</h3>
                    <p className="text-white/90 mb-4">{featuredTool.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                        {featuredTool.category}
                      </span>
                      {featuredTool.isFree && (
                        <span className="px-3 py-1 bg-green-500/90 rounded-full text-sm font-medium">
                          Free
                        </span>
                      )}
                    </div>
                    <a
                      href={featuredTool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                    >
                      Visit Tool →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-sm text-gray-600">
              Showing {tools.length} of {pagination.total} tools
            </p>
          </div>

          {/* Tools Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-gray-200 p-4 animate-pulse"
                >
                  <div className="flex">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg mr-4"></div>
                    <div className="flex-1">
                      <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                      <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : tools.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No tools found</h3>
              <p className="text-gray-600">
                Try adjusting your search or filters to find what you're looking for.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && tools.length > 0 && pagination.totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center gap-2">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                <FiChevronLeft />
                Previous
              </button>

              <div className="flex gap-2">
                {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                  let pageNum;
                  if (pagination.totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (pagination.page <= 3) {
                    pageNum = i + 1;
                  } else if (pagination.page >= pagination.totalPages - 2) {
                    pageNum = pagination.totalPages - 4 + i;
                  } else {
                    pageNum = pagination.page - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                        pagination.page === pageNum
                          ? 'bg-blue-600 text-white'
                          : 'border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={!pagination.hasMore}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                Next
                <FiChevronRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
