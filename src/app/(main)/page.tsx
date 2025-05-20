"use client";
import Collections from "@/components/Home/Collections";
import Hero from "@/components/Home/Hero";
// import { useAppDispatch } from "@/hooks/redux";
// import { fakeProducts } from "@/mock/FakeProducts";
// import { addToCart } from "@/redux/features/cart/cartSlice";
// import { Services } from '@/components/Home/Services';
import TopCategories from "@/components/Home/TopCategories";
import Services  from '@/components/Home/Services';

export default function Home() {
  // const dispatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const handleAddCart = (product: any) => {
  //   const cartData = {
  //     id: product?._id,
  //     name: product?.name,
  //     price: product?.price,
  //     discount: product?.discount,
  //     quantity: 1,
  //     image: product?.colors?.[0]?.images?.[0] || "",
  //     color: "red",
  //     size: "XXl",
  //     stock: 5,
  //   };

  //   dispatch(addToCart(cartData));
  // };

  return (
    <main className="main_container mx-auto">
      <Hero />
      <Services />
      <TopCategories />
      <Collections />

      {/* //!for test purpose, you can remove this if Need */}

      {/* {fakeProducts?.map((product) => (
        <div key={product?.name}>
          <h1 className="mb-[10px] text-red-500">{product?.name}</h1>
          <button className="cursor-pointer" onClick={() => handleAddCart(product)}>
            addCart
          </button>
        </div>
      ))} */}
    </main>
  );
}
