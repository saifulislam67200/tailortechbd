import ChangePassowrd from "@/components/Account/Profile/ChangePassowrd";
import EditProfile from "@/components/Account/Profile/EditProfile";

const ProfileView = () => {
  return (
    <div className="flex w-full flex-col gap-[16px] border-[1px] border-border-muted bg-white p-[16px]">
      <EditProfile />
      <ChangePassowrd />
    </div>
  );
};

export default ProfileView;
