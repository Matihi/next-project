import LoginForm from "./LoginForm";

export const metadata = {
  title: "Login",
  description: "Login to your account.",
};

const Login = async ({ searchParams }) => {
  const { next } = await searchParams;
  const redirectTo = next ? next : "/";
  return <LoginForm redirectTo={redirectTo} />;
};

export default Login;
