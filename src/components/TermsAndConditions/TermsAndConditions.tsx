import React from "react";
import Breadcrumb from "../ui/BreadCrumbs";
import Link from "next/link";
import Heading from "../ui/Heading";

const TermsAndConditions = () => {
  return (
    <div className="main_container flex min-h-[100dvh] w-full flex-col gap-[20px] py-[20px]">
      <Breadcrumb />

      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2">
        {/* English Terms and Conditions */}
        <div className="bg-white">
          <Heading>Terms and Conditions</Heading>

          <div className="space-y-[16px] p-[16px]">
            <section>
              <h3 className="text-[15px] font-semibold text-[#434343] md:text-[18px]">
                1. Agreement to Terms
              </h3>

              <div className="mt-[12px] space-y-[12px]">
                <p className="text-[12px] md:text-[15px]">
                  <span className="font-medium">1.1</span> These Terms and Conditions constitute a
                  legally binding agreement made between you, whether personally, and TailorTech
                  Limited, located at [Your Address], Bangladesh (we, us), concerning your access to
                  and use of the TailorTech Limited (
                  <Link href="/" className="text-blue-600 hover:underline">
                    https://tailortech.com
                  </Link>
                  ) website as well as any related applications (the Site).
                </p>

                <p className="text-[12px] md:text-[15px]">
                  The Site provides the following services: custom tailoring, ready-made apparel,
                  and fashion accessories. You agree that by accessing the Site and/or Services, you
                  have read, understood, and agree to be bound by all of these Terms and Conditions.
                </p>

                <p className="text-[12px] md:text-[15px]">
                  If you do not agree with all of these Terms and Conditions, then you are
                  prohibited from using the Site and Services and you must discontinue immediately.
                  We recommend that you print a copy of these Terms and Conditions for future
                  reference.
                </p>

                <p className="text-[12px] md:text-[15px]">
                  <span className="font-medium">1.2</span> The supplemental policies set out in
                  Section 1.7 below, as well as any supplemental terms and conditions or documents
                  that may be posted on the Site from time to time, are expressly incorporated by
                  reference.
                </p>

                <p className="text-[12px] md:text-[15px]">
                  <span className="font-medium">1.3</span> We may make changes to these Terms and
                  Conditions at any time. The updated version of these Terms and Conditions will be
                  indicated by an updated &quot;Revised&quot; Date and the updated version will be
                  effective as soon as it is accessible. You are responsible for reviewing these
                  Terms and Conditions to stay informed of updates. Your continued use of the Site
                  represents that you have accepted such changes.
                </p>

                <p className="text-[12px] md:text-[15px]">
                  <span className="font-medium">1.4</span> We may update or change the Site from
                  time to time to reflect changes to our products, our users&apos; needs and/or our
                  business priorities.
                </p>

                <p className="text-[12px] md:text-[15px]">
                  <span className="font-medium">1.5</span> Our site is directed to people residing
                  in Bangladesh. The information provided on the Site is not intended for
                  distribution to or use by any person or entity in any jurisdiction or country
                  where such distribution or use would be contrary to law or regulation or which
                  would subject us to any registration requirement within such jurisdiction or
                  country.
                </p>

                <p className="text-[12px] md:text-[15px]">
                  <span className="font-medium">1.6</span> The Site is intended for users who are at
                  least 18 years old. If you are under the age of 18, you are not permitted to
                  register for the Site or use the Services without parental permission.
                </p>

                <p className="text-[12px] md:text-[15px]">
                  <span className="font-medium">1.7</span> Additional policies which also apply to
                  your use of the Site include:
                </p>

                <ul className="list-disc space-y-[8px] pl-[32px] text-[12px] md:text-[15px]">
                  <li className="text-[12px] marker:text-primary md:text-[15px]">
                    Our Privacy Policy{" "}
                    <Link href="/privacy-policy" className="text-blue-600 hover:underline">
                      https://tailortech.com/privacy-policy
                    </Link>
                    , which sets out the terms on which we process any personal data we collect from
                    you, or that you provide to us. By using the Site, you consent to such
                    processing and you warrant that all data provided by you is accurate.
                  </li>
                  <li className="text-[12px] marker:text-primary md:text-[15px]">
                    Our Cookie Policy{" "}
                    <Link href="/cookie-policy" className="text-blue-600 hover:underline">
                      https://tailortech.com/cookie-policy
                    </Link>
                    , which sets out information about the cookies on the Site.
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-[15px] font-semibold text-[#434343] md:text-[18px]">
                2. Acceptable Use
              </h3>

              <div className="mt-[12px] space-y-[12px]">
                <p className="text-[12px] md:text-[15px]">
                  <span className="font-medium">2.1</span> You may not access or use the Site for
                  any purpose other than that for which we make the Site available. The Site may not
                  be used in connection with any commercial endeavors except those that are
                  specifically endorsed or approved by us.
                </p>

                <p className="text-[12px] md:text-[15px]">
                  <span className="font-medium">2.2</span> As a user of the Site, you agree not to:
                </p>

                <ul className="list-disc space-y-[8px] pl-[32px] text-[12px] md:text-[15px]">
                  <li className="text-[12px] marker:text-primary md:text-[15px]">
                    Systematically retrieve data or other content from the Site to create or
                    compile, directly or indirectly, a collection, compilation, database, or
                    directory without written permission from us.
                  </li>
                  <li className="text-[12px] marker:text-primary md:text-[15px]">
                    Make any unauthorized use of the Site, including collecting usernames and/or
                    email addresses of users by electronic or other means for the purpose of sending
                    unsolicited email, or creating user accounts by automated means or under false
                    pretenses.
                  </li>
                  <li className="text-[12px] marker:text-primary md:text-[15px]">
                    Use the Site to advertise or offer to sell goods and services.
                  </li>
                  <li className="text-[12px] marker:text-primary md:text-[15px]">
                    Circumvent, disable, or otherwise interfere with security-related features of
                    the Site.
                  </li>
                  <li className="text-[12px] marker:text-primary md:text-[15px]">
                    Engage in unauthorized framing of or linking to the Site.
                  </li>
                  <li className="text-[12px] marker:text-primary md:text-[15px]">
                    Trick, defraud, or mislead us and other users, especially in any attempt to
                    learn sensitive account information such as user passwords.
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-[15px] font-semibold text-[#434343] md:text-[18px]">
                3. Products and Services
              </h3>

              <div className="mt-[12px] space-y-[12px]">
                <p className="text-[12px] md:text-[15px]">
                  <span className="font-medium">3.1</span> We make every effort to display as
                  accurately as possible the colors, features, specifications, and details of the
                  products available on the Site. However, we do not guarantee that the colors,
                  features, specifications, and details of the products will be accurate, complete,
                  reliable, current, or free of other errors, and your electronic display may not
                  accurately reflect the actual colors and details of the products.
                </p>

                <p className="text-[12px] md:text-[15px]">
                  <span className="font-medium">3.2</span> All products are subject to availability,
                  and we cannot guarantee that items will be in stock. We reserve the right to
                  discontinue any products at any time for any reason. Prices for all products are
                  subject to change.
                </p>

                <p className="text-[12px] md:text-[15px]">
                  <span className="font-medium">3.3</span> For custom tailoring services, we rely on
                  the measurements provided by you. We are not responsible for fitting issues that
                  arise from incorrect measurements provided by the customer.
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-[15px] font-semibold text-[#434343] md:text-[18px]">
                4. Purchases and Payment
              </h3>

              <div className="mt-[12px] space-y-[12px]">
                <p className="text-[12px] md:text-[15px]">
                  <span className="font-medium">4.1</span> We accept the following forms of payment:
                </p>

                <ul className="list-disc space-y-[8px] pl-[32px] text-[12px] md:text-[15px]">
                  {/* <li className="text-[12px] marker:text-primary md:text-[15px]">Credit Card</li>
                  <li className="text-[12px] marker:text-primary md:text-[15px]">Debit Card</li>
                  <li className="text-[12px] marker:text-primary md:text-[15px]">Mobile Banking</li> */}
                  <li className="text-[12px] marker:text-primary md:text-[15px]">
                    Cash on Delivery (for eligible locations)
                  </li>
                </ul>

                <p className="text-[12px] md:text-[15px]">
                  <span className="font-medium">4.2</span> You agree to provide current, complete,
                  and accurate purchase and account information for all purchases made via the Site.
                  You further agree to promptly update account and payment information, including
                  email address, payment method, and payment card expiration date, so that we can
                  complete your transactions and contact you as needed.
                </p>

                <p className="text-[12px] md:text-[15px]">
                  <span className="font-medium">4.3</span> We reserve the right to refuse any order
                  placed through the Site. We may, in our sole discretion, limit or cancel
                  quantities purchased per person, per household, or per order. These restrictions
                  may include orders placed by or under the same customer account, the same payment
                  method, and/or orders that use the same billing or shipping address.
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-[15px] font-semibold text-[#434343] md:text-[18px]">
                5. Return and Refund Policy
              </h3>

              <div className="mt-[12px] space-y-[12px]">
                <p className="text-[12px] md:text-[15px]">
                  <span className="font-medium">5.1</span> Please review our Return Policy posted on
                  the Site prior to making any purchases.
                </p>

                <p className="text-[12px] md:text-[15px]">
                  <span className="font-medium">5.2</span> Custom-made items cannot be returned
                  unless there is a significant defect in workmanship.
                </p>
              </div>
            </section>
          </div>
        </div>

        {/* Bengali Terms and Conditions */}
        <div className="bg-white">
          <Heading>বিধি - নিয়ম এবং শর্তাবলী</Heading>
          <div className="space-y-[16px] p-[16px]">
            <section>
              <h3 className="text-[15px] font-semibold text-[#434343] md:text-[18px]">
                ১. শর্তাবলী চুক্তি
              </h3>

              <div className="mt-[12px] space-y-[12px]">
                <p className="text-[12px] md:text-[15px]">
                  <span className="font-medium">১.১</span> এই শর্তাবলী আপনার ব্যক্তিগতভাবে আপনি এবং
                  ২০১৮ সালে গঠিত সংস্থা, টেইলরটেক, [আপনার ঠিকানা], বাংলাদেশ (আমরা, আমাদের) এ অবস্থিত
                  টেইলরটেক লিমিটেড (
                  <Link href="/" className="text-blue-600 hover:underline">
                    https://tailortech.com
                  </Link>
                  ) ওয়েবসাইট ব্যবহারের এবং সংশ্লিষ্ট অ্যাপ্লিকেশন (সাইট) ব্যবহার সম্পর্কিত
                  আইনগতভাবে বাধ্যতামূলক চুক্তি গঠন করে।
                </p>

                <p className="text-[12px] md:text-[15px]">
                  সাইটটি নিম্নলিখিত পরিষেবা প্রদান করে: কাস্টম টেইলরিং, রেডিমেড পোশাক এবং ফ্যাশন
                  অ্যাক্সেসরিজ। আপনি এই সমস্ত শর্তাবলী পড়েছেন, বুঝেছেন এবং এর দ্বারা সম্মত হয়েছেন।
                </p>

                <p className="text-[12px] md:text-[15px]">
                  আপনি যদি এই সমস্ত শর্তাবলীর সাথে একমত না হন, তাহলে আপনার জন্য সাইট এবং পরিষেবা
                  ব্যবহার করা নিষিদ্ধ এবং আপনাকে অবিলম্বে বন্ধ করতে হবে। আমরা সুপারিশ করি যে আপনি
                  ভবিষ্যতে রেফারেন্সের জন্য এই শর্তাবলীর একটি অনুলিপি প্রিন্ট করে রাখেন।
                </p>

                <p className="text-[12px] md:text-[15px]">
                  <span className="font-medium">১.২</span> নিচে সেকশন ১.৭-এ সেট করা সম্পূরক
                  নীতিমালা, যেমনটি সকল সম্পূরক শর্তাবলী বা নথি যা সময়ে সময়ে সাইটে পোস্ট করা যেতে
                  পারে, স্পষ্টভাবে রেফারেন্স দ্বারা অন্তর্ভুক্ত করা হয়েছে।
                </p>

                <p className="text-[12px] md:text-[15px]">
                  <span className="font-medium">১.৩</span> আমরা যে কোনো সময় এই নিয়ম ও শর্তাবলী
                  পরিবর্তন করতে পারি। এই শর্তাবলীর আপডেটেড হওয়া সংস্করণটি &quot;সংশোধিত&quot; তারিখ
                  দ্বারা নির্দেশিত হবে এবং আপডেটেড হওয়া সংস্করণটি অ্যাক্সেসযোগ্য হওয়ার সাথে সাথে
                  কার্যকর হবে। আপডেটগুলি সম্পর্কে অবহিত থাকার জন্য আপনি এই নিয়ম ও শর্তাবলী
                  পর্যালোচনা করার জন্য দায়ী। আপনার সাইটের অব্যাহত ব্যবহার এই পরিবর্তনগুলি
                  প্রতিনিধিত্ব করে যে আপনি এই ধরনের পরিবর্তনগুলো গ্রহণ করেছেন।
                </p>

                <p className="text-[12px] md:text-[15px]">
                  <span className="font-medium">১.৪</span> আমরা আমাদের পণ্য, আমাদের ব্যবহারকারীদের
                  চাহিদা এবং/অথবা আমাদের ব্যবসার অগ্রাধিকারের পরিবর্তনগুলো কর্মক্ষমতার প্রতিফলে
                  সময়ে সময়ে সাইট আপডেট বা পরিবর্তন করতে পারি।
                </p>

                <p className="text-[12px] md:text-[15px]">
                  <span className="font-medium">১.৫</span> আমাদের সাইটটি বাংলাদেশ-এ বসবাসকারী
                  ব্যক্তিদের জন্য নির্দেশিত। সাইটে প্রদত্ত তথ্যগুলো কোনও এমন ব্যক্তি বা সত্তার
                  দ্বারা কোনও অধিকার বা দেশে বিতরণ বা ব্যবহারের উদ্দেশ্যে নয় যেখানে এই ধরনের বিতরণ
                  বা ব্যবহার আইন বা প্রবিধানের বিপরীত হবে বা যা এই ধরনের এখতিয়ার বা দেশের মধ্যে
                  আমাদের নিবন্ধকরণের প্রয়োজনীয়তার বিষয় হবে।
                </p>

                <p className="text-[12px] md:text-[15px]">
                  <span className="font-medium">১.৬</span> সাইটটি এমন ব্যবহারকারীদের জন্য যাদের বয়স
                  কমপক্ষে ১৮ বছর। যদি আপনি বয়স ১৮ বছরের কম হন, তাহলে পিতামাতার জন্য অনুমতি ছাড়া
                  পিতামাতার অনুমতি ব্যতীত সাইট বা পরিষেবাগুলো নিবন্ধন করার অনুমতি নেওয়া হয় না।
                </p>

                <p className="text-[12px] md:text-[15px]">
                  <span className="font-medium">১.৭</span> আপনার সাইটের ব্যবহারে প্রযোজ্য অতিরিক্ত
                  নীতিগুলির অন্তর্ভুক্ত রয়েছে:
                </p>

                <ul className="list-disc space-y-[8px] pl-[32px] text-[12px] md:text-[15px]">
                  <li className="text-[12px] marker:text-primary md:text-[15px]">
                    আমাদের গোপনীয়তা নীতিতে{" "}
                    <Link href="/privacy-policy" className="text-blue-600 hover:underline">
                      https://tailortech.com/privacy-policy
                    </Link>
                    , যা আপনার কাছ থেকে সংগ্রহ করা কোনো ব্যক্তিগত তথ্য বা আপনি আমাদের সরবরাহ করার
                    শর্তাবলী নির্ধারণ করে। সাইটটি ব্যবহার করে, আপনি এই ধরনের প্রক্রিয়াকরণে সম্মতি
                    দেন এবং আপনি নিশ্চিত করেন যে আপনার দেওয়া সমস্ত তথ্য সঠিক।
                  </li>
                  <li className="text-[12px] marker:text-primary md:text-[15px]">
                    আমাদের Cookie Policy{" "}
                    <Link href="/cookie-policy" className="text-blue-600 hover:underline">
                      https://tailortech.com/cookie-policy
                    </Link>
                    যা সাইটের Cookie সম্পর্কে তথ্য নির্ধারণ করে।
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-[15px] font-semibold text-[#434343] md:text-[18px]">
                ২. গ্রহণযোগ্য ব্যবহার
              </h3>

              <div className="mt-[12px] space-y-[12px]">
                <p className="text-[12px] md:text-[15px]">
                  <span className="font-medium">২.১</span> যে উদ্দেশ্যে আমরা সাইট এবং আমাদের
                  পরিষেবাগুলো উপলব্ধ করি তার চেয়ে অন্য কোন উদ্দেশ্যে আপনি সাইটটি অ্যাক্সেস বা
                  ব্যবহার করতে পারবেন না। সাইটটি কোনও বাণিজ্যিক প্রচেষ্টার সাথে ব্যবহার করা যাবে না
                  যা আমাদের দ্বারা বিশেষভাবে সমর্থিত বা অনুমোদিত নয়।
                </p>

                <p className="text-[12px] md:text-[15px]">
                  <span className="font-medium">২.২</span> সাইটের একজন ব্যবহারকারী হিসাবে, আপনি
                  নিম্নলিখিত কাজগুলি না করতে সম্মত হন:
                </p>

                <ul className="list-disc space-y-[8px] pl-[32px] text-[12px] md:text-[15px]">
                  <li className="text-[12px] marker:text-primary md:text-[15px]">
                    আমাদের লিখিত অনুমতি ছাড়া প্রত্যক্ষ বা পরোক্ষভাবে একটি সংগ্রহ, সংকলন, ডাটাবেস,
                    বা ডিরেক্টরি তৈরি বা সংকলন করার জন্য সাইট থেকে ডেটা বা অন্যান্য কন্টেন্ট
                    পদ্ধতিগতভাবে পুনরুদ্ধার করা।
                  </li>
                  <li className="text-[12px] marker:text-primary md:text-[15px]">
                    অবাঞ্ছিত ইমেল পাঠানোর উদ্দেশ্যে ইলেকট্রনিক বা অন্যান্য উপায়ে ব্যবহারকারীদের
                    ইউজারনেম এবং/বা ইমেল ঠিকানা সংগ্রহ করা সহ সাইটের কোনও অননুমোদিত ব্যবহার করা।
                  </li>
                  <li className="text-[12px] marker:text-primary md:text-[15px]">
                    পণ্য এবং পরিষেবা বিক্রয় করার জন্য বিজ্ঞাপন দেওয়া বা অফার করার জন্য সাইট
                    ব্যবহার করা।
                  </li>
                  <li className="text-[12px] marker:text-primary md:text-[15px]">
                    সাইটের নিরাপত্তা-সম্পর্কিত বৈশিষ্ট্যগুলিকে বাধা দেওয়া, অক্ষম করা, বা অন্যথায়
                    হস্তক্ষেপ করা।
                  </li>
                  <li className="text-[12px] marker:text-primary md:text-[15px]">
                    সাইটের অননুমোদিত ফ্রেমিং বা লিঙ্কিং-এ জড়িত হওয়া।
                  </li>
                  <li className="text-[12px] marker:text-primary md:text-[15px]">
                    আমাদের এবং অন্যান্য ব্যবহারকারীদের প্রতারণা করা, বিশেষ করে ব্যবহারকারীর
                    পাসওয়ার্ড যেমন সংবেদনশীল অ্যাকাউন্ট তথ্য শিখার চেষ্টা করা।
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-[15px] font-semibold text-[#434343] md:text-[18px]">
                ৩. পণ্য এবং সেবা
              </h3>

              <div className="mt-[12px] space-y-[12px]">
                <p className="text-[12px] md:text-[15px]">
                  <span className="font-medium">৩.১</span> সাইটে উপলব্ধ পণ্যগুলোর রং, বৈশিষ্ট্য,
                  স্পেসিফিকেশন এবং বিবরণ যথাসম্ভব সঠিকভাবে প্রদর্শনের জন্য আমরা সর্বোচ্চ চেষ্টা করি।
                  তবে আমরা পণ্যগুলোর রং, বৈশিষ্ট্য, স্পেসিফিকেশন এবং বিবরণের নির্ভুলতা, সম্পূর্ণতা,
                  নির্ভরযোগ্যতা, আধুনিকতা বা ত্রুটিমুক্ততা নিশ্চিত করি না। আপনার ইলেকট্রনিক
                  ডিসপ্লেতে পণ্যগুলোর প্রকৃত রং এবং বিবরণ সঠিকভাবে প্রতিফলিত নাও হতে পারে।
                </p>

                <p className="text-[12px] md:text-[15px]">
                  <span className="font-medium">৩.২</span> সমস্ত পণ্য প্রাপ্যতার উপর নির্ভরশীল এবং
                  আমরা আইটেমগুলোর স্টকে থাকার নিশ্চয়তা দিতে পারি না। যেকোনো সময় যেকোনো কারণে যে
                  কোনো পণ্য বন্ধ করার অধিকার আমরা সংরক্ষণ করি। সমস্ত পণ্যের মূল্য পরিবর্তন সাপেক্ষ।
                </p>

                <p className="text-[12px] md:text-[15px]">
                  <span className="font-medium">৩.৩</span> কাস্টম টেইলরিং সেবার ক্ষেত্রে, আমরা আপনার
                  প্রদত্ত মাপের উপর নির্ভর করি। গ্রাহক কর্তৃক প্রদত্ত ভুল মাপের কারণে সৃষ্ট ফিটিং
                  সমস্যার জন্য আমরা দায়ী নই।
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-[15px] font-semibold text-[#434343] md:text-[18px]">
                ৪. ক্রয় এবং অর্থপ্রদান
              </h3>

              <div className="mt-[12px] space-y-[12px]">
                <p className="text-[12px] md:text-[15px]">
                  <span className="font-medium">৪.১</span> আমরা নিম্নলিখিত পদ্ধতিতে অর্থপ্রদান গ্রহণ
                  করি:
                </p>

                <ul className="list-disc space-y-[8px] pl-[32px] text-[12px] md:text-[15px]">
                  <li className="text-[12px] marker:text-primary md:text-[15px]">
                    ক্যাশ অন ডেলিভারি (যোগ্য স্থানগুলোর জন্য)
                  </li>
                </ul>

                <p className="text-[12px] md:text-[15px]">
                  <span className="font-medium">৪.২</span> আপনি সম্মত হচ্ছেন যে সাইটের মাধ্যমে করা
                  সকল ক্রয়ের জন্য বর্তমান, সম্পূর্ণ এবং সঠিক ক্রয় ও অ্যাকাউন্ট তথ্য প্রদান করবেন।
                  আরও সম্মত হচ্ছেন যে প্রয়োজনীয় অ্যাকাউন্ট এবং অর্থপ্রদানের তথ্য, যেমন ইমেইল
                  ঠিকানা, অর্থপ্রদানের পদ্ধতি এবং পেমেন্ট কার্ডের মেয়াদ শেষ হওয়ার তারিখ,
                  তাৎক্ষণিকভাবে আপডেট করবেন যাতে আমরা আপনার লেনদেন সম্পন্ন করতে এবং প্রয়োজনে আপনার
                  সাথে যোগাযোগ করতে পারি।
                </p>

                <p className="text-[12px] md:text-[15px]">
                  <span className="font-medium">৪.৩</span> সাইটের মাধ্যমে দেওয়া যেকোনো অর্ডার
                  প্রত্যাখ্যান করার অধিকার আমরা সংরক্ষণ করি। আমাদের একক বিবেচনায়, আমরা প্রতি
                  ব্যক্তি, প্রতি পরিবার বা প্রতি অর্ডারে ক্রয়কৃত পরিমাণ সীমিত বা বাতিল করতে পারি।
                  এসব সীমাবদ্ধতার মধ্যে একই গ্রাহক অ্যাকাউন্ট, একই অর্থপ্রদানের পদ্ধতি এবং/অথবা একই
                  বিলিং বা শিপিং ঠিকানা ব্যবহার করে করা অর্ডার অন্তর্ভুক্ত থাকতে পারে।
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-[15px] font-semibold text-[#434343] md:text-[18px]">
                ৫. ফেরত এবং রিফান্ড নীতি
              </h3>

              <div className="mt-[12px] space-y-[12px]">
                <p className="text-[12px] md:text-[15px]">
                  <span className="font-medium">৫.১</span> কোনো ক্রয় করার আগে দয়া করে সাইটে পোস্ট
                  করা আমাদের ফেরত নীতি পর্যালোচনা করুন।
                </p>

                <p className="text-[12px] md:text-[15px]">
                  <span className="font-medium">৫.২</span> কাস্টম-মেড আইটেম ফেরত দেওয়া যাবে না, যদি
                  না কাজের মানে উল্লেখযোগ্য ত্রুটি থাকে।
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
