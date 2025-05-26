import SelectionBox from "@/components/ui/SelectionBox";
import useDebounce from "@/hooks/useDebounce";
import { useGetAllCategoriesQuery } from "@/redux/features/category/category.api";
import { ICategory } from "@/types/category";
import { useState } from "react";

interface IProps {
  onSelect: (item: { label: string; value: string }) => void;
  categoryId?: string;
}

const SubCategorySelector = ({
  parentId,
  parentLabel,
  onSelect,
}: IProps & { parentId: string; parentLabel?: string }) => {
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
        {parentLabel ? "Sub Category of " + parentLabel + " (optional)" : "Sub Category (optional)"}
      </span>
      <SelectionBox
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

const CategorySelector: React.FC<IProps> = ({ onSelect, categoryId }) => {
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);
  const [searchTerm, setSearchTerm] = useDebounce("");
  const { data } = useGetAllCategoriesQuery({ mode: "normal", searchTerm, _id: categoryId||undefined });
  const formatedData = data?.data.map((category) => ({
    label: category.label,
    value: category._id,
  }));

  return (
    <div className="flex flex-col gap-[10px]">
      <SelectionBox
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

export default CategorySelector;
