"use client";
import Loader from "@/components/ui/Loader";
import { useAppSelector } from "@/hooks/redux";
import { TRoles } from "@/types/user";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface IProps {
  role: TRoles | "*";
  children: React.ReactNode;
  checkVerification?: boolean;
}

const Protectedroute: React.FC<IProps> = ({ role, children, checkVerification = true }) => {
  const { user, isLoading } = useAppSelector((state) => state.user);
  const router = useRouter();
  const path = usePathname();
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      Cookies.set("redirect", path);
      router.push("/login");
      return;
    }

    if (user.role !== role && role !== "*") {
      Cookies.set("redirect", path);
      router.push("/");
      return;
    }

    if (!user.isVerified && checkVerification) {
      Cookies.set("redirect", path);
      router.push("/register/verification");
      return;
    }

    setIsAllowed(true);
  }, [user, isLoading, path, router, role, checkVerification]);

  if (isLoading || !isAllowed) {
    return <Loader className="!h-screen" />;
  }

  return <>{children}</>;
};

export default Protectedroute;
