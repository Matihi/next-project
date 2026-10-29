"use client";
import React from "react";
import ToCheckout from "./ToCheckout";
import useCart from "@/context/cart/useCart";
import { etb } from "@/lib/format";

const CartForClient = () => {
  const { cart, totalItems, dispatch, totalPrice } = useCart();
  const handleClear = () => {
    dispatch({ type: "cart_cleared" });
  };

  const handleIncrement = (id) => {
    dispatch({
      type: "quantity_incremented",
      id: id,
    });
  };

  const handleDecrement = (id) => {
    dispatch({
      type: "quantity_decremented",
      id: id,
    });
  };

  const handleRemove = (id) => {
    dispatch({
      type: "dish_removed",
      id: id,
    });
  };

  const cartElements = cart.cartItems.map((item) => (
    <li className="w-fit p-1 rounded flex flex-col bg-[#e98181]" key={item.id}>
      <div className="flex space-x-0.5">
        <p>{item.nameEn}</p>
        <p>{`ETB ${item.price}`}</p>
      </div>

      <div className="w-fit count-container grid grid-cols-[1fr_3fr] space-x-0.5">
        <button
          className="p-2 remove bg-amber-600 rounded-sm"
          onClick={() => handleRemove(item.id)}
        >
          {`X`}
        </button>
        <div className="decCountInc grid grid-cols-[1.3fr_1fr_1.3fr] bg-emerald-400 rounded-sm p-0.5">
          <button
            className="decremen flex justify-center items-center bg-emerald-600 rounded-sm"
            onClick={() => handleDecrement(item.id)}
          >
            {"\u2212"}
          </button>
          {item.quantity > 0 ? (
            <p className="count flex justify-center items-center">
              {item.quantity}
            </p>
          ) : (
            <p></p>
          )}
          <button
            className="increment flex justify-center items-center bg-emerald-600 rounded-sm"
            onClick={() => handleIncrement(item.id)}
          >
            {"\u002B"}
          </button>
        </div>
      </div>
    </li>
  ));
  return (
    <div className="p-3">
      <h1>Your Cart</h1>
      {totalItems <= 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="flex flex-col gap-3">
          <button
            onClick={handleClear}
            className="w-fit bg-red-300 p-1 rounded"
          >
            Clear cart
          </button>
          <ul className="flex flex-col gap-1">{cartElements}</ul>
          <p>{`Total Price ${etb.format(totalPrice)}`}</p>
          <ToCheckout />
        </div>
      )}
    </div>
  );
};

export default CartForClient;
