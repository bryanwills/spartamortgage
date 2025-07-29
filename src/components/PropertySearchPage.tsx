'use client';

import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  MapPin,
  DollarSign,
  Bed,
  Bath,
  Square,
  Calendar,
  Star,
  Heart,
  Share2,
  Phone,
  Mail,
} from 'lucide-react';
import PropertyCard from './PropertyCard';
import PropertyDetailModal from './PropertyDetailModal';

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

interface SearchFilters {
  location: string;
  minPrice: string;
  maxPrice: string;
  beds: string;
  baths: string;
  sortBy: string;
}

export default function PropertySearchPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isClient, setIsClient] = useState(false);

  // Default search for Louisville, KY around $300,000
  const [filters, setFilters] = useState<SearchFilters>({
    location: '',
    minPrice: '',
    maxPrice: '',
    beds: '',
    baths: '',
    sortBy: 'date',
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      // Load all properties by default
      fetchAllProperties();
    }
  }, [isClient]);

  const fetchAllProperties = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/properties');

      if (!response.ok) {
        throw new Error('Failed to fetch properties');
      }

      const data = await response.json();
      setProperties(data.properties || []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to load properties'
      );
    } finally {
      setLoading(false);
    }
  };

  const searchProperties = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (filters.location) params.append('location', filters.location);
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
      if (filters.beds) params.append('beds', filters.beds);
      if (filters.baths) params.append('baths', filters.baths);
      if (filters.sortBy) params.append('sortBy', filters.sortBy);

      const response = await fetch(`/api/properties?${params.toString()}`);

      if (!response.ok) {
        throw new Error('Failed to fetch properties');
      }

      const data = await response.json();
      setProperties(data.properties || []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to load properties'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchProperties();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Prevent hydration mismatch by not rendering until client-side
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-yellow-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Your Dream Home
            </h1>
            <p className="text-xl opacity-90 mb-4">
              Search properties in Kentucky, Indiana, Florida, and Georgia
            </p>
            <button
              onClick={() => {
                setFilters({
                  location: 'Louisville, KY',
                  minPrice: '200000',
                  maxPrice: '400000',
                  beds: '',
                  baths: '',
                  sortBy: 'date',
                });
                searchProperties();
              }}
              className="inline-block bg-white/20 text-white px-6 py-2 rounded-full font-semibold hover:bg-white/30 transition-all duration-300 border border-white/30"
            >
              Quick Search: Louisville, KY ($200k-$400k)
            </button>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Location Search */}
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="e.g., Louisville, KY or 40202"
                    value={filters.location}
                    onChange={e =>
                      handleFilterChange('location', e.target.value)
                    }
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 text-gray-900 dark:text-white"
                    suppressHydrationWarning
                  />
                </div>

                {/* Price Range */}
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="number"
                      placeholder="e.g., 200000"
                      value={filters.minPrice}
                      onChange={e =>
                        handleFilterChange('minPrice', e.target.value)
                      }
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 text-gray-900 dark:text-white"
                      suppressHydrationWarning
                    />
                  </div>
                  <div className="relative flex-1">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="number"
                      placeholder="e.g., 400000"
                      value={filters.maxPrice}
                      onChange={e =>
                        handleFilterChange('maxPrice', e.target.value)
                      }
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 text-gray-900 dark:text-white"
                      suppressHydrationWarning
                    />
                  </div>
                </div>

                {/* Beds & Baths */}
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Bed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <select
                      value={filters.beds}
                      onChange={e => handleFilterChange('beds', e.target.value)}
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 text-gray-900 dark:text-white appearance-none"
                      suppressHydrationWarning
                    >
                      <option value="">Any Beds</option>
                      <option value="1">1+ Bed</option>
                      <option value="2">2+ Beds</option>
                      <option value="3">3+ Beds</option>
                      <option value="4">4+ Beds</option>
                      <option value="5">5+ Beds</option>
                    </select>
                  </div>
                  <div className="relative flex-1">
                    <Bath className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <select
                      value={filters.baths}
                      onChange={e =>
                        handleFilterChange('baths', e.target.value)
                      }
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 text-gray-900 dark:text-white appearance-none"
                      suppressHydrationWarning
                    >
                      <option value="">Any Baths</option>
                      <option value="1">1+ Bath</option>
                      <option value="2">2+ Baths</option>
                      <option value="3">3+ Baths</option>
                      <option value="4">4+ Baths</option>
                    </select>
                  </div>
                </div>

                {/* Search Button */}
                <button
                  type="submit"
                  className="bg-gradient-to-r from-red-600 to-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-red-700 hover:to-yellow-600 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Search className="w-5 h-5" />
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {/* Results Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {loading
                  ? 'Searching...'
                  : `${properties.length} Properties Found`}
              </h2>
              {filters.location && (
                <p className="text-gray-600 dark:text-gray-400">
                  in {filters.location}
                </p>
              )}
            </div>

            {/* View Controls */}
            <div className="flex items-center gap-4">
              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={filters.sortBy}
                  onChange={e => handleFilterChange('sortBy', e.target.value)}
                  className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 dark:text-white"
                  suppressHydrationWarning
                >
                  <option value="date">Most Recent</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="distance">Distance</option>
                </select>
              </div>

              {/* View Toggle */}
              <div className="flex bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-red-500 text-white' : 'text-gray-600 dark:text-gray-400'}`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-red-500 text-white' : 'text-gray-600 dark:text-gray-400'}`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md animate-pulse"
                >
                  <div className="h-48 bg-gray-300 dark:bg-gray-700 rounded-t-lg"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2 w-3/4"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <div className="text-red-500 text-xl mb-4">⚠️</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Unable to load properties
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
              <button
                onClick={searchProperties}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Properties Grid */}
          {!loading && !error && properties.length > 0 && (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-4'
              }
            >
              {properties.map(property => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  viewMode={viewMode}
                  onClick={() => setSelectedProperty(property)}
                />
              ))}
            </div>
          )}

          {/* No Results */}
          {!loading && !error && properties.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🏠</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No properties found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Try adjusting your search criteria
              </p>
              <button
                onClick={() => {
                  setFilters({
                    location: 'Louisville, KY',
                    minPrice: '200000',
                    maxPrice: '400000',
                    beds: '',
                    baths: '',
                    sortBy: 'date',
                  });
                }}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Reset Search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Property Detail Modal */}
      {selectedProperty && (
        <PropertyDetailModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}
    </div>
  );
}
