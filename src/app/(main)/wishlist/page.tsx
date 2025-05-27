import Wishlist from "@/components/Wishlist/Wishlist";
import { getPageMetaData } from "@/utils/meta";

export const metadata = getPageMetaData("Wishlist");
const page = () => {
  return <Wishlist />;
};

export default page;
