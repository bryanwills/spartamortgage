"use client"

import React, { useState, useEffect } from 'react'
import { X, Cookie, Shield, Settings } from 'lucide-react'

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('sparta-cookie-consent')
    if (!cookieConsent) {
      setShowBanner(true)
    }
  }, [])

  const acceptAll = () => {
    localStorage.setItem('sparta-cookie-consent', 'accepted')
    localStorage.setItem('sparta-cookie-preferences', JSON.stringify({
      necessary: true,
      analytics: true,
      marketing: true
    }))
    setShowBanner(false)
  }

  const acceptNecessary = () => {
    localStorage.setItem('sparta-cookie-consent', 'accepted')
    localStorage.setItem('sparta-cookie-preferences', JSON.stringify({
      necessary: true,
      analytics: false,
      marketing: false
    }))
    setShowBanner(false)
  }

  const savePreferences = (preferences: {
    necessary: boolean
    analytics: boolean
    marketing: boolean
  }) => {
    localStorage.setItem('sparta-cookie-consent', 'accepted')
    localStorage.setItem('sparta-cookie-preferences', JSON.stringify(preferences))
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <Cookie className="w-6 h-6 text-yellow-500 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                We use cookies to enhance your experience
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                We use cookies and similar technologies to help personalize content,
                provide better functionality, and analyze our traffic. By clicking
                "Accept All", you consent to our use of cookies.
              </p>

              {showDetails && (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                    Cookie Preferences
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Necessary Cookies</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Required for the website to function properly
                        </p>
                      </div>
                      <div className="flex items-center">
                        <Shield className="w-4 h-4 text-green-500 mr-2" />
                        <span className="text-sm text-gray-500">Always Active</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Analytics Cookies</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Help us understand how visitors interact with our website
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Marketing Cookies</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Used to deliver personalized advertisements
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => setShowBanner(false)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            aria-label="Close cookie banner"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <button
            onClick={acceptAll}
            className="bg-gradient-to-r from-red-600 to-yellow-500 text-white px-6 py-2 rounded-lg font-medium hover:from-red-700 hover:to-yellow-600 transition-all duration-200"
          >
            Accept All
          </button>
          <button
            onClick={acceptNecessary}
            className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200"
          >
            Necessary Only
          </button>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
          >
            <Settings className="w-4 h-4" />
            {showDetails ? 'Hide Details' : 'Show Details'}
          </button>
        </div>
      </div>
    </div>
  )
}