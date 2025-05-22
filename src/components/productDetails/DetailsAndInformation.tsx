"use client";
import CustomerReview from "./CustomerReview";
import QuestionAnswer from "./QuestionAnswer";

const DetailsAndInformation = ({ ...product }) => {
  return (
    <section className="mt-[15px] flex flex-col gap-[13px] md:flex-row">
      <div className="w-full">
        <div className="flex items-center">
          {["Details", "Q&A", "Reviews"]?.map((item, index) => (
            <button
              key={index}
              className={`flex h-[35px] cursor-pointer items-center justify-center border border-quaternary px-[20px] text-[16px] font-bold ${item == "Details" ? "bg-black text-white" : ""} `}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="border border-quaternary bg-white p-[20px] text-black">
          <p dangerouslySetInnerHTML={{ __html: product?.description }}></p>
        </div>

        <QuestionAnswer productId={product?._id} />
        <CustomerReview productId={product?._id} />
      </div>

      <div className="w-full bg-white p-[10px] sm:p-[20px] md:max-w-[432px]">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum accusamus molestias
        accusantium porro eligendi voluptatibus explicabo. Asperiores dignissimos odio corrupti
        dolor porro magni? Tempore beatae, debitis rerum cupiditate saepe corrupti.
      </div>
    </section>
  );
};

export default DetailsAndInformation;
