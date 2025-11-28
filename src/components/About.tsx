import Link from "next/link";
import React from "react";

const About = () => {
  return (
    <section
      className="flex flex-col flex-none place-content-center items-center gap-0 w-full h-min relative overflow-visible font-poppins"
      id="about"
    >
      <div className="flex flex-col flex-none place-content-center items-center gap-12 w-full max-w-7xl h-min p-0 relative overflow-visible">
        <div className="z-1 flex flex-col flex-none place-content-center items-center gap-6 w-full max-w-[900px] h-min p-0 relative overflow-visible">
          <div className="flex-none w-auto h-auto relative">
            <div className="h-min flex flex-row place-content-center items-center gap-1.5 w-min px-4 py-1.5 relative overflow-hidden rounded-4xl opacity-100 bg-[rgb(240,244,243)]">
              <div className="flex-none w-auto h-auto relative">
                <p className="text-sm text-[#5e6b64]">About</p>
              </div>
            </div>
          </div>
          <div className="whitespace-pre-wrap wrap-break-word flex-none w-full h-auto relative overflow-visible">
            <h2 className="text-[#193625] text-5xl text-center">
              <span className="text-[#516359]">
                We&apos;re a small team of passionate{" "}
              </span>
              carbon experts helping forward-thinking companies{" "}
              <span className="text-[#516359]">prepare for the future.</span>
            </h2>
          </div>
        </div>
        <div className="flex flex-wrap flex-none place-content-center items-center gap-4 w-full h-min p-0 relative overflow-visible">
          <div className="flex-none w-auto h-auto relative">
            <Link
              className="cursor-pointer flex flex-row place-content-center items-center gap-0 h-min px-6 py-4 no-underline relative overflow-visible bg-[rgb(19,38,27)] hover:bg-[rgb(168,86,19)] transition-colors duration-300 rounded-[37px] shadow-[rgba(24,52,36,0.15)_0px_1.20932px_1.20932px_-0.46875px,rgba(24,52,36,0.15)_0px_2.86629px_2.86629px_-0.9375px,rgba(24,52,36,0.14)_0px_5.22841px_5.22841px_-1.40625px,rgba(24,52,36,0.14)_0px_8.69222px_8.69222px_-1.875px,rgba(24,52,36,0.13)_0px_14.0372px_14.0372px_-2.34375px,rgba(24,52,36,0.12)_0px_22.9776px_22.9776px_-2.8125px,rgba(24,52,36,0.1)_0px_39.5658px_39.5658px_-3.28125px,rgba(24,52,36,0.05)_0px_72px_72px_-3.75px] opacity-100 group"
              href="https://cal.com/"
              target="_blank"
              rel="noopener"
            >
              <div className="h-min flex flex-row flex-none place-content-center items-center gap-2.5 pr-2 pl-0 py-0 relative overflow-visible">
                <div className="flex-none w-auto h-auto relative">
                  <p className="text-base text-white font-semibold">
                    Learn More
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
    </section>
  );
};

export default About;
