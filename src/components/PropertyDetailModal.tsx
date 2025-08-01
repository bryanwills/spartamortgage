'use client';

import React from 'react';
import {
  X,
  Bed,
  Bath,
  Square,
  MapPin,
  Heart,
  Share2,
  Calendar,
  Phone,
  ExternalLink,
} from 'lucide-react';

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

interface PropertyDetailModalProps {
  property: Property;
  onClose: () => void;
}

export default function PropertyDetailModal({
  property,
  onClose,
}: PropertyDetailModalProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Sold':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative">
          <img
            src={property.imageUrl}
            alt={property.address}
            className="w-full h-64 object-cover rounded-t-lg"
          />
          <div className="absolute top-4 right-4 flex gap-2">
            <button className="p-2 bg-white/90 rounded-full text-gray-600 hover:text-red-500 transition-colors">
              <Heart className="w-5 h-5" />
            </button>
            <button className="p-2 bg-white/90 rounded-full text-gray-600 hover:text-gray-800 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 bg-white/90 rounded-full text-gray-600 hover:text-gray-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="absolute bottom-4 left-4">
            <span
              className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(property.status)}`}
            >
              {property.status}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Price and Address */}
          <div className="mb-6">
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {formatPrice(property.price)}
            </div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              {property.address}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {property.city}, {property.state} {property.zipCode}
            </p>
          </div>

          {/* Property Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Bed className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  {property.bedrooms}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Bedrooms
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Bath className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  {property.bathrooms}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Bathrooms
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Square className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  {property.squareFeet.toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Square Feet
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  {property.yearBuilt || 'N/A'}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Year Built
              </p>
            </div>
          </div>

          {/* Additional Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Property Details
              </h3>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex justify-between">
                  <span>Property Type:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {property.propertyType}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Lot Size:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {property.lotSize ? `${property.lotSize} acres` : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Listed:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatDate(property.listingDate)}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Location
              </h3>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex justify-between">
                  <span>City:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {property.city}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>State:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {property.state}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>ZIP Code:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {property.zipCode}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          {property.description && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Description
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {property.description}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <a
              href="/contact"
              className="flex-1 bg-gradient-to-r from-red-600 to-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-red-700 hover:to-yellow-600 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Contact About This Property
            </a>
            <a
              href={`https://1857586.my1003app.com/51796/register`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 border-2 border-red-600 flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-5 h-5" />
              Start Application
            </a>
          </div>

          {/* Mortgage Calculator Link */}
          <div className="mt-4 text-center">
            <a
              href="/apply"
              className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium hover:underline"
            >
              Calculate mortgage payment for this property →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
