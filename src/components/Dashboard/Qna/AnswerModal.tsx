import Button from "@/components/ui/Button";
import DialogProvider from "@/components/ui/DialogProvider";
import HorizontalLine from "@/components/ui/HorizontalLine";
import { useUpdateAnswerByIdMutation } from "@/redux/features/Q&A/questionAndAnswer.api";
import { IQuestionsAndAns } from "@/types/QuestionAndAns";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Image from "next/image";
import { cloneElement, isValidElement, ReactElement, useState } from "react";
import { FiMessageSquare } from "react-icons/fi";
import { LuX } from "react-icons/lu";
import { toast } from "sonner";
interface PropsType {
  item: IQuestionsAndAns;
  children?: React.ReactNode;
}
const AnswerModal: React.FC<PropsType> = ({ item, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [answer, setAnswer] = useState(item?.answer);
  const [updateAnswerById, { isLoading }] = useUpdateAnswerByIdMutation();
  const handleUpdate = async () => {
    if (!answer?.trim()) {
      toast.error("Answer cannot be empty.");
      return;
    }

    try {
      await updateAnswerById({
        id: item?._id,
        payload: {
          answer,
        },
      }).unwrap();

      toast.success("Answer updated successfully");
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
      {children && isValidElement(children) ? (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cloneElement(children as ReactElement<any>, { onClick: () => setIsOpen(true) })
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          // disabled={!!item?.answer}
          className={`cursor-pointer rounded-full border-[1px] border-dashboard bg-dashboard/5 p-[7px] text-dashboard transition-colors`}
          title={item?.answer ? "Already Answered" : "Answer Question"}
        >
          <FiMessageSquare size={17} />
        </button>
      )}

      <DialogProvider
        state={isOpen}
        setState={setIsOpen}
        className="w-[95%] max-w-[700px] md:w-full"
      >
        <div className="w-full bg-white p-[16px]">
          <div className="flex items-center justify-between">
            <h5 className="text-[18px] font-[700] text-strong md:text-[20px]">
              Answer the Question
            </h5>
            <button onClick={() => setIsOpen(false)} className="cursor-pointer">
              <LuX />
            </button>
          </div>
          <HorizontalLine className="my-[10px] md:my-[20px]" />

          {/* Modal Content */}
          <div className="md:p-[20px]">
            {/* Customer Info */}
            <div className="mb-[12px] flex items-center gap-[5px] md:mb-[16px]">
              <h4 className="mb-[2px] text-[14px] font-semibold text-primary md:text-[16px]">
                Customer Name :
              </h4>
              <p className="text-[12px] text-info md:text-[14px]">{item?.name}</p>
            </div>

            {/* Product Info */}
            <div className="mb-[12px] md:mb-[16px]">
              <h4 className="mb-[8px] text-[14px] font-semibold text-primary md:text-[16px]">
                Product
              </h4>
              <div className="flex items-center gap-3">
                <Image
                  src={item?.product?.image || "/images/avatar.jpg"}
                  alt={item?.product.name}
                  width={55}
                  height={55}
                  className="h-[40px] w-[40px] rounded-lg object-cover md:h-[60px] md:w-[60px]"
                />
                <div>
                  <p className="text-[12px] font-medium md:text-[14px]">{item?.product.name}</p>
                  <p className="text-[11px] text-info md:text-[12px]">ID: {item?.productId}</p>
                </div>
              </div>
            </div>

            {/* Question */}
            <div className="mb-[16px] md:mb-[24px]">
              <h4 className="mb-[8px] text-[14px] font-semibold text-primary md:text-[16px]">
                Question
              </h4>
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="">{item?.question}</p>
              </div>
            </div>

            {/* Answer Input */}
            <div className="mb-[4px]">
              <label
                htmlFor="answer"
                className="mb-[8px] text-[14px] font-semibold text-primary md:text-[16px]"
              >
                Your Answer
              </label>
              <textarea
                id="answer"
                rows={4}
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-border-main"
                placeholder="Type your answer here..."
              />
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-end gap-3 pb-[16px] md:pb-[24px]">
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
