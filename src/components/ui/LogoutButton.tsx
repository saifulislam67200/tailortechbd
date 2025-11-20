"use client";

import { useLogoutUserMutation } from "@/redux/features/user/user.api";
import Button from "./Button";
import { useAppDispatch } from "@/hooks/redux";
import { logout as logoutAction } from "@/redux/features/user/user.slice";
import { clearCart } from "@/redux/features/cart/cartSlice";

const LogoutButton = ({ className }: { className?: string }) => {
  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    dispatch(logoutAction(undefined));
    // dispatch(clearCart());
    await logoutUser(undefined);
  };
  return (
    <Button onClick={handleLogout} className={className}>
      Logout
    </Button>
  );
};

export default LogoutButton;
