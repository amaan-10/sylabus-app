import Image from "next/image";
import React from "react";

const Benefits = () => {
  return (
    <div
      className="flex flex-col flex-none place-content-center items-center gap-24 w-full max-w-7xl h-min px-12 relative overflow-hidden"
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
          <h1 className="text-5xl text-[#193625] tracking-tighter">
            Why choose us?
          </h1>
        </div>
        <div className="flex-none w-full max-w-[620px] h-auto relative">
          <p className="text-[#5e6b64]">
            Sustainability can be a confusing space. We help you cut through the
            noise and focus on your business.
          </p>
        </div>
      </div>
      <div className="flex-none grid grid-rows-7 grid-cols-[repeat(3,minmax(50px,1fr))] auto-rows-fr justify-center gap-6 w-full h-[856px] p-0 relative overflow-hidden">
        <div
          className="bg-[#f0f4f3] rounded-[20px] flex flex-col flex-none place-content-start self-center items-start gap-2.5 w-full h-full p-6 relative"
          id="bento-1"
        >
          <div className="flex flex-col flex-none place-content-start items-start gap-2 w-full h-min p-0 relative overflow-hidden">
            <div className="whitespace-pre-wrap wrap-break-word flex-none w-full h-auto relative">
              <h3 className="text-[32px] text-[#193625] tracking-tighter">
                Get ahead of regulation
              </h3>
            </div>
            <div className="whitespace-pre-wrap wrap-break-word flex-none w-full h-auto relative">
              <p className="text-[#5e6b64]">
                Future-proof your business for a low carbon economy.
              </p>
            </div>
          </div>
          <div className="z-1 flex flex-row flex-none place-content-center items-center gap-0 w-min h-min p-0 absolute top-[150px] right-[345px] overflow-hidden">
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
          </div>
          <div
            className="z-1 flex flex-row flex-none place-content-center items-center gap-0 w-min h-min p-0 absolute top-[76%] right-[164px] overflow-hidden"
            style={{ transform: "translateY(-50%)" }}
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
          </div>
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
          <div
            className="z-1 flex-none absolute w-[441px] h-[254px] aspect-[1.733] top-[65%] left-[71%] overflow-visible"
            style={{ transform: "translate(-50%, -50%)" }}
          >
            <div className="absolute rounded-inherit inset-0">
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
          </div>
          <div className="flex flex-col flex-none place-content-start items-start gap-2 w-full max-w-[512px] h-min p-0 relative overflow-hidden">
            <div className="flex-none w-full h-auto relative">
              <h1 className="text-5xl text-[#193625] tracking-tighter">
                Win more contracts Why choose us?
              </h1>
            </div>
            <div className="flex-none w-full max-w-[620px] h-auto relative">
              <p className="text-[#5e6b64]">
                Sign new clients who are increasingly demanding sustainability.
              </p>
            </div>
          </div>
        </div>
        {/* <div class="framer-1j1n1xc" data-framer-name="Bento 3" id="bento-3">
          <div class="ssr-variant hidden-1e67z0q hidden-1cfhe4s">
            <div class="framer-bj4uk-container">
              <div
                class="framer-dMrJB framer-6sEQV framer-qbc2k framer-v-6dynho"
                data-framer-name="Variant 2"
                data-highlight="true"
                tabindex="0"
                style="width: 100%; opacity: 1;"
              >
                <div
                  class="framer-1cjd56h"
                  data-framer-component-type="RichTextContainer"
                  style="--framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; transform: none; transform-origin: 50% 50% 0px;"
                >
                  <div
                    class="framer-text framer-styles-preset-xaq1zr"
                    data-styles-preset="fjL73p9pc"
                    style="--framer-text-alignment:center"
                  >
                    Boost
                  </div>
                </div>
                <div
                  class="framer-1djzo0o"
                  data-framer-component-type="RichTextContainer"
                  style="--framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; transform: none; transform-origin: 50% 50% 0px;"
                >
                  <div
                    class="framer-text framer-styles-preset-xaq1zr"
                    data-styles-preset="fjL73p9pc"
                    style="--framer-text-alignment:center"
                  >
                    your
                  </div>
                </div>
                <div
                  class="framer-uwspo0-container"
                  style="transform: none; transform-origin: 50% 50% 0px;"
                >
                  <div
                    class="framer-QvSgR framer-1iw1yc3 framer-v-1iw1yc3"
                    data-framer-name="Open"
                    data-highlight="true"
                    tabindex="0"
                    style="height: 100%; transform: none; transform-origin: 50% 50% 0px;"
                  >
                    <div
                      class="framer-11gofme"
                      data-framer-name="Image"
                      style="mask: radial-gradient(57% 57% at -18.3% 50%, rgba(0, 0, 0, 0) 99.99%, rgb(0, 0, 0) 100%); border-radius: 56px; transform: none; transform-origin: 50% 50% 0px;"
                    >
                      <div
                        style="position:absolute;border-radius:inherit;top:0;right:0;bottom:0;left:0"
                        data-framer-background-image-wrapper="true"
                      >
                        <Image
                          decoding="auto"
                          width="1024"
                          height="1024"
                          sizes="48px"
                          srcset="https://framerusercontent.com/images/A3w4xqEF5H7Ab4dS4kF57om0Eg.png?scale-down-to=512 512w,https://framerusercontent.com/images/A3w4xqEF5H7Ab4dS4kF57om0Eg.png 1024w"
                          src="https://framerusercontent.com/images/A3w4xqEF5H7Ab4dS4kF57om0Eg.png"
                          alt="Smiling young woman with curly hair sitting at a laptop, in front of a teal wall."
                          style="display:block;width:100%;height:100%;border-radius:inherit;object-position:center;object-fit:cover"
                        />
                      </div>
                    </div>
                    <div
                      class="framer-1kvdw4u"
                      data-framer-name="Image"
                      style="mask: radial-gradient(57% 57% at -18.3% 50%, rgba(0, 0, 0, 0) 99.99%, rgb(0, 0, 0) 100%); border-radius: 56px; transform: none; transform-origin: 50% 50% 0px;"
                    >
                      <div
                        style="position:absolute;border-radius:inherit;top:0;right:0;bottom:0;left:0"
                        data-framer-background-image-wrapper="true"
                      >
                        <Image
                          decoding="auto"
                          width="992"
                          height="992"
                          sizes="48px"
                          srcset="https://framerusercontent.com/images/dXxdukdWufe676x8vnfDBOk12M.png?scale-down-to=512 512w,https://framerusercontent.com/images/dXxdukdWufe676x8vnfDBOk12M.png 992w"
                          src="https://framerusercontent.com/images/dXxdukdWufe676x8vnfDBOk12M.png"
                          alt="A young woman with long hair smiles while standing against a green backdrop, wearing a casual dark sweater."
                          style="display:block;width:100%;height:100%;border-radius:inherit;object-position:center;object-fit:cover"
                        />
                      </div>
                    </div>
                    <div
                      class="framer-g2nbbn"
                      data-framer-name="Image"
                      style="border-radius: 56px; transform: none; transform-origin: 50% 50% 0px;"
                    >
                      <div
                        style="position:absolute;border-radius:inherit;top:0;right:0;bottom:0;left:0"
                        data-framer-background-image-wrapper="true"
                      >
                        <Image
                          decoding="auto"
                          width="1024"
                          height="1024"
                          sizes="48px"
                          srcset="https://framerusercontent.com/images/29FbTd77MVf2iH1uxQXrb0EmWk.png?scale-down-to=512 512w,https://framerusercontent.com/images/29FbTd77MVf2iH1uxQXrb0EmWk.png 1024w"
                          src="https://framerusercontent.com/images/29FbTd77MVf2iH1uxQXrb0EmWk.png"
                          alt="A smiling person with curly hair sits at a desk, looking at a laptop against a dark background."
                          style="display:block;width:100%;height:100%;border-radius:inherit;object-position:center;object-fit:cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="framer-1uwln6c"
                  data-framer-component-type="RichTextContainer"
                  style="--framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; transform: none; transform-origin: 50% 50% 0px;"
                >
                  <div
                    class="framer-text framer-styles-preset-xaq1zr"
                    data-styles-preset="fjL73p9pc"
                    style="--framer-text-alignment:center"
                  >
                    team
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="framer-fozm67"
            data-framer-component-type="RichTextContainer"
            style="transform:none"
          >
            <p
              class="framer-text framer-styles-preset-xqj5vo"
              data-styles-preset="ynn6MjRHb"
              style="--framer-text-alignment:center"
            >
              Think of us like your in-house carbon experts.
            </p>
          </div>
        </div>
        <div class="framer-mcx8p" data-framer-name="Bento 4" id="bento-4">
          <div
            class="framer-5aq3dt"
            data-framer-component-type="RichTextContainer"
            style="transform:none"
          >
            <h3
              class="framer-text framer-styles-preset-11qpdnt"
              data-styles-preset="B3TBq1tCI"
              style="--framer-text-alignment:left;--framer-text-color:var(--token-b853b0e1-8e9d-431d-b182-a32c05b25cd4, rgb(19, 38, 27))"
            >
              Create real impact
            </h3>
          </div>
          <div class="framer-hi3oj-container">
            <div style="height:100%;width:100%">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 360 360"
                width="360"
                height="360"
                preserveAspectRatio="xMidYMid slice"
                style="width: 100%; height: 100%; transform: translate3d(0px, 0px, 0px);"
              >
                <defs>
                  <clipPath id="__lottie_element_2">
                    <rect width="360" height="360" x="0" y="0"></rect>
                  </clipPath>
                </defs>
                <g clip-path="url(#__lottie_element_2)">
                  <g
                    transform="matrix(1,0,0,1,180,180)"
                    opacity="1"
                    style="display: block;"
                  >
                    <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                      <path
                        fill="rgb(131,155,195)"
                        fill-opacity="1"
                        d=" M0,-50 C27.594999313354492,-50 50,-27.594999313354492 50,0 C50,27.594999313354492 27.594999313354492,50 0,50 C-27.594999313354492,50 -50,27.594999313354492 -50,0 C-50,-27.594999313354492 -27.594999313354492,-50 0,-50z"
                      ></path>
                    </g>
                  </g>
                  <g
                    transform="matrix(1,0,0,1,180,180)"
                    opacity="0.5194413749999958"
                    style="display: block;"
                  >
                    <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                      <path
                        fill="rgb(95,128,178)"
                        fill-opacity="1"
                        d=" M0,-106.08203125 C58.54667282104492,-106.08203125 106.08203125,-58.54667282104492 106.08203125,0 C106.08203125,58.54667282104492 58.54667282104492,106.08203125 0,106.08203125 C-58.54667282104492,106.08203125 -106.08203125,58.54667282104492 -106.08203125,0 C-106.08203125,-58.54667282104492 -58.54667282104492,-106.08203125 0,-106.08203125z"
                      ></path>
                    </g>
                  </g>
                  <g
                    transform="matrix(1,0,0,1,180,180)"
                    opacity="0.8166071428571382"
                    style="display: block;"
                  >
                    <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                      <path
                        fill="rgb(110,142,190)"
                        fill-opacity="1"
                        d=" M0,-61.61309814453125 C34.004268646240234,-61.61309814453125 61.61309814453125,-34.004268646240234 61.61309814453125,0 C61.61309814453125,34.004268646240234 34.004268646240234,61.61309814453125 0,61.61309814453125 C-34.004268646240234,61.61309814453125 -61.61309814453125,34.004268646240234 -61.61309814453125,0 C-61.61309814453125,-34.004268646240234 -34.004268646240234,-61.61309814453125 0,-61.61309814453125z"
                      ></path>
                    </g>
                  </g>
                  <g
                    transform="matrix(1,0,0,1,180,180)"
                    opacity="0.0022727272727223638"
                    style="display: none;"
                  >
                    <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                      <path
                        fill="rgb(131,155,195)"
                        fill-opacity="1"
                        d=" M0,-179.99781799316406 C99.3407974243164,-179.99781799316406 179.99781799316406,-99.3407974243164 179.99781799316406,0 C179.99781799316406,99.3407974243164 99.3407974243164,179.99781799316406 0,179.99781799316406 C-99.3407974243164,179.99781799316406 -179.99781799316406,99.3407974243164 -179.99781799316406,0 C-179.99781799316406,-99.3407974243164 -99.3407974243164,-179.99781799316406 0,-179.99781799316406z"
                      ></path>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </div>
        <div class="framer-171ye1o" data-framer-name="Bento 5" id="bento-5">
          <div class="framer-sijj50" data-framer-name="Text Wrapper">
            <div
              class="framer-19dqym0"
              data-framer-component-type="RichTextContainer"
              style="transform:none"
            >
              <h3
                class="framer-text framer-styles-preset-11qpdnt"
                data-styles-preset="B3TBq1tCI"
                style="--framer-text-alignment:center;--framer-text-color:var(--token-1766e044-1394-4246-a609-d6d0b6a8c40c, rgb(94, 107, 100))"
              >
                Award winning
              </h3>
            </div>
          </div>
          <div class="ssr-variant hidden-1cfhe4s">
            <div
              class="framer-6j7214"
              data-framer-name="Silver-trophy"
              style="will-change: transform; opacity: 1; transform: translate(-50%, -50%);"
            >
              <div
                style="position:absolute;border-radius:inherit;top:0;right:0;bottom:0;left:0"
                data-framer-background-image-wrapper="true"
              >
                <Image
                  decoding="auto"
                  width="1510"
                  height="2242"
                  sizes="246px"
                  srcset="https://framerusercontent.com/images/8Vxbo10pOeDPEsi2zWM9NFnK418.png?scale-down-to=1024&amp;width=1510&amp;height=2242 689w,https://framerusercontent.com/images/8Vxbo10pOeDPEsi2zWM9NFnK418.png?scale-down-to=2048&amp;width=1510&amp;height=2242 1379w,https://framerusercontent.com/images/8Vxbo10pOeDPEsi2zWM9NFnK418.png?width=1510&amp;height=2242 1510w"
                  src="https://framerusercontent.com/images/8Vxbo10pOeDPEsi2zWM9NFnK418.png?scale-down-to=2048&amp;width=1510&amp;height=2242"
                  alt="A shiny silver trophy on a black base, symbolizing achievement and victory."
                  style="display:block;width:100%;height:100%;border-radius:inherit;object-position:center;object-fit:cover"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="framer-1l6n113" data-framer-name="Bento 6" id="bento-6">
          <div class="framer-1r40i5i" data-framer-name="Text Wrapper">
            <div class="framer-odganu-container">
              <div
                class="framer-7b3jf framer-8rqd0a framer-v-8rqd0a"
                data-framer-name="5"
                style="opacity: 1;"
              >
                <div class="framer-1cnyw2h-container" style="opacity: 1;">
                  <div style="display:contents">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 256 256"
                      focusable="false"
                      color="var(--token-0ca21bca-b7c4-4d29-a839-edfa6a8d679a, rgb(168, 86, 19))"
                      style="user-select: none; width: 100%; height: 100%; display: inline-block; fill: var(--token-0ca21bca-b7c4-4d29-a839-edfa6a8d679a, rgb(168, 86, 19)); color: var(--token-0ca21bca-b7c4-4d29-a839-edfa6a8d679a, rgb(168, 86, 19)); flex-shrink: 0;"
                    >
                      <g
                        color="var(--token-0ca21bca-b7c4-4d29-a839-edfa6a8d679a, rgb(168, 86, 19))"
                        weight="fill"
                      >
                        <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"></path>
                      </g>
                    </svg>
                  </div>
                </div>
                <div class="framer-1hdspir-container" style="opacity: 1;">
                  <div style="display:contents">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 256 256"
                      focusable="false"
                      color="var(--token-0ca21bca-b7c4-4d29-a839-edfa6a8d679a, rgb(168, 86, 19))"
                      style="user-select: none; width: 100%; height: 100%; display: inline-block; fill: var(--token-0ca21bca-b7c4-4d29-a839-edfa6a8d679a, rgb(168, 86, 19)); color: var(--token-0ca21bca-b7c4-4d29-a839-edfa6a8d679a, rgb(168, 86, 19)); flex-shrink: 0;"
                    >
                      <g
                        color="var(--token-0ca21bca-b7c4-4d29-a839-edfa6a8d679a, rgb(168, 86, 19))"
                        weight="fill"
                      >
                        <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"></path>
                      </g>
                    </svg>
                  </div>
                </div>
                <div class="framer-m70w6c-container" style="opacity: 1;">
                  <div style="display:contents">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 256 256"
                      focusable="false"
                      color="var(--token-0ca21bca-b7c4-4d29-a839-edfa6a8d679a, rgb(168, 86, 19))"
                      style="user-select: none; width: 100%; height: 100%; display: inline-block; fill: var(--token-0ca21bca-b7c4-4d29-a839-edfa6a8d679a, rgb(168, 86, 19)); color: var(--token-0ca21bca-b7c4-4d29-a839-edfa6a8d679a, rgb(168, 86, 19)); flex-shrink: 0;"
                    >
                      <g
                        color="var(--token-0ca21bca-b7c4-4d29-a839-edfa6a8d679a, rgb(168, 86, 19))"
                        weight="fill"
                      >
                        <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"></path>
                      </g>
                    </svg>
                  </div>
                </div>
                <div class="framer-1ig20f1-container" style="opacity: 1;">
                  <div style="display:contents">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 256 256"
                      focusable="false"
                      color="var(--token-0ca21bca-b7c4-4d29-a839-edfa6a8d679a, rgb(168, 86, 19))"
                      style="user-select: none; width: 100%; height: 100%; display: inline-block; fill: var(--token-0ca21bca-b7c4-4d29-a839-edfa6a8d679a, rgb(168, 86, 19)); color: var(--token-0ca21bca-b7c4-4d29-a839-edfa6a8d679a, rgb(168, 86, 19)); flex-shrink: 0;"
                    >
                      <g
                        color="var(--token-0ca21bca-b7c4-4d29-a839-edfa6a8d679a, rgb(168, 86, 19))"
                        weight="fill"
                      >
                        <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"></path>
                      </g>
                    </svg>
                  </div>
                </div>
                <div class="framer-v9uzz7-container" style="opacity: 1;">
                  <div style="display:contents">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 256 256"
                      focusable="false"
                      color="var(--token-0ca21bca-b7c4-4d29-a839-edfa6a8d679a, rgb(168, 86, 19))"
                      style="user-select: none; width: 100%; height: 100%; display: inline-block; fill: var(--token-0ca21bca-b7c4-4d29-a839-edfa6a8d679a, rgb(168, 86, 19)); color: var(--token-0ca21bca-b7c4-4d29-a839-edfa6a8d679a, rgb(168, 86, 19)); flex-shrink: 0;"
                    >
                      <g
                        color="var(--token-0ca21bca-b7c4-4d29-a839-edfa6a8d679a, rgb(168, 86, 19))"
                        weight="fill"
                      >
                        <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"></path>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div class="ssr-variant hidden-1e67z0q hidden-1cfhe4s">
              <div class="framer-1p8px3y-container">
                <div
                  class="framer-0omUz framer-qVDXP framer-b4zYV framer-m2fs1n framer-v-19jnd49"
                  data-framer-name="Large"
                  style="width: 100%; opacity: 1;"
                >
                  <div class="framer-fnacem-container" style="opacity: 1;">
                    <p style='margin:0;opacity:0;pointer-events:none;user-select:none;text-align:center;font-family:"Poppins", "Poppins Placeholder", sans-serif;font-size:58px;font-style:normal;font-weight:400;letter-spacing:-0.05em;line-height:1.1em'>
                      54+
                    </p>
                    <p style='position:absolute;inset:0;user-select:none;margin:0;color:var(--token-b853b0e1-8e9d-431d-b182-a32c05b25cd4, rgb(19, 38, 27));text-decoration:none;text-align:center;font-family:"Poppins", "Poppins Placeholder", sans-serif;font-size:58px;font-style:normal;font-weight:400;letter-spacing:-0.05em;line-height:1.1em'>
                      54+
                    </p>
                  </div>
                  <div
                    class="framer-14hr5o8"
                    data-framer-component-type="RichTextContainer"
                    style="--extracted-r6o4lv: var(--token-1766e044-1394-4246-a609-d6d0b6a8c40c, rgb(94, 107, 100)); --framer-link-text-color: rgb(0, 153, 255); --framer-link-text-decoration: underline; --extracted-a0htzi: var(--token-1766e044-1394-4246-a609-d6d0b6a8c40c, rgb(94, 107, 100)); transform: none; opacity: 1;"
                  >
                    <h3
                      class="framer-text framer-styles-preset-11qpdnt"
                      data-styles-preset="B3TBq1tCI"
                      style="--framer-text-alignment:center;--framer-text-color:var(--extracted-a0htzi, var(--token-1766e044-1394-4246-a609-d6d0b6a8c40c, rgb(94, 107, 100)))"
                    >
                      Happy clients
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Benefits;
