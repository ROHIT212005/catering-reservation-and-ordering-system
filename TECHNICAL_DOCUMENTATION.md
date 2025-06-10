# Rural Catering Market - Technical Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Component Hierarchy](#component-hierarchy)
6. [State Management](#state-management)
7. [Routing](#routing)
8. [Data Models](#data-models)
9. [API Integration](#api-integration)
10. [Authentication](#authentication)
11. [Deployment](#deployment)
12. [Performance Optimization](#performance-optimization)
13. [Testing](#testing)
14. [Future Enhancements](#future-enhancements)

## Project Overview

Rural Catering Market is a web application designed to provide a platform for rural catering services. It allows customers to browse catering options, place orders, and track their order history. Administrators can manage products, view and update orders, and access dashboard analytics.

The application is built with modern web technologies including React, TypeScript, and Tailwind CSS, providing a responsive and user-friendly interface for both customers and administrators.

## Architecture

The application follows a client-side architecture with the following key components:

- **Frontend**: React with TypeScript for type safety
- **Styling**: Tailwind CSS with Shadcn UI components
- **State Management**: React Context API for global state
- **Routing**: React Router for navigation
- **Data Fetching**: React Query for efficient data fetching and caching
- **Form Handling**: React Hook Form with Zod validation
- **Storage**: LocalStorage for data persistence (in production, this would be replaced with a backend API)

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Browser                        │
└───────────────────────────────┬─────────────────────────────┘
                                │
┌───────────────────────────────▼─────────────────────────────┐
│                      React Application                       │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────────┐    │
│  │    React    │   │   Context   │   │  React Router   │    │
│  │  Components │◄──┤     API     │◄──┤                 │    │
│  │             │   │  (State)    │   │   (Routing)     │    │
│  └─────────────┘   └─────────────┘   └─────────────────┘    │
│                                                             │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────────┐    │
│  │    React    │   │  Tailwind   │   │  LocalStorage   │    │
│  │    Query    │◄──┤     CSS     │◄──┤                 │    │
│  │ (Data Fetch)│   │  (Styling)  │   │  (Data Store)   │    │
│  └─────────────┘   └─────────────┘   └─────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend
- **React 18**: UI library for building component-based interfaces
- **TypeScript**: Adds static typing to JavaScript for better developer experience
- **Vite**: Modern build tool for faster development and optimized production builds
- **React Router**: Handles client-side routing
- **React Query**: Data fetching, caching, and state management for asynchronous data
- **React Hook Form**: Form state management and validation
- **Zod**: TypeScript-first schema validation

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn UI**: High-quality UI components built with Radix UI and Tailwind
- **Lucide React**: Icon library
- **Tailwind Merge**: Utility for merging Tailwind CSS classes
- **Class Variance Authority**: For creating variant components

### Data Visualization
- **Recharts**: Composable charting library for React

### Development Tools
- **ESLint**: Code linting
- **TypeScript-ESLint**: TypeScript integration for ESLint
- **SWC**: Fast TypeScript/JavaScript compiler

## Project Structure

The project follows a feature-based structure with the following main directories:

```
src/
├── components/         # Reusable UI components
│   ├── auth/           # Authentication-related components
│   ├── layout/         # Layout components (header, footer, etc.)
│   └── ui/             # UI components (buttons, cards, etc.)
├── contexts/           # React Context providers
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and services
├── pages/              # Page components
│   └── admin/          # Admin-specific pages
├── types/              # TypeScript type definitions
├── App.tsx             # Main application component
├── entry.jsx           # Entry point for the application
├── index.css           # Global CSS
└── main.tsx            # Main entry point
```

## Component Hierarchy

The application follows a hierarchical component structure:

```
App
├── BrowserRouter
│   ├── AuthProvider
│   │   ├── CartProvider
│   │   │   ├── Routes
│   │   │   │   ├── Index (Home Page)
│   │   │   │   ├── LoginForm
│   │   │   │   ├── RegisterForm
│   │   │   │   ├── Products
│   │   │   │   ├── ProductDetail
│   │   │   │   ├── Cart
│   │   │   │   ├── Checkout
│   │   │   │   ├── Orders
│   │   │   │   ├── Profile
│   │   │   │   ├── Admin Pages
│   │   │   │   │   ├── Dashboard
│   │   │   │   │   ├── Products
│   │   │   │   │   ├── ProductForm
│   │   │   │   │   └── Orders
│   │   │   │   └── NotFound
```

## State Management

The application uses React Context API for global state management:

### AuthContext

Manages user authentication state:
- Current user information
- Login/logout functionality
- User role (admin/user)

```typescript
// AuthContext.tsx
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<User>;
  register: (email: string, password: string, name: string) => Promise<User>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}
```

### CartContext

Manages shopping cart state:
- Cart items
- Add/remove/update items
- Calculate totals

```typescript
// CartContext.tsx
interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalAmount: number;
}
```

## Routing

The application uses React Router for client-side routing:

```typescript
// App.tsx
<BrowserRouter basename={import.meta.env.DEV ? "/" : "/-Catering-Reservation-and-Ordering-System"}>
  <AuthProvider>
    <CartProvider>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/products/new" element={<ProductForm />} />
        <Route path="/admin/products/edit/:id" element={<ProductForm />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </CartProvider>
  </AuthProvider>
</BrowserRouter>
```

## Data Models

The application uses the following data models:

### User

```typescript
interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'user';
  createdAt: string;
}
```

### Product

```typescript
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  adminId: string;
  available: boolean;
  servings: number;
  cookingTime: string;
  ingredients: string[];
  createdAt: string;
  updatedAt: string;
}
```

### Order

```typescript
interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  deliveryAddress: string;
  contactNumber: string;
  specialInstructions?: string;
  createdAt: string;
  updatedAt: string;
}

interface OrderItem {
  productId: string;
  product: Product;
  quantity: number;
  price: number;
}
```

### Cart Item

```typescript
interface CartItem {
  product: Product;
  quantity: number;
}
```

## API Integration

The current implementation uses localStorage for data persistence. In a production environment, this would be replaced with a backend API.

### Mock Services

The application includes mock services for:
- User authentication
- Product management
- Order management
- Cart operations

These services simulate API calls and store data in localStorage:

```typescript
// Example of a mock service
export const getProducts = async (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const products = JSON.parse(localStorage.getItem('catering_products') || '[]');
      resolve(products);
    }, 500); // Simulate network delay
  });
};
```

## Authentication

Authentication is handled through the AuthContext provider:

1. **Login Flow**:
   - User enters credentials
   - Credentials are validated against localStorage data
   - On success, user data is stored in context and localStorage
   - User is redirected to the home page

2. **Registration Flow**:
   - User enters registration details
   - Data is validated
   - New user is created and stored in localStorage
   - User is automatically logged in

3. **Logout Flow**:
   - User data is removed from context
   - User is redirected to the login page

4. **Role-Based Access Control**:
   - Admin users can access the admin dashboard and management features
   - Regular users can only access customer features
   - Routes are not protected at the router level, but components check for authentication and role

## Deployment

The application is deployed to GitHub Pages using a custom deployment script:

```powershell
# deploy.ps1
# Build the application
npm run build

# Create a temporary directory for deployment
$tempDir = "temp_deploy"
New-Item -ItemType Directory -Path $tempDir -Force

# Copy the built files to the temporary directory
Copy-Item -Path "dist/*" -Destination $tempDir -Recurse

# Create a .nojekyll file to bypass Jekyll processing
New-Item -ItemType File -Path "$tempDir/.nojekyll" -Force

# Initialize a new git repository in the temporary directory
Set-Location $tempDir
git init
git add .
git commit -m "Deploy to GitHub Pages"

# Push to the gh-pages branch
git remote add origin https://github.com/ROHIT212005/-Catering-Reservation-and-Ordering-System.git
git push -f origin master:gh-pages

# Clean up
Set-Location ..
Remove-Item -Path $tempDir -Recurse -Force
```

### Base URL Configuration

The application uses a conditional base URL for routing:

```typescript
<BrowserRouter basename={import.meta.env.DEV ? "/" : "/-Catering-Reservation-and-Ordering-System"}>
```

This ensures that routes work correctly in both development and production environments.

## Performance Optimization

The application includes several performance optimizations:

1. **Code Splitting**: The Vite build process automatically splits code into chunks for better loading performance.

2. **Memoization**: Components use React.memo and useMemo/useCallback hooks to prevent unnecessary re-renders.

3. **Lazy Loading**: Images and non-critical resources are lazy-loaded.

4. **Optimized Build**: The production build is optimized with:
   - Minification
   - Dead code elimination
   - Asset optimization

5. **Caching**: React Query provides efficient caching for data fetching operations.

## Testing

The application can be tested using the following approaches:

1. **Unit Testing**: Test individual components and functions in isolation.
   - Recommended tools: Jest, React Testing Library

2. **Integration Testing**: Test interactions between components.
   - Recommended tools: React Testing Library, Cypress

3. **End-to-End Testing**: Test complete user flows.
   - Recommended tools: Cypress, Playwright

## Future Enhancements

Potential improvements for future versions:

1. **Backend Integration**:
   - Replace localStorage with a real backend API
   - Implement proper authentication with JWT
   - Add server-side validation

2. **Advanced Features**:
   - User reviews and ratings
   - Loyalty program
   - Subscription options
   - Payment gateway integration
   - Email notifications

3. **Performance Improvements**:
   - Implement service workers for offline support
   - Add progressive loading for large data sets
   - Optimize image loading and processing

4. **Enhanced Admin Features**:
   - Advanced analytics dashboard
   - Inventory management
   - Staff management
   - Reporting tools

5. **Mobile App**:
   - Develop a companion mobile app using React Native
   - Add push notifications
   - Implement location-based features