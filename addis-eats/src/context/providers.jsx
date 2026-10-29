"use client";
import CartProvider from "./cart/CartProvider";

const Providers = ({ children }) => {
  return <CartProvider>{children}</CartProvider>;
};

export default Providers;
