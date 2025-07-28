'use client'

import React from 'react'
import { Bed, Bath, Square, MapPin, Heart, Share2, Calendar } from 'lucide-react'

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

interface PropertyCardProps {
  property: Property;
  viewMode: 'grid' | 'list';
  onClick: () => void;
}

export default function PropertyCard({ property, viewMode, onClick }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
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

  if (viewMode === 'list') {
    return (
      <div
        onClick={onClick}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700"
      >
        <div className="flex">
          {/* Image */}
          <div className="w-48 h-32 flex-shrink-0">
            <img
              src={property.imageUrl}
              alt={property.address}
              className="w-full h-full object-cover rounded-l-lg"
            />
          </div>

          {/* Content */}
          <div className="flex-1 p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {property.address}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  {property.city}, {property.state} {property.zipCode}
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatPrice(property.price)}
                </div>
                <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(property.status)}`}>
                  {property.status}
                </span>
              </div>
            </div>

            {/* Property Details */}
            <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400 mb-3">
              <div className="flex items-center gap-1">
                <Bed className="w-4 h-4" />
                <span>{property.bedrooms} beds</span>
              </div>
              <div className="flex items-center gap-1">
                <Bath className="w-4 h-4" />
                <span>{property.bathrooms} baths</span>
              </div>
              <div className="flex items-center gap-1">
                <Square className="w-4 h-4" />
                <span>{property.squareFeet.toLocaleString()} sqft</span>
              </div>
              {property.yearBuilt && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Built {property.yearBuilt}</span>
                </div>
              )}
            </div>

            {/* Description */}
            {property.description && (
              <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                {property.description}
              </p>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <span>Listed {formatDate(property.listingDate)}</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                  <Heart className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Grid View
  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      {/* Image */}
      <div className="relative h-48">
        <img
          src={property.imageUrl}
          alt={property.address}
          className="w-full h-full object-cover"
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

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>Listed {formatDate(property.listingDate)}</span>
          <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
            <Share2 className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  )
}