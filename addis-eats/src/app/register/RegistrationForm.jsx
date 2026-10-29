"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationFormSchema } from "@/lib/schema";
import registerUser from "@/actions/register-actions";
import styles from "./RegistrationForm.module.css";
import { useState } from "react";

const RegistrationForm = () => {
  const [isPending, setIsPending] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    resetField,
  } = useForm({
    resolver: zodResolver(registrationFormSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      phone: "",
      password: "",
    },
  });

  const handleRegistration = async (data) => {
    setIsPending(true);
    const result = await registerUser(data);

    if (result?.success === false) {
      if (!!result.error) {
        setError("root.serverError", { type: 500, message: result.error });
      }
      if (Object.keys(result.fieldErrors).length !== 0) {
        Object.entries(result.fieldErrors).forEach(([key, value]) =>
          setError(key, {
            type: "server-validation",
            message: value[0],
          }),
        );
      }
    } else if (result?.success === true) {
      resetField("name");
      resetField("phone");
      resetField("password");
    }
    setIsPending(false);
  };

  return (
    <section className={styles.registerContainer}>
      <div className={styles.formWrapper}>
        <h1>Create Your Addis Eats Account</h1>
        <form
          className={styles.form}
          method="post"
          noValidate
          onSubmit={handleSubmit(handleRegistration)}
          aria-describedby={
            errors.root?.serverError?.type === 500 ? "form-error" : undefined
          }
        >
          {errors.root?.serverError?.type === 500 && (
            <p id="form-error" role="alert" className={styles.errorMessage}>
              {errors.root?.serverError?.message}
            </p>
          )}
          <div className={styles.nameWrapper}>
            <label htmlFor="name">{`Name(ስም)`}</label>
            <input
              type="text"
              id="name"
              {...register("name")}
              placeholder="Your Name"
              className={errors.name && styles.invalid}
              aria-invalid={!!errors.name}
              aria-describedby={!!errors.name ? "name-error" : undefined}
            />
            {!!errors.name && (
              <p id="name-error" className={styles.errorMessage}>
                {errors.name?.message}
              </p>
            )}
          </div>

          <div className={styles.phoneWrapper}>
            <label htmlFor="phone">{`TeleBirr Phone Number(ስልክ ቁጥር)`}</label>
            <input
              type="tel"
              id="phone"
              {...register("phone")}
              placeholder="0911223344"
              className={errors.phone && styles.invalid}
              aria-invalid={!!errors.phone}
              aria-describedby={!!errors.phone ? "phone-error" : undefined}
            />
            {!!errors.phone && (
              <p id="phone-error" className={styles.errorMessage}>
                {errors.phone?.message}
              </p>
            )}
          </div>

          <div className={styles.passwordWrapper}>
            <label htmlFor="password">{`Password(የይለፍ ቃል)`}</label>
            <input
              type="password"
              id="password"
              {...register("password")}
              placeholder="Password"
              className={errors.password && styles.invalid}
              aria-invalid={!!errors.password}
              aria-describedby={
                !!errors.password ? "password-error" : undefined
              }
            />
            {!!errors.password && (
              <p id="password-error" className={styles.errorMessage}>
                {errors.password?.message}
              </p>
            )}
          </div>

          <button
            disabled={isPending}
            className={isPending ? styles.disabledRegister : undefined}
            type="submit"
          >
            {isPending ? "Submitting" : "Create Account"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default RegistrationForm;
