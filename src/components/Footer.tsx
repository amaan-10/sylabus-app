import { Instagram, Youtube } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="flex flex-col place-content-center items-center gap-0 w-full h-min px-4 md:px-8 lg:px-12 py-16 md:py-24 relative overflow-hidden bg-[#13261b] rounded-t-[20px] opacity-100 font-poppins">
      <div className="flex flex-col flex-none place-content-center items-center gap-16 w-full max-w-7xl h-min p-0 relative overflow-visible">
        <div className="flex flex-col md:flex-row flex-none place-content-start items-start gap-12 md:gap-24 w-full h-min p-0 relative overflow-visible">
          <div className="flex flex-col flex-[1_0_0] place-content-start items-start gap-6 h-min p-0 relative overflow-visible">
            <div className="flex-none w-auto h-auto relative">
              <Link
                aria-label="Logo"
                href={"/"}
                className="flex flex-row place-content-center items-center gap-3 w-min h-min p-0 no-underline relative overflow-hidden"
              >
                <div className="relative w-[42px] h-[42px]">
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
                  <p className="text-white text-4xl">Sylabus</p>
                </div>
              </Link>
            </div>
            <div className="whitespace-pre-wrap wrap-break-word flex-none w-full h-auto relative">
              <p className="text-white">
                Effortless Paper Setting for Educators.
              </p>
            </div>
            {/* <div className="flex gap-4">
              <Instagram className="w-6 h-6 flex self-center text-white hover:text-gray-300 cursor-pointer" />
              <Youtube className="w-7 h-7 text-white hover:text-gray-300 cursor-pointer" />
            </div> */}
          </div>
          <div className="flex flex-col flex-none place-content-start items-start gap-8 w-min h-min p-0 relative overflow-visible">
            {/* <div className="whitespace-pre flex-none w-auto h-auto relative">
              <p className="text-white text-2xl">Pages</p>
            </div> */}
            <nav className="flex flex-col flex-none place-content-start items-start gap-4 w-min h-min p-0 relative overflow-visible">
              {["Home", "About", "Services", "Benefits"].map((label) => (
                <div key={label} className="flex-none w-auto h-auto relative">
                  <Link
                    href={`./#${label.toLowerCase()}`}
                    className="group cursor-pointer flex flex-col place-content-start items-center gap-2.5 w-min h-min p-0 no-underline relative overflow-hidden rounded-sm"
                  >
                    <div className="whitespace-pre flex-none w-auto h-auto relative">
                      <span className="text-base text-white/60 transition-colors duration-200 motion-safe:transition-transform motion-safe:duration-300 group-hover:text-[#ffffff] group-hover:-translate-y-0.5 motion-safe:group-hover:-translate-y-0.5 inline-block">
                        {label}
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </nav>
          </div>
          <div className="flex flex-col flex-none place-content-start items-start gap-8 w-min h-min p-0 relative overflow-visible">
            {/* <div className="whitespace-pre flex-none w-auto h-auto relative">
              <p className="text-white text-2xl">Information</p>
            </div> */}
            <nav className="flex flex-col flex-none place-content-start items-start gap-4 w-min h-min p-0 relative overflow-visible">
              {[
                { label: "Get Started", href: "/signin" },
                { label: "Dashboard", href: "/dashboard" },
                { label: "Contact", href: "/contact" },
                { label: "Terms", href: "/policies/terms-of-service" },
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
            </nav>
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
                <Link
                  className="text-xs text-white"
                  href="/policies/privacy-policy"
                >
                  Privacy Policy
                </Link>
              </p>
            </div>
            <div className="flex-none h-auto relative whitespace-pre w-auto outline-none flex flex-col justify-start shrink-0 opacity-100">
              <p className="text-xs">
                <Link
                  className="text-xs text-white"
                  href="/policies/terms-of-service"
                >
                  Terms of Service{" "}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
