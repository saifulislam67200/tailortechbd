import { footerLinks, socialLinks } from "@/utils/site";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative w-full overflow-hidden bg-white">
      {/* <SubcribeForm/> */}
      <div className="relative w-full bg-primary py-[40px]">
        <div className="main_container relative z-[2] flex w-full items-center justify-between">
          <div className="flex flex-col gap-[10px]">
            <Image
              src={"/images/logos/logo-foreground.png"}
              width={150}
              height={150}
              alt="TailerTech"
            />
            <p className="max-w-[400px] text-start text-[12px] text-white">
              we believe fashion is more than just clothing — it&apos;s a statement of identity. Our
              brand blends modern design with timeless comfort, offering high-quality apparel for
              individuals who value style, authenticity, and confidence.
            </p>
            <div className="mt-[20px] flex items-center justify-start gap-[8px]">
              {socialLinks.map(({ icon: Icon, url, name }, i) => (
                <Link
                  key={i + name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="center relative top-0 aspect-square w-[30px] rounded-full bg-white text-primary duration-[0.1s] hover:top-[-5px]"
                >
                  <Icon className="text-[20px]" />
                </Link>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-[20px]">
            {footerLinks.map(({ contents, label }, i) => (
              <div key={label + i} className="flex w-[300px] flex-col gap-[20px]">
                <span className="relative text-[16px] font-[500] text-white uppercase before:absolute before:bottom-[-8px] before:left-0 before:h-[2px] before:w-[40px] before:bg-white/20">
                  {label}
                </span>
                <ul className="flex flex-col gap-[8px]">
                  {contents.map(({ label, url }, i) => (
                    <li
                      key={i + label + url}
                      className="relative left-0 duration-[0.3s] hover:left-[5px]"
                    >
                      <Link href={url} className="text-[14px] text-white hover:text-secondary">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
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
      <div className="w-full bg-black/90 py-[10px] text-center text-[14px] text-white">
        Copyright © {new Date().getFullYear()} TechTailor All Right Reserved
      </div>
    </footer>
  );
};

export default Footer;
