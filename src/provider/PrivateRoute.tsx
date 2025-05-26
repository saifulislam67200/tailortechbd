"use client";
import Loader from "@/components/ui/Loader";
import { useAppSelector } from "@/hooks/redux";
import { TRoles } from "@/types/user";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
interface IProps {
  role: TRoles | "*";
  children: React.ReactNode;
  checkVerification?: boolean;
}

const Protectedroute: React.FC<IProps> = ({ role, children, checkVerification = true }) => {
  const { user, isLoading } = useAppSelector((state) => state.user);
  const router = useRouter();
  const path = usePathname();

  const noContent = <div className="h-screen w-full bg-white"></div>;

  if (isLoading) {
    return <Loader className="!h-screen" />;
  }

  if (!user) {
    Cookies.set("redirect", path);
    router.push("/login");
    return noContent;
  }

  if (user.role !== role && role !== "*") {
    Cookies.set("redirect", path);
    router.push("/");
    return noContent;
  }

  if (!user.isVerified && checkVerification) {
    Cookies.set("redirect", path);
    router.push("/register/verification");
    return noContent;
  }

  return children;
};

export default Protectedroute;
