"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  RiYoutubeFill,
  RiInstagramLine,
  RiBehanceLine,
  RiDiscordFill,
  RiTwitterXLine,
  RiShoppingBagLine,
  RiMenuLine,
  RiCloseLine,
  RiTwitchFill,
} from "react-icons/ri";

// ---- Configurable items ----
const NAV_ITEMS: { href: string; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/freebies", label: "Freebies" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/moodboards", label: "Moodboards" },
];

const SOCIALS: { href: string; label: string; icon: React.ReactNode }[] = [
  { href: "https://youtube.com", label: "YouTube", icon: <RiYoutubeFill size={22} /> },
  { href: "https://instagram.com", label: "Instagram", icon: <RiInstagramLine size={22} /> },
  { href: "https://behance.net", label: "Behance", icon: <RiBehanceLine size={22} /> },
  { href: "https://x.com", label: "X", icon: <RiTwitterXLine size={20} /> },
  { href: "https://discord.com", label: "Discord", icon: <RiDiscordFill size={22} /> },
  { href: "https://discord.com", label: "Twitch", icon: <RiTwitchFill size={22} /> },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/75 shadow-md ring-1 ring-black/5">
      <div className="mx-auto max-w-7xl px-4">
        {/* Desktop */}
        <div className="hidden h-16 md:h-20 grid-cols-3 items-center md:grid">
          <div />
          <nav className="justify-self-center">
            <ul className="flex items-center gap-8">
              {NAV_ITEMS.map((item) => {
                const isActive = item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`group relative inline-flex items-center px-1 py-1 text-sm tracking-wide transition-colors ${
                        isActive ? "text-black" : "text-neutral-700 hover:text-black"
                      } after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-black after:transition-transform after:duration-300 after:ease-out group-hover:after:scale-x-100 ${
                        isActive ? "after:scale-x-100" : ""
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="flex items-center justify-self-end gap-5">
            {SOCIALS.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={s.label}
                className="text-black transition-opacity hover:opacity-70"
              >
                {s.icon}
              </Link>
            ))}
            <button aria-label="Cart" className="text-black transition-opacity hover:opacity-70">
              <RiShoppingBagLine size={22} />
            </button>
          </div>
        </div>

        {/* Mobile */}
        <div className="flex h-16 items-center justify-between md:hidden">
          <button onClick={() => setOpen((v) => !v)} aria-label="Toggle menu" className="p-2 text-black">
            {open ? <RiCloseLine size={24} /> : <RiMenuLine size={24} />}
          </button>
          <div className="flex items-center gap-4">
            {SOCIALS.map((s) => (
              <Link key={s.label} href={s.href} target="_blank" rel="noreferrer noopener" aria-label={s.label} className="text-black">
                {s.icon}
              </Link>
            ))}
            <button aria-label="Cart" className="text-black">
              <RiShoppingBagLine size={22} />
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {open && (
          <div className="md:hidden">
            <nav className="border-t">
              <ul className="flex flex-col py-2">
                {NAV_ITEMS.map((item) => {
                  const isActive = item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`group relative block px-2 py-3 text-sm ${
                          isActive ? "text-black" : "text-neutral-700 hover:text-black"
                        } after:absolute after:left-2 after:bottom-2 after:h-[2px] after:w-[calc(100%-1rem)] after:origin-left after:scale-x-0 after:bg-black after:transition-transform after:duration-300 after:ease-out group-hover:after:scale-x-100 ${
                          isActive ? "after:scale-x-100" : ""
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
