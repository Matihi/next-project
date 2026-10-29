"use client";
import { logout } from "@/actions/logout-actions";

const LogoutButton = () => {
  return (
    <button
      className="bg-lime-600 px-1 py-0.5 rounded-sm hover:bg-lime-500 h-fit self-center"
      onClick={async () => await logout()}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
