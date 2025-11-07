'use client';

import { useState } from 'react';
import { FiPlusCircle, FiCheck, FiAlertCircle } from 'react-icons/fi';

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

export default function SubmitPage() {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    category: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message || 'Tool submitted successfully!');
        setFormData({ name: '', url: '', description: '', category: '' });
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to submit tool');
      }
    } catch (error) {
      setStatus('error');
      setMessage('An error occurred. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
            <FiPlusCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold font-heading text-gray-900 mb-4">
            Submit an AI Tool
          </h1>
          <p className="text-lg text-gray-600">
            Share your favorite AI tool with our community
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tool Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Tool Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="e.g., ChatGPT"
              />
            </div>

            {/* Tool URL */}
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                Website URL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                id="url"
                name="url"
                required
                value={formData.url}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="https://example.com"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="Describe what this tool does and its key features..."
              />
              <p className="mt-2 text-sm text-gray-500">
                Keep it concise and informative (max 200 characters recommended)
              </p>
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
              >
                <option value="">Select a category</option>
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Message */}
            {status === 'success' && (
              <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                <FiCheck className="w-5 h-5 text-green-600 flex-shrink-0" />
                <p className="text-green-800">{message}</p>
              </div>
            )}

            {status === 'error' && (
              <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                <FiAlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-red-800">{message}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {status === 'loading' ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <FiPlusCircle className="w-5 h-5" />
                  Submit Tool
                </>
              )}
            </button>
          </form>

          {/* Guidelines */}
          <div className="mt-8 p-6 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-3">Submission Guidelines</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Make sure the tool is actively maintained and functional</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Provide a clear and concise description of what the tool does</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Choose the most appropriate category for your tool</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>All submissions will be reviewed before being published</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
