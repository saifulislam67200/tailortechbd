"use client";
import ProductDetailsSlider from "@/components/productDetails/ProductDetailSlider";
import RestockRequestModal from "@/components/productDetails/RestockRequestModal";
import DialogProvider from "@/components/ui/DialogProvider";
import HorizontalLine from "@/components/ui/HorizontalLine";
import { useAppDispatch } from "@/hooks/redux";
import { addItemsOnCheckout } from "@/redux/features/checkout/checkout.slice";
import { IColor, IProduct, ISize } from "@/types/product";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { IoBagCheckOutline } from "react-icons/io5";
import { LuX } from "react-icons/lu";
import { toast } from "sonner";

interface Props {
  product: IProduct;
  quantity?: number;
  onQuantityChange?: (q: number) => void;
  btnStyle?: string;
  children?: React.ReactNode;
}

const ProductCheckoutModal = ({
  product,
  quantity,
  onQuantityChange,
  btnStyle,
  children,
}: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  /** Dialog open/close */
  const [isOpen, setIsOpen] = useState(false);

  /** Active color/size selection (default to first color/size if available) */
  const [activeColor, setActiveColor] = useState<IColor | undefined>(
    product?.colors?.[0]
  );
  const [activeSize, setActiveSize] = useState<ISize | undefined>(
    product?.colors?.[0]?.sizes?.[0]
  );
  const [selectedColor, setSelectedColor] = useState<IColor | undefined>();

  /** ---------------- Quantity: controlled + uncontrolled ----------------
   * Rules:
   * - If both `quantity` and `onQuantityChange` provided → controlled
   * - If neither provided → uncontrolled (use internal state)
   * - If only `quantity` provided → treat as initial value for internal state
   * - If only `onQuantityChange` provided → uncontrolled but still notify parent
   */
  const [internalQty, setInternalQty] = useState<number>(quantity ?? 1);
  const isControlled =
    quantity !== undefined && typeof onQuantityChange === "function";
  const qty = isControlled ? (quantity as number) : internalQty;

  /** Helper to set quantity safely from anywhere */
  const setQty = (next: number) => {
    if (next < 1) next = 1;

    if (isControlled) {
      // Parent owns the state
      onQuantityChange!(next);
    } else {
      // Component owns the state
      setInternalQty(next);
      // Notify parent if a callback exists (even though not controlled)
      if (onQuantityChange) onQuantityChange(next);
    }
  };

  /** If `quantity` prop changes while not fully controlled, sync it into local state */
  useEffect(() => {
    if (!isControlled && quantity !== undefined) {
      setInternalQty(quantity);
    }
  }, [quantity, isControlled]);

  /** Clamp quantity when size changes (respect stock) */
  useEffect(() => {
    const stock = activeSize?.stock ?? 0;
    if (!stock) return;
    if (qty > stock) setQty(stock);
    if (qty < 1) setQty(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSize?._id]);

  /** Price helpers */
  const effectivePrice = useMemo(() => {
    const base = product?.price ?? 0;
    const disc = product?.discount ?? 0;
    return Math.round(base - base * (disc / 100));
  }, [product?.price, product?.discount]);

  const regularPrice = useMemo(() => Math.round(product?.price ?? 0), [product?.price]);

  /** Get image for currently selected color variant (fallback to product image) */
  const getColorVariantImage = (color: IColor): string =>
    color?.images?.[0] || product?.images?.[0] || "";

  /** Color/size handlers */
  const handleColorChange = (color: IColor) => {
    setActiveColor(color);
    setSelectedColor(color);
    setActiveSize(color.sizes?.[0]);
  };
  const handleSizeChange = (size: ISize) => setActiveSize(size);

  /** Quantity +/- handlers (stock-aware) */
  const handleQuantityChange = (type: "inc" | "dec") => {
    const stock = activeSize?.stock ?? 0;
    if (!stock) return;

    if (type === "inc") {
      if (qty < stock) {
        setQty(qty + 1);
      } else {
        toast.error("You have reached the maximum stock available.", {
          id: "productStockToastId",
        });
      }
      return;
    }

    if (type === "dec" && qty > 1) {
      setQty(qty - 1);
    }
  };

  /** Checkout action */
  const handleCheckoutClick = () => {
    if (!activeColor || !activeSize) {
      return toast.error("Please select a color and size.", {
        id: "productSelectionToastId",
      });
    }

    dispatch(
      addItemsOnCheckout([
        {
          color: activeColor.color || "",
          product_id: product?._id || "",
          quantity: qty, // use the resolved quantity
          size: activeSize.size || "",
          product: {
            name: product?.name || "",
            price: product?.price || 0,
            image: getColorVariantImage(activeColor),
          },
        },
      ])
    );

    setIsOpen(false);
    router.push("/checkout");
  };

  /** Open modal */
  const handleOpenModal = () => setIsOpen(true);

  return (
    <>
      {children ? (
        <button onClick={handleOpenModal}>{children}</button>
      ) : (
        <button
          onClick={handleOpenModal}
          className={`checkoutBtn center mt-1 w-full cursor-pointer gap-[3px] border border-[#c5c5c5] py-[6px] text-sm font-bold ${btnStyle}`}
        >
          Buy Now <IoBagCheckOutline />
        </button>
      )}

      <DialogProvider
        state={isOpen}
        setState={setIsOpen}
        className="w-[95%] max-w-[800px] md:w-full"
      >
        <div className="w-full bg-white p-[16px]">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h5 className="text-[20px] font-[700] text-strong">Checkout</h5>
            <button onClick={() => setIsOpen(false)} className="cursor-pointer">
              <LuX />
            </button>
          </div>
          <HorizontalLine className="my-[20px]" />

          <div className="flex flex-col items-center justify-start gap-[20px] md:flex-row md:items-start">
            {/* Left: Gallery */}
            <div className="relative aspect-square w-full max-w-[200px] shrink-0 md:max-w-[380px]">
              {activeColor && activeSize && activeSize.stock === 0 && (
                <span className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 text-lg font-semibold text-white">
                  Out of Stock
                </span>
              )}

              <ProductDetailsSlider
                product={product}
                setSelectedColor={setSelectedColor}
                selectedColor={selectedColor}
              />
            </div>

            {/* Right: Details */}
            <div className="flex w-full flex-col gap-[10px]">
              <h3 className="line-clamp-2 text-[20px] font-[700]">{product?.name}</h3>

              {/* Price block */}
              <span className="h-[55px] w-[150px] bg-quaternary/30 px-[8px] py-[5px] font-bold text-primary">
                <span className="block text-[12px] font-normal text-primary-foreground">
                  {product?.discount ? "Special Price" : "Price"}
                </span>
                ৳ {effectivePrice}
              </span>

              {product?.discount ? (
                <span className="px-[8px]">
                  <span className="block text-[12px] font-normal text-primary-foreground">
                    Regular Price
                  </span>
                  ৳ {regularPrice}
                </span>
              ) : null}

              {/* Colors */}
              <div>
                <h1 className="text-[16px]">Colors:</h1>
                <div className="mt-[5px] flex items-center gap-[10px]">
                  {product?.colors?.map((color) => (
                    <button
                      key={color._id}
                      type="button"
                      aria-label={`Select color ${color.color}`}
                      className={`flex h-[20px] w-fit cursor-pointer items-center rounded-full border-[1px] border-primary px-[8px] text-[12px] transition-all duration-200 ${
                        activeColor?.color === color.color
                          ? "bg-primary text-white"
                          : "bg-white text-primary"
                      }`}
                      onClick={() => handleColorChange(color)}
                    >
                      {color.color}
                    </button>
                  ))}
                </div>

                {/* Sizes */}
                <h1 className="mt-[10px] text-[16px]">Sizes:</h1>
                <div className="mt-[5px] flex items-center gap-[10px]">
                  {activeColor?.sizes?.map((size) => (
                    <button
                      key={size._id}
                      type="button"
                      aria-label={`Select size ${size.size}`}
                      className={`h-[30px] w-fit cursor-pointer px-[8px] text-[12px] font-medium transition-all duration-200 ${
                        activeSize?.size === size.size
                          ? "bg-primary text-white shadow-none"
                          : "bg-white text-black shadow"
                      } border border-gray-200 hover:bg-primary hover:text-white`}
                      onClick={() => handleSizeChange(size)}
                    >
                      {size.size}
                    </button>
                  ))}
                </div>

                {/* Quantity */}
                <h1 className="mt-[10px] text-[16px]">Quantity:</h1>
                <div className="mt-[15px] flex h-[30px] w-[80px] items-center border border-quaternary px-[7px]">
                  <button
                    disabled={qty <= 1}
                    onClick={() => handleQuantityChange("dec")}
                    className={`cursor-pointer text-info ${
                      qty <= 1 ? "cursor-event-none" : ""
                    }`}
                    aria-label="Decrease quantity"
                  >
                    {qty > 1 ? (
                      <AiOutlineMinus size={14} />
                    ) : (
                      <AiOutlineMinus size={14} className="text-gray-300" />
                    )}
                  </button>

                  <p className="w-full text-center text-[14px]">{qty}</p>

                  <button
                    disabled={
                      activeSize?.stock === 0 ||
                      (activeSize?.stock ?? 0) === qty
                    }
                    onClick={() => handleQuantityChange("inc")}
                    className="cursor-pointer text-info disabled:cursor-not-allowed disabled:opacity-[0.5]"
                    aria-label="Increase quantity"
                  >
                    <AiOutlinePlus size={14} />
                  </button>
                </div>
              </div>

              {/* Stock & Checkout */}
              {activeSize && activeSize.stock === 0 && (
                <p className="mt-[10px] mb-[5px] text-[15px] font-[600] text-danger">
                  Sorry this size is currently out of stock
                </p>
              )}

              {activeSize && !activeSize.stock ? (
                <RestockRequestModal
                  color={activeColor?.color ?? ""}
                  size={activeSize.size}
                  productId={product?._id}
                />
              ) : (
                <button
                  onClick={handleCheckoutClick}
                  disabled={!activeColor || !activeSize || activeSize.stock === 0}
                  className="mt-[10px] h-[40px] w-full bg-primary text-white disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                  Proceed to Checkout
                </button>
              )}
            </div>
          </div>
        </div>
      </DialogProvider>
    </>
  );
};

export default ProductCheckoutModal;
