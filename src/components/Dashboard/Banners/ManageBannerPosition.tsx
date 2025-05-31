"use client";
import Button from "@/components/ui/Button";
import {
  useGetAllBannersQuery,
  useUpdateBannerSequencesMutation,
} from "@/redux/features/banner/banner.api";
import { IQueruMutationErrorResponse } from "@/types";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import { FiArrowLeft, FiMove, FiSave } from "react-icons/fi";
import { toast } from "sonner";
import SortableBanner from "./SortableBanner";
import { IBanner } from "@/types/banner";

type ManageBannerPositionProps = {
  setIsViewBannerPosition: React.Dispatch<React.SetStateAction<boolean>>;
};

const ManageBannerPosition = ({ setIsViewBannerPosition }: ManageBannerPositionProps) => {
  const { data } = useGetAllBannersQuery({active: true});
  const [banners, setBanners] = useState<IBanner[]>([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [updateBannerSequences, { isLoading }] = useUpdateBannerSequencesMutation();
  console.log(banners);

  // Initialize banners from API data
  useEffect(() => {
    if (data?.data) {
      setBanners([...data.data].sort((a, b) => a.index - b.index));
    }
  }, [data]);

  // Better drag sensitivity
  const sensors = useSensors(useSensor(TouchSensor), useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setBanners((items) => {
      const oldIndex = items.findIndex((b) => b._id === active.id);
      const newIndex = items.findIndex((b) => b._id === over.id);
      const newBanners = arrayMove(items, oldIndex, newIndex);

      // Update indexes to match new order
      return newBanners.map((banner, index) => ({
        ...banner,
        index,
      }));
    });
    setHasChanges(true);
  };

  const saveBannerSequences = async () => {
    const res = await updateBannerSequences({
      payload: banners.map((banner) => ({
        _id: banner._id,
        index: banner.index,
      })),
    });
    console.log(res);

    const error = res.error as IQueruMutationErrorResponse;
    if (error) {
      return toast("Something went wrong");
    }
    toast.success("Banner sequences updated successfully");
  };

  return (
    <div className="overflow-hidden rounded-lg border border-border-main bg-white">
      {/* Header */}
      <div className="border-b border-border-main bg-white px-[24px] py-[16px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[16px]">
            <div className="center mb-[20px] gap-[8px]">
              <button
                onClick={() => setIsViewBannerPosition(false)}
                className="flex h-7 w-7 cursor-pointer items-center justify-center gap-2 rounded-full border border-slate-200 bg-white text-black shadow-md hover:bg-primary/90 hover:text-white"
              >
                <FiArrowLeft className="h-[20px] w-[20px]" />
              </button>
              <span className="text-[14px] font-medium">Back to Banner Management</span>
            </div>
          </div>
          <Button
            onClick={saveBannerSequences}
            disabled={!hasChanges || isLoading}
            className={`flex items-center gap-[8px] px-[16px] py-[8px] text-white transition-colors ${
              hasChanges ? "hover:bg-primary/90" : "cursor-not-allowed opacity-50"
            }`}
          >
            <FiSave className="h-4 w-4" />
            Save Changes
          </Button>
        </div>

        <div className="mt-4">
          <h1 className="text-[18px] font-bold md:text-[22px]">Manage Banner Positions</h1>
          <p className="mt-1 text-info">
            Drag and drop banners to reorder them. The first banner will be displayed at the top of
            your website.
          </p>
        </div>
      </div>

      {/* Instructions */}
      <div className="border-b border-blue-100 bg-blue-50 px-[24px] py-[16px]">
        <div className="flex items-start gap-[12px]">
          <div className="rounded-lg bg-blue-100 p-[8px]">
            <FiMove className="h-[20px] w-[20px] text-primary" />
          </div>
          <div>
            <h3 className="mb-1 text-[14px] font-semibold text-primary">How to reorder banners</h3>
            <p className="text-[14px] text-primary">
              Click and drag the grip handle (⋮⋮) on the left side of each banner card to reorder
              them. Your changes will be saved automatically.
            </p>
          </div>
        </div>
      </div>

      {/* Banner Cards Container */}
      <div className="p-[24px]">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}

          // modifiers={[restrictToVerticalAxis]}
        >
          <SortableContext
            // items={banners as unknown as UniqueIdentifier[]}
            strategy={verticalListSortingStrategy}
            items={banners.map((b) => b._id)}
          >
            {banners.map((banner, index) => (
              <SortableBanner key={banner._id} banner={banner} index={index} />
            ))}
          </SortableContext>
        </DndContext>

        {/* Empty State */}
        {banners.length === 0 && (
          <div className="py-16 text-center">
            <div className="mx-auto mb-[24px] flex h-[96px] w-[96px] items-center justify-center rounded-full bg-gray-100">
              <FiMove className="h-[48px] w-[48px] text-info" />
            </div>
            <h3 className="mb-2 text-[20px] font-semibold">No banners to manage</h3>
            <p className="mx-auto mb-[24px] max-w-sm text-info">
              Create some banners first to manage their positions and display order.
            </p>
            <button className="rounded-lg bg-primary px-6 py-3 text-white transition-colors hover:bg-primary/90">
              Create Your First Banner
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-border-main bg-gray-50 px-[24px] py-[16px]">
        <div className="flex items-center justify-between">
          <div className="text-[14px] text-info">
            Total banners: <span className="font-semibold">{banners.length}</span>
          </div>
          <div className="text-[14px] text-info">
            {hasChanges ? "Changes pending save" : "Changes are saved automatically"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageBannerPosition;
