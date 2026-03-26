"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { fadeUp, fadeUpFromBottom, parentStagger } from "../animations";
import { motion } from "framer-motion";
import { Download, FileText, LogIn, SlidersHorizontal } from "lucide-react";

const Hero = ({ hasSession }: { hasSession: boolean }) => {
  const steps = [
    {
      title: "Log In to Your Dashboard",
      description: "Access your dashboard and start creating papers instantly.",
      imageSrc: "/step1.png",
      imageAlt: "dashboard preview",
      icon: LogIn,
    },
    {
      title: "Choose Paper Requirements",
      description: "Select class, chapters, marks, and difficulty settings.",
      imageSrc: "/step2.png",
      imageAlt: "paper requirements",
      icon: SlidersHorizontal,
    },
    {
      title: "Generate Question Paper",
      description:
        "Prepares a clean, structured, syllabus-aligned paper quickly.",
      imageSrc: "/step3.png",
      imageAlt: "generated questions",
      icon: FileText,
    },
    {
      title: "Download & Print Instantly",
      description: "Get your paper in PDF for easy printing and distribution.",
      imageSrc: "/step4.png",
      imageAlt: "download instantly",
      icon: Download,
    },
  ];
  return (
    <section
      className="flex flex-col flex-none place-content-center items-center gap-16 md:gap-24 w-full h-min pt-[100px] px-4 md:px-8 lg:px-12 pb-0 relative overflow-visible font-poppins"
      id="hero"
    >
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
                  className="text-[51px] md:text-[64px] lg:text-[80px] text-[#193625] leading-[51px] md:leading-16 lg:leading-20 text-center tracking-tighter"
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
          <motion.div
            variants={fadeUp}
            className="flex flex-col md:flex-row items-center justify-center gap-4 w-full max-w-sm sm:max-w-none font-urbanist"
          >
            <div className="relative group">
              <Link
                className="flex flex-row flex-nowrap items-center justify-center content-center gap-2.5 px-7 py-[13px] h-min w-min relative overflow-visible cursor-pointer no-underline border-[0.5px] border-solid rounded-[18px] bg-[#111111] opacity-100"
                data-border="true"
                style={{
                  backgroundColor:
                    "var(--token-6b7284e5-c42c-4865-a174-119a0270b93c, rgb(17, 17, 17))",
                  boxShadow: `rgba(0, 0, 0, 0.1) 0px 0.48175px 1.25255px -1.16667px, rgba(0, 0, 0, 0.09) 0px 1.83083px 4.76015px -2.33333px, rgba(0, 0, 0, 0.043) 0px 8px 20.8px -3.5px, rgba(255, 255, 255, 0.49) 0px -2px 9px 0px inset, rgba(0, 0, 0, 0.2) 0px 0px 0px 2px`,
                }}
                href={hasSession ? "/dashboard" : "/signin"}
              >
                <div
                  className="flex-none h-auto relative whitespace-pre w-auto"
                  style={
                    {
                      outline: "none",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      flexShrink: 0,
                      transform: "none",
                      opacity: 1,
                    } as React.CSSProperties
                  }
                >
                  <p className="font-medium text-[#FAFAF7]">Get Started</p>
                  {/* <Image
                    src="/icon/for-institutes.png"
                    alt="for-institutes"
                    width={115}
                    height={115}
                    className="self-end max-w-fit"
                  /> */}
                </div>
                <div
                  className="flex items-center justify-center flex-row flex-nowrap gap-2.5 flex-none h-min w-min min-h-5 min-w-5 overflow-hidden p-0 relative -rotate-90"
                  style={{ opacity: 1 }}
                >
                  <div className="absolute transition-all duration-300 ease-in-out group-hover:translate-x-[21px] group-hover:translate-y-[21px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--token-21001bb2-95fc-4899-93cf-7cca6736a1a2, rgb(250, 250, 247))"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ width: "100%", height: "100%" }}
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
                      stroke="var(--token-21001bb2-95fc-4899-93cf-7cca6736a1a2, rgb(250, 250, 247))"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ width: "100%", height: "100%" }}
                    >
                      <line x1="7" y1="7" x2="17" y2="17"></line>
                      <polyline points="17 7 17 17 7 17"></polyline>
                    </svg>
                  </div>
                </div>
              </Link>
            </div>

            <div className="relative group">
              <a
                className="flex flex-row  flex-nowrap  items-center  justify-center  cursor-pointer  gap-2.5  h-min  w-min  overflow-visible  p-[13px_28px]  relative  no-underline border-[0.5px] border-[#f0ece7] border-solid rounded-[18px] opacity-100"
                data-border="true"
                style={{
                  backgroundColor:
                    "var(--token-f395e90f-e08f-456b-b155-0974850affb9, rgb(255, 255, 255))",
                  boxShadow: `0px 0px 0px -2.5px rgba(0, 0, 0, 0.13189), 0px 0px 0px -5px rgba(0, 0, 0, 0), inset 0px -1px 4px 0px rgba(0, 0, 0, 0.15), 0px 0px 0px 2px var(--token-caa7547d-cf57-44d3-92c2-01fcbf1068be, rgb(243, 243, 241))`,
                }}
                href="#about"
                data-framer-name="Button Light Icon Up"
              >
                <div
                  className="flex-none h-auto relative whitespace-pre w-auto"
                  style={
                    {
                      outline: "none",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      flexShrink: 0,
                      transform: "none",
                      opacity: 1,
                    } as React.CSSProperties
                  }
                >
                  <p className="font-medium text-black">Learn more</p>
                </div>
                <div
                  className="flex items-center justify-center flex-row flex-nowrap gap-2.5 flex-none h-min w-min min-h-5 min-w-5 overflow-hidden p-0 relative"
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
                    >
                      <line x1="7" y1="7" x2="17" y2="17"></line>
                      <polyline points="17 7 17 17 7 17"></polyline>
                    </svg>
                  </div>
                </div>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
      <motion.div
        variants={parentStagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="flex md:grid md:flex-none gap-6 auto-rows-fr grid-cols-2 grid-rows-2 h-min justify-center md:max-w-[900px] flex-col md:flex-row items-center content-center max-w-[400px] overflow-visible p-0 relative w-full"
      >
        {steps.map((step, key) => {
          const Icon = step.icon;

          return (
            <motion.div
              key={key}
              variants={fadeUpFromBottom}
              className="place-self-start flex-none h-[250px] relative w-full"
            >
              <div className="relative flex flex-col justify-between items-start bg-[#f0f4f3] h-full rounded-[20px] overflow-hidden p-6">
                <Icon
                  className="absolute -right-10 top-1/2 -translate-y-1/2 w-52 h-52 text-[#193625]/10 blur-[1px] pointer-events-none"
                  strokeWidth={1.5}
                />

                {/* Top Row */}
                <div className="relative z-10 flex flex-row justify-between items-start w-full">
                  <div
                    className="flex justify-center items-center flex-none p-2 bg-white rounded-full"
                    style={{
                      boxShadow:
                        "rgba(0, 0, 0, 0.14) 0px 0.78363px 0.78363px -0.5px, rgba(0, 0, 0, 0.14) 0px 1.91965px 1.91965px -1px, rgba(0, 0, 0, 0.13) 0px 3.63745px 3.63745px -1.5px, rgba(0, 0, 0, 0.13) 0px 6.35004px 6.35004px -2px, rgba(0, 0, 0, 0.12) 0px 11.0519px 11.0519px -2.5px, rgba(0, 0, 0, 0.1) 0px 20.2428px 20.2428px -3px, rgba(0, 0, 0, 0.06) 0px 40px 40px -3.5px",
                    }}
                  >
                    <div className="flex justify-center items-center h-8 w-8">
                      <span className="text-[26px] font-semibold text-[#193625] leading-none">
                        {key + 1}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Text Content */}
                <div className="relative z-10 flex flex-col gap-2 max-w-lg w-full">
                  <h3 className="text-2xl md:text-[28px] text-[#193625] leading-[1.2em] tracking-tight">
                    {step.title}
                  </h3>

                  <p className="text-[16px] text-[#5e6b64] leading-[1.5em]">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default Hero;
