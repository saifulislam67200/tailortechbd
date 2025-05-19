"use client";
import Hero from "@/components/Home/Hero";
import { useAppDispatch } from "@/hooks/redux";
import { fakeProducts } from "@/mock/FakeProducts";
import { addToCart } from "@/redux/features/cart/cartSlice";

export default function Home() {
  const dispatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAddCart = (product: any) => {
    const cartData = {
      id: product?._id,
      name: product?.name,
      price: product?.price,
      discount: product?.discount,
      quantity: 1,
      image: product?.colors?.[0]?.images?.[0] || "", // Fallback to a default image if not available
    };

    dispatch(addToCart(cartData));

  }

  return (
    <main className="main_container mx-auto">
      <Hero />




      {/* //!for test purpose, you can remove this if Need */}

      {
        fakeProducts?.map((product) => <div key={product?.name}>

          <h1 className="text-red-500 mb-[10px]">{product?.name}</h1>
          <button className="cursor-pointer" onClick={() => handleAddCart(product)}>addCart</button>
        </div>)
      }

    </main>
  );
}
