import Footer from "@/components/Shared/Footer/Footer";
import BottomNav from "@/components/Shared/Navbar/BottomNav";
import Navbar from "@/components/Shared/Navbar/Navbar";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      <Navbar />
      {children}
      <WhatsAppButton />
      <BottomNav />
      <Footer />
    </div>
  );
}
