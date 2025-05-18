import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

const EditProfile = () => {
  return (
    <div className="flex w-full flex-col gap-[16px] border-[1px] border-border-main p-[10px]">
      <h4 className="text-[16px] font-[700] text-strong">Account Information</h4>
      <form>
        <div className="grid grid-cols-2 gap-[8px]">
          <div className="flex w-full flex-col gap-[6px]">
            <label className="text-[12px] text-strong">Full Name</label>
            <Input placeholder="Enter your full name" />
          </div>
          <div className="flex w-full flex-col gap-[6px]">
            <label className="text-[12px] text-strong">Phone No.</label>
            <div className="flex items-center justify-start gap-0">
              <span className="border-y-[1px] border-l-[1px] border-border-main bg-[#e9ecef] px-[12px] py-[6px] text-[12px] text-strong">
                {"+880"}
              </span>
              <Input type="number" name="phoneNumber" placeholder="Enter Your Mobile Number" />
            </div>
          </div>

          <div className="flex w-full flex-col gap-[6px]">
            <label className="text-[12px] text-strong">Email</label>
            <Input placeholder="Enter your Email" />
          </div>
          <div className="flex w-full flex-col gap-[6px]">
            <label className="text-[12px] text-strong">Gender</label>
            <select className="w-full appearance-none border-[1px] border-border-main bg-white bg-clip-padding px-[12px] py-[6px] text-base text-[12px] font-normal text-strong outline-none">
              <option value="" hidden>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
        <Button className="mt-[16px] bg-pirmary-foreground">Update Information</Button>
      </form>
    </div>
  );
};

export default EditProfile;
