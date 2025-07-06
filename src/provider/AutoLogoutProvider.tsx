"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import useAutoLogout from "@/hooks/useAutoLogout";
import { clearCart } from "@/redux/features/cart/cartSlice";
import { useLogoutUserMutation } from "@/redux/features/user/user.api";
import React, { ReactNode, useEffect } from "react";
import { logout as logoutAction } from "@/redux/features/user/user.slice";

export const AutoLogoutProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const [logoutUser] = useLogoutUserMutation();
  const user = useAppSelector((state) => state.user);
  console.log(user, "from auth login provider");
  const isLoggedIn = !!user?.token;

  const handleLogout = async () => {
    dispatch(logoutAction(undefined));
    dispatch(clearCart());
    await logoutUser(undefined);
  };

  // Configure based on auth state
  const { cleanup } = useAutoLogout(handleLogout, isLoggedIn ? 10 : Number.MAX_SAFE_INTEGER, {
    warningMinutes: isLoggedIn ? 2 : 0,
    showConfirmation: isLoggedIn,
  });

  useEffect(() => {
    if (!isLoggedIn) cleanup();
    return () => cleanup();
  }, [isLoggedIn, cleanup]);

  return <>{children}</>;
};
