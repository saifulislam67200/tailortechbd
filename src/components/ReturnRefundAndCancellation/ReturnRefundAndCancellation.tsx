import React from "react";
import Breadcrumb from "../ui/BreadCrumbs";
import Heading from "../ui/Heading";

const ReturnRefundCancellation = () => {
  return (
    <div className="main_container flex min-h-[100dvh] w-full flex-col gap-[20px] py-[20px]">
      <Breadcrumb />

      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2">
        {/* English Return, Refund & Cancellation */}
        <div className="bg-white">
          <Heading>Return, Refund & Cancellation</Heading>

          <div className="space-y-[16px] p-[16px]">
            <section>
              <p className="text-[12px] md:text-[15px]">
                <strong>Conditions for Return:</strong> Customers can return the product, if-
              </p>

              <div className="mt-[16px] space-y-[24px]">
                <div className="text-[12px] md:text-[15px]">
                  <p className="font-medium">
                    1: All tags and packaging must be unopened and intact.
                  </p>
                  <p className="mt-1">
                    When returning the product, customers must include any other related items that
                    were provided.
                  </p>
                  <p className="mt-1 font-medium">Timeframe:</p>
                  <p>
                    Customers must send the product to any Branch of TailorTech Limited within 7
                    days of delivery.
                  </p>
                </div>

                <div className="text-[12px] md:text-[15px]">
                  <p className="font-medium">
                    2: If the product is faulty, customers must return it with the original
                    packaging, including all accessories, care instructions, and any other related
                    items provided.
                  </p>
                  <p className="mt-1 font-medium">Timeframe:</p>
                  <p>
                    Customers must send the product to any Branch of TailorTech Limited within 14
                    days of delivery.
                  </p>
                </div>

                <p className="text-[12px] md:text-[15px]">
                  <strong className="capitalize">Default on the timeframe:</strong> If the timeframe
                  is over, we cannot offer an exchange or refund.
                </p>

                <p className="text-[12px] md:text-[15px]">
                  <strong>Special Conditions for Custom-Made Items:</strong> Custom-tailored items
                  can only be returned if there is a significant defect in workmanship or if the
                  item does not match the specifications provided. Measurement errors provided by
                  the customer are not grounds for returns.
                </p>

                <p className="text-[12px] md:text-[15px]">
                  <strong>Incompatibility:</strong> Returns are not applicable if the faultless
                  product is claimed for any incompatibility with personal style or preference after
                  purchase.
                </p>

                <div className="text-[12px] md:text-[15px]">
                  <p>
                    <strong>Initiate a Return:</strong> Customers need to obtain the Order Number
                    from the order OR contact us as below:
                  </p>

                  <div className="mt-[8px] space-y-1">
                    <p>Phone: 16 XXX</p>
                    <p>
                      Email:{" "}
                      <a
                        href="mailto:info@tailortech.com"
                        className="text-blue-600 hover:underline"
                      >
                        info@tailortech.com
                      </a>
                    </p>
                    <p>
                      Facebook Messenger:{" "}
                      <a href="https://m.me/tailortech" className="text-blue-600 hover:underline">
                        m.me/tailortech
                      </a>
                    </p>
                    <p>
                      WhatsApp:{" "}
                      <a
                        href="https://wa.me/880XXXXXXXXXX"
                        className="text-blue-600 hover:underline"
                      >
                        https://wa.me/880XXXXXXXXXX
                      </a>
                    </p>
                    <p className="mt-[8px]">
                      <a href="#" className="text-blue-600 hover:underline">
                        Click here to know all Branch locations of TailorTech Ltd.
                      </a>
                    </p>
                  </div>
                </div>

                <p className="text-[12px] md:text-[15px]">
                  <strong>Inspection:</strong> Returned products will be inspected upon receipt.
                </p>

                <p className="text-[12px] md:text-[15px]">
                  <strong>Return Or Refund:</strong> If the above return conditions are fulfilled,
                  customers will receive a new product in exchange. If it is not possible to
                  exchange the product, payment will be refunded within 7 business days from the
                  return date and the order will be treated as canceled. The refund will be credited
                  to the original payment method used during the purchase. TailorTech Limited may
                  choose other means of payment.
                </p>

                <p className="text-[12px] md:text-[15px]">
                  <strong>Cancellation:</strong> Customers can cancel orders through the website
                  until the confirmation call or SMS. Alternatively, customers can cancel orders
                  before delivery by calling 16 XXX.
                </p>

                <p className="text-[12px] md:text-[15px]">
                  <strong>Special Policy for Ready-Made Apparel:</strong> Ready-made clothing items
                  can be returned if they don&apos;t fit properly, provided they still have all
                  original tags attached and show no signs of wear, washing, or alteration.
                </p>

                <div className="text-[12px] md:text-[15px]">
                  <p>
                    <strong>Non-Returnable Items:</strong> The following items cannot be returned:
                  </p>

                  <ul className="mt-1 list-disc pl-6">
                    <li className="marker:text-primary">Undergarments and intimate wear</li>
                    <li className="marker:text-primary">
                      Sale items marked as &quot;Final Sale&quot;
                    </li>

                    <li className="marker:text-primary">
                      Custom-made items with correct measurements but personal style dissatisfaction
                    </li>
                    <li className="marker:text-primary">
                      Items that have been worn, washed, or altered
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Bengali Return, Refund & Cancellation */}
        <div className="bg-white">
          <Heading>রিটার্ন, রিফান্ড এবং ক্যান্সেলেশন</Heading>

          <div className="space-y-[16px] p-[16px]">
            <section>
              <p className="mt-[8px] text-[12px] md:text-[17px]">
                <strong>রিটার্নের শর্তাবলীঃ</strong> গ্রাহক পণ্য ফেরত দিতে পারেন, যদি-
              </p>

              <div className="mt-[16px] space-y-[24px]">
                <div className="text-[12px] md:text-[17px]">
                  <p className="font-medium">১: স্টিকার এবং মার্কিং খোলা না হয় এবং অক্ষত থাকে।</p>
                  <p className="mt-1">
                    পণ্যটি ফেরত দেওয়ার সময়, গ্রাহককে অবশ্যই অন্যান্য সম্পর্কিত আইটেমগুলি
                    অন্তর্ভুক্ত করতে হবে যা সরবরাহ করা হয়েছিল।
                  </p>
                  <p className="mt-1 font-medium">সময়সীমাঃ</p>
                  <p>
                    গ্রাহককে ডেলিভারির ৭ দিনের মধ্যে টেইলরটেক লিমিটেডের যেকোনো শাখায় পণ্য নিয়ে
                    আসতে হবে।
                  </p>
                </div>

                <div className="text-[12px] md:text-[17px]">
                  <p className="font-medium">২: ত্রুটিযুক্ত পণ্য থাকলে কোনো ক্ষতি থাকে।</p>
                  <p className="mt-1">
                    পণ্যটি ফেরত দেওয়ার সময়, গ্রাহককে মূল প্যাকেজিং, অ্যাক্সেসরিজ, ম্যানুয়াল,
                    ডকুমেন্টেশন এবং যেকোনো অন্যান্য সম্পর্কিত আইটেম সহ পণ্য প্রদান করতে হবে।
                  </p>
                  <p className="mt-1 font-medium">সময়সীমাঃ</p>
                  <p>
                    গ্রাহককে ডেলিভারির ১৪ দিনের মধ্যে টেইলরটেক লিমিটেডের যেকোনো শাখায় পণ্য নিয়ে
                    আসতে হবে।
                  </p>
                </div>

                <p className="text-[12px] md:text-[17px]">
                  <strong>সময়সীমা লঙ্ঘনঃ</strong>
                  যদি সময়সীমা পেরিয়ে যায়, তাহলে আমরা এক্সচেঞ্জ বা রিফান্ড এর আওতায় পড়বে না।
                </p>

                <div className="text-[12px] md:text-[17px]">
                  <strong>কাস্টম-মেড আইটেমের জন্য বিশেষ শর্তাবলীঃ</strong>
                  <p>
                    কাস্টম-টেইলর্ড আইটেমগুলি কেবল তখনই ফেরত দেওয়া যাবে যদি কারিগরিতে উল্লেখযোগ্য
                    ত্রুটি থাকে বা আইটেমটি প্রদত্ত স্পেসিফিকেশন মেনে না চলে। গ্রাহকের দ্বারা প্রদত্ত
                    পরিমাপের ত্রুটিগুলি রিটার্নের জন্য ভিত্তি নয়।
                  </p>
                </div>

                <p className="text-[12px] md:text-[17px]">
                  <strong>অসঙ্গতিঃ</strong>
                  পণ্যে কোনো ক্রুটি নেই, কিন্তু অন্য কোনো ডিভাইসের সাথে অসঙ্গতি দাবি করা হয়েছে, সে
                  ক্ষেত্রে রিটার্ন প্রযোজ্য নয়।
                </p>

                <div className="text-[12px] md:text-[17px]">
                  <p>
                    <strong>রিটার্ন শুরুঃ</strong>
                    গ্রাহককে অর্ডার থেকে অর্ডার নম্বর সংগ্রহ করতে হবে বা নিচের মাধ্যমে যোগাযোগ করতে
                    হবেঃ
                  </p>

                  <div className="mt-[8px] space-y-1">
                    <p>ফোনঃ ১৬ XXX</p>
                    <p>
                      ইমেইলঃ{" "}
                      <a
                        href="mailto:info@tailortech.com"
                        className="text-blue-600 hover:underline"
                      >
                        info@tailortech.com
                      </a>
                    </p>
                    <p>
                      ফেসবুক মেসেঞ্জারঃ{" "}
                      <a href="https://m.me/tailortech" className="text-blue-600 hover:underline">
                        m.me/tailortech
                      </a>
                    </p>
                    <p>
                      হোয়াটসঅ্যাপঃ{" "}
                      <a
                        href="https://wa.me/880XXXXXXXXXX"
                        className="text-blue-600 hover:underline"
                      >
                        https://wa.me/880XXXXXXXXXX
                      </a>
                    </p>
                    <p className="mt-[8px]">
                      <a href="#" className="text-blue-600 hover:underline">
                        টেইলরটেক লিমিটেডের সমস্ত শাখার অবস্থান জানতে এখানে ক্লিক করুন।
                      </a>
                    </p>
                  </div>
                </div>

                <p className="text-[12px] md:text-[17px]">
                  <strong>পরিদর্শনঃ</strong> ফেরত দেওয়া পণ্য প্রাপ্তির পরে পরিদর্শন করা হবে।
                </p>

                <p className="text-[12px] md:text-[17px]">
                  <strong>রিটার্ন বা রিফান্ডঃ</strong> উপরের রিটার্ন শর্তাবলী পূরণ হলে, গ্রাহক নতুন
                  পণ্য পাবেন। যদি নতুন পণ্য সরবরাহ করা সম্ভব না হয়, তাহলে ৭ কার্যদিবসের মধ্যে অর্থ
                  ফেরত দেওয়া হবে এবং অর্ডারটি বাতিল বলে গণ্য হবে। রিফান্ড মূল পেমেন্ট পদ্ধতিতে
                  ক্রেডিট করা হবে যা কেনাকাটার সময় ব্যবহার করা হয়েছিল। টেইলরটেক লিমিটেড অন্য
                  পেমেন্ট পদ্ধতি বেছে নিতে পারে।
                </p>

                <p className="text-[12px] md:text-[17px]">
                  <strong>ক্যান্সেলেশনঃ</strong> গ্রাহক ওয়েবসাইটের মাধ্যমে কনফার্মেশন কল অথবা
                  এসএমএস না আসা পর্যন্ত অর্ডার বাতিল করতে পারবেন। এছাড়াও, গ্রাহক ডেলিভারির আগে ১৬
                  XXX নম্বরে কল করে অর্ডার বাতিল করতে পারবেন।
                </p>

                <p className="text-[12px] md:text-[17px]">
                  <strong>রেডি-মেড পোশাকের জন্য বিশেষ নীতিঃ</strong> রেডি-মেড পোশাক আইটেমগুলি ফেরত
                  দেওয়া যেতে পারে যদি সেগুলি সঠিকভাবে ফিট না হয়, যদি সেগুলিতে সমস্ত মূল ট্যাগ
                  সংযুক্ত থাকে এবং পরিধান, ধোয়া বা পরিবর্তনের কোনও চিহ্ন না দেখায়।
                </p>

                <div className="text-[12px] md:text-[17px]">
                  <p>
                    <strong>অফেরতযোগ্য আইটেমঃ</strong> নিম্নলিখিত আইটেমগুলি ফেরত দেওয়া যাবে না:
                  </p>

                  <ul className="mt-1 list-disc pl-6">
                    <li className="marker:text-primary">আন্ডারগার্মেন্টস এবং ইন্টিমেট ওয়্যার</li>
                    <li className="marker:text-primary">
                      &quot;ফাইনাল সেল&quot; হিসাবে চিহ্নিত সেল আইটেম
                    </li>
                    <li className="marker:text-primary">
                      সঠিক পরিমাপ সহ কাস্টম-মেড আইটেম কিন্তু ব্যক্তিগত স্টাইল অসন্তুষ্টি
                    </li>
                    <li className="marker:text-primary">
                      পরিধান, ধোয়া বা পরিবর্তন করা হয়েছে এমন আইটেম
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnRefundCancellation;
