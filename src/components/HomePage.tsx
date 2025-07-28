'use client'

import React, { useState, useEffect } from 'react'
import {
  DollarSign,
  Shield,
  Globe,
  Zap,
  Users,
  Clock,
  Star,
  TrendingUp,
  CheckCircle
} from 'lucide-react'
import FeaturedProperties from './FeaturedProperties'

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="text-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-red-500 to-yellow-500 dark:from-red-800 dark:via-red-700 dark:to-yellow-600"></div>
        <div className="absolute inset-0 bg-black/20 dark:bg-black/40"></div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Your Dream Home
              <span className="block text-yellow-300">Awaits</span>
            </h1>
            <p className="text-xl sm:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Independent mortgage broker serving Kentucky, Indiana, Florida, and Georgia with competitive rates,
              no fees, and personalized service since 2003.
            </p>
            <a
              href="/contact"
              className="inline-block bg-white text-red-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get Your Free Quote
            </a>
          </div>

          {/* Trust Indicators */}
          <div className={`mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-yellow-300 mb-2">700+</div>
              <div className="text-lg">Successful Transactions</div>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-yellow-300 mb-2">20+</div>
              <div className="text-lg">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-yellow-300 mb-2">4</div>
              <div className="text-lg">Licensed States</div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-20 lg:py-32 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Why Choose Sparta Mortgage?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              As an independent mortgage broker, we offer advantages that banks and credit unions simply can't match.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Competitive Rates */}
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-red-500">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full flex items-center justify-center mb-6">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Extremely Competitive Interest Rates</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                Access to multiple lenders means we can find you the best possible interest rates in the market.
              </p>
            </div>

            {/* No Fees */}
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-red-500">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">No Fees</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                Transparent pricing with no surprise costs. What you see is what you get.
              </p>
            </div>

            {/* Very Low Overhead */}
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-red-500">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Very Low Overhead</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                Our lean operation means lower costs that we pass directly to you.
              </p>
            </div>

            {/* Virtually All Loan Programs */}
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-red-500">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full flex items-center justify-center mb-6">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Virtually All Loan Programs</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                From conventional to VA, FHA to jumbo loans - we have access to virtually every program.
              </p>
            </div>

            {/* Aggressive Lending Standards */}
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-red-500">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Aggressive Lending Standards</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                We work harder to get your loan approved, even in challenging situations.
              </p>
            </div>

            {/* Accessibility */}
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-red-500">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full flex items-center justify-center mb-6">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Accessibility</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                Direct access to your broker - no call centers, no runaround, just personal service.
              </p>
            </div>
          </div>

          {/* Why Work With a Broker Section */}
          <div className="mt-16 bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Why Work With a Broker?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="text-center">
                <Users className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Licensing Required</span>
              </div>
              <div className="text-center">
                <Star className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Experience</span>
              </div>
              <div className="text-center">
                <CheckCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Specialization</span>
              </div>
              <div className="text-center">
                <Zap className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Problem Solving</span>
              </div>
              <div className="text-center">
                <Clock className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Accessibility</span>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Ready to get started? Learn more about our services and start your application.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/about"
                className="inline-block bg-gradient-to-r from-red-600 to-yellow-500 text-white px-8 py-3 rounded-full font-semibold hover:from-red-700 hover:to-yellow-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Learn More About Us
              </a>
              <a
                href="https://1857586.my1003app.com/51796/register"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-red-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-red-600"
              >
                Start Your Application
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-20 lg:py-32 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Featured Properties
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Discover beautiful homes in your area. Browse our curated selection of properties.
            </p>
          </div>

          <FeaturedProperties />

          <div className="text-center mt-12">
            <a
              href="/properties"
              className="inline-block bg-gradient-to-r from-red-600 to-yellow-500 text-white px-8 py-3 rounded-full font-semibold hover:from-red-700 hover:to-yellow-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              View All Properties
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}