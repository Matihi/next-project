import MapPanel from "./MapPanel";
import { getOrder } from "@/lib/db";
import { notFound } from "next/navigation";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

const Track = async ({ params }) => {
  const userSession = await getSession();
  if (!userSession) {
    redirect("/login?next=/orders");
  }
  const { id } = await params;
  const order = await getOrder(id);
  if (!order) {
    notFound();
  }
  if (order.userId !== userSession.userId) {
    notFound();
  }
  return (
    <>
      <h1 className="p-1">Track your delivery</h1>
      <MapPanel />
    </>
  );
};

export default Track;
