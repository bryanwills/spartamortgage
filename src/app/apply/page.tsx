'use client'

import React from 'react'
import { CheckCircle, DollarSign, Shield, Clock, Users, Star } from 'lucide-react'
import MortgageCalculator from '../../components/MortgageCalculator'

export default function ApplyPage() {
  return (
    <div className="text-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-red-600 via-red-500 to-yellow-500 dark:from-red-800 dark:via-red-700 dark:to-yellow-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            Apply for Your
            <span className="block text-yellow-300">Dream Home</span>
          </h1>
          <p className="text-xl sm:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Start your mortgage application today. Our streamlined process makes getting approved simple and stress-free.
          </p>
          <a
            href="https://1857586.my1003app.com/51796/register"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-red-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Start Application
          </a>
        </div>
      </section>

      {/* Loan Programs Section */}
      <section className="py-20 lg:py-32 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Loan Programs We Offer
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              From conventional to government-backed loans, we have access to virtually every mortgage program available.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Conventional Loans */}
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-red-500">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full flex items-center justify-center mb-6">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Conventional Loans</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Traditional mortgages with competitive rates and flexible terms.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>3% - 20% down payment</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Fixed and adjustable rates</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>No mortgage insurance with 20% down</span>
                </li>
              </ul>
            </div>

            {/* FHA Loans */}
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-red-500">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">FHA Loans</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Government-backed loans perfect for first-time homebuyers.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>3.5% minimum down payment</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Lower credit score requirements</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Competitive interest rates</span>
                </li>
              </ul>
            </div>

            {/* VA Loans */}
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-red-500">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full flex items-center justify-center mb-6">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">VA Loans</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Special benefits for veterans, active duty, and military families.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>0% down payment</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>No mortgage insurance</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Competitive interest rates</span>
                </li>
              </ul>
            </div>

            {/* USDA Loans */}
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-red-500">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">USDA Loans</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Rural development loans for eligible areas and borrowers.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>0% down payment</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Low interest rates</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Income limits apply</span>
                </li>
              </ul>
            </div>

            {/* Jumbo Loans */}
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-red-500">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full flex items-center justify-center mb-6">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Jumbo Loans</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Large loan amounts for high-value properties.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Exceeds conforming limits</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Higher credit requirements</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Larger down payment</span>
                </li>
              </ul>
            </div>

            {/* Refinance */}
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-red-500">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full flex items-center justify-center mb-6">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Refinance</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Lower your rate, reduce payments, or cash out equity.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Rate and term refinance</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Cash-out refinance</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Streamline options</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Ready to start your application? Click below to begin.
            </p>
            <a
              href="https://1857586.my1003app.com/51796/register"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-red-600 to-yellow-500 text-white px-8 py-3 rounded-full font-semibold hover:from-red-700 hover:to-yellow-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Start Your Application Now
            </a>
          </div>
        </div>
      </section>

      {/* Mortgage Calculator Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-red-600 via-red-500 to-yellow-500 dark:from-red-800 dark:via-red-700 dark:to-yellow-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-white">
              Calculate Your Payment
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Use our interactive calculator to estimate your monthly payment and see how extra payments can save you thousands.
            </p>
          </div>
          <MortgageCalculator />
        </div>
      </section>
    </div>
  )
}