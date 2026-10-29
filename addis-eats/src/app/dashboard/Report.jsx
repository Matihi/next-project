"use client";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const etb = (v) =>
  new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 0,
  }).format(v);

const Report = ({ data, ordersPerDay, startDate, endDate }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();

  const revSortButton = searchParams.get("revenue_sort") ?? "desc";
  const parsedPage = Number(searchParams.get("page")) || 1;
  const currentPage = Math.max(parsedPage, 1);

  const createPageURL = (pageNumber) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const handleRevAsc = () => {
    const params = new URLSearchParams(searchParams);
    params.set("revenue_sort", "asc");
    push(`${pathname}?${params.toString()}`);
  };

  const handleRevDesc = () => {
    const params = new URLSearchParams(searchParams);
    params.set("revenue_sort", "desc");
    push(`${pathname}?${params.toString()}`);
  };

  const noData = data.length <= 0;

  const theadElements = !noData
    ? Object.keys(data[0]).map((key) => (
        <th className="border-l p-2" scope="col" key={key}>
          {key}
          {key === "revenue" && (
            <>
              {revSortButton !== "asc" && (
                <button onClick={handleRevAsc}>⌄</button>
              )}
              {revSortButton !== "desc" && (
                <button onClick={handleRevDesc}>^</button>
              )}
            </>
          )}
        </th>
      ))
    : null;

  const theadElementsForOrdersPerDay = Object.keys(ordersPerDay[0]).map(
    (key) => (
      <th className="border-l p-2" scope="col" key={key}>
        {key === "numberOfOrders" ? "Orders per day" : key}
      </th>
    ),
  );

  const tbodyElements = !noData
    ? data.map((element) => (
        <tr className="border" key={element.area}>
          <td className="border-r">{element.area}</td>
          <td className="text-right">{element.revenue}</td>
        </tr>
      ))
    : null;

  const tbodyElementsForOrdersPerDay = ordersPerDay.map((element) => (
    <tr className="border" key={element.day}>
      <td className="border-r">{element.day}</td>
      <td className="text-right">{element.numberOfOrders}</td>
    </tr>
  ));

  const pageLinkStyle =
    " py-1 px-2 mx-2 bg-amber-500 disabled:bg-gray-300 rounded-md active:bg-amber-600 h-fit";

  return (
    <>
      <figure>
        <figcaption>Revenue by neighbourhood</figcaption>
        <ResponsiveContainer width="95%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="area" />
            <YAxis tickFormatter={etb} width={80} />
            <Tooltip formatter={(v) => [etb(v), "Revenue"]} />

            <Bar dataKey="revenue" fill="#1B4D8E" />
          </BarChart>
        </ResponsiveContainer>
      </figure>

      {!noData ? (
        <table className="border m-4">
          <caption>Revenue by neighbourhood</caption>
          <thead>
            <tr className="border">{theadElements}</tr>
          </thead>
          <tbody>{tbodyElements}</tbody>
        </table>
      ) : (
        <p>No data</p>
      )}

      <Link
        className={pageLinkStyle}
        href={currentPage === 1 ? "" : createPageURL(currentPage - 1)}
      >{`< Prev`}</Link>
      <Link
        className={pageLinkStyle}
        href={noData ? "" : createPageURL(currentPage + 1)}
      >{`Next >`}</Link>
      <figure>
        <figcaption>
          {`Number of orders per day from ${ordersPerDay[0]?.day} ${startDate} to ${ordersPerDay[6]?.day} ${endDate}`}
        </figcaption>
        <ResponsiveContainer width="95%" height={300}>
          <LineChart data={ordersPerDay}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line
              dataKey="numberOfOrders"
              name="orders per day"
              fill="#1B4D8E"
            />
          </LineChart>
        </ResponsiveContainer>
      </figure>

      <table className="border m-4">
        <caption>
          {`Number of orders per day from ${ordersPerDay[0]?.day} ${startDate} to ${ordersPerDay[6]?.day} ${endDate}`}
        </caption>
        <thead>
          <tr>{theadElementsForOrdersPerDay}</tr>
        </thead>
        <tbody>{tbodyElementsForOrdersPerDay}</tbody>
      </table>
    </>
  );
};

export default Report;
