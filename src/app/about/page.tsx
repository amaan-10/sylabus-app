"use client";
import CTA from "@/components/home/CTA";
import Footer from "@/components/home/Footer";
import Navbar from "@/components/home/Navbar";
import { motion } from "framer-motion";
import { fadeUp, parentStagger } from "@/components/animations";
const AboutPage = () => {
  //   const hasSession = Boolean((await cookies()).get("session"));
  return (
    <div className="flex flex-col place-content-start items-center gap-20 md:gap-32 lg:gap-40 h-min min-h-screen w-auto p-0 relative overflow-visible">
      <Navbar hasSession={false} />
      <section className="flex flex-col flex-none place-content-center items-center gap-16 md:gap-24 w-full h-min pt-32 px-4 md:px-8 lg:px-12 pb-0 relative overflow-visible font-poppins">
        <motion.div
          variants={parentStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col flex-none place-content-center items-center gap-16 w-full max-w-7xl h-min p-0 relative overflow-visible"
        >
          <motion.div
            variants={parentStagger}
            className="flex flex-col flex-none place-content-center items-center gap-12 w-full max-w-[575px] md:max-w-[800px] h-min p-0 relative overflow-visible"
          >
            <div className="flex flex-col flex-none place-content-center items-center gap-6 w-full h-min p-0 relative overflow-visible">
              <div className="flex-none w-auto h-auto relative">
                <motion.div
                  variants={fadeUp}
                  className="px-4 py-1.5 rounded-4xl bg-[#F0F4F3] flex items-center gap-2"
                >
                  <p className="text-sm text-[#5e6b64]">About us</p>
                </motion.div>
              </div>
              <div className="flex flex-col flex-none place-content-center items-center gap-6 w-full h-min p-0 relative overflow-visible">
                <div className="flex-none w-full h-auto relative">
                  <motion.h1
                    variants={fadeUp}
                    className="text-[51px] md:text-[64px] lg:text-[80px] text-[#193625] leading-[51px] md:leading-16 lg:leading-20 text-center tracking-tighter"
                  >
                    Our story so far
                  </motion.h1>
                </div>
                <div className="flex-none w-full max-w-[620px] h-auto relative">
                  <motion.p
                    variants={fadeUp}
                    className="text-[#5e6b64] text-center"
                  >
                    Get to know the team behind the scenes, explore our journey
                    so far, and see how we're revolutionizing question paper
                    creation with AI technology.
                  </motion.p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>
      <CTA />
      <Footer />
    </div>
  );
};

export default AboutPage;
