// app/portfolio/page.tsx
'use client';
import PortfolioCarousel from "@/components/ui/carousel";
import { banners } from "../data/Banners";

const slides = banners.map(b => ({
  title: b.title,
  src: b.thumbnail.startsWith("/") ? b.thumbnail : `/portfolio/banners/${b.thumbnail}`,
  link: b.link,
}));

export default function PortfolioPage() {
  return (
    <section className="bg-white text-gray-900">
      <div className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold sm:text-4xl">Portfolio</h1>
        <p className="mt-3 max-w-2xl text-gray-600">
          A selection of recent banner work. Exported at 1500×500 (3:1).
        </p>
        <div className="mt-8">
          <PortfolioCarousel slides={slides} />
        </div>
      </div>
    </section>
  );
}
