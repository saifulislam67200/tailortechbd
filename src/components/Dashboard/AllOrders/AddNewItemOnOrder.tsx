import Button from "@/components/ui/Button";
import DialogProvider from "@/components/ui/DialogProvider";
import HorizontalLine from "@/components/ui/HorizontalLine";
import SelectionBox from "@/components/ui/SelectionBox";
import useDebounce from "@/hooks/useDebounce";
import { useGetAllProductsQuery } from "@/redux/features/product/product.api";
import { IOrderItem } from "@/types/order";
import { IColor, IProduct, ISize } from "@/types/product";
import { getProductDiscountPrice } from "@/utils";
import Image from "next/image";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { LuX } from "react-icons/lu";
import { RxMagnifyingGlass } from "react-icons/rx";
import { toast } from "sonner";

interface IProps {
  onAddItem: (product: IOrderItem) => void;
}

const AddNewItemOnOrder: React.FC<IProps> = ({ onAddItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | undefined>();
  const [selectedColor, setSelectedColor] = useState<IColor | undefined>();
  const [selectedSize, setSelectedSize] = useState<ISize | undefined>();

  const [searchValue, setSearchValue] = useDebounce("");
  const { data } = useGetAllProductsQuery(
    { searchTerm: searchValue, limit: 20, fields: "name,price,images,colors,slug,price,discount" },
    { skip: !isOpen }
  );

  const handleAddItem = () => {
    if (!selectedProduct) {
      toast.error("Please select a product");
      return;
    }

    if (!selectedColor) {
      toast.error("Please select a color");
      return;
    }

    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }

    const data: IOrderItem = {
      product_id: selectedProduct._id,
      product: {
        image: selectedProduct.images[0],
        name: selectedProduct.name,
        price: getProductDiscountPrice(selectedProduct.price, selectedProduct.discount),
      },
      color: selectedColor.color,
      size: selectedSize.size,
      quantity: 1,
    };
    onAddItem(data);
    setSelectedProduct(undefined);
    setSelectedColor(undefined);
    setSelectedSize(undefined);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex cursor-pointer items-center gap-[3px] rounded-[4px] bg-success/10 px-[8px] py-[4px] text-[12px] text-success"
      >
        <FaPlus /> Add Item
      </button>
      <DialogProvider
        state={isOpen && !selectedProduct}
        setState={setIsOpen}
        className="w-[95vw] md:w-[700px]"
      >
        <div className="max-h-[50vh] w-full overflow-auto bg-white p-[16px]">
          <h1 className="text-[18px] font-bold">Add New Item</h1>
          <HorizontalLine className="my-[20px]" />

          <div className="sticky top-0 flex w-[300px] items-center justify-between rounded-[5px] border-[1px] border-dashboard/20 bg-white p-[5px] outline-none">
            <input
              type="text"
              className="w-full bg-transparent outline-none"
              placeholder="Search Product"
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <RxMagnifyingGlass />
          </div>
          <div className="mt-[20px] grid grid-cols-1 gap-[16px] sm:grid-cols-2 md:grid-cols-3">
            {data?.data.map((item) => (
              <div
                key={item._id}
                onClick={() => {
                  setSelectedProduct(item);
                  setIsOpen(false);
                }}
                className="flex cursor-pointer items-center gap-[8px] rounded-[4px] border border-gray-200 p-[8px] hover:border-success"
              >
                <img
                  src={item.images[0]}
                  alt={item.name}
                  width={50}
                  height={50}
                  className="h-[50px] w-[50px] rounded-[4px] object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/images/category_blank.png";
                  }}
                />
                <div className="flex w-full flex-col gap-[4px]">
                  <p className="line-clamp-2 text-[12px] leading-[120%] font-medium">{item.name}</p>
                  {item.discount ? (
                    <span>TK.{getProductDiscountPrice(item.price, item.discount)}</span>
                  ) : (
                    <span>TK.{item.price}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogProvider>

      <DialogProvider
        setState={() => {
          setSelectedProduct(undefined);
          setSelectedColor(undefined);
          setSelectedSize(undefined);
        }}
        state={!!selectedProduct}
        className="w-[95vw] md:w-[700px]"
      >
        {selectedProduct ? (
          <div className="w-full bg-white p-[16px]">
            <div className="flex items-center justify-between">
              <h5 className="text-[20px] font-[700] text-strong">Select Item</h5>
              <button
                onClick={() => {
                  setSelectedProduct(undefined);
                  setIsOpen(true);
                }}
                className="cursor-pointer"
              >
                <LuX />
              </button>
            </div>
            <HorizontalLine className="my-[20px]" />

            <div className="flex flex-col items-center justify-start gap-[20px] md:flex-row md:items-start">
              <div className="aspect-square w-full max-w-[200px] shrink-0 md:w-[300px]">
                <Image
                  src={selectedProduct?.images[0] || "/"}
                  alt={selectedProduct.name}
                  width={300}
                  height={300}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex w-full flex-col gap-[10px]">
                <h3 className="line-clamp-2 text-[20px] font-[700]">{selectedProduct.name}</h3>
                <span className="font-bold text-primary">
                  ৳ {getProductDiscountPrice(selectedProduct.price, selectedProduct.discount || 0)}
                </span>
                <div className="flex flex-col gap-[5px]">
                  <span className="font-[700]">Select color:</span>
                  <div className="flex flex-wrap items-center justify-start gap-[8px]">
                    {selectedProduct.colors.map((color, i) => (
                      <button
                        onClick={() => setSelectedColor(color)}
                        key={color.color + i}
                        className={`cursor-pointer border-[1px] border-border-muted px-[8px] py-[4px] text-[12px] ${selectedColor?.color === color.color ? "bg-primary-foreground text-white" : ""}`}
                      >
                        {color.color}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex w-full flex-col gap-[5px]">
                  <span className="font-[700]">Select Size:</span>
                  <SelectionBox
                    showSearch={false}
                    data={
                      selectedColor?.sizes?.map((size) => {
                        return {
                          label: size.size,
                          value: size.size,
                        };
                      }) || []
                    }
                    defaultValue={
                      selectedSize
                        ? { label: selectedSize?.size, value: selectedSize?.size }
                        : undefined
                    }
                    onSelect={(item) =>
                      setSelectedSize({
                        size: item.value,
                        stock: selectedColor?.sizes.find((s) => s.size === item.value)?.stock || 0,
                      })
                    }
                  />
                </div>
                <Button onClick={handleAddItem} className="mt-[20px]">
                  Add Item
                </Button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </DialogProvider>
    </>
  );
};

export default AddNewItemOnOrder;
