"use client";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { IColor, IProduct, ISize } from "@/types/product";
import Image from "next/image";
import { cloneElement, isValidElement, ReactElement, ReactNode, useState } from "react";
import { LuX } from "react-icons/lu";
import { useDispatch } from "react-redux";
import Button from "./Button";
import DialogProvider from "./DialogProvider";
import HorizontalLine from "./HorizontalLine";
import SelectionBox from "./SelectionBox";

interface Props {
  children?: ReactNode;
  product: Pick<IProduct, "_id" | "colors" | "images" | "name" | "price" | "discount">;
}

const ProductAddToCartModal = ({ children, product }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const [selectedColor, setSelectedColor] = useState<IColor | undefined>(
    product?.colors[0] || undefined
  );

  const [selectedSize, setSelectedSize] = useState<ISize | undefined>(
    selectedColor?.sizes[0] || undefined
  );

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleAddToCart = () => {
    const payload = {
      discount: product?.discount,
      id: product?._id,
      name: product?.name,
      price: product?.price,
      quantity: 1,
      size: selectedSize?.size || "",
      stock: selectedSize?.stock || 0,
      color: selectedColor?.color || "",
      image: product?.images?.[0],
    };
    dispatch(addToCart(payload));
    setIsOpen(false);
  };

  return (
    <>
      {children && isValidElement(children) ? (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cloneElement(children as ReactElement<any>, { onClick: handleClick })
      ) : (
        <button
          onClick={handleClick}
          className="mt-1 w-full cursor-pointer border border-[#c5c5c5] bg-primary py-[6px] text-sm font-bold text-white"
        >
          Add to Cart
        </button>
      )}

      <DialogProvider
        state={isOpen}
        setState={setIsOpen}
        className="w-[95%] max-w-[700px] md:w-full"
      >
        <div className="w-full bg-white p-[16px]">
          <div className="flex items-center justify-between">
            <h5 className="text-[20px] font-[700] text-strong">Add To Cart</h5>
            <button onClick={() => setIsOpen(false)} className="cursor-pointer">
              <LuX />
            </button>
          </div>
          <HorizontalLine className="my-[20px]" />

          <div className="flex flex-col items-center justify-start gap-[20px] md:flex-row md:items-start">
            <div className="aspect-square w-full max-w-[200px] shrink-0 md:w-[300px]">
              <Image
                src={product.images[0] || "/"}
                alt={product.name}
                width={300}
                height={300}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex w-full flex-col gap-[10px]">
              <h3 className="line-clamp-2 text-[20px] font-[700]">{product.name}</h3>
              <span className="font-bold text-primary">TK. {product.price}</span>
              <div className="flex flex-col gap-[5px]">
                <span className="font-[700]">Select color:</span>
                <div className="flex flex-wrap items-center justify-start gap-[8px]">
                  {product.colors.map((color, i) => (
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
              <Button onClick={handleAddToCart} className="mt-[20px]">
                Add To Cart
              </Button>
            </div>
          </div>
        </div>
      </DialogProvider>
    </>
  );
};

export default ProductAddToCartModal;
