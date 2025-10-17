'use client';
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative mt-24 bg-white text-gray-700">
      {/* Top gradient border */}
      <div className="h-px w-full bg-gradient-to-r from-blue-500/50 via-fuchsia-500/50 to-pink-500/50" />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand / blurb */}
          <div className="md:col-span-5">
            <h3 className="text-xl font-semibold text-gray-900">Plexdi Studio</h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-gray-600">
              Design + frontend for developers and creators. Clean visuals,
              fast sites, and a brand that feels like you.
            </p>

            {/* Contact */}
            <div className="mt-5">
              <p className="text-sm text-gray-500">Business enquiries</p>
              <a
                href="mailto:Plexdithanh@gmail.com"
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                Plexdithanh@gmail.com
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Site</h4>
              <ul className="mt-3 space-y-2 text-sm">
                <li><Link href="#about" className="hover:text-gray-900">About</Link></li>
                <li><Link href="#work" className="hover:text-gray-900">Projects</Link></li>
                <li><Link href="#services" className="hover:text-gray-900">Services</Link></li>
                <li><Link href="#contact" className="hover:text-gray-900">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-900">Products</h4>
              <ul className="mt-3 space-y-2 text-sm">
                <li><Link href="/templates" className="hover:text-gray-900">Templates</Link></li>
                <li><Link href="/packs" className="hover:text-gray-900">Overlay Packs</Link></li>
                <li><Link href="/resources" className="hover:text-gray-900">Resources</Link></li>
                <li><Link href="/faq" className="hover:text-gray-900">FAQ</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-900">Social</h4>
              <ul className="mt-3 space-y-2 text-sm">
                <li><a href="https://twitter.com/" target="_blank" className="hover:text-gray-900">X / Twitter</a></li>
                <li><a href="https://www.linkedin.com/" target="_blank" className="hover:text-gray-900">LinkedIn</a></li>
                <li><a href="https://discord.gg/VVg6T6j5yk" target="_blank" className="hover:text-gray-900">Discord</a></li>
                <li><a href="https://github.com/" target="_blank" className="hover:text-gray-900">GitHub</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-6 sm:flex-row">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Plexdi Studio. All rights reserved.
          </p>

          <div className="flex items-center gap-3 text-xs">
            <Link href="/privacy" className="hover:text-gray-900">Privacy</Link>
            <span className="text-gray-300">•</span>
            <Link href="/terms" className="hover:text-gray-900">Terms</Link>
            <span className="text-gray-300">•</span>
            <a
              href="#top"
              className="rounded-full border border-gray-300 bg-gray-50 px-3 py-1 hover:bg-gray-100 transition"
            >
              Back to top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
