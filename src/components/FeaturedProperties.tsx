'use client'

import React, { useState, useEffect } from 'react'
import { Bed, Bath, Square, MapPin, Heart, Share2 } from 'lucide-react'

interface Property {
  id: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  lotSize?: number;
  yearBuilt?: number;
  propertyType: string;
  listingDate: string;
  status: 'Active' | 'Pending' | 'Sold';
  imageUrl: string;
  description?: string;
  latitude?: number;
  longitude?: number;
}

export default function FeaturedProperties() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isClient) {
      const fetchFeaturedProperties = async () => {
        try {
          const response = await fetch('/api/properties?limit=3')
          if (response.ok) {
            const data = await response.json()
            setProperties(data.properties || [])
          }
        } catch (error) {
          console.error('Failed to fetch featured properties:', error)
        } finally {
          setLoading(false)
        }
      }

      fetchFeaturedProperties()
    }
  }, [isClient])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'Sold':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
    }
  }

  // Prevent hydration mismatch
  if (!isClient) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md animate-pulse">
            <div className="h-48 bg-gray-300 dark:bg-gray-700 rounded-t-lg"></div>
            <div className="p-4">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2 w-3/4"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md animate-pulse">
            <div className="h-48 bg-gray-300 dark:bg-gray-700 rounded-t-lg"></div>
            <div className="p-4">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2 w-3/4"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">🏠</div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          No featured properties available
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Check back soon for new listings
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {properties.map((property) => (
        <div
          key={property.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden group"
        >
          {/* Image */}
          <div className="relative h-48">
            <img
              src={property.imageUrl}
              alt={property.address}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-3 right-3">
              <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(property.status)}`}>
                {property.status}
              </span>
            </div>
            <div className="absolute top-3 left-3">
              <button className="p-2 bg-white/90 rounded-full text-gray-600 hover:text-red-500 transition-colors">
                <Heart className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Price */}
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {formatPrice(property.price)}
            </div>

            {/* Address */}
            <div className="mb-3">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                {property.address}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {property.city}, {property.state} {property.zipCode}
              </p>
            </div>

            {/* Property Details */}
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
              <div className="flex items-center gap-1">
                <Bed className="w-4 h-4" />
                <span>{property.bedrooms}</span>
              </div>
              <div className="flex items-center gap-1">
                <Bath className="w-4 h-4" />
                <span>{property.bathrooms}</span>
              </div>
              <div className="flex items-center gap-1">
                <Square className="w-4 h-4" />
                <span>{property.squareFeet.toLocaleString()}</span>
              </div>
            </div>

            {/* Description */}
            {property.description && (
              <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-3">
                {property.description}
              </p>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between">
              <a
                href={`/properties?location=${encodeURIComponent(property.city + ', ' + property.state)}`}
                className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium text-sm hover:underline"
              >
                View Similar Properties →
              </a>
              <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                <Share2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}