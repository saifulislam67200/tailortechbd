import Footer from "@/components/Shared/Footer/Footer";
import Navbar from "@/components/Shared/Navbar/Navbar";
import { AutoLogoutProvider } from "@/provider/AutoLogoutProvider";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="relative">
        <AutoLogoutProvider>
          <Navbar />
            {children}
          <Footer />
        </AutoLogoutProvider>
      </div>
    </>
  );
}
