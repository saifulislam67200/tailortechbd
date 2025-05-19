"use client"

import React from "react"
import { FaPercentage, FaHeadset, FaCreditCard, FaTruck } from "react-icons/fa"

const Services = () => {
  const services = [
    {
      id: 1,
      icon: <FaPercentage className="text-2xl text-primary" />,
      title: "0% EMI",
    },
    {
      id: 2,
      icon: <FaHeadset className="text-2xl text-primary" />,
      title: "24/7 Online Support",
    },
    {
      id: 3,
      icon: <FaCreditCard className="text-2xl text-primary" />,
      title: "No charge on card payment",
    },
    {
      id: 4,
      icon: <FaTruck className="text-2xl text-primary" />,
      title: "Cash on delivery in 64 districts",
    },
  ]

  return (
    <section>
        <div className="flex flex-col md:flex-row justify-center items-center">
          {services.map((service, index) => (
            <div key={service.id}>
              <div className="flex items-center py-4 md:py-0">
                <div className="mr-3">{service.icon}</div>
                <span className="font-medium">{service.title}</span>
              </div>

              {index < services.length - 1 && <div className="hidden md:block w-px h-10 bg-gray-300 mx-2"></div>}
            </div>
          ))}
        </div>
    </section>
  )
}

export default Services
