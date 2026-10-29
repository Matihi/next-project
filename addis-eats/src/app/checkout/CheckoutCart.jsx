"use client";
import useCart from "@/context/cart/useCart";
import { etb } from "@/lib/format";

const CheckoutCart = () => {
  const { cart } = useCart();
  const cartElements = cart?.cartItems.map((item) => (
    <li
      key={item.id}
      className="w-sm p-1 grid grid-cols-[1fr_3fr_1fr] bg-[#f1d8d0]"
    >
      <p>{`${item.quantity}x`}</p>
      <p>{`${item.nameEn}`}</p>
      <p>{etb.format(item.price)}</p>
    </li>
  ));
  return (
    <div className="p-2">
      <p>Review your cart</p>
      {cart?.cartItems.length <= 0 ? (
        <p className="text-sm">Your cart is empty</p>
      ) : (
        <ul className="bg-[#fceae4] flex flex-col gap-1 p-1 w-fit">
          {cartElements}
        </ul>
      )}
    </div>
  );
};

export default CheckoutCart;
