# Rural Catering Market

A comprehensive web application for a rural catering service, built with React, TypeScript, and Tailwind CSS. This platform enables customers to browse catering options, place orders, and track their order history, while providing administrators with tools to manage products, orders, and access analytics.

![Desi Catering Platform](https://lovable.dev/opengraph-image-p98pqg.png)

## 📚 Documentation

This project includes comprehensive documentation to help users, developers, and administrators:

- [User Guide](./USER_GUIDE.md) - Detailed instructions for using the application
- [Technical Documentation](./TECHNICAL_DOCUMENTATION.md) - Architecture, code structure, and implementation details
- [Installation Guide](./INSTALLATION_GUIDE.md) - Setup, configuration, and deployment instructions
- [API Documentation](./API_DOCUMENTATION.md) - API endpoints and data models

## ✨ Features

### Customer Features
- **User Authentication**: Secure login and registration system
- **Product Browsing**: Browse catering options with filtering and search
- **Product Details**: View detailed information about each catering option
- **Shopping Cart**: Add items to cart, adjust quantities, and review before checkout
- **Checkout Process**: Simple and intuitive checkout flow
- **Order History**: Track past and current orders
- **User Profile**: Manage personal information

### Admin Features
- **Dashboard**: Overview of recent orders, popular products, and sales statistics
- **Product Management**: Add, edit, and delete products
- **Order Management**: View and update order status
- **Analytics**: Track sales and customer preferences

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/ROHIT212005/-Catering-Reservation-and-Ordering-System.git
   cd -Catering-Reservation-and-Ordering-System
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:8080`

## 🔑 Demo Accounts

The application comes with pre-configured demo accounts:

- **Admin User**:
  - Email: admin@demo.com
  - Password: password123

- **Regular User**:
  - Email: user@demo.com
  - Password: password123

## 🛠️ Technology Stack

### Frontend
- **React 18**: UI library for building component-based interfaces
- **TypeScript**: Adds static typing to JavaScript
- **Vite**: Modern build tool for faster development
- **React Router**: Client-side routing
- **React Query**: Data fetching and state management
- **React Hook Form**: Form state management and validation
- **Zod**: TypeScript-first schema validation

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn UI**: High-quality UI components
- **Lucide React**: Icon library

### Data Visualization
- **Recharts**: Composable charting library

## 📁 Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── layout/         # Layout components
│   └── ui/             # UI components
├── contexts/           # React Context providers
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and services
├── pages/              # Page components
│   └── admin/          # Admin-specific pages
└── types/              # TypeScript type definitions
```

## 🌐 Deployment

The application is deployed to GitHub Pages and can be accessed at:
[https://rohit212005.github.io/-Catering-Reservation-and-Ordering-System/](https://rohit212005.github.io/-Catering-Reservation-and-Ordering-System/)

For deployment instructions, see the [Installation Guide](./INSTALLATION_GUIDE.md).

## 🧪 Development Notes

- This application uses mock data stored in localStorage for demonstration purposes
- In a production environment, you would replace the mock services with real API calls
- The application is configured for both development and production environments

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you encounter any issues or have questions, please open an issue on the GitHub repository.
