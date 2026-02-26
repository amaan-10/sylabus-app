"use client";
import Link from "next/link";
import React from "react";
import { wordChild, wordParent } from "../animations";
import { motion } from "framer-motion";

const About = () => {
  const segments = [
    {
      text: "Our platform simplifies paper setting",
      className: "text-[#516359]",
    },
    {
      text: "by generating syllabus-based questions",
      className: "text-[#193625]",
    },
    {
      text: "tailored to teacher's needs.",
      className: "text-[#516359]",
    },
  ];

  return (
    <section
      className="flex flex-col flex-none place-content-center items-center px-4 md:px-8 lg:px-12 gap-0 w-full h-min relative overflow-visible font-poppins"
      id="about"
    >
      <div className="flex flex-col flex-none place-content-center items-center gap-12 w-full max-w-7xl h-min p-0 relative overflow-visible">
        <div className="z-1 flex flex-col flex-none place-content-center items-center gap-6 w-full max-w-[600px] md:max-w-[900px] lg:max-w-[950px] h-min p-0 relative overflow-visible">
          <div className="flex-none w-auto h-auto relative">
            <div className="h-min flex flex-row place-content-center items-center gap-1.5 w-min px-4 py-1.5 relative overflow-hidden rounded-4xl opacity-100 bg-[rgb(240,244,243)]">
              <div className="flex-none w-auto h-auto relative">
                <p className="text-sm text-[#5e6b64]">About</p>
              </div>
            </div>
          </div>
          <div className="whitespace-pre-wrap wrap-break-word flex-none w-full h-auto relative overflow-visible">
            <motion.h2
              variants={wordParent}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="text-[34px] md:text-[40px] lg:text-5xl text-center leading-[1.1] tracking-tighter"
            >
              {segments.map((seg, i) => (
                <span key={i} className={seg.className}>
                  {seg.text.split(" ").map((word, idx) => (
                    <motion.span
                      key={`${word}-${idx}`}
                      variants={wordChild}
                      className="inline-block mr-[0.32em]"
                      style={{ willChange: "transform, filter, opacity" }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </span>
              ))}
            </motion.h2>
          </div>
        </div>
        <div className="relative group">
          <Link
            className="flex flex-row flex-nowrap items-center justify-center content-center gap-2.5 px-7 py-[13px] h-min w-min relative overflow-visible cursor-pointer no-underline border-[0.5px] border-solid rounded-[18px] bg-[#111111] opacity-100"
            data-border="true"
            style={{
              backgroundColor:
                "var(--token-6b7284e5-c42c-4865-a174-119a0270b93c, rgb(17, 17, 17))",
              boxShadow: `rgba(0, 0, 0, 0.1) 0px 0.48175px 1.25255px -1.16667px, rgba(0, 0, 0, 0.09) 0px 1.83083px 4.76015px -2.33333px, rgba(0, 0, 0, 0.043) 0px 8px 20.8px -3.5px, rgba(255, 255, 255, 0.49) 0px -2px 9px 0px inset, rgba(0, 0, 0, 0.2) 0px 0px 0px 2px`,
            }}
            href="/about"
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
              <p className="font-medium text-[#FAFAF7]">Learn More</p>
            </div>
            <div
              className="flex items-center justify-center flex-row flex-nowrap gap-2.5 flex-none h-min w-min min-h-5 min-w-5 overflow-hidden p-0 relative -rotate-45"
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
      </div>
    </section>
  );
};

export default About;
