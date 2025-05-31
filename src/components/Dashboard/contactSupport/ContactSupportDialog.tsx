"use client";
import DialogProvider from "@/components/ui/DialogProvider";
import HorizontalLine from "@/components/ui/HorizontalLine";
import { useMarkContactMessageAsReadMutation } from "@/redux/features/contactSupport/contactSupport.api";
import { IContactSupport } from "@/types/ContactSupport";
import Link from "next/link";
import { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { MdPhone } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { TfiEmail } from "react-icons/tfi";
const ContactSupportDialog = ({ contactSupport }: { contactSupport: IContactSupport }) => {
  const [open, setOpen] = useState(false);
  const [markAsRead] = useMarkContactMessageAsReadMutation();

  const handleClick = async () => {
    setOpen(true);
    if (!contactSupport.isRead) {
      await markAsRead(contactSupport._id);
    }
  };

  return (
    <>
      <button onClick={handleClick} className="relative cursor-pointer flex p-[7px] items-center justify-center rounded-full border border-dashboard/20 text-dashboard transition-all duration-200 hover:border-dashboard/40 hover:bg-dashboard/10 hover:text-dashboard/80">
        <FiEye size={18} />
        {!contactSupport.isRead ? (
          <span className="absolute top-[-1px] right-0 h-2 w-2 rounded-full bg-danger"></span>
        ) : (
          ""
        )}
      </button>
      <DialogProvider className="w-[95vw] max-w-[800px] md:w-full" state={open} setState={setOpen}>
        <div className="w-full bg-white p-[16px]">
          <div className="flex items-center justify-between">
            <h3 className="text-[20px] font-[700] text-primary">Contact Support </h3>
            <button className="cursor-pointer text-[20px]" onClick={() => setOpen(false)}>
              <RxCross1 />
            </button>
          </div>
          <HorizontalLine className="my-[10px]" />
          <div className="flex flex-col gap-[10px]">
            <p className="flex items-center justify-start gap-[5px] text-[15px] text-primary">
              <FaRegUser /> <span className="font-[700]">Name: </span>
              {contactSupport.fullName}
            </p>
            <p className="flex items-center justify-start gap-[5px] text-[15px] text-primary">
              <TfiEmail /> <span className="font-[700]">Email: </span>
              <Link
                href={`mailto:${contactSupport.email}`}
                className="cursor-pointer hover:underline"
              >
                {contactSupport.email}
              </Link>
            </p>
            <p className="flex items-center justify-start gap-[5px] text-[15px] text-primary">
              <MdPhone /> <span className="font-[700]">Phone: </span>
              <Link
                href={`tel:${contactSupport.phoneNumber}`}
                className="cursor-pointer hover:underline"
              >
                {contactSupport.phoneNumber || "---N/A---"}
              </Link>
            </p>

            <p className="flex flex-col gap-[5px] text-[15px] text-primary">
              <span className="font-[700]">Message: </span>
              <span className="bg-primary/5 p-[8px] leading-[150%]">{contactSupport.message}</span>
            </p>
          </div>
        </div>
      </DialogProvider>
    </>
  );
};

export default ContactSupportDialog;
