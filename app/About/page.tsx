'use client';

import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#111] text-gray-100 px-6 md:px-12 py-20">
      <section className="max-w-5xl mx-auto space-y-16">
        {/* ABOUT ME */}
        <div>
          <h1 className="text-4xl font-bold text-white mb-4">About Me</h1>
          <p className="text-gray-300 leading-relaxed mb-4">
            Hey, I’m <span className="font-semibold text-white">Thanh</span>, but most people know me online as{" "}
            <span className="font-semibold text-white">Plexdi</span> — a designer and developer passionate about
            building things that look good <em>and</em> feel smooth to use.
          </p>
          <p className="text-gray-300 leading-relaxed mb-4">
            I started out designing anime-inspired banners for creators and streamers, and over time I’ve turned that passion into
            something bigger — helping people define their online identity through visuals and clean, functional websites.
          </p>
          <p className="text-gray-300 leading-relaxed">
            I love combining <span className="text-white font-medium">design and backend development</span> to create
            a brand that feels personal, fast, and professional. Every project I work on is built with the same mindset:
            <span className="text-white italic"> make it meaningful, make it clean, make it yours.</span>
          </p>
        </div>

        {/* ABOUT PLEXDI STUDIO */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-4">About Plexdi Studio</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            <span className="font-semibold text-white">Plexdi Studio</span> is where creativity meets structure — a
            growing digital studio focused on helping{" "}
            <span className="text-white">developers, streamers, and creators</span> build their personal brand.
          </p>
          <p className="text-gray-300 leading-relaxed mb-4">
            From custom <span className="text-white">banners and logos</span> to fully designed{" "}
            <span className="text-white">portfolio websites</span>, everything is made to be fast, consistent, and
            built around your unique identity.
          </p>
          <p className="text-gray-300 leading-relaxed">
            The goal isn’t just to make visuals, but to <span className="font-semibold text-white">build systems</span>{" "}
            — reusable templates, tools, and designs that evolve with you as your brand grows. I also collaborate with
            other talented designers and developers to deliver more variety in art styles, ensuring every client gets
            something that fits <span className="italic">their</span> vision.
          </p>
        </div>

        {/* FUTURE VISION */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-4">Future Vision</h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            In the long run, I want Plexdi Studio to become a{" "}
            <span className="font-semibold text-white">bridge between design and technology</span> — where creators can
            find not only aesthetic branding but also tools that simplify how they manage their presence online.
          </p>

          <ul className="grid md:grid-cols-2 gap-3 text-gray-200">
            <li className="rounded-lg bg-[#1a1a1a] p-3">• Portfolio & banner templates</li>
            <li className="rounded-lg bg-[#1a1a1a] p-3">• Automated link-in-bio / portfolio generator</li>
            <li className="rounded-lg bg-[#1a1a1a] p-3">• Notion & Figma kits for creators and developers</li>
            <li className="rounded-lg bg-[#1a1a1a] p-3">• Digital packs and brand assets for fast setup</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="pt-10 border-t border-gray-700">
          <h3 className="text-2xl font-bold text-white mb-2">Let’s Connect</h3>
          <p className="text-gray-300 mb-4">
            If you’re a creator, streamer, or developer looking to define your brand or collaborate on a project, let’s
            talk.
          </p>
          <Link
            href="mailto:plexdithanh@gmail.com"
            className="inline-block rounded-lg bg-white text-gray-900 px-5 py-2 font-medium hover:bg-gray-200 transition"
          >
            Contact Me
          </Link>
        </div>
      </section>
    </main>
  );
}
