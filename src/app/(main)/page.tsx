import Collections from "@/components/Home/Collections";
import Hero from "@/components/Home/Hero";
import MostPopular from "@/components/Home/MostPopular";
import ProductsFallback from "@/components/Home/ProductsFallback";
import TopCategories from "@/components/Home/TopCategories";
import DataNotFound from "@/components/ui/DataNotFound";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="main_container mx-auto">
      {/* <ChatWidget /> */}
      <Suspense fallback={<div className="aspect-[834.66/407] animate-pulse bg-gray-100" />}>
        <Hero />
      </Suspense>
      <TopCategories />
      <ErrorBoundary
        fallback={
          <DataNotFound
            title="Error Loading Collections"
            className="mt-[20px] h-[200px] bg-white"
          />
        }
      >
        <Suspense fallback={<ProductsFallback title="Collections" />}>
          <Collections />
        </Suspense>
      </ErrorBoundary>
      {/* most popular products */}
      <ErrorBoundary
        fallback={
          <DataNotFound
            title="Error Loading Collections"
            className="mt-[20px] h-[200px] bg-white"
          />
        }
      >
        <Suspense fallback={<ProductsFallback title="Most Popular" />}>
          <MostPopular />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
