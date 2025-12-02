"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { fadeUp, fadeUpFromBottom, parentStagger } from "./animations";
import { motion } from "framer-motion";

const Hero = () => {
  const steps = [
    {
      title: "Log In to Your Dashboard",
      description: "Access your dashboard and start creating papers instantly.",
      imageSrc: "/step-1.png",
      imageAlt: "dashboard preview",
    },
    {
      title: "Choose Your Paper Requirements",
      description: "Select class, chapters, marks, and difficulty settings.",
      imageSrc: "/step-2.png",
      imageAlt: "paper requirements",
    },
    {
      title: "Generate Your Question Paper",
      description:
        "Prepares a clean, structured, syllabus-aligned paper quickly.",
      imageSrc: "/step-3.png",
      imageAlt: "generated questions",
    },
    {
      title: "Download & Print Instantly",
      description: "Export your ready-to-use paper in one click.",
      imageSrc: "/step-4.png",
      imageAlt: "download instantly",
    },
  ];
  return (
    <section
      className="flex flex-col flex-none place-content-center items-center gap-24 w-full h-min pt-[100px] px-12 pb-0 relative overflow-visible font-poppins"
      id="hero"
    >
      <motion.div
        variants={parentStagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.3 }}
        className="flex flex-col flex-none place-content-center items-center gap-16 w-full max-w-7xl h-min p-0 relative overflow-visible"
      >
        <motion.div
          variants={parentStagger}
          className="flex flex-col flex-none place-content-center items-center gap-12 w-full max-w-[800px] h-min p-0 relative overflow-visible"
        >
          <div className="flex flex-col flex-none place-content-center items-center gap-6 w-full h-min p-0 relative overflow-visible">
            <div className="flex-none w-auto h-auto relative">
              <motion.div
                variants={fadeUp}
                className="px-4 py-1.5 rounded-4xl bg-[#F0F4F3] flex items-center gap-2"
              >
                <div className="w-1.5 h-1.5 bg-[#13261B] rounded-full"></div>
                <p className="text-sm text-[#5e6b64]">
                  Effortless Paper Setting
                </p>
              </motion.div>
            </div>
            <div className="flex flex-col flex-none place-content-center items-center gap-6 w-full h-min p-0 relative overflow-visible">
              <div className="flex-none w-full h-auto relative">
                <motion.h1
                  variants={fadeUp}
                  className="text-[80px] text-[#193625] leading-20 text-center tracking-tighter"
                >
                  Generate Custom Papers Instantly
                </motion.h1>
              </div>
              <div className="flex-none w-full max-w-[620px] h-auto relative">
                <motion.p
                  variants={fadeUp}
                  className="text-[#5e6b64] text-center"
                >
                  Create custom question papers instantly with AI. Choose
                  chapters, marks, and difficulty levels while the system
                  generates accurate, syllabus-aligned questions effortlessly.
                </motion.p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap flex-none place-content-center items-center gap-4 w-full h-min p-0 relative overflow-visible">
            <motion.div
              variants={fadeUp}
              className="flex-none w-auto h-auto relative"
            >
              <Link
                className="cursor-pointer flex flex-row place-content-center items-center gap-0 h-min px-6 py-4 no-underline relative overflow-visible bg-[#13261b] hover:bg-[#a85613] transition-colors duration-300 rounded-[37px] shadow-xl shadow-[rgba(19,38,27,0.4)] hover:shadow-[rgb(168,86,19,0.4)] opacity-100 group"
                href="https://cal.com/"
                target="_blank"
                rel="noopener"
              >
                <div className="h-min flex flex-row flex-none place-content-center items-center gap-2.5 pr-2 pl-0 py-0 relative overflow-visible">
                  <div className="flex-none w-auto h-auto relative">
                    <p className="text-base text-white font-semibold">
                      Experience It Yourself
                    </p>
                  </div>
                </div>
                <div
                  className="flex items-center justify-center flex-row flex-nowrap gap-2.5 flex-none h-min min-h-5 min-w-5 overflow-hidden mr-[3px] relative -rotate-45"
                  style={{ opacity: 1 }}
                >
                  <div className="absolute transition-all duration-300 ease-in-out group-hover:translate-x-[21px] group-hover:translate-y-[21px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--token-21001bb2-95fc-4899-93cf-7cca6736a1a2, rgb(0, 0, 0))"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ width: "100%", height: "100%" }}
                      className="stroke-white transition-colors duration-300"
                    >
                      <line x1="7" y1="7" x2="17" y2="17"></line>
                      <polyline points="17 7 17 17 7 17"></polyline>
                    </svg>
                  </div>

                  <div className="absolute top-[-21px] left-[-21px] w-5 h-5 transition-all duration-300 ease-in-out group-hover:translate-x-[21px] group-hover:translate-y-[21px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--token-21001bb2-95fc-4899-93cf-7cca6736a1a2, rgb(0, 0, 0))"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ width: "100%", height: "100%" }}
                      className=" stroke-white transition-colors duration-300"
                    >
                      <line x1="7" y1="7" x2="17" y2="17"></line>
                      <polyline points="17 7 17 17 7 17"></polyline>
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
      <motion.div
        variants={parentStagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.3 }}
        className="grid flex-none gap-5 auto-rows-fr h-min justify-center overflow-visible p-0 relative w-full
             grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      >
        {steps.map((step, key) => (
          <motion.div
            key={key}
            variants={fadeUpFromBottom}
            className="relative w-full h-full"
          >
            <div
              className="flex flex-col items-start justify-start cursor-default gap-5 w-full rounded-[30px] h-min p-2.5 pb-[30px] relative"
              style={{
                backgroundColor: "#f0f4f3",
                boxShadow:
                  "rgba(0,0,0,0.05) 0px 1px 2px, rgba(0,0,0,0.04) 0px 3px 6px", // Light soft shadow
              }}
            >
              <div
                className="flex items-center justify-center flex-row flex-nowrap gap-2.5 h-[290px] overflow-hidden p-0 relative w-full rounded-t-[25px] rounded-b-[40px]"
                style={{
                  backgroundColor: "#4a4949",
                }}
              >
                <div className="flex-[1_0_0px] h-[290px] overflow-visible relative w-px z-0 rounded-[20px]">
                  <div className="absolute inset-0 rounded-[inherit]">
                    <Image
                      decoding="async"
                      loading="lazy"
                      width={1920}
                      height={1920}
                      sizes="(max-width: 1024px) 100vw, 25vw"
                      src={step.imageSrc}
                      alt={step.imageAlt}
                      className="block w-full h-full rounded-[inherit] object-center object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* STEP LABEL */}
              <div className="flex flex-col gap-5 w-full px-2.5">
                <div className="flex flex-row items-center gap-2.5">
                  <div className="flex-none">
                    <div className="flex items-center gap-2 px-2.5 py-[5px] bg-[#e8ffe3] rounded-[10px] shadow-[rgba(0,0,0,0.04)_0px_1px_2px]">
                      <div className="h-[5px] w-[5px] bg-[#6cd840] rounded-full shadow-[rgba(0,0,0,0.07)_0px_1px_2px]" />
                      <p className="text-base font-medium text-[#3b4a3e]">
                        Step {key + 1}
                      </p>
                    </div>
                  </div>
                </div>

                {/* HEADING */}
                <h4 className="text-2xl font-semibold text-[#193625] leading-[1.1]">
                  {step.title}
                </h4>

                {/* DESCRIPTION */}
                <p className="text-base text-[#516359]">{step.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Hero;
