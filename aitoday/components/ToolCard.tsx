'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FiExternalLink, FiStar } from 'react-icons/fi';

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

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
      <div className="flex p-4">
        {/* Logo */}
        <div className="flex-shrink-0 mr-4">
          <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden border border-gray-200">
            <img
              src={tool.logo}
              alt={`${tool.name} logo`}
              className="w-12 h-12 object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Crect width='48' height='48' fill='%236366f1'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='24' font-weight='bold'%3E${tool.name.charAt(0)}%3C/text%3E%3C/svg%3E`;
              }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="text-lg font-bold font-heading text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                {tool.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-500 font-medium">{tool.category}</span>
                {tool.rating && parseFloat(tool.rating) > 0 && (
                  <div className="flex items-center gap-1">
                    <FiStar className="w-3 h-3 text-yellow-500 fill-current" />
                    <span className="text-xs text-gray-600 font-medium">{tool.rating}</span>
                  </div>
                )}
              </div>
            </div>
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 p-2 text-gray-400 hover:text-blue-600 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <FiExternalLink className="w-5 h-5" />
            </a>
          </div>

          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {tool.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tool.isFree && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Free
              </span>
            )}
            {tool.tags.includes('popular') && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Popular
              </span>
            )}
            {tool.tags.includes('trending') && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                Trending
              </span>
            )}
            {tool.tags.includes('new') && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                New
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
