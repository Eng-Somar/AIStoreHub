'use client';

import { FiTrendingUp, FiUsers, FiEye, FiStar } from 'react-icons/fi';

export default function AnalyticsPage() {
  const stats = [
    {
      label: 'Total Tools',
      value: '1,000+',
      icon: FiStar,
      color: 'from-blue-500 to-blue-600',
    },
    {
      label: 'Monthly Visitors',
      value: '50K+',
      icon: FiUsers,
      color: 'from-purple-500 to-purple-600',
    },
    {
      label: 'Page Views',
      value: '200K+',
      icon: FiEye,
      color: 'from-pink-500 to-pink-600',
    },
    {
      label: 'Growth Rate',
      value: '+25%',
      icon: FiTrendingUp,
      color: 'from-green-500 to-green-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-heading text-gray-900 mb-4">
            Platform Analytics
          </h1>
          <p className="text-lg text-gray-600">
            Track the growth and performance of AIToday
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${stat.color} mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-bold font-heading text-gray-900 mb-2">
                  {stat.value}
                </h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">
            Top Categories
          </h2>
          <div className="space-y-4">
            {[
              { name: 'Image Generation', count: 150 },
              { name: 'Writing', count: 120 },
              { name: 'Developer Tools', count: 100 },
              { name: 'Productivity', count: 95 },
              { name: 'Marketing', count: 85 },
            ].map((category, index) => (
              <div key={category.name} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-900">{category.name}</span>
                    <span className="text-sm text-gray-600">{category.count} tools</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                      style={{ width: `${(category.count / 150) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
