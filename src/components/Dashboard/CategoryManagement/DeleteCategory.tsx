import Button from "@/components/ui/Button";
import DialogProvider from "@/components/ui/DialogProvider";
import { useDeleteCategoryByIdMutation } from "@/redux/features/category/category.api";
import { IQueruMutationErrorResponse } from "@/types";
import { ICategory } from "@/types/category";
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { FiAlertTriangle } from "react-icons/fi";
import { toast } from "sonner";

interface IProps {
  category: ICategory;
  parentCategory?: ICategory;
  onDelete?: (id: string) => void;
}
const DeleteCategory: React.FC<IProps> = ({ category, parentCategory, onDelete }) => {
  const [open, setOpen] = useState(false);
  const [deleteCategory, { isLoading }] = useDeleteCategoryByIdMutation();

  const [inputValue, setInputValue] = useState("");

  const handleDelete = async () => {
    if (isLoading) return;
    const res = await deleteCategory(category._id);
    const error = res.error as IQueruMutationErrorResponse;
    if (error) {
      if (error.data?.message) {
        toast.error(error.data?.message);
      } else {
        toast.error("Something went wrong");
      }
      return;
    }
    toast.success("Category deleted successfully");
    onDelete?.(category._id);
    setOpen(false);
  };
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded text-danger transition-colors hover:bg-danger/10"
        title="Delete category"
      >
        <FaRegTrashAlt className="text-danger" />
      </button>{" "}
      <DialogProvider state={open} setState={setOpen}>
        <div className="relative w-full max-w-md transform rounded-lg bg-white shadow-xl transition-all">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                <FiAlertTriangle className="h-5 w-5 text-danger" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary">Delete Category</h3>
                <p className="text-sm text-muted">This action cannot be undone.</p>
              </div>
            </div>
            <button
              className="cursor-pointer text-primary transition-colors hover:text-primary/90"
              onClick={() => setOpen(false)}
            >
              <FaX className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="space-y-4 p-6">
            {/* Warning Message */}
            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
              <p className="text-sm text-danger">
                You are about to delete the category{" "}
                <span className="font-semibold">&quot;{category.label}&quot; </span>
                {parentCategory ? (
                  <>
                    under the category{" "}
                    <span className="font-semibold">&quot;{parentCategory.label}&quot;</span>
                  </>
                ) : (
                  ""
                )}
                . This will permanently remove the category and all its subcategories. An all the
                efected products will be marked as without category. Product&apos;s wont be deleted.
              </p>
            </div>

            {/* Confirmation Input */}
            <div className="space-y-2">
              <label htmlFor="confirm-input" className="block text-sm font-medium text-gray-700">
                To confirm, type{" "}
                <span className="rounded bg-red-50 px-1 font-mono text-danger">
                  {category.label}
                </span>{" "}
                in the box below:
              </label>
              <input
                id="confirm-input"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={`${category.label}`}
                className="w-full rounded-md border border-border-muted px-3 py-2 placeholder-gray-400 shadow-sm transition-colors focus:border-danger focus:ring-2 focus:ring-danger/10 focus:outline-none"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-3 rounded-b-lg border-t border-border-muted bg-primary/5 p-6">
            <button
              onClick={() => setOpen(false)}
              className="flex-1 cursor-pointer rounded-md border border-border-muted bg-white px-4 py-2 text-sm font-medium text-primary shadow-sm transition-colors hover:bg-primary/10"
            >
              Cancel
            </button>
            <Button
              disabled={inputValue !== category.label}
              onClick={handleDelete}
              isLoading={isLoading}
              className="flex-1 cursor-pointer rounded-md border border-transparent bg-danger/90 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-danger disabled:cursor-not-allowed disabled:opacity-50"
            >
              Delete Category
            </Button>
          </div>
        </div>
      </DialogProvider>
    </>
  );
};

export default DeleteCategory;
