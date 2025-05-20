"use client";

import { useLogoutUserMutation } from "@/redux/features/user/user.api";
import Button from "./Button";

const LogoutButton = ({ className }: { className?: string }) => {
  const [logout] = useLogoutUserMutation();
  const handleLogout = async () => {
    await logout(undefined);
  };
  return (
    <Button onClick={handleLogout} className={className}>
      Logout
    </Button>
  );
};

export default LogoutButton;
