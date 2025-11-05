import Image from "next/image";
import React from "react";

export default function AboutMe(): React.ReactNode {
  return (
    <section id="about" className="bg-[#1f1f1f] text-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* TOP: About + Image */}
        <div className="grid items-center gap-12 md:grid-cols-12">
          {/* Text */}
          <div className="md:col-span-7">
            <p className="mb-2 text-sm tracking-wide text-gray-400">ABOUT</p>
            <h2 className="text-balance text-3xl font-semibold sm:text-4xl">
              About Plexdi
            </h2>
            <p className="mt-4 max-w-prose text-lg leading-relaxed text-gray-200">
              Welcome to my studio! I help developers and creators build their
              personal brand through clean visuals and modern web design. From
              custom banners and logos to fully designed portfolio sites, I focus
              on creating work that feels unique, professional, and true to your
              style. Explore my projects and see how I can help you level up your
              online presence.
            </p>

            {/* CTAs */}
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/Designs"
                className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-medium hover:bg-white/10"
              >
                View Projects
              </a>
              <a
                href="/commissions"
                className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2 text-sm font-medium text-blue-300 hover:bg-blue-500/20"
              >
                Commissions
              </a>
            </div>
          </div>

          {/* Visuals */}
          <div className="md:col-span-5">
            <div className="mx-auto w-full max-w-md">
              <Image
                src="/Review.png"
                alt="Client feedback and banner previews"
                width={800}
                height={600}
                sizes="(max-width: 768px) 100vw, 480px"
                priority
                className="rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.45)] ring-1 ring-white/10"
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-16 h-px w-full bg-gradient-to-r from-blue-500/60 via-fuchsia-500/50 to-pink-500/60 opacity-60" />

        {/* BOTTOM: Future Goals */}
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-semibold sm:text-3xl">Future Goals</h2>
          <div className="mt-4 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
            <p className="text-lg leading-relaxed text-gray-200">
              I’m growing this into a creative brand that bridges design and
              technology. Short-term, I’m focused on delivering clean branding and
              portfolio sites. Over time, I’ll expand into digital products and
              tools that help developers and creators build their identity faster.
            </p>
            <ul className="mt-5 grid gap-3 text-gray-300 sm:grid-cols-2">
              <li className="rounded-lg bg-white/5 px-4 py-3 ring-1 ring-white/10">
                • Release portfolio & banner templates
              </li>
              <li className="rounded-lg bg-white/5 px-4 py-3 ring-1 ring-white/10">
                • Build a simple link-in-bio / portfolio generator
              </li>
              <li className="rounded-lg bg-white/5 px-4 py-3 ring-1 ring-white/10">
                • Create a Notion + Figma kit for dev branding
              </li>
              <li className="rounded-lg bg-white/5 px-4 py-3 ring-1 ring-white/10">
                • Collect case studies & testimonials as I scale
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
