import React from "react";
import Breadcrumb from "../ui/BreadCrumbs";
import Heading from "../ui/Heading";

const PrivacyPolicy = () => {
  return (
    <div className="main_container flex min-h-[100dvh] w-full flex-col gap-[20px] py-[20px]">
      <Breadcrumb />
      <div className="bg-white p-[16px]">
        <Heading>Privacy Policy</Heading>

        <div className="mt-[32px] space-y-[24px]">
          <section>
            <p className="mb-[16px] text-[12px] md:text-[15px]">
              We are committed to protecting the privacy of our customers. This privacy policy makes
              you able to understand what information we may collect from you when you visit
              tailortechbd.com and its subpages. It also clarifies how we use such information and
              the choices you have with respect to our use of this information.
            </p>
          </section>

          <section>
            <h3 className="mb-[12px] text-[15px] font-semibold md:text-[21px]">
              What information we collect
            </h3>
            <p className="mb-[16px] text-[12px] md:text-[15px]">
              When you visit tailortechbd.com and its subpages, place an order, make a purchase,
              contact us or participate in any activities we conduct, we collect your identifiable
              information, viz.: name, email address, phone number, etc. We also maintain records of
              your history and interests to improve your shopping experience.
            </p>
          </section>

          <section>
            <h3 className="mb-[12px] text-[15px] font-semibold md:text-[21px]">
              How we use information we collect
            </h3>
            <p className="mb-[16px] text-[12px] md:text-[15px]">
              We use your identifiable information to help us learn more about your shopping
              preferences and to provide you with the best possible products and services. In this
              regard, we may share your identifiable information with third-parties that provide us
              support services or help us market Tailortech products and services. Third-parties are
              contractually prohibited from using your identifiable information in any manner other
              than helping Tailortech. We may share your personal information if necessary to comply
              with laws, government requests or to protect the rights of Tailortech.
            </p>
            <p className="mb-[16px] text-[12px] md:text-[15px]">
              We may use your identifiable information to send periodic emails to provide you with
              information and updates regarding Tailortech new arrivals, campaigns, and any other
              activities. However, if you prefer to no longer receive Tailortech emails, you can
              unsubscribe following the instructions at the bottom of each of our emails.
            </p>
          </section>

          <section>
            <h3 className="mb-[12px] text-[15px] font-semibold md:text-[21px]">
              {`Usage of "cookies`}
            </h3>
            <p className="mb-[16px] text-[12px] md:text-[15px]">
              We use {`"cookie"`} technology that allows our tailortechbd.com to recognize your
              browser, distinguish you from other customers, and enhance and personalize your online
              shopping experience. Cookies help us remember and process the items in your shopping
              cart, understand and save your preferences for future visits, and compile aggregate
              data about site traffic and site interaction so that we can improve our website
              design, products, services and campaigns. In this case also, third-parties are
              contractually prohibited from using your information of browsing history and product
              interest in any manner other than helping Tailortech.
            </p>
            <p className="mb-[16px] text-[12px] md:text-[15px]">
              If you prefer, you can change the settings on your browser to prevent cookies being
              stored. This may, however, prevent you from taking full advantage of tailortechbd.com.
            </p>
          </section>

          <section>
            <h3 className="mb-[12px] text-[15px] font-semibold md:text-[21px]">
              Third-party links
            </h3>
            <p className="mb-[16px] text-[12px] md:text-[15px]">
              tailortechbd.com may contain links to/from the websites of our parent brand, sister
              brands, partners, social media sites, and other third parties. If you follow a link to
              any of these websites, please note that they have their own privacy policies. We,
              therefore, have no responsibility or liability for the content and activities of these
              linked sites. Please check their policies before you submit any personal data on their
              websites.
            </p>
          </section>

          <section>
            <h3 className="mb-[12px] text-[15px] font-semibold md:text-[21px]">Contact Us</h3>
            <p className="text-[12px] md:text-[15px]">
              If you have any questions about this privacy policy or our privacy practices, please
              contact us at:
              <br />
              <br />
              Tailortech
              <br />
              Email: support@tailortechbd.com
              <br />
              Phone: +880 01911 696556, +880 01711 923276
              <br />
              Address: Kalshi Road, Mirpur-11, Dhaka-1216
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
