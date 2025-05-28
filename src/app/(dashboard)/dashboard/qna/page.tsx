import Qna from "@/components/Dashboard/Qna/Qna";
import { getPageMetaData } from "@/utils/meta";
export const metadata = getPageMetaData("Question And Ans");
const page = () => {
  return <Qna />;
};

export default page;
