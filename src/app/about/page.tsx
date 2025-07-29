'use client';

import React from 'react';

export default function AboutPage() {
  return (
    <div className="text-gray-900 dark:text-gray-100">
      <section className="py-20 lg:py-32 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                Experience You Can Trust
              </h1>
            </div>

            <div className="space-y-8 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                <strong className="text-gray-900 dark:text-white">
                  Sparta Mortgage LLC
                </strong>{' '}
                is a single owner, independent mortgage broker licensed in
                Kentucky, Indiana, Florida, and Georgia.
              </p>
              <p>
                Sparta Mortgage formally began{' '}
                <strong className="text-red-600">May 2019</strong> and even
                though very young, the owner brings a background in brokering
                continuously since{' '}
                <strong className="text-red-600">2003</strong>, knowledge,
                integrity and over{' '}
                <strong className="text-red-600">
                  700 successful transactions
                </strong>
                .
              </p>
              <p>
                Sparta Mortgage is and will remain very small.{' '}
                <strong className="text-gray-900 dark:text-white">
                  Bigger is not better in the mortgage industry.
                </strong>{' '}
                Independent mortgage brokers often are small and flourish
                because clients like yourself see the value in what they offer.
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-red-600 mb-2">
                  2003
                </div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Brokering Since
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-red-600 mb-2">
                  700+
                </div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Transactions
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-red-600 mb-2">
                  4
                </div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  States Licensed
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-600 dark:text-gray-400 font-medium">
                Licensed in Kentucky, Indiana, Florida & Georgia
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
