"use client";
import Link from "next/link";
import React, { useState } from "react";

const Pricing = () => {
  const [annual, setAnnual] = useState(false);

  const pricingPlans = [
    {
      name: "Plus",
      ai: false,
      link: "/signin?plan=plus",
      icon: "M213.85,125.46l-112,120a8,8,0,0,1-13.69-7l14.66-73.33L45.19,143.49a8,8,0,0,1-3-13l112-120a8,8,0,0,1,13.69,7L153.18,90.9l57.63,21.61a8,8,0,0,1,3,12.95Z",
      priceSemester: 1699,
      priceAnnual: 2999,
      description:
        "Best for individual teachers creating syllabus-aligned question papers.",
      button: "Choose this plan",
      features: [
        annual ? `Full syllabus access` : `Semester-wise syllabus access`,
        "Chapter-wise question bank",
        "Manual question paper builder",
        "Export question papers (PDF)",
        "Exam mode practice",
        "Basic analytics",
        "Email support",
      ],
    },
    {
      name: "Pro+",
      ai: true,
      link: "/signin?plan=proplus",
      icon: "M239.75,90.81c0,.11,0,.21-.07.32L217,195a16,16,0,0,1-15.72,13H54.71A16,16,0,0,1,39,195L16.32,91.13c0-.11-.05-.21-.07-.32A16,16,0,0,1,44,77.39l33.67,36.29,35.8-80.29a1,1,0,0,0,0-.1,16,16,0,0,1,29.06,0,1,1,0,0,0,0,.1l35.8,80.29L212,77.39a16,16,0,0,1,27.71,13.42Z",
      popular: true,
      priceSemester: 2999,
      priceAnnual: 5499,
      description:
        "Advanced AI powered paper generation for faster exam preparation.",
      button: "Choose this plan",
      features: [
        "Everything in Plus",
        "AI Auto Question Paper Generation",
        "Smart question suggestions",
        "Difficulty level selection",
        "Unlimited paper generation",
        "Advanced analytics",
        "Priority support",
      ],
    },
    {
      name: "Institute",
      ai: true,
      link: "/contact?plan=institute",
      icon: "M176,207.24a119,119,0,0,0,16-7.73V240a8,8,0,0,1-16,0Zm11.76-88.43-56-29.87a8,8,0,0,0-7.52,14.12L171,128l17-9.06Zm64-29.87-120-64a8,8,0,0,0-7.52,0l-120,64a8,8,0,0,0,0,14.12L32,117.87v48.42a15.91,15.91,0,0,0,4.06,10.65C49.16,191.53,78.51,216,128,216a130,130,0,0,0,48-8.76V130.67L171,128l-43,22.93L43.83,106l0,0L25,96,128,41.07,231,96l-18.78,10-.06,0L188,118.94a8,8,0,0,1,4,6.93v73.64a115.63,115.63,0,0,0,27.94-22.57A15.91,15.91,0,0,0,224,166.29V117.87l27.76-14.81a8,8,0,0,0,0-14.12Z",
      custom: true,
      description:
        "Complete solution for schools, colleges and coaching institutes.",
      button: "Schedule a call",
      features: [
        "All Pro+ features",
        "Multi-teacher dashboard",
        "Admin panel",
        "Bulk student management",
        "Custom exam templates",
        "Institution level analytics",
        "Dedicated support",
      ],
    },
  ];

  return (
    <section
      className="flex flex-col items-center gap-10 md:gap-14 w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12 relative mx-auto font-poppins"
      id="pricing"
    >
      {/* Header */}
      <div className="flex flex-col flex-none place-content-center items-center gap-6 w-full max-w-[568px] md:max-w-[720px] h-min p-0 relative overflow-hidden">
        <div className="flex-none w-auto h-auto relative">
          <div className="h-min flex flex-row place-content-center items-center gap-1.5 w-min px-3 py-1.5 relative overflow-hidden rounded-4xl opacity-100 bg-[rgb(240,244,243)]">
            <p className="text-sm text-[#5e6b64]">Pricing</p>
          </div>
        </div>

        <div className="flex-none w-full h-auto relative">
          <h1 className="text-[24px] sm:text-[28px] md:text-[34px] lg:text-5xl text-[#193625] tracking-tighter text-center">
            Smart Exam Paper Generation, at the Right Price
          </h1>
        </div>

        <div className="flex-none w-full max-w-[620px] h-auto relative">
          <p className="text-[#5e6b64] text-center text-sm sm:text-base">
            Choose the plan that fits your needs and start creating
            high-quality, syllabus-aligned question papers in just minutes.
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex-none w-full h-auto relative">
        <div className="flex flex-col justify-center items-center gap-6 w-full opacity-100 h-min p-0 relative overflow-visible">
          <div className="flex flex-row flex-none justify-center items-center gap-3 w-full h-min p-0 relative overflow-visible">
            <p className="text-[#5e6b64] text-sm">Semester</p>

            <button
              onClick={() => setAnnual(!annual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition cursor-pointer ${
                annual ? "bg-[#193625]" : "bg-[#193625]"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  annual ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>

            <p className="text-[#5e6b64] text-sm">
              Annual <span className="text-[#193625]">(Save more)</span>
            </p>
          </div>

          {/* CTA bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-[#f0f4f3] text-[#193625] rounded-[20px] w-full max-w-[1200px]">
            <div className="flex gap-3 items-center">
              <div className="w-6 h-6">
                {/* keep svg as-is (scaled by container) */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 256"
                  focusable="false"
                  className="w-full h-full fill-[#5e6b64]"
                >
                  <g>
                    <path d="M101.85,191.14C97.34,201,82.29,224,40,224a8,8,0,0,1-8-8c0-42.29,23-57.34,32.86-61.85a8,8,0,0,1,6.64,14.56c-6.43,2.93-20.62,12.36-23.12,38.91,26.55-2.5,36-16.69,38.91-23.12a8,8,0,1,1,14.56,6.64Zm122-144a16,16,0,0,0-15-15c-12.58-.75-44.73.4-71.4,27.07h0L88,108.7A8,8,0,0,1,76.67,97.39l26.56-26.57A4,4,0,0,0,100.41,64H74.35A15.9,15.9,0,0,0,63,68.68L28.7,103a16,16,0,0,0,9.07,27.16l38.47,5.37,44.21,44.21,5.37,38.49a15.94,15.94,0,0,0,10.78,12.92,16.11,16.11,0,0,0,5.1.83A15.91,15.91,0,0,0,153,227.3L187.32,193A16,16,0,0,0,192,181.65V155.59a4,4,0,0,0-6.83-2.82l-26.57,26.56a8,8,0,0,1-11.71-.42,8.2,8.2,0,0,1,.6-11.1l49.27-49.27h0C223.45,91.86,224.6,59.71,223.85,47.12Z" />
                  </g>
                </svg>
              </div>

              <div>
                <h3 className="font-semibold text-sm sm:text-base">
                  Free Plan
                </h3>
                <p className="text-xs sm:text-sm">
                  Try it free with limited access
                </p>
              </div>
            </div>

            <Link
              className="bg-[#13261b] text-white rounded-2xl px-4 py-2 text-sm"
              href="/signin?plan=free"
            >
              Get started for free
            </Link>
          </div>

          {/* Plans grid: 1 column on mobile, 2 on sm, 3 on lg */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-[1200px]">
            {pricingPlans.map((plan, i) => {
              const price = annual ? plan.priceAnnual : plan.priceSemester;
              return (
                <div
                  key={i}
                  className={`flex flex-col justify-between gap-6 w-full px-5 py-6 rounded-[20px] opacity-100
                ${plan.popular ? "bg-[#13261b] text-white" : "bg-[#f0f4f3] text-[#193625]"}`}
                >
                  {/* Card header */}
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 shrink-0">
                        <svg
                          viewBox="0 0 256 256"
                          focusable="false"
                          className={`w-full h-full ${plan.popular ? "fill-[#d1d5db] text-[#d1d5db]" : "fill-[#5e6b64] text-[#5e6b64]"}`}
                        >
                          <g>
                            <path d={plan.icon}></path>
                          </g>
                        </svg>
                      </div>

                      <div className="flex items-center justify-between w-full">
                        <h3
                          className={`text-lg sm:text-xl ${plan.popular ? "text-white" : "text-[#193625]"}`}
                        >
                          {plan.name}
                        </h3>

                        {plan.ai && (
                          <div className="ml-1.5 flex flex-row items-center justify-between h-min overflow-hidden p-0 relative w-full">
                            <div className="relative w-[22px] h-[22px] aspect-square flex shrink-0 text-[#191A20] fill-current opacity-100 image-pixelated">
                              <div className="w-full h-full aspect-[inherit] flex justify-center items-center">
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
                        )}

                        {plan.popular && (
                          <span className="px-3 py-1 text-sm rounded-xl bg-[#D1D5DB] text-[#13261b]">
                            Popular
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-2xl sm:text-3xl md:text-4xl tracking-tight">
                      {plan.custom ? (
                        "Custom"
                      ) : (
                        <>
                          <span className="text-2xl">₹</span>
                          {price?.toLocaleString("en-IN")}
                        </>
                      )}
                      {!plan.custom && (
                        <span className="text-base ml-1 opacity-70">
                          /subject{annual ? " /year" : " /semester"}
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <p
                      className={`${plan.popular ? "text-[#9CA3AF]" : "text-[#5e6b64]"} text-sm sm:text-base`}
                    >
                      {plan.description}
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="w-full">
                    <Link
                      href={plan.link}
                      className={`flex items-center justify-center gap-2.5 w-full p-3 rounded-[18px] text-sm font-medium transition-colors duration-200 ${
                        plan.popular
                          ? "bg-[#f0f4f3] text-[#13261b]"
                          : "bg-[#111111] text-[#fafaf7]"
                      }`}
                      style={
                        plan.popular
                          ? {
                              boxShadow:
                                "0px 0px 0px -2.5px rgba(0,0,0,0.13189), inset 0px -1px 4px rgba(0,0,0,0.15)",
                            }
                          : {
                              boxShadow:
                                "rgba(0,0,0,0.1) 0 0.5px 1.25px -1.16px",
                            }
                      }
                    >
                      <p
                        className={`${plan.popular ? "text-[#13261b]" : "text-[#fafaf7]"}`}
                      >
                        {plan.button}
                      </p>
                    </Link>
                  </div>

                  {/* Features */}
                  <div className="flex flex-col gap-3">
                    <p
                      className={`${plan.popular ? "text-[#9CA3AF]" : "text-[#5e6b64]"} text-sm`}
                    >
                      What's Included:
                    </p>
                    <div className="flex flex-col gap-2">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="w-5 h-5 shrink-0">
                            <svg
                              viewBox="0 0 256 256"
                              className={`w-full h-full ${plan.popular ? "fill-[#fafaf7]" : "fill-[#5e6b64]"}`}
                            >
                              <g>
                                <path d="M232.49,80.49l-128,128a12,12,0,0,1-17,0l-56-56a12,12,0,1,1,17-17L96,183,215.51,63.51a12,12,0,0,1,17,17Z" />
                              </g>
                            </svg>
                          </div>
                          <p
                            className={`${plan.popular ? "text-[#fafaf7]" : "text-[#5e6b64]"} text-sm`}
                          >
                            {feature}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
