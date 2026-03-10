import { Instagram, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="flex flex-col place-content-center items-center gap-[60px] bg-[#13261b] w-full will-change-transform opacity-100 -translate-y-[0.218906px] h-min px-4 md:px-8 lg:px-12 py-16 md:py-24 relative overflow-hidden font-poppins">
      <div className="z-3 flex flex-col flex-none place-content-center items-center gap-16 w-full h-min p-0 relative overflow-visible">
        <div className="flex flex-col flex-none place-content-center items-center gap-8 w-full max-w-[840px] h-min p-0 relative overflow-visible">
          <div className="flex-none w-auto h-auto relative">
            <Link
              aria-label="Logo"
              href={"/"}
              className="flex flex-row place-content-center items-center gap-3 w-min h-min p-0 no-underline relative overflow-hidden"
            >
              <div className="relative w-10 h-10">
                <svg
                  version="1.0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="100"
                  height="100"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="xMidYMid meet"
                  className="select-none w-full h-full inline-block shrink-0 fill-white text-white"
                >
                  <g
                    transform="translate(0,100) scale(0.1,-0.1)"
                    fill="#ffffff"
                    stroke="none"
                  >
                    <path d="M626 894 l-49 -75 121 -122 121 -121 75 50 75 50 -147 147 -147 146 -49 -75z" />
                    <path d="M509 743 c-50 -26 -135 -43 -215 -43 l-50 0 -23 -97 c-13 -54 -52 -186 -87 -294 -35 -108 -64 -201 -64 -205 0 -5 81 72 180 171 113 112 178 185 175 194 -9 24 23 61 53 61 35 0 52 -16 52 -50 0 -33 -17 -50 -50 -50 -19 0 -66 -40 -205 -180 -99 -99 -176 -180 -171 -180 4 0 96 29 204 63 109 35 241 75 295 87 l97 24 0 50 c0 80 18 166 45 221 l25 50 -103 103 c-56 56 -104 101 -107 101 -3 -1 -26 -13 -51 -26z" />
                  </g>
                </svg>
              </div>
              <div className="relative w-auto h-auto text-white">
                <p className="text-white text-3xl">Sylabus</p>
              </div>
            </Link>
          </div>
          <div className="flex flex-col flex-none place-content-center items-center gap-6 w-full h-min p-0 relative overflow-visible">
            <div className="flex flex-col flex-none place-content-center items-center gap-6 w-full h-min p-0 relative overflow-visible">
              <div className="whitespace-pre-wrap wrap-break-word flex-none w-full h-auto relative">
                <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-medium text-white">
                  Create, Customize & Generate Question Papers with Sylabus
                </h2>
              </div>
              <div className="relative group">
                <Link
                  href="/signin"
                  className="flex flex-row flex-nowrap items-center justify-center cursor-pointer gap-2.5 h-min w-min overflow-visible p-[13px_28px] relative no-underline border border-solid rounded-[18px] opacity-100"
                  style={{
                    backgroundColor: "rgb(255, 255, 255)",
                    boxShadow:
                      "0px 0px 0px -2.5px rgba(0, 0, 0, 0.13189), 0px 0px 0px -5px rgba(0, 0, 0, 0), inset 0px -1px 4px 0px rgba(0, 0, 0, 0.15), 0px 0px 0px 2px rgb(243, 243, 241)",
                  }}
                >
                  <div
                    className="flex-none h-auto relative whitespace-pre w-auto"
                    style={{
                      outline: "none",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      flexShrink: 0,
                      transform: "none",
                      opacity: 1,
                    }}
                  >
                    <p className="font-medium text-black">
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
                        stroke="rgb(0, 0, 0)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ width: "100%", height: "100%" }}
                      >
                        <line x1="7" y1="7" x2="17" y2="17" />
                        <polyline points="17 7 17 17 7 17" />
                      </svg>
                    </div>
                    <div className="absolute top-[-21px] left-[-21px] w-5 h-5 transition-all duration-300 ease-in-out group-hover:translate-x-[21px] group-hover:translate-y-[21px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="rgb(0, 0, 0)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ width: "100%", height: "100%" }}
                      >
                        <line x1="7" y1="7" x2="17" y2="17" />
                        <polyline points="17 7 17 17 7 17" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="z-3 flex flex-col flex-none place-content-center items-center gap-6 w-full h-min p-0 relative overflow-hidden">
        <div className="flex flex-col flex-wrap flex-none place-content-center items-center gap-8 w-full h-min p-0 relative overflow-hidden">
          <div className="z-1 flex flex-row flex-wrap flex-none place-content-center items-center gap-5 w-full h-min p-0 relative overflow-visible">
            {[
              { label: "Home", href: "/home" },
              { label: "About", href: "/about" },
              { label: "Services", href: "/#services" },
              { label: "Benefits", href: "/#benefits" },
              { label: "Pricing", href: "/#pricing" },
              { label: "FAQ", href: "/#faq" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex-none w-auto h-auto relative"
              >
                <Link
                  href={item.href}
                  className="group cursor-pointer flex flex-col place-content-start items-center gap-2.5 w-min h-min p-0 no-underline relative overflow-hidden rounded-sm"
                >
                  <div className="whitespace-pre flex-none w-auto h-auto relative">
                    <span className="text-base text-white/60 transition-colors duration-200 motion-safe:transition-transform motion-safe:duration-300 group-hover:text-[#ffffff] group-hover:-translate-y-0.5 motion-safe:group-hover:-translate-y-0.5 inline-block">
                      {item.label}
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="z-1 flex flex-row flex-wrap flex-none place-content-center items-center gap-5 w-full h-min p-0 relative overflow-visible">
            {[
              { label: "Get Started", href: "/signin" },
              { label: "Contact", href: "/contact" },
              { label: "Feedback", href: "/feedback" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex-none w-auto h-auto relative"
              >
                <Link
                  href={item.href}
                  className="group cursor-pointer flex flex-col place-content-start items-center gap-2.5 w-min h-min p-0 no-underline relative overflow-hidden rounded-sm"
                >
                  <div className="whitespace-pre flex-none w-auto h-auto relative">
                    <span className="text-base text-white/60 transition-colors duration-200 motion-safe:transition-transform motion-safe:duration-300 group-hover:text-[#ffffff] group-hover:-translate-y-0.5 motion-safe:group-hover:-translate-y-0.5 inline-block">
                      {item.label}
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap flex-row flex-none justify-between place-content-center items-center gap-5 w-full h-min pt-12 pl-0 pr-0 relative overflow-visible border-t border-[#969696] border-solid opacity-100">
          <div>
            <p className="text-white text-sm">
              © 2025 Sylabus, All rights reserved
            </p>
          </div>
          <div className="flex place-content-center items-center flex-none flex-row gap-3 h-min overflow-hidden p-0 relative w-min">
            <div className="flex-none h-auto relative whitespace-pre w-auto outline-none flex flex-col justify-start shrink-0 opacity-100">
              <p className="text-xs ">
                <a
                  className="text-xs text-white"
                  href="/policies/privacy-policy"
                >
                  Privacy Policy
                </a>
              </p>
            </div>
            <div className="flex-none h-auto relative whitespace-pre w-auto outline-none flex flex-col justify-start shrink-0 opacity-100">
              <p className="text-xs">
                <a
                  className="text-xs text-white"
                  href="/policies/terms-of-service"
                >
                  Terms of Service{" "}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
