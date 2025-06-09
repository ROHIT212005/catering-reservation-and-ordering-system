
import { User, Product } from '@/types';

// Initialize demo data in localStorage if not exists
export const initializeDemoData = () => {
  // Demo users
  const demoUsers = [
    {
      id: "1",
      email: "admin@demo.com",
      password: "password123",
      name: "Admin User",
      role: "admin",
      createdAt: new Date().toISOString()
    },
    {
      id: "2", 
      email: "user@demo.com",
      password: "password123",
      name: "Demo Customer",
      role: "user",
      createdAt: new Date().toISOString()
    }
  ];

  // Demo products
  const demoProducts = [
    {
      id: "1",
      name: "Butter Chicken Combo",
      description: "Tender chicken in rich, creamy tomato-based sauce served with basmati rice and naan bread. A complete meal perfect for any occasion.",
      price: 299,
      category: "Main Course",
      image: "/placeholder.svg",
      adminId: "1",
      available: true,
      servings: 4,
      cookingTime: "45 minutes",
      ingredients: ["Chicken", "Tomatoes", "Cream", "Spices", "Basmati Rice", "Naan"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "2",
      name: "Vegetarian Thali",
      description: "A complete vegetarian meal with dal, vegetables, rice, roti, pickle, and sweet dish. Traditional home-style cooking.",
      price: 199,
      category: "Vegetarian",
      image: "/placeholder.svg", 
      adminId: "1",
      available: true,
      servings: 2,
      cookingTime: "30 minutes",
      ingredients: ["Dal", "Mixed Vegetables", "Rice", "Roti", "Pickle", "Sweet"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "3",
      name: "Hyderabadi Biryani",
      description: "Authentic Hyderabadi-style biryani with aromatic basmati rice, tender mutton, and traditional spices. Served with raita and shorba.",
      price: 449,
      category: "Rice Dishes",
      image: "/placeholder.svg",
      adminId: "1", 
      available: true,
      servings: 6,
      cookingTime: "90 minutes",
      ingredients: ["Basmati Rice", "Mutton", "Saffron", "Yogurt", "Spices", "Fried Onions"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "4",
      name: "Paneer Tikka Platter",
      description: "Grilled cottage cheese marinated in yogurt and spices, served with mint chutney and onion rings.",
      price: 249,
      category: "Appetizers",
      image: "/placeholder.svg",
      adminId: "1",
      available: true,
      servings: 3,
      cookingTime: "25 minutes", 
      ingredients: ["Paneer", "Yogurt", "Spices", "Bell Peppers", "Onions", "Mint Chutney"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "5",
      name: "South Indian Feast",
      description: "Traditional South Indian meal with sambar, rasam, multiple vegetable curries, rice, and coconut chutney.",
      price: 179,
      category: "Regional",
      image: "/placeholder.svg",
      adminId: "1",
      available: true,
      servings: 2,
      cookingTime: "40 minutes",
      ingredients: ["Rice", "Sambar", "Rasam", "Vegetables", "Coconut", "Curry Leaves"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  // Initialize users if not exists
  if (!localStorage.getItem('catering_users')) {
    localStorage.setItem('catering_users', JSON.stringify(demoUsers));
    console.log('Demo users initialized');
  }

  // Initialize products if not exists  
  if (!localStorage.getItem('catering_products')) {
    localStorage.setItem('catering_products', JSON.stringify(demoProducts));
    console.log('Demo products initialized');
  }

  // Demo orders
  const demoOrders = [
    {
      id: "1",
      userId: "2",
      items: [
        {
          productId: "1",
          product: demoProducts.find(p => p.id === "1"),
          quantity: 2,
          price: 299
        },
        {
          productId: "3",
          product: demoProducts.find(p => p.id === "3"),
          quantity: 1,
          price: 449
        }
      ],
      totalAmount: 1047,
      status: 'confirmed',
      deliveryAddress: "123 Main St, Mumbai, Maharashtra",
      contactNumber: "+91 98765 43210",
      specialInstructions: "Please deliver before 7 PM",
      createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      updatedAt: new Date(Date.now() - 43200000).toISOString() // 12 hours ago
    },
    {
      id: "2",
      userId: "2",
      items: [
        {
          productId: "2",
          product: demoProducts.find(p => p.id === "2"),
          quantity: 3,
          price: 199
        }
      ],
      totalAmount: 597,
      status: 'delivered',
      deliveryAddress: "456 Park Avenue, Delhi, Delhi",
      contactNumber: "+91 98765 43211",
      specialInstructions: "",
      createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      updatedAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
    },
    {
      id: "3",
      userId: "2",
      items: [
        {
          productId: "4",
          product: demoProducts.find(p => p.id === "4"),
          quantity: 2,
          price: 249
        },
        {
          productId: "5",
          product: demoProducts.find(p => p.id === "5"),
          quantity: 1,
          price: 179
        }
      ],
      totalAmount: 677,
      status: 'pending',
      deliveryAddress: "789 Lake View, Bangalore, Karnataka",
      contactNumber: "+91 98765 43212",
      specialInstructions: "Extra spicy please",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  // Initialize orders if not exists
  if (!localStorage.getItem('catering_orders')) {
    localStorage.setItem('catering_orders', JSON.stringify(demoOrders));
    console.log('Demo orders initialized');
  }
};

// Call this when the app starts
initializeDemoData();
