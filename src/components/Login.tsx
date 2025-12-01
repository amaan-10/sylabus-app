import Link from "next/link";
import React from "react";

const Login = () => {
  return (
    <section
      className="flex flex-col flex-none place-content-center items-center justify-between h-min min-h-screen overflow-hidden px-12 pt-8 pb-[62px] relative w-full font-poppins"
      style={{
        backgroundColor:
          "var(--token-fe9e970b-2127-4c5c-bc1b-e38f4193bfe2, #f3f3f3)",
      }}
    >
      <div className="flex flex-col flex-none place-content-start items-start gap-2.5 h-min max-w-[1200px] overflow-hidden p-0 relative w-full">
        <div className="flex-none h-auto w-auto relative">
          <div className="content-center items-center cursor-pointer flex flex-row flex-nowrap gap-2 h-min justify-center overflow-hidden p-0 relative w-min">
            <div className="flex h-5 w-5 relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
                focusable="false"
                color="var(--token-34336198-31dd-4950-ac70-67552d075501, rgb(28, 28, 28))"
                className="select-none w-full h-full inline-block shrink-0"
                style={{
                  fill: "var(--token-34336198-31dd-4950-ac70-67552d075501, rgb(28,28,28))",
                  color:
                    "var(--token-34336198-31dd-4950-ac70-67552d075501, rgb(28,28,28))",
                }}
              >
                <g color="var(--token-34336198-31dd-4950-ac70-67552d075501, rgb(28, 28, 28))">
                  <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
                </g>
              </svg>
            </div>
            <div className="flex-none h-auto w-auto relative">
              <Link
                href="/"
                target="_self"
                aria-label="Back Home"
                className="inline-block cursor-pointer relative text-left no-underline whitespace-nowrap text-base leading-none font-normal tracking-[0em] transition-colors duration-300 ease-[cubic-bezier(0.8,1,0.7,1)]"
                style={{
                  color:
                    "var(--token-34336198-31dd-4950-ac70-67552d075501, rgb(28, 28, 28))",
                }}
              >
                <span>Back Home</span>
                <span
                  aria-hidden="true"
                  className="absolute -bottom-0.5 left-0 overflow-hidden w-full h-px rounded-none bg-current"
                  style={{
                    color:
                      "var(--token-1bfc92b2-7a4b-45e2-a854-14ae137e253a, rgb(254, 95, 60))",
                    transformOrigin: "0% 50%",
                    transform: "scale3d(0, 1, 1)",
                    transition: "transform 0.46s",
                  }}
                ></span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-none place-content-center items-center gap-8 h-min overflow-hidden p-0 relative w-full">
        <header
          className="flex flex-col justify-start items-start flex-none gap-2 h-min max-w-[500px] overflow-visible p-0 relative w-full"
          style={{
            willChange: "var(--framer-will-change-effect-override, transform)",
          }}
        >
          <div className="flex-none h-auto w-auto relative">
            <Link
              className="flex flex-row flex-nowrap content-center items-center gap-2 h-min justify-center p-0 relative no-underline w-min"
              href={"/"}
            >
              <div
                className="h-[46px] w-[46px] shrink-0 opacity-100 flex-none relative"
                style={{
                  imageRendering: "pixelated",
                }}
              >
                <div
                  className="w-full h-full"
                  style={{ aspectRatio: "inherit" }}
                >
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
              </div>
            </Link>
          </div>
          <div className="outline-none flex flex-col justify-start shrink-0 flex-none h-auto w-auto relative whitespace-pre">
            <h1 className="text-[32px] text-[#193625] tracking-tighter">
              Welcome to Sylabus
            </h1>
          </div>
        </header>
        <div
          className="flex flex-col justify-start items-start flex-none gap-0 h-min max-w-[500px] overflow-hidden p-0 relative w-full rounded-xl border border-solid"
          style={{
            borderColor:
              "var(--token-6f326015-829d-47cf-a20c-39c4de67590c, rgba(28, 28, 28, 0.12))",
            backdropFilter: "blur(5px)",
            backgroundColor:
              "var(--token-00bcbd47-73ad-403c-8f57-cbb89c4cbe78, rgba(250, 250, 250, 0.82))",
            willChange: "var(--framer-will-change-effect-override, transform)",
          }}
        >
          <div className="flex flex-col flex-none place-content-center items-center gap-4 h-min overflow-hidden p-4 relative w-full">
            <div className="flex flex-col flex-none place-content-center items-center gap-4 h-min overflow-hidden p-4 relative w-full">
              <div className="flex flex-row flex-none place-content-center items-center gap-2.5 h-min min-h-[258px] overflow-hidden p-0 relative w-full">
                <div className="flex-1 h-auto w-px relative">
                  <div className="w-full h-full relative flex justify-center items-center">
                    <form
                      method="POST"
                      className="w-full h-auto flex flex-col relative gap-6"
                      style={{
                        color:
                          "var(--token-78fe237d-cdda-442a-941c-79e916f3254d, rgb(250, 250, 250))",
                      }}
                    >
                      <div className="flex flex-col">
                        <label
                          className="pb-2 mb-1 rounded-none text-base font-medium leading-none tracking-[0.03em]"
                          style={{
                            background: "rgba(0, 0, 0, 0)",
                            color: "rgb(0, 0, 0)",
                          }}
                        >
                          Email<span>*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          placeholder="Email"
                          autoComplete="off"
                          autoCapitalize="off"
                          autoCorrect="off"
                          spellCheck="false"
                          value=""
                          className="w-full h-auto outline-none border-none p-4 rounded-lg text-base font-normal leading-none tracking-[0.03em]"
                          style={{
                            appearance: "none",
                            fontStyle: "normal",
                            background:
                              "var(--token-eebcedd1-332e-46cf-8c65-2cec5140c2d1, rgba(243, 243, 243, 0.82))",
                            color:
                              "var(--token-34336198-31dd-4950-ac70-67552d075501, rgb(28, 28, 28))",
                            boxShadow:
                              "inset 0 0 0 0px var(--token-34336198-31dd-4950-ac70-67552d075501, rgb(28, 28, 28)), inset 0 0 0 1px var(--token-6f326015-829d-47cf-a20c-39c4de67590c, rgba(28, 28, 28, 0.08))",
                          }}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          className="pb-2 mb-1 rounded-none text-base font-medium leading-none tracking-[0.03em]"
                          style={{
                            background: "rgba(0, 0, 0, 0)",
                            color: "rgb(0, 0, 0)",
                          }}
                        >
                          Password<span>*</span>
                        </label>
                        <div className="relative flex flex-row justify-between">
                          <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            autoComplete="off"
                            autoCapitalize="off"
                            autoCorrect="off"
                            spellCheck="false"
                            value=""
                            className="w-full h-auto outline-none border-none p-4 rounded-lg text-base font-normal leading-none tracking-[0.03em]"
                            style={{
                              appearance: "none",
                              fontStyle: "normal",
                              background:
                                "var(--token-eebcedd1-332e-46cf-8c65-2cec5140c2d1, rgba(243, 243, 243, 0.82))",
                              color:
                                "var(--token-34336198-31dd-4950-ac70-67552d075501, rgb(28, 28, 28))",
                              boxShadow:
                                "inset 0 0 0 0px var(--token-34336198-31dd-4950-ac70-67552d075501, rgb(28, 28, 28)), inset 0 0 0 1px var(--token-6f326015-829d-47cf-a20c-39c4de67590c, rgba(28, 28, 28, 0.08))",
                            }}
                          />
                          <button
                            type="button"
                            className="absolute right-0 top-0 bottom-0 flex items-center px-2 bg-transparent border-none text-black cursor-pointer"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="24"
                              viewBox="0 -960 960 960"
                              width="24"
                              fill="currentColor"
                            >
                              <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div>
                        <div className="block justify-end relative">
                          <div className="relative block">
                            <input
                              type="submit"
                              value="Sign In"
                              className="w-full h-full outline-none border-none cursor-pointer p-4 rounded-full text-base font-medium leading-none tracking-[0.03em] z-10"
                              style={{
                                appearance: "none",

                                fontStyle: "normal",
                                background:
                                  "var(--token-1bfc92b2-7a4b-45e2-a854-14ae137e253a, rgb(0, 0, 0))",
                                color:
                                  "var(--token-78fe237d-cdda-442a-941c-79e916f3254d, rgb(250, 250, 250))",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div
                  className="outline-none flex flex-col justify-start shrink-0 flex-none h-auto absolute right-0 top-[45%] whitespace-pre w-auto z-10"
                  style={{ transform: "translateY(-50%)" }}
                >
                  <p className="text-[#193625] text-sm underline text-center">
                    <Link href="./reset-password">Forgot Password?</Link>
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center flex-none flex-row gap-3 h-min overflow-visible p-0 relative w-[468px]">
                <div
                  className="outline-none flex flex-col justify-start shrink-0"
                  style={{ transform: "none" }}
                >
                  <p className="text-[#5e6b64] text-sm text-center">
                    Didn&apos;t have an account?
                  </p>
                </div>
                <div
                  className="outline-none flex flex-col justify-start shrink-0"
                  style={{ transform: "none" }}
                >
                  <p className="text-[#193625] text-sm underline text-center">
                    <Link href="./signup">Sign Up</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
