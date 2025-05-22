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
              Welcome to TailorTech. We respect your privacy and are committed to protecting your
              personal data. This privacy policy will inform you about how we look after your
              personal data when you visit our website and tell you about your privacy rights and
              how the law protects you.
            </p>
            <p className="text-[12px] font-semibold md:text-[15px]">
              Please read this privacy policy carefully before using our services or submitting any
              personal information to us.
            </p>
          </section>

          <section>
            <h3 className="mb-[12px] text-[15px] font-semibold md:text-[21px]">
              1. Important Information and Who We Are
            </h3>
            <p className="mb-[16px] text-[12px] md:text-[15px]">
              TailorTech operates this website and is responsible for your personal data (referred
              to as &quot;we&quot;, &quot;us&quot;, or &quot;our&quot; in this privacy policy).
            </p>

            <p className="mb-[16px] text-[12px] md:text-[15px]">
              If you have any questions about this privacy policy or our privacy practices, please
              contact us at:
            </p>
            <p className="text-[12px] md:text-[15px]">
              Email: privacy@tailortech.com
              <br />
              Postal address: [Your Company Address]
              <br />
              Telephone number: [Your Contact Number]
            </p>
          </section>

          <section>
            <h3 className="mb-[12px] text-[15px] font-semibold md:text-[21px]">
              2. The Data We Collect About You
            </h3>
            <p className="mb-[16px] text-[12px] md:text-[15px]">
              Personal data means any information about an individual from which that person can be
              identified. We may collect, use, store, and transfer different kinds of personal data
              about you, which we have grouped together as follows:
            </p>
            <ul className="list-disc space-y-[8px] pl-[24px]">
              <li className="text-[12px] marker:text-primary md:text-[15px]">
                <span className="font-medium">Identity Data:</span> Includes first name, last name,
                username or similar identifier, title, date of birth, and gender.
              </li>
              <li className="text-[12px] marker:text-primary md:text-[15px]">
                <span className="font-medium">Contact Data:</span> Includes billing address,
                delivery address, email address, and telephone numbers.
              </li>
              <li className="text-[12px] marker:text-primary md:text-[15px]">
                <span className="font-medium">Financial Data:</span> Includes payment card details
                (though we do not store complete payment information on our servers).
              </li>
              <li className="text-[12px] marker:text-primary md:text-[15px]">
                <span className="font-medium">Transaction Data:</span> Includes details about
                payments to and from you and other details of products you have purchased from us.
              </li>
              <li className="text-[12px] marker:text-primary md:text-[15px]">
                <span className="font-medium">Technical Data:</span> Includes internet protocol (IP)
                address, your login data, browser type and version, time zone setting and location,
                browser plug-in types and versions, operating system and platform, and other
                technology on the devices you use to access this website.
              </li>
              <li className="text-[12px] marker:text-primary md:text-[15px]">
                <span className="font-medium">Profile Data:</span> Includes your username and
                password, purchases or orders made by you, your interests, preferences, feedback,
                and survey responses.
              </li>
              <li className="text-[12px] marker:text-primary md:text-[15px]">
                <span className="font-medium">Usage Data:</span> Includes information about how you
                use our website and services.
              </li>
              <li className="text-[12px] marker:text-primary md:text-[15px]">
                <span className="font-medium">Marketing and Communications Data:</span> Includes
                your preferences in receiving marketing from us and our third parties and your
                communication preferences.
              </li>
              <li className="text-[12px] marker:text-primary md:text-[15px]">
                <span className="font-medium">Body Measurements:</span> For our tailoring services,
                we may collect specific body measurements to provide custom-fitted garments.
              </li>
            </ul>
            <p className="mt-4 text-[12px] md:text-[15px]">
              We also collect, use, and share Aggregated Data such as statistical or demographic
              data. Aggregated Data could be derived from your personal data but is not considered
              personal data in law as this data will not directly or indirectly reveal your
              identity.
            </p>
          </section>

          <section>
            <h3 className="mb-[12px] text-[15px] font-semibold md:text-[21px]">
              3. How We Collect Your Personal Data
            </h3>
            <p className="mb-[16px] text-[12px] md:text-[15px]">
              We use different methods to collect data from and about you including through:
            </p>
            <ul className="list-disc space-y-[8px] pl-[24px]">
              <li className="text-[12px] marker:text-primary md:text-[15px]">
                <span className="font-medium">Direct interactions:</span> You may give us your
                Identity, Contact, and Financial Data by filling in forms or by corresponding with
                us by post, phone, email, or otherwise.
              </li>
              <li className="text-[12px] marker:text-primary md:text-[15px]">
                <span className="font-medium">Automated technologies or interactions:</span> As you
                interact with our website, we will automatically collect Technical Data about your
                equipment, browsing actions, and patterns.
              </li>
              <li className="text-[12px] marker:text-primary md:text-[15px]">
                <span className="font-medium">Third parties or publicly available sources:</span> We
                may receive personal data about you from various third parties and public sources,
                such as analytics providers, advertising networks, and search information providers.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="mb-[12px] text-[15px] font-semibold md:text-[21px]">
              4. How We Use Your Personal Data
            </h3>
            <p className="mb-[16px] text-[12px] md:text-[15px]">
              We will only use your personal data when the law allows us to. Most commonly, we will
              use your personal data in the following circumstances:
            </p>
            <ul className="list-disc space-y-[8px] pl-[24px]">
              <li className="text-[12px] marker:text-primary md:text-[15px]">
                Where we need to perform the contract we are about to enter into or have entered
                into with you.
              </li>
              <li className="text-[12px] marker:text-primary md:text-[15px]">
                Where it is necessary for our legitimate interests (or those of a third party) and
                your interests and fundamental rights do not override those interests.
              </li>
              <li className="text-[12px] marker:text-primary md:text-[15px]">
                Where we need to comply with a legal obligation.
              </li>
              <li className="text-[12px] marker:text-primary md:text-[15px]">With your consent.</li>
            </ul>
            <p className="mt-4 mb-[16px]">Purposes for which we will use your personal data:</p>
            <ul className="list-disc space-y-[8px] pl-[24px]">
              <li className="text-[12px] marker:text-primary md:text-[15px]">
                To register you as a new customer
              </li>
              <li className="text-[12px] marker:text-primary md:text-[15px]">
                To process and deliver your order
              </li>
              <li className="text-[12px] marker:text-primary md:text-[15px]">
                To manage your relationship with us
              </li>
              <li className="text-[12px] marker:text-primary md:text-[15px]">
                To enable you to participate in a promotion or survey
              </li>
              <li className="text-[12px] marker:text-primary md:text-[15px]">
                To administer and protect our business and this website
              </li>
              <li className="text-[12px] marker:text-primary md:text-[15px]">
                To deliver relevant website content and advertisements to you
              </li>
              <li className="text-[12px] marker:text-primary md:text-[15px]">
                To use data analytics to improve our website, products/services, marketing, customer
                relationships, and experiences
              </li>
              <li className="text-[12px] marker:text-primary md:text-[15px]">
                To make suggestions and recommendations to you about goods or services that may be
                of interest to you
              </li>
              <li className="text-[12px] marker:text-primary md:text-[15px]">
                To provide custom tailoring services based on your measurements
              </li>
            </ul>
          </section>

          <section>
            <h3 className="mb-[12px] text-[15px] font-semibold md:text-[21px]">
              5. Disclosures of Your Personal Data
            </h3>
            <p className="mb-[16px] text-[12px] md:text-[15px]">
              We may share your personal data with the parties set out below for the purposes stated
              in this privacy policy:
            </p>
            <ul className="list-disc space-y-[8px] pl-[24px]">
              <li className="text-[12px] marker:text-primary md:text-[15px]">
                Service providers who provide IT and system administration services.
              </li>
              <li className="text-[12px] marker:text-primary md:text-[15px]">
                Professional advisers including lawyers, bankers, auditors, and insurers.
              </li>
              <li className="text-[12px] marker:text-primary md:text-[15px]">
                Regulators and other authorities who require reporting of processing activities in
                certain circumstances.
              </li>
              <li className="text-[12px] marker:text-primary md:text-[15px]">
                Third parties to whom we may choose to sell, transfer, or merge parts of our
                business or our assets.
              </li>
              <li className="text-[12px] marker:text-primary md:text-[15px]">
                Payment processors to securely process your payment transactions.
              </li>
              <li className="text-[12px] marker:text-primary md:text-[15px]">
                Delivery and logistics providers to fulfill your orders.
              </li>
            </ul>
            <p className="mt-4 text-[12px] md:text-[15px]">
              We require all third parties to respect the security of your personal data and to
              treat it in accordance with the law. We do not allow our third-party service providers
              to use your personal data for their own purposes and only permit them to process your
              personal data for specified purposes and in accordance with our instructions.
            </p>
          </section>

          <section>
            <h3 className="mb-[12px] text-[15px] font-semibold md:text-[21px]">
              6. Cookies and Similar Technologies
            </h3>
            <p className="mb-[16px] text-[12px] md:text-[15px]">
              Our website uses cookies and similar tracking technologies to distinguish you from
              other users of our website. This helps us to provide you with a good experience when
              you browse our website and also allows us to improve our site.
            </p>
            <p className="text-[12px] md:text-[15px]">
              You can set your browser to refuse all or some browser cookies, or to alert you when
              websites set or access cookies. If you disable or refuse cookies, please note that
              some parts of this website may become inaccessible or not function properly.
            </p>
          </section>

          <section>
            <h3 className="mb-[12px] text-[15px] font-semibold md:text-[21px]">7. Data Security</h3>
            <p className="mb-[16px] text-[12px] md:text-[15px]">
              We have put in place appropriate security measures to prevent your personal data from
              being accidentally lost, used, or accessed in an unauthorized way, altered, or
              disclosed. In addition, we limit access to your personal data to those employees,
              agents, contractors, and other third parties who have a business need to know.
            </p>
            <p className="text-[12px] md:text-[15px]">
              We have put in place procedures to deal with any suspected personal data breach and
              will notify you and any applicable regulator of a breach where we are legally required
              to do so.
            </p>
          </section>

          <section>
            <h3 className="mb-[12px] text-[15px] font-semibold md:text-[21px]">
              8. Data Retention
            </h3>
            <p className="text-[12px] md:text-[15px]">
              We will only retain your personal data for as long as reasonably necessary to fulfill
              the purposes we collected it for, including for the purposes of satisfying any legal,
              regulatory, tax, accounting, or reporting requirements. We may retain your personal
              data for a longer period in the event of a complaint or if we reasonably believe there
              is a prospect of litigation in respect to our relationship with you.
            </p>
          </section>

          <section>
            <h3 className="mb-[12px] text-[15px] font-semibold md:text-[21px]">
              9. Your Legal Rights
            </h3>
            <p className="mb-[16px] text-[12px] md:text-[15px]">
              Under certain circumstances, you have rights under data protection laws in relation to
              your personal data, including the right to:
            </p>
            <ul className="list-disc space-y-[8px] pl-[24px]">
              <li className="text-[12px] marker:text-primary md:text-[15px]">
                Request access to your personal data
              </li>
              <li className="text-[12px] marker:text-primary md:text-[15px]">
                Request correction of your personal data
              </li>
              <li className="text-[12px] marker:text-primary md:text-[15px]">
                Request erasure of your personal data
              </li>
              <li className="text-[12px] marker:text-primary md:text-[15px]">
                Object to processing of your personal data
              </li>
              <li className="text-[12px] marker:text-primary md:text-[15px]">
                Request restriction of processing your personal data
              </li>
              <li className="text-[12px] marker:text-primary md:text-[15px]">
                Request transfer of your personal data
              </li>
              <li className="text-[12px] marker:text-primary md:text-[15px]">
                Right to withdraw consent
              </li>
            </ul>
            <p className="mt-4 text-[12px] md:text-[15px]">
              If you wish to exercise any of these rights, please contact us using the details
              provided in section 1.
            </p>
          </section>

          <section>
            <h3 className="mb-[12px] text-[15px] font-semibold md:text-[21px]">
              10. Children&apos;s Privacy
            </h3>
            <p className="text-[12px] md:text-[15px]">
              Our website is not intended for children under 16 years of age. We do not knowingly
              collect personal data from children under 16. If you are a parent or guardian and you
              are aware that your child has provided us with personal data, please contact us
              immediately. If we become aware that we have collected personal data from children
              without verification of parental consent, we take steps to remove that information
              from our servers.
            </p>
          </section>

          <section>
            <h3 className="mb-[12px] text-[15px] font-semibold md:text-[21px]">
              11. International Transfers
            </h3>
            <p className="text-[12px] md:text-[15px]">
              We may transfer your personal data to countries outside your country of residence.
              When we do, we ensure a similar degree of protection is afforded to it by implementing
              appropriate safeguards. Please contact us if you want further information on the
              specific mechanism used by us when transferring your personal data out of your
              country.
            </p>
          </section>

          <section>
            <h3 className="mb-[12px] text-[15px] font-semibold md:text-[21px]">
              12. Changes to This Privacy Policy
            </h3>
            <p className="text-[12px] md:text-[15px]">
              We may update our privacy policy from time to time. We will notify you of any changes
              by posting the new privacy policy on this page and updating the &quot;Last
              Updated&quot; date at the top of this policy. You are advised to review this privacy
              policy periodically for any changes. Changes to this privacy policy are effective when
              they are posted on this page.
            </p>
          </section>

          <section>
            <h3 className="mb-[12px] text-[15px] font-semibold md:text-[21px]">13. Contact Us</h3>
            <p className="text-[12px] md:text-[15px]">
              If you have any questions about this privacy policy or our privacy practices, please
              contact us at:
              <br />
              <br />
              TailorTech
              <br />
              Email: privacy@tailortech.com
              <br />
              Phone: [Your Contact Number]
              <br />
              Address: [Your Company Address]
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
