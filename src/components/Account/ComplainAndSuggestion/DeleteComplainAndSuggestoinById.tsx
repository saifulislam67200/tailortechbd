"use client";

import DialogProvider from "@/components/ui/DialogProvider";
import { useDeleteComplaintSuggestionByIdMutation } from "@/redux/features/order/order.api";
import { IQueruMutationErrorResponse } from "@/types";
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

type Props = {
  id: string;
  onDeleted?: () => void; // optional callback after successful delete
};

const DeleteComplainAndSuggestionById = ({ id, onDeleted }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const [deleteComplain, { isLoading }] = useDeleteComplaintSuggestionByIdMutation();

  const handleOpen = () => {
    setApiError(null);
    setIsOpen(true);
  };

  const handleCancel = () => {
    if (!isLoading) setIsOpen(false);
  };

  const handleConfirm = async () => {
    setApiError(null);
    const res = await deleteComplain(id);
    const error = res.error as IQueruMutationErrorResponse;

    if (error) {
      if (error.data?.message) {
        setApiError(error.data?.message);
      } else {
        setApiError("Something went wrong");
      }
      return;
    }
    setIsOpen(false);
    onDeleted?.();
  };

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className="center inline-flex aspect-square w-[35px] cursor-pointer items-center rounded-full border border-red-300 text-sm font-medium text-red-700 hover:bg-red-50"
      >
        <FaRegTrashAlt />
      </button>

      <DialogProvider state={isOpen} setState={setIsOpen} className="w-full max-w-[500px]">
        <div className="w-full rounded-[8px] bg-white p-4 shadow">
          <h3 className="text-lg font-semibold text-gray-900">Delete this complain/suggestion?</h3>
          <p className="mt-2 text-sm text-gray-600">
            This action cannot be undone. Are you sure you want to permanently delete this item?
          </p>

          {apiError ? (
            <div className="mt-3 rounded-md bg-red-50 p-2 text-sm text-red-700">{apiError}</div>
          ) : null}

          <div className="mt-4 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isLoading}
              className="cursor-pointer rounded-md border border-gray-200 px-3 py-1.5 text-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={isLoading}
              className="cursor-pointer rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </DialogProvider>
    </>
  );
};

export default DeleteComplainAndSuggestionById;
