import SelectionBox from "@/components/ui/SelectionBox";
import useDebounce from "@/hooks/useDebounce";
import { useGetAllCategoriesQuery } from "@/redux/features/category/category.api";
import { ICategory } from "@/types/category";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

type TOnSelect = (item: { label: string; value: string }) => void;
interface IProps {
  onSelect: TOnSelect;
  category?: string;
  className?: string;
  showTitle?: boolean;
  selectionBoxClassName?: string;
}

const SubCategorySelector = ({
  parentId,
  parentLabel,
  onSelect,
  showTitle = true,
  selectionBoxClassName,
}: {
  parentId: string;
  parentLabel?: string;
  onSelect: TOnSelect;
  showTitle?: boolean;
  selectionBoxClassName?: string;
}) => {
  const [searchTerm, setSearchTerm] = useDebounce("");
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);
  const { data } = useGetAllCategoriesQuery({ mode: "normal", searchTerm, parent: parentId });
  const formatedData = data?.data.map((category) => ({
    label: category.label,
    value: category._id,
  }));

  return (
    <div className="flex flex-col gap-[8px]">
      <span className="text-[14px] font-[500]">
        {showTitle
          ? parentLabel
            ? "Sub Category of " + parentLabel + " (optional)"
            : "Sub Category (optional)"
          : ""}
      </span>
      <SelectionBox
        className={selectionBoxClassName}
        defaultSearch={false}
        onSeachInputChange={setSearchTerm}
        data={formatedData || []}
        onSelect={(item) => {
          const category = data?.data.find((category) => category._id === item.value);
          onSelect(item);
          setSearchTerm("");
          if (category) {
            setSelectedCategory(category);
          }
        }}
      />
      {selectedCategory?.subCount ? (
        <SubCategorySelector
          parentLabel={selectedCategory.label}
          parentId={selectedCategory._id}
          onSelect={onSelect}
        />
      ) : null}
    </div>
  );
};

const CategorySelector: React.FC<IProps> = ({
  onSelect,
  category,
  className,
  selectionBoxClassName,
  showTitle = true,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);
  const [searchTerm, setSearchTerm] = useDebounce("");
  const { data } = useGetAllCategoriesQuery({
    mode: "normal",
    searchTerm,
  });
  const formatedData = data?.data.map((category) => ({
    label: category.label,
    value: category._id,
  }));

  return (
    <div className={twMerge("flex flex-col gap-[10px]", className)}>
      <SelectionBox
        defaultSearch={false}
        onSeachInputChange={setSearchTerm}
        className={selectionBoxClassName}
        displayValue={selectedCategory?.label || category}
        data={formatedData || []}
        onSelect={(item) => {
          const category = data?.data.find((category) => category._id === item.value);
          onSelect(item);
          setSearchTerm("");

          if (category) {
            setSelectedCategory(category);
          }
        }}
      />

      {selectedCategory?.subCount ? (
        <SubCategorySelector
          showTitle={showTitle}
          parentLabel={selectedCategory.label}
          parentId={selectedCategory._id}
          onSelect={onSelect}
        />
      ) : null}
    </div>
  );
};

export default CategorySelector;
