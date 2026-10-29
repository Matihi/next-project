import { z } from "zod";
import { orderSchema } from "@/lib/schema";
import { createOrder } from "@/lib/db";
export const POST = async (request) => {
  try {
    const body = await request.json();
    const result = orderSchema.safeParse(body);
    if (!result.success) {
      const flat = z.flattenError(result.error).fieldErrors;
      return Response.json(
        { error: "Validation failed", fieldErrors: flat },
        { status: 422 },
      );
    }
    const order = await createOrder(result.data);
    return Response.json(order, { status: 201 });
  } catch (error) {
    const isJsonError = error instanceof SyntaxError;
    console.error("caught error:", error);

    return Response.json(
      {
        error: isJsonError
          ? "Invalid json provided"
          : "An unexpected server error occured",
      },
      { status: isJsonError ? 400 : 500 },
    );
  }
};
