"use client";

import { useEffect, useState } from "react";

const OrderStatus = ({ id, initial }) => {
  const [orderStatus, setOrderStatus] = useState(initial?.status);
  const [connectionMessage, setConnectionMessage] = useState("...connecting");

  useEffect(() => {
    const es = new EventSource(`/api/orders/${id}/stream`);
    es.onopen = () => setConnectionMessage("connected");
    es.onmessage = (e) => {
      const deliveryStatus = JSON.parse(e.data);
      setOrderStatus(deliveryStatus);
      if (deliveryStatus === "DELIVERED") {
        es.close();
        setConnectionMessage("disconnected");
      }
    };
    es.onerror = () => {
      es.close();
      setConnectionMessage("disconnected");
    };
    return () => es.close();
  }, [id]);
  return (
    <div>
      <p>{`Connection status: ${connectionMessage}`}</p>
      <p> {`Order status: ${orderStatus}`}</p>
    </div>
  );
};

export default OrderStatus;
