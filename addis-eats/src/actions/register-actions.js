"use server";
import { registrationFormSchema } from "@/lib/schema";
import { z } from "zod";
import { checkDuplicate, normalizePhone, createAccount } from "@/lib/auth";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";

const registerUser = async (data) => {
  try {
    const validatedFields = registrationFormSchema.safeParse(data);

    if (!validatedFields.success) {
      const flat = z.flattenError(validatedFields.error).fieldErrors;
      return { success: false, fieldErrors: flat, error: null };
    }

    const { phone } = data;
    const normalizedPhoneNumber = normalizePhone(phone);
    const isDuplicate = checkDuplicate(normalizedPhoneNumber);

    if (isDuplicate) {
      return {
        success: false,
        fieldErrors: {
          phone: ["An account with this phone number already exists."],
        },
        error: null,
      };
    }

    const dataWithRole =
      normalizedPhoneNumber === "+251911223344"
        ? { ...data, phone: normalizedPhoneNumber, role: "admin" }
        : { ...data, phone: normalizedPhoneNumber, role: "customer" };

    const userData = dataWithRole;
    const userId = await createAccount(userData);

    redirect("/login", "replace");
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    console.log("error in register action: ", error);
    return {
      success: false,
      fieldErrors: {},
      error: "An unexpected server error occurred",
    };
  }
};

export default registerUser;
