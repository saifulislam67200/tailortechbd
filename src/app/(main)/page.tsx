import Collections from "@/components/Home/Collections";
import Hero from "@/components/Home/Hero";

import Services from "@/components/Home/Services";
import TopCategories from "@/components/Home/TopCategories";

export default function Home() {
  return (
    <main className="main_container mx-auto">
      <Hero />
      <Services />
      <TopCategories />
      <Collections />
    </main>
  );
}
