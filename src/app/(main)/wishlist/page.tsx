import Wishlist from "@/components/Wishlist/Wishlist";
import { getPageMetaData } from "@/utils/meta";

export const metadata = getPageMetaData("Wishlist");
const page = () => {
  return (
    <div>
      <Wishlist />
    </div>
  );
};

export default page;
