"use client";

import { useMemo, useReducer, useEffect, useState } from "react";
import cartReducer from "./cartReducer";
import { CartContext } from "./useCart";

const STORAGE_KEY = "addis-eats-cart";

const initialCart = { cartItems: [] };

const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem(STORAGE_KEY);

      if (storedCart) {
        dispatch({ type: "cart_loaded", cart: JSON.parse(storedCart) });
      }
    } catch (error) {
      console.log("Could not load cart from localStorage:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.log("Could not save cart to localStorage:", error);
    }
  }, [cart, isLoaded]);

  const totalPrice = cart.cartItems.reduce(
    (accumulator, current) => accumulator + current.price * current.quantity,
    0,
  );

  const totalItems = cart.cartItems.reduce(
    (accumulator, current) => accumulator + current.quantity,
    0,
  );

  const value = useMemo(
    () => ({ cart, dispatch, totalPrice, totalItems }),
    [cart, totalPrice, totalItems],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
