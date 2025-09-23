import DialogProvider from "@/components/ui/DialogProvider";
import { useChageStockStatusMutation } from "@/redux/features/restockRequest/restockRequest.api";
import React, { useState } from "react";
import { toast } from "sonner";

interface Props {
  newStatus: "approved" | "rejected";
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  requestId: string;
}

const ChangeStockRequestStatus: React.FC<Props> = ({ isOpen, newStatus, setIsOpen, requestId }) => {
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState(false);

  const [changeStatus, { isLoading }] = useChageStockStatusMutation();

  const isValid = message.trim().length > 0;

  const close = () => setIsOpen(false);

  const onConfirm = async () => {
    setTouched(true);
    if (!isValid || isLoading) return;
    const res = await changeStatus({
      id: requestId,
      payload: { status: newStatus, message },
    });

    if (res.error) {
      toast.error("Something went wrong");
      return;
    }

    close();
  };

  return (
    <DialogProvider
      state={isOpen}
      setState={() => setIsOpen(!isOpen)}
      className="w-full max-w-[420px]"
    >
      <div className="w-full rounded-2xl bg-white p-4 shadow sm:p-5">
        <div className="space-y-4">
          <header className="space-y-1">
            <h2 className="text-lg font-semibold">Change status</h2>
            <p className="text-sm text-gray-500">
              You are about to set this request to
              <span
                className={`mx-1 font-medium ${
                  newStatus === "approved" ? "text-green-600" : "text-red-600"
                }`}
              >
                {newStatus}
              </span>
              . Please add a message.
            </p>
          </header>

          <div className="space-y-2">
            <label htmlFor="status-message" className="text-sm font-medium text-gray-700">
              Message <span className="text-red-600">*</span>
            </label>
            <textarea
              id="status-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onBlur={() => setTouched(true)}
              placeholder="Add a note for the requester…"
              aria-invalid={touched && !isValid}
              aria-describedby="status-message-error"
              className={`min-h-[96px] w-full resize-y rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500/50 ${
                touched && !isValid
                  ? "border-red-400 focus:border-red-500 focus:ring-red-500/40"
                  : "border-gray-200 bg-white focus:border-indigo-500"
              }`}
            />
            {touched && !isValid ? (
              <p id="status-message-error" className="text-xs text-red-600">
                A message is required.
              </p>
            ) : (
              <p className="text-xs text-gray-400">This note will be visible to the requester.</p>
            )}
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={close}
              className="cursor-pointer rounded-xl border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={!isValid}
              className={`cursor-pointer rounded-lg px-3 py-2 text-sm text-white shadow transition-colors ${
                !isValid ? "cursor-not-allowed bg-gray-300" : "bg-primary hover:brightness-95"
              }`}
            >
              {isLoading ? "Loading..." : " Confirm"}
            </button>
          </div>
        </div>
      </div>
    </DialogProvider>
  );
};

export default ChangeStockRequestStatus;
