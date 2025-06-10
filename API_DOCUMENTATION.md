# Rural Catering Market - API Documentation

## Overview

This document outlines the API structure for the Rural Catering Market application. Currently, the application uses mock services with localStorage for data persistence. This documentation serves as a reference for:

1. The current mock API implementation
2. A blueprint for future backend API development

## Table of Contents

1. [Authentication API](#authentication-api)
2. [Products API](#products-api)
3. [Orders API](#orders-api)
4. [Users API](#users-api)
5. [Cart Operations](#cart-operations)
6. [Error Handling](#error-handling)
7. [Data Models](#data-models)
8. [Implementation Notes](#implementation-notes)

## Authentication API

### Login

Authenticates a user and returns user data with a token.

**Current Implementation:**
```typescript
export const loginUser = async (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('catering_users') || '[]');
      const user = users.find((u: User) => u.email === email && u.password === password);
      
      if (user) {
        // Remove password from returned user object
        const { password, ...userWithoutPassword } = user;
        resolve(userWithoutPassword as User);
      } else {
        reject(new Error('Invalid email or password'));
      }
    }, 500); // Simulate network delay
  });
};
```

**Future REST API Endpoint:**
```
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "id": "1",
  "email": "user@example.com",
  "name": "John Doe",
  "role": "user",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "token": "jwt-token-here"
}
```

### Register

Creates a new user account.

**Current Implementation:**
```typescript
export const registerUser = async (email: string, password: string, name: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('catering_users') || '[]');
      
      // Check if user already exists
      const existingUser = users.find((u: User) => u.email === email);
      if (existingUser) {
        reject(new Error('User with this email already exists'));
        return;
      }
      
      // Create new user
      const newUser = {
        id: Date.now().toString(),
        email,
        password,
        name,
        role: 'user',
        createdAt: new Date().toISOString()
      };
      
      // Save to localStorage
      users.push(newUser);
      localStorage.setItem('catering_users', JSON.stringify(users));
      
      // Remove password from returned user object
      const { password: _, ...userWithoutPassword } = newUser;
      resolve(userWithoutPassword as User);
    }, 500);
  });
};
```

**Future REST API Endpoint:**
```
POST /api/auth/register
```

**Request Body:**
```json
{
  "email": "newuser@example.com",
  "password": "password123",
  "name": "New User"
}
```

**Response (201 Created):**
```json
{
  "id": "123",
  "email": "newuser@example.com",
  "name": "New User",
  "role": "user",
  "createdAt": "2023-06-10T12:00:00.000Z",
  "token": "jwt-token-here"
}
```

## Products API

### Get All Products

Retrieves a list of all products.

**Current Implementation:**
```typescript
export const getProducts = async (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const products = JSON.parse(localStorage.getItem('catering_products') || '[]');
      resolve(products);
    }, 500);
  });
};
```

**Future REST API Endpoint:**
```
GET /api/products
```

**Query Parameters:**
- `category` (optional): Filter by category
- `search` (optional): Search term
- `page` (optional): Page number for pagination
- `limit` (optional): Number of items per page
- `sort` (optional): Sort field and direction (e.g., "price:asc")

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": "1",
      "name": "Butter Chicken Combo",
      "description": "Tender chicken in rich, creamy tomato-based sauce...",
      "price": 299,
      "category": "Main Course",
      "image": "/placeholder.svg",
      "adminId": "1",
      "available": true,
      "servings": 4,
      "cookingTime": "45 minutes",
      "ingredients": ["Chicken", "Tomatoes", "Cream", "Spices", "Basmati Rice", "Naan"],
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    },
    // More products...
  ],
  "pagination": {
    "total": 50,
    "page": 1,
    "limit": 10,
    "pages": 5
  }
}
```

### Get Product by ID

Retrieves a single product by its ID.

**Current Implementation:**
```typescript
export const getProductById = async (id: string): Promise<Product> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const products = JSON.parse(localStorage.getItem('catering_products') || '[]');
      const product = products.find((p: Product) => p.id === id);
      
      if (product) {
        resolve(product);
      } else {
        reject(new Error('Product not found'));
      }
    }, 500);
  });
};
```

**Future REST API Endpoint:**
```
GET /api/products/:id
```

**Response (200 OK):**
```json
{
  "id": "1",
  "name": "Butter Chicken Combo",
  "description": "Tender chicken in rich, creamy tomato-based sauce...",
  "price": 299,
  "category": "Main Course",
  "image": "/placeholder.svg",
  "adminId": "1",
  "available": true,
  "servings": 4,
  "cookingTime": "45 minutes",
  "ingredients": ["Chicken", "Tomatoes", "Cream", "Spices", "Basmati Rice", "Naan"],
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

### Create Product

Creates a new product (admin only).

**Current Implementation:**
```typescript
export const createProduct = async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const products = JSON.parse(localStorage.getItem('catering_products') || '[]');
      
      const newProduct = {
        ...product,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      products.push(newProduct);
      localStorage.setItem('catering_products', JSON.stringify(products));
      
      resolve(newProduct);
    }, 500);
  });
};
```

**Future REST API Endpoint:**
```
POST /api/products
```

**Request Body:**
```json
{
  "name": "New Dish",
  "description": "Description of the new dish",
  "price": 199,
  "category": "Appetizers",
  "image": "/placeholder.svg",
  "available": true,
  "servings": 2,
  "cookingTime": "30 minutes",
  "ingredients": ["Ingredient 1", "Ingredient 2", "Ingredient 3"]
}
```

**Response (201 Created):**
```json
{
  "id": "123",
  "name": "New Dish",
  "description": "Description of the new dish",
  "price": 199,
  "category": "Appetizers",
  "image": "/placeholder.svg",
  "adminId": "1",
  "available": true,
  "servings": 2,
  "cookingTime": "30 minutes",
  "ingredients": ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
  "createdAt": "2023-06-10T12:00:00.000Z",
  "updatedAt": "2023-06-10T12:00:00.000Z"
}
```

### Update Product

Updates an existing product (admin only).

**Current Implementation:**
```typescript
export const updateProduct = async (id: string, updates: Partial<Product>): Promise<Product> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const products = JSON.parse(localStorage.getItem('catering_products') || '[]');
      const index = products.findIndex((p: Product) => p.id === id);
      
      if (index !== -1) {
        const updatedProduct = {
          ...products[index],
          ...updates,
          updatedAt: new Date().toISOString()
        };
        
        products[index] = updatedProduct;
        localStorage.setItem('catering_products', JSON.stringify(products));
        
        resolve(updatedProduct);
      } else {
        reject(new Error('Product not found'));
      }
    }, 500);
  });
};
```

**Future REST API Endpoint:**
```
PUT /api/products/:id
```

**Request Body:**
```json
{
  "name": "Updated Dish Name",
  "price": 249,
  "available": false
}
```

**Response (200 OK):**
```json
{
  "id": "123",
  "name": "Updated Dish Name",
  "description": "Description of the dish",
  "price": 249,
  "category": "Appetizers",
  "image": "/placeholder.svg",
  "adminId": "1",
  "available": false,
  "servings": 2,
  "cookingTime": "30 minutes",
  "ingredients": ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
  "createdAt": "2023-06-10T12:00:00.000Z",
  "updatedAt": "2023-06-10T13:30:00.000Z"
}
```

### Delete Product

Deletes a product (admin only).

**Current Implementation:**
```typescript
export const deleteProduct = async (id: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const products = JSON.parse(localStorage.getItem('catering_products') || '[]');
      const index = products.findIndex((p: Product) => p.id === id);
      
      if (index !== -1) {
        products.splice(index, 1);
        localStorage.setItem('catering_products', JSON.stringify(products));
        resolve();
      } else {
        reject(new Error('Product not found'));
      }
    }, 500);
  });
};
```

**Future REST API Endpoint:**
```
DELETE /api/products/:id
```

**Response (204 No Content)**

## Orders API

### Get All Orders

Retrieves all orders (admin) or user's orders (regular user).

**Current Implementation:**
```typescript
export const getOrders = async (userId?: string): Promise<Order[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const orders = JSON.parse(localStorage.getItem('catering_orders') || '[]');
      
      // If userId is provided, filter orders for that user
      const filteredOrders = userId 
        ? orders.filter((o: Order) => o.userId === userId)
        : orders;
        
      resolve(filteredOrders);
    }, 500);
  });
};
```

**Future REST API Endpoint:**
```
GET /api/orders
```

**Query Parameters:**
- `status` (optional): Filter by order status
- `page` (optional): Page number for pagination
- `limit` (optional): Number of items per page
- `sort` (optional): Sort field and direction (e.g., "createdAt:desc")

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": "1",
      "userId": "2",
      "items": [
        {
          "productId": "1",
          "product": {
            "id": "1",
            "name": "Butter Chicken Combo",
            "price": 299,
            "image": "/placeholder.svg"
          },
          "quantity": 2,
          "price": 299
        }
      ],
      "totalAmount": 598,
      "status": "confirmed",
      "deliveryAddress": "123 Main St, Mumbai, Maharashtra",
      "contactNumber": "+91 98765 43210",
      "specialInstructions": "Please deliver before 7 PM",
      "createdAt": "2023-06-09T12:00:00.000Z",
      "updatedAt": "2023-06-09T18:00:00.000Z"
    },
    // More orders...
  ],
  "pagination": {
    "total": 25,
    "page": 1,
    "limit": 10,
    "pages": 3
  }
}
```

### Get Order by ID

Retrieves a single order by its ID.

**Current Implementation:**
```typescript
export const getOrderById = async (id: string): Promise<Order> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const orders = JSON.parse(localStorage.getItem('catering_orders') || '[]');
      const order = orders.find((o: Order) => o.id === id);
      
      if (order) {
        resolve(order);
      } else {
        reject(new Error('Order not found'));
      }
    }, 500);
  });
};
```

**Future REST API Endpoint:**
```
GET /api/orders/:id
```

**Response (200 OK):**
```json
{
  "id": "1",
  "userId": "2",
  "items": [
    {
      "productId": "1",
      "product": {
        "id": "1",
        "name": "Butter Chicken Combo",
        "description": "Tender chicken in rich, creamy tomato-based sauce...",
        "price": 299,
        "image": "/placeholder.svg"
      },
      "quantity": 2,
      "price": 299
    }
  ],
  "totalAmount": 598,
  "status": "confirmed",
  "deliveryAddress": "123 Main St, Mumbai, Maharashtra",
  "contactNumber": "+91 98765 43210",
  "specialInstructions": "Please deliver before 7 PM",
  "createdAt": "2023-06-09T12:00:00.000Z",
  "updatedAt": "2023-06-09T18:00:00.000Z"
}
```

### Create Order

Creates a new order.

**Current Implementation:**
```typescript
export const createOrder = async (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const orders = JSON.parse(localStorage.getItem('catering_orders') || '[]');
      
      const newOrder = {
        ...orderData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      orders.push(newOrder);
      localStorage.setItem('catering_orders', JSON.stringify(orders));
      
      resolve(newOrder);
    }, 500);
  });
};
```

**Future REST API Endpoint:**
```
POST /api/orders
```

**Request Body:**
```json
{
  "items": [
    {
      "productId": "1",
      "quantity": 2
    },
    {
      "productId": "3",
      "quantity": 1
    }
  ],
  "deliveryAddress": "123 Main St, Mumbai, Maharashtra",
  "contactNumber": "+91 98765 43210",
  "specialInstructions": "Please deliver before 7 PM"
}
```

**Response (201 Created):**
```json
{
  "id": "123",
  "userId": "2",
  "items": [
    {
      "productId": "1",
      "product": {
        "id": "1",
        "name": "Butter Chicken Combo",
        "price": 299,
        "image": "/placeholder.svg"
      },
      "quantity": 2,
      "price": 299
    },
    {
      "productId": "3",
      "product": {
        "id": "3",
        "name": "Hyderabadi Biryani",
        "price": 449,
        "image": "/placeholder.svg"
      },
      "quantity": 1,
      "price": 449
    }
  ],
  "totalAmount": 1047,
  "status": "pending",
  "deliveryAddress": "123 Main St, Mumbai, Maharashtra",
  "contactNumber": "+91 98765 43210",
  "specialInstructions": "Please deliver before 7 PM",
  "createdAt": "2023-06-10T12:00:00.000Z",
  "updatedAt": "2023-06-10T12:00:00.000Z"
}
```

### Update Order Status

Updates the status of an order (admin only).

**Current Implementation:**
```typescript
export const updateOrderStatus = async (id: string, status: Order['status']): Promise<Order> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const orders = JSON.parse(localStorage.getItem('catering_orders') || '[]');
      const index = orders.findIndex((o: Order) => o.id === id);
      
      if (index !== -1) {
        orders[index].status = status;
        orders[index].updatedAt = new Date().toISOString();
        
        localStorage.setItem('catering_orders', JSON.stringify(orders));
        resolve(orders[index]);
      } else {
        reject(new Error('Order not found'));
      }
    }, 500);
  });
};
```

**Future REST API Endpoint:**
```
PATCH /api/orders/:id/status
```

**Request Body:**
```json
{
  "status": "confirmed"
}
```

**Response (200 OK):**
```json
{
  "id": "123",
  "status": "confirmed",
  "updatedAt": "2023-06-10T13:30:00.000Z"
}
```

## Users API

### Get User Profile

Retrieves the current user's profile.

**Current Implementation:**
```typescript
export const getUserProfile = async (userId: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('catering_users') || '[]');
      const user = users.find((u: User) => u.id === userId);
      
      if (user) {
        // Remove password from returned user object
        const { password, ...userWithoutPassword } = user;
        resolve(userWithoutPassword as User);
      } else {
        reject(new Error('User not found'));
      }
    }, 500);
  });
};
```

**Future REST API Endpoint:**
```
GET /api/users/profile
```

**Response (200 OK):**
```json
{
  "id": "2",
  "email": "user@example.com",
  "name": "John Doe",
  "role": "user",
  "createdAt": "2023-01-01T00:00:00.000Z"
}
```

### Update User Profile

Updates the current user's profile.

**Current Implementation:**
```typescript
export const updateUserProfile = async (userId: string, updates: Partial<User>): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('catering_users') || '[]');
      const index = users.findIndex((u: User) => u.id === userId);
      
      if (index !== -1) {
        // Don't allow updating role through this endpoint
        const { role, ...allowedUpdates } = updates;
        
        users[index] = {
          ...users[index],
          ...allowedUpdates
        };
        
        localStorage.setItem('catering_users', JSON.stringify(users));
        
        // Remove password from returned user object
        const { password, ...userWithoutPassword } = users[index];
        resolve(userWithoutPassword as User);
      } else {
        reject(new Error('User not found'));
      }
    }, 500);
  });
};
```

**Future REST API Endpoint:**
```
PUT /api/users/profile
```

**Request Body:**
```json
{
  "name": "Updated Name",
  "email": "updated@example.com"
}
```

**Response (200 OK):**
```json
{
  "id": "2",
  "email": "updated@example.com",
  "name": "Updated Name",
  "role": "user",
  "createdAt": "2023-01-01T00:00:00.000Z"
}
```

## Cart Operations

Cart operations are currently handled client-side using the CartContext. In a future implementation with a backend, these operations would be API endpoints.

### Future Cart API Endpoints

**Get Cart:**
```
GET /api/cart
```

**Add Item to Cart:**
```
POST /api/cart/items
```

**Update Cart Item Quantity:**
```
PUT /api/cart/items/:productId
```

**Remove Item from Cart:**
```
DELETE /api/cart/items/:productId
```

**Clear Cart:**
```
DELETE /api/cart
```

## Error Handling

### Current Implementation

The mock services use Promise rejections with Error objects:

```typescript
reject(new Error('Product not found'));
```

### Future API Error Responses

API errors will follow a consistent format:

```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Product not found",
    "details": {}
  }
}
```

Common HTTP status codes:
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 422: Unprocessable Entity
- 500: Internal Server Error

## Data Models

### User

```typescript
interface User {
  id: string;
  email: string;
  password?: string; // Not included in responses
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
  product: Product | Pick<Product, 'id' | 'name' | 'price' | 'image'>;
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

## Implementation Notes

### Current Implementation

The current implementation uses:
- localStorage for data persistence
- Simulated network delays with setTimeout
- Client-side data processing

### Future Backend Implementation

For a production backend, consider:
- RESTful API with Node.js (Express or NestJS)
- MongoDB or PostgreSQL database
- JWT authentication
- Input validation with Zod or Joi
- Rate limiting and security headers
- Proper error handling middleware
- Logging and monitoring
- Unit and integration tests