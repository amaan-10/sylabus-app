"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { easeIn, easeOut, motion } from "framer-motion";

const Navbar: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const prevY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    prevY.current = typeof window !== "undefined" ? window.scrollY : 0;

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      // use rAF for smoothness
      requestAnimationFrame(() => {
        const current = window.scrollY;
        const delta = current - prevY.current;

        // ignore tiny scrolls
        if (Math.abs(delta) > 10) {
          if (delta > 0 && current > 50) {
            // scrolled down -> hide
            setVisible(false);
          } else if (delta < 0) {
            // scrolled up -> show
            setVisible(true);
          }
          prevY.current = current;
        }

        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navVariants = {
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.32, ease: easeOut },
    },
    hidden: {
      y: -100,
      opacity: 0,
      transition: { duration: 0.28, ease: easeIn },
    },
  };

  return (
    <motion.div
      variants={navVariants}
      initial="visible"
      animate={visible ? "visible" : "hidden"}
      // pointerEvents disabled while hidden so it doesn't block clicks
      style={{ pointerEvents: visible ? "auto" : "none" }}
      className="h-auto fixed z-50 top-0 left-0 right-0 font-poppins"
    >
      <div className="contents">
        <nav className="flex flex-row place-content-center items-center gap-12 w-full h-min min-h-[72px] px-12 relative overflow-hidden">
          <div className="z-0 flex-none absolute inset-0 overflow-visible bg-white" />
          <div className="flex flex-row flex-[1_0_0] place-content-between items-center w-px max-w-7xl h-min p-0 relative overflow-visible">
            <div className="relative w-auto h-auto">
              <Link
                aria-label="Logo"
                className="flex flex-row place-content-center items-center gap-2 w-min h-min p-0 no-underline relative overflow-hidden"
                href="./#hero"
              >
                <div className="relative w-7 h-7">
                  {/* svg */}
                  <svg
                    version="1.0"
                    xmlns="http://www.w3.org/2000/svg"
                    width="100"
                    height="100"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="xMidYMid meet"
                    className="select-none w-full h-full inline-block shrink-0 fill-[#193625] text-[#193625]"
                  >
                    <g
                      transform="translate(0,100) scale(0.1,-0.1)"
                      fill="#193625"
                      stroke="none"
                    >
                      <path d="M626 894 l-49 -75 121 -122 121 -121 75 50 75 50 -147 147 -147 146 -49 -75z" />
                      <path d="M509 743 c-50 -26 -135 -43 -215 -43 l-50 0 -23 -97 c-13 -54 -52 -186 -87 -294 -35 -108 -64 -201 -64 -205 0 -5 81 72 180 171 113 112 178 185 175 194 -9 24 23 61 53 61 35 0 52 -16 52 -50 0 -33 -17 -50 -50 -50 -19 0 -66 -40 -205 -180 -99 -99 -176 -180 -171 -180 4 0 96 29 204 63 109 35 241 75 295 87 l97 24 0 50 c0 80 18 166 45 221 l25 50 -103 103 c-56 56 -104 101 -107 101 -3 -1 -26 -13 -51 -26z" />
                    </g>
                  </svg>
                </div>
                <div className="relative w-auto h-auto text-[#193625]">
                  <p className="text-[#193625] text-2xl">Sylabus</p>
                </div>
              </Link>
            </div>

            <div className="flex flex-row flex-none place-content-center items-center gap-6 w-min h-[41px] p-0 relative overflow-hidden">
              {["Home", "Services", "About", "Blog", "Contact"].map((label) => (
                <div key={label} className="relative w-auto h-auto">
                  <a
                    href="./#hero"
                    className="group cursor-pointer flex flex-col place-content-start items-center gap-2.5 w-min h-min p-0 no-underline relative overflow-hidden rounded-sm"
                    aria-label={label}
                  >
                    <div className="relative w-auto h-auto">
                      <span className="text-base text-[#5e6b64] transition-colors duration-200 motion-safe:transition-transform motion-safe:duration-300 group-hover:text-[#13261b] group-hover:-translate-y-0.5 motion-safe:group-hover:-translate-y-0.5 inline-block">
                        {label}
                      </span>

                      <span
                        className="absolute left-1/2 -bottom-0.5 block h-1 w-0 bg-[#13261b] rounded transition-all duration-300 group-hover:left-0 group-hover:w-full motion-safe:group-hover:w-full transform -translate-x-1/2 group-hover:translate-x-0"
                        aria-hidden="true"
                      />
                    </div>
                  </a>
                </div>
              ))}

              {/* search / login icon button */}
              <div className="relative w-auto h-auto">
                <button
                  aria-label="Login Btn"
                  onClick={() => {
                    window.location.href = "/signin";
                  }}
                  className="group rounded-full bg-[#13261b] p-2 hover:px-5 flex items-center justify-center w-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer"
                >
                  <div className="h-min hidden group-hover:flex transition-transform duration-1000 flex-row flex-none place-content-center items-center gap-2.5 pr-2 pl-0 py-0 relative overflow-visible">
                    <div className="flex-none w-auto h-auto relative">
                      <p className="text-white text-base opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                        Login
                      </p>
                    </div>
                  </div>

                  <div
                    className="flex items-center justify-center flex-row flex-nowrap gap-2.5 flex-none h-min min-h-5 min-w-5 overflow-hidden relative -rotate-90"
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
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </motion.div>
  );
};

export default Navbar;
