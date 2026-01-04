import About from "@/components/About";
import Benefits from "@/components/Benefits";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import { cookies } from "next/headers";

export default async function Home() {
  const hasSession = Boolean((await cookies()).get("session"));
  return (
    <div className="flex flex-col place-content-start items-center gap-20 md:gap-32 lg:gap-40 h-min min-h-screen w-auto p-0 relative overflow-visible">
      <Navbar hasSession={hasSession} />
      <Hero />
      <About />
      <Services />
      <Benefits />
      <Footer />
    </div>
  );
}
