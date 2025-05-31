import Button from "@/components/ui/Button";
import DialogProvider from "@/components/ui/DialogProvider";
import { useDeleteBannerByIdMutation } from "@/redux/features/banner/banner.api";
import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "sonner";

const DeleteBanner = ({ id, name }: { id: string; name: string }) => {
  const [deleteBanner, { isLoading }] = useDeleteBannerByIdMutation();
  const [isOpen, setIsOpen] = useState(false);
  const handleDelete = async () => {
    try {
      await deleteBanner(id).unwrap();
      toast.success("Banner delete successfully");
      setIsOpen(false);
    } catch (err) {
      console.error("Failed to delete banner:", err);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="cursor-pointer rounded-full border border-red-200 bg-red-50/50 p-2 text-red-600 transition-colors hover:bg-red-50 hover:text-red-900"
        title="Delete banner"
      >
        <FiTrash2 className="h-4 w-4" />
      </button>

      <DialogProvider setState={setIsOpen} state={isOpen}>
        <div className="relative w-full max-w-md transform overflow-hidden rounded-lg bg-white px-6 py-4 shadow-xl transition-all">
          {/* Header */}
          <div className="">
            <div className="flex items-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-danger/10">
                <svg
                  className="h-6 w-6 text-danger"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-primary">Delete Banner</h3>
              <div className="mt-2">
                <p className="text-sm text-muted">
                  Are you sure you want to delete{" "}
                  <span className="bg-danger/10 p-[2px] font-medium text-danger">
                    &quot;{name}&quot;
                  </span>{" "}
                  this banner? This action cannot be undone.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-[20px] flex w-full items-center justify-between gap-[10px]">
            <Button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full cursor-pointer bg-primary/5 text-primary"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              disabled={isLoading}
              type="button"
              className="w-full bg-danger hover:bg-danger/90 disabled:bg-danger/50"
            >
              {isLoading ? "Deleting..." : "Delete Banner"}
            </Button>
          </div>
        </div>
      </DialogProvider>
    </>
  );
};

export default DeleteBanner;
