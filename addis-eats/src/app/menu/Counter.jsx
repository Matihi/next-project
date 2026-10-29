"use client";
import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  const handleIncrement = () => {
    setCount((previous) => previous + 1);
  };

  const handleDecrement = () => {
    setCount((previous) => previous - 1);
  };

  const buttonClass =
    "flex justify-center items-center bg-blue-600 p-2 rounded-md";

  return (
    <div className="flex justify-center items-center space-x-1">
      <button className={buttonClass} onClick={handleDecrement}>
        -
      </button>
      <p>{count}</p>
      <button className={buttonClass} onClick={handleIncrement}>
        +
      </button>
    </div>
  );
};

export default Counter;
