"use server";
import { orderSchema } from "@/lib/schema";
import { z } from "zod";
import { createOrder } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/session";
import { getRole, getUserInfo, normalizePhone } from "@/lib/auth";

const placeOrder = async (prevState, data) => {
  try {
    const user = await getSession();
    if (!user) {
      return {
        fieldErrors: {},
        error: "Sign in to continue",
        order: null,
      };
    }
    const role = await getRole(user.userId);

    if (!role) {
      return {
        fieldErrors: {},
        error: "User not found",
        order: null,
      };
    }
    if (role !== "customer") {
      return {
        fieldErrors: {},
        error: "Not authorized",
        order: null,
      };
    }
    const userInfo = await getUserInfo(user.userId);
    if (
      userInfo?.name !== data.name ||
      normalizePhone(userInfo?.phone) !== normalizePhone(data.phone)
    ) {
      return {
        fieldErrors: {},
        error: "Name or phone number doesn't match",
        order: null,
      };
    }

    const validatedFields = orderSchema.safeParse(data);

    if (!validatedFields.success) {
      const flat = z.flattenError(validatedFields.error).fieldErrors;
      return {
        fieldErrors: flat,
        error: null,
        order: null,
      };
    }
    const order = await createOrder(validatedFields.data, user.userId);
    revalidatePath("/orders");
    return {
      fieldErrors: {},
      error: null,
      order: order,
    };
  } catch (error) {
    console.error("caught error:", error);

    return {
      fieldErrors: {},
      error: "An unexpected server error occured",
      order: null,
    };
  }
};

export default placeOrder;
