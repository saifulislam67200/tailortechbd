import { socialLinks } from "@/utils/site";
import Image from "next/image";
import Link from "next/link";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative w-full overflow-hidden text-white">
      {/* Main Footer Content */}
      <div className="main_container relative mx-auto w-full bg-primary px-4 py-[40px]">
        <div className="flex flex-col gap-[48px] lg:flex-row">
          {/* Company Info - Left Side */}
          <div className="space-y-[16px] lg:w-[30%]">
            <div className="flex items-center space-x-2">
              <Image
                src={"/images/logos/logo-foreground.png"}
                width={100}
                height={100}
                alt="TailerTech"
              />
            </div>
            <p className="w-full max-w-[300px] text-[14px] leading-relaxed">
              Where Tradition Meets Innovation. We blend the timeless art of tailoring with
              cutting-edge fashion technology to bring you modern, perfectly fitted, and stylish
              apparel.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, url, name }, i) => (
                <Link
                  key={i + name}
                  href={url}
                  target="_blank"
                  rel="noopener-noreferrer"
                  className="center relative top-0 aspect-square w-[30px] rounded-full bg-white text-primary"
                >
                  <Icon className="text-[20px]" />
                </Link>
              ))}
            </div>
          </div>

          {/* Right Side*/}
          <div className="grid grid-cols-1 gap-[32px] md:grid-cols-3 lg:w-[70%]">
            {/* Quick Links */}
            <div className="space-y-[16px]">
              <h4 className="text-lg font-semibold">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-[14px] transition-colors hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="text-[14px] transition-colors hover:text-white">
                    Our Products
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-[14px] transition-colors hover:text-white">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer Service */}
            <div className="space-y-[16px]">
              <h4 className="text-lg font-semibold">Customer Service</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/faq" className="text-[14px] transition-colors hover:text-white">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/return-refund-cancellation"
                    className="text-[14px] transition-colors hover:text-white"
                  >
                    Return & Refund
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-conditions"
                    className="text-[14px] transition-colors hover:text-white"
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-[14px] transition-colors hover:text-white"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookie-policy"
                    className="text-[14px] transition-colors hover:text-white"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-[16px]">
              <h4 className="text-lg font-semibold">Get In Touch</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <FaMapMarkerAlt size={16} className="mt-1 flex-shrink-0 text-white" />
                  <div>
                    <p className="text-[14px]">
                      123 Fashion Street, Gulshan-1
                      <br />
                      Dhaka-1212, Bangladesh
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FaPhone size={16} className="flex-shrink-0 text-white" />
                  <p className="text-[14px]">+880 1XXX-XXXXXX</p>
                </div>
                <div className="flex items-center space-x-3">
                  <FaEnvelope size={16} className="flex-shrink-0 text-white" />
                  <p className="text-[14px]">info@tailortech.com</p>
                </div>
                <div className="flex items-start space-x-3">
                  <FaClock size={16} className="mt-1 flex-shrink-0 text-white" />
                  <div>
                    <p className="text-[14px]">
                      Mon - Sat: 9:00 AM - 8:00 PM
                      <br />
                      Sunday: 10:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Image
          src={"/images/logos/logo-symbol-foreground.png"}
          width={400}
          height={400}
          alt="TailerTech"
          className="absolute top-0 right-[-5%] z-[1] opacity-[5%] select-none"
        />
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-border-main bg-primary">
        <div className="main_container mx-auto px-[16px] py-[16px]">
          <p className="text-center text-[14px] text-white">
            © {new Date().getFullYear()} TailorTech Limited. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
