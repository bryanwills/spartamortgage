import { mockProperties } from '../../src/app/api/properties/route';

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

describe('/api/properties', () => {
  it('should have mock properties data', () => {
    expect(mockProperties).toBeDefined();
    expect(Array.isArray(mockProperties)).toBe(true);
    expect(mockProperties.length).toBeGreaterThan(0);
  });

  it('should have properties with required fields', () => {
    mockProperties.forEach((property: Property) => {
      expect(property).toHaveProperty('id');
      expect(property).toHaveProperty('address');
      expect(property).toHaveProperty('city');
      expect(property).toHaveProperty('state');
      expect(property).toHaveProperty('price');
      expect(property).toHaveProperty('bedrooms');
      expect(property).toHaveProperty('bathrooms');
      expect(property).toHaveProperty('squareFeet');
      expect(property).toHaveProperty('status');
    });
  });

  it('should have properties in Louisville area', () => {
    const louisvilleProperties = mockProperties.filter(
      (property: Property) =>
        property.city.toLowerCase().includes('louisville') ||
        property.state === 'KY'
    );
    expect(louisvilleProperties.length).toBeGreaterThan(0);
  });

  it('should have properties in price range 200k-400k', () => {
    const affordableProperties = mockProperties.filter(
      (property: Property) =>
        property.price >= 200000 && property.price <= 400000
    );
    expect(affordableProperties.length).toBeGreaterThan(0);
  });

  it('should have properties with valid status values', () => {
    const validStatuses = ['Active', 'Pending', 'Sold'];
    mockProperties.forEach((property: Property) => {
      expect(validStatuses).toContain(property.status);
    });
  });
});
