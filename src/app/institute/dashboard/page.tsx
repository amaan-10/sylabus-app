"use client";
import Dashboard from "@/components/Dashboard";
import LoaderWrapper from "@/components/PageLoader";
import Sidebar from "@/components/Sidebar";
import { Crown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const InstituteDashboardPage = () => {
  const dashboardFeatures = [
    {
      title: "Auto-Generate Exam Paper",
      description: "Instantly create syllabus-aligned papers using AI.",
      imageSrc: "/features/auto-generate.png",
      imageAlt: "Auto Generate Question Paper",
      href: "./auto-generate",
    },
    {
      title: "Custom Paper",
      description: "Manually select questions and structure your paper.",
      imageSrc: "/features/custom-paper.png",
      imageAlt: "Custom Paper",
      href: "./custom-paper",
    },
    {
      title: "Upload Syllabus",
      description: "Easily upload and manage your syllabus documents.",
      imageSrc: "/features/upload-syllabus.png",
      imageAlt: "Upload Syllabus",
      href: "./admin/upload-syllabus",
    },
    {
      title: "Question Bank Explorer",
      description: "Browse and filter AI-generated questions easily.",
      imageSrc: "/features/question-bank.png",
      imageAlt: "Question Bank Explorer",
      href: "./question-bank",
    },
  ];

  const [userData, setUserData] = useState(
    {} as { name?: string; email?: string },
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch("/api/institute/auth/me");
        if (res.ok) {
          const data = await res.json();
          setUserData(data.user);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className="flex place-content-start items-start bg-white flex-row gap-2 h-min overflow-hidden py-2 px-2 pl-2 md:pl-[104px] relative min-h-screen w-auto font-poppins">
      <Sidebar />
      <LoaderWrapper isLoading={loading}>
        <section className="md:border border-[rgba(0,0,0,0.08)] place-content-center items-center bg-white rounded-2xl flex flex-[1_0_0] flex-col gap-6 md:gap-14 h-min overflow-hidden p-[32px_8px_120px] md:py-16 md:px-8 md:pb-8 relative w-px">
          <div className="relative flex md:hidden flex-col items-start justify-start flex-none gap-2.5 h-min w-full overflow-hidden p-0">
            <Link
              href="/"
              className="relative flex-none shrink-0 w-8 h-6 no-underline text-black fill-current image-pixelated"
            >
              <div className="w-full h-full aspect-ratio-[inherit]">
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
            </Link>
          </div>
          <div className="flex place-content-center items-center flex-none flex-col gap-14 h-min max-w-[1200px] overflow-hidden p-0 relative w-full">
            <div className="flex flex-col md:flex-row place-content-start md:place-content-center justify-baseline md:justify-between items-start md:items-center gap-4 flex-none h-min overflow-visible p-0 relative w-full">
              <div className="flex place-content-center items-center flex-none flex-row gap-2 h-min overflow-hidden p-0 relative w-min">
                <div className="outline-none flex flex-col justify-start shrink-0 flex-none h-auto relative whitespace-pre w-auto">
                  <h4 className="text-2xl font-medium text-[#193625] tracking-tight">
                    Hi{userData?.name && `, ${userData.name}`}
                  </h4>
                </div>
                <div className="flex place-content-center items-center flex-none flex-row gap-1 h-min overflow-hidden p-0 relative w-min">
                  <div className="outline-none flex flex-col justify-start shrink-0 flex-none h-auto relative whitespace-pre w-auto">
                    <h4 className="text-2xl text-[#193625] tracking-tight">
                      👋
                    </h4>
                  </div>
                </div>
              </div>
              <div className="flex place-content-start items-start flex-none flex-row gap-4 h-min overflow-visible p-0 relative w-min">
                <Link
                  className="border border-[#f4f4f4] place-content-center justify-start items-center rounded-lg flex flex-none flex-row gap-2 h-min overflow-visible py-2 px-4 relative no-underline w-min"
                  href="./courses"
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
                <div className="grid flex-none gap-4 auto-rows-min grid-cols-[repeat(1,minmax(50px,1fr))] md:grid-cols-[repeat(2,minmax(50px,1fr))] h-min justify-center p-0 relative w-full">
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
                            quality={50}
                            src={feature.imageSrc}
                            alt={feature.imageAlt}
                            className="block w-full h-full rounded-[inherit] object-center object-cover"
                          />
                        </div>
                        {/* <div className="flex-none h-full absolute left-0 top-0 overflow-visible w-full z-0 bg-[linear-gradient(#0000_0%,#000_120%)] opacity-100"></div> */}
                        {feature.title === "Auto-Generate Exam Paper" ||
                        feature.title === "Quick Quiz Generator" ? (
                          <div className="flex flex-row items-center justify-between flex-none h-min overflow-hidden p-0 relative w-full">
                            <div className="relative w-6 h-6 aspect-square flex-none shrink-0 text-[#191A20] fill-current opacity-100 image-pixelated">
                              <div className="w-full h-full aspect-[inherit]">
                                <svg
                                  version="1.1"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="512"
                                  height="512"
                                  viewBox="0 0 512 512"
                                  className="h-6 w-6"
                                >
                                  <path
                                    d="M0 0 C0.66 0 1.32 0 2 0 C2.13462646 0.91773193 2.13462646 0.91773193 2.27197266 1.85400391 C9.13408279 47.75237695 25.65475774 91.61952695 55 128 C55.45052734 128.56477051 55.90105469 129.12954102 56.36523438 129.71142578 C67.39854296 143.46279396 79.77051088 155.58697501 94 166 C95.04671875 166.76828125 96.0934375 167.5365625 97.171875 168.328125 C123.74924506 187.2364032 153.31760818 199.48534449 185 207 C185 207.66 185 208.32 185 209 C184.35264893 209.17015625 183.70529785 209.3403125 183.03833008 209.515625 C148.8158044 218.59254566 116.61424519 231.37458791 89 254 C88.47631836 254.42216797 87.95263672 254.84433594 87.41308594 255.27929688 C74.22880732 265.9259821 62.37442263 277.65153311 52.27490234 291.28076172 C51.0372902 292.94971322 49.77946181 294.60177553 48.51953125 296.25390625 C22.92720594 330.363455 6.83233034 373.73514065 2 416 C1.34 416 0.68 416 0 416 C-0.13462646 415.08226807 -0.13462646 415.08226807 -0.27197266 414.14599609 C-9.65138438 351.41022975 -38.49059533 290.08058976 -90.23681641 251.32324219 C-91.91269686 250.06551966 -93.57149506 248.7876937 -95.23046875 247.5078125 C-120.70820969 228.22164332 -152.01568617 216.05032291 -183 209 C-183 208.34 -183 207.68 -183 207 C-182.35264893 206.82984375 -181.70529785 206.6596875 -181.03833008 206.484375 C-146.81864141 197.4082068 -114.60970648 184.62803136 -87 162 C-86.47100098 161.57251465 -85.94200195 161.1450293 -85.39697266 160.70458984 C-73.00068343 150.66631063 -61.72905108 139.66999446 -52 127 C-51.5963623 126.48872559 -51.19272461 125.97745117 -50.77685547 125.45068359 C-22.86784215 90.00847111 -5.11794442 44.76291688 0 0 Z "
                                    fill="#2196f3"
                                    transform="translate(207,16)"
                                  ></path>
                                  <path
                                    d="M0 0 C0.66 0 1.32 0 2 0 C2.20753906 1.22332031 2.41507812 2.44664062 2.62890625 3.70703125 C7.40734628 30.42455766 17.94206447 52.695564 36 73 C36.70898438 73.79921875 37.41796875 74.5984375 38.1484375 75.421875 C56.05372011 94.30930391 80.24321898 104.65642573 105 111 C105 111.66 105 112.32 105 113 C104.19502075 113.2019397 104.19502075 113.2019397 103.3737793 113.40795898 C67.10052163 122.68519412 37.87226054 142.40530475 18.3815918 174.79174805 C9.45708199 190.23586739 4.96605746 206.51684144 2 224 C1.34 224 0.68 224 0 224 C-0.20753906 222.77667969 -0.41507812 221.55335938 -0.62890625 220.29296875 C-5.40734628 193.57544234 -15.94206447 171.304436 -34 151 C-34.70898438 150.20078125 -35.41796875 149.4015625 -36.1484375 148.578125 C-54.05372011 129.69069609 -78.24321898 119.34357427 -103 113 C-103 112.34 -103 111.68 -103 111 C-102.19502075 110.7980603 -102.19502075 110.7980603 -101.3737793 110.59204102 C-76.78104321 104.30221182 -56.96877509 93.86966638 -38 77 C-37.34386719 76.42894531 -36.68773437 75.85789062 -36.01171875 75.26953125 C-15.00285497 55.76488206 -4.66569906 27.50154291 0 0 Z "
                                    fill="#7e57c2"
                                    transform="translate(383,272)"
                                  ></path>
                                </svg>
                              </div>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                        <div className="flex place-content-center justify-between items-center flex-none flex-row h-min overflow-hidden p-0 relative w-full"></div>
                        <div className="flex place-content-start items-start flex-none flex-col gap-2 h-min max-w-lg overflow-hidden p-0 relative w-full">
                          <div className="outline-none flex flex-col justify-start shrink-0 flex-none h-auto relative whitespace-pre-wrap w-full wrap-break-word origin-center">
                            <h4 className="text-xl lg:text-2xl text-[#193625] tracking-tight">
                              {feature.title}
                            </h4>
                          </div>
                          <div className="outline-none flex flex-col justify-start shrink-0 flex-none h-auto relative whitespace-pre-wrap w-full wrap-break-word origin-center">
                            <p className="text-xs sm:text-sm text-[#5e6b64]">
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
          </div>
        </section>
      </LoaderWrapper>
    </div>
  );
};

export default InstituteDashboardPage;
