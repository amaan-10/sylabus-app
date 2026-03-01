"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Testimonials = () => {
  const sliderRef = useRef<HTMLUListElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;

    const scrollAmount = sliderRef.current.clientWidth / 1.2;

    sliderRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div
      className="flex flex-col items-center gap-16 lg:gap-24 w-full max-w-7xl px-4 md:px-8 lg:px-12 relative mx-auto font-poppins"
      id="testimonials"
    >
      {/* Header */}
      <div className="flex flex-col items-center gap-6 max-w-[600px] text-center">
        <div className="px-4 py-1.5 rounded-full bg-[#f0f4f3]">
          <p className="text-sm text-[#5e6b64]">Testimonials</p>
        </div>

        <h1 className="text-[34px] md:text-[40px] lg:text-5xl text-[#193625] tracking-tighter">
          What our clients say
        </h1>

        <p className="text-[#5e6b64] max-w-[620px]">
          Climate action is a long-term commitment so we're building lasting
          relationships to match.
        </p>
      </div>

      {/* Slider */}
      <div
        className="w-full relative"
        style={{
          maskImage:
            "linear-gradient(to right, rgba(0,0,0,0.3) 0%, rgb(0,0,0) 5%, rgb(0,0,0) 95%, rgba(0,0,0,0.3) 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, rgba(0,0,0,0.3) 0%, rgb(0,0,0) 5%, rgb(0,0,0) 95%, rgba(0,0,0,0.3) 100%)",
        }}
      >
        {/* Arrows */}
        <div className="absolute flex flex-row justify-between items-center gap-0 opacity-100 inset-8 top-8 left-5 right-5 bottom-8">
          <button
            onClick={() => scroll("left")}
            className="border-0 block place-content-center place-items-center overflow-hidden bg-transparent cursor-pointer m-0 p-0 w-10 h-10 rounded-none pointer-events-auto transform-none"
          >
            <ArrowLeft />
          </button>

          <button
            onClick={() => scroll("right")}
            className="border-0 block place-content-center place-items-center overflow-hidden bg-transparent cursor-pointer m-0 p-0 w-10 h-10 rounded-none pointer-events-auto transform-none"
          >
            <ArrowRight />
          </button>
        </div>

        <ul
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar py-2"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
            <li
              key={item}
              className="shrink-0 w-[calc(33.3333%-16px)] min-w-[300px]"
            >
              <div className="flex flex-col justify-between bg-[#f0f4f3] rounded-xl h-[300px] p-6">
                <div className="flex flex-col gap-6">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        viewBox="0 0 256 256"
                        className="w-5 h-5 fill-[#13261b]"
                      >
                        <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z" />
                      </svg>
                    ))}
                  </div>

                  <p className="text-[#5e6b64]">
                    “GreenLeaf helped us turn sustainability from a buzzword
                    into a real competitive advantage.”
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div
                    className="w-11 h-11 relative border-2 border-white rounded-full overflow-hidden"
                    style={{
                      boxShadow:
                        "rgba(0,0,0,0.14) 0px 0.8px 0.8px -0.5px, rgba(0,0,0,0.1) 0px 20px 20px -3px",
                    }}
                  >
                    <Image
                      src="/p1.png"
                      alt="User"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <h4 className="text-[20px] text-[#193625] tracking-tight">
                      Jamie L.
                    </h4>
                    <p className="text-sm text-[#5e6b64]">Clarity Point</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Testimonials;
