import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="h-auto fixed z-5 flex-none top-0 left-0 right-0 font-poppins">
      <div className="contents">
        <nav className="flex flex-row place-content-center items-center gap-12 w-full h-min min-h-[72px] px-12 relative overflow-hidden">
          <div className="z-0 flex-none absolute inset-0 overflow-visible bg-white"></div>
          <div className="flex flex-row flex-[1_0_0] place-content-between items-center w-px max-w-7xl h-min p-0 relative overflow-visible">
            <div className="relative w-auto h-auto">
              <Link
                aria-label="Logo"
                className="flex flex-row place-content-center items-center gap-2 w-min h-min p-0 no-underline relative overflow-hidden"
                href="./#hero"
              >
                <div className="relative w-7 h-7">
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
                        className="absolute left-1/2 -bottom-0.5 block h-0.5 w-0 bg-[#13261b] rounded transition-all duration-300 group-hover:left-0 group-hover:w-full motion-safe:group-hover:w-full transform -translate-x-1/2 group-hover:translate-x-0"
                        aria-hidden="true"
                      />
                    </div>
                  </a>
                </div>
              ))}

              {/* search icon button (example) */}
              <div className="relative w-auto h-auto">
                <button
                  aria-label="Search Icon"
                  className="group rounded-[10px] p-0 flex items-center justify-center w-9 h-9 transition-transform duration-200 motion-safe:transition-transform
                 hover:scale-110 focus:scale-110"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 256"
                    width="18"
                    height="18"
                    style={{ color: "#13261b" }}
                  >
                    <path
                      d="M232.49,215.51,185,168a92.12,92.12,0,1,0-17,17l47.53,47.54a12,12,0,0,0,17-17ZM44,112a68,68,0,1,1,68,68A68.07,68.07,0,0,1,44,112Z"
                      fill="#13261b"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
