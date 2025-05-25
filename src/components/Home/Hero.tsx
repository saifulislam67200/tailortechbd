import { baseUrl } from "@/redux/api/api";
import Banner from "./Banner";
import { IBanner } from "@/types/banner";

const Hero = async () => {
  const res = await fetch(`${baseUrl}/banner?active=true`, {
    next: { revalidate: 600 },
  });

  if (!res.ok) {
    return (
      <section className="w-full py-[16px]">
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
  const banners: IBanner[] = data?.data || [];
  // console.log(banners);
  return (
    <div className="mt-[16px]">
      <div className="flex flex-col gap-[8px] lg:flex-row">
        <Banner banners={banners} />
      </div>
    </div>
  );
};

export default Hero;