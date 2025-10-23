import React from "react";
import Head from "next/head";

const StoreStaticMap = () => {
  const mapSrc =
    "https://maps.google.com/maps?width=520&height=400&hl=en&q=Kalshi%20Road,%20Mirpur-11,%20Dhaka-1216%20Dhaka+(TailorTech)&t=p&z=15&ie=UTF8&iwloc=B&output=embed";

  return (
    <div className="h-[250px] w-full sm:h-[400px]">
      <Head>
        {/* Preconnect to Google Maps for better performance */}
        <link rel="preconnect" href="https://maps.google.com" />
        <link rel="preconnect" href="https://maps.googleapis.com" />
      </Head>

      <div className="relative h-auto w-full overflow-hidden pb-[250px] sm:pb-[400px]">
        <iframe
          className="absolute top-0 left-0 h-[250px] w-full rounded-[6px] border border-border-main sm:h-[400px]"
          frameBorder={0}
          scrolling="no"
          marginHeight={0}
          marginWidth={0}
          id="gmap_canvas"
          src={mapSrc}
          title="Tailortech Location Map"
          loading="lazy"
          allowFullScreen
          aria-label="Google Maps showing Tailortech location at Kalshi Road, Mirpur-11, Dhaka-1216"
        />
      </div>

      {/* Fallback link for when iframes are blocked */}
      <div className="hidden">
        <a
          href="https://www.google.com/maps/place/Kalshi+Road,+Mirpur-11,+Dhaka-1216/@23.831884,90.367491,15z"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary/90 hover:text-primary hover:underline"
        >
          View Tailortech location on Google Maps
        </a>
      </div>
    </div>
  );
};

export default StoreStaticMap;
