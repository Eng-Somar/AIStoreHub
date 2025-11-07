'use client';

import { useState } from 'react';
import { FiBell, FiCheck, FiMail } from 'react-icons/fi';

export default function SubscribePage() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter subscription logic would go here
    setSubscribed(true);
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6">
            <FiBell className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold font-heading text-gray-900 mb-4">
            Stay Updated
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get the latest AI tools, trends, and insights delivered to your inbox weekly
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 mb-12">
          {subscribed ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <FiCheck className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-2">
                You're Subscribed!
              </h2>
              <p className="text-gray-600">
                Check your email to confirm your subscription.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    placeholder="Enter your email"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all whitespace-nowrap"
                >
                  Subscribe Now
                </button>
              </div>
              <p className="mt-4 text-sm text-gray-500 text-center">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: '🚀',
              title: 'Weekly Updates',
              description: 'New AI tools added to the directory every week',
            },
            {
              icon: '💡',
              title: 'Expert Insights',
              description: 'Tips and tricks from AI industry experts',
            },
            {
              icon: '🎁',
              title: 'Exclusive Deals',
              description: 'Special offers and discounts for subscribers',
            },
          ].map((benefit) => (
            <div
              key={benefit.title}
              className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-lg font-bold font-heading text-gray-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
