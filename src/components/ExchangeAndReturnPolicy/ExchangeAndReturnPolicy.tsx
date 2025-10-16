import React from "react";
import Breadcrumb from "../ui/BreadCrumbs";
import Heading from "../ui/Heading";

const ExchangeAndReturnPolicy = () => {
  return (
    <div className="main_container flex min-h-[100dvh] w-full flex-col gap-[20px] py-[20px]">
      <Breadcrumb />

      <div className="grid grid-cols-1 gap-[20px] lg:grid-cols-2">
        {/* English Exchange & Return Policy */}
        <div className="bg-white">
          <Heading>Exchange & Return Policy</Heading>

          <div className="space-y-[16px] p-[16px]">
            <section>
              <div className="mt-[16px] space-y-[24px] text-[12px] md:text-[15px]">
                <div>
                  <p className="font-bold">Open-Box Facility:</p>
                  <p>
                    {`We offer open-box options for online purchases, enabling you to inspect the product upon delivery. This ensures that you can verify the item's condition and functionality before accepting it. If the product does not meet your expectations, you can return it immediately. We aim to provide a transparent and satisfying shopping experience. Enjoy peace of mind with every online purchase.`}
                  </p>
                </div>

                <div>
                  <p className="font-bold">Return:</p>
                  <p>
                    For online purchases, you can return products immediately if you don&apos;t like
                    the item. The product must be in the same condition as received and undamaged.
                    Ensure all original packaging, tags, and accessories are included. Returns must
                    be initiated within a specified period to be eligible. Enjoy a hassle-free
                    return process with our dedicated customer support team.
                  </p>
                </div>

                <div>
                  <p className="font-bold">Exchange:</p>
                  <p>
                    Tailortech offers a flexible exchange policy for products purchased online
                    within 7 days of receipt. To qualify, the product must be unused with the
                    original invoice, tags, and packaging intact. Exchanges are allowed for products
                    of equal or higher value only. If exchanging for a lower-value product, the
                    price difference can be adjusted by adding another product or applying credit
                    toward your next order. Enjoy a seamless exchange experience with
                    Tailortech&apos;s customer-friendly policy.
                  </p>
                </div>

                <div>
                  <p className="font-bold">Refund:</p>
                  <p>
                    If payment is made in advance and you decide to return the item, our team will
                    inspect it upon receipt and process your refund. Refunds will be issued to the
                    original payment method. For MFS payments, the refund process may take 7 working
                    days, and for bank payments, it may take 10 working days.
                  </p>
                </div>

                <div>
                  <p>
                    To request an exchange, please contact our Customer Service at 01911 696556,
                    01711 923276 or email us at support@tailortechbd.com. Exchanges are subject to
                    stock availability.
                  </p>
                </div>

                <div>
                  <p className="font-bold">Note:</p>
                  <p>
                    If there is any problem from our side we will offer FREE Returns, Exchanges or
                    Refund otherwise the customer has to bear the return shipping expense.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Bengali Exchange & Return Policy */}
        <div className="bg-white">
          <Heading>এক্সচেঞ্জ এবং রিটার্ন পলিসি</Heading>

          <div className="space-y-[16px] p-[16px]">
            <section>
              <div className="mt-[16px] space-y-[24px] text-[12px] md:text-[17px]">
                <div>
                  <p className="font-bold">ওপেন-বক্স সুবিধা:</p>
                  <p>
                    আমরা অনলাইন কেনাকাটার জন্য ওপেন-বক্স অপশন অফার করি, যা আপনাকে ডেলিভারির সময়
                    পণ্য পরিদর্শন করতে সক্ষম করে। এটি নিশ্চিত করে যে আপনি আইটেমের অবস্থা এবং
                    কার্যকারিতা গ্রহণের আগে যাচাই করতে পারেন। যদি পণ্যটি আপনার প্রত্যাশা পূরণ না
                    করে, আপনি তা অবিলম্বে ফেরত দিতে পারেন। আমরা একটি স্বচ্ছ এবং সন্তোষজনক শপিং
                    অভিজ্ঞতা প্রদান করতে চাই। প্রতিটি অনলাইন কেনাকাটায় নির্বিঘ্নে উপভোগ করুন।
                  </p>
                </div>

                <div>
                  <p className="font-bold">রিটার্ন:</p>
                  <p>
                    অনলাইন কেনাকাটার জন্য, আপনি পণ্যগুলি অবিলম্বে ফেরত দিতে পারেন যদি আপনি আইটেমটি
                    পছন্দ না করেন। পণ্যটি প্রাপ্ত অবস্থায় এবং অক্ষত অবস্থায় থাকতে হবে। সমস্ত মূল
                    প্যাকেজিং, ট্যাগ এবং আনুষাঙ্গিকগুলি অন্তর্ভুক্ত করা হয়েছে তা নিশ্চিত করুন।
                    রিটার্নের জন্য একটি নির্দিষ্ট সময়সীমার মধ্যে শুরু করতে হবে। আমাদের নিবেদিত
                    গ্রাহক সেবা দলের সাথে একটি ঝামেলামুক্ত রিটার্ন প্রক্রিয়া উপভোগ করুন।
                  </p>
                </div>

                <div>
                  <p className="font-bold">এক্সচেঞ্জ:</p>
                  <p>
                    টেইলরটেক অনলাইনে কেনা পণ্যগুলির জন্য ৭ দিনের মধ্যে একটি নমনীয় এক্সচেঞ্জ পলিসি
                    অফার করে। যোগ্যতা অর্জনের জন্য, পণ্যটি অব্যবহৃত অবস্থায় থাকতে হবে এবং মূল
                    ইনভয়েস, ট্যাগ এবং প্যাকেজিং অক্ষত থাকতে হবে। এক্সচেঞ্জ শুধুমাত্র সমান বা উচ্চতর
                    মূল্যের পণ্যগুলির জন্য অনুমোদিত। যদি কম মূল্যের পণ্যের জন্য এক্সচেঞ্জ করা হয়,
                    তাহলে মূল্য পার্থক্য অন্য একটি পণ্য যোগ করে বা আপনার পরবর্তী অর্ডারে ক্রেডিট
                    প্রয়োগ করে সমন্বয় করা যেতে পারে। টেইলরটেকের গ্রাহক-বান্ধব পলিসি সহ একটি
                    নিরবিচ্ছিন্ন এক্সচেঞ্জ অভিজ্ঞতা উপভোগ করুন।
                  </p>
                </div>

                <div>
                  <p className="font-bold">রিফান্ড:</p>
                  <p>
                    যদি অগ্রিম অর্থ প্রদান করা হয় এবং আপনি আইটেমটি ফেরত দেওয়ার সিদ্ধান্ত নেন,
                    আমাদের দল এটি প্রাপ্তির পর পরিদর্শন করবে এবং আপনার রিফান্ড প্রক্রিয়া করবে।
                    রিফান্ড মূল পেমেন্ট পদ্ধতিতে জারি করা হবে। এমএফএস পেমেন্টের জন্য, রিফান্ড
                    প্রক্রিয়াটি ৭ কার্যদিবস সময় নিতে পারে, এবং ব্যাংক পেমেন্টের জন্য এটি ১০
                    কার্যদিবস সময় নিতে পারে।
                  </p>
                </div>

                <div>
                  <p>
                    এক্সচেঞ্জের জন্য অনুরোধ করতে, আমাদের গ্রাহক সেবায় ০১৯১১ ৬৯৬৫৫৬, ০১৭১১ ৯২৩২৭৬
                    নম্বরে কল করুন বা tailortechbd2025@gmail.com এ ইমেইল করুন। এক্সচেঞ্জ স্টক
                    প্রাপ্যতার উপর নির্ভরশীল।
                  </p>
                </div>

                <div>
                  <p className="font-bold">নোট:</p>
                  <p>
                    যদি আমাদের পক্ষ থেকে কোনো সমস্যা থাকে আমরা বিনামূল্যে রিটার্ন, এক্সচেঞ্জ বা
                    রিফান্ড অফার করব অন্যথায় গ্রাহককে রিটার্ন শিপিং খরচ বহন করতে হবে।
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeAndReturnPolicy;
