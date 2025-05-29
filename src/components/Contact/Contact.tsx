"use client";

import type React from "react";
import { FiMail, FiPhone, FiMapPin, FiClock } from "react-icons/fi";
import Breadcrumb from "../ui/BreadCrumbs";
import ContactForm from "./ContactForm";

export default function Contact() {
  const contactInfo = [
    {
      icon: FiMapPin,
      title: "Address",
      details: ["Kalshi Road, Mirpur-11", "Dhaka-1216, Bangladesh"],
    },
    {
      icon: FiPhone,
      title: "Phone",
      details: ["+880 1911 696556", "+880 1711 923276"],
    },
    {
      icon: FiMail,
      title: "Email",
      details: ["tailortechbd2025@gmail.com"],
    },
    {
      icon: FiClock,
      title: "Business Hours",
      details: ["Open Everyday.", "Support Available only from: 09:00 AM to 10:00 PM"],
    },
  ];

  return (
    <div className="main_container min-h-[100dvh] w-full py-[20px]">
      <Breadcrumb />
      <div className="grid grid-cols-1 gap-[20px] py-[20px] lg:grid-cols-2">
        {/* Contact Form */}
        <ContactForm />

        {/* Contact Information */}
        <div className="space-y-[32px]">
          <div className="rounded-md border border-border-main bg-white p-[18px] md:p-[32px]">
            <h2 className="mb-[16px] text-[20px] font-bold text-primary md:text-[30px]">
              Get in Touch
            </h2>
            <p className="mb-[16px] text-[14px] text-muted">
              Have questions about our products or need assistance with your order? We&apos;re here
              to help! Reach out to us through any of the following methods.
            </p>

            <div className="space-y-[24px]">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div key={index} className="flex items-start space-x-[16px]">
                    <div className="flex-shrink-0">
                      <div className="flex h-[48px] w-[48px] items-center justify-center rounded-lg bg-gradient-to-r from-primary to-[#3a3f82]">
                        <Icon className="h-[24px] w-[24px] text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="mb-1 text-[16px] font-semibold text-strong">{info.title}</h3>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-[14px] text-muted">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
