'use client';

import { useState, useEffect } from 'react';
import { FiFilter } from 'react-icons/fi';

interface SidebarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CATEGORIES = [
  'All Tools',
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

export default function Sidebar({ selectedCategory, onCategoryChange }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-4 right-4 z-40 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      >
        <FiFilter className="w-6 h-6" />
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] bg-white border-r border-gray-200
          overflow-y-auto z-40 transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          w-64 lg:w-64
        `}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold font-heading text-gray-900">Categories</h2>
          </div>

          <div className="space-y-1">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => {
                  onCategoryChange(category === 'All Tools' ? '' : category);
                  setIsOpen(false);
                }}
                className={`
                  w-full text-left px-4 py-2.5 rounded-lg transition-all font-medium
                  ${
                    selectedCategory === (category === 'All Tools' ? '' : category)
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
