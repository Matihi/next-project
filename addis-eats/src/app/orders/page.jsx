import { mockOrders } from "@/lib/db";
import CancelOrderButton from "./CancelOrderButton";
import Link from "next/link";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { getRole } from "@/lib/auth";
import { when, relative } from "@/lib/format";
import CsvExportButton from "./CsvExportButton";

export const metadata = {
  title: "Orders",
  description: "View your orders.",
};

const Orders = async () => {
  const user = await getSession();
  if (!user) {
    redirect("/login?next=/orders");
  }
  const role = await getRole(user.userId);

  if (!role) {
    return <p>User not found.</p>;
  }
  if (role !== "customer") {
    return <p>403 Unauthorized</p>;
  }
  const activeOrders = mockOrders.filter(
    (order) => order?.status !== "CANCELLED" && order?.userId === user.userId,
  );
  const numberOfActiveOrders = activeOrders.length;

  const forCsv = activeOrders.map((order) => {
    const createdAtObj = {
      createdAt: when.format(new Date(order.createdAt)),
    };
    const { userId, createdAt, ...filteredOrder } = order;
    return { ...filteredOrder, ...createdAtObj };
  });

  const orderElements = activeOrders.map((order) => (
    <li className="bg-gray-300 flex flex-col w-fit h-fit p-1" key={order.id}>
      <Link href={`/orders/${order.id}`}>
        <p>{`Id: ${order.id}`}</p>
        <p>{`Customer Name: ${order.name}`}</p>
        <p>{`Customer Phone: ${order.phone}`}</p>
        <p>{`Delivery area: ${order.area}`}</p>
        <p>{`Order Quantity: ${order.quantity}`}</p>
        <p>{`Date: ${when.format(new Date(order.createdAt))}`}</p>
        <p>{`Time passed: ${relative.format(Math.round((new Date(order.createdAt) - Date.now()) / 3600000), "hour")}`}</p>
      </Link>
      <div className="flex gap-6">
        <CancelOrderButton id={order.id} />
        <Link
          className="bg-green-400 p-0.5 text-gray-900"
          href={`/track/${order.id}`}
        >
          Track your order
        </Link>
      </div>
    </li>
  ));
  return (
    <div>
      <p>Your Orders</p>
      {numberOfActiveOrders === 0 ? (
        <p>No Orders</p>
      ) : (
        <>
          <ul className="flex flex-col gap-1">{orderElements}</ul>
          <CsvExportButton toCsvArray={forCsv} />
        </>
      )}
    </div>
  );
};

export default Orders;
