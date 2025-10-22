// app/shop/page.tsx
'use client';
import { useMemo, useState } from "react";
import Link from "next/link";
import {products} from "../data/Products"
import type { Product } from "../data/Variant";

export default function Shop() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string | null>(null);
  const [sort, setSort] = useState<"featured" | "new" | "price-asc" | "price-desc">("featured");

  const filtered = useMemo<Product[]>(() => {
    let p = [...products];

    if (query) {
      const q = query.toLowerCase();
      p = p.filter(x => (x.title + (x.subtitle ?? "")).toLowerCase().includes(q));
    }
    if (tag) p = p.filter(x => x.tags.includes(tag));

    switch (sort) {
      case "new":
        p.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
        break;
      case "price-asc":
        p.sort((a, b) => minPrice(a) - minPrice(b));
        break;
      case "price-desc":
        p.sort((a, b) => minPrice(b) - minPrice(a));
        break;
      default:
        p.sort((a, b) => Number(b.featured) - Number(a.featured));
    }
    return p;
  }, [query, tag, sort]); // products is a static import — no need in deps

  return (
    <section className="bg-white text-gray-900">
      {/* Hero */}
      <div className="mx-auto max-w-7xl px-4 pt-20 pb-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold sm:text-4xl">Design Packs & Resources  (NOT REAL PRODUCTS)</h1>
        <p className="mt-3 max-w-2xl text-gray-600">
          Banner kits, PSDs, and creator assets. Ready to use and fully editable.
        </p>

        {/* Controls */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <input
            placeholder="Search packs…"
            className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-gray-900/10"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="flex flex-wrap gap-2 text-sm">
            {["psd-included", "anime", "minimal", "dark", "gradient", "headers"].map(t => (
              <button
                key={t}
                onClick={() => setTag(tag === t ? null : t)}
                className={`rounded-full border px-3 py-1 ${
                  tag === t ? "border-gray-900 bg-gray-900 text-white" : "border-gray-300 bg-white hover:bg-gray-50"
                }`}
              >
                {t.replaceAll("-", " ")}
              </button>
            ))}
          </div>
          <select
            className="ml-auto h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm"
            value={sort}
            onChange={(e) => setSort(e.target.value as any)}
          >
            <option value="featured">Featured</option>
            <option value="new">Newest</option>
            <option value="price-asc">Price ↑</option>
            <option value="price-desc">Price ↓</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <li key={p.id}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      </div>

      {/* FAQ / License */}
      <div className="bg-[#f7f7f7]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold">FAQs</h2>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            <Faq q="Is commercial use allowed?" a="Yes with the Commercial variant/license. Personal is for non-monetized use." />
            <Faq q="Do packs include PSDs?" a="Yes—if marked 'PSD included'. All PSDs are layered and organized." />
            <Faq q="How do I get updates?" a="You’ll receive an email with new download links whenever a pack is updated." />
            <Faq q="Refunds?" a="Due to instant digital delivery, refunds are limited. If there’s an issue, email Plexdithanh@gmail.com and I’ll fix it." />
          </div>
        </div>
      </div>
    </section>
  );
}

function minPrice(p: Product) {
  return Math.min(...p.variants.map((v) => v.priceGBP));
}

function ProductCard({ product }: { product: Product }) {
  const price = minPrice(product);
  return (
    <div className="group rounded-2xl border border-gray-200 bg-white p-3 shadow-sm transition hover:shadow-md">
      <Link href={`/shop/${product.slug}`} className="block overflow-hidden rounded-xl ring-1 ring-gray-200">
        <img
          src={product.hover ?? product.cover}
          alt={product.title}
          className="h-48 w-full object-cover transition group-hover:scale-[1.02]"
        />
      </Link>

      <div className="px-1 pt-3">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-base font-medium">{product.title}</h3>
          <span className="rounded-lg bg-gray-100 px-2 py-0.5 text-xs text-gray-700">£{price}</span>
        </div>
        <p className="mt-1 line-clamp-1 text-sm text-gray-600">{product.subtitle}</p>

        <div className="mt-2 flex flex-wrap gap-1.5">
          {product.tags.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-[11px] text-gray-600"
            >
              {t.replaceAll("-", " ")}
            </span>
          ))}
          {product.tags.length > 3 && (
            <span className="text-[11px] text-gray-400">+{product.tags.length - 3}</span>
          )}
        </div>

        <div className="mt-3 flex items-center gap-2">
          <Link
            href={`/shop/${product.slug}`}
            className="inline-flex flex-1 items-center justify-center rounded-full border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
          >
            View details
          </Link>
          {product.variants[0]?.stripeLink && (
            <a
              href={product.variants[0].stripeLink}
              target="_blank"
              className="inline-flex items-center justify-center rounded-full bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-black"
            >
              Buy
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <p className="font-medium">{q}</p>
      <p className="mt-1 text-sm text-gray-600">{a}</p>
    </div>
  );
}
