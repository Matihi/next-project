"use server";

import { getOrder, markCancelled } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/session";

const cancelOrder = async (id) => {
  try {
    const userSession = await getSession();
    const order = await getOrder(id);
    if (!userSession) {
      return { error: "Sign in to continue" };
    }
    if (!order) {
      return { error: "Order not found" };
    }
    if (order.userId !== userSession.userId) {
      return { error: "You cannot cancel this order." };
    }
    const canceledOrder = await markCancelled(id);
    revalidatePath("/orders");
    return { canceledOrder: canceledOrder };
  } catch (error) {
    return { error: "Unable to cancel the order. Please try again." };
  }
};

export default cancelOrder;
