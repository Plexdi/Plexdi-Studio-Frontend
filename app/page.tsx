
import { products } from "./data/product";
import AboutMe from "@/components/AboutMe";
import Footer from "@/components/Footer";
import HeroParallax from "@/components/ui/hero-parallax";

export default function Home() {
  return(
    <div className="">
      <main className="bg-white text-black">
        <HeroParallax products={products}/>
      </main>
      <AboutMe />
      <Footer />
    </div>
  )
}
