import SelectionBox from "@/components/ui/SelectionBox";
import useDebounce from "@/hooks/useDebounce";
import { useGetAllCategoriesQuery } from "@/redux/category/category.api";

interface IProps {
  onSelect: (item: { label: string; value: string }) => void;
}
const CategorySelector: React.FC<IProps> = ({ onSelect }) => {
  const [searchTerm, setSearchTerm] = useDebounce("");
  const { data } = useGetAllCategoriesQuery({ mode: "all", searchTerm });
  const formatedData = data?.data.map((category) => ({
    label: category.label,
    value: category._id,
  }));

  return (
    <SelectionBox
      defaultSearch={false}
      onSeachInputChange={setSearchTerm}
      data={formatedData || []}
      onSelect={onSelect}
    />
  );
};

export default CategorySelector;
