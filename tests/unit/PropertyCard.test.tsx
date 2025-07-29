import { render, screen } from '@testing-library/react';
import PropertyCard from '../../src/components/PropertyCard';

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

const mockProperty: Property = {
  id: '1',
  address: '123 Test Street',
  city: 'Louisville',
  state: 'KY',
  zipCode: '40202',
  price: 250000,
  bedrooms: 3,
  bathrooms: 2,
  squareFeet: 1500,
  yearBuilt: 2020,
  lotSize: 0.25,
  propertyType: 'Single Family',
  status: 'Active' as const,
  listingDate: '2024-01-15',
  imageUrl: '/test-image.jpg',
  description: 'Beautiful home in great location',
};

describe('PropertyCard', () => {
  it('renders property information correctly', () => {
    render(
      <PropertyCard
        property={mockProperty}
        viewMode="grid"
        onClick={() => {}}
      />
    );

    expect(screen.getByText('123 Test Street')).toBeInTheDocument();
    expect(screen.getByText('$250,000')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const mockOnClick = jest.fn();
    render(
      <PropertyCard
        property={mockProperty}
        viewMode="grid"
        onClick={mockOnClick}
      />
    );

    const card = screen
      .getByText('123 Test Street')
      .closest('div')?.parentElement;
    if (card) {
      card.click();
    }

    expect(mockOnClick).toHaveBeenCalled();
  });

  it('displays correct status color', () => {
    render(
      <PropertyCard
        property={mockProperty}
        viewMode="grid"
        onClick={() => {}}
      />
    );

    const statusBadge = screen.getByText('Active');
    expect(statusBadge).toHaveClass('bg-green-100', 'text-green-800');
  });
});
