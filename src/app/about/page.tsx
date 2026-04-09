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

      <section className="flex flex-col items-center justify-center w-full px-12 relative overflow-visible h-min gap-0 flex-none">
        <div className="flex flex-col items-center justify-center w-full max-w-7xl gap-24 h-min relative overflow-visible flex-none p-0">
          <div className="flex flex-col flex-none place-content-center items-center gap-6 w-full max-w-[568px] md:max-w-[600px] h-min p-0 relative overflow-hidden">
            <div className="flex-none w-auto h-auto relative">
              <div className="h-min w-auto flex flex-row place-content-center items-center gap-1.5 px-4 py-1.5 relative overflow-hidden rounded-4xl opacity-100 bg-[#f0f4f3]">
                <div className="flex-none w-auto h-auto relative">
                  <p className="text-sm text-[#5e6b64]">Team</p>
                </div>
              </div>
            </div>
            <div className="flex-none w-full h-auto relative">
              <h1 className="text-[34px] md:text-[40px] lg:text-5xl text-[#193625] tracking-tighter text-center">
                Meet the founders
              </h1>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full gap-12 h-min relative overflow-visible flex-none p-0">
            <div className="flex flex-col md:flex-row-reverse items-center justify-center gap-12 md:gap-16 w-full max-w-7xl md:h-min p-0 relative overflow-visible">
              <div className="z-1 flex flex-col flex-[1_0_0] place-content-start items-center md:items-start gap-6 h-min w-full md:w-px p-0 top-[100px] overflow-visible">
                <div className="flex flex-col items-center justify-center w-full gap-3 h-min relative overflow-visible flex-none p-0">
                  <div className="w-full h-auto relative flex-none whitespace-pre-wrap wrap-break-word">
                    <h3 className="text-[#193625] text-2xl md:text-[28px] lg:text-[32px] leading-[1.2em] tracking-tight">
                      Amaan Shaikh
                    </h3>
                  </div>
                  <div className="w-full h-auto relative flex-none whitespace-pre-wrap wrap-break-word">
                    <h4 className="text-[#5e6b64] text-[22px] lg:text-[24px] leading-[1.2em] tracking-tight">
                      Founder & CEO
                    </h4>
                  </div>
                </div>
                <div className="flex-none w-full max-w-[620px] h-auto relative">
                  <p className="text-[#5e6b64] text-center md:text-left">
                    Amaan is an AI & Data Science graduate with a passion for
                    transforming education. With expertise in machine learning
                    and a deep understanding of educators' needs, he leads
                    Sylabus's vision to revolutionize question paper creation
                    and empower teachers worldwide.
                  </p>
                </div>

                <div className="flex flex-row items-center justify-start content-center w-full gap-4 h-min relative overflow-visible flex-none p-0 z-2">
                  <div className="flex-none h-auto w-auto relative">
                    <a
                      href="https://www.linkedin.com/"
                      target="_blank"
                      rel="noopener"
                      className="flex flex-row items-center justify-center w-min h-min gap-2.5 p-0 relative overflow-hidden cursor-pointer no-underline"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 640"
                        className="h-7 w-7 text-[#5e6b64] fill-current"
                      >
                        <path d="M512 96L127.9 96C110.3 96 96 110.5 96 128.3L96 511.7C96 529.5 110.3 544 127.9 544L512 544C529.6 544 544 529.5 544 511.7L544 128.3C544 110.5 529.6 96 512 96zM231.4 480L165 480L165 266.2L231.5 266.2L231.5 480L231.4 480zM198.2 160C219.5 160 236.7 177.2 236.7 198.5C236.7 219.8 219.5 237 198.2 237C176.9 237 159.7 219.8 159.7 198.5C159.7 177.2 176.9 160 198.2 160zM480.3 480L413.9 480L413.9 376C413.9 351.2 413.4 319.3 379.4 319.3C344.8 319.3 339.5 346.3 339.5 374.2L339.5 480L273.1 480L273.1 266.2L336.8 266.2L336.8 295.4L337.7 295.4C346.6 278.6 368.3 260.9 400.6 260.9C467.8 260.9 480.3 305.2 480.3 362.8L480.3 480z" />
                      </svg>
                    </a>
                  </div>
                  <div className="flex-none h-auto w-auto relative">
                    <a
                      href="https://www.github.com"
                      target="_blank"
                      rel="noopener"
                      className="flex flex-row items-center justify-center w-min h-min gap-2.5 p-0 relative overflow-hidden cursor-pointer no-underline"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 640"
                        className="h-7 w-7 text-[#5e6b64] fill-current"
                      >
                        <path d="M544 160C544 124.7 515.3 96 480 96L160 96C124.7 96 96 124.7 96 160L96 480C96 515.3 124.7 544 160 544L480 544C515.3 544 544 515.3 544 480L544 160zM361.8 471.7C361.8 469.9 361.8 465.7 361.9 460.1C362 448.7 362 431.3 362 416.4C362 400.8 356.8 390.9 350.7 385.7C387.7 381.6 426.7 376.5 426.7 312.6C426.7 294.4 420.2 285.3 409.6 273.6C411.3 269.3 417 251.6 407.9 228.6C394 224.3 362.2 246.5 362.2 246.5C335.6 239 305.6 239 279 246.5C279 246.5 247.2 224.3 233.3 228.6C224.2 251.5 229.8 269.2 231.6 273.6C221 285.3 216 294.4 216 312.6C216 376.2 253.3 381.6 290.3 385.7C285.5 390 281.2 397.4 279.7 408C270.2 412.3 245.9 419.7 231.4 394.1C222.3 378.3 205.9 377 205.9 377C189.7 376.8 204.8 387.2 204.8 387.2C215.6 392.2 223.2 411.4 223.2 411.4C232.9 441.1 279.3 431.1 279.3 431.1C279.3 440.1 279.4 452.8 279.4 461.7C279.4 466.5 279.5 470.3 279.5 471.7C279.5 476 276.5 481.2 268 479.7C202 457.6 155.8 394.8 155.8 321.4C155.8 229.6 226 159.9 317.8 159.9C409.6 159.9 484 229.6 484 321.4C484.1 394.8 439.3 457.7 373.3 479.7C364.9 481.2 361.8 476 361.8 471.7zM271.3 416.9C271.1 415.4 272.4 414.1 274.3 413.7C276.2 413.5 278 414.3 278.2 415.6C278.5 416.9 277.2 418.2 275.2 418.6C273.3 419 271.5 418.2 271.3 416.9zM262.2 420.1C260 420.3 258.5 419.2 258.5 417.7C258.5 416.4 260 415.3 262 415.3C263.9 415.1 265.7 416.2 265.7 417.7C265.7 419 264.2 420.1 262.2 420.1zM247.9 417.9C246 417.5 244.7 416 245.1 414.7C245.5 413.4 247.5 412.8 249.2 413.2C251.2 413.8 252.5 415.3 252 416.6C251.6 417.9 249.6 418.5 247.9 417.9zM235.4 410.6C233.9 409.3 233.5 407.4 234.5 406.5C235.4 405.4 237.3 405.6 238.8 407.1C240.1 408.4 240.6 410.4 239.7 411.2C238.8 412.3 236.9 412.1 235.4 410.6zM226.9 400.6C225.8 399.1 225.8 397.4 226.9 396.7C228 395.8 229.7 396.5 230.6 398C231.7 399.5 231.7 401.3 230.6 402.1C229.7 402.7 228 402.1 226.9 400.6zM220.6 391.8C219.5 390.5 219.3 389 220.2 388.3C221.1 387.4 222.6 387.9 223.7 388.9C224.8 390.2 225 391.7 224.1 392.4C223.2 393.3 221.7 392.8 220.6 391.8zM214.6 385.4C213.3 384.8 212.7 383.7 213.1 382.8C213.5 382.2 214.6 381.9 215.9 382.4C217.2 383.1 217.8 384.2 217.4 385C217 385.9 215.7 386.1 214.6 385.4z" />
                      </svg>
                    </a>
                  </div>
                </div>
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
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center w-full px-12 gap-0 h-min relative overflow-visible flex-none">
        <div className="flex flex-row items-center justify-center w-full max-w-7xl gap-20 h-min relative overflow-visible flex-none p-0">
          <div className="flex-1 basis-0 w-px max-w-[620px] h-auto relative">
            <div className="flex flex-col items-center w-full max-w-full gap-8 h-min overflow-visible rounded-xl bg-transparent opacity-100 relative p-6">
              <div className="flex flex-col items-center justify-start content-center w-full gap-8 h-min relative overflow-visible flex-none p-0">
                <div className="flex gap-1">
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
                </div>
                <div className="flex-none w-full h-auto relative overflow-visible">
                  <p className="text-base text-[#5e6b64] text-center leading-[1.5em] tracking-[0em]">
                    “Sylabus has been a game-changer for our school. It saves us
                    hours of work each week and helps us create better question
                    papers for our students. Highly recommended!”
                  </p>
                </div>
              </div>
              <div className="flex flex-row items-center justify-start content-center w-min h-min gap-3.5 p-0 relative overflow-visible flex-none">
                <div className="flex-none w-auto h-auto relative">
                  <div className="flex flex-col items-start justify-start w-min h-min gap-0 p-0 relative overflow-visible">
                    <div
                      className="w-11 h-11 flex-none relative overflow-visible rounded-4xl border-2 border-white opacity-100"
                      style={{
                        boxShadow:
                          "rgba(0, 0, 0, 0.14) 0px 0.78363px 0.78363px -0.5px, rgba(0, 0, 0, 0.14) 0px 1.91965px 1.91965px -1px, rgba(0, 0, 0, 0.13) 0px 3.63745px 3.63745px -1.5px, rgba(0, 0, 0, 0.13) 0px 6.35004px 6.35004px -2px, rgba(0, 0, 0, 0.12) 0px 11.0519px 11.0519px -2.5px, rgba(0, 0, 0, 0.1) 0px 20.2428px 20.2428px -3px, rgba(0, 0, 0, 0.06) 0px 40px 40px -3.5px",
                      }}
                    >
                      <div className="absolute inset-0 rounded-[inherit]">
                        <Image
                          decoding="auto"
                          loading="lazy"
                          width="992"
                          height="1200"
                          sizes="44px"
                          src="/p1.png"
                          alt=""
                          className="block w-full h-full object-center object-cover rounded-[inherit]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start justify-start content-center w-min h-min gap-0 p-0 relative overflow-hidden flex-none">
                  <div className="flex-none w-auto h-auto relative overflow-visible whitespace-pre">
                    <h4 className="text-2xl text-[#13261b] leading-[1.2em] tracking-[-0.02em]">
                      Jane Cooper
                    </h4>
                  </div>
                  <div className="flex flex-col justify-start flex-none shrink-0 w-auto h-auto relative overflow-visible whitespace-pre outline-none">
                    <p className="text-sm text-[#5e6b64] leading-[1.5em]">
                      Capsule
                    </p>
                  </div>
                </div>
                <div className="w-0.5 h-12 flex-none relative overflow-hidden bg-[rgb(150,150,150)] rounded-[1px] opacity-100"></div>
                <div className="w-[105px] h-[34px] aspect-[3.1] flex-none relative overflow-hidden">
                  <div className="absolute inset-0 rounded-[inherit]">
                    <Image
                      decoding="auto"
                      loading="lazy"
                      width="149"
                      height="48"
                      src="/institutes/logo/aisc.png"
                      alt=""
                      className="block w-full h-full object-center object-cover rounded-[inherit]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </div>
  );
};

export default AboutPage;
