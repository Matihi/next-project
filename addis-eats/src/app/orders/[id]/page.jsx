import { getOrder } from "@/lib/db";
import { notFound } from "next/navigation";
import OrderStatus from "./OrderStatus";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

const orderPage = async ({ params }) => {
  const userSession = await getSession();
  if (!userSession) {
    redirect("/login?next=/orders");
  }
  const { id } = await params;
  const order = await getOrder(id);
  if (!order || order.userId !== userSession.userId) {
    notFound();
  }
  return <OrderStatus id={id} initial={order} />;
};

export default orderPage;
