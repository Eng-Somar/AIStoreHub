'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FiMenu, FiX, FiTrendingUp, FiPlusCircle, FiUser, FiBell } from 'react-icons/fi';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl font-heading">AI</span>
              </div>
              <span className="text-2xl font-bold font-heading bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AIToday
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/analytics"
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <FiTrendingUp className="w-5 h-5" />
              <span className="font-medium">Analytics</span>
            </Link>
            <Link
              href="/submit"
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <FiPlusCircle className="w-5 h-5" />
              <span className="font-medium">Submit Tool</span>
            </Link>
            <Link
              href="/login"
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <FiUser className="w-5 h-5" />
              <span className="font-medium">Login</span>
            </Link>
            <Link
              href="/subscribe"
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
            >
              <FiBell className="w-5 h-5" />
              <span className="font-medium">Subscribe</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {mobileMenuOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-3 space-y-3">
            <Link
              href="/analytics"
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FiTrendingUp className="w-5 h-5" />
              <span className="font-medium">Analytics</span>
            </Link>
            <Link
              href="/submit"
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FiPlusCircle className="w-5 h-5" />
              <span className="font-medium">Submit Tool</span>
            </Link>
            <Link
              href="/login"
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FiUser className="w-5 h-5" />
              <span className="font-medium">Login</span>
            </Link>
            <Link
              href="/subscribe"
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FiBell className="w-5 h-5" />
              <span className="font-medium">Subscribe</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
