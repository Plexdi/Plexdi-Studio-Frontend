// app/pricing/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import {pricingCategories} from "../data/Products";
// ---- Types ----
type PricingTier = {
  id: string;
  title: string;
  priceLabel: string;
  summary: string;
  includes: string[];
  excludes?: string[];
  bestFor?: string;
  highlight?: boolean;
};

type PricingCategory = {
  id:
    | "graphics-banners"
    | "video-thumbnails"
    | "profile-pictures"
    | "stream-emotes"
    | "creator-bundles";
    // | "creator-logos"
  label: string;
  description: string;
  tiers: PricingTier[];
};

export default function PricingPage() {
  const categories = pricingCategories as PricingCategory[];

  const [activeCategoryId, setActiveCategoryId] = useState<PricingCategory["id"]>(
    categories[0]?.id ?? "graphics-banners"
  );

  const activeCategory = categories.find(
    (cat) => cat.id === activeCategoryId
  );

  return (
    <main className="bg-white text-gray-900">
      <section className="mx-auto max-w-7xl px-4 pt-20 pb-24 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Pricing
          </h1>
          <p className="mt-3 text-gray-600 leading-relaxed">
            These are my current starting prices for custom design work. Final
            pricing can vary depending on complexity and specific requests. For
            anything outside these categories, you can always reach out through
            the{" "}
            <Link href="/commissions" className="underline underline-offset-4">
              commission form
            </Link>
            .
          </p>
          <p className="mt-2 text-sm text-gray-400">
            Pricing last updated {new Date().getFullYear()} – subject to change
            as the studio grows.
          </p>
        </header>

        {/* Category selector */}
        <nav className="mt-8 flex flex-wrap gap-2 border-b border-gray-200 pb-3">
          {categories.map((cat) => {
            const isActive = cat.id === activeCategoryId;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategoryId(cat.id)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition border ${
                  isActive
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </nav>

        {/* Active category view */}
        {activeCategory && (
          <section className="mt-8 space-y-6">
            <header className="max-w-3xl space-y-2">
              <h2 className="text-xl font-semibold text-gray-900">
                {activeCategory.label}
              </h2>
              <p className="text-sm text-gray-600">
                {activeCategory.description}
              </p>
            </header>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {activeCategory.tiers.map((tier) => (
                <TierCard key={tier.id} tier={tier} />
              ))}
            </div>
          </section>
        )}

        {/* Notes / CTA */}
        <section className="mt-16 grid gap-8 md:grid-cols-[2fr,1.3fr]">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              How pricing works
            </h2>
            <p className="mt-3 text-gray-600 leading-relaxed">
              These prices are meant as a baseline. If your idea is more
              complex (multiple characters, heavy effects, animated elements, or
              large packs), we’ll talk through it first and I’ll send you a
              tailored quote before any work starts.
            </p>
            <p className="mt-3 text-gray-600 leading-relaxed">
              For most projects I take a small deposit to secure the slot, then
              the remaining payment once you’re happy with the final design. All
              payments are currently handled via{" "}
              <span className="font-medium text-gray-900">Stripe</span> or{" "}
              <span className="font-medium text-gray-900">PayPal</span>{" "}
              (depending on what you prefer).
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Not sure which option fits you?
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              If you’re somewhere between packages or want something more custom
              (like a full brand refresh or long-term work), just send a quick
              brief and I’ll reply with suggestions and an estimated range.
            </p>
            <Link
              href="/commissions"
              className="mt-4 inline-flex items-center justify-center rounded-lg bg-gray-900 px-5 py-2 text-sm font-medium text-white hover:bg-black transition"
            >
              Send a commission enquiry
            </Link>
            <p className="mt-3 text-xs text-gray-500">
              I usually respond within 24–48 hours depending on university and
              current workload.
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}

// ---- Tier card component ----
function TierCard({ tier }: { tier: PricingTier }) {
  return (
    <article
      className={`relative flex flex-col rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md ${
        tier.highlight ? "border-gray-900" : "border-gray-200"
      }`}
    >
      {tier.highlight && (
        <span className="absolute -top-3 left-4 rounded-full bg-gray-900 px-3 py-1 text-xs font-medium text-white">
          Most requested
        </span>
      )}

      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-gray-900">{tier.title}</h3>
        <p className="text-xl font-semibold text-gray-900">
          {tier.priceLabel}
        </p>
      </div>

      <p className="mt-3 text-sm text-gray-600 leading-relaxed">
        {tier.summary}
      </p>

      {/* Includes */}
      <div className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          Includes
        </p>
        <ul className="mt-2 space-y-1.5 text-sm text-gray-700">
          {tier.includes.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gray-400" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Excludes */}
      {tier.excludes && tier.excludes.length > 0 && (
        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Does NOT include
          </p>
          <ul className="mt-2 space-y-1.5 text-sm text-gray-600">
            {tier.excludes.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-red-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Best for */}
      {tier.bestFor && (
        <div className="mt-4 border-t border-gray-100 pt-3 text-xs text-gray-600">
          <span className="font-semibold text-gray-800">Best for: </span>
          {tier.bestFor}
        </div>
      )}
    </article>
  );
}
