import React from "react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section
      className="flex flex-col flex-none place-content-center items-center gap-24 w-full h-min pt-[100px] px-12 pb-0 relative overflow-visible font-poppins"
      id="hero"
    >
      <div className="flex flex-col flex-none place-content-center items-center gap-16 w-full max-w-7xl h-min p-0 relative overflow-visible">
        <div className="flex flex-col flex-none place-content-center items-center gap-12 w-full max-w-[800px] h-min p-0 relative overflow-visible">
          <div className="flex flex-col flex-none place-content-center items-center gap-6 w-full h-min p-0 relative overflow-visible">
            <div className="flex-none w-auto h-auto relative">
              <div className="h-min flex flex-row place-content-center items-center gap-1.5  px-4 pr-4 pl-2.5 py-1.5 relative overflow-hidden bg-[rgb(240,244,243)] opacity-100 rounded-4xl backdrop-filter-none">
                <div className="flex-none w-auto h-auto relative">
                  <div
                    className="flex flex-row place-content-center items-center gap-2.5 w-[18px] h-[18px] p-0 relative overflow-hidden"
                    data-framer-name="Start"
                    data-highlight="true"
                  >
                    <div
                      className="framer-11wwdp1"
                      data-framer-name="Outer"
                    ></div>
                    <div
                      className="aspect-square h-1.5 w-1.5 z-1 flex-none absolute top-1/2 left-1/2 overflow-hidden bg-[rgb(19,38,27)] opacity-100 rounded-full"
                      style={{
                        willChange: "transform",
                        height: "var(--framer-aspect-ratio-supported, 6px)",
                        backgroundColor:
                          "var(--token-b853b0e1-8e9d-431d-b182-a32c05b25cd4, rgb(19,38,27))",
                        transform: "translate(-50%, -50%)",
                      }}
                    ></div>
                  </div>
                </div>
                <div className="flex-none w-auto h-auto relative">
                  <p className="text-sm text-[#5e6b64]">
                    Effortless Paper Setting
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col flex-none place-content-center items-center gap-6 w-full h-min p-0 relative overflow-visible">
              <div className="flex-none w-full h-auto relative">
                <h1 className="text-[80px] text-[#193625] leading-20 text-center tracking-tighter">
                  Generate Custom Papers Instantly
                </h1>
              </div>
              <div className="flex-none w-full max-w-[620px] h-auto relative">
                <p className="text-[#5e6b64] text-center">
                  Create custom question papers instantly with AI. Choose
                  chapters, marks, and difficulty levels while the system
                  generates accurate, syllabus-aligned questions effortlessly.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap flex-none place-content-center items-center gap-4 w-full h-min p-0 relative overflow-visible">
            <div className="flex-none w-auto h-auto relative">
              <Link
                className="cursor-pointer flex flex-row place-content-center items-center gap-0 h-min px-6 py-4 no-underline relative overflow-visible bg-[rgb(19,38,27)] hover:bg-[rgb(168,86,19)] transition-colors duration-300 rounded-[37px] shadow-xl shadow-[rgba(19,38,27,0.4)] hover:shadow-[rgb(168,86,19,0.4)] opacity-100 group"
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
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-[20px] flex flex-row flex-none place-content-center items-center gap-6 w-full max-w-[1600px] h-min p-0 relative overflow-visible">
        <div className="aspect-[0.75] h-[344px] rounded-[20px] flex-[1_0_0] w-px relative overflow-hidden">
          <div className="rounded-[20px] flex-none w-full h-full absolute top-0 left-0 overflow-hidden">
            <div className="absolute inset-0 rounded-inherit">
              <Image
                decoding="auto"
                width="992"
                height="1200"
                sizes="max((min(100vw - 96px, 1600px) - 72px) / 4, 1px)"
                className="block w-full h-full rounded-inherit object-center object-cover"
                src=""
                alt="Close-up of a dark green leaf showing its textured surface and central vein against a muted background."
              />
            </div>
          </div>
        </div>
        <div className="aspect-[0.75] h-[344px] rounded-[20px] flex-[1_0_0] w-px relative overflow-hidden">
          <div className="rounded-[20px] flex-none w-full h-full absolute top-0 left-0 overflow-hidden">
            <div className="absolute inset-0 rounded-inherit">
              <Image
                decoding="auto"
                width="992"
                height="1200"
                sizes="max((min(100vw - 96px, 1600px) - 72px) / 4, 1px)"
                className="block w-full h-full rounded-inherit object-center object-cover"
                src=""
                alt="Close-up of a dark green leaf showing its textured surface and central vein against a muted background."
              />
            </div>
          </div>
        </div>
        <div className="aspect-[0.75] h-[344px] rounded-[20px] flex-[1_0_0] w-px relative overflow-hidden">
          <div className="rounded-[20px] flex-none w-full h-full absolute top-0 left-0 overflow-hidden">
            <div className="absolute inset-0 rounded-inherit">
              <Image
                decoding="auto"
                width="992"
                height="1200"
                sizes="max((min(100vw - 96px, 1600px) - 72px) / 4, 1px)"
                className="block w-full h-full rounded-inherit object-center object-cover"
                src=""
                alt="Close-up of a dark green leaf showing its textured surface and central vein against a muted background."
              />
            </div>
          </div>
        </div>
        <div className="aspect-[0.75] h-[344px] rounded-[20px] flex-[1_0_0] w-px relative overflow-hidden">
          <div className="rounded-[20px] flex-none w-full h-full absolute top-0 left-0 overflow-hidden">
            <div className="absolute inset-0 rounded-inherit">
              <Image
                decoding="auto"
                width="992"
                height="1200"
                sizes="max((min(100vw - 96px, 1600px) - 72px) / 4, 1px)"
                className="block w-full h-full rounded-inherit object-center object-cover"
                src=""
                alt="Close-up of a dark green leaf showing its textured surface and central vein against a muted background."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
