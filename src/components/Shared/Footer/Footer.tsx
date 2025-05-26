import { socialLinks } from "@/utils/site";
import Image from "next/image";
import Link from "next/link";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative mb-[45px] w-full overflow-hidden text-white lg:mb-0">
      {/* Main Footer Content */}
      <div className="main_container relative mx-auto w-full bg-primary px-4 py-[30px] sm:py-[40px]">
        <div className="flex flex-col gap-[18px] md:gap-[28px] lg:flex-row lg:gap-[48px]">
          {/* Company Info */}
          <div className="mx-auto space-y-[16px] lg:ms-0 lg:w-[30%]">
            <div className="flex items-center justify-center space-x-2 lg:justify-start">
              <Image
                src={"/images/logos/logo-foreground.png"}
                width={100}
                height={100}
                alt="TailerTech"
              />
            </div>
            <p className="w-full text-center text-[14px] leading-relaxed md:max-w-[550px] lg:max-w-[300px] lg:text-start">
              Where Tradition Meets Innovation. We blend the timeless art of tailoring with
              cutting-edge fashion technology to bring you modern, perfectly fitted, and stylish
              apparel.
            </p>
            <div className="hidden justify-center space-x-4 lg:flex lg:justify-start">
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
          <div className="grid grid-cols-1 gap-[28px] text-center md:grid-cols-3 md:gap-[4px] md:px-[16px] md:text-left lg:w-[70%] lg:gap-[32px] lg:px-0">
            {/* Quick Links */}
            <div className="space-y-[16px]">
              <h4 className="relative text-center text-lg font-semibold before:absolute before:bottom-[-8px] before:left-[50%] before:h-[2px] before:w-[40px] before:translate-x-[-50%] before:bg-white/20 md:text-left md:before:left-0 md:before:translate-x-0">
                Quick Links
              </h4>
              <ul className="space-y-2">
                <li className="relative left-0 duration-[0.3s] hover:left-[5px]">
                  <Link href="/about" className="text-[14px] transition-colors hover:text-white">
                    About Us
                  </Link>
                </li>
                <li className="relative left-0 duration-[0.3s] hover:left-[5px]">
                  <Link href="/products" className="text-[14px] transition-colors hover:text-white">
                    Our Products
                  </Link>
                </li>
                <li className="relative left-0 duration-[0.3s] hover:left-[5px]">
                  <Link href="/contact" className="text-[14px] transition-colors hover:text-white">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer Service */}
            <div className="space-y-[16px]">
              <h4 className="relative text-center text-lg font-semibold before:absolute before:bottom-[-8px] before:left-[50%] before:h-[2px] before:w-[40px] before:translate-x-[-50%] before:bg-white/20 md:text-left md:before:left-0 md:before:translate-x-0">
                Customer Service
              </h4>
              <ul className="space-y-2">
                <li className="relative left-0 duration-[0.3s] hover:left-[5px]">
                  <Link
                    href="/return-refund-cancellation"
                    className="text-[14px] transition-colors hover:text-white"
                  >
                    Return & Refund
                  </Link>
                </li>
                <li className="relative left-0 duration-[0.3s] hover:left-[5px]">
                  <Link
                    href="/terms-conditions"
                    className="text-[14px] transition-colors hover:text-white"
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li className="relative left-0 duration-[0.3s] hover:left-[5px]">
                  <Link
                    href="/privacy-policy"
                    className="text-[14px] transition-colors hover:text-white"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li className="relative left-0 duration-[0.3s] hover:left-[5px]">
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
            <div className="hidden space-y-[16px] md:block">
              <h4 className="relative text-center text-lg font-semibold before:absolute before:bottom-[-8px] before:left-[50%] before:h-[2px] before:w-[40px] before:translate-x-[-50%] before:bg-white/20 md:text-left md:before:left-0 md:before:translate-x-0">
                Get In Touch
              </h4>
              <div className="space-y-3 md:space-y-3">
                <div className="flex flex-col items-center md:flex-row md:items-start">
                  <FaMapMarkerAlt size={16} className="flex-shrink-0 text-white md:mt-1" />
                  <div className="mt-1 md:ml-3">
                    <p className="text-[14px]">
                      123 Fashion Street, Gulshan-1
                      <br />
                      Dhaka-1212, Bangladesh
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center md:flex-row">
                  <FaPhone size={16} className="flex-shrink-0 text-white" />
                  <p className="mt-1 text-[14px] md:ml-3">+880 1XXX-XXXXXX</p>
                </div>
                <div className="flex flex-col items-center md:flex-row">
                  <FaEnvelope size={16} className="flex-shrink-0 text-white" />
                  <p className="mt-1 text-[14px] md:ml-3">info@tailortech.com</p>
                </div>
              </div>
            </div>

            {/* Contact Info for mobile */}
            <div className="block space-y-[16px] md:hidden">
              <h4 className="relative text-center text-lg font-semibold before:absolute before:bottom-[-8px] before:left-[50%] before:h-[2px] before:w-[40px] before:translate-x-[-50%] before:bg-white/20 md:text-left md:before:left-0 md:before:translate-x-0">
                Get In Touch
              </h4>
              <div className="space-y-3">
                <p className="text-center text-[14px]"> Head office</p>
                <div className="flex items-center justify-center space-x-3">
                  <div>
                    <p className="text-center text-[14px]">
                      123 Fashion Street, Gulshan-1, Dhaka-1212, Bangladesh
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <FaPhone size={16} className="flex-shrink-0 text-white" />
                  <p className="text-[14px]">+880 1XXX-XXXXXX</p>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <FaEnvelope size={16} className="flex-shrink-0 text-white" />
                  <p className="text-[14px]">info@tailortech.com</p>
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
