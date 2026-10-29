"use client";
import cancelOrder from "@/actions/orders-actions";
import { useState } from "react";

const CancelOrderButton = ({ id }) => {
  const [error, setError] = useState(null);
  const handleClick = async () => {
    const result = await cancelOrder(id);
    if (result.error) {
      setError(result.error);
    }
  };
  return (
    <div>
      <button
        className="p-1 bg-red-500 text-white"
        onClick={() => handleClick()}
      >
        Cancel Order
      </button>
      {error !== null && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default CancelOrderButton;
