
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product } from '@/types';
import { useAuth } from './AuthContext';
import { toast } from '@/hooks/use-toast';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const savedCart = localStorage.getItem(`cart_${user.id}`);
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
    } else {
      setItems([]);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(items));
    }
  }, [items, user]);

  const addToCart = (product: Product, quantity = 1) => {
    if (!user) {
      toast({
        title: "Please login",
        description: "You need to login to add items to cart",
        variant: "destructive",
      });
      return;
    }

    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.productId === product.id);
      
      if (existingItem) {
        const updatedItems = prevItems.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        toast({
          title: "Updated cart",
          description: `${product.name} quantity updated`,
        });
        console.log('Updated cart item:', product.name, 'New quantity:', existingItem.quantity + quantity);
        return updatedItems;
      } else {
        const newItem: CartItem = {
          id: Date.now().toString(),
          productId: product.id,
          product,
          quantity,
          userId: user.id
        };
        toast({
          title: "Added to cart",
          description: `${product.name} has been added to your cart`,
        });
        console.log('Added new item to cart:', product.name, 'Quantity:', quantity);
        return [...prevItems, newItem];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setItems(prevItems => {
      const item = prevItems.find(item => item.productId === productId);
      if (item) {
        toast({
          title: "Removed from cart",
          description: `${item.product.name} has been removed from your cart`,
        });
        console.log('Removed item from cart:', item.product.name);
      }
      return prevItems.filter(item => item.productId !== productId);
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems(prevItems => {
      const updatedItems = prevItems.map(item =>
        item.productId === productId
          ? { ...item, quantity }
          : item
      );
      const item = prevItems.find(item => item.productId === productId);
      if (item) {
        console.log('Updated quantity for:', item.product.name, 'New quantity:', quantity);
      }
      return updatedItems;
    });
  };

  const clearCart = () => {
    setItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    });
    console.log('Cart cleared');
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const value: CartContextType = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
