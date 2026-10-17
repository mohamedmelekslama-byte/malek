import React, { createContext, useContext, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

// Default cart state shape
const defaultCart = {
  billingCycle: 'monthly',
  licenses: 1,
  addons: {
    consultation: false,
    delivery: false,
    wearables: false,
  },
  paymentMethod: 'card',
};

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useLocalStorage('checkoutCart', defaultCart);

  const updateCart = (updates) => {
    setCart((prev) => ({ ...prev, ...updates }));
  };

  const value = useMemo(() => ({ cart, updateCart }), [cart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
