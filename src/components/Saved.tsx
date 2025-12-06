import { Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Saved = () => {
  return (
    <section className="border border-[rgba(0,0,0,0.08)] bg-white rounded-2xl flex justify-between items-center flex-[1_0_0] flex-col h-[97.5vh] overflow-hidden pt-14 px-8 pb-8 relative w-px gap-5">
      <div className="flex place-content-center items-center flex-none flex-col gap-5 h-min max-w-[1200px] overflow-hidden p-0 relative w-full">
        <div className="flex place-content-start justify-between items-start flex-none flex-row h-min overflow-hidden p-0 relative w-full">
          <div className="outline-none flex flex-col justify-start shrink-0 flex-none h-auto relative whitespace-pre w-auto">
            <h4 className="text-2xl text-[#193625] tracking-tight">
              Saved Papers
            </h4>
          </div>
        </div>
        <div className="flex place-content-center items-center flex-none flex-row gap-2.5 h-min overflow-hidden p-0 relative w-full">
          <div className="flex-[1_0_0] h-auto relative w-px">
            <div className="flex place-content-center items-center flex-row gap-2.5 h-min overflow-hidden p-0 relative w-full">
              <div className="flex-none h-auto relative w-auto">
                <div className="flex place-content-center items-center flex-col gap-6 overflow-hidden p-10 relative bg-[#f9f9f9] rounded-3xl shadow-[0_0_12px_rgba(0,0,0,0.04)_inset] opacity-100">
                  <div className="aspect-[1.95849/1] flex-none h-[196px] overflow-hidden relative w-full">
                    <div className="absolute inset-0 rounded-inherit">
                      <Image
                        decoding="async"
                        width="1684"
                        height="1132"
                        sizes="calc(100vw - 168px)"
                        src="/saved.png"
                        alt=""
                        className="block w-full h-full rounded-inherit object-center object-contain"
                      />
                    </div>
                  </div>
                  <div className="flex place-content-center items-center flex-none flex-col gap-5 h-min overflow-visible p-0 relative w-full">
                    <div className="flex place-content-center items-center flex-none flex-col gap-1 h-min overflow-visible p-0 relative w-full">
                      <div className="flex-none h-auto relative whitespace-pre-wrap w-full wrap-break-word outline-none flex flex-col justify-start shrink-0 opacity-100">
                        <p className="text-2xl text-[#193625] tracking-tight text-center">
                          Saved Papers will appear here
                        </p>
                      </div>
                      <div className="flex-none h-auto relative whitespace-pre-wrap w-full wrap-break-word outline-none flex flex-col justify-start shrink-0 opacity-60">
                        <p className="text-sm text-[#193625] tracking-tight text-center">
                          Add papers to bookmarks to have them appear here
                        </p>
                      </div>
                    </div>
                    <div className="flex-none h-auto relative w-auto">
                      <Link
                        href="./courses"
                        className="flex place-content-center items-center cursor-pointer flex-row gap-2 h-min overflow-hidden px-3 py-2 relative no-underline w-min bg-[#191a20] rounded-sm opacity-100 border-0"
                      >
                        <div className="flex-none h-auto relative whitespace-pre w-auto outline-none flex flex-col justify-start shrink-0 opacity-100">
                          <p className="text-sm text-white tracking-tight">
                            Generate and Save Papers
                          </p>
                        </div>
                        <div className="flex-none h-5 w-5 relative shrink-0 opacity-100">
                          <div className="svgContainer w-full h-full aspect-[inherit] flex items-center justify-center">
                            <Sparkles className="text-white h-4 w-4" />
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-none h-auto relative w-full">
        <div className="flex place-content-center items-center flex-col gap-2.5 h-min overflow-hidden p-0 relative w-full">
          <div className="flex place-content-center justify-between items-center flex-none flex-row h-min max-w-[1200px] overflow-visible p-0 relative w-full">
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
            <div className="flex place-content-center items-center flex-none flex-row gap-3 h-min overflow-hidden p-0 relative w-min">
              <div className="flex-none h-auto relative whitespace-pre w-auto outline-none flex flex-col justify-start shrink-0 opacity-100">
                <p className="text-xs text-[#193625]">
                  <Link
                    className="text-xs text-[#193625]"
                    href="./privacy-policy"
                  >
                    Privacy Policy
                  </Link>
                </p>
              </div>
              <div className="flex-none h-auto relative whitespace-pre w-auto outline-none flex flex-col justify-start shrink-0 opacity-100">
                <p className="text-xs text-[#193625]">
                  <Link
                    className="text-xs text-[#193625]"
                    href="./terms-of-service"
                  >
                    Terms of Service{" "}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Saved;
