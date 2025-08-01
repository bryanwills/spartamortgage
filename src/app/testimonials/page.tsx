'use client';

import React from 'react';
import { Quote } from 'lucide-react';

export default function TestimonialsPage() {
  return (
    <div className="text-gray-900 dark:text-gray-100">
      <section className="py-20 lg:py-32 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              What Our Clients Say
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Over 100 of our clients share their experiences across multiple
              review platforms.
            </p>

            {/* Review Platform Links */}
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <a
                href="https://search.google.com/local/reviews?placeid=ChIJ32l-S42naYgRTT7AoGnFdG0"
                target="_blank"
                rel="noopener noreferrer"
                className="transform hover:scale-105 transition-all duration-300"
              >
                <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-lg hover:shadow-xl">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    Google
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Reviews
                  </div>
                </div>
              </a>
              <a
                href="https://www.facebook.com/pg/mortgagewithnathan/reviews/"
                target="_blank"
                rel="noopener noreferrer"
                className="transform hover:scale-105 transition-all duration-300"
              >
                <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-lg hover:shadow-xl">
                  <div className="text-2xl font-bold text-blue-800 mb-1">
                    Facebook
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Reviews
                  </div>
                </div>
              </a>
              <a
                href="https://www.yelp.com/biz/nathan-delpapa-louisville?utm_campaign=Sep-06-2017&utm_medium=email&utm_source=personal_stats"
                target="_blank"
                rel="noopener noreferrer"
                className="transform hover:scale-105 transition-all duration-300"
              >
                <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-lg hover:shadow-xl">
                  <div className="text-2xl font-bold text-red-600 mb-1">
                    Yelp
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Reviews
                  </div>
                </div>
              </a>
              <a
                href="https://www.linkedin.com/in/nathandelpapa"
                target="_blank"
                rel="noopener noreferrer"
                className="transform hover:scale-105 transition-all duration-300"
              >
                <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-lg hover:shadow-xl">
                  <div className="text-2xl font-bold text-blue-700 mb-1">
                    LinkedIn
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Profile
                  </div>
                </div>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Real Testimonial 1 - Terry */}
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg relative">
              <Quote className="w-8 h-8 text-red-500 mb-4" />
              <p className="text-gray-600 dark:text-gray-300 mb-6 italic leading-relaxed text-base">
                &ldquo;From the very start Nathan was upbeat and positive. He gave me
                confidence in the process... He&apos;s a friend, a confidant and a
                mortgage guru all in one, I couldn&apos;t have done this without
                Nathan. He&apos;s number 1 in my book.&rdquo;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
                  T
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    Terry
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Satisfied Homeowner
                  </p>
                </div>
              </div>
            </div>

            {/* Real Testimonial 2 - Johnny */}
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg relative">
              <Quote className="w-8 h-8 text-red-500 mb-4" />
              <p className="text-gray-600 dark:text-gray-300 mb-6 italic leading-relaxed text-base">
                &ldquo;Nathan eased the entire process of buying our dream home. He is
                an excellent communicator and delivers on his promises... He has
                a wonderful personality and we really enjoyed working with him.&rdquo;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
                  J
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    Johnny
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Dream Home Buyer
                  </p>
                </div>
              </div>
            </div>

            {/* Real Testimonial 3 - Howard (VA Loan) */}
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg relative">
              <Quote className="w-8 h-8 text-red-500 mb-4" />
              <p className="text-gray-600 dark:text-gray-300 mb-6 italic leading-relaxed text-base">
                &ldquo;Nathan provided excellent service during our VA home loan... We
                are first time home buyers and Nathan made the whole process a
                breeze and as stress free as possible. I will be using Nathan
                again in the future.&rdquo;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
                  H
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    Howard
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    VA Loan - First Time Buyer
                  </p>
                </div>
              </div>
            </div>

            {/* Real Testimonial 4 - Karen */}
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg relative">
              <Quote className="w-8 h-8 text-red-500 mb-4" />
              <p className="text-gray-600 dark:text-gray-300 mb-6 italic leading-relaxed text-base">
                &ldquo;Nathan was very thorough in explaining the process... His
                response time and getting documents was highly effective. This
                guy is great, his business skills are unmatched, and he is very
                knowledgeable.&rdquo;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
                  K
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    Karen
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    First Time Buyer
                  </p>
                </div>
              </div>
            </div>

            {/* Real Testimonial 5 - Lynn (Dream Maker) */}
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg relative">
              <Quote className="w-8 h-8 text-red-500 mb-4" />
              <p className="text-gray-600 dark:text-gray-300 mb-6 italic leading-relaxed text-base">
                &ldquo;We had been told No in the past... We call him the dream maker!
                He was able to work with our specific situation and get us the
                loan we needed for our Dream House!&rdquo;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
                  L
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    Lynn
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    The "Dream Maker" Client
                  </p>
                </div>
              </div>
            </div>

            {/* Real Testimonial 6 - Jay (Long-term Client) */}
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg relative">
              <Quote className="w-8 h-8 text-red-500 mb-4" />
              <p className="text-gray-600 dark:text-gray-300 mb-6 italic leading-relaxed text-base">
                &ldquo;We have worked through at least four deals with Nathan over the
                past 8 years... We have recommended Nathan to many friends with
                great results. I won&apos;t use another mortgage broker!&rdquo;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
                  J
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    Jay
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    8-Year Client - 4 Deals
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional testimonials in compact format */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
              <p className="text-gray-600 dark:text-gray-300 text-sm italic mb-3">
                &ldquo;I was surprised at how fast he was able to complete the loan.
                Very professional and eager to help.&rdquo;
              </p>
              <p className="font-semibold text-gray-900 dark:text-white">
                - Demani
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
              <p className="text-gray-600 dark:text-gray-300 text-sm italic mb-3">
                &ldquo;Nathan is a great Loan Officer! Very thorough and precise! Got
                my clients a great rate on their VA Loan!&rdquo;
              </p>
              <p className="font-semibold text-gray-900 dark:text-white">
                - Thai
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
              <p className="text-gray-600 dark:text-gray-300 text-sm italic mb-3">
                &ldquo;I cannot imagine a refinance going any smoother. He even sent
                someone to our house to sign papers!&rdquo;
              </p>
              <p className="font-semibold text-gray-900 dark:text-white">
                - Ellen
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Ready to join our family of 100+ satisfied homeowners?
            </p>
            <a
              href="https://1857586.my1003app.com/51796/register"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-red-600 to-yellow-500 text-white px-8 py-3 rounded-full font-semibold hover:from-red-700 hover:to-yellow-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Start Your Application
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
