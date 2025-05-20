"use client";
const paymentOptions = [
  {
    label: "Cash on Delivery",
    value: "cod",
  },
];

const CheckoutPaymentOptions = () => {
  return (
    <div className="flex w-full flex-col gap-[16px] bg-white py-[8px]">
      <div className="w-full px-[5px]">
        <div className="w-full bg-tertiary px-[16px] py-[8px]">
          <span className="text-[16px] font-[700]">2. Payment</span>
        </div>
      </div>
      <div className="flex flex-col gap-[8px] px-[16px]">
        {paymentOptions.map((paymentOption) => (
          <div key={paymentOption.value} className="flex items-center gap-[8px]">
            <input
              type="radio"
              name="payment"
              id={paymentOption.value}
              defaultChecked
              className="cursor-pointer"
            />
            <label htmlFor={paymentOption.value} className="cursor-pointer text-[16px]">
              {paymentOption.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckoutPaymentOptions;
