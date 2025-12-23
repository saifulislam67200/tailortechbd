import Footer from "@/components/Shared/Footer/Footer";
// import BottomNav from "@/components/Shared/Navbar/BottomNav";
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
          {/* <BottomNav /> */}
          <Footer />
        </AutoLogoutProvider>
      </div>
    </>
  );
}
