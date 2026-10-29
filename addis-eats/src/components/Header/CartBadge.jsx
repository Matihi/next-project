"use client";
import useCart from "@/context/cart/useCart";

const CartBadge = () => {
  const { cart } = useCart();
  const threshold = 60;
  const count = cart.cartItems.length;
  return (
    <>
      {count > threshold ? (
        <span>{`${String(threshold)}+`}</span>
      ) : (
        <span>{String(count)}</span>
      )}
    </>
  );
};

export default CartBadge;
