"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import PortfolioCarousel from "@/components/ui/carousel";
import { banners } from "../data/Banners";
import { designerShowcase, thumbnailShowcase, twitchEmotes } from "../data/Designers";
import {
  SiAdobephotoshop,
  SiFigma,
  SiBlender,
  SiNextdotjs,
} from "react-icons/si";

// ---- Types ----
type Project = {
  id: string;
  title: string;
  preview: string;
  platform?: string;
  tags?: string[];
};

type Designer = {
  id: string;
  name: string;
  role?: string;
  specialties?: string[];
  projects: Project[];
};

// ---- Generic lightbox used for banners ----
type BannerLightboxProps = {
  items: Project[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

function BannerLightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: BannerLightboxProps) {
  const item = items[index];
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setAnimateIn(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md px-4"
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-5xl space-y-4 transition-all duration-200 ease-out ${
          animateIn
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-2 scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between text-xs text-gray-200 mb-1">
          <span className="font-medium">
            {index + 1} / {items.length}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/30 px-3 py-1 text-xs font-medium text-white/80 hover:bg-white/10"
          >
            Close
          </button>
        </div>

        {/* Image + arrows */}
        <div className="relative bg-black/90 rounded-2xl p-3 sm:p-4">
          {items.length > 1 && (
            <button
              type="button"
              onClick={onPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/15 border border-white/30 px-2.5 py-2 text-lg text-white hover:bg-white/30 transition"
            >
              ‹
            </button>
          )}

          {items.length > 1 && (
            <button
              type="button"
              onClick={onNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/15 border border-white/30 px-2.5 py-2 text-lg text-white hover:bg-white/30 transition"
            >
              ›
            </button>
          )}

          <div className="flex items-center justify-center">
            <Image
              src={item.preview}
              alt={item.title}
              width={1500}
              height={600}
              className="h-auto w-full max-h-[75vh] object-contain rounded-lg"
            />
          </div>
        </div>

        {/* Info bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-gray-100">
          <div>
            <p className="font-medium">{item.title}</p>
            {item.platform && (
              <p className="text-xs text-gray-300 mt-0.5">{item.platform}</p>
            )}
          </div>
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-white/10 px-2 py-0.5 text-[11px] text-gray-50 border border-white/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ---- Lightbox for thumbnails (slightly different width) ----
type ThumbnailLightboxProps = {
  items: Project[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

function ThumbnailLightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: ThumbnailLightboxProps) {
  const item = items[index];
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setAnimateIn(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md px-4"
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-4xl space-y-4 transition-all duration-200 ease-out ${
          animateIn
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-2 scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between text-xs text-gray-200 mb-1">
          <span className="font-medium">
            {index + 1} / {items.length}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/30 px-3 py-1 text-xs font-medium text-white/80 hover:bg-white/10"
          >
            Close
          </button>
        </div>

        {/* Image + arrows */}
        <div className="relative bg-black/90 rounded-2xl p-3 sm:p-4">
          {items.length > 1 && (
            <button
              type="button"
              onClick={onPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/15 border border-white/30 px-2.5 py-2 text-lg text-white hover:bg-white/30 transition"
            >
              ‹
            </button>
          )}

          {items.length > 1 && (
            <button
              type="button"
              onClick={onNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/15 border border-white/30 px-2.5 py-2 text-lg text-white hover:bg-white/30 transition"
            >
              ›
            </button>
          )}

          <div className="flex items-center justify-center">
            <Image
              src={item.preview}
              alt={item.title}
              width={1500}
              height={900}
              className="h-auto w-full max-h-[75vh] object-contain rounded-lg"
            />
          </div>
        </div>

        {/* Info bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-gray-100">
          <div>
            <p className="font-medium">{item.title}</p>
            {item.platform && (
              <p className="text-xs text-gray-300 mt-0.5">{item.platform}</p>
            )}
          </div>
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-white/10 px-2 py-0.5 text-[11px] text-gray-50 border border-white/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ---- Main page ----
const slides = banners.map((b) => ({
  title: b.title,
  src: b.thumbnail.startsWith("/")
    ? b.thumbnail
    : `/portfolio/banners/${b.thumbnail}`,
  link: b.link,
}));

export default function PortfolioPage() {
  const designers = designerShowcase as Designer[];
  const thumbDesigners: Designer[] = (() => {
    // If thumbnailShowcase already contains Designer-like objects, use it directly,
    // otherwise treat it as a flat array of Project and wrap into a single Designer group.
    const sample = (thumbnailShowcase as any[])[0];
    if (sample && typeof sample === "object" && "projects" in sample && "name" in sample) {
      return thumbnailShowcase as unknown as Designer[];
    }
    return [
      {
        id: "thumbnail-group",
        name: "Thumbnail Showcase",
        projects: thumbnailShowcase as unknown as Project[],
      },
    ];
  })();

  // Banner lightbox (per designer)
  const [bannerGallery, setBannerGallery] = useState<{
    items: Project[];
    index: number;
  } | null>(null);

  const openBannerGallery = (items: Project[], index: number) => {
    setBannerGallery({ items, index });
  };

  const closeBannerGallery = () => setBannerGallery(null);

  const nextBanner = () => {
    setBannerGallery((prev) => {
      if (!prev || prev.items.length === 0) return prev;
      return {
        ...prev,
        index: (prev.index + 1) % prev.items.length,
      };
    });
  };

  const prevBanner = () => {
    setBannerGallery((prev) => {
      if (!prev || prev.items.length === 0) return prev;
      return {
        ...prev,
        index: (prev.index - 1 + prev.items.length) % prev.items.length,
      };
    });
  };

  // Thumbnail lightbox (per thumbnail designer)
  const [thumbGallery, setThumbGallery] = useState<{
    items: Project[];
    index: number;
  } | null>(null);

  const openThumbGallery = (items: Project[], index: number) => {
    setThumbGallery({ items, index });
  };

  const closeThumbGallery = () => setThumbGallery(null);

  const nextThumb = () => {
    setThumbGallery((prev) => {
      if (!prev || prev.items.length === 0) return prev;
      return {
        ...prev,
        index: (prev.index + 1) % prev.items.length,
      };
    });
  };

  const prevThumb = () => {
    setThumbGallery((prev) => {
      if (!prev || prev.items.length === 0) return prev;
      return {
        ...prev,
        index: (prev.index - 1 + prev.items.length) % prev.items.length,
      };
    });
  };

  return (
    <section className="bg-white text-gray-900">
      <div className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8 space-y-20">
        {/* HEADER / INTRO */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Designs &amp; Visuals
          </h1>
          <p className="max-w-2xl mx-auto text-gray-600">
            A showcase of recent banner and visual design work. Every piece is
            crafted to match each creator’s energy — clean, vibrant, and
            story-driven. Exported in{" "}
            <span className="font-medium text-gray-800">1500×500 (3:1)</span>{" "}
            for high quality display.
          </p>
        </div>

        {/* MAIN CAROUSEL – YOUR FEATURED WORK */}
        <div className="mt-8">
          <PortfolioCarousel slides={slides} />
        </div>

        {/* DESIGNER SECTIONS (banners / main work) */}
        <div className="mt-16 space-y-10">
          <div className="text-center space-y-3">
            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-gray-500">
              Studio Team
            </p>
            <h2 className="text-2xl font-semibold text-gray-900">
              Designer Showcase
            </h2>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto">
              Work created by designers at Plexdi Studio across Twitch, YouTube
              and creator branding. Each section highlights one designer and a
              selection of their projects.
            </p>
          </div>

          <div className="space-y-12">
            {designers.map((designer) => (
              <section
                key={designer.id}
                className="rounded-2xl border border-gray-200 bg-gray-50/70 p-5 sm:p-6 lg:p-8 space-y-6"
              >
                {/* Designer header */}
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div className="space-y-1">
                    <h3 className="text-base font-semibold text-gray-900">
                      {designer.name}
                    </h3>
                    {designer.role && (
                      <p className="text-xs text-gray-500">{designer.role}</p>
                    )}
                    {designer.specialties && designer.specialties.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {designer.specialties.map((spec) => (
                          <span
                            key={spec}
                            className="inline-flex items-center rounded-full bg-white px-2 py-0.5 text-[11px] text-gray-700 border border-gray-200"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 max-w-sm leading-relaxed">
                    Selected work from {designer.name}, showcasing different
                    layouts, colour palettes, and formats tailored to each
                    creator.
                  </p>
                </div>

                {/* Projects grid – clickable banners */}
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {designer.projects.map((project, projectIndex) => (
                    <article
                      key={project.id}
                      className="group rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition cursor-zoom-in"
                      onClick={() =>
                        openBannerGallery(designer.projects, projectIndex)
                      }
                    >
                      <div className="relative aspect-[3/1] bg-gray-100 overflow-hidden">
                        <Image
                          src={project.preview}
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                        />
                        {project.platform && (
                          <div className="absolute left-3 top-3 inline-flex items-center rounded-full bg-black/70 px-2 py-1">
                            <span className="text-[10px] font-medium uppercase tracking-wide text-white">
                              {project.platform}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="p-4 space-y-2">
                        <h4 className="text-sm font-semibold text-gray-900 line-clamp-2">
                          {project.title}
                        </h4>
                        {project.tags && project.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-1">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center rounded-full bg-gray-50 px-2 py-0.5 text-[11px] text-gray-700 border border-gray-200"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>

        {/* THUMBNAIL DESIGNER SECTIONS (future-proof, same style) */}
        {thumbDesigners.length > 0 && (
          <div className="mt-16 space-y-10">
            <div className="text-center space-y-3">
              <h2 className="text-2xl font-semibold text-gray-900">
                Thumbnail Designer Showcase
              </h2>
              <p className="text-sm text-gray-600 max-w-2xl mx-auto">
                A focused look at YouTube and content thumbnails, grouped by
                designer. Click any thumbnail to view it in full and navigate
                through that designer&apos;s set.
              </p>
            </div>

            <div className="space-y-12">
              {thumbDesigners.map((designer) => (
                <section
                  key={designer.id}
                  className="rounded-2xl border border-gray-200 bg-gray-50/70 p-5 sm:p-6 lg:p-8 space-y-6"
                >
                  {/* Thumbnail designer header */}
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-1">
                      <h3 className="text-base font-semibold text-gray-900">
                        {designer.name}
                      </h3>
                      {designer.role && (
                        <p className="text-xs text-gray-500">
                          {designer.role}
                        </p>
                      )}
                      {designer.specialties &&
                        designer.specialties.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {designer.specialties.map((spec) => (
                              <span
                                key={spec}
                                className="inline-flex items-center rounded-full bg-white px-2 py-0.5 text-[11px] text-gray-700 border border-gray-200"
                              >
                                {spec}
                              </span>
                            ))}
                          </div>
                        )}
                    </div>
                    <p className="text-xs text-gray-500 max-w-sm leading-relaxed">
                      Thumbnail work from {designer.name}, designed to stand out
                      in feeds and drive clicks.
                    </p>
                  </div>

                  {/* Thumbnails grid – clickable, aspect-video */}
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {designer.projects.map((project, projectIndex) => (
                      <article
                        key={project.id}
                        className="group rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition cursor-zoom-in"
                        onClick={() =>
                          openThumbGallery(designer.projects, projectIndex)
                        }
                      >
                        <div className="relative aspect-video bg-gray-100 overflow-hidden">
                          <Image
                            src={project.preview}
                            alt={project.title}
                            fill
                            className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
                          />
                          {project.platform && (
                            <div className="absolute left-3 top-3 inline-flex items-center rounded-full bg-black/70 px-2 py-1">
                              <span className="text-[10px] font-medium uppercase tracking-wide text-white">
                                {project.platform}
                              </span>
                            </div>
                          )}
                          <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/35 transition">
                            <span className="rounded-full bg-white/95 px-3 py-1 text-[11px] font-medium text-gray-900 shadow-sm">
                              View thumbnail
                            </span>
                          </div>
                        </div>

                        <div className="p-4 space-y-2">
                          <h4 className="text-sm font-semibold text-gray-900 line-clamp-2">
                            {project.title}
                          </h4>
                          {project.tags && project.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-1">
                              {project.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="inline-flex items-center rounded-full bg-gray-50 px-2 py-0.5 text-[11px] text-gray-700 border border-gray-200"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        )}

        {/* DESIGN CATEGORIES */}
        <div className="mt-20 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900 text-center">
            Design Categories
          </h2>
          <p className="text-center text-gray-600 text-sm max-w-2xl mx-auto">
            From standalone banners to full stream packs and portfolio sites,
            Plexdi Studio covers the essentials for creators and online brands.
          </p>
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
                <p className="text-gray-600 text-sm leading-relaxed">
                  {cat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* TOOLS SECTION */}
        <div className="text-center space-y-4 pt-12">
          <h2 className="text-2xl font-semibold text-gray-900">Tools We Use</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm">
            Our workflow combines both design and development tools — blending
            creativity with precision across branding, visuals, and front-end
            builds.
          </p>
          <div className="flex flex-wrap justify-center gap-10 text-gray-800 mt-6">
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
            Ready to build your next look?
          </h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Whether it’s a Twitch banner, full stream pack, complete rebrand, or
            a personal portfolio, Plexdi Studio works with you to design
            something that actually feels like you.
          </p>
          <Link
            href="/commissions"
            className="inline-block px-6 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition"
          >
            Make a Commission
          </Link>
        </div>
      </div>

      {/* Banner lightbox (per designer) */}
      {bannerGallery && (
        <BannerLightbox
          items={bannerGallery.items}
          index={bannerGallery.index}
          onClose={closeBannerGallery}
          onPrev={prevBanner}
          onNext={nextBanner}
        />
      )}

      {/* Thumbnail lightbox (per thumbnail designer) */}
      {thumbGallery && (
        <ThumbnailLightbox
          items={thumbGallery.items}
          index={thumbGallery.index}
          onClose={closeThumbGallery}
          onPrev={prevThumb}
          onNext={nextThumb}
        />
      )}
    </section>
  );
}
