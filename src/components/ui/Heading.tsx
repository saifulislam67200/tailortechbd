import React from 'react';

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

const Heading = ({ children, className = '' }: SectionTitleProps) => {
  return (
    <h2 className={`bg-[#198754] py-[6px] text-center text-[18px] font-bold text-white md:py-[8px] md:text-[26px] ${className}`}>
      {children}
    </h2>
  );
};

export default Heading;