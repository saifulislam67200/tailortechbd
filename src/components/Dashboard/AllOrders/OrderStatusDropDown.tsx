import SelectionBox from "@/components/ui/SelectionBox";

const status = [
  {
    label: "All",
    value: "",
  },
  {
    label: "Pending",
    value: "pending",
  },
  {
    label: "On Delivery",
    value: "on-delivery",
  },
  {
    label: "Delivered",
    value: "delivered",
  },
  {
    label: "Cancelled",
    value: "cancelled",
  },
];

interface IProps {
  onSelect: (item: { label: string; value: string }) => void;
}

const OrderStatusDropDown: React.FC<IProps> = ({ onSelect }) => {
  return (
    <div className="flex w-[200px] flex-col gap-[5px]">
      <span className="text-[12px] font-[700] text-primary">Status</span>
      <SelectionBox
        data={status}
        onSelect={(item) => onSelect?.(item)}
        defaultValue={status[0]}
        showSearch={false}
      />
    </div>
  );
};

export default OrderStatusDropDown;
