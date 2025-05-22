"use client";
const SubcribeForm = () => {
  return (
    <div className="w-full bg-primary/80 py-[20px]">
      <div className="main_container flex w-full items-center justify-between gap-[10px]">
        <div className="flex flex-col gap-[10px]">
          <span>Subscribe</span>
          <form>
            <input
              placeholder="Get Latest Offers, Discounts and more"
              className="w-[500px] border-b-[2px] border-white outline-none"
            />
            <button>Subscribe</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubcribeForm;
