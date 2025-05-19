import ChangePassowrd from "@/components/Account/Profile/ChangePassowrd";
import EditProfile from "@/components/Account/Profile/EditProfile";

const ProfileView = () => {
  return (
    <div className="borde-[1px] w-full border-border-muted bg-white p-[16px]">
      <EditProfile />
      <ChangePassowrd />
    </div>
  );
};

export default ProfileView;
