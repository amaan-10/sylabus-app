"use client";
import CTA from "@/components/home/CTA";
import Footer from "@/components/home/Footer";
import Navbar from "@/components/home/Navbar";
import { motion } from "framer-motion";
import { fadeUp, parentStagger } from "@/components/animations";
import Image from "next/image";
import LogoMarquee from "@/components/Marquee";

const AboutPage = () => {
  //   const hasSession = Boolean((await cookies()).get("session"));
  return (
    <div className="flex flex-col place-content-start items-center gap-20 md:gap-32 lg:gap-40 h-min min-h-screen w-auto p-0 relative overflow-visible font-poppins">
      <Navbar hasSession={false} />
      <section className="flex flex-col flex-none place-content-center items-center gap-16 md:gap-24 w-full h-min pt-32 px-4 md:px-8 lg:px-12 pb-0 relative overflow-visible">
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
      <section
        className="flex flex-col items-center justify-center w-full h-min px-12 relative overflow-visible gap-0"
        id="who-we-are"
      >
        <div className="flex flex-row items-center justify-center gap-16 w-full max-w-7xl h-min p-0 relative overflow-visible">
          <div className="z-1 flex flex-col flex-[1_0_0] place-content-start items-start gap-6 h-min w-px p-0 top-[100px] overflow-visible">
            <div className="flex-none w-max h-auto relative">
              <div className="h-min flex flex-row place-content-center items-center gap-1.5 w-min px-4 py-1.5 relative overflow-hidden rounded-4xl opacity-100 bg-[#f0f4f3]">
                <div className="flex-none w-max h-auto relative">
                  <p className="text-sm text-[#5e6b64]">Who we are</p>
                </div>
              </div>
            </div>
            <div className="flex-none w-full h-auto relative">
              <h1 className="text-[34px] md:text-[40px] lg:text-5xl text-[#193625] leading-[1.1] tracking-tighter w-full">
                About Sylabus
              </h1>
            </div>
            <div className="flex-none w-full max-w-[620px] h-auto relative">
              <p className="text-[#5e6b64]">
                Sylabus is an AI-powered question paper generator that helps
                educators quickly create high-quality papers. It simplifies the
                process, reduces manual effort, and lets teachers focus more on
                teaching while delivering a better learning experience.
              </p>
            </div>
            <div className="whitespace-pre-wrap wrap-break-word w-full h-auto relative">
              <p className="text-[#5e6b64]">Trusted by:</p>
            </div>
            <LogoMarquee />
          </div>
          <div className="aspect-square will-change-transform rounded-[20px] flex-[1_0_0] relative overflow-hidden">
            <div className="will-change-transform rounded-[20px] flex-none absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 rounded-inherit">
                <Image
                  decoding="auto"
                  width="1024"
                  height="1024"
                  sizes="max((min(100vw - 136px, 1280px) - 64px) / 2, 1px)"
                  src="/sylabus.png"
                  alt="Sylabus"
                  className="block w-full h-full object-center object-cover rounded-[inherit]"
                />
              </div>
              {/* <div
                class="framer-87ma7d-container"
                style="will-change: transform; opacity: 1; transform: translateY(20px);"
              >
                <div
                  class="framer-UaM98 framer-FZIVT framer-st3bo7 framer-v-h0fucf"
                  data-framer-name="Blur"
                  style="--10ocmuz: 6px 16px 6px 16px; backdrop-filter: blur(10px); background-color: rgba(209, 209, 209, 0.25); border-radius: 32px; opacity: 1;"
                >
                  <div
                    class="framer-l3eoxm"
                    data-framer-component-type="RichTextContainer"
                    style="--framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; --extracted-r6o4lv: var(--token-a889bef8-b27f-49ca-abb1-f59cd0820711, rgb(255, 255, 255)); transform: none; opacity: 1;"
                  >
                    <p
                      class="framer-text framer-styles-preset-10181gm"
                      data-styles-preset="Y8JjgkGIV"
                      style="--framer-text-color: var(--extracted-r6o4lv, var(--token-a889bef8-b27f-49ca-abb1-f59cd0820711, rgb(255, 255, 255)));"
                    >
                      Carbon experts
                    </p>
                  </div>
                </div>
              </div> */}
              {/* <div
                class="framer-5n3kq-container"
                style="will-change: transform; opacity: 1; transform: translateY(-20px);"
              >
                <div
                  class="framer-UaM98 framer-FZIVT framer-st3bo7 framer-v-h0fucf"
                  data-framer-name="Blur"
                  style="--10ocmuz: 6px 16px 6px 16px; backdrop-filter: blur(10px); background-color: rgba(209, 209, 209, 0.25); border-radius: 32px; opacity: 1;"
                >
                  <div
                    class="framer-l3eoxm"
                    data-framer-component-type="RichTextContainer"
                    style="--framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; --extracted-r6o4lv: var(--token-a889bef8-b27f-49ca-abb1-f59cd0820711, rgb(255, 255, 255)); transform: none; opacity: 1;"
                  >
                    <p
                      class="framer-text framer-styles-preset-10181gm"
                      data-styles-preset="Y8JjgkGIV"
                      style="--framer-text-color: var(--extracted-r6o4lv, var(--token-a889bef8-b27f-49ca-abb1-f59cd0820711, rgb(255, 255, 255)));"
                    >
                      Impact-obsessed
                    </p>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>
      <CTA />
      <Footer />
    </div>
  );
};

export default AboutPage;
