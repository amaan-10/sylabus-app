"use client";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Crown,
  NotepadText,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";

const Dashboard = () => {
  const dashboardFeatures = [
    {
      title: "Auto-Generate Question Paper",
      description: "Instantly create syllabus-aligned papers using AI.",
      imageSrc: "/a2.png",
      imageAlt: "Auto Generate Question Paper",
      href: "./generate-paper",
    },
    {
      title: "Custom Paper",
      description: "Manually select questions and structure your paper.",
      imageSrc: "/b2.png",
      imageAlt: "Custom Paper",
      href: "./custom-paper",
    },
    {
      title: "Quick Quiz Generator",
      description: "Create short quizzes for quick tests in seconds.",
      imageSrc: "/q1.png",
      imageAlt: "Quick Quiz Generator",
      href: "./quick-quiz",
    },
    {
      title: "Question Bank Explorer",
      description: "Browse and filter AI-generated questions easily.",
      imageSrc: "/qb1.png",
      imageAlt: "Question Bank Explorer",
      href: "./question-bank",
    },
  ];

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const items = [
    {
      id: 1,
      imgSrc: "/eng-img.png",
      imgAlt: "english",
      title: "English",
      badges: ["SSC", "Secondary"],
      details: ["8 Chapters", "1,235 Questions"],
    },
    {
      id: 2,
      imgSrc: "/mar-img.png",
      imgAlt: "marathi",
      title: "Marathi",
      badges: ["SSC", "Secondary"],
      details: ["8 Chapters", "1,235 Questions"],
    },
    {
      id: 3,
      imgSrc: "/hin-img.png",
      imgAlt: "hindi",
      title: "Hindi",
      badges: ["SSC", "Secondary"],
      details: ["8 Chapters", "1,235 Questions"],
    },
    {
      id: 4,
      imgSrc: "/sci-img.png",
      imgAlt: "science",
      title: "Science",
      badges: ["SSC", "Secondary"],
      details: ["8 Chapters", "1,235 Questions"],
    },
    {
      id: 5,
      imgSrc: "/math-img.png",
      imgAlt: "maths",
      title: "Maths",
      badges: ["SSC", "Secondary"],
      details: ["8 Chapters", "1,235 Questions"],
    },
    {
      id: 6,
      imgSrc: "/hist-img.png",
      imgAlt: "history",
      title: "History",
      badges: ["SSC", "Secondary"],
      details: ["8 Chapters", "1,235 Questions"],
    },
    {
      id: 7,
      imgSrc: "/geo-img.png",
      imgAlt: "geography",
      title: "Geography",
      badges: ["SSC", "Secondary"],
      details: ["8 Chapters", "1,235 Questions"],
    },
  ];

  const userTier = "Pro+";
  const tierColors = {
    Free: "bg-gray-100 text-gray-700",
    Plus: "bg-blue-100 text-blue-700",
    "Pro+": "bg-purple-100 text-purple-700",
  };

  return (
    <section className="border border-[rgba(0,0,0,0.08)] place-content-center items-center bg-white rounded-2xl flex flex-[1_0_0] flex-col gap-14 h-min overflow-hidden py-16 px-8 pb-8 relative w-px">
      <div className="flex place-content-center items-center flex-none flex-col gap-14 h-min max-w-[1200px] overflow-hidden p-0 relative w-full">
        <div className="flex place-content-center justify-between items-center flex-none flex-row h-min overflow-visible p-0 relative w-full">
          <div className="flex place-content-center items-center flex-none flex-row gap-2 h-min overflow-hidden p-0 relative w-min">
            <div className="outline-none flex flex-col justify-start shrink-0 flex-none h-auto relative whitespace-pre w-auto">
              <h4 className="text-2xl text-[#193625] tracking-tight">
                Hi, Samina
              </h4>
            </div>
            <div className="flex place-content-center items-center flex-none flex-row gap-1 h-min overflow-hidden p-0 relative w-min">
              <div className="outline-none flex flex-col justify-start shrink-0 flex-none h-auto relative whitespace-pre w-auto">
                <h4 className="text-2xl text-[#193625] tracking-tight">👋</h4>
              </div>
            </div>
          </div>
          <div className="flex place-content-start items-start flex-none flex-row gap-4 h-min overflow-visible p-0 relative w-min">
            <div
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border border-[rgba(0,0,0,0.08)] ${
                tierColors[userTier as keyof typeof tierColors]
              }`}
            >
              <Crown className="w-4 h-4" />
              <span className="text-xs font-semibold">{userTier}</span>
            </div>
            <Link
              className="border border-[#f4f4f4] place-content-center justify-start items-center rounded-lg flex flex-none flex-row gap-0 h-min overflow-visible py-2 px-4 relative no-underline w-min"
              href="./search"
            >
              <div className="outline-none flex flex-col justify-start shrink-0 flex-none h-auto relative whitespace-pre-wrap w-[170px] wrap-break-word opacity-40">
                <p className="text-xs text-[#191a20]">Search</p>
              </div>
              <div className="flex-none h-5 w-5 relative shrink-0 [image-rendering:pixelated] text-[#191a2066]">
                <div className="svgContainer w-full h-full aspect-[inherit]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#191a2066"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-full h-full lucide lucide-search-icon lucide-search"
                  >
                    <path d="m21 21-4.34-4.34" />
                    <circle cx="11" cy="11" r="8" />
                  </svg>
                </div>
              </div>
            </Link>
            <Link
              className="border border-[#f4f4f4] place-content-center justify-start items-center rounded-lg flex flex-none flex-row gap-2 h-min overflow-visible py-2 px-4 relative no-underline w-min"
              href="./search"
            >
              <div className="flex-none h-5 w-5 relative shrink-0 [image-rendering:pixelated] text-[#191a2066]">
                <div className="svgContainer w-full h-full aspect-[inherit]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#191a2066"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-full h-full lucide lucide-list-filter-icon lucide-list-filter"
                  >
                    <path d="M2 5h20" />
                    <path d="M6 12h12" />
                    <path d="M9 19h6" />
                  </svg>
                </div>
              </div>
              <div className="outline-none flex flex-col justify-start shrink-0 flex-none h-auto relative whitespace-pre w-auto opacity-60">
                <p className="text-xs text-[#191a20]">Filters</p>
              </div>
            </Link>
          </div>
        </div>
        <div className="flex place-content-start items-start flex-none flex-col gap-6 h-min overflow-hidden p-0 relative w-full">
          <div className="outline-none flex flex-col justify-start shrink-0 flex-none h-auto relative whitespace-pre w-auto">
            <p className="text-sm text-[#191a20]">FEATURED</p>
          </div>
          <div className="flex place-content-center justify-start items-center flex-none flex-col gap-4 h-min overflow-auto p-0 relative w-full">
            <div className="grid flex-none gap-4 auto-rows-min grid-cols-[repeat(2,minmax(50px,1fr))] h-min justify-center p-0 relative w-full">
              {dashboardFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="place-self-start flex-none h-auto relative w-full"
                >
                  <Link
                    className="flex place-content-start justify-between items-start cursor-pointer flex-col h-[313px] overflow-hidden p-6 relative no-underline w-full rounded-3xl opacity-100"
                    href={feature.href}
                  >
                    <div className="absolute inset-0 rounded-[inherit]">
                      <Image
                        decoding="async"
                        width="2912"
                        height="1666"
                        sizes="max((min(max(100vw - 112px, 1px) - 64px, 1200px) - 16px) / 2, 50px)"
                        src={feature.imageSrc}
                        alt={feature.imageAlt}
                        className="block w-full h-full rounded-[inherit] object-center object-cover"
                      />
                    </div>
                    {/* <div className="flex-none h-full absolute left-0 top-0 overflow-visible w-full z-0 bg-[linear-gradient(#0000_0%,#000_120%)] opacity-100"></div> */}
                    <div className="flex place-content-center justify-between items-center flex-none flex-row h-min overflow-hidden p-0 relative w-full"></div>
                    <div className="flex place-content-start items-start flex-none flex-col gap-2 h-min max-w-lg overflow-hidden p-0 relative w-full">
                      <div className="outline-none flex flex-col justify-start shrink-0 flex-none h-auto relative whitespace-pre-wrap w-full wrap-break-word origin-center">
                        <h4 className="text-2xl text-[#193625] tracking-tight">
                          {feature.title}
                        </h4>
                      </div>
                      <div className="outline-none flex flex-col justify-start shrink-0 flex-none h-auto relative whitespace-pre-wrap w-full wrap-break-word origin-center">
                        <p className="text-sm text-[#5e6b64]">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex place-content-start items-start flex-none flex-col gap-6 h-min overflow-hidden p-0 relative w-full">
          <div className="outline-none flex flex-col justify-start shrink-0 flex-none h-auto relative whitespace-pre w-auto">
            <p className="text-sm text-[#191a20]">COURSES & RESOURCES</p>
          </div>
          <div className="w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl text-foreground">8th</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => scroll("left")}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-6 h-6 text-foreground" />
                </button>
                <button
                  onClick={() => scroll("right")}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-6 h-6 text-foreground" />
                </button>
              </div>
            </div>

            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto pb-4 no-scrollbar"
              style={{ scrollBehavior: "smooth" }}
            >
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex-none place-self-start h-auto relative"
                >
                  <div className="flex flex-col place-content-center items-center gap-0 w-[320px] h-min p-0 relative">
                    <div className="flex-none w-full h-auto relative">
                      <div className="w-full h-auto relative">
                        <div className="w-[320px] min-h-min flex flex-col place-content-start items-start gap-5 p-5 relative border border-[rgba(0,0,0,0.1)] rounded-[15px] bg-[rgb(247,247,247)] overflow-clip opacity-100 will-change-transform">
                          <div className="w-full flex-none relative aspect-[1.5] h-[222px] border border-[rgba(0,0,0,0.1)] rounded-[10px] opacity-100 overflow-clip will-change-transform">
                            <div className="absolute inset-0 rounded-inherit">
                              <Image
                                decoding="async"
                                width="1504"
                                height="1128"
                                sizes="calc(373px - 40px)"
                                src={item.imgSrc}
                                alt={item.imgAlt}
                                className="block w-full h-full rounded-inherit object-center object-cover"
                              />
                            </div>
                            {/* <Link
                              class="framer-18ejytb framer-um0zrr"
                              data-framer-name="cta - holder"
                              href="../../pricing"
                              style="transform: translate(-50%, -50%); opacity: 1;"
                            >
                              <div
                                class="framer-rtighp-container"
                                style="opacity: 1;"
                              >
                                <div
                                  class="framer-YUKUu framer-HI6Hq framer-b3nl97 framer-v-b3nl97"
                                  data-border="true"
                                  data-framer-name="Primary"
                                  data-highlight="true"
                                  tabindex="0"
                                  style="--border-bottom-width: 1px; --border-color: var(--token-34671d26-5d78-43c7-b179-769808cf12c6, rgba(0, 0, 0, 0.15)); --border-left-width: 1px; --border-right-width: 1px; --border-style: solid; --border-top-width: 1px; background-color: var(--token-3b3f54c4-3cd8-4e67-815d-75027a8a0bdc, rgb(255, 255, 255)); border-radius: 50px; opacity: 1;"
                                >
                                  <div
                                    class="framer-y6JQt framer-12dds53"
                                    style="opacity: 1;"
                                  ></div>
                                  <div
                                    class="framer-1w0nih7"
                                    data-framer-name="wrapper"
                                    style="opacity: 1;"
                                  >
                                    <div
                                      class="framer-1r4ksfs"
                                      data-framer-component-type="RichTextContainer"
                                      style="--extracted-tcooor: var(--variable-reference-RYnOVu7lD-MwXmqB56o); --framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; --variable-reference-RYnOVu7lD-MwXmqB56o: var(--token-25bf52cc-c856-4020-8d73-2041fc418dd8, rgb(0, 0, 0)); transform: translateY(-50%); opacity: 1;"
                                    >
                                      <div
                                        class="framer-text framer-styles-preset-i98fc3"
                                        data-styles-preset="F85vcX82l"
                                        style="--framer-text-color:var(--extracted-tcooor, var(--variable-reference-RYnOVu7lD-MwXmqB56o))"
                                      >
                                        Unlock Access
                                      </div>
                                    </div>
                                    <div
                                      class="framer-h8i94u"
                                      data-framer-component-type="RichTextContainer"
                                      style="--extracted-tcooor: var(--variable-reference-RYnOVu7lD-MwXmqB56o); --framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; --variable-reference-RYnOVu7lD-MwXmqB56o: var(--token-25bf52cc-c856-4020-8d73-2041fc418dd8, rgb(0, 0, 0)); transform: none; opacity: 1;"
                                    >
                                      <div
                                        class="framer-text framer-styles-preset-i98fc3"
                                        data-styles-preset="F85vcX82l"
                                        style="--framer-text-color:var(--extracted-tcooor, var(--variable-reference-RYnOVu7lD-MwXmqB56o))"
                                      >
                                        Unlock Access
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Link> */}
                            <div className="flex-none w-auto h-auto absolute top-2.5 right-2.5"></div>
                          </div>
                          <div className="relative flex flex-none flex-row place-content-center items-center gap-2 w-min h-min overflow-clip p-0">
                            {item.badges.map((badge, idx) => (
                              <div
                                key={idx}
                                className="flex-none w-auto h-auto relative"
                              >
                                <div className="relative flex flex-row place-content-center items-center gap-[5px] min-w-[90px] w-min h-min p-[9px_16px] overflow-clip will-change-transform rounded-[50px] bg-[rgba(0,122,255,0.1)] opacity-100">
                                  {/* <div className="flex-none w-3 h-3 relative">
                                  svg
                                </div> */}
                                  <div className="relative flex flex-row flex-none place-content-center items-center gap-0 w-min h-min p-0 overflow-visible">
                                    <div className="relative flex-none w-auto h-auto whitespace-pre opacity-100">
                                      <div className="text-xs text-[#046cdb] font-medium">
                                        {badge}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="relative flex flex-col flex-none place-content-start items-start gap-2.5 w-full h-min p-0 overflow-visible">
                            <div className="relative flex-none w-full h-auto max-w-[270px] overflow-clip whitespace-pre-line wrap-break-word line-clamp-2">
                              <h3 className="text-lg">{item.title}</h3>
                            </div>
                          </div>
                          <div className="relative flex flex-col flex-none place-content-start items-start gap-3.5 w-full h-min pl-5 overflow-clip opacity-100 border-l border-black">
                            <div className="flex-none w-full h-auto relative">
                              <div className="relative flex flex-row place-content-start items-end gap-2.5 w-full h-min p-0 overflow-clip">
                                <div className="relative flex flex-row flex-none place-content-center items-center gap-0 w-min h-min p-0 overflow-visible">
                                  <div className="flex-none w-[18px] h-[18px] relative">
                                    <BookOpen className="w-[18px] h-[18px]" />
                                  </div>
                                </div>
                                <div className="relative flex flex-row flex-[1_0_0] place-content-center items-center gap-0 w-px h-min pt-0.5 overflow-visible">
                                  <div className="relative whitespace-pre-wrap wrap-break-word flex-[1_0_0] w-px h-auto">
                                    <p className="text-sm">{item.details[0]}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex-none w-full h-auto relative">
                              <div className="relative flex flex-row place-content-start items-center gap-2.5 w-full h-min p-0 overflow-clip">
                                <div className="relative flex flex-row flex-none place-content-center items-center gap-0 w-min h-min p-0 overflow-visible">
                                  <div className="flex-none w-[18px] h-[18px] relative">
                                    <NotepadText className="w-[18px] h-[18px]" />
                                  </div>
                                </div>
                                <div className="relative flex flex-row flex-[1_0_0] place-content-center items-center gap-0 w-px h-min pt-0.5 overflow-visible">
                                  <div className="relative whitespace-pre-wrap wrap-break-word flex-[1_0_0] w-px h-auto">
                                    <p className="text-sm">{item.details[1]}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* <div
                            class="framer-1aha8ve-container"
                            style="opacity: 1;"
                          >
                            <a
                              class="framer-Na4UR framer-8ZfKd framer-1t3m1pc framer-v-1t3m1pc framer-1hy5xr"
                              data-framer-name="Primary"
                              data-highlight="true"
                              href="../design-mastery-from-basics-to-stunning-interfaces"
                              tabindex="0"
                              style="backdrop-filter: blur(10px); background-color: var(--token-fddba5ff-027f-4d8a-a9c8-2ea8f2b02cf5, rgb(0, 122, 255)); border-radius: 50px; width: 100%; opacity: 1;"
                            >
                              <div
                                class="framer-1dgmhj"
                                data-framer-name="wrapper"
                                style="opacity: 1;"
                              >
                                <div
                                  class="framer-44z3bx"
                                  data-framer-component-type="RichTextContainer"
                                  style="--extracted-r6o4lv: var(--token-3b3f54c4-3cd8-4e67-815d-75027a8a0bdc, rgb(255, 255, 255)); --framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; transform: translateY(-50%); opacity: 1;"
                                >
                                  <p
                                    class="framer-text framer-styles-preset-1ezouv8"
                                    data-styles-preset="zkfe3VRVu"
                                    style="--framer-text-color:var(--extracted-r6o4lv, var(--token-3b3f54c4-3cd8-4e67-815d-75027a8a0bdc, rgb(255, 255, 255)))"
                                  >
                                    Explore Course
                                  </p>
                                </div>
                                <div
                                  class="framer-1g6563e"
                                  data-framer-component-type="RichTextContainer"
                                  style="--extracted-r6o4lv: var(--token-3b3f54c4-3cd8-4e67-815d-75027a8a0bdc, rgb(255, 255, 255)); --framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; transform: none; opacity: 1;"
                                >
                                  <p
                                    class="framer-text framer-styles-preset-1ezouv8"
                                    data-styles-preset="zkfe3VRVu"
                                    style="--framer-text-color:var(--extracted-r6o4lv, var(--token-3b3f54c4-3cd8-4e67-815d-75027a8a0bdc, rgb(255, 255, 255)))"
                                  >
                                    Explore Course
                                  </p>
                                </div>
                              </div>
                            </a>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl">9th</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => scroll("left")}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-6 h-6 text-foreground" />
                </button>
                <button
                  onClick={() => scroll("right")}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-6 h-6 text-foreground" />
                </button>
              </div>
            </div>

            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto pb-4 no-scrollbar"
              style={{ scrollBehavior: "smooth" }}
            >
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex-none place-self-start h-auto relative"
                >
                  <div className="flex flex-col place-content-center items-center gap-0 w-[320px] h-min p-0 relative">
                    <div className="flex-none w-full h-auto relative">
                      <div className="w-full h-auto relative">
                        <div className="w-[320px] min-h-min flex flex-col place-content-start items-start gap-5 p-5 relative border border-[rgba(0,0,0,0.1)] rounded-[15px] bg-[rgb(247,247,247)] overflow-clip opacity-100 will-change-transform">
                          <div className="w-full flex-none relative aspect-[1.5] h-[222px] border border-[rgba(0,0,0,0.1)] rounded-[10px] opacity-100 overflow-clip will-change-transform">
                            <div className="absolute inset-0 rounded-inherit">
                              <Image
                                decoding="async"
                                width="1504"
                                height="1128"
                                sizes="calc(373px - 40px)"
                                src={item.imgSrc}
                                alt={item.imgAlt}
                                className="block w-full h-full rounded-inherit object-center object-cover"
                              />
                            </div>
                            {/* <Link
                              class="framer-18ejytb framer-um0zrr"
                              data-framer-name="cta - holder"
                              href="../../pricing"
                              style="transform: translate(-50%, -50%); opacity: 1;"
                            >
                              <div
                                class="framer-rtighp-container"
                                style="opacity: 1;"
                              >
                                <div
                                  class="framer-YUKUu framer-HI6Hq framer-b3nl97 framer-v-b3nl97"
                                  data-border="true"
                                  data-framer-name="Primary"
                                  data-highlight="true"
                                  tabindex="0"
                                  style="--border-bottom-width: 1px; --border-color: var(--token-34671d26-5d78-43c7-b179-769808cf12c6, rgba(0, 0, 0, 0.15)); --border-left-width: 1px; --border-right-width: 1px; --border-style: solid; --border-top-width: 1px; background-color: var(--token-3b3f54c4-3cd8-4e67-815d-75027a8a0bdc, rgb(255, 255, 255)); border-radius: 50px; opacity: 1;"
                                >
                                  <div
                                    class="framer-y6JQt framer-12dds53"
                                    style="opacity: 1;"
                                  ></div>
                                  <div
                                    class="framer-1w0nih7"
                                    data-framer-name="wrapper"
                                    style="opacity: 1;"
                                  >
                                    <div
                                      class="framer-1r4ksfs"
                                      data-framer-component-type="RichTextContainer"
                                      style="--extracted-tcooor: var(--variable-reference-RYnOVu7lD-MwXmqB56o); --framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; --variable-reference-RYnOVu7lD-MwXmqB56o: var(--token-25bf52cc-c856-4020-8d73-2041fc418dd8, rgb(0, 0, 0)); transform: translateY(-50%); opacity: 1;"
                                    >
                                      <div
                                        class="framer-text framer-styles-preset-i98fc3"
                                        data-styles-preset="F85vcX82l"
                                        style="--framer-text-color:var(--extracted-tcooor, var(--variable-reference-RYnOVu7lD-MwXmqB56o))"
                                      >
                                        Unlock Access
                                      </div>
                                    </div>
                                    <div
                                      class="framer-h8i94u"
                                      data-framer-component-type="RichTextContainer"
                                      style="--extracted-tcooor: var(--variable-reference-RYnOVu7lD-MwXmqB56o); --framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; --variable-reference-RYnOVu7lD-MwXmqB56o: var(--token-25bf52cc-c856-4020-8d73-2041fc418dd8, rgb(0, 0, 0)); transform: none; opacity: 1;"
                                    >
                                      <div
                                        class="framer-text framer-styles-preset-i98fc3"
                                        data-styles-preset="F85vcX82l"
                                        style="--framer-text-color:var(--extracted-tcooor, var(--variable-reference-RYnOVu7lD-MwXmqB56o))"
                                      >
                                        Unlock Access
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Link> */}
                            <div className="flex-none w-auto h-auto absolute top-2.5 right-2.5"></div>
                          </div>
                          <div className="relative flex flex-none flex-row place-content-center items-center gap-2 w-min h-min overflow-clip p-0">
                            {item.badges.map((badge, idx) => (
                              <div
                                key={idx}
                                className="flex-none w-auto h-auto relative"
                              >
                                <div className="relative flex flex-row place-content-center items-center gap-[5px] min-w-[90px] w-min h-min p-[9px_16px] overflow-clip will-change-transform rounded-[50px] bg-[rgba(0,122,255,0.1)] opacity-100">
                                  {/* <div className="flex-none w-3 h-3 relative">
                                  svg
                                </div> */}
                                  <div className="relative flex flex-row flex-none place-content-center items-center gap-0 w-min h-min p-0 overflow-visible">
                                    <div className="relative flex-none w-auto h-auto whitespace-pre opacity-100">
                                      <div className="text-xs text-[#046cdb] font-medium">
                                        {badge}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="relative flex flex-col flex-none place-content-start items-start gap-2.5 w-full h-min p-0 overflow-visible">
                            <div className="relative flex-none w-full h-auto max-w-[270px] overflow-clip whitespace-pre-line wrap-break-word line-clamp-2">
                              <h3 className="text-lg">{item.title}</h3>
                            </div>
                          </div>
                          <div className="relative flex flex-col flex-none place-content-start items-start gap-3.5 w-full h-min pl-5 overflow-clip opacity-100 border-l border-black">
                            <div className="flex-none w-full h-auto relative">
                              <div className="relative flex flex-row place-content-start items-end gap-2.5 w-full h-min p-0 overflow-clip">
                                <div className="relative flex flex-row flex-none place-content-center items-center gap-0 w-min h-min p-0 overflow-visible">
                                  <div className="flex-none w-[18px] h-[18px] relative">
                                    <BookOpen className="w-[18px] h-[18px]" />
                                  </div>
                                </div>
                                <div className="relative flex flex-row flex-[1_0_0] place-content-center items-center gap-0 w-px h-min pt-0.5 overflow-visible">
                                  <div className="relative whitespace-pre-wrap wrap-break-word flex-[1_0_0] w-px h-auto">
                                    <p className="text-sm">{item.details[0]}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex-none w-full h-auto relative">
                              <div className="relative flex flex-row place-content-start items-center gap-2.5 w-full h-min p-0 overflow-clip">
                                <div className="relative flex flex-row flex-none place-content-center items-center gap-0 w-min h-min p-0 overflow-visible">
                                  <div className="flex-none w-[18px] h-[18px] relative">
                                    <NotepadText className="w-[18px] h-[18px]" />
                                  </div>
                                </div>
                                <div className="relative flex flex-row flex-[1_0_0] place-content-center items-center gap-0 w-px h-min pt-0.5 overflow-visible">
                                  <div className="relative whitespace-pre-wrap wrap-break-word flex-[1_0_0] w-px h-auto">
                                    <p className="text-sm">{item.details[1]}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* <div
                            class="framer-1aha8ve-container"
                            style="opacity: 1;"
                          >
                            <a
                              class="framer-Na4UR framer-8ZfKd framer-1t3m1pc framer-v-1t3m1pc framer-1hy5xr"
                              data-framer-name="Primary"
                              data-highlight="true"
                              href="../design-mastery-from-basics-to-stunning-interfaces"
                              tabindex="0"
                              style="backdrop-filter: blur(10px); background-color: var(--token-fddba5ff-027f-4d8a-a9c8-2ea8f2b02cf5, rgb(0, 122, 255)); border-radius: 50px; width: 100%; opacity: 1;"
                            >
                              <div
                                class="framer-1dgmhj"
                                data-framer-name="wrapper"
                                style="opacity: 1;"
                              >
                                <div
                                  class="framer-44z3bx"
                                  data-framer-component-type="RichTextContainer"
                                  style="--extracted-r6o4lv: var(--token-3b3f54c4-3cd8-4e67-815d-75027a8a0bdc, rgb(255, 255, 255)); --framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; transform: translateY(-50%); opacity: 1;"
                                >
                                  <p
                                    class="framer-text framer-styles-preset-1ezouv8"
                                    data-styles-preset="zkfe3VRVu"
                                    style="--framer-text-color:var(--extracted-r6o4lv, var(--token-3b3f54c4-3cd8-4e67-815d-75027a8a0bdc, rgb(255, 255, 255)))"
                                  >
                                    Explore Course
                                  </p>
                                </div>
                                <div
                                  class="framer-1g6563e"
                                  data-framer-component-type="RichTextContainer"
                                  style="--extracted-r6o4lv: var(--token-3b3f54c4-3cd8-4e67-815d-75027a8a0bdc, rgb(255, 255, 255)); --framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; transform: none; opacity: 1;"
                                >
                                  <p
                                    class="framer-text framer-styles-preset-1ezouv8"
                                    data-styles-preset="zkfe3VRVu"
                                    style="--framer-text-color:var(--extracted-r6o4lv, var(--token-3b3f54c4-3cd8-4e67-815d-75027a8a0bdc, rgb(255, 255, 255)))"
                                  >
                                    Explore Course
                                  </p>
                                </div>
                              </div>
                            </a>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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

export default Dashboard;
