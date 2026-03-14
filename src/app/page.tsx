import About from "@/components/home/About";
import Benefits from "@/components/home/Benefits";
import Footer from "@/components/home/Footer";
import Hero from "@/components/home/Hero";
import Navbar from "@/components/home/Navbar";
import Services from "@/components/home/Services";
import { cookies } from "next/headers";
import CTA from "@/components/home/CTA";
import FAQ from "@/components/home/FAQ";
import Testimonials from "@/components/home/Testimonials";
import Pricing from "@/components/home/Pricing";

export default async function Home() {
  const hasSession = Boolean((await cookies()).get("session"));
  return (
    <div className="flex flex-col place-content-start items-center gap-20 md:gap-32 lg:gap-40 h-min min-h-screen w-auto p-0 relative overflow-visible">
      <Navbar hasSession={hasSession} />
      <Hero hasSession={hasSession} />
      <About />
      <Services />
      <Benefits />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
