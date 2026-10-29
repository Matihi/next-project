import CheckoutForm from "./CheckoutForm";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { getRole } from "@/lib/auth";
import CheckoutCart from "./CheckoutCart";

export const metadata = {
  title: "Checkout",
  description: "Secure checkout",
};

const Checkout = async () => {
  const user = await getSession();
  if (!user) {
    redirect("/login?next=/checkout");
  }
  const role = await getRole(user.userId);

  if (!role) {
    return <p>User not found.</p>;
  }
  if (role !== "customer") {
    return <p>403 Unauthorized</p>;
  }
  return (
    <div>
      <CheckoutForm />
      <CheckoutCart />
    </div>
  );
};

export default Checkout;
