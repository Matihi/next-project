import { z } from "zod";
const phonePattern = /^(?:\+251|0)9\d{8}$/;
const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s])[^\s]+$/;

export const orderSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, { message: "Name is required" })
      .min(2, { message: "Name must be at least 2 characters" }),

    phone: z
      .string()
      .trim()
      .min(1, { message: "Phone is required" })
      .regex(phonePattern, {
        message:
          "Phone number must start with 09… or +2519… followed by 8 digits",
      }),

    dishId: z.string().optional(),

    quantity: z
      .number()
      .min(1, { message: "Quantity must be at least 1" })
      .optional(),
    notes: z
      .string()
      .max(200, { message: "Notes cannot exceed 200 characters" })
      .optional(),

    area: z.string().trim(),
    totalPrice: z.number().default(0),
  })
  .refine(
    (data) => {
      if (data.area === "select" || data.area === "") {
        return false;
      }
      return true;
    },
    { message: "Please choose delivery area", path: ["area"] },
  );

export const registrationFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .min(2, { message: "Name must be at least 2 characters" }),

  phone: z
    .string()
    .trim()
    .min(1, { message: "Phone is required" })
    .regex(phonePattern, {
      message: "Phone number should be a valid TeleBirr phone number",
    }),

  password: z
    .string()
    .trim()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password should contain at least eight characters." })
    .regex(passwordPattern, {
      message:
        "Password should contain at least one lower case, one upper case, one digit and one special character",
    }),
});

export const loginFormSchema = z.object({
  phone: z
    .string()
    .trim()
    .min(1, { message: "Phone is required" })
    .regex(phonePattern, {
      message: "Phone number should be a valid TeleBirr phone number",
    }),
  password: z.string().trim().min(1, { message: "Password is required" }),
});
