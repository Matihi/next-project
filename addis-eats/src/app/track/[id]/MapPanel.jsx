"use client";
import dynamic from "next/dynamic";

const DeliveryMap = dynamic(() => import("./DeliveryMap"), {
  ssr: false,
  loading: () => <div className="h-80 bg-slate-100" />,
});

const MapPanel = () => {
  return (
    <>
      <DeliveryMap />
      <section className="p-1">
        <h2 className="text-xl">Delivery Details</h2>
        <p>Courier name: Abebe</p>
        <p>Delivery status: Delivering your food</p>
        <p>Estimated time of arrival: 20 minutes</p>
      </section>
    </>
  );
};

export default MapPanel;
