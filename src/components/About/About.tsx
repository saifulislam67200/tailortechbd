import React from "react";
import Breadcrumb from "../ui/BreadCrumbs";
import Heading from "../ui/Heading";

const About = () => {
  return (
    <div className="main_container flex min-h-[100dvh] w-full flex-col gap-[20px] py-[20px]">
      <Breadcrumb />
      <div className="bg-white p-[16px]">
        <Heading>About Us</Heading>

        <div className="mt-[32px] space-y-[24px]">
          <section>
            <h3 className="mb-[12px] text-[15px] font-semibold md:text-[21px]">Our Story</h3>
            <p className="mb-[16px] text-[12px] md:text-[15px]">
              {`Welcome to TailorTech – Where Tradition Meets Innovation. At Tilortech, we believe fashion is more than just clothing — it's a statement of identity. Our brand blends modern design with timeless comfort, offering high-quality apparel for individuals who value style, authenticity, and confidence. We also blend the timeless art of tailoring with cutting-edge fashion technology to bring you modern, perfectly fitted, and stylish apparel. Every piece is crafted with precision, comfort, and confidence in mind. TailorTech is more than a brand — it’s a movement towards smarter fashion. Join us and wear the future.`}
            </p>
            <p className="text-[12px] md:text-[15px]">
              What began as a small workshop in Dhaka has now grown into a respected name in the
              fashion industry, serving customers nationwide who value style, comfort, and
              individuality. Our journey reflects our commitment to craftsmanship, innovation, and
              customer satisfaction.
            </p>
          </section>

          <section>
            <h3 className="mb-[12px] text-[15px] font-semibold md:text-[21px]">Our Mission</h3>
            <p className="text-[12px] md:text-[15px]">
              At TailorTech, our mission is to empower individuals to express their unique identity
              through fashion that fits perfectly—both in size and personality. We strive to make
              high-quality, custom-fitted apparel accessible to everyone, blending traditional
              tailoring expertise with modern technology to create garments that make you look good
              and feel confident.
            </p>
          </section>

          <section>
            <h3 className="mb-[12px] text-[15px] font-semibold md:text-[21px]">Our Vision</h3>
            <p className="text-[12px] md:text-[15px]">
              We envision a future where fashion is smarter, more sustainable, and truly personal.
              TailorTech aims to lead the transformation of the apparel industry by pioneering
              innovative approaches to design, production, and customer experience. We&apos;re
              working toward a world where every garment is created with purpose, precision, and
              respect for both the wearer and the environment.
            </p>
          </section>

          <section>
            <h3 className="mb-[12px] text-[15px] font-semibold md:text-[21px]">Our Values</h3>
            <ul className="list-disc space-y-[8px] pl-[24px]">
              <li className="text-[12px] marker:text-primary md:text-[15px]">
                <span className="font-medium">Craftsmanship:</span> We honor the art of tailoring by
                maintaining the highest standards of quality in every stitch and seam.
              </li>
              <li className="text-[12px] marker:text-primary md:text-[15px]">
                <span className="font-medium">Innovation:</span> We continuously explore new
                technologies and techniques to enhance our products and services.
              </li>
              <li className="text-[12px] marker:text-primary md:text-[15px]">
                <span className="font-medium">Sustainability:</span> We are committed to responsible
                practices that minimize waste and environmental impact.
              </li>
              <li className="text-[12px] marker:text-primary md:text-[15px]">
                <span className="font-medium">Inclusivity:</span> We design for diverse body types,
                styles, and preferences, believing that everyone deserves clothing that fits
                perfectly.
              </li>
              <li className="text-[12px] marker:text-primary md:text-[15px]">
                <span className="font-medium">Integrity:</span> We conduct our business with
                honesty, transparency, and respect for all stakeholders.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="mb-[12px] text-[15px] font-semibold md:text-[21px]">
              What Sets Us Apart
            </h3>
            <p className="mb-[16px]">
              TailorTech stands at the intersection of tradition and technology. While we respect
              and practice the time-honored techniques of tailoring, we enhance them with modern
              innovations:
            </p>
            <ul className="list-disc space-y-[8px] pl-[24px]">
              <li className="text-[12px] marker:text-primary md:text-[15px]">
                <span className="font-medium">Advanced Measurement Technology:</span> Our
                proprietary digital measuring system ensures precision fit for every customer.
              </li>
              <li className="text-[12px] marker:text-primary md:text-[15px]">
                <span className="font-medium">Quality Materials:</span> We source premium fabrics
                and materials that offer both durability and comfort.
              </li>
              <li className="text-[12px] marker:text-primary md:text-[15px]">
                <span className="font-medium">Customization Options:</span> Our platform allows
                customers to personalize their garments according to their preferences.
              </li>
              <li className="text-[12px] marker:text-primary md:text-[15px]">
                <span className="font-medium">Skilled Artisans:</span> Our team includes experienced
                tailors who bring decades of expertise to every piece they create.
              </li>
              <li className="text-[12px] marker:text-primary md:text-[15px]">
                <span className="font-medium">Customer-Centric Approach:</span> We prioritize
                customer satisfaction at every step of the journey, from browsing to post-purchase
                support.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="mb-[12px] text-[15px] font-semibold md:text-[21px]">Our Team</h3>
            <p className="mb-[16px]">
              Behind TailorTech is a diverse team of passionate professionals united by a shared
              vision. Our team includes:
            </p>
            <ul className="list-disc space-y-[8px] pl-[24px]">
              <li className="text-[12px] marker:text-primary md:text-[15px]">
                Master tailors with decades of experience in traditional craftsmanship
              </li>
              <li className="text-[12px] marker:text-primary md:text-[15px]">
                Tech specialists who develop and implement our digital solutions
              </li>
              <li className="text-[12px] marker:text-primary md:text-[15px]">
                Design experts who stay ahead of fashion trends while honoring timeless styles
              </li>
              <li className="text-[12px] marker:text-primary md:text-[15px]">
                Customer experience professionals dedicated to ensuring your satisfaction
              </li>
              <li className="text-[12px] marker:text-primary md:text-[15px]">
                Sustainability advocates who help us minimize our environmental footprint
              </li>
            </ul>
            <p className="mt-4">
              Together, we work to deliver on our promise: clothing that tells your story, fits your
              body, and meets the demands of your lifestyle.
            </p>
          </section>

          <section>
            <h3 className="mb-[12px] text-[15px] font-semibold md:text-[21px]">
              Our Commitment to You
            </h3>
            <p className="text-[12px] md:text-[15px]">
              When you choose TailorTech, you&apos;re not just buying clothing—you&apos;re investing
              in a garment that&apos;s been thoughtfully designed and crafted to serve you well. We
              promise to maintain the highest standards of quality, to listen to your feedback, and
              to continuously improve our offerings. Your satisfaction is our priority, and we stand
              behind every product we create.
            </p>
          </section>

          <section>
            <h3 className="mb-[12px] text-[15px] font-semibold md:text-[21px]">Join Our Journey</h3>
            <p className="text-[12px] md:text-[15px]">
              TailorTech is more than a brand—it&apos;s a movement towards smarter, more
              personalized fashion. We invite you to be part of our story as we continue to innovate
              and grow. Whether you&apos;re a first-time customer or a longtime supporter, your
              participation helps shape the future of fashion.
            </p>

            <p className="mt-4 font-medium">
              Thank you for choosing TailorTech. We look forward to helping you express your unique
              style and tell your story through the clothes you wear.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
