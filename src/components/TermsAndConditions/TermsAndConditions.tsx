import React from "react";
import Breadcrumb from "../ui/BreadCrumbs";
import Heading from "../ui/Heading";

const TermsAndConditions = () => {
  return (
    <div className="main_container flex min-h-[100dvh] w-full flex-col gap-[20px] py-[20px]">
      <Breadcrumb />

      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2">
        {/* English Terms and Conditions */}
        <div className="bg-white">
          <Heading>Terms & Conditions</Heading>

          <div className="space-y-[16px] p-[16px]">
            <section>
              <h3 className="text-[15px] font-semibold text-[#434343] md:text-[18px]">
                General
              </h3>

              <div className="mt-[12px] space-y-[12px]">
                <p className="text-[12px] md:text-[15px]">
                  {`The present Terms and Conditions of Sale ("Terms and Conditions") apply to all products sold to you (the "Customer") on the website tailortechbd.com (the "Site"), operated by "Tailortech Limited".`}
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-[15px] font-semibold text-[#434343] md:text-[18px]">
                Accuracy of Information on the Site
              </h3>

              <div className="mt-[12px] space-y-[12px]">
                <p className="text-[12px] md:text-[15px]">
                  We do our best to ensure that information on the site is complete, accurate, and current. Despite our efforts, however, information on the site may occasionally be inaccurate, incomplete or out of date. All specifications, product descriptions and prices of products on the site are subject to change at any time without notice.
                </p>

                <p className="text-[12px] md:text-[15px]">
                  We make all reasonable efforts to accurately display the attributes of our products including applicable color. However, the actual color you see on the site can be little bit different due to lighting when the picture of products took and it also depends on your computer system or mobile device and we cannot guarantee that your computer and mobile device will accurately display such colors.
                </p>

                <p className="text-[12px] md:text-[15px]">
                  The inclusion of any products on the site at a particular time does not imply or warrant that these products will be available at any time. We reserve the right to discontinue any product at any time.
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-[15px] font-semibold text-[#434343] md:text-[18px]">
                Delivery Time:
              </h3>

              <div className="mt-[12px] space-y-[12px]">
                <p className="text-[12px] font-medium md:text-[15px]">
                  Inside Dhaka
                </p>
                <p className="text-[12px] md:text-[15px]">
                  Product is expected to be delivered within 2-3 days. It may take longer due to unavoidable circumstances. Delivery charge is 70 TK
                </p>

                <p className="text-[12px] font-medium md:text-[15px]">
                  Outside Dhaka
                </p>
                <p className="text-[12px] md:text-[15px]">
                  Product is expected to be delivered within 2-4 days. It may take longer due to unavoidable circumstances. Delivery charge is 120 TK
                </p>

                <p className="text-[12px] md:text-[15px]">
                  <strong>NB:</strong> We do same day express delivery in case of urgency in Dhaka. The express delivery charge is 150 TK.
                </p>
              </div>
            </section>
          </div>
        </div>

        {/* Bengali Terms and Conditions */}
        <div className="bg-white">
          <Heading>বিধি ও শর্তাবলী</Heading>
          <div className="space-y-[16px] p-[16px]">
            <section>
              <h3 className="text-[15px] font-semibold text-[#434343] md:text-[18px]">
                সাধারণ
              </h3>

              <div className="mt-[12px] space-y-[12px]">
                <p className="text-[12px] md:text-[15px]">
                  {`বর্তমান বিক্রয়ের শর্তাবলী ("শর্তাবলী") tailortechbd.com ওয়েবসাইটে ("সাইট") আপনাকে ("গ্রাহক") বিক্রি করা সমস্ত পণ্যের জন্য প্রযোজ্য, যা "টেইলরটেক লিমিটেড" দ্বারা পরিচালিত।`}
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-[15px] font-semibold text-[#434343] md:text-[18px]">
                সাইটে তথ্যের নির্ভুলতা
              </h3>

              <div className="mt-[12px] space-y-[12px]">
                <p className="text-[12px] md:text-[15px]">
                  আমরা সাইটের তথ্য সম্পূর্ণ, নির্ভুল এবং বর্তমান তা নিশ্চিত করার জন্য সর্বোচ্চ চেষ্টা করি। তবে আমাদের প্রচেষ্টা সত্ত্বেও, সাইটের তথ্য মাঝে মাঝে ভুল, অসম্পূর্ণ বা পুরানো হতে পারে। সাইটের সমস্ত পণ্যের বিবরণ, বৈশিষ্ট্য এবং মূল্য কোনো নোটিশ ছাড়াই যে কোনো সময় পরিবর্তন হতে পারে।
                </p>

                <p className="text-[12px] md:text-[15px]">
                  আমরা আমাদের পণ্যের বৈশিষ্ট্য সঠিকভাবে প্রদর্শনের জন্য যুক্তিসঙ্গত প্রচেষ্টা করি, যার মধ্যে রঙও অন্তর্ভুক্ত। তবে পণ্যের ছবি তোলার সময় আলোর কারণে সাইটে আপনি যে রঙ দেখেন তা কিছুটা ভিন্ন হতে পারে এবং এটি আপনার কম্পিউটার সিস্টেম বা মোবাইল ডিভাইসের উপরও নির্ভর করে। আমরা গ্যারান্টি দিতে পারি না যে আপনার কম্পিউটার বা মোবাইল ডিভাইস এই রঙগুলি সঠিকভাবে প্রদর্শন করবে।
                </p>

                <p className="text-[12px] md:text-[15px]">
                  একটি নির্দিষ্ট সময়ে সাইটে পণ্য অন্তর্ভুক্ত করা এই অর্থ বহন করে না যে এই পণ্যগুলি যে কোনো সময় উপলব্ধ থাকবে। আমরা যে কোনো সময় যে কোনো পণ্য বন্ধ করার অধিকার সংরক্ষণ করি।
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-[15px] font-semibold text-[#434343] md:text-[18px]">
                ডেলিভারি সময়:
              </h3>

              <div className="mt-[12px] space-y-[12px]">
                <p className="text-[12px] font-medium md:text-[15px]">
                  ঢাকার ভিতরে
                </p>
                <p className="text-[12px] md:text-[15px]">
                  পণ্য ২-৩ দিনের মধ্যে ডেলিভারি দেওয়ার আশা করা যায়। অনিবার্য পরিস্থিতির কারণে এটি আরও বেশি সময় নিতে পারে। ডেলিভারি চার্জ ৭০ টাকা।
                </p>

                <p className="text-[12px] font-medium md:text-[15px]">
                  ঢাকার বাইরে
                </p>
                <p className="text-[12px] md:text-[15px]">
                  পণ্য ২-৪ দিনের মধ্যে ডেলিভারি দেওয়ার আশা করা যায়। অনিবার্য পরিস্থিতির কারণে এটি আরও বেশি সময় নিতে পারে। ডেলিভারি চার্জ ১২০ টাকা।
                </p>

                <p className="text-[12px] md:text-[15px]">
                  <strong>NB:</strong> আমরা ঢাকায় জরুরি ক্ষেত্রে একই দিনে এক্সপ্রেস ডেলিভারি প্রদান করি। এক্সপ্রেস ডেলিভারি চার্জ ১৫০ টাকা।
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;