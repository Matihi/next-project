import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { getRole } from "@/lib/auth";
import { mockOrders } from "@/lib/db";
import Report from "./Report";
import { dateCount } from "@/services/date";

const Dashboard = async ({ searchParams }) => {
  const { revenue_sort, page } = await searchParams;

  const revSortOrder = revenue_sort ?? "desc";
  const pageNumber = Number(page) || 1;
  const currentPage = Math.max(pageNumber, 1);

  const user = await getSession();

  if (!user) {
    redirect("/login?next=/dashboard");
  }
  const role = await getRole(user.userId);

  if (!role) {
    return <p>User not found.</p>;
  }
  if (role !== "admin") {
    return <p>403 Unauthorized</p>;
  }

  const byArea = ["bole", "megenagna", "piassa", "kazanchis", "legehar"].map(
    (area) => ({
      area,
      revenue: mockOrders
        .filter((order) => order.area === area && order.status !== "CANCELLED")
        .reduce((sum, o) => sum + o.totalPrice, 0),
    }),
  );

  const sortFunction = (order, sortKey) => {
    return order === "desc"
      ? (a, b) => b[sortKey] - a[sortKey]
      : (a, b) => a[sortKey] - b[sortKey];
  };

  const itemsPerPage = 2;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const shownByArea = byArea
    .slice(startIndex, endIndex)
    .sort(sortFunction(revSortOrder, "revenue"));

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const daysWithDate = days.map((day, i) => ({
    date: `${dateCount(i)}`,
    day,
  }));

  const startDate = daysWithDate[0]?.date.slice(0, 10);
  const endDate = daysWithDate[6]?.date.slice(0, 10);

  const ordersPerDay = daysWithDate.map(({ date, day }) => ({
    day,
    numberOfOrders: mockOrders.filter(
      (order) =>
        order.createdAt.startsWith(date.slice(0, 10)) &&
        order.status !== "CANCELLED",
    ).length,
  }));

  return (
    <Report
      data={shownByArea}
      ordersPerDay={ordersPerDay}
      startDate={startDate}
      endDate={endDate}
    />
  );
};

export default Dashboard;
