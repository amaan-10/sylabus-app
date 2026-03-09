"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Dr. Ananya Mehta",
      role: "Academic Director",
      image: "/p1.png",
      rating: 5,
      text: "Sylabus has completely transformed the way we generate question papers. What used to take hours now happens in minutes with perfect syllabus alignment.",
    },
    {
      name: "Rahul Sharma",
      role: "Exam Coordinator",

      rating: 5,
      text: "The automatic question paper generator saves our faculty enormous time. The ability to customize difficulty and sections is a game changer.",
    },
    {
      name: "Priya Kulkarni",
      role: "Senior Mathematics Teacher",
      image: "/p2.png",
      rating: 4,
      text: "Creating balanced exam papers is now effortless. Sylabus ensures every paper follows the exact blueprint and syllabus coverage.",
    },
    {
      name: "Sandeep Verma",
      role: "Principal",
      rating: 5,
      text: "Sylabus helped us standardize our exam system across departments. The automation and accuracy are impressive.",
    },
    {
      name: "Megha Desai",
      role: "Curriculum Planner",
      rating: 4,
      image: "/p3.png",
      text: "We generate multiple question paper sets instantly. The platform ensures fairness and eliminates manual errors.",
    },
    {
      name: "Arjun Patil",
      role: "Computer Science Professor",
      rating: 5,
      text: "The syllabus-based paper generation feature is brilliant. It helps maintain academic quality while reducing workload.",
    },
    {
      name: "Sneha Joshi",
      role: "Academic Coordinator",
      rating: 4,
      text: "Sylabus makes exam preparation incredibly smooth. Teachers can create question papers quickly without worrying about format or coverage.",
    },
    {
      name: "Vikram Singh",
      role: "Examination Head",
      rating: 5,
      text: "From blueprint creation to final question paper generation, everything is seamless. It’s one of the best tools we’ve implemented.",
    },
    {
      name: "Neha Kapoor",
      role: "School Administrator",
      rating: 5,
      text: "Sylabus has modernized our examination workflow. The automation and flexibility make it indispensable for our institution.",
    },
  ];

  const sliderRef = useRef<HTMLUListElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
  const infiniteTestimonials = [...testimonials, ...testimonials];

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const startAutoScroll = () => {
      autoScrollRef.current = setInterval(() => {
        const card = slider.children[0] as HTMLElement;
        const gap = 24;
        const scrollAmount = card.offsetWidth + gap;

        slider.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });

        if (slider.scrollLeft >= slider.scrollWidth / 2) {
          slider.scrollLeft = 0;
        }
      }, 3500);
    };

    startAutoScroll();

    return () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    const slider = sliderRef.current;
    if (!slider) return;

    const card = slider.children[0] as HTMLElement;
    const gap = 24;
    const scrollAmount = card.offsetWidth + gap;

    slider.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
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
          Educators and institutions trust Sylabus to automate question paper
          generation while maintaining academic quality and syllabus accuracy.
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
          onMouseEnter={() =>
            autoScrollRef.current && clearInterval(autoScrollRef.current)
          }
          onMouseLeave={() => {
            autoScrollRef.current = setInterval(() => {
              const slider = sliderRef.current;
              if (!slider) return;

              const card = slider.children[0] as HTMLElement;
              const gap = 24;
              const scrollAmount = card.offsetWidth + gap;

              slider.scrollBy({
                left: scrollAmount,
                behavior: "smooth",
              });
            }, 3500);
          }}
          className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar py-2 snap-x snap-mandatory cursor-grab active:cursor-grabbing"
        >
          {infiniteTestimonials.map((item, index) => (
            <li
              key={index}
              className="shrink-0 w-[calc(33.3333%-16px)] min-w-[300px] snap-start"
            >
              <div className="flex flex-col justify-between bg-[#f0f4f3] rounded-xl h-[300px] p-6">
                <div className="flex flex-col gap-6">
                  <div className="flex gap-1">
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          viewBox="0 0 256 256"
                          className={`w-5 h-5 ${
                            i < item.rating ? "fill-[#13261b]" : "fill-gray-300"
                          }`}
                        >
                          <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z" />
                        </svg>
                      ))}
                    </div>
                  </div>

                  <p className="text-[#5e6b64]">“{item.text}”</p>
                </div>

                <div className="flex items-center gap-4">
                  <div
                    className="w-11 h-11 relative border-2 border-white rounded-full overflow-hidden"
                    style={{
                      boxShadow:
                        "rgba(0,0,0,0.14) 0px 0.8px 0.8px -0.5px, rgba(0,0,0,0.1) 0px 20px 20px -3px",
                    }}
                  >
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full bg-[#193625] text-white text-base">
                        {getInitials(item.name)}
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="text-[20px] text-[#193625] tracking-tight">
                      {item.name}
                    </h4>
                    <p className="text-sm text-[#5e6b64]">{item.role}</p>
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
