"use client";
import Link from "next/link";
import React from "react";
import { wordChild, wordParent } from "../animations";
import { motion } from "framer-motion";
import Image from "next/image";

const CTA = () => {
  return (
    <section
      className="flex flex-col flex-none place-content-center items-center gap-2.5 w-full h-min px-4 md:px-8 lg:px-12 relative overflow-hidden font-poppins"
      id="cta"
    >
      <div className="flex flex-row place-content-center items-center gap-2.5 w-full max-w-[600px] md:max-w-7xl h-min p-0 relative overflow-hidden">
        <div className="flex-[1_0_0] w-px h-auto relative">
          <div className="flex flex-col gap-12 pt-12 px-5 pb-5 md:flex-row place-content-center items-center md:gap-12 lg:gap-16 bg-[#f0f4f3] w-full rounded-3xl opacity-100 h-min min-h-[500px] md:py-0 md:px-12 relative overflow-hidden will-change-transform">
            <div className="flex flex-col flex-[1_0_0] content-start justify-center items-start gap-12 w-full lg:w-px max-w-[700px] h-min py-0 md:py-12 lg:py-32 relative overflow-visible rounded-lg opacity-100">
              <div className="flex flex-col flex-none place-content-center items-center gap-6 w-full h-min p-0 relative overflow-hidden">
                <div className="flex-none w-full h-auto relative">
                  <h1 className="text-[34px] md:text-[40px] lg:text-5xl text-[#193625] tracking-tighter text-center md:text-left">
                    Ready to generate papers in seconds?
                  </h1>
                </div>
                <div className="flex-none w-full h-auto relative">
                  <p className="text-[#5e6b64] text-center md:text-left">
                    Try Sylabus today and experience AI-powered exam creation
                    built for modern educators.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap flex-none content-center justify-center md:justify-start items-center gap-4 w-full h-min p-0 relative overflow-visible">
                <div className="flex-none w-auto h-auto relative">
                  <div className="relative group">
                    <Link
                      className="flex flex-row flex-nowrap items-center justify-center content-center gap-2.5 px-7 py-[13px] h-min w-min relative overflow-visible cursor-pointer no-underline border-[0.5px] border-solid rounded-[18px] bg-[#111111] opacity-100"
                      data-border="true"
                      style={{
                        backgroundColor:
                          "var(--token-6b7284e5-c42c-4865-a174-119a0270b93c, rgb(17, 17, 17))",
                        boxShadow: `rgba(0, 0, 0, 0.1) 0px 0.48175px 1.25255px -1.16667px, rgba(0, 0, 0, 0.09) 0px 1.83083px 4.76015px -2.33333px, rgba(0, 0, 0, 0.043) 0px 8px 20.8px -3.5px, rgba(255, 255, 255, 0.49) 0px -2px 9px 0px inset, rgba(0, 0, 0, 0.2) 0px 0px 0px 2px`,
                      }}
                      href="/institute/login"
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
                        <p className="font-medium text-[#FAFAF7]">
                          Start My Free Trial
                        </p>
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
                </div>
              </div>
            </div>
            <div className="flex flex-col self-auto flex-none w-full h-[400px] md:flex-[0.5_0_0] place-content-center md:self-stretch items-center gap-2.5 md:w-px md:h-auto p-0 relative overflow-visible">
              <div className="z-2 hidden md:block flex-none h-12 absolute top-0 -left-12 -right-12 overflow-visible backdrop-blur-md [mask:linear-gradient(0deg,rgba(0,0,0,0)_0%,rgb(0,0,0)_100%)] opacity-100"></div>

              <div className="flex flex-row flex-none content-start justify-center items-start gap-2 md:gap-4 w-full h-full p-0 relative overflow-visible">
                <div className="flex-[1_0_0] w-px h-full relative overflow-hidden rounded-[20px]">
                  <div className="absolute left-1/2 -translate-x-1/2 flex flex-col gap-2 md:gap-4 animate-scroll-up w-full">
                    {[
                      { src: "/cta/Book.png", alt: "Book" },
                      { src: "/cta/Brain.png", alt: "Brain" },
                      { src: "/cta/Certificate.png", alt: "Certificate" },
                      { src: "/cta/Teacher.png", alt: "Teacher" },
                      { src: "/cta/Laptop.png", alt: "Laptop" },
                      { src: "/cta/Flask.png", alt: "Flask" },
                    ].map((img, i) => (
                      <div
                        key={i}
                        className="aspect-[0.75] h-[229px] md:h-[156px] lg:h-[221px] relative overflow-hidden rounded-[20px]"
                      >
                        <Image
                          width={992}
                          height={1200}
                          src={img.src}
                          alt={img.alt}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}

                    {[
                      { src: "/cta/Book.png", alt: "Book" },
                      { src: "/cta/Brain.png", alt: "Brain" },
                      { src: "/cta/Certificate.png", alt: "Certificate" },
                      { src: "/cta/Teacher.png", alt: "Teacher" },
                      { src: "/cta/Laptop.png", alt: "Laptop" },
                      { src: "/cta/Flask.png", alt: "Flask" },
                    ].map((img, i) => (
                      <div
                        key={`dup-${i}`}
                        className="aspect-[0.75] h-[229px] md:h-[156px] lg:h-[221px] relative overflow-hidden rounded-[20px]"
                      >
                        <Image
                          width={992}
                          height={1200}
                          src={img.src}
                          alt={img.alt}
                          className="block w-full h-full rounded-[inherit] object-center object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex-[1_0_0] w-px h-full relative overflow-hidden rounded-[20px]">
                  <div className="absolute left-1/2 -translate-x-1/2 flex flex-col gap-2 md:gap-4 animate-scroll-down w-full">
                    {[
                      { src: "/cta/WhiteBoard.png", alt: "WhiteBoard" },
                      { src: "/cta/Graduation Cap.png", alt: "Graduation Cap" },
                      { src: "/cta/Certificate.png", alt: "Certificate" },
                      { src: "/cta/Trophy.png", alt: "Trophy" },
                      { src: "/cta/Question Paper.png", alt: "Question Paper" },
                    ].map((img, i) => (
                      <div
                        key={i}
                        className="aspect-[0.75] h-[229px] md:h-[156px] lg:h-[221px] relative overflow-hidden rounded-[20px]"
                      >
                        <Image
                          width={992}
                          height={1200}
                          src={img.src}
                          alt={img.alt}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}

                    {[
                      { src: "/cta/WhiteBoard.png", alt: "WhiteBoard" },
                      { src: "/cta/Graduation Cap.png", alt: "Graduation Cap" },
                      { src: "/cta/Certificate.png", alt: "Certificate" },
                      { src: "/cta/Trophy.png", alt: "Trophy" },
                      { src: "/cta/Question Paper.png", alt: "Question Paper" },
                    ].map((img, i) => (
                      <div
                        key={`dup-${i}`}
                        className="aspect-[0.75] h-[229px] md:h-[156px] lg:h-[221px] relative overflow-hidden rounded-[20px]"
                      >
                        <Image
                          width={992}
                          height={1200}
                          src={img.src}
                          alt={img.alt}
                          className="block w-full h-full rounded-[inherit] object-center object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="z-1 hidden md:block flex-none h-12 absolute bottom-0 -left-12 -right-12 overflow-visible backdrop-blur-md [mask:linear-gradient(rgba(0,0,0,0)_0%,rgb(0,0,0)_100%)] opacity-100"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
