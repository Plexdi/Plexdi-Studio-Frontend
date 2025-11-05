'use client';

import PortfolioCarousel from "@/components/ui/carousel";
import { banners } from "../data/Banners";
import Link from "next/link";
import { SiAdobephotoshop, SiFigma, SiBlender, SiNextdotjs } from "react-icons/si";

const slides = banners.map(b => ({
  title: b.title,
  src: b.thumbnail.startsWith("/") ? b.thumbnail : `/portfolio/banners/${b.thumbnail}`,
  link: b.link,
}));

export default function PortfolioPage() {
  return (
    <section className="bg-white text-gray-900">
      <div className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8 space-y-20">

        {/* HEADER / INTRO */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Designs & Visuals</h1>
          <p className="max-w-2xl mx-auto text-gray-600">
            A showcase of recent banner and visual design work.  
            Every piece is crafted to match each creator’s energy — clean, vibrant, and story-driven.  
            Exported in <span className="font-medium text-gray-800">1500×500 (3:1)</span> for high quality display.
          </p>
        </div>

        {/* MAIN CAROUSEL */}
        <div className="mt-8">
          <PortfolioCarousel slides={slides} />
        </div>

        {/* DESIGN CATEGORIES */}
        <div className="mt-20 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900 text-center">Design Categories</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Banners",
                desc: "Custom Twitch & YouTube banners designed to reflect your brand’s identity.",
                color: "bg-gradient-to-r from-gray-100 to-gray-200",
              },
              {
                title: "Profile Pictures",
                desc: "Unique PFPs that capture your character — perfect for streamers or online personas.",
                color: "bg-gradient-to-r from-gray-100 to-gray-200",
              },
              {
                title: "Thumbnails",
                desc: "High-impact thumbnails optimized for visibility and click-through rates.",
                color: "bg-gradient-to-r from-gray-100 to-gray-200",
              },
              {
                title: "Logos",
                desc: "Minimal or illustrated logos tailored for streamers, startups, and developers.",
                color: "bg-gradient-to-r from-gray-100 to-gray-200",
              },
              {
                title: "Overlay Elements",
                desc: "Stream overlays, alerts, and scene assets designed for consistency and clarity.",
                color: "bg-gradient-to-r from-gray-100 to-gray-200",
              },
              {
                title: "Portfolio Websites",
                desc: "Front-end sites designed with speed and visual cohesion in mind.",
                color: "bg-gradient-to-r from-gray-100 to-gray-200",
              },
            ].map((cat, i) => (
              <div
                key={i}
                className={`${cat.color} p-6 rounded-xl border border-gray-200 hover:shadow-md transition`}
              >
                <h3 className="text-lg font-semibold mb-2">{cat.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* TOOLS SECTION */}
        <div className="text-center space-y-4 pt-12">
          <h2 className="text-2xl font-semibold text-gray-900">Tools I Use</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            My workflow combines both design and development tools — blending creativity with precision.
          </p>
          <div className="flex justify-center gap-10 text-gray-800 mt-6">
            <div className="flex flex-col items-center gap-2">
              <SiAdobephotoshop size={36} />
              <span className="text-sm">Photoshop</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <SiFigma size={36} />
              <span className="text-sm">Figma</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <SiBlender size={36} />
              <span className="text-sm">Blender</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <SiNextdotjs size={36} />
              <span className="text-sm">Next.js</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Interested in working together?
          </h2>
          <p className="text-gray-600 mb-6">
            Whether it’s a Twitch banner, full rebrand, or personal portfolio — let’s make something that stands out.
          </p>
          <Link
            href="/commissions"
            className="inline-block px-6 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition"
          >
            Make a Commission
          </Link>
        </div>

      </div>
    </section>
  );
}

