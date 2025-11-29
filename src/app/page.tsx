import About from "@/components/About";
import Benefits from "@/components/Benefits";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services";

export default function Home() {
  return (
    <div className="flex flex-col place-content-start items-center gap-40 h-min min-h-screen w-auto p-0 relative overflow-visible">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Benefits />
      <Footer />
    </div>
  );
}
