import Link from "next/link";
import CartBadge from "./CartBadge";
import LogoutButton from "./LogoutButton";
import { getSession } from "@/lib/session";
import { getRole, getUserInfo } from "@/lib/auth";

async function Header() {
  const user = await getSession();
  const role = await getRole(user?.userId);
  const userInfo = await getUserInfo(user?.userId);

  return (
    <header className="flex justify-center p-2 gap-1  bg-red-200 ">
      <nav className="flex justify-center items-center gap-2">
        <Link href="/">Home</Link>
        <Link href="/menu">Menu</Link>
        <Link className="flex space-x-0.5" href="/cart">
          <span>Cart</span>
          <CartBadge />
        </Link>
        {role === "customer" && (
          <>
            <Link href="/checkout">Checkout</Link>
            <Link href="/orders">Orders</Link>
          </>
        )}
        {role === "admin" && <Link href="/dashboard">Dashboard</Link>}

        {!user && (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </nav>
      {userInfo?.name && (
        <div>
          <p>Selam,</p>
          <p>{`${userInfo.name}`}</p>
        </div>
      )}
      {user && <LogoutButton />}
    </header>
  );
}

export default Header;
