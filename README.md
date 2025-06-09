# Rural Catering Market

A web application for a rural catering service, built with React, TypeScript, and Tailwind CSS.

## Features

- User authentication (login/register)
- Product browsing and filtering
- Shopping cart functionality
- Order management
- Admin dashboard for product management

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

## Demo Accounts

The application comes with pre-configured demo accounts:

- **Admin User**:
  - Email: admin@demo.com
  - Password: password123

- **Regular User**:
  - Email: user@demo.com
  - Password: password123

## Usage

### For Customers

1. Browse the menu on the Products page
2. Add items to your cart
3. Proceed to checkout
4. View your order history

### For Admins

1. Access the admin dashboard
2. Manage products (add, edit, delete)
3. View and manage orders

## Development Notes

- This application uses mock data stored in localStorage for demonstration purposes
- In a production environment, you would replace the mock services with real API calls

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Shadcn UI Components
- React Router
- React Query
- Lucide React Icons

## Project Structure

- `/src/components`: UI components
- `/src/contexts`: Context providers for state management
- `/src/hooks`: Custom React hooks
- `/src/lib`: Utility functions and mock services
- `/src/pages`: Page components
- `/src/types`: TypeScript type definitions

## License

This project is licensed under the MIT License.
