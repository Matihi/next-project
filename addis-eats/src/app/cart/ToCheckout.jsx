"use client";
import { useRouter } from "next/navigation";

const ToCheckout = () => {
  const router = useRouter();

  return (
    <div>
      <button
        className="bg-red-300 p-1 rounded cursor-pointer"
        onClick={() => router.push("/checkout")}
      >
        Checkout
      </button>
    </div>
  );
};

export default ToCheckout;
