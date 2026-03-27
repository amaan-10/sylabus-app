"use client";
import CTA from "@/components/home/CTA";
import Footer from "@/components/home/Footer";
import Navbar from "@/components/home/Navbar";
import { motion } from "framer-motion";
import {
  fadeUp,
  fadeUpFromBottom,
  parentStagger,
} from "@/components/animations";
import Image from "next/image";
import LogoMarquee from "@/components/Marquee";
import { Download, FileText, LogIn, SlidersHorizontal } from "lucide-react";

const AboutPage = () => {
  //   const hasSession = Boolean((await cookies()).get("session"));
  const steps = [
    {
      title: "Log In to Your Dashboard",
      description: "Access your dashboard and start creating papers instantly.",
      imageSrc: "/step1.png",
      imageAlt: "dashboard preview",
      icon: LogIn,
    },
    {
      title: "Choose Paper Requirements",
      description: "Select class, chapters, marks, and difficulty settings.",
      imageSrc: "/step2.png",
      imageAlt: "paper requirements",
      icon: SlidersHorizontal,
    },
    {
      title: "Generate Question Paper",
      description:
        "Prepares a clean, structured, syllabus-aligned paper quickly.",
      imageSrc: "/step3.png",
      imageAlt: "generated questions",
      icon: FileText,
    },
    {
      title: "Download & Print Instantly",
      description: "Get your paper in PDF for easy printing and distribution.",
      imageSrc: "/step4.png",
      imageAlt: "download instantly",
      icon: Download,
    },
  ];

  return (
    <div className="flex flex-col place-content-start items-center gap-20 md:gap-32 lg:gap-40 h-min min-h-screen w-auto p-0 relative overflow-visible font-poppins">
      <Navbar hasSession={false} />
      <section className="flex flex-col flex-none place-content-center items-center gap-16 md:gap-24 w-full h-min pt-32 px-4 md:px-8 lg:px-12 pb-0 relative overflow-visible">
        <motion.div
          variants={parentStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col flex-none place-content-center items-center gap-16 w-full max-w-7xl h-min p-0 relative overflow-visible"
        >
          <motion.div
            variants={parentStagger}
            className="flex flex-col flex-none place-content-center items-center gap-12 w-full max-w-[575px] md:max-w-[800px] h-min p-0 relative overflow-visible"
          >
            <div className="flex flex-col flex-none place-content-center items-center gap-6 w-full h-min p-0 relative overflow-visible">
              <div className="flex-none w-auto h-auto relative">
                <motion.div
                  variants={fadeUp}
                  className="px-4 py-1.5 rounded-4xl bg-[#F0F4F3] flex items-center gap-2"
                >
                  <p className="text-sm text-[#5e6b64]">About us</p>
                </motion.div>
              </div>
              <div className="flex flex-col flex-none place-content-center items-center gap-6 w-full h-min p-0 relative overflow-visible">
                <div className="flex-none w-full h-auto relative">
                  <motion.h1
                    variants={fadeUp}
                    className="text-[51px] md:text-[64px] lg:text-[80px] text-[#193625] leading-[51px] md:leading-16 lg:leading-20 text-center tracking-tighter"
                  >
                    Our story so far
                  </motion.h1>
                </div>
                <div className="flex-none w-full max-w-[620px] h-auto relative">
                  <motion.p
                    variants={fadeUp}
                    className="text-[#5e6b64] text-center"
                  >
                    Get to know the team behind the scenes, explore our journey
                    so far, and see how we're revolutionizing question paper
                    creation with AI technology.
                  </motion.p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>
      <section
        className="flex flex-col items-center justify-center w-full h-min px-12 relative overflow-visible gap-0"
        id="who-we-are"
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16 w-full max-w-7xl md:h-min p-0 relative overflow-visible">
          <div className="z-1 flex flex-col flex-[1_0_0] place-content-start items-center md:items-start gap-6 h-min w-full md:w-px p-0 top-[100px] overflow-visible">
            <div className="flex-none w-max h-auto relative">
              <div className="h-min flex flex-row place-content-center items-center gap-1.5 w-min px-4 py-1.5 relative overflow-hidden rounded-4xl opacity-100 bg-[#f0f4f3]">
                <div className="flex-none w-max h-auto relative">
                  <p className="text-sm text-[#5e6b64]">Who we are</p>
                </div>
              </div>
            </div>
            <div className="flex-none w-full h-auto relative">
              <h1 className="text-[34px] md:text-[40px] lg:text-5xl text-[#193625] leading-[1.1] tracking-tighter w-full text-center md:text-left">
                About Sylabus
              </h1>
            </div>
            <div className="flex-none w-full max-w-[620px] h-auto relative">
              <p className="text-[#5e6b64] text-center md:text-left">
                Sylabus is an AI-powered question paper generator that helps
                educators quickly create high-quality papers. It simplifies the
                process, reduces manual effort, and lets teachers focus more on
                teaching while delivering a better learning experience.
              </p>
            </div>
            <div className="whitespace-pre-wrap wrap-break-word w-full h-auto relative">
              <p className="text-[#5e6b64] text-center md:text-left">
                Trusted by:
              </p>
            </div>
            <LogoMarquee />
          </div>
          <div className="aspect-square will-change-transform rounded-[20px] flex-none md:flex-[1_0_0] w-full relative overflow-hidden">
            <div className="will-change-transform rounded-[20px] flex-none absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 rounded-inherit">
                <Image
                  decoding="auto"
                  width="1024"
                  height="1024"
                  sizes="max((min(100vw - 136px, 1280px) - 64px) / 2, 1px)"
                  src="/sylabus.png"
                  alt="Sylabus"
                  className="block w-full h-full object-center object-cover rounded-[inherit]"
                />
              </div>
              {/* <div
                class="framer-87ma7d-container"
                style="will-change: transform; opacity: 1; transform: translateY(20px);"
              >
                <div
                  class="framer-UaM98 framer-FZIVT framer-st3bo7 framer-v-h0fucf"
                  data-framer-name="Blur"
                  style="--10ocmuz: 6px 16px 6px 16px; backdrop-filter: blur(10px); background-color: rgba(209, 209, 209, 0.25); border-radius: 32px; opacity: 1;"
                >
                  <div
                    class="framer-l3eoxm"
                    data-framer-component-type="RichTextContainer"
                    style="--framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; --extracted-r6o4lv: var(--token-a889bef8-b27f-49ca-abb1-f59cd0820711, rgb(255, 255, 255)); transform: none; opacity: 1;"
                  >
                    <p
                      class="framer-text framer-styles-preset-10181gm"
                      data-styles-preset="Y8JjgkGIV"
                      style="--framer-text-color: var(--extracted-r6o4lv, var(--token-a889bef8-b27f-49ca-abb1-f59cd0820711, rgb(255, 255, 255)));"
                    >
                      Carbon experts
                    </p>
                  </div>
                </div>
              </div> */}
              {/* <div
                class="framer-5n3kq-container"
                style="will-change: transform; opacity: 1; transform: translateY(-20px);"
              >
                <div
                  class="framer-UaM98 framer-FZIVT framer-st3bo7 framer-v-h0fucf"
                  data-framer-name="Blur"
                  style="--10ocmuz: 6px 16px 6px 16px; backdrop-filter: blur(10px); background-color: rgba(209, 209, 209, 0.25); border-radius: 32px; opacity: 1;"
                >
                  <div
                    class="framer-l3eoxm"
                    data-framer-component-type="RichTextContainer"
                    style="--framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; --extracted-r6o4lv: var(--token-a889bef8-b27f-49ca-abb1-f59cd0820711, rgb(255, 255, 255)); transform: none; opacity: 1;"
                  >
                    <p
                      class="framer-text framer-styles-preset-10181gm"
                      data-styles-preset="Y8JjgkGIV"
                      style="--framer-text-color: var(--extracted-r6o4lv, var(--token-a889bef8-b27f-49ca-abb1-f59cd0820711, rgb(255, 255, 255)));"
                    >
                      Impact-obsessed
                    </p>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>
      <section
        className="flex flex-col flex-none place-content-center items-center gap-16 lg:gap-24 w-full max-w-7xl h-min px-4 md:px-8 lg:px-12 relative overflow-hidden font-poppins"
        id="mission-and-vision"
      >
        <div className="flex flex-col flex-none place-content-center items-center gap-6 w-full max-w-[568px] md:max-w-[600px] h-min p-0 relative overflow-hidden">
          <div className="flex-none w-auto h-auto relative">
            <div className="h-min w-auto flex flex-row place-content-center items-center gap-1.5 px-4 py-1.5 relative overflow-hidden rounded-4xl opacity-100 bg-[#f0f4f3]">
              <div className="flex-none w-auto h-auto relative">
                <p className="text-sm text-[#5e6b64]">Mission & values</p>
              </div>
            </div>
          </div>
          <div className="flex-none w-full h-auto relative">
            <h1 className="text-[34px] md:text-[40px] lg:text-5xl text-[#193625] tracking-tighter text-center">
              We're on a mission...
            </h1>
          </div>
          <div className="flex-none w-full max-w-[620px] h-auto relative">
            <p className="text-[#5e6b64] text-center">
              ...to help educators save time, reduce stress, and improve student
              learning with AI-driven, impactful, and practical solutions.
            </p>
          </div>
        </div>
        <motion.div
          variants={parentStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="flex md:grid md:flex-none gap-6 auto-rows-fr grid-cols-2 grid-rows-2 h-min justify-center md:max-w-[900px] flex-col md:flex-row items-center content-center max-w-[400px] overflow-visible p-0 relative w-full"
        >
          {steps.map((step, key) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={key}
                variants={fadeUpFromBottom}
                className="place-self-start flex-none h-[250px] relative w-full"
              >
                <div className="relative flex flex-col justify-between items-start bg-[#f0f4f3] h-full rounded-[20px] overflow-hidden p-6">
                  <Icon
                    className="absolute -right-10 top-1/2 -translate-y-1/2 w-52 h-52 text-[#193625]/10 blur-[1px] pointer-events-none"
                    strokeWidth={1.5}
                  />

                  {/* Top Row */}
                  <div className="relative z-10 flex flex-row justify-between items-start w-full">
                    <div
                      className="flex justify-center items-center flex-none p-2 bg-white rounded-full"
                      style={{
                        boxShadow:
                          "rgba(0, 0, 0, 0.14) 0px 0.78363px 0.78363px -0.5px, rgba(0, 0, 0, 0.14) 0px 1.91965px 1.91965px -1px, rgba(0, 0, 0, 0.13) 0px 3.63745px 3.63745px -1.5px, rgba(0, 0, 0, 0.13) 0px 6.35004px 6.35004px -2px, rgba(0, 0, 0, 0.12) 0px 11.0519px 11.0519px -2.5px, rgba(0, 0, 0, 0.1) 0px 20.2428px 20.2428px -3px, rgba(0, 0, 0, 0.06) 0px 40px 40px -3.5px",
                      }}
                    >
                      <div className="flex justify-center items-center h-8 w-8">
                        <span className="text-[26px] font-semibold text-[#193625] leading-none">
                          {key + 1}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="relative z-10 flex flex-col gap-2 max-w-lg w-full">
                    <h3 className="text-2xl md:text-[28px] text-[#193625] leading-[1.2em] tracking-tight">
                      {step.title}
                    </h3>

                    <p className="text-[16px] text-[#5e6b64] leading-[1.5em]">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* <section class="framer-1x5ez5g" data-framer-name="Team">
        <div class="framer-1r6ujhl" data-framer-name="Container">
          <div class="framer-1wr3f61" data-framer-name="Heading">
            <div class="framer-1jrh5w6-container">
              <div
                class="framer-UaM98 framer-FZIVT framer-st3bo7 framer-v-st3bo7"
                data-framer-name="Default"
                style="--10ocmuz: 6px 16px 6px 16px; backdrop-filter: none; background-color: var(--token-67d4c3b0-366f-4285-aac0-3c847074502f, rgb(240, 244, 243)); border-radius: 32px; opacity: 1;"
              >
                <div
                  class="framer-l3eoxm"
                  data-framer-component-type="RichTextContainer"
                  style="--framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; transform: none; opacity: 1;"
                >
                  <p
                    class="framer-text framer-styles-preset-10181gm"
                    data-styles-preset="Y8JjgkGIV"
                  >
                    Team
                  </p>
                </div>
              </div>
            </div>
            <div
              class="framer-m5oss"
              data-framer-component-type="RichTextContainer"
              style="transform: none;"
            >
              <h2
                class="framer-text framer-styles-preset-xaq1zr"
                data-styles-preset="fjL73p9pc"
                style="--framer-text-alignment: center;"
              >
                Meet our founders
              </h2>
            </div>
          </div>
          <div class="framer-1bk2nil" data-framer-name="Content">
            <div class="framer-teuvwu-container">
              <div
                class="framer-hEsC3 framer-b4zYV framer-ehpIa framer-IEy3N framer-og3rn8 framer-v-1de4a32"
                data-framer-name="Reversed"
                style="width: 100%; border-radius: 20px; opacity: 1;"
              >
                <div
                  class="framer-14r8i7n"
                  data-framer-name="Content"
                  style="will-change: transform; opacity: 1; transform: none;"
                >
                  <div
                    class="framer-1r1t622"
                    data-framer-name="Text"
                    style="opacity: 1;"
                  >
                    <div
                      class="framer-l8t37a"
                      data-framer-name="Name and Role"
                      style="opacity: 1;"
                    >
                      <div
                        class="framer-1oztw7f"
                        data-framer-component-type="RichTextContainer"
                        style="--framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; transform: none; opacity: 1;"
                      >
                        <h3
                          class="framer-text framer-styles-preset-11qpdnt"
                          data-styles-preset="B3TBq1tCI"
                        >
                          John Nichols
                        </h3>
                      </div>
                      <div
                        class="framer-kumx0c"
                        data-framer-component-type="RichTextContainer"
                        style="--extracted-1eung3n: var(--token-1766e044-1394-4246-a609-d6d0b6a8c40c, rgb(94, 107, 100)); --framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; transform: none; opacity: 1;"
                      >
                        <h4
                          class="framer-text framer-styles-preset-fo8yz6"
                          data-styles-preset="RjH199IR2"
                          style="--framer-text-color: var(--extracted-1eung3n, var(--token-1766e044-1394-4246-a609-d6d0b6a8c40c, rgb(94, 107, 100)));"
                        >
                          Co-founder &amp; lead strategist
                        </h4>
                      </div>
                    </div>
                    <div
                      class="framer-277i4r"
                      data-framer-component-type="RichTextContainer"
                      style="--framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; transform: none; opacity: 1;"
                    >
                      <p
                        class="framer-text framer-styles-preset-xqj5vo"
                        data-styles-preset="ynn6MjRHb"
                      >
                        John has over 5 years’ experience in sustainability and
                        strategy. He’s helped companies from tech to
                        manufacturing create actionable net-zero plans. John
                        focuses on making climate strategy clear and empowering
                        SMEs to lead with confidence.
                      </p>
                    </div>
                  </div>
                  <div
                    class="framer-1h5qjks"
                    data-framer-name="Socials"
                    style="opacity: 1;"
                  >
                    <div class="framer-qi3c5-container" style="opacity: 1;">
                      <a
                        class="framer-KZvG7 framer-x2erqo framer-v-mhxm8p framer-g4ow2q"
                        data-framer-name="Small"
                        href="https://x.com/home"
                        target="_blank"
                        rel="noopener"
                        style="opacity: 1;"
                      >
                        <div
                          class="framer-1rhz2cm"
                          data-framer-name="Slider"
                          style="opacity: 1;"
                        >
                          <div
                            class="framer-1xsmuy-container"
                            style="opacity: 1;"
                          >
                            <div style="display: contents;">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 256 256"
                                focusable="false"
                                color="var(--token-1766e044-1394-4246-a609-d6d0b6a8c40c, rgb(94, 107, 100))"
                                style="user-select: none; width: 100%; height: 100%; display: inline-block; fill: var(--token-1766e044-1394-4246-a609-d6d0b6a8c40c, rgb(94, 107, 100)); color: var(--token-1766e044-1394-4246-a609-d6d0b6a8c40c, rgb(94, 107, 100)); flex-shrink: 0;"
                              >
                                <g
                                  color="var(--token-1766e044-1394-4246-a609-d6d0b6a8c40c, rgb(94, 107, 100))"
                                  weight="regular"
                                >
                                  <path d="M214.75,211.71l-62.6-98.38,61.77-67.95a8,8,0,0,0-11.84-10.76L143.24,99.34,102.75,35.71A8,8,0,0,0,96,32H48a8,8,0,0,0-6.75,12.3l62.6,98.37-61.77,68a8,8,0,1,0,11.84,10.76l58.84-64.72,40.49,63.63A8,8,0,0,0,160,224h48a8,8,0,0,0,6.75-12.29ZM164.39,208,62.57,48h29L193.43,208Z"></path>
                                </g>
                              </svg>
                            </div>
                          </div>
                          <div
                            class="framer-bvqlw0-container"
                            style="opacity: 1;"
                          >
                            <div style="display: contents;">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 256 256"
                                focusable="false"
                                color="var(--token-a889bef8-b27f-49ca-abb1-f59cd0820711, rgb(255, 255, 255))"
                                style="user-select: none; width: 100%; height: 100%; display: inline-block; fill: var(--token-a889bef8-b27f-49ca-abb1-f59cd0820711, rgb(255, 255, 255)); color: var(--token-a889bef8-b27f-49ca-abb1-f59cd0820711, rgb(255, 255, 255)); flex-shrink: 0;"
                              >
                                <g
                                  color="var(--token-a889bef8-b27f-49ca-abb1-f59cd0820711, rgb(255, 255, 255))"
                                  weight="regular"
                                >
                                  <path d="M214.75,211.71l-62.6-98.38,61.77-67.95a8,8,0,0,0-11.84-10.76L143.24,99.34,102.75,35.71A8,8,0,0,0,96,32H48a8,8,0,0,0-6.75,12.3l62.6,98.37-61.77,68a8,8,0,1,0,11.84,10.76l58.84-64.72,40.49,63.63A8,8,0,0,0,160,224h48a8,8,0,0,0,6.75-12.29ZM164.39,208,62.57,48h29L193.43,208Z"></path>
                                </g>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                    <div class="framer-16lmppu-container" style="opacity: 1;">
                      <a
                        class="framer-KZvG7 framer-x2erqo framer-v-mhxm8p framer-g4ow2q"
                        data-framer-name="Small"
                        href="https://www.linkedin.com/"
                        target="_blank"
                        rel="noopener"
                        style="opacity: 1;"
                      >
                        <div
                          class="framer-1rhz2cm"
                          data-framer-name="Slider"
                          style="opacity: 1;"
                        >
                          <div
                            class="framer-1xsmuy-container"
                            style="opacity: 1;"
                          >
                            <div style="display: contents;">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 256 256"
                                focusable="false"
                                color="var(--token-1766e044-1394-4246-a609-d6d0b6a8c40c, rgb(94, 107, 100))"
                                style="user-select: none; width: 100%; height: 100%; display: inline-block; fill: var(--token-1766e044-1394-4246-a609-d6d0b6a8c40c, rgb(94, 107, 100)); color: var(--token-1766e044-1394-4246-a609-d6d0b6a8c40c, rgb(94, 107, 100)); flex-shrink: 0;"
                              >
                                <g
                                  color="var(--token-1766e044-1394-4246-a609-d6d0b6a8c40c, rgb(94, 107, 100))"
                                  weight="regular"
                                >
                                  <path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z"></path>
                                </g>
                              </svg>
                            </div>
                          </div>
                          <div
                            class="framer-bvqlw0-container"
                            style="opacity: 1;"
                          >
                            <div style="display: contents;">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 256 256"
                                focusable="false"
                                color="var(--token-a889bef8-b27f-49ca-abb1-f59cd0820711, rgb(255, 255, 255))"
                                style="user-select: none; width: 100%; height: 100%; display: inline-block; fill: var(--token-a889bef8-b27f-49ca-abb1-f59cd0820711, rgb(255, 255, 255)); color: var(--token-a889bef8-b27f-49ca-abb1-f59cd0820711, rgb(255, 255, 255)); flex-shrink: 0;"
                              >
                                <g
                                  color="var(--token-a889bef8-b27f-49ca-abb1-f59cd0820711, rgb(255, 255, 255))"
                                  weight="regular"
                                >
                                  <path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z"></path>
                                </g>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  class="framer-xcqk29"
                  data-framer-name="Visual"
                  style="will-change: transform; border-radius: 20px; opacity: 1; transform: none;"
                >
                  <div
                    class="framer-9sgvzw"
                    data-framer-name="Image"
                    style="will-change: transform; border-radius: 20px; opacity: 1; transform: none;"
                  >
                    <div
                      data-framer-background-image-wrapper="true"
                      style="position: absolute; border-radius: inherit; corner-shape: inherit; inset: 0px;"
                    >
                      <Image
                        decoding="auto"
                        loading="lazy"
                        width="1024"
                        height="1024"
                        sizes="max((min(100vw - 136px, 1280px) - 48px) / 2, 1px)"
                        srcset="https://framerusercontent.com/images/8RwmIoskSEGpLXital4xtnDNL8.png?scale-down-to=512&amp;width=1024&amp;height=1024 512w,https://framerusercontent.com/images/8RwmIoskSEGpLXital4xtnDNL8.png?width=1024&amp;height=1024 1024w"
                        src="https://framerusercontent.com/images/8RwmIoskSEGpLXital4xtnDNL8.png?width=1024&amp;height=1024"
                        alt=""
                        style="display: block; width: 100%; height: 100%; border-radius: inherit; corner-shape: inherit; object-position: center center; object-fit: cover;"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="framer-1jep0jp-container">
              <div
                class="framer-hEsC3 framer-b4zYV framer-ehpIa framer-IEy3N framer-og3rn8 framer-v-og3rn8"
                data-framer-name="Default"
                style="width: 100%; border-radius: 20px; opacity: 1;"
              >
                <div
                  class="framer-14r8i7n"
                  data-framer-name="Content"
                  style="will-change: transform; opacity: 1; transform: none;"
                >
                  <div
                    class="framer-1r1t622"
                    data-framer-name="Text"
                    style="opacity: 1;"
                  >
                    <div
                      class="framer-l8t37a"
                      data-framer-name="Name and Role"
                      style="opacity: 1;"
                    >
                      <div
                        class="framer-1oztw7f"
                        data-framer-component-type="RichTextContainer"
                        style="--framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; transform: none; opacity: 1;"
                      >
                        <h3
                          class="framer-text framer-styles-preset-11qpdnt"
                          data-styles-preset="B3TBq1tCI"
                        >
                          Laura Hall
                        </h3>
                      </div>
                      <div
                        class="framer-kumx0c"
                        data-framer-component-type="RichTextContainer"
                        style="--extracted-1eung3n: var(--token-1766e044-1394-4246-a609-d6d0b6a8c40c, rgb(94, 107, 100)); --framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; transform: none; opacity: 1;"
                      >
                        <h4
                          class="framer-text framer-styles-preset-fo8yz6"
                          data-styles-preset="RjH199IR2"
                          style="--framer-text-color: var(--extracted-1eung3n, var(--token-1766e044-1394-4246-a609-d6d0b6a8c40c, rgb(94, 107, 100)));"
                        >
                          Co-founder &amp; technical director
                        </h4>
                      </div>
                    </div>
                    <div
                      class="framer-277i4r"
                      data-framer-component-type="RichTextContainer"
                      style="--framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; transform: none; opacity: 1;"
                    >
                      <p
                        class="framer-text framer-styles-preset-xqj5vo"
                        data-styles-preset="ynn6MjRHb"
                      >
                        Laura is a carbon accounting expert with a background in
                        environmental science. She’s supported global clients
                        with emissions reporting and compliance. At GreenLeaf,
                        she ensures all work is technically sound, transparent,
                        and results-driven.
                      </p>
                    </div>
                  </div>
                  <div
                    class="framer-1h5qjks"
                    data-framer-name="Socials"
                    style="opacity: 1;"
                  >
                    <div class="framer-qi3c5-container" style="opacity: 1;">
                      <a
                        class="framer-KZvG7 framer-x2erqo framer-v-mhxm8p framer-g4ow2q"
                        data-framer-name="Small"
                        href="https://x.com/home"
                        target="_blank"
                        rel="noopener"
                        style="opacity: 1;"
                      >
                        <div
                          class="framer-1rhz2cm"
                          data-framer-name="Slider"
                          style="opacity: 1;"
                        >
                          <div
                            class="framer-1xsmuy-container"
                            style="opacity: 1;"
                          >
                            <div style="display: contents;">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 256 256"
                                focusable="false"
                                color="var(--token-1766e044-1394-4246-a609-d6d0b6a8c40c, rgb(94, 107, 100))"
                                style="user-select: none; width: 100%; height: 100%; display: inline-block; fill: var(--token-1766e044-1394-4246-a609-d6d0b6a8c40c, rgb(94, 107, 100)); color: var(--token-1766e044-1394-4246-a609-d6d0b6a8c40c, rgb(94, 107, 100)); flex-shrink: 0;"
                              >
                                <g
                                  color="var(--token-1766e044-1394-4246-a609-d6d0b6a8c40c, rgb(94, 107, 100))"
                                  weight="regular"
                                >
                                  <path d="M214.75,211.71l-62.6-98.38,61.77-67.95a8,8,0,0,0-11.84-10.76L143.24,99.34,102.75,35.71A8,8,0,0,0,96,32H48a8,8,0,0,0-6.75,12.3l62.6,98.37-61.77,68a8,8,0,1,0,11.84,10.76l58.84-64.72,40.49,63.63A8,8,0,0,0,160,224h48a8,8,0,0,0,6.75-12.29ZM164.39,208,62.57,48h29L193.43,208Z"></path>
                                </g>
                              </svg>
                            </div>
                          </div>
                          <div
                            class="framer-bvqlw0-container"
                            style="opacity: 1;"
                          >
                            <div style="display: contents;">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 256 256"
                                focusable="false"
                                color="var(--token-a889bef8-b27f-49ca-abb1-f59cd0820711, rgb(255, 255, 255))"
                                style="user-select: none; width: 100%; height: 100%; display: inline-block; fill: var(--token-a889bef8-b27f-49ca-abb1-f59cd0820711, rgb(255, 255, 255)); color: var(--token-a889bef8-b27f-49ca-abb1-f59cd0820711, rgb(255, 255, 255)); flex-shrink: 0;"
                              >
                                <g
                                  color="var(--token-a889bef8-b27f-49ca-abb1-f59cd0820711, rgb(255, 255, 255))"
                                  weight="regular"
                                >
                                  <path d="M214.75,211.71l-62.6-98.38,61.77-67.95a8,8,0,0,0-11.84-10.76L143.24,99.34,102.75,35.71A8,8,0,0,0,96,32H48a8,8,0,0,0-6.75,12.3l62.6,98.37-61.77,68a8,8,0,1,0,11.84,10.76l58.84-64.72,40.49,63.63A8,8,0,0,0,160,224h48a8,8,0,0,0,6.75-12.29ZM164.39,208,62.57,48h29L193.43,208Z"></path>
                                </g>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                    <div class="framer-16lmppu-container" style="opacity: 1;">
                      <a
                        class="framer-KZvG7 framer-x2erqo framer-v-mhxm8p framer-g4ow2q"
                        data-framer-name="Small"
                        href="https://www.linkedin.com"
                        target="_blank"
                        rel="noopener"
                        style="opacity: 1;"
                      >
                        <div
                          class="framer-1rhz2cm"
                          data-framer-name="Slider"
                          style="opacity: 1;"
                        >
                          <div
                            class="framer-1xsmuy-container"
                            style="opacity: 1;"
                          >
                            <div style="display: contents;">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 256 256"
                                focusable="false"
                                color="var(--token-1766e044-1394-4246-a609-d6d0b6a8c40c, rgb(94, 107, 100))"
                                style="user-select: none; width: 100%; height: 100%; display: inline-block; fill: var(--token-1766e044-1394-4246-a609-d6d0b6a8c40c, rgb(94, 107, 100)); color: var(--token-1766e044-1394-4246-a609-d6d0b6a8c40c, rgb(94, 107, 100)); flex-shrink: 0;"
                              >
                                <g
                                  color="var(--token-1766e044-1394-4246-a609-d6d0b6a8c40c, rgb(94, 107, 100))"
                                  weight="regular"
                                >
                                  <path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z"></path>
                                </g>
                              </svg>
                            </div>
                          </div>
                          <div
                            class="framer-bvqlw0-container"
                            style="opacity: 1;"
                          >
                            <div style="display: contents;">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 256 256"
                                focusable="false"
                                color="var(--token-a889bef8-b27f-49ca-abb1-f59cd0820711, rgb(255, 255, 255))"
                                style="user-select: none; width: 100%; height: 100%; display: inline-block; fill: var(--token-a889bef8-b27f-49ca-abb1-f59cd0820711, rgb(255, 255, 255)); color: var(--token-a889bef8-b27f-49ca-abb1-f59cd0820711, rgb(255, 255, 255)); flex-shrink: 0;"
                              >
                                <g
                                  color="var(--token-a889bef8-b27f-49ca-abb1-f59cd0820711, rgb(255, 255, 255))"
                                  weight="regular"
                                >
                                  <path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z"></path>
                                </g>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  class="framer-xcqk29"
                  data-framer-name="Visual"
                  style="will-change: transform; border-radius: 20px; opacity: 1; transform: none;"
                >
                  <div
                    class="framer-9sgvzw"
                    data-framer-name="Image"
                    style="will-change: transform; border-radius: 20px; opacity: 1; transform: none;"
                  >
                    <div
                      data-framer-background-image-wrapper="true"
                      style="position: absolute; border-radius: inherit; corner-shape: inherit; inset: 0px;"
                    >
                      <Image
                        decoding="auto"
                        loading="lazy"
                        width="1024"
                        height="1024"
                        sizes="max((min(100vw - 136px, 1280px) - 48px) / 2, 1px)"
                        srcset="https://framerusercontent.com/images/obPaWlDXq1AYDBfPNR56fMcg4.png?scale-down-to=512&amp;width=1024&amp;height=1024 512w,https://framerusercontent.com/images/obPaWlDXq1AYDBfPNR56fMcg4.png?width=1024&amp;height=1024 1024w"
                        src="https://framerusercontent.com/images/obPaWlDXq1AYDBfPNR56fMcg4.png?width=1024&amp;height=1024"
                        alt=""
                        style="display: block; width: 100%; height: 100%; border-radius: inherit; corner-shape: inherit; object-position: center center; object-fit: cover;"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* <section class="framer-278uyh" data-framer-name="Testimonial">
        <div class="framer-jf1qld" data-framer-name="Container">
          <div class="framer-hlna7v-container">
            <div
              class="framer-MhSr7 framer-IEy3N framer-ehpIa framer-FZIVT framer-f9k5j0 framer-v-1nfrjz7"
              data-framer-name="Singular"
              style="background-color: rgba(0, 0, 0, 0); max-width: 100%; width: 100%; border-radius: 12px; opacity: 1;"
            >
              <div
                class="framer-4zvsw9"
                data-framer-name="Content"
                style="opacity: 1;"
              >
                <div
                  class="framer-h2522y-container"
                  style="will-change: transform; opacity: 1; transform: none;"
                >
                  <div
                    class="framer-7b3jf framer-8rqd0a framer-v-8rqd0a"
                    data-framer-name="5"
                    style="opacity: 1;"
                  >
                    <div class="framer-1cnyw2h-container" style="opacity: 1;">
                      <div style="display: contents;">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 256 256"
                          focusable="false"
                          color="var(--token-b853b0e1-8e9d-431d-b182-a32c05b25cd4, rgb(19, 38, 27))"
                          style="user-select: none; width: 100%; height: 100%; display: inline-block; fill: var(--token-b853b0e1-8e9d-431d-b182-a32c05b25cd4, rgb(19, 38, 27)); color: var(--token-b853b0e1-8e9d-431d-b182-a32c05b25cd4, rgb(19, 38, 27)); flex-shrink: 0;"
                        >
                          <g
                            color="var(--token-b853b0e1-8e9d-431d-b182-a32c05b25cd4, rgb(19, 38, 27))"
                            weight="fill"
                          >
                            <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"></path>
                          </g>
                        </svg>
                      </div>
                    </div>
                    <div class="framer-1hdspir-container" style="opacity: 1;">
                      <div style="display: contents;">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 256 256"
                          focusable="false"
                          color="var(--token-b853b0e1-8e9d-431d-b182-a32c05b25cd4, rgb(19, 38, 27))"
                          style="user-select: none; width: 100%; height: 100%; display: inline-block; fill: var(--token-b853b0e1-8e9d-431d-b182-a32c05b25cd4, rgb(19, 38, 27)); color: var(--token-b853b0e1-8e9d-431d-b182-a32c05b25cd4, rgb(19, 38, 27)); flex-shrink: 0;"
                        >
                          <g
                            color="var(--token-b853b0e1-8e9d-431d-b182-a32c05b25cd4, rgb(19, 38, 27))"
                            weight="fill"
                          >
                            <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"></path>
                          </g>
                        </svg>
                      </div>
                    </div>
                    <div class="framer-m70w6c-container" style="opacity: 1;">
                      <div style="display: contents;">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 256 256"
                          focusable="false"
                          color="var(--token-b853b0e1-8e9d-431d-b182-a32c05b25cd4, rgb(19, 38, 27))"
                          style="user-select: none; width: 100%; height: 100%; display: inline-block; fill: var(--token-b853b0e1-8e9d-431d-b182-a32c05b25cd4, rgb(19, 38, 27)); color: var(--token-b853b0e1-8e9d-431d-b182-a32c05b25cd4, rgb(19, 38, 27)); flex-shrink: 0;"
                        >
                          <g
                            color="var(--token-b853b0e1-8e9d-431d-b182-a32c05b25cd4, rgb(19, 38, 27))"
                            weight="fill"
                          >
                            <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"></path>
                          </g>
                        </svg>
                      </div>
                    </div>
                    <div class="framer-1ig20f1-container" style="opacity: 1;">
                      <div style="display: contents;">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 256 256"
                          focusable="false"
                          color="var(--token-b853b0e1-8e9d-431d-b182-a32c05b25cd4, rgb(19, 38, 27))"
                          style="user-select: none; width: 100%; height: 100%; display: inline-block; fill: var(--token-b853b0e1-8e9d-431d-b182-a32c05b25cd4, rgb(19, 38, 27)); color: var(--token-b853b0e1-8e9d-431d-b182-a32c05b25cd4, rgb(19, 38, 27)); flex-shrink: 0;"
                        >
                          <g
                            color="var(--token-b853b0e1-8e9d-431d-b182-a32c05b25cd4, rgb(19, 38, 27))"
                            weight="fill"
                          >
                            <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"></path>
                          </g>
                        </svg>
                      </div>
                    </div>
                    <div class="framer-v9uzz7-container" style="opacity: 1;">
                      <div style="display: contents;">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 256 256"
                          focusable="false"
                          color="var(--token-b853b0e1-8e9d-431d-b182-a32c05b25cd4, rgb(19, 38, 27))"
                          style="user-select: none; width: 100%; height: 100%; display: inline-block; fill: var(--token-b853b0e1-8e9d-431d-b182-a32c05b25cd4, rgb(19, 38, 27)); color: var(--token-b853b0e1-8e9d-431d-b182-a32c05b25cd4, rgb(19, 38, 27)); flex-shrink: 0;"
                        >
                          <g
                            color="var(--token-b853b0e1-8e9d-431d-b182-a32c05b25cd4, rgb(19, 38, 27))"
                            weight="fill"
                          >
                            <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"></path>
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="framer-1t4sx69"
                  data-framer-component-type="RichTextContainer"
                  style="--framer-paragraph-spacing: 0px; will-change: transform; opacity: 1; transform: none;"
                >
                  <p
                    class="framer-text framer-styles-preset-xqj5vo"
                    data-styles-preset="ynn6MjRHb"
                    style="--framer-text-alignment: center;"
                  >
                    “GreenLeaf helped us not just meet reporting
                    requirements—but actually use our carbon data to drive
                    change. We now have a strategy that excites our board and
                    resonates with customers.”
                  </p>
                </div>
              </div>
              <div
                class="framer-f1egfp"
                data-framer-name="Profile"
                style="will-change: transform; opacity: 1; transform: none;"
              >
                <div class="framer-10erngw-container" style="opacity: 1;">
                  <div
                    class="framer-SO6ZJ framer-1lwd9rw framer-v-1lwd9rw"
                    data-framer-name="Variant 1"
                    style="opacity: 1;"
                  >
                    <div
                      class="framer-iavwsg"
                      data-border="true"
                      data-framer-name="Image"
                      style="--border-bottom-width: 2px; --border-color: rgb(255, 255, 255); --border-left-width: 2px; --border-right-width: 2px; --border-style: solid; --border-top-width: 2px; border-radius: 32px; box-shadow: rgba(0, 0, 0, 0.14) 0px 0.78363px 0.78363px -0.5px, rgba(0, 0, 0, 0.14) 0px 1.91965px 1.91965px -1px, rgba(0, 0, 0, 0.13) 0px 3.63745px 3.63745px -1.5px, rgba(0, 0, 0, 0.13) 0px 6.35004px 6.35004px -2px, rgba(0, 0, 0, 0.12) 0px 11.0519px 11.0519px -2.5px, rgba(0, 0, 0, 0.1) 0px 20.2428px 20.2428px -3px, rgba(0, 0, 0, 0.06) 0px 40px 40px -3.5px; opacity: 1;"
                    >
                      <div
                        data-framer-background-image-wrapper="true"
                        style="position: absolute; border-radius: inherit; corner-shape: inherit; inset: 0px;"
                      >
                        <Image
                          decoding="auto"
                          loading="lazy"
                          width="992"
                          height="1200"
                          sizes="44px"
                          srcset="https://framerusercontent.com/images/CpTmY4j1mcVXCAjN4B2LwSmMm1Q.png?scale-down-to=1024 846w,https://framerusercontent.com/images/CpTmY4j1mcVXCAjN4B2LwSmMm1Q.png 992w"
                          src="https://framerusercontent.com/images/CpTmY4j1mcVXCAjN4B2LwSmMm1Q.png?scale-down-to=512"
                          alt=""
                          style="display: block; width: 100%; height: 100%; border-radius: inherit; corner-shape: inherit; object-position: center center; object-fit: cover;"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="framer-1mptq11"
                  data-framer-name="Text Wrapper"
                  style="opacity: 1;"
                >
                  <div
                    class="framer-1hhtyyt"
                    data-framer-component-type="RichTextContainer"
                    style="--framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; --framer-paragraph-spacing: 0px; transform: none; opacity: 1;"
                  >
                    <h4
                      class="framer-text framer-styles-preset-fo8yz6"
                      data-styles-preset="RjH199IR2"
                    >
                      Hannah Reid
                    </h4>
                  </div>
                  <div
                    class="framer-gx1oa5"
                    data-framer-component-type="RichTextContainer"
                    style="--framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; --framer-paragraph-spacing: 0px; transform: none; opacity: 1;"
                  >
                    <p
                      class="framer-text framer-styles-preset-10181gm"
                      data-styles-preset="Y8JjgkGIV"
                    >
                      Capsule
                    </p>
                  </div>
                </div>
                <div
                  class="framer-1vdi0m3"
                  data-framer-name="Divider"
                  style="background-color: var(--token-112245ea-c4a4-4dd8-b7f3-5c5ae3f046d2, rgb(150, 150, 150)); border-radius: 1px; opacity: 1;"
                ></div>
                <div
                  class="framer-idokjz"
                  data-framer-name="Logo"
                  style="opacity: 1;"
                >
                  <div
                    data-framer-background-image-wrapper="true"
                    style="position: absolute; border-radius: inherit; corner-shape: inherit; inset: 0px;"
                  >
                    <Image
                      decoding="auto"
                      loading="lazy"
                      width="149"
                      height="48"
                      src="https://framerusercontent.com/images/7tR2Zy7xnJcOtxNq60NmsX5lHY.svg"
                      alt=""
                      style="display: block; width: 100%; height: 100%; border-radius: inherit; corner-shape: inherit; object-position: center center; object-fit: cover;"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <CTA />
      <Footer />
    </div>
  );
};

export default AboutPage;
