import Collections from "@/components/Home/Collections/Collections";
import Hero from "@/components/Home/Hero";
import TopCategories from "@/components/Home/TopCategories";
import Services  from '@/components/Home/Services';
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import { Suspense } from "react";
import CardSkeleton from "@/components/Home/Collections/CardSkeleton";

export default function Home() {
  return (
    <main className="main_container mx-auto">
      <Hero />
      <Services />
      <TopCategories />
      {/* <Collections /> */}
      <ErrorBoundary fallback={<div>error components</div>}>
        <Suspense fallback={<CardSkeleton />}>
          <Collections />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
