"use server";
import { normalizePhone, verifyCredentials } from "@/lib/auth";
import { loginFormSchema } from "@/lib/schema";
import { z } from "zod";
import createSession from "@/lib/session";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";
const loginUser = async (data, redirectTo) => {
  try {
    const validatedFields = loginFormSchema.safeParse(data);
    if (!validatedFields.success) {
      const flat = z.flattenError(validatedFields.error).fieldErrors;
      return { success: false, fieldErrors: flat, error: null };
    }
    const { phone, password } = data;
    const normalizedPhoneNumber = normalizePhone(phone);
    const userId = await verifyCredentials(normalizedPhoneNumber, password);

    if (!userId) {
      return { success: false, fieldErrors: {}, error: "Invalid credentials" };
    }
    await createSession(userId);
    const safeDistination =
      redirectTo.startsWith("/") && !redirectTo.startsWith("//")
        ? redirectTo
        : "/";
    redirect(safeDistination, "replace");
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    console.log("error in loginUser: ", error);
    return {
      success: false,
      fieldErrors: {},
      error: "An unexpected server error occurred",
    };
  }
};

export default loginUser;
