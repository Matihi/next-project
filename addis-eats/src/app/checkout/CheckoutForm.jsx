"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderSchema } from "@/lib/schema";
import placeOrder from "@/actions/checkout-actions";
import { useActionState } from "react";
import { startTransition } from "react";
import { useEffect } from "react";
import useCart from "@/context/cart/useCart";

const divStyle = "flex flex-col";
const inputStyle = "border w-fit p-0.5";
const errorMessageStyle = "text-red-500 text-xs";

const initialState = {
  fieldErrors: {},
  error: null,
  order: null,
};

const CheckoutForm = () => {
  const { cart, totalPrice, dispatch } = useCart();

  const numberOfItems = cart.cartItems.length;

  const [state, formAction, pending] = useActionState(placeOrder, initialState);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValues,
    clearErrors,
  } = useForm({
    resolver: zodResolver(orderSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      phone: "",
      area: "select",
    },
  });

  useEffect(() => {
    if (
      !pending &&
      state?.order &&
      Object.keys(state?.fieldErrors ?? {}).length === 0 &&
      state?.error === null
    ) {
      dispatch({
        type: "cart_cleared",
      });
      setValues(
        { name: "", phone: "", area: "" },
        { shouldValidate: false, shouldDirty: false, shouldTouch: false },
      );
      clearErrors();
    }
  }, [pending, state, setValues, clearErrors]);

  const handlePay = async (data) => {
    const dataWithTotalPrice = {
      ...data,
      totalPrice: totalPrice,
      quantity: numberOfItems,
    };

    startTransition(() => formAction(dataWithTotalPrice));
  };

  return (
    <div className="p-1">
      <p>Enter your info</p>
      <form
        className="flex flex-col gap-1 p-3 border w-fit"
        onSubmit={handleSubmit(handlePay)}
        aria-describedby={state?.error?.length > 0 ? "form-error" : undefined}
      >
        {state?.error?.length > 0 && (
          <p id="form-error" role="alert" className={errorMessageStyle}>
            {state.error}
          </p>
        )}
        {state?.fieldErrors?.quantity?.length > 0 && (
          <p id="quantity-error" className={errorMessageStyle}>
            {state.fieldErrors.quantity[0]}
          </p>
        )}

        <div className={divStyle}>
          <label htmlFor="name">Name:</label>
          <input
            className={inputStyle}
            type="text"
            id="name"
            {...register("name")}
            placeholder="Your Name"
            aria-invalid={!!errors.name || state?.fieldErrors?.name?.length > 0}
            aria-describedby={
              !!errors.name || state?.fieldErrors?.name?.length > 0
                ? "name-error"
                : undefined
            }
          />
          {!!errors.name && (
            <p id="name-error" className={errorMessageStyle}>
              {errors.name.message}
            </p>
          )}
          {state?.fieldErrors?.name?.length > 0 && (
            <p id="name-error" className={errorMessageStyle}>
              {state.fieldErrors.name[0]}
            </p>
          )}
        </div>

        <div className={divStyle}>
          <label htmlFor="phone">Phone:</label>
          <input
            className={inputStyle}
            type="tel"
            id="phone"
            {...register("phone")}
            placeholder="0911223344"
            aria-invalid={
              !!errors.phone || state?.fieldErrors?.phone?.length > 0
            }
            aria-describedby={
              !!errors.phone || state?.fieldErrors?.phone?.length > 0
                ? "phone-error"
                : undefined
            }
          />
          {!!errors.phone && (
            <p id="phone-error" className={errorMessageStyle}>
              {errors.phone.message}
            </p>
          )}
          {state?.fieldErrors?.phone?.length > 0 && (
            <p id="phone-error" className={errorMessageStyle}>
              {state.fieldErrors.phone[0]}
            </p>
          )}
        </div>
        <div className="">
          <label htmlFor="area">Delivery area:</label>
          <select
            className="border"
            id="area"
            {...register("area")}
            aria-invalid={!!errors.area || state?.fieldErrors?.area?.length > 0}
            aria-describedby={
              !!errors.area || state?.fieldErrors?.area?.length > 0
                ? "area-error"
                : undefined
            }
          >
            <option value="select">Select</option>
            <option value="bole">Bole</option>
            <option value="megenagna">Megenagna</option>
            <option value="piassa">Piassa</option>
            <option value="kazanchis">Kazanchis</option>
            <option value="legehar">Legehar</option>
          </select>
          {!!errors.area && (
            <p id="area-error" className={errorMessageStyle}>
              {errors.area.message}
            </p>
          )}
          {state?.fieldErrors?.area?.length > 0 && (
            <p id="area-error" className={errorMessageStyle}>
              {state.fieldErrors.area[0]}
            </p>
          )}
        </div>
        <button
          className={`self-start py-0.5 ${pending ? "bg-gray-500" : "bg-red-500"}  px-1.5 rounded-sm`}
          type="submit"
          disabled={pending}
        >
          {pending ? "Submitting..." : "Pay"}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
