"use client";
import ContactSupportTable from "@/components/Dashboard/contactSupport/ContactSupportTable";
import DashboardPageHeadingTitle from "@/components/Dashboard/DashboardPageHeadingTitle";

const ContactSupportView = () => {
  return (
    <div className="flex flex-col gap-[10px]">
      <DashboardPageHeadingTitle title="Contact Support" />
      <ContactSupportTable />
    </div>
  );
};

export default ContactSupportView;
