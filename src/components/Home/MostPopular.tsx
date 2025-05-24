import { baseUrl } from "@/redux/api/api";
import { IProduct } from "@/types/product";
import ProductSecondaryCard from "../ui/Card/ProductCard/ProductSecondaryCard";
import Title from "../ui/Title";
const MostPopular = async () => {
  const res = await fetch(
    `${baseUrl}/product/top-ordered?limit=20&fields=name,slug,images,price,discount,colors,description`,
    {
      next: { revalidate: 60 * 5 },
    }
  );

  if (!res.ok) {
    return (
      <section className="w-full py-[16px]">
        <Title title="Collections" className="text-[14px]" />
        <div className="mt-4 flex h-[200px] items-center justify-center text-center">
          <div className="rounded-md bg-red-100 px-6 py-4 text-red-700">
            <p className="text-[14px] font-semibold">Failed to load Data</p>
            <p className="text-[13px]">Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  const data = await res.json();
  const collections: IProduct[] = data?.data || [];

  return (
    <section className="w-full py-[16px]">
      <Title title="Most Popular" className="text-[14px]" />

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {collections?.map((item) => <ProductSecondaryCard key={item._id} product={item} />)}
      </div>
    </section>
  );
};

export default MostPopular;
