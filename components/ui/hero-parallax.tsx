"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
  useReducedMotion,
} from "motion/react";

export type Product = { title: string; link: string; thumbnail: string };

/* ===================== TOP HERO (no images behind) ===================== */
function TopHero() {
  return (
    <section className="bg-[#1f1f1f] text-white">
      <div className="mx-auto max-w-7xl px-4 py-28 text-center sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold sm:text-6xl">
          Welcome to <span className="text-white">Plexdi Studio</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white">
          Clean branding and fast front-end for developers and creators. Banners,
          logos, and portfolio sites that actually feel like you.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href="#work"
            className="rounded-full bg-white px-6 py-2.5 text-sm font-medium text-black transition hover:bg-black hover:text-white"
          >
            View projects
          </a>
          <a
            href="#contact"
            className="rounded-full border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-black transition hover:bg-black hover:text-white"
          >
            Make a Commision
          </a>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm text-black">
          {["Banners", "Logos", "Portfolio Sites", "Fast Turnaround"].map((t) => (
            <span key={t} className="rounded-full border border-gray-300 bg-white px-3 py-1">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Smooth gray → white transition into the parallax section */}
      <div className="h-12 w-full bg-gradient-to-b from-[#f6f7f8] to-white" />
    </section>
  );
}

/* ===================== PARALLAX SHOWCASE (your rows) ===================== */
function ParallaxShowcase({ products }: { products: Product[] }) {
  // 3 rows of 5 (15 total)
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);

  const ref = React.useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 40%", "end start"] });

  const prefersReduced = useReducedMotion();
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const dist = prefersReduced ? 0 : isMobile ? 420 : 900;
  const spring = { stiffness: 260, damping: 30, mass: 0.8 };

  const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, dist]), spring);
  const translateXReverse = useSpring(useTransform(scrollYProgress, [0, 1], [0, -dist]), spring);

  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.18], prefersReduced ? [0, 0] : [12, 0]),
    spring
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.18], prefersReduced ? [0, 0] : [14, 0]),
    spring
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.18], prefersReduced ? [0, 0] : [-220, 140]),
    spring
  );
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.18], [0.25, 1]), spring);

  return (
    <section ref={ref} className="relative overflow-hidden bg-white" aria-label="Showcase">
      {/* Side fade so edges feel infinite (no title overlay here) */}
      <div className="pointer-events-none absolute inset-0 mask-x-fade" />

      {/* Parallax rows */}
      <motion.div
        style={{ rotateX, rotateZ, translateY, opacity }}
        className="relative mx-auto max-w-[1600px] px-4 pb-14 pt-8 sm:px-6 lg:px-8"
      >
        <div className="mask-x-fade">
          {/* Row 1 (right→left) */}
          <motion.div className="mb-10 flex flex-row-reverse space-x-reverse space-x-6 md:mb-16 md:space-x-10">
            {firstRow.map((p) => (
              <ProductCard key={p.title} product={p} translate={translateX} />
            ))}
          </motion.div>
          {/* Row 2 (left→right) */}
          <motion.div className="mb-10 flex flex-row space-x-6 md:mb-16 md:space-x-10">
            {secondRow.map((p) => (
              <ProductCard key={p.title} product={p} translate={translateXReverse} />
            ))}
          </motion.div>
          {/* Row 3 (right→left) */}
          <motion.div className="flex flex-row-reverse space-x-reverse space-x-6 md:space-x-10">
            {thirdRow.map((p) => (
              <ProductCard key={p.title} product={p} translate={translateX} />
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <div className="relative mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <div className="h-px flex-1 bg-gradient-to-r from-gray-200 to-transparent" />
          <span>Scroll</span>
          <span>↓</span>
        </div>
      </div>
    </section>
  );
}

/* ===================== CARD ===================== */
function ProductCard({
  product,
  translate,
}: {
  product: Product;
  translate: MotionValue<number>;
}) {
  return (
    <motion.a
      href={product.link}
      style={{ x: translate }}
      whileHover={{ y: -14, scale: 1.01 }}
      className="group relative block aspect-[3/1] w-[20rem] shrink-0 overflow-hidden rounded-2xl shadow-lg ring-1 ring-gray-200 transition md:w-[34rem] lg:w-[42rem] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      aria-label={product.title}
      target={product.link.startsWith("http") ? "_blank" : undefined}
      rel={product.link.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      <img src={product.thumbnail} alt={product.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0 opacity-70 transition group-hover:opacity-90" />
      <div className="pointer-events-none absolute inset-x-0 bottom-2 flex justify-start px-4">
        <span className="translate-y-2 rounded-md bg-black/60 px-2 py-1 text-xs text-white opacity-0 backdrop-blur-sm transition group-hover:translate-y-0 group-hover:opacity-100 md:text-sm">
          {product.title}
        </span>
      </div>
    </motion.a>
  );
}

/* ===================== COMPOSED EXPORT ===================== */
export default function Hero({ products }: { products: Product[] }) {
  return (
    <>
      <TopHero />
      <ParallaxShowcase products={products} />
    </>
  );
}

/* ---- Tailwind utility (once in globals.css) ----
.mask-x-fade{
  -webkit-mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
  mask-image: linear-gradient(to right, transparent, #000 8%, transparent 92%);
}
*/
