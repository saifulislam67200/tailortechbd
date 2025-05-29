import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  return (
    <Link
      href="https://wa.me/01711923276"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-[12px] bottom-[50px] z-40 rounded-full bg-[#25d366] p-[8px] text-white transition duration-300 hover:bg-green-600 md:right-[28px] md:bottom-[45px]"
    >
      <FaWhatsapp className="text-[35px]" />
    </Link>
  );
};

export default WhatsAppButton;
