// app/pricing/page.tsx
'use client';

import Link from "next/link";

export default function PricingPage() {
  return (
    <main className="bg-white text-gray-900">
      <section className="mx-auto max-w-7xl px-4 pt-20 pb-24 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Pricing
          </h1>
          <p className="mt-3 text-gray-600 leading-relaxed">
            These are my current starting prices for custom design work.
            Final pricing can vary depending on complexity, and
            specific requests. For anything outside these categories,
            you can always reach out through the{" "}
            <Link href="/commissions" className="underline underline-offset-4">
              commission form
            </Link>.
          </p>
          <p className="mt-2 text-sm text-gray-400">
            Pricing last updated {new Date().getFullYear()} – subject to change as the studio grows.
          </p>
        </header>

        {/* Category grid */}
        <section className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Banners */}
          <PricingCard
            title="Banners"
            fromPrice="£25"
            description="Clean, anime-inspired or minimal banners tailored for Twitch, YouTube, Discord, or X."
            items={[
              "1500×500 (or platform-optimized size)",
              "1 main concept + 1–2 small revisions",
              "Optimized for clarity and text readability",
              "Exported in high-resolution PNG/JPEG",
            ]}
            recommended
          />

          {/* Thumbnails */}
          <PricingCard
            title="YouTube Thumbnails"
            fromPrice="£15"
            description="Eye-catching thumbnails focused on clarity, contrast, and click-through potential."
            items={[
              "1 thumbnail concept",
              "Text + subject emphasis",
              "Color and contrast tuned for YouTube feed",
              "Resize for Shorts/other formats on request",
            ]}
          />

          {/* Profile Pictures */}
          <PricingCard
            title="Profile Pictures"
            fromPrice="£20"
            description="Custom PFPs that match your banner or overall brand vibe."
            items={[
              "Square format (e.g. 800×800+)",
              "Designed to match your existing branding",
              "Works across Twitch, Discord, X, and more",
              "Simple lighting and effects included",
            ]}
          />

          {/* Stream / Creator Packs */}
          <PricingCard
            title="Stream / Creator Packs"
            fromPrice="£60"
            description="Bundles for creators who want a cohesive look across all their platforms."
            items={[
              "Banner + PFP + basic panel set",
              "Designed as one unified identity",
              "PSD/Source files available on request",
              "Great for rebrands or fresh launches",
              "Twitch/Emotes"
            ]}
          />

          {/* Logos */}
          <PricingCard
            title="Logos"
            fromPrice="£40"
            description="Simple, memorable logos for creators, small teams, or personal brands."
            items={[
              "Wordmark or simple icon-style logo",
              "1 main concept + refinement round",
              "Delivered as PNG + SVG (where possible)",
              "Monochrome and color variations",
            ]}
          />

          {/* Portfolio / Web Design */}
          <PricingCard
            title="Twitch Emotes"
            fromPrice="£30"
            description="Custom Twitch emotes drawn to match your brand, character, or streaming personality. Designed to be expressive, readable, and perfectly sized for Twitch upload."
            items={[
            "3 emote sizes included (28px, 56px, 112px)",
            "Crisp PNG exports with transparent backgrounds",
            "1 base style with small expression variations",
            "Perfect for Twitch, YouTube, Discord emotes",
            ]}

          />
        </section>

        {/* Notes / CTA */}
        <section className="mt-16 grid gap-8 md:grid-cols-[2fr,1.3fr]">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              How pricing works
            </h2>
            <p className="mt-3 text-gray-600 leading-relaxed">
              These prices are meant as a baseline. If your idea is more
              complex (multiple characters, heavy effects, animated elements,
              or large packs), we’ll talk through it first and I’ll send you
              a tailored quote before any work starts.
            </p>
            <p className="mt-3 text-gray-600 leading-relaxed">
              For most projects I take a small deposit to secure the slot,
              then the remaining payment once you’re happy with the final
              design. All payments are currently handled via{" "}
              <span className="font-medium text-gray-900">PayPal</span>.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Not sure which option fits you?
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              If you’re somewhere between packages or want something more
              custom (like a full brand refresh or long-term work), just send
              a quick brief and I’ll reply with suggestions and an estimated range.
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

type PricingCardProps = {
  title: string;
  fromPrice: string;
  description: string;
  items: string[];
  recommended?: boolean;
};

function PricingCard({
  title,
  fromPrice,
  description,
  items,
  recommended,
}: PricingCardProps) {
  return (
    <article
      className={`relative flex flex-col rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md ${
        recommended ? "border-gray-900" : "border-gray-200"
      }`}
    >
      {recommended && (
        <span className="absolute -top-3 left-4 rounded-full bg-gray-900 px-3 py-1 text-xs font-medium text-white">
          Most requested
        </span>
      )}

      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      <p className="mt-1 text-sm text-gray-500">from</p>
      <p className="text-2xl font-semibold text-gray-900">{fromPrice}</p>

      <p className="mt-3 text-sm text-gray-600 leading-relaxed">
        {description}
      </p>

      <ul className="mt-4 space-y-2 text-sm text-gray-600">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gray-400" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
