import DialogProvider from "@/components/ui/DialogProvider";
import HorizontalLine from "@/components/ui/HorizontalLine";
import { IQuestionsAndAns } from "@/types/QuestionAndAns";
import Image from "next/image";
import { LuX } from "react-icons/lu";
import { FiMessageSquare } from "react-icons/fi";
import { useState } from "react";
import Button from "@/components/ui/Button";
import { useUpdateAnswerByIdMutation } from "@/redux/features/Q&A/questionAndAnswer.api";
import { toast } from "sonner";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
interface PropsType {
  item: IQuestionsAndAns;
}
const AnswerModal: React.FC<PropsType> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [answer, setAnswer] = useState("");
  const [updateAnswerById, { isLoading }] = useUpdateAnswerByIdMutation();
  const handleUpdate = async () => {
    if (!answer.trim()) {
      toast.error("Answer cannot be empty.");
      return;
    }

    try {
      const res = await updateAnswerById({
        id: item?._id,
        payload: {
          answer,
        },
      }).unwrap();

      toast.success("Answer updated successfully");
      console.log("Update success:", res);
      setIsOpen(false);
    //   setAnswer("");
    } catch (err) {
      const error = err as FetchBaseQueryError & {
        data?: { message?: string };
      };

      const message = error?.data?.message || "Failed to update answer. Please try again.";
      toast.error(message);
      console.error("Update error:", error);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        // disabled={!!item?.answer}
        className={`rounded-full border-[1px] p-[7px] transition-colors ${
          item?.answer
            ? "cursor-not-allowed border-gray-300 bg-gray-50 text-gray-400"
            : "border-dashboard bg-dashboard/5 text-dashboard"
        }`}
        title={item?.answer ? "Already Answered" : "Answer Question"}
      >
        <FiMessageSquare size={17} />
      </button>

      <DialogProvider
        state={isOpen}
        setState={setIsOpen}
        className="w-[95%] max-w-[700px] md:w-full"
      >
        <div className="w-full bg-white p-[16px]">
          <div className="flex items-center justify-between">
            <h5 className="text-[20px] font-[700] text-strong">Add To Cart</h5>
            <button onClick={() => setIsOpen(false)} className="cursor-pointer">
              <LuX />
            </button>
          </div>
          <HorizontalLine className="my-[20px]" />

          {/* Modal Content */}
          <div className="p-[20px]">
            {/* Customer Info */}
            <div className="mb-[16px] flex items-center gap-[5px]">
              <h4 className="mb-[2px] text-[16px] font-semibold text-primary">Customer Name :</h4>
              <p className="text-[14px] text-info">{item?.name}</p>
            </div>

            {/* Product Info */}
            <div className="mb-[16px]">
              <h4 className="mb-[8px] text-[16px] font-semibold text-primary">Product</h4>
              <div className="flex items-center gap-3">
                <Image
                  src={item?.product?.image || "/images/avatar.jpg"}
                  alt={item?.product.name}
                  width={55}
                  height={55}
                  className="h-[60px] w-[60px] rounded-lg object-cover"
                />
                <div>
                  <p className="text-[14px] font-medium">{item?.product.name}</p>
                  <p className="text-[12px] text-info">ID: {item?.productId}</p>
                </div>
              </div>
            </div>

            {/* Question */}
            <div className="mb-[24px]">
              <h4 className="mb-[8px] text-[16px] font-semibold text-primary">Question</h4>
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="">{item?.question}</p>
              </div>
            </div>

            {/* Answer Input */}
            <div className="mb-[4px]">
              <label htmlFor="answer" className="mb-[8px] text-[16px] font-semibold text-primary">
                Your Answer
              </label>
              <textarea
                id="answer"
                rows={4}
                value={answer}
                defaultValue={item?.answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-border-main"
                placeholder="Type your answer here..."
              />
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-end gap-3 pb-[24px]">
            <Button
              onClick={() => setIsOpen(false)}
              className="border border-gray-300 bg-transparent text-gray-700 transition-colors hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button onClick={handleUpdate} disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit Answer"}
            </Button>
          </div>
        </div>
      </DialogProvider>
    </>
  );
};

export default AnswerModal;
