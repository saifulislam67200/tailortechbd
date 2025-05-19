import { FaCreditCard, FaTruck } from "react-icons/fa";
import { FaMoneyBill1, FaUserTie } from "react-icons/fa6";
import { IoMdCall } from "react-icons/io";
const services = [
  {
    id: 1,
    title: "0% EMI",
    icon: <FaMoneyBill1 className="h-[16px] w-[20px] text-[#3ec327]" />,
  },
  {
    id: 2,
    title: "24/7 Online Support",
    icon: <FaUserTie className="h-[16px] w-[20px] text-[#3ec327]" />,
  },
  {
    id: 3,
    title: "No charge on card payment",
    icon: <FaCreditCard className="h-[16px] w-[20px] text-[#3ec327]" />,
  },
  {
    id: 4,
    title: "Cash on delivery in 64 districts",
    icon: <FaTruck className="h-[16px] w-[20px] text-[#3ec327]" />,
  },
];
const servicesMobile = [
  {
    id: 1,
    title: "16810",
    icon: <IoMdCall  className="h-[16px] w-[16px] text-white" />,
  },
  {
    id: 2,
    title: "24/7 Online Support",
    icon: <FaUserTie className="h-[16px] w-[16px] text-white" />,
  },
  {
    id: 3,
    title: "No charge on card payment",
    icon: <FaCreditCard className="h-[16px] w-[16px] text-white" />,
  },
  {
    id: 4,
    title: "Cash on delivery in 64 districts",
    icon: <FaTruck className="h-[16px] w-[16px] text-white" />,
  },
];

export default function ServicesSection() {
  return (
    <section className="overflow-x-auto py-[16px]">
      <div className="hidden lg:flex items-center justify-center">
        {services.map((service, index) => (
          <div
            key={service.id}
            className={`relative flex items-center justify-center px-[16px] ${
              index < services.length - 1
                ? "after:absolute after:right-0 after:h-[16px] after:w-[2px] after:bg-strong after:content-['']"
                : ""
            }`}
          >
            <div className="flex items-center gap-[4px]">
              {service.icon}
              <span className="font-semibold whitespace-nowrap text-[#AD7A2A]">
                {service.title}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile View */}
      <div className="flex lg:hidden flex-wrap justify-between gap-y-[12px]">
        {servicesMobile.map((service) => (
          <div key={service.id} className="w-[48%] h-[44px]">
            <div className="flex w-full h-full items-center bg-white">
              <div className="flex w-1/4 h-full items-center justify-center bg-[#72BF44] p-[10px]">
                  {service.icon}
              </div>
              <div className="w-3/4 h-full p-[10px]">
                <p className="text-[12px] text-strong">{service.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
