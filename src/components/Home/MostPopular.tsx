import { baseUrl } from "@/redux/api/api";
import { IProduct } from "@/types/product";
import ProductPrimaryCard from "../ui/Card/ProductCard/ProductPrimaryCard";
import Title from "../ui/Title";
const MostPopular = async ({ title }: { title?: string }) => {
  const res = await fetch(
    `${baseUrl}/product/top-ordered?limit=20&fields=name,slug,images,price,discount,colors,description,video,videoThumbnail,sku`,
    {
      next: { revalidate: 60 * 5 },
    }
  );

  if (!res.ok) {
    return (
      <section className="w-full py-[16px]">
        <Title title="Collections" className="text-[14px]" />
        <div className="mt-4 flex h-[200px] items-center justify-center text-center">
          <div className="rounded-md bg-red-100 px-6 py-4 text-danger">
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
      <Title title={title || "Most Popular"} />

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {collections?.map((item) => <ProductPrimaryCard key={item._id} product={item} />)}
      </div>
    </section>
  );
};

export default MostPopular;
