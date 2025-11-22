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
    const timeout = setTimeout(() => {
      if (isLoading) return;

      if (!user) {
        Cookies.set("redirect", path);
        router.replace("/customers/login");
        return;
      }

      if (user.role !== role && role !== "*") {
        Cookies.remove("redirect");
        router.replace("/");
        return;
      }

      if (!user.isVerified && checkVerification) {
        Cookies.set("redirect", path);
        router.replace("/register/verification");
        return;
      }

      setIsAllowed(true);
    }, 500);

    return () => clearTimeout(timeout);
  }, [user, isLoading, role, checkVerification]);

  if (isLoading || !isAllowed) {
    return <Loader className="!h-screen" />;
  }

  return <>{children}</>;
};

export default Protectedroute;
