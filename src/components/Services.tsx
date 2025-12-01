import Image from "next/image";
import Link from "next/link";
import React from "react";

const Services = () => {
  const services = [
    {
      title: "AI Question Generation",
      description:
        "Create high-quality, syllabus-aligned questions instantly—customized by chapter, marks, and difficulty.",
      imageSrc: "/ai-paper-generator.png",
      imageAlt: "AI Question Generation",
      href: "",
    },
    {
      title: "Automated Paper Structuring",
      description:
        "Get perfectly formatted question papers with balanced sections, marks distribution, and clear instructions.",
      imageSrc: "/automated-paper-structuring.png",
      imageAlt: "Automated Paper Structuring",
      href: "",
    },
    {
      title: "Syllabus & Board Alignment",
      description:
        "Ensure every paper matches board guidelines, class levels, and subject requirements with complete accuracy.",
      imageSrc: "/syllabus-alignment.png",
      imageAlt: "Syllabus & Board Alignment",
      href: "",
    },
  ];
  return (
    <section
      className="flex flex-col flex-none place-content-center items-center gap-0 w-full h-min px-12 relative overflow-visible scroll-mt-24 font-poppins"
      id="services"
    >
      <div className="flex flex-row flex-none place-content-start items-start gap-16 w-full max-w-7xl h-min p-0 relative overflow-visible">
        <div className="z-1 flex flex-col flex-[1_0_0] place-content-start items-start gap-6 w-px h-min p-0 sticky top-[100px] overflow-visible">
          <div className="flex-none w-auto h-auto relative">
            <div className="h-min flex flex-row place-content-center items-center gap-1.5 w-min px-4 py-1.5 relative overflow-hidden rounded-4xl opacity-100 bg-[rgb(240,244,243)]">
              <div className="flex-none w-auto h-auto relative">
                <p className="text-sm text-[#5e6b64]">Services</p>
              </div>
            </div>
          </div>
          <div className="flex-none w-full h-auto relative">
            <h1 className="text-5xl text-[#193625] tracking-tighter w-3/5">
              Your partner in smarter exam creation
            </h1>
          </div>
          <div className="flex-none w-full max-w-[620px] h-auto relative">
            <p className="text-[#5e6b64] w-4/5">
              We help teachers and institutions streamline the entire question
              paper setting process. Whether you&apos;re preparing routine tests
              or designing major exams, we make it effortless, accurate, and
              fully syllabus-aligned.
            </p>
          </div>
        </div>
        <div className="flex flex-col flex-[1_0_0] place-content-start items-start gap-12 w-px h-min p-0 relative">
          {services.map((service, key) => (
            <div
              key={key}
              className="flex flex-row flex-none place-content-center items-center gap-2.5 w-full h-min p-0 relative"
            >
              <div className="flex-[1_0_0] w-px h-auto relative">
                <Link
                  className="cursor-pointer flex flex-col place-content-start items-start gap-5 h-min p-0 no-underline relative overflow-hidden w-full opacity-100"
                  data-framer-name="Default"
                  href={service.href}
                >
                  <div className="aspect-[1.3] h-[400px] flex-none gap-12 w-full relative overflow-hidden rounded-xl opacity-100">
                    <div className="flex-none w-full h-full absolute top-[-0.25773%] left-0 overflow-hidden">
                      <div className="absolute inset-0 rounded-inherit">
                        <Image
                          decoding="auto"
                          width="1200"
                          height="992"
                          sizes="max(min(100vw - 32px, 600px), 1px)"
                          src={service.imageSrc}
                          alt={service.imageAlt}
                          className="block w-full h-full rounded-inherit object-center object-cover"
                        />
                      </div>
                    </div>
                    <div
                      className="flex-none w-[57px] h-[57px] absolute top-0 right-0 overflow-visible opacity-100"
                      style={{
                        transform: "rotate(90deg)",
                        transformOrigin: "100% 0% 0px",
                      }}
                    >
                      <div className="z-1 flex-none w-auto h-auto absolute bottom-0 left-0">
                        <div className="flex flex-row place-content-center items-center gap-12 w-min h-min p-1.5 relative overflow-hidden bg-white rounded-full opacity-100">
                          <div className="flex-none w-6 h-6 relative">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 256 256"
                              focusable="false"
                              color="rgb(19, 38, 27)"
                              className="select-none w-full h-full inline-block shrink-0 fill-[#13261b] text-[#13261b]"
                            >
                              <g color="rgb(19, 38, 27)">
                                <path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z"></path>
                              </g>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col flex-none place-content-start items-start gap-4 w-full h-min pr-6 pl-0 relative overflow-hidden">
                    <div className="flex flex-col flex-none place-content-start items-start gap-2 w-full h-min p-0 relative overflow-hidden">
                      <div className="whitespace-pre-wrap wrap-break-word flex-none w-full h-auto relative">
                        <h3 className="text-[32px] text-[#193625] tracking-tighter">
                          {service.title}
                        </h3>
                      </div>
                      <div className="whitespace-pre-wrap wrap-break-word flex-none w-full h-auto relative">
                        <p className="text-[#5e6b64]">{service.description} </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ))}
          {/* <div className="flex flex-row flex-none place-content-center items-center gap-2.5 w-full h-min p-0 relative">
            <div className="flex-[1_0_0] w-px h-auto relative">
              <Link
                className="cursor-pointer flex flex-col place-content-start items-start gap-5 h-min p-0 no-underline relative overflow-hidden w-full rounded-2xl opacity-100"
                data-framer-name="Default"
                href="./services/carbon-footprinting-reporting"
              >
                <div className="aspect-[1.3] h-[400px] flex-none gap-12 w-full relative overflow-hidden rounded-xl opacity-100">
                  <div className="flex-none w-full h-full absolute top-[-0.25773%] left-0 overflow-hidden">
                    <div className="absolute inset-0 rounded-inherit">
                      <Image
                        decoding="auto"
                        width="1200"
                        height="992"
                        sizes="max(min(100vw - 32px, 600px), 1px)"
                        src=""
                        alt="Aerial view of a winding road cutting through rocky terrain and sandy landscape."
                        className="block w-full h-full rounded-inherit object-center object-cover"
                      />
                    </div>
                  </div>
                  <div
                    className="flex-none w-[57px] h-[57px] absolute top-0 right-0 overflow-visible opacity-100"
                    style={{
                      transform: "rotate(90deg)",
                      transformOrigin: "100% 0% 0px",
                    }}
                  >
                    <div className="z-1 flex-none w-auto h-auto absolute bottom-0 left-0">
                      <div className="flex flex-row place-content-center items-center gap-12 w-min h-min p-1.5 relative overflow-hidden bg-white rounded-full opacity-100">
                        <div className="flex-none w-6 h-6 relative">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 256 256"
                            focusable="false"
                            color="rgb(19, 38, 27)"
                            className="select-none w-full h-full inline-block shrink-0 fill-[#13261b] text-[#13261b]"
                          >
                            <g color="rgb(19, 38, 27)">
                              <path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z"></path>
                            </g>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col flex-none place-content-start items-start gap-4 w-full h-min pr-6 pl-0 relative overflow-hidden">
                  <div className="flex flex-col flex-none place-content-start items-start gap-2 w-full h-min p-0 relative overflow-hidden">
                    <div className="whitespace-pre-wrap wrap-break-word flex-none w-full h-auto relative">
                      <h3 className="text-[32px] text-[#193625] tracking-tighter">
                        Carbon footprinting &amp; reporting
                      </h3>
                    </div>
                    <div className="whitespace-pre-wrap wrap-break-word flex-none w-full h-auto relative">
                      <p className="text-[#5e6b64]">
                        Measure your emissions with clarity—laying the
                        foundation for smarter action.
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className="flex flex-row flex-none place-content-center items-center gap-2.5 w-full h-min p-0 relative">
            <div className="flex-[1_0_0] w-px h-auto relative">
              <Link
                className="cursor-pointer flex flex-col place-content-start items-start gap-5 h-min p-0 no-underline relative overflow-hidden w-full rounded-2xl opacity-100"
                data-framer-name="Default"
                href="./services/carbon-footprinting-reporting"
              >
                <div className="aspect-[1.3] h-[400px] flex-none gap-12 w-full relative overflow-hidden rounded-xl opacity-100">
                  <div className="flex-none w-full h-full absolute top-[-0.25773%] left-0 overflow-hidden">
                    <div className="absolute inset-0 rounded-inherit">
                      <Image
                        decoding="auto"
                        width="1200"
                        height="992"
                        sizes="max(min(100vw - 32px, 600px), 1px)"
                        src=""
                        alt="Aerial view of a winding road cutting through rocky terrain and sandy landscape."
                        className="block w-full h-full rounded-inherit object-center object-cover"
                      />
                    </div>
                  </div>
                  <div
                    className="flex-none w-[57px] h-[57px] absolute top-0 right-0 overflow-visible opacity-100"
                    style={{
                      transform: "rotate(90deg)",
                      transformOrigin: "100% 0% 0px",
                    }}
                  >
                    <div className="z-1 flex-none w-auto h-auto absolute bottom-0 left-0">
                      <div className="flex flex-row place-content-center items-center gap-12 w-min h-min p-1.5 relative overflow-hidden bg-white rounded-full opacity-100">
                        <div className="flex-none w-6 h-6 relative">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 256 256"
                            focusable="false"
                            color="rgb(19, 38, 27)"
                            className="select-none w-full h-full inline-block shrink-0 fill-[#13261b] text-[#13261b]"
                          >
                            <g color="rgb(19, 38, 27)">
                              <path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z"></path>
                            </g>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col flex-none place-content-start items-start gap-4 w-full h-min pr-6 pl-0 relative overflow-hidden">
                  <div className="flex flex-col flex-none place-content-start items-start gap-2 w-full h-min p-0 relative overflow-hidden">
                    <div className="whitespace-pre-wrap wrap-break-word flex-none w-full h-auto relative">
                      <h3 className="text-[32px] text-[#193625] tracking-tighter">
                        Carbon footprinting &amp; reporting
                      </h3>
                    </div>
                    <div className="whitespace-pre-wrap wrap-break-word flex-none w-full h-auto relative">
                      <p className="text-[#5e6b64]">
                        Measure your emissions with clarity—laying the
                        foundation for smarter action.
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Services;
