import { NextRequest, NextResponse } from 'next/server';

interface PropertySearchParams {
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  beds?: number;
  baths?: number;
  sortBy?: 'price_low' | 'price_high' | 'date' | 'distance';
  limit?: number;
}

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

// Mock data for demonstration
const mockProperties: Property[] = [
  {
    id: '1',
    address: '123 Oak Street',
    city: 'Louisville',
    state: 'KY',
    zipCode: '40202',
    price: 285000,
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1850,
    lotSize: 0.25,
    yearBuilt: 1995,
    propertyType: 'Single Family',
    listingDate: '2024-01-15',
    status: 'Active',
    imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop',
    description: 'Beautiful 3-bedroom home in prime Louisville location. Recently updated kitchen and bathrooms.',
    latitude: 38.2527,
    longitude: -85.7585
  },
  {
    id: '2',
    address: '456 Maple Drive',
    city: 'Louisville',
    state: 'KY',
    zipCode: '40205',
    price: 340000,
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 2200,
    lotSize: 0.3,
    yearBuilt: 2000,
    propertyType: 'Single Family',
    listingDate: '2024-01-10',
    status: 'Active',
    imageUrl: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop',
    description: 'Spacious 4-bedroom home with modern amenities and large backyard.',
    latitude: 38.2527,
    longitude: -85.7585
  },
  {
    id: '3',
    address: '789 Pine Lane',
    city: 'Louisville',
    state: 'KY',
    zipCode: '40206',
    price: 195000,
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1400,
    lotSize: 0.2,
    yearBuilt: 1985,
    propertyType: 'Single Family',
    listingDate: '2024-01-20',
    status: 'Active',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop',
    description: 'Charming 2-bedroom starter home in quiet neighborhood.',
    latitude: 38.2527,
    longitude: -85.7585
  },
  {
    id: '4',
    address: '321 Elm Court',
    city: 'Louisville',
    state: 'KY',
    zipCode: '40207',
    price: 425000,
    bedrooms: 3,
    bathrooms: 2.5,
    squareFeet: 2400,
    lotSize: 0.4,
    yearBuilt: 2010,
    propertyType: 'Single Family',
    listingDate: '2024-01-08',
    status: 'Active',
    imageUrl: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop',
    description: 'Modern 3-bedroom home with open floor plan and updated features.',
    latitude: 38.2527,
    longitude: -85.7585
  },
  {
    id: '5',
    address: '654 Birch Avenue',
    city: 'Louisville',
    state: 'KY',
    zipCode: '40208',
    price: 275000,
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 1800,
    lotSize: 0.28,
    yearBuilt: 1998,
    propertyType: 'Single Family',
    listingDate: '2024-01-12',
    status: 'Active',
    imageUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=400&h=300&fit=crop',
    description: 'Well-maintained 3-bedroom home with great curb appeal.',
    latitude: 38.2527,
    longitude: -85.7585
  },
  {
    id: '6',
    address: '987 Cedar Street',
    city: 'Louisville',
    state: 'KY',
    zipCode: '40209',
    price: 315000,
    bedrooms: 4,
    bathrooms: 2,
    squareFeet: 2100,
    lotSize: 0.35,
    yearBuilt: 2005,
    propertyType: 'Single Family',
    listingDate: '2024-01-18',
    status: 'Active',
    imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop',
    description: 'Family-friendly 4-bedroom home with plenty of space and storage.',
    latitude: 38.2527,
    longitude: -85.7585
  }
];

// Bridge Data Output API integration (placeholder for future implementation)
async function searchBridgeAPI(params: PropertySearchParams): Promise<Property[]> {
  try {
    const { BRIDGE_CLIENT_ID, BRIDGE_CLIENT_SECRET, BRIDGE_SERVER_TOKEN } = process.env;

    if (!BRIDGE_CLIENT_ID || !BRIDGE_CLIENT_SECRET || !BRIDGE_SERVER_TOKEN) {
      console.log('Bridge API credentials not configured, using mock data');
      return mockProperties;
    }

    // TODO: Implement actual Bridge API call
    // This is a placeholder for the actual API integration
    console.log('Bridge API integration not yet implemented, using mock data');

    return mockProperties;
  } catch (error) {
    console.error('Bridge API error:', error);
    return mockProperties;
  }
}

function filterProperties(properties: Property[], params: PropertySearchParams): Property[] {
  let filtered = [...properties];

    // Filter by location
  if (params.location) {
    const locationLower = params.location.toLowerCase();
    // Split location by comma and clean up
    const locationParts = locationLower.split(',').map(part => part.trim());

    filtered = filtered.filter(property => {
      const fullAddress = `${property.address} ${property.city} ${property.state} ${property.zipCode}`.toLowerCase();
      const cityState = `${property.city} ${property.state}`.toLowerCase();

      // Check if any part of the location matches
      return locationParts.some(part =>
        fullAddress.includes(part) ||
        cityState.includes(part) ||
        property.city.toLowerCase().includes(part) ||
        property.state.toLowerCase().includes(part) ||
        property.zipCode.includes(part)
      );
    });
  }

  // Filter by price range
  if (params.minPrice !== undefined) {
    filtered = filtered.filter(property => property.price >= params.minPrice!);
  }
  if (params.maxPrice !== undefined) {
    filtered = filtered.filter(property => property.price <= params.maxPrice!);
  }

  // Filter by bedrooms
  if (params.beds !== undefined) {
    filtered = filtered.filter(property => property.bedrooms >= params.beds!);
  }

  // Filter by bathrooms
  if (params.baths !== undefined) {
    filtered = filtered.filter(property => property.bathrooms >= params.baths!);
  }

  return filtered;
}

function sortProperties(properties: Property[], sortBy?: string): Property[] {
  const sorted = [...properties];

  switch (sortBy) {
    case 'price_low':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price_high':
      return sorted.sort((a, b) => b.price - a.price);
    case 'date':
      return sorted.sort((a, b) => new Date(b.listingDate).getTime() - new Date(a.listingDate).getTime());
    case 'distance':
      // For now, return as-is since we don't have user location
      return sorted;
    default:
      return sorted;
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const params: PropertySearchParams = {
      location: searchParams.get('location') || undefined,
      minPrice: searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice')!) : undefined,
      maxPrice: searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice')!) : undefined,
      beds: searchParams.get('beds') ? parseInt(searchParams.get('beds')!) : undefined,
      baths: searchParams.get('baths') ? parseInt(searchParams.get('baths')!) : undefined,
      sortBy: searchParams.get('sortBy') as any || undefined,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined
    };

    // Get properties from Bridge API or fallback to mock data
    let properties = await searchBridgeAPI(params);

    // Apply filters
    properties = filterProperties(properties, params);

    // Apply sorting
    properties = sortProperties(properties, params.sortBy);

    // Apply limit
    if (params.limit) {
      properties = properties.slice(0, params.limit);
    }

    return NextResponse.json({
      success: true,
      properties,
      total: properties.length,
      filters: params
    });

  } catch (error) {
    console.error('Properties API error:', error);

    return NextResponse.json(
      {
        error: 'Failed to fetch properties',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}