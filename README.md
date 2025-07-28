# Sparta Mortgage - Property Search Feature

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 🏠 Property Search Feature

The Sparta Mortgage website now includes a comprehensive property search feature that provides Zillow-like functionality for real estate listings. This feature is designed to help users find properties in Kentucky, Indiana, Florida, and Georgia.

### Key Features

- **Dedicated Property Search Page** (`/properties`) with advanced filtering capabilities
- **Featured Properties Section** on the homepage showcasing curated listings
- **Responsive Design** with grid and list view options
- **Advanced Search Filters** including location, price range, bedrooms, and bathrooms
- **Property Detail Modals** with comprehensive property information
- **Sorting Options** by price (low to high, high to low), date, and distance
- **Mock Data Integration** for demonstration purposes

### Screenshots

#### Property Search Page
![Property Search Feature](./docs/screenshots/property-search-feature.png)

The property search page features:
- **Hero Section**: Gradient background with search form and quick search button
- **Search Form**: Location input, price range filters, bed/bath dropdowns
- **Property Grid**: Responsive layout showing property cards with images, prices, and status
- **Sorting Options**: Dropdown to sort by most recent, price, or distance
- **View Toggle**: Switch between grid and list view modes

### Mortgage Calculator Features

The website also includes an advanced mortgage calculator with two main views:

#### Basic Mortgage Calculator
![Mortgage Calculator Basic](./docs/screenshots/mortgage-calculator-basic.png)

Features:
- **Loan Details Panel**: Input fields for home price, down payment, interest rate, loan term
- **Monthly Payment Panel**: Calculated results showing monthly payment, loan amount, total interest
- **Real-time Calculations**: Instant updates as users modify input values

#### Advanced Mortgage Calculator with Early Payoff
![Mortgage Calculator Advanced](./docs/screenshots/mortgage-calculator-advanced.png)

Features:
- **Extra Payment Benefits**: Shows interest saved, time saved, and new loan term
- **Interactive Graph**: "Loan Balance Over Time" visualization
- **Comparison Lines**: Standard payment vs. extra payment scenarios
- **Credit Score Integration**: Dropdown for different credit score ranges

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Technical Implementation

### Property Search Architecture

- **API Route**: `/api/properties` - Handles property data fetching and filtering
- **Components**:
  - `PropertySearchPage` - Main search interface
  - `PropertyCard` - Individual property display
  - `PropertyDetailModal` - Detailed property information
  - `FeaturedProperties` - Homepage property showcase
- **State Management**: React hooks for filters, loading states, and view modes
- **Styling**: Tailwind CSS with responsive design and dark mode support

### Key Technologies

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Bridge Data Output API** - Property data integration (mock data for demo)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
