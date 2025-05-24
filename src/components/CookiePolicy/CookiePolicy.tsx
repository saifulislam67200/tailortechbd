import React from "react";
import Breadcrumb from "../ui/BreadCrumbs";
import Link from "next/link";
import Heading from "../ui/Heading";

const CookiePolicy = () => {
  return (
    <div className="main_container flex min-h-[100dvh] w-full flex-col gap-[20px] py-[20px]">
      <Breadcrumb />

      <div className="grid grid-cols-1 gap-[16px] md:grid-cols-2">
        {/* English Cookie Policy */}
        <div className="bg-white">
          <Heading>Cookie Policy</Heading>

          <div className="space-y-[16px] p-[16px] text-[12px] md:text-[16px]">
            <p>
              This Cookie Policy explains how TailorTech Limited (&quot;Company&quot;,
              &quot;we&quot;, &quot;us&quot;, and &quot;our&quot;) uses cookies and similar
              technologies to recognize you when you visit our websites at{" "}
              <Link href="/" className="text-blue-600 hover:underline">
                https://tailortech.com
              </Link>
              , (&quot;Websites&quot;). It explains what these technologies are and why we use them,
              as well as your rights to control our use of them.
            </p>

            <p>
              In some cases we may use cookies to collect personal information, or that becomes
              personal information if we combine it with other information.
            </p>

            <h3 className="mt-[24px] text-[16px] font-semibold md:text-[18px]">
              What are cookies?
            </h3>

            <p>
              Cookies are small data files that are placed on your computer or mobile device when
              you visit a website. Cookies are widely used by website owners in order to make their
              websites work, or to work more efficiently, as well as to provide reporting
              information.
            </p>

            <p>
              Cookies set by the website owner (in this case, TailorTech Limited) are called
              &quot;first-party cookies&quot;. Cookies set by parties other than the website owner
              are called &quot;third-party cookies&quot;. Third-party cookies enable third-party
              features or functionality to be provided on or through the website (e.g. like
              advertising, interactive content and analytics). The parties that set these
              third-party cookies can recognize your computer both when it visits the website in
              question and also when it visits certain other websites.
            </p>

            <h3 className="mt-[24px] text-[16px] font-semibold md:text-[18px]">
              Why do we use cookies?
            </h3>

            <p>
              We use first and third-party cookies for several reasons. Some cookies are required
              for technical reasons in order for our websites to operate, and we refer to these as
              &quot;essential&quot; or &quot;strictly necessary&quot; cookies. Other cookies also
              enable us to track and target the interests of our users to enhance the experience on
              our Online Properties. Third parties serve cookies through our websites for
              advertising, analytics and other purposes. This is described in more detail below.
            </p>

            <h3 className="mt-[24px] text-[16px] font-semibold md:text-[18px]">
              The specific types of first and third-party cookies served through our websites and
              the purposes they perform are described below:
            </h3>

            <div className="mt-[16px] space-y-[16px]">
              <div>
                <h4 className="font-medium">Essential website cookies:</h4>
                <p>
                  These cookies are strictly necessary to provide you with services available
                  through our Websites and to use some of its features, such as access to secure
                  areas. Because these cookies are strictly necessary to deliver the Websites, you
                  cannot refuse them without impacting how our Websites function.
                </p>
              </div>

              <div>
                <h4 className="font-medium">Performance and functionality cookies:</h4>
                <p>
                  These cookies are used to enhance the performance and functionality of our
                  Websites but are non-essential to their use. However, without these cookies,
                  certain functionality may become unavailable.
                </p>
              </div>

              <div>
                <h4 className="font-medium">Analytics and customization cookies:</h4>
                <p>
                  These cookies collect information that is used either in aggregate form to help us
                  understand how our Websites are being used or how effective our marketing
                  campaigns are, or to help us customize our Websites for you in order to enhance
                  your experience. They help us understand which pages are the most and least
                  popular and see how visitors move around the site.
                </p>
              </div>

              <div>
                <h4 className="font-medium">Advertising cookies:</h4>
                <p>
                  These cookies are used to make advertising messages more relevant to you and your
                  interests. They also perform functions like preventing the same ad from
                  continuously reappearing, ensuring that ads are properly displayed, and in some
                  cases selecting advertisements that are based on your interests. They remember
                  that you have visited a website and this information is shared with other
                  organizations such as advertisers.
                </p>
              </div>

              <div>
                <h4 className="font-medium">Social networking cookies:</h4>
                <p>
                  These cookies are used to enable you to share pages and content that you find
                  interesting on our Websites through third-party social networking and other
                  websites. These cookies may also be used for advertising purposes.
                </p>
              </div>
            </div>

            <h3 className="mt-[24px] text-[16px] font-semibold md:text-[18px]">
              How can I control cookies?
            </h3>

            <p>
              You have the right to decide whether to accept or reject cookies. You can exercise
              your cookie rights by setting your preferences in the Cookie Consent Manager. The
              Cookie Consent Manager allows you to select which categories of cookies you accept or
              reject. Essential cookies cannot be rejected as they are strictly necessary to provide
              you with services.
            </p>

            <p>
              The Cookie Consent Manager can be found in the notification banner and on our website.
              If you choose to reject cookies, you may still use our website though your access to
              some functionality and areas of our website may be restricted. You may also set or
              amend your web browser controls to accept or refuse cookies.
            </p>

            <p>
              The specific types of first and third-party cookies served through our Websites and
              the purposes they perform are described in the table below (please note that the
              specific cookies served may vary depending on the specific Online Properties you
              visit):
            </p>

            <div className="mt-[16px] rounded-md border border-border-main p-[16px]">
              <h4 className="font-medium">Essential website cookies:</h4>
              <p className="mt-2">Name: session</p>
              <p>Purpose: Used to maintain an anonymous user session by the server.</p>
              <p>Provider: tailortech.com</p>
              <p>Service: Essential Website Service</p>
              <p>Expiry: Session</p>
            </div>

            <h3 className="mt-[24px] text-[16px] font-semibold md:text-[18px]">
              How can I control cookies on my browser?
            </h3>

            <p>
              As the means by which you can refuse cookies through your web browser controls vary
              from browser-to-browser, you should visit your browser&apos;s help menu for more
              information. The following is information about how to manage cookies on the most
              popular browsers:
            </p>

            <ul className="mt-[8px] list-disc space-y-1 pl-[24px]">
              <li className="marker:text-primary">
                <a
                  href="https://support.google.com/chrome/answer/95647#zippy=%2Callow-or-block-cookies"
                  className="text-blue-600 hover:underline"
                >
                  Chrome
                </a>
              </li>
              <li className="marker:text-primary">
                <a
                  href="https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d"
                  className="text-blue-600 hover:underline"
                >
                  Internet Explorer
                </a>
              </li>
              <li className="marker:text-primary">
                <a
                  href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop"
                  className="text-blue-600 hover:underline"
                >
                  Firefox
                </a>
              </li>
              <li className="marker:text-primary">
                <a
                  href="https://support.apple.com/en-us/HT201265"
                  className="text-blue-600 hover:underline"
                >
                  Safari
                </a>
              </li>
              <li className="marker:text-primary">
                <a
                  href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                  className="text-blue-600 hover:underline"
                >
                  Edge
                </a>
              </li>
              <li className="marker:text-primary">
                <a
                  href="https://help.opera.com/en/latest/web-preferences/"
                  className="text-blue-600 hover:underline"
                >
                  Opera
                </a>
              </li>
            </ul>

            <p className="mt-4">
              In addition, most advertising networks offer you a way to opt out of targeted
              advertising. If you would like to find out more information, please visit:
            </p>

            <ul className="mt-[8px] list-disc space-y-1 pl-[24px]">
              <li className="marker:text-primary">
                <a
                  href="http://www.aboutads.info/choices/"
                  className="text-blue-600 hover:underline"
                >
                  Digital Advertising Alliance
                </a>
              </li>
              <li className="marker:text-primary">
                <a href="https://youronlinechoices.eu/" className="text-blue-600 hover:underline">
                  European Interactive Digital Advertising Alliance
                </a>
              </li>
            </ul>

            <h3 className="mt-[24px] text-[16px] font-semibold md:text-[18px]">
              What about other tracking technologies, like web beacons?
            </h3>

            <p>
              Cookies are not the only way to recognize or track visitors to a website. We may use
              other, similar technologies from time to time, like web beacons (sometimes called
              &quot;tracking pixels&quot; or &quot;clear gifs&quot;). These are tiny graphics files
              that contain a unique identifier that enable us to recognize when someone has visited
              our Websites or opened an e-mail including them. This allows us, for example, to
              monitor the traffic patterns of users from one page within a website to another, to
              deliver or communicate with cookies, to understand whether you have come to the
              website from an online advertisement displayed on a third-party website, to improve
              site performance, and to measure the success of e-mail marketing campaigns. In many
              instances, these technologies are reliant on cookies to function properly, and so
              declining cookies will impair their functioning.
            </p>

            <h3 className="mt-[24px] text-[16px] font-semibold md:text-[18px]">
              Do you use Flash cookies or Local Shared Objects?
            </h3>

            <p>
              Websites may also use so-called &quot;Flash Cookies&quot; (also known as Local Shared
              Objects or &quot;LSOs&quot;) to, among other things, collect and store information
              about your use of our services, fraud prevention and for other site operations.
            </p>

            <p>
              If you do not want Flash Cookies stored on your computer, you can adjust the settings
              of your Flash player to block Flash Cookies storage using the tools contained in the{" "}
              <a
                href="http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager07.html"
                className="text-blue-600 hover:underline"
              >
                Website Storage Settings Panel
              </a>
              . You can also control Flash Cookies by going to the{" "}
              <a
                href="http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager03.html"
                className="text-blue-600 hover:underline"
              >
                Global Storage Settings Panel
              </a>{" "}
              and following the instructions (which may include instructions that explain, for
              example, how to delete existing Flash Cookies (referred to &quot;information&quot; on
              the Macromedia site), how to prevent Flash LSOs from being placed on your computer
              without your being asked, and (for Flash Player 8 and later) how to block Flash
              Cookies that are not being delivered by the operator of the page you are on at the
              time).
            </p>

            <p>
              Please note that setting the Flash Player to restrict or limit acceptance of Flash
              Cookies may reduce or impede the functionality of some Flash applications, including,
              potentially, Flash applications used in connection with our services or online
              content.
            </p>

            <h3 className="mt-[24px] text-[16px] font-semibold md:text-[18px]">
              Do you serve targeted advertising?
            </h3>

            <p>
              Third parties may serve cookies on your computer or mobile device to serve advertising
              through our Websites. These companies may use information about your visits to this
              and other websites in order to provide relevant advertisements about goods and
              services that you may be interested in. They may also employ technology that is used
              to measure the effectiveness of advertisements. This can be accomplished by them using
              cookies or web beacons to collect information about your visits to this and other
              sites in order to provide relevant advertisements about goods and services of
              potential interest to you. The information collected through this process does not
              enable us or them to identify your name, contact details or other details that
              directly identify you unless you choose to provide these.
            </p>

            <h3 className="mt-[24px] text-[16px] font-semibold md:text-[18px]">
              How often will you update this Cookie Policy?
            </h3>

            <p>
              We may update this Cookie Policy from time to time in order to reflect, for example,
              changes to the cookies we use or for other operational, legal or regulatory reasons.
              Please therefore re-visit this Cookie Policy regularly to stay informed about our use
              of cookies and related technologies.
            </p>

            <p>The date at the top of this Cookie Policy indicates when it was last updated.</p>

            <h3 className="mt-[24px] text-[16px] font-semibold md:text-[18px]">
              Where can I get further information?
            </h3>

            <p>
              If you have any questions about our use of cookies or other technologies, please email
              us at{" "}
              <a href="mailto:privacy@tailortech.com" className="text-blue-600 hover:underline">
                privacy@tailortech.com
              </a>{" "}
              or by post to:
            </p>

            <p className="mt-2">
              TailorTech Limited
              <br />
              [Your Address]
              <br />
              [City, State, Zip]
              <br />
              Bangladesh
            </p>
          </div>
        </div>

        {/* Bengali Cookie Policy */}
        <div className="bg-white">
          <Heading>কুকি নীতি</Heading>

          <div className="space-y-[16px] p-[16px] text-[12px] md:text-[16px]">
            <p>
              এই কুকি নীতি ব্যাখ্যা করে কিভাবে টেইলরটেক লিমিটেড (&quot;কোম্পানি&quot;,
              &quot;আমরা&quot;, &quot;আমাদের&quot; এবং &quot;আমাদের&quot;) কুকিজ এবং অনুরূপ
              প্রযুক্তি ব্যবহার করে আপনাকে ওয়েবসাইটগুলিতে{" "}
              <Link href="/" className="text-blue-600 hover:underline">
                http://tailortech.com
              </Link>
              , (&quot;ওয়েবসাইট&quot;) দেখালে আপনাকে চিনতে। এটি ব্যাখ্যা করে যে এই প্রযুক্তি কী এবং
              কেন আমরা ব্যবহার করি, সেইসাথে তাদের ব্যবহার নিয়ন্ত্রণ করার জন্য আপনার কী কী অধিকার
              আছে।
            </p>

            <p>
              উদাহরণ কিছু ক্ষেত্রে আমরা ব্যক্তিগত তথ্য সংগ্রহের জন্য কুকিজ ব্যবহার করতে পারি, অথবা
              আমরা এটিকে অন্যান্য তথ্যের সাথে একত্রিত করি তবে সেটি আমাদের ব্যক্তিগত তথ্য হয়ে যাবে।
            </p>

            <h3 className="mt-[24px] text-[16px] font-semibold md:text-[18px]">কুকিজ কি?</h3>

            <p>
              কুকিজ হল ছোট ডেটা ফাইল যা আপনার কম্পিউটার বা মোবাইল ডিভাইসে রাখা হয় যখন আপনি কোনো
              ওয়েবসাইট পরিদর্শন করেন। কুকি-গুলি ওয়েবসাইট মালিকদের দ্বারা তাদের ওয়েবসাইটগুলিকে কাজ
              করার জন্য, বা আরও দক্ষতার সাথে কাজ করার পাশাপাশি রিপোর্টিং তথ্য প্রদানের জন্য
              ব্যাপকভাবে ব্যবহৃত হয়।
            </p>

            <p>
              ওয়েবসাইটের মালিক দ্বারা সেট করা কুকি (এই ক্ষেত্রে, টেইলরটেক লিমিটেড) কে &quot;প্রথম
              পক্ষের কুকিজ&quot; বলা হয়। ওয়েবসাইটের মালিক ছাড়া অন্য পক্ষ দ্বারা সেট করা
              কুকিজগুলিকে &quot;তৃতীয় পক্ষের কুকিজ&quot; বলা হয়। তৃতীয় পক্ষের কুকিজগুলি
              ওয়েবসাইটের এর মাধ্যমে তৃতীয় পক্ষের বৈশিষ্ট্য বা কার্যকারিতা প্রদান করতে সক্ষম করে
              (যেমন বিজ্ঞাপন, ইন্টারেক্টিভ সামগ্রী এবং বিশ্লেষণ)। যে পক্ষগুলি এই তৃতীয় পক্ষের
              কুকিজগুলি সেট করে তারা আপনার কম্পিউটারকে চিনতে পারে যখন এটি প্রশ্ন করা ওয়েবসাইটটি
              পরিদর্শন করে এবং যখন এটি কিছু নির্দিষ্ট ওয়েবসাইট পরিদর্শন করে।
            </p>

            <h3 className="mt-[24px] text-[16px] font-semibold md:text-[18px]">
              কেন কুকিজ ব্যবহার করা হয়?
            </h3>

            <p>
              আমরা বিভিন্ন কারণে প্রথম এবং তৃতীয় পক্ষের কুকি ব্যবহার করি। আমাদের ওয়েবসাইটগুলি
              পরিচালনা করার জন্য প্রযুক্তিগত কারণে কিছু কুকিজ প্রয়োজন হয় এবং আমরা এগুলিকে
              &quot;অপরিহার্য&quot; বা &quot;কঠোরভাবে প্রয়োজনীয়&quot; কুকিজ হিসাবে উল্লেখ করি।
              অন্যান্য কুকিজগুলি আমাদের অনলাইন প্রপার্টিজ অভিজ্ঞতা বাড়াতে আমাদের ব্যবহারকারীদের
              আগ্রহগুলিকে ট্র্যাক করতে এবং লক্ষ্য করতে সক্ষম করে। তৃতীয় পক্ষগুলি বিজ্ঞাপন, বিশ্লেষণ
              এবং অন্যান্য উদ্দেশ্যে আমাদের ওয়েবসাইটের মাধ্যমে কুকিজ পরিবেশন করে। এটি নীচে আরও
              বিস্তারে বর্ণনা করা হয়েছে।
            </p>

            <h3 className="mt-[24px] text-[16px] font-semibold md:text-[18px]">
              আমাদের ওয়েবসাইটগুলির মাধ্যমে পরিবেশিত প্রথম এবং তৃতীয় পক্ষের কুকিজের নির্দিষ্ট ধরণের
              এবং তারা যে উদ্দেশ্যগুলি সম্পাদন করে সেগুলি নীচে বর্ণনা করা হয়েছে (দয়া করে মনে
              রাখবেন যে নির্দিষ্ট কুকিজগুলি আপনার দ্বারা নির্দিষ্ট অনলাইন কার্যকলাপ উপর নির্ভর করে
              পরিবর্তিত হতে পারে):
            </h3>

            <div className="mt-[16px] space-y-[16px]">
              <div>
                <h4 className="font-medium">অপরিহার্য ওয়েবসাইট কুকিজ:</h4>
                <p>
                  এই কুকিজগুলি আপনাকে আমাদের ওয়েবসাইটগুলির মাধ্যমে পরিষেবাগুলি প্রদান করতে এবং এর
                  কিছু বৈশিষ্ট্য ব্যবহার করতে কঠোরভাবে প্রয়োজনীয়, যেমন সুরক্ষিত এলাকায় অ্যাক্সেস।
                  যেহেতু এই কুকিজগুলি ওয়েবসাইটগুলি সরবরাহ করার জন্য কঠোরভাবে প্রয়োজনীয়, আপনি
                  আমাদের ওয়েবসাইটগুলি কীভাবে কাজ করে তা প্রভাবিত না করে এগুলি প্রত্যাখ্যান করতে
                  পারবেন না।
                </p>
              </div>

              <div>
                <h4 className="font-medium">পারফরম্যান্স এবং কার্যকারিতা কুকিজ:</h4>
                <p>
                  এই কুকিজগুলি আমাদের ওয়েবসাইটগুলির পারফরম্যান্স এবং কার্যকারিতা বাড়াতে ব্যবহৃত
                  হয় তবে এগুলি তাদের ব্যবহারের জন্য অপরিহার্য নয়। যাইহোক, এই কুকিজগুলি ছাড়া,
                  নির্দিষ্ট কার্যকারিতা অনুপলব্ধ হতে পারে।
                </p>
              </div>

              <div>
                <h4 className="font-medium">বিশ্লেষণ এবং কাস্টমাইজেশন কুকিজ:</h4>
                <p>
                  এই কুকিজগুলি তথ্য সংগ্রহ করে যা আমাদের ওয়েবসাইটগুলি কীভাবে ব্যবহার করা হচ্ছে বা
                  আমাদের মার্কেটিং প্রচারগুলি কতটা কার্যকর তা বুঝতে সাহায্য করতে সমষ্টিগত আকারে
                  ব্যবহৃত হয়, অথবা আপনার অভিজ্ঞতা বাড়ানোর জন্য আমাদের ওয়েবসাইটগুলি আপনার জন্য
                  কাস্টমাইজ করতে আমাদের সাহায্য করে। তারা আমাদের বুঝতে সাহায্য করে কোন পৃষ্ঠাগুলি
                  সবচেয়ে বেশি এবং কম জনপ্রিয় এবং দেখুন কিভাবে দর্শকরা সাইটের চারপাশে চলাফেরা করে।
                </p>
              </div>

              <div>
                <h4 className="font-medium">বিজ্ঞাপন কুকিজ:</h4>
                <p>
                  এই কুকিজগুলি আপনার এবং আপনার আগ্রহের জন্য বিজ্ঞাপন বার্তাগুলিকে আরও প্রাসঙ্গিক
                  করতে ব্যবহৃত হয়। তারা একই বিজ্ঞাপন ক্রমাগত পুনরায় প্রদর্শিত হওয়া থেকে প্রতিরোধ
                  করা, বিজ্ঞাপনগুলি সঠিকভাবে প্রদর্শিত হচ্ছে তা নিশ্চিত করা এবং কিছু ক্ষেত্রে আপনার
                  আগ্রহের উপর ভিত্তি করে বিজ্ঞাপন নির্বাচন করার মতো ফাংশন সম্পাদন করে। তারা মনে রাখে
                  যে আপনি একটি ওয়েবসাইট পরিদর্শন করেছেন এবং এই তথ্য বিজ্ঞাপনদাতাদের মতো অন্যান্য
                  সংস্থার সাথে ভাগ করা হয়।
                </p>
              </div>

              <div>
                <h4 className="font-medium">সামাজিক নেটওয়ার্কিং কুকিজ:</h4>
                <p>
                  এই কুকিজগুলি আপনাকে তৃতীয়-পক্ষের সামাজিক নেটওয়ার্কিং এবং অন্যান্য ওয়েবসাইটগুলির
                  মাধ্যমে আমাদের ওয়েবসাইটগুলিতে আপনি আকর্ষণীয় মনে করেন এমন পৃষ্ঠা এবং সামগ্রী
                  শেয়ার করতে সক্ষম করতে ব্যবহৃত হয়। এই কুকিজগুলি বিজ্ঞাপনের উদ্দেশ্যেও ব্যবহার করা
                  যেতে পারে।
                </p>
              </div>
            </div>

            <h3 className="mt-[24px] text-[16px] font-semibold md:text-[18px]">
              কিভাবে কুকি নিয়ন্ত্রণ করা যায়?
            </h3>

            <p>
              কুকিজ গ্রহণ বা প্রত্যাখ্যান করার সিদ্ধান্ত নেওয়ার অধিকার আপনার আছে। আপনি কুকি কনসেন্ট
              ম্যানেজারে আপনার পছন্দগুলি সেট করে আপনার কুকি অধিকারগুলো জানাতে পারেন। কুকি কনসেন্ট
              ম্যানেজার আপনাকে কুকির কোন বিভাগ গ্রহণ বা প্রত্যাখ্যান করার অনুমতি দেয়। অপরিহার্য
              কুকিজগুলি প্রত্যাখ্যান করা যাবে না কারণ এগুলি আপনাকে পরিষেবা প্রদানের জন্য কঠোরভাবে
              প্রয়োজনীয়।
            </p>

            <p>
              কুকি কনসেন্ট ম্যানেজার বিজ্ঞপ্তি ব্যানার এবং আমাদের ওয়েবসাইটে পাওয়া যেতে পারে। যদি
              আপনি কুকিজ প্রত্যাখ্যান করার সিদ্ধান্ত নেন, আপনি এখনও আমাদের ওয়েবসাইট ব্যবহার করতে
              পারেন যদিও আমাদের ওয়েবসাইটের কিছু কার্যকারিতা এবং এলাকায় আপনার অ্যাক্সেস সীমিত হতে
              পারে। আপনি আপনার ওয়েব ব্রাউজার নিয়ন্ত্রণগুলিও সেট বা সংশোধন করতে পারেন কুকিজ গ্রহণ
              বা প্রত্যাখ্যান করতে।
            </p>

            <p>
              আমাদের ওয়েবসাইটগুলির মাধ্যমে পরিবেশিত প্রথম এবং তৃতীয় পক্ষের কুকিজের নির্দিষ্ট ধরণের
              এবং তারা যে উদ্দেশ্যগুলি সম্পাদন করে সেগুলি নীচে টেবিলে বর্ণনা করা হয়েছে (দয়া করে
              মনে রাখবেন যে নির্দিষ্ট কুকিজগুলি আপনার দ্বারা নির্দিষ্ট অনলাইন কার্যকলাপ উপর নির্ভর
              করে পরিবর্তিত হতে পারে):
            </p>

            <div className="mt-[16px] rounded-md border border-border-main p-[16px]">
              <h4 className="font-medium">অপরিহার্য ওয়েবসাইট কুকিজ:</h4>
              <p className="mt-2">নাম: সেশন</p>
              <p>উদ্দেশ্য: সার্ভার দ্বারা একটি বেনামী ব্যবহারকারী সেশন বজায় রাখতে ব্যবহৃত হয়।</p>
              <p>প্রদানকারী: tailortech.com</p>
              <p>পরিষেবা: অপরিহার্য ওয়েবসাইট পরিষেবা</p>
              <p>মেয়াদ: সেশন</p>
            </div>

            <h3 className="mt-[24px] text-[16px] font-semibold md:text-[18px]">
              আমি কিভাবে আমার ব্রাউজারে কুকিজ নিয়ন্ত্রণ করতে পারি?
            </h3>

            <p>
              যেহেতু আপনার ওয়েব ব্রাউজার নিয়ন্ত্রণের মাধ্যমে আপনি যে উপায়ে কুকিজ প্রত্যাখ্যান
              করতে পারেন তা ব্রাউজার-থেকে-ব্রাউজারে পরিবর্তিত হয়, আপনার আরও তথ্যের জন্য আপনার
              ব্রাউজারের সাহায্য মেনু দেখা উচিত। নিম্নলিখিত হল সবচেয়ে জনপ্রিয় ব্রাউজারগুলিতে কুকিজ
              পরিচালনা করার সম্পর্কে তথ্য:
            </p>

            <ul className="mt-[8px] list-disc space-y-1 pl-[24px]">
              <li className="marker:text-primary">
                <a
                  href="https://support.google.com/chrome/answer/95647#zippy=%2Callow-or-block-cookies"
                  className="text-blue-600 hover:underline"
                >
                  Chrome
                </a>
              </li>
              <li className="marker:text-primary">
                <a
                  href="https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d"
                  className="text-blue-600 hover:underline"
                >
                  Internet Explorer
                </a>
              </li>
              <li className="marker:text-primary">
                <a
                  href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop"
                  className="text-blue-600 hover:underline"
                >
                  Firefox
                </a>
              </li>
              <li className="marker:text-primary">
                <a
                  href="https://support.apple.com/en-us/HT201265"
                  className="text-blue-600 hover:underline"
                >
                  Safari
                </a>
              </li>
              <li className="marker:text-primary">
                <a
                  href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                  className="text-blue-600 hover:underline"
                >
                  Edge
                </a>
              </li>
              <li className="marker:text-primary">
                <a
                  href="https://help.opera.com/en/latest/web-preferences/"
                  className="text-blue-600 hover:underline"
                >
                  Opera
                </a>
              </li>
            </ul>

            <p className="mt-4">
              উপরন্তু, বেশিরভাগ বিজ্ঞাপন নেটওয়ার্ক আপনাকে লক্ষ্যযুক্ত বিজ্ঞাপন থেকে অপ্ট আউট করার
              একটি উপায় অফার করে। যদি আপনি আরও তথ্য খুঁজে পেতে চান, দয়া করে দেখুন:
            </p>

            <ul className="mt-[8px] list-disc space-y-1 pl-[24px]">
              <li className="marker:text-primary">
                <a
                  href="http://www.aboutads.info/choices/"
                  className="text-blue-600 hover:underline"
                >
                  Digital Advertising Alliance
                </a>
              </li>
              <li className="marker:text-primary">
                <a href="https://youronlinechoices.eu/" className="text-blue-600 hover:underline">
                  European Interactive Digital Advertising Alliance
                </a>
              </li>
            </ul>
            <h3 className="mt-[24px] text-[16px] font-semibold md:text-[18px]">
              আপনি ফ্ল্যাশ কুকিজ বা লোকাল শেয়ার্ড অবজেক্ট ব্যবহার করেন কি?
            </h3>

            <p>
              ওয়েবসাইটগুলি &quot;ফ্ল্যাশ কুকিজ&quot; (যাকে লোকাল শেয়ার্ড অবজেক্ট বা
              &quot;এলএসও&quot; নামেও পরিচিত) ব্যবহার করতে পারে, আমাদের পরিষেবাগুলির ব্যবহার
              সম্পর্কে তথ্য সংগ্রহ ও সংরক্ষণ, জালিয়াতি প্রতিরোধ এবং অন্যান্য সাইট অপারেশনের জন্য।
            </p>

            <p>
              আপনি যদি আপনার কম্পিউটারে ফ্ল্যাশ কুকিজ সংরক্ষণ করতে না চান, তাহলে আপনি আপনার ফ্ল্যাশ
              প্লেয়ারের সেটিংস সামঞ্জস্য করে{" "}
              <a
                href="http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager07.html"
                className="text-blue-600 hover:underline"
              >
                ওয়েবসাইট স্টোরেজ সেটিংস প্যানেল
              </a>{" "}
              ব্যবহার করে ফ্ল্যাশ কুকিজ স্টোরেজ ব্লক করতে পারেন। আপনি{" "}
              <a
                href="http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager03.html"
                className="text-blue-600 hover:underline"
              >
                গ্লোবাল স্টোরেজ সেটিংস প্যানেল
              </a>{" "}
              এ গিয়েও ফ্ল্যাশ কুকিজ নিয়ন্ত্রণ করতে পারেন এবং নির্দেশাবলী অনুসরণ করতে পারেন (যাতে
              উদাহরণস্বরূপ, বিদ্যমান ফ্ল্যাশ কুকিজ কীভাবে মুছতে হয় (ম্যাক্রোমিডিয়া সাইটে
              &quot;তথ্য&quot; হিসাবে উল্লেখ করা হয়েছে), কীভাবে আপনার অনুমতি ছাড়াই আপনার
              কম্পিউটারে ফ্ল্যাশ এলএসও স্থাপন করা থেকে প্রতিরোধ করতে হয় এবং (ফ্ল্যাশ প্লেয়ার 8 এবং
              পরবর্তী সংস্করণের জন্য) আপনি যে পৃষ্ঠায় আছেন সেই পৃষ্ঠার অপারেটর দ্বারা প্রদত্ত নয়
              এমন ফ্ল্যাশ কুকিজ কীভাবে ব্লক করতে হয় তার নির্দেশাবলী অন্তর্ভুক্ত থাকতে পারে)।
            </p>

            <p>
              দয়া করে মনে রাখবেন যে ফ্ল্যাশ প্লেয়ারকে ফ্ল্যাশ কুকিজ গ্রহণ সীমাবদ্ধ বা সীমিত করতে
              সেট করা হলে কিছু ফ্ল্যাশ অ্যাপ্লিকেশনের কার্যকারিতা হ্রাস বা বাধাগ্রস্ত হতে পারে, যার
              মধ্যে সম্ভাব্যভাবে আমাদের পরিষেবা বা অনলাইন কন্টেন্টের সাথে ব্যবহৃত ফ্ল্যাশ
              অ্যাপ্লিকেশনগুলি অন্তর্ভুক্ত থাকতে পারে।
            </p>

            <h3 className="mt-[24px] text-[16px] font-semibold md:text-[18px]">
              আপনি কি টার্গেটেড বিজ্ঞাপন পরিবেশন করেন?
            </h3>

            <p>
              তৃতীয় পক্ষগুলি আমাদের ওয়েবসাইটের মাধ্যমে বিজ্ঞাপন পরিবেশন করার জন্য আপনার কম্পিউটার
              বা মোবাইল ডিভাইসে কুকিজ পরিবেশন করতে পারে। এই কোম্পানিগুলি আপনার এই এবং অন্যান্য
              ওয়েবসাইটে ভিজিট সম্পর্কে তথ্য ব্যবহার করে আপনার আগ্রহী হতে পারেন এমন পণ্য ও পরিষেবা
              সম্পর্কে প্রাসঙ্গিক বিজ্ঞাপন প্রদান করতে পারে। তারা এমন প্রযুক্তিও ব্যবহার করতে পারে
              যা বিজ্ঞাপনের কার্যকারিতা পরিমাপ করতে ব্যবহৃত হয়। এটি তারা কুকিজ বা ওয়েব বীকন
              ব্যবহার করে আপনার এই এবং অন্যান্য সাইটে ভিজিট সম্পর্কে তথ্য সংগ্রহ করে আপনার সম্ভাব্য
              আগ্রহের পণ্য ও পরিষেবা সম্পর্কে প্রাসঙ্গিক বিজ্ঞাপন প্রদান করে সম্পাদন করতে পারে। এই
              প্রক্রিয়ার মাধ্যমে সংগৃহীত তথ্য আমাদের বা তাদেরকে আপনার নাম, যোগাযোগের বিবরণ বা
              অন্যান্য বিবরণ সরাসরি শনাক্ত করতে সক্ষম করে না যতক্ষণ না আপনি এগুলি প্রদান করতে চান।
            </p>

            <h3 className="mt-[24px] text-[16px] font-semibold md:text-[18px]">
              আপনি কত ঘন ঘন এই কুকি নীতি আপডেট করবেন?
            </h3>

            <p>
              আমরা এই কুকি নীতিকে সময়ে সময়ে আপডেট করতে পারি, উদাহরণস্বরূপ, আমরা যে কুকিজ ব্যবহার
              করি তাতে পরিবর্তন বা অন্যান্য কার্যকরী, আইনি বা নিয়ন্ত্রক কারণে। তাই দয়া করে নিয়মিত
              এই কুকি নীতি পুনরায় দেখুন যাতে কুকিজ এবং সম্পর্কিত প্রযুক্তির ব্যবহার সম্পর্কে অবগত
              থাকতে পারেন।
            </p>

            <p>এই কুকি নীতির শীর্ষে তারিখটি নির্দেশ করে যে এটি সর্বশেষ কখন আপডেট করা হয়েছিল।</p>

            <h3 className="mt-[24px] text-[16px] font-semibold md:text-[18px]">
              আমি আরও তথ্য কোথায় পেতে পারি?
            </h3>

            <p>
              যদি কুকিজ বা অন্যান্য প্রযুক্তি ব্যবহার সম্পর্কে আপনার কোন প্রশ্ন থাকে, অনুগ্রহ করে
              আমাদের ইমেইল করুন{" "}
              <a href="mailto:privacy@tailortech.com" className="text-blue-600 hover:underline">
                privacy@tailortech.com
              </a>{" "}
              এ বা পত্র দ্বারা নিচের ঠিকানায়:
            </p>

            <p className="mt-2">
              টেইলরটেক লিমিটেড
              <br />
              [আপনার ঠিকানা]
              <br />
              [শহর, রাজ্য, জিপ কোড]
              <br />
              বাংলাদেশ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;
