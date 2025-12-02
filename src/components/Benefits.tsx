"use client";
import Image from "next/image";
import React from "react";
import CountUp from "./CountUp";
import { motion } from "framer-motion";
const Benefits = () => {
  return (
    <div
      className="flex flex-col flex-none place-content-center items-center gap-24 w-full max-w-7xl h-min px-12 relative overflow-hidden font-poppins"
      id="benefits"
    >
      <div className="flex flex-col flex-none place-content-center items-center gap-6 w-full max-w-[600px] h-min p-0 relative overflow-hidden">
        <div className="flex-none w-auto h-auto relative">
          <div className="h-min flex flex-row place-content-center items-center gap-1.5 w-min px-4 py-1.5 relative overflow-hidden rounded-4xl opacity-100 bg-[rgb(240,244,243)]">
            <div className="flex-none w-auto h-auto relative">
              <p className="text-sm text-[#5e6b64]">Benefits</p>
            </div>
          </div>
        </div>
        <div className="flex-none w-full h-auto relative">
          <h1 className="text-5xl text-[#193625] tracking-tighter text-center">
            Why choose us?
          </h1>
        </div>
        <div className="flex-none w-full max-w-[620px] h-auto relative">
          <p className="text-[#5e6b64] text-center">
            Paper setting can be time-consuming and overwhelming. We simplify
            the process, giving teachers clarity, speed, and syllabus-accurate
            results.
          </p>
        </div>
      </div>
      <div className="flex-none grid grid-rows-7 grid-cols-[repeat(3,minmax(50px,1fr))] auto-rows-fr justify-center gap-6 w-full h-[856px] p-0 relative overflow-hidden">
        <div
          className="bg-[#f0f4f3] rounded-[20px] flex flex-col flex-none place-content-start self-center items-start gap-2.5 w-full h-full p-6 relative"
          id="bento-1"
          style={{ gridArea: "span 3 / span 2" }}
        >
          <div className="flex flex-col flex-none place-content-start items-start gap-2 w-full h-min p-0 relative overflow-hidden">
            <div className="whitespace-pre-wrap wrap-break-word flex-none w-full h-auto relative">
              <h3 className="text-[32px] text-[#193625] tracking-tighter">
                Improve Paper Quality
              </h3>
            </div>
            <div className="whitespace-pre-wrap wrap-break-word flex-none w-full h-auto relative">
              <p className="text-[#5e6b64]">
                Get structured, balanced papers with clear sections, accurate
                marking schemes, and syllabus alignment.
              </p>
            </div>
          </div>
          <motion.div
            initial={{ x: -200 }}
            whileInView={{ x: 0 }}
            transition={{
              duration: 1.2,
              ease: "easeOut",
            }}
            viewport={{ once: false, amount: 0.3 }}
            className="z-1 flex flex-row flex-none place-content-center items-center gap-0 w-min h-min p-0 absolute top-[150px] right-[345px] overflow-hidden"
          >
            <div className="flex-none w-[527px] h-1.5 relative overflow-hidden bg-[#13261b]"></div>
            <div className="border-[5px] border-solid border-[#13261b] bg-[#13261b] rounded-[55px] flex-none w-12 h-12 relative overflow-hidden">
              <div
                className="rounded-full flex flex-row flex-none place-content-center items-center gap-12 w-min h-min p-[15px] absolute top-[51%] left-[51%] overflow-hidden bg-white"
                style={{
                  backgroundColor:
                    "var(--token-78bf5845-18ee-4bf2-bfc0-ab32bcc2e9e6, #fff)",
                  willChange: "transform",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="flex-none w-6 h-6 relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 256"
                    focusable="false"
                    color="var(--token-b853b0e1-8e9d-431d-b182-a32c05b25cd4, rgb(19, 38, 27))"
                    className="select-none w-full h-full inline-block shrink-0 fill-[rgb(19,38,27)] text-[rgb(19,38,27)]"
                    style={{
                      fill: "var(--token-b853b0e1-8e9d-431d-b182-a32c05b25cd4, rgb(19,38,27))",
                      color:
                        "var(--token-b853b0e1-8e9d-431d-b182-a32c05b25cd4, rgb(19,38,27))",
                    }}
                  >
                    <g color="var(--token-b853b0e1-8e9d-431d-b182-a32c05b25cd4, rgb(19, 38, 27))">
                      <path d="M228,128a12,12,0,0,1-12,12H128a12,12,0,0,1,0-24h88A12,12,0,0,1,228,128ZM128,76h88a12,12,0,0,0,0-24H128a12,12,0,0,0,0,24Zm88,104H128a12,12,0,0,0,0,24h88a12,12,0,0,0,0-24ZM79.51,39.51,56,63l-7.51-7.52a12,12,0,0,0-17,17l16,16a12,12,0,0,0,17,0l32-32a12,12,0,0,0-17-17Zm0,64L56,127l-7.51-7.52a12,12,0,1,0-17,17l16,16a12,12,0,0,0,17,0l32-32a12,12,0,0,0-17-17Zm0,64L56,191l-7.51-7.52a12,12,0,1,0-17,17l16,16a12,12,0,0,0,17,0l32-32a12,12,0,0,0-17-17Z"></path>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ x: -200, y: "-50%" }}
            whileInView={{ x: 0, y: "-50%" }}
            transition={{
              duration: 1.2,
              ease: "easeOut",
            }}
            viewport={{ once: false, amount: 0.3 }}
            className="z-1 flex flex-row flex-none place-content-center items-center gap-0 w-min h-min p-0 absolute top-[76%] right-[164px] overflow-hidden"
          >
            <div className="flex-none w-[623px] h-1.5 relative overflow-hidden bg-[#13261b]"></div>
            <div
              className="border-[5px] border-solid bg-[#13261b] rounded-[55px] flex-none w-12 h-12 relative overflow-hidden"
              style={{
                borderColor:
                  "var(--token-b853b0e1-8e9d-431d-b182-a32c05b25cd4, #13261b)",
                backgroundColor:
                  "var(--token-b853b0e1-8e9d-431d-b182-a32c05b25cd4, #13261b)",
                willChange: "transform",
              }}
            >
              <div
                className="rounded-full flex flex-row flex-none place-content-center items-center gap-12 w-min h-min p-[15px] absolute top-[51%] left-[51%] overflow-hidden bg-white"
                style={{
                  backgroundColor:
                    "var(--token-78bf5845-18ee-4bf2-bfc0-ab32bcc2e9e6, #fff)",
                  willChange: "transform",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="flex-none w-6 h-6 relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 256"
                    focusable="false"
                    color="var(--token-b853b0e1-8e9d-431d-b182-a32c05b25cd4, rgb(19, 38, 27))"
                    className="select-none w-full h-full inline-block shrink-0 fill-[rgb(19,38,27)] text-[rgb(19,38,27)]"
                    style={{
                      fill: "var(--token-b853b0e1-8e9d-431d-b182-a32c05b25cd4, rgb(19,38,27))",
                      color:
                        "var(--token-b853b0e1-8e9d-431d-b182-a32c05b25cd4, rgb(19,38,27))",
                    }}
                  >
                    <g color="var(--token-b853b0e1-8e9d-431d-b182-a32c05b25cd4, rgb(19, 38, 27))">
                      <path d="M244,204H232V99.3A12,12,0,0,0,228,76H188V51.3A12,12,0,0,0,184,28H40a12,12,0,0,0-4,23.3V204H24a12,12,0,0,0,0,24H244a12,12,0,0,0,0-24ZM208,100V204H188V100ZM60,52H164V204H148V160a12,12,0,0,0-12-12H88a12,12,0,0,0-12,12v44H60Zm64,152H100V172h24ZM72,80A12,12,0,0,1,84,68h8a12,12,0,0,1,0,24H84A12,12,0,0,1,72,80Zm48,0a12,12,0,0,1,12-12h8a12,12,0,0,1,0,24h-8A12,12,0,0,1,120,80ZM72,120a12,12,0,0,1,12-12h8a12,12,0,0,1,0,24H84A12,12,0,0,1,72,120Zm48,0a12,12,0,0,1,12-12h8a12,12,0,0,1,0,24h-8A12,12,0,0,1,120,120Z"></path>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <div
          className="rounded-[20px] flex flex-col flex-none place-content-start items-center gap-2.5 w-full h-full p-6 relative bg-[#f0f4f3] self-center"
          style={{
            backgroundColor:
              "var(--token-67d4c3b0-366f-4285-aac0-3c847074502f, #f0f4f3)",
            gridRow: "span 4",
          }}
          id="bento-2"
        >
          <motion.div
            initial={{ x: 0 }}
            whileInView={{ x: -150 }}
            transition={{
              duration: 1.2,
              ease: "easeOut",
            }}
            viewport={{ once: false, amount: 0.3 }}
            className="z-1 flex-none absolute w-[441px] h-[254px] aspect-[1.733] top-2/5 left-1/2 overflow-visible"
          >
            <div className="absolute rounded-[inherit] inset-0">
              <Image
                decoding="auto"
                width="2090"
                height="1206"
                sizes="441px"
                src="/pen.png"
                alt="A hand holding a black pen, poised to write or draw on a surface."
                className="block w-full h-full rounded-[inherit] object-center object-cover"
              />
            </div>
          </motion.div>

          <div className="flex flex-col flex-none place-content-start items-start gap-2 w-full max-w-lg h-min p-0 relative overflow-hidden">
            <div className="flex-none w-full h-auto relative">
              <h1 className="text-[32px] text-[#193625] tracking-tighter">
                Save Hours of Work
              </h1>
            </div>
            <div className="flex-none w-full max-w-[620px] h-auto relative">
              <p className="text-[#5e6b64]">
                Generate complete question papers in minutes instead of manually
                compiling questions.
              </p>
            </div>
          </div>
        </div>
        <div
          className="bg-[#f0f4f3] rounded-[20px] flex flex-col flex-none place-content-center items-center gap-2.5 w-full h-full p-6 relative self-center"
          style={{
            backgroundColor:
              "var(--token-67d4c3b0-366f-4285-aac0-3c847074502f, #f0f4f3)",
            gridArea: "span 2 / span 2",
          }}
          id="bento-3"
        >
          <div className="flex-none w-full h-auto relative">
            <div className="cursor-pointer flex flex-wrap place-content-center items-center gap-2.5 w-full h-min p-0 relative overflow-visible">
              <div className="whitespace-pre flex-none w-auto h-auto relative">
                <div className="text-5xl text-[#193625] tracking-tighter text-center">
                  Boost Teaching{" "}
                </div>
              </div>
              <div className="flex-none w-auto h-12 relative">
                <div className="cursor-pointer w-28 h-full relative overflow-hidden">
                  <div
                    className="flex-none w-12 absolute top-0 bottom-0 overflow-hidden rounded-[56px]"
                    style={{
                      willChange: "transform",
                      left: "calc(50% - 24px)",
                      mask: "radial-gradient(57% 57% at -18.3% 50%, rgba(0,0,0,0) 99.99%, rgb(0,0,0) 100%)",
                      transform: "none",
                      transformOrigin: "50% 50% 0px",
                    }}
                  >
                    <div className="absolute rounded-[inherit] inset-0">
                      <Image
                        decoding="auto"
                        width="1024"
                        height="1024"
                        sizes="48px"
                        src="/p1.png"
                        alt="Smiling young woman with curly hair sitting at a laptop, in front of a teal wall."
                        className="block w-full h-full rounded-[inherit] object-center object-cover"
                      />
                    </div>
                  </div>
                  <div
                    className="flex-none w-12 absolute top-0 bottom-0 right-0 overflow-hidden rounded-[56px]"
                    style={{
                      willChange: "transform",
                      mask: "radial-gradient(57% 57% at -18.3% 50%, rgba(0,0,0,0) 99.99%, rgb(0,0,0) 100%)",
                      transform: "none",
                      transformOrigin: "50% 50% 0px",
                    }}
                  >
                    <div className="absolute rounded-[inherit] inset-0">
                      <Image
                        decoding="auto"
                        width="992"
                        height="992"
                        sizes="48px"
                        src="/p2.png"
                        alt="A young woman with long hair smiles while standing against a green backdrop, wearing a casual dark sweater."
                        className="block w-full h-full rounded-[inherit] object-center object-cover"
                      />
                    </div>
                  </div>
                  <div
                    className="flex-none w-12 absolute top-0 bottom-0 left-0 overflow-hidden rounded-[56px]"
                    style={{
                      willChange: "transform",
                      transform: "none",
                      transformOrigin: "50% 50% 0px",
                    }}
                  >
                    <div className="absolute rounded-[inherit] inset-0">
                      <Image
                        decoding="auto"
                        width="1024"
                        height="1024"
                        sizes="48px"
                        src="/p3.png"
                        alt="A smiling person with curly hair sits at a desk, looking at a laptop against a dark background."
                        className="block w-full h-full rounded-[inherit] object-center object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="whitespace-pre flex-none w-auto h-auto relative">
                <div className="text-5xl text-[#193625] tracking-tighter text-center">
                  {" "}
                  Efficiency
                </div>
              </div>
            </div>
          </div>

          <div className="flex-none w-full h-auto relative">
            <p className="text-[#5e6b64] text-center">
              Focus on teaching, We&apos;ll handle the paperwork.
            </p>
          </div>
        </div>
        <div
          className="bg-[#f0f4f3] rounded-[20px] flex flex-col flex-none row-span-3 place-content-start self-center items-start gap-2.5 w-full h-full p-6 relative overflow-hidden"
          style={{
            backgroundColor:
              "var(--token-67d4c3b0-366f-4285-aac0-3c847074502f, #f0f4f3)",
            willChange: "transform",
          }}
          id="bento-4"
        >
          <div className="whitespace-pre-wrap wrap-break-word z-1 flex-none w-[284px] h-auto relative">
            <h3 className="text-[32px] text-[#193625] tracking-tight leading-9">
              Ensure Accuracy & Consistency
            </h3>
          </div>
          <div
            className="aspect-[1] z-1 flex-none w-[352px] h-[352px] absolute top-[150px] left-1/2"
            style={{
              filter: "brightness(.22) hue-rotate(295deg)",
              height: "var(--framer-aspect-ratio-supported, 352px)",
              transform: "translate(-50%)",
            }}
          >
            <div className="h-full w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 360 360"
                width="360"
                height="360"
                preserveAspectRatio="xMidYMid slice"
                className="h-full w-full"
              >
                <defs>
                  <clipPath id="__lottie_element_2">
                    <rect width="360" height="360" x="0" y="0"></rect>
                  </clipPath>
                </defs>
                <g clipPath="url(#__lottie_element_2)">
                  <g
                    transform="matrix(1,0,0,1,180,180)"
                    opacity="1"
                    className="block"
                  >
                    <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                      <path
                        fill="rgb(131,155,195)"
                        fillOpacity="1"
                        d=" M0,-50 C27.594999313354492,-50 50,-27.594999313354492 50,0 C50,27.594999313354492 27.594999313354492,50 0,50 C-27.594999313354492,50 -50,27.594999313354492 -50,0 C-50,-27.594999313354492 -27.594999313354492,-50 0,-50z"
                      ></path>
                    </g>
                  </g>
                  <g
                    transform="matrix(1,0,0,1,180,180)"
                    opacity="0.5194413749999958"
                    className="block"
                  >
                    <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                      <path
                        fill="rgb(95,128,178)"
                        fillOpacity="1"
                        d=" M0,-106.08203125 C58.54667282104492,-106.08203125 106.08203125,-58.54667282104492 106.08203125,0 C106.08203125,58.54667282104492 58.54667282104492,106.08203125 0,106.08203125 C-58.54667282104492,106.08203125 -106.08203125,58.54667282104492 -106.08203125,0 C-106.08203125,-58.54667282104492 -58.54667282104492,-106.08203125 0,-106.08203125z"
                      ></path>
                    </g>
                  </g>
                  <g
                    transform="matrix(1,0,0,1,180,180)"
                    opacity="0.8166071428571382"
                    className="block"
                  >
                    <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                      <path
                        fill="rgb(110,142,190)"
                        fillOpacity="1"
                        d=" M0,-61.61309814453125 C34.004268646240234,-61.61309814453125 61.61309814453125,-34.004268646240234 61.61309814453125,0 C61.61309814453125,34.004268646240234 34.004268646240234,61.61309814453125 0,61.61309814453125 C-34.004268646240234,61.61309814453125 -61.61309814453125,34.004268646240234 -61.61309814453125,0 C-61.61309814453125,-34.004268646240234 -34.004268646240234,-61.61309814453125 0,-61.61309814453125z"
                      ></path>
                    </g>
                  </g>
                  <g
                    transform="matrix(1,0,0,1,180,180)"
                    opacity="0.0022727272727223638"
                    className="block"
                  >
                    <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                      <path
                        fill="rgb(131,155,195)"
                        fillOpacity="1"
                        d=" M0,-179.99781799316406 C99.3407974243164,-179.99781799316406 179.99781799316406,-99.3407974243164 179.99781799316406,0 C179.99781799316406,99.3407974243164 99.3407974243164,179.99781799316406 0,179.99781799316406 C-99.3407974243164,179.99781799316406 -179.99781799316406,99.3407974243164 -179.99781799316406,0 C-179.99781799316406,-99.3407974243164 -99.3407974243164,-179.99781799316406 0,-179.99781799316406z"
                      ></path>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </div>
        <div
          className="bg-[#f0f4f3] rounded-[20px] flex flex-col flex-none row-span-2 place-content-start self-center items-center gap-6 w-full h-full p-6 relative overflow-hidden"
          style={{
            backgroundColor:
              "var(--token-67d4c3b0-366f-4285-aac0-3c847074502f, #f0f4f3)",
            willChange: "transform",
          }}
          id="bento-5"
        >
          <div className="flex flex-col flex-none place-content-center items-center gap-[15px] w-full max-w-lg h-min p-0 relative overflow-hidden">
            <div className="whitespace-pre-wrap wrap-break-word flex-none w-full h-auto relative">
              <h3 className="text-[32px] text-[#193625] tracking-tight">
                Trusted by Educators
              </h3>
            </div>
          </div>
          <motion.div
            initial={{ y: 75 }}
            whileInView={{ y: -30 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.1 }}
            className="aspect-[0.672131] z-1 flex-none w-[246px] h-[366px] absolute top-1/2 left-1/2 -translate-x-1/2 overflow-visible"
          >
            <div className="absolute rounded-[inherit] inset-0">
              <Image
                decoding="auto"
                width="1510"
                height="2242"
                sizes="246px"
                src="/trophy.png"
                alt="A shiny silver trophy on a black base, symbolizing achievement and victory."
                className="block w-full h-full rounded-[inherit] object-center object-cover"
              />
            </div>
          </motion.div>
        </div>
        <div
          className="bg-[#f0f4f3] rounded-[20px] flex flex-row flex-none row-span-2 place-content-center self-center items-center gap-2.5 w-full h-full p-6 relative"
          id="bento-6"
        >
          <div className="flex flex-col flex-[1_0_0] place-content-center items-center gap-[15px] w-px max-w-lg h-min p-0 relative overflow-hidden">
            <div className="flex-none w-auto h-auto relative">
              <div className="flex flex-row place-content-center items-center gap-[3px] w-min h-min p-0 relative overflow-visible">
                <div className="flex-none w-5 h-5 relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 256"
                    focusable="false"
                    color="var(--token-0ca21bca-b7c4-4d29-a839-edfa6a8d679a, rgb(168, 86, 19))"
                    className="select-none w-full h-full inline-block shrink-0"
                    style={{
                      fill: "var(--token-0ca21bca-b7c4-4d29-a839-edfa6a8d679a, rgb(168, 86, 19))",
                      color:
                        "var(--token-0ca21bca-b7c4-4d29-a839-edfa6a8d679a, rgb(168, 86, 19))",
                    }}
                  >
                    <g color="var(--token-0ca21bca-b7c4-4d29-a839-edfa6a8d679a, rgb(168, 86, 19))">
                      <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"></path>
                    </g>
                  </svg>
                </div>
                <div className="flex-none w-5 h-5 relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 256"
                    focusable="false"
                    color="var(--token-0ca21bca-b7c4-4d29-a839-edfa6a8d679a, rgb(168, 86, 19))"
                    className="select-none w-full h-full inline-block shrink-0"
                    style={{
                      fill: "var(--token-0ca21bca-b7c4-4d29-a839-edfa6a8d679a, rgb(168, 86, 19))",
                      color:
                        "var(--token-0ca21bca-b7c4-4d29-a839-edfa6a8d679a, rgb(168, 86, 19))",
                    }}
                  >
                    <g color="var(--token-0ca21bca-b7c4-4d29-a839-edfa6a8d679a, rgb(168, 86, 19))">
                      <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"></path>
                    </g>
                  </svg>
                </div>
                <div className="flex-none w-5 h-5 relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 256"
                    focusable="false"
                    color="var(--token-0ca21bca-b7c4-4d29-a839-edfa6a8d679a, rgb(168, 86, 19))"
                    className="select-none w-full h-full inline-block shrink-0"
                    style={{
                      fill: "var(--token-0ca21bca-b7c4-4d29-a839-edfa6a8d679a, rgb(168, 86, 19))",
                      color:
                        "var(--token-0ca21bca-b7c4-4d29-a839-edfa6a8d679a, rgb(168, 86, 19))",
                    }}
                  >
                    <g color="var(--token-0ca21bca-b7c4-4d29-a839-edfa6a8d679a, rgb(168, 86, 19))">
                      <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"></path>
                    </g>
                  </svg>
                </div>
                <div className="flex-none w-5 h-5 relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 256"
                    focusable="false"
                    color="var(--token-0ca21bca-b7c4-4d29-a839-edfa6a8d679a, rgb(168, 86, 19))"
                    className="select-none w-full h-full inline-block shrink-0"
                    style={{
                      fill: "var(--token-0ca21bca-b7c4-4d29-a839-edfa6a8d679a, rgb(168, 86, 19))",
                      color:
                        "var(--token-0ca21bca-b7c4-4d29-a839-edfa6a8d679a, rgb(168, 86, 19))",
                    }}
                  >
                    <g color="var(--token-0ca21bca-b7c4-4d29-a839-edfa6a8d679a, rgb(168, 86, 19))">
                      <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"></path>
                    </g>
                  </svg>
                </div>
                <div className="flex-none w-5 h-5 relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 256"
                    focusable="false"
                    color="var(--token-0ca21bca-b7c4-4d29-a839-edfa6a8d679a, rgb(168, 86, 19))"
                    className="select-none w-full h-full inline-block shrink-0"
                    style={{
                      fill: "var(--token-0ca21bca-b7c4-4d29-a839-edfa6a8d679a, rgb(168, 86, 19))",
                      color:
                        "var(--token-0ca21bca-b7c4-4d29-a839-edfa6a8d679a, rgb(168, 86, 19))",
                    }}
                  >
                    <g color="var(--token-0ca21bca-b7c4-4d29-a839-edfa6a8d679a, rgb(168, 86, 19))">
                      <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"></path>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex-none w-full h-auto relative">
              <div className="flex flex-col place-content-center items-center gap-0 w-full h-min p-0 relative overflow-hidden">
                <div className="flex-none w-auto h-auto relative">
                  <div className="flex-none w-auto h-auto relative">
                    <CountUp
                      from={0}
                      to={54}
                      duration={2}
                      className="m-0 pointer-events-none select-none text-center font-normal text-[58px]"
                      threshold={0.4} // optional: how much must be visible to trigger
                      once={false} // optional: set true to whileInView only the first time
                    />
                  </div>
                </div>

                <div className="whitespace-pre-wrap wrap-break-word flex-none w-full h-auto relative">
                  <h3 className="text-[32px] text-[#193625] tracking-tight text-center">
                    Happy clients
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
