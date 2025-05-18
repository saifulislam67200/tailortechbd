import RegisterForm from "@/components/Register/RegisterForm";
import Breadcrumb from "@/components/ui/BreadCrumbs";

const page = () => {
  return (
    <div className="main_container flex min-h-screen w-full flex-col gap-[20px] py-[20px]">
      <Breadcrumb />
      <RegisterForm />
    </div>
  );
};

export default page;
