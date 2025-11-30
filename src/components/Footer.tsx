import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="flex flex-col place-content-center items-center gap-0 w-full h-min px-12 py-24 relative overflow-hidden bg-[#13261b] rounded-t-[20px] opacity-100 font-poppins">
      <div className="flex flex-col flex-none place-content-center items-center gap-16 w-full max-w-7xl h-min p-0 relative overflow-visible">
        <div className="flex flex-row flex-none place-content-start items-start gap-24 w-full h-min p-0 relative overflow-visible">
          <div className="flex flex-col flex-[1_0_0] place-content-start items-start gap-6 w-px h-min p-0 relative overflow-visible">
            <div className="flex-none w-auto h-auto relative">
              <Link
                aria-label="Logo"
                href={"/"}
                className="flex flex-row place-content-center items-center gap-3 w-min h-min p-0 no-underline relative overflow-hidden"
              >
                <div className="relative w-[42px] h-[42px]">
                  <svg
                    version="1.0"
                    xmlns="http://www.w3.org/2000/svg"
                    width="100"
                    height="100"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="xMidYMid meet"
                    className="select-none w-full h-full inline-block shrink-0 fill-white text-white"
                  >
                    <g
                      transform="translate(0,100) scale(0.1,-0.1)"
                      fill="#ffffff"
                      stroke="none"
                    >
                      <path d="M626 894 l-49 -75 121 -122 121 -121 75 50 75 50 -147 147 -147 146 -49 -75z" />
                      <path d="M509 743 c-50 -26 -135 -43 -215 -43 l-50 0 -23 -97 c-13 -54 -52 -186 -87 -294 -35 -108 -64 -201 -64 -205 0 -5 81 72 180 171 113 112 178 185 175 194 -9 24 23 61 53 61 35 0 52 -16 52 -50 0 -33 -17 -50 -50 -50 -19 0 -66 -40 -205 -180 -99 -99 -176 -180 -171 -180 4 0 96 29 204 63 109 35 241 75 295 87 l97 24 0 50 c0 80 18 166 45 221 l25 50 -103 103 c-56 56 -104 101 -107 101 -3 -1 -26 -13 -51 -26z" />
                    </g>
                  </svg>
                </div>
                <div className="relative w-auto h-auto text-white">
                  <p className="text-white text-4xl">Sylabus</p>
                </div>
              </Link>
            </div>
            <div className="whitespace-pre-wrap wrap-break-word flex-none w-full h-auto relative">
              <p className="text-white">
                Effortless Paper Setting for Educators.
              </p>
            </div>
            {/* <div className="z-2 flex flex-row flex-none place-content-center items-center gap-4 w-full h-min p-0 relative overflow-visible">
              <div className="flex-none w-auto h-auto relative">
                <a
                  href="https://x.com/"
                  target="_blank"
                  rel="noopener"
                  className="cursor-pointer flex flex-row place-content-center items-center gap-2.5 w-min h-min p-0 no-underline relative overflow-hidden"
                >
                  <div className="flex flex-col flex-none place-content-start items-center gap-0 w-min h-[20px] p-0 relative overflow-visible">
                    <div class="framer-1xsmuy-container" style="opacity: 1;">
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
                    <div class="framer-bvqlw0-container" style="opacity: 1;">
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
              <div class="framer-1l1qxj4-container" style="opacity: 1;">
                <a
                  class="framer-KZvG7 framer-x2erqo framer-v-mhxm8p framer-g4ow2q"
                  data-framer-name="Small"
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener"
                  style="opacity: 1;"
                >
                  <div
                    class="framer-1rhz2cm"
                    data-framer-name="Slider"
                    style="opacity: 1;"
                  >
                    <div class="framer-1xsmuy-container" style="opacity: 1;">
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
                            <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"></path>
                          </g>
                        </svg>
                      </div>
                    </div>
                    <div class="framer-bvqlw0-container" style="opacity: 1;">
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
                            <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"></path>
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              <div class="framer-55t06z-container" style="opacity: 1;">
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
                    <div class="framer-1xsmuy-container" style="opacity: 1;">
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
                    <div class="framer-bvqlw0-container" style="opacity: 1;">
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
              <div class="framer-1o2382q-container" style="opacity: 1;">
                <a
                  class="framer-KZvG7 framer-x2erqo framer-v-mhxm8p framer-g4ow2q"
                  data-framer-name="Small"
                  href="https://www.youtube.com/"
                  target="_blank"
                  rel="noopener"
                  style="opacity: 1;"
                >
                  <div
                    class="framer-1rhz2cm"
                    data-framer-name="Slider"
                    style="opacity: 1;"
                  >
                    <div class="framer-1xsmuy-container" style="opacity: 1;">
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
                            <path d="M164.44,121.34l-48-32A8,8,0,0,0,104,96v64a8,8,0,0,0,12.44,6.66l48-32a8,8,0,0,0,0-13.32ZM120,145.05V111l25.58,17ZM234.33,69.52a24,24,0,0,0-14.49-16.4C185.56,39.88,131,40,128,40s-57.56-.12-91.84,13.12a24,24,0,0,0-14.49,16.4C19.08,79.5,16,97.74,16,128s3.08,48.5,5.67,58.48a24,24,0,0,0,14.49,16.41C69,215.56,120.4,216,127.34,216h1.32c6.94,0,58.37-.44,91.18-13.11a24,24,0,0,0,14.49-16.41c2.59-10,5.67-28.22,5.67-58.48S236.92,79.5,234.33,69.52Zm-15.49,113a8,8,0,0,1-4.77,5.49c-31.65,12.22-85.48,12-86,12H128c-.54,0-54.33.2-86-12a8,8,0,0,1-4.77-5.49C34.8,173.39,32,156.57,32,128s2.8-45.39,5.16-54.47A8,8,0,0,1,41.93,68c30.52-11.79,81.66-12,85.85-12h.27c.54,0,54.38-.18,86,12a8,8,0,0,1,4.77,5.49C221.2,82.61,224,99.43,224,128S221.2,173.39,218.84,182.47Z"></path>
                          </g>
                        </svg>
                      </div>
                    </div>
                    <div class="framer-bvqlw0-container" style="opacity: 1;">
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
                            <path d="M164.44,121.34l-48-32A8,8,0,0,0,104,96v64a8,8,0,0,0,12.44,6.66l48-32a8,8,0,0,0,0-13.32ZM120,145.05V111l25.58,17ZM234.33,69.52a24,24,0,0,0-14.49-16.4C185.56,39.88,131,40,128,40s-57.56-.12-91.84,13.12a24,24,0,0,0-14.49,16.4C19.08,79.5,16,97.74,16,128s3.08,48.5,5.67,58.48a24,24,0,0,0,14.49,16.41C69,215.56,120.4,216,127.34,216h1.32c6.94,0,58.37-.44,91.18-13.11a24,24,0,0,0,14.49-16.41c2.59-10,5.67-28.22,5.67-58.48S236.92,79.5,234.33,69.52Zm-15.49,113a8,8,0,0,1-4.77,5.49c-31.65,12.22-85.48,12-86,12H128c-.54,0-54.33.2-86-12a8,8,0,0,1-4.77-5.49C34.8,173.39,32,156.57,32,128s2.8-45.39,5.16-54.47A8,8,0,0,1,41.93,68c30.52-11.79,81.66-12,85.85-12h.27c.54,0,54.38-.18,86,12a8,8,0,0,1,4.77,5.49C221.2,82.61,224,99.43,224,128S221.2,173.39,218.84,182.47Z"></path>
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div> */}
          </div>
          <div className="flex flex-col flex-none place-content-start items-start gap-8 w-min h-min p-0 relative overflow-visible">
            <div className="whitespace-pre flex-none w-auto h-auto relative">
              <p className="text-white text-2xl">Pages</p>
            </div>
            <nav className="flex flex-col flex-none place-content-start items-start gap-4 w-min h-min p-0 relative overflow-visible">
              {["Home", "About", "Services", "Blog"].map((label) => (
                <div key={label} className="flex-none w-auto h-auto relative">
                  <Link
                    href="./#hero"
                    className="group cursor-pointer flex flex-col place-content-start items-center gap-2.5 w-min h-min p-0 no-underline relative overflow-hidden rounded-sm"
                  >
                    <div className="whitespace-pre flex-none w-auto h-auto relative">
                      <span className="text-base text-[#5e6b64] transition-colors duration-200 motion-safe:transition-transform motion-safe:duration-300 group-hover:text-[#ffffff] group-hover:-translate-y-0.5 motion-safe:group-hover:-translate-y-0.5 inline-block">
                        {label}
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </nav>
          </div>
          <div className="flex flex-col flex-none place-content-start items-start gap-8 w-min h-min p-0 relative overflow-visible">
            <div className="whitespace-pre flex-none w-auto h-auto relative">
              <p className="text-white text-2xl">Information</p>
            </div>
            <nav className="flex flex-col flex-none place-content-start items-start gap-4 w-min h-min p-0 relative overflow-visible">
              {["Contact", "Privacy Policy", "Terms", "404"].map((label) => (
                <div key={label} className="flex-none w-auto h-auto relative">
                  <Link
                    href="./#hero"
                    className="group cursor-pointer flex flex-col place-content-start items-center gap-2.5 w-min h-min p-0 no-underline relative overflow-hidden rounded-sm"
                  >
                    <div className="whitespace-pre flex-none w-auto h-auto relative">
                      <span className="text-base text-[#5e6b64] transition-colors duration-200 motion-safe:transition-transform motion-safe:duration-300 group-hover:text-[#ffffff] group-hover:-translate-y-0.5 motion-safe:group-hover:-translate-y-0.5 inline-block">
                        {label}
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </nav>
          </div>
        </div>
        <div className="flex flex-row flex-none place-content-center items-center gap-24 w-full h-min pt-12 pl-0 pr-0 relative overflow-visible border-t border-[#969696] border-solid opacity-100">
          <div className="whitespace-pre-wrap wrap-break-word flex-[1_0_0] w-px h-auto relative">
            <p className="text-white text-sm">
              © 2025 Sylabus, All rights reserved
            </p>
          </div>
          {/* <div
            class="framer-oh2sks"
            data-framer-component-type="RichTextContainer"
            style="--extracted-r6o4lv: var(--token-a889bef8-b27f-49ca-abb1-f59cd0820711, rgb(255, 255, 255)); --framer-paragraph-spacing: 0px; transform: none; opacity: 1;"
          >
            <p
              class="framer-text framer-styles-preset-10181gm"
              data-styles-preset="Y8JjgkGIV"
              style="--framer-text-color: var(--extracted-r6o4lv, var(--token-a889bef8-b27f-49ca-abb1-f59cd0820711, rgb(255, 255, 255)));"
            >
              Built by{" "}
              <a
                class="framer-text framer-styles-preset-yw85ke"
                data-styles-preset="caiC9OguE"
                href="https://framer.link/RvFchTS"
                target="_blank"
                rel="noopener"
              >
                James Hicks
              </a>
            </p>
          </div>
          <div
            class="framer-osioa3"
            data-framer-component-type="RichTextContainer"
            style="--extracted-r6o4lv: var(--token-a889bef8-b27f-49ca-abb1-f59cd0820711, rgb(255, 255, 255)); --framer-paragraph-spacing: 0px; transform: none; opacity: 1;"
          >
            <p
              class="framer-text framer-styles-preset-10181gm"
              data-styles-preset="Y8JjgkGIV"
              style="--framer-text-color: var(--extracted-r6o4lv, var(--token-a889bef8-b27f-49ca-abb1-f59cd0820711, rgb(255, 255, 255)));"
            >
              Made in{" "}
              <a
                class="framer-text framer-styles-preset-yw85ke"
                data-styles-preset="caiC9OguE"
                href="https://framer.link/jh"
                target="_blank"
                rel="noopener"
              >
                Framer
              </a>
            </p>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
