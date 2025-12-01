import Link from "next/link";
import React from "react";

const Register = () => {
  return (
    <div
      className="flex flex-col flex-nowrap items-center content-center justify-start gap-0 h-min min-h-screen overflow-hidden p-0 relative w-auto font-poppins"
      style={{
        backgroundColor:
          "var(--token-0710fcd9-3272-4af6-82ab-d8894ab8f457, #1c1c1c)",
      }}
    >
      <article className="flex content-center items-center flex-none flex-row flex-nowrap gap-0 justify-end max-w-7xl min-h-screen overflow-hidden p-0 relative w-full z-1">
        <div className="flex flex-none flex-col flex-nowrap content-start items-start h-full justify-between overflow-hidden min-h-screen px-12 py-[62px] relative w-1/2 z-1">
          <div className="flex-none h-auto w-auto relative">
            <div className="content-center items-center cursor-pointer flex flex-row flex-nowrap gap-2 h-min justify-center overflow-hidden p-0 relative w-min">
              <div className="flex h-5 w-5 relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 256"
                  focusable="false"
                  color="var(--token-78fe237d-cdda-442a-941c-79e916f3254d, rgba(250, 250, 250, 0.92))"
                  className="select-none w-full h-full inline-block shrink-0"
                  style={{
                    fill: "var(--token-78fe237d-cdda-442a-941c-79e916f3254d, rgba(250, 250, 250, 0.92))",
                    color:
                      "var(--token-78fe237d-cdda-442a-941c-79e916f3254d, rgba(250, 250, 250, 0.92))",
                  }}
                >
                  <g color="var(--token-78fe237d-cdda-442a-941c-79e916f3254d, rgba(250, 250, 250, 0.92))">
                    <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
                  </g>
                </svg>
              </div>
              <div className="flex-none h-auto w-auto relative">
                <Link
                  href="/"
                  target="_self"
                  aria-label="Back Home"
                  className="inline-block cursor-pointer relative text-left whitespace-nowrap text-[16px] font-normal leading-[1em] no-underline"
                  style={{
                    color:
                      "var(--token-78fe237d-cdda-442a-941c-79e916f3254d, rgba(250, 250, 250, 0.92))",
                    fontFamily: `Montserrat, "Montserrat Placeholder", sans-serif`,
                    letterSpacing: "0em",
                    textTransform: "none",
                    transition: "color 0.3s cubic-bezier(0.8, 1, 0.7, 1)",
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
          <div
            className="flex flex-col flex-none flex-nowrap content-start items-start gap-4 h-min justify-start overflow-hidden p-0 relative w-full"
            style={{
              willChange: "transform",
            }}
          >
            <div className="flex flex-col justify-start flex-none shrink-0 h-auto w-auto relative whitespace-pre outline-none">
              <h4 className="text-[#fafafaeb] text-4xl tracking-tighter">
                Our App, Your Perfect Papers
              </h4>
            </div>
            <div className="flex flex-col flex-none flex-nowrap content-start items-start gap-2 h-min justify-start overflow-hidden p-0 relative w-full">
              {[
                "Smarter Exams, Less Effort",
                "Simplified Paper Creation Flow",
                "Teacher Satisfaction Guaranteed",
                "Save Time and Effort",
              ].map((label) => (
                <div
                  key={label}
                  className="flex flex-row flex-none flex-nowrap content-center items-center gap-2 h-min justify-start overflow-hidden p-0 relative w-full"
                >
                  <div className="flex-none h-6 w-6 relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 256 256"
                      focusable="false"
                      color="var(--token-78fe237d-cdda-442a-941c-79e916f3254d, rgba(250, 250, 250, 0.92))"
                      className="select-none w-full h-full inline-block shrink-0"
                      style={{
                        fill: "var(--token-78fe237d-cdda-442a-941c-79e916f3254d, rgba(250, 250, 250, 0.92))",
                        color:
                          "var(--token-78fe237d-cdda-442a-941c-79e916f3254d, rgba(250, 250, 250, 0.92))",
                      }}
                    >
                      <g color="var(--token-78fe237d-cdda-442a-941c-79e916f3254d, rgba(250, 250, 250, 0.92))">
                        <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                      </g>
                    </svg>
                  </div>
                  <div className="outline-none flex flex-col justify-start shrink-0 flex-none h-auto w-auto relative whitespace-pre">
                    <p className="text-[#fafafaeb] text-base">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div></div>
        </div>
        <div
          className="content-center items-center flex flex-none flex-col flex-nowrap gap-4 h-full justify-center overflow-visible px-12 py-0 relative w-1/2"
          style={{
            backgroundColor:
              "var(--token-175f1acf-30a6-43a4-bf57-5e85aa379048, #fafafa)",
          }}
        >
          <div className="flex flex-col flex-none flex-nowrap content-start items-start gap-8 h-min justify-start overflow-visible p-0 relative w-full">
            <header
              className="flex flex-col flex-none flex-nowrap content-start items-start gap-2 h-min justify-start overflow-visible p-0 relative w-full"
              style={{
                willChange: "transform",
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
              className="flex flex-col flex-none flex-nowrap items-start h-min justify-center overflow-visible p-0 relative w-full rounded-xl border border-solid backdrop-blur-[5px]"
              style={{
                backgroundColor:
                  "var(--token-00bcbd47-73ad-403c-8f57-cbb89c4cbe78, rgba(250,250,250,.82))",
                borderColor:
                  "var(--token-6f326015-829d-47cf-a20c-39c4de67590c, rgba(28,28,28,.12))",
                willChange: "transform",
              }}
            >
              <div className="flex flex-col items-center gap-3 h-min justify-center overflow-hidden py-4 px-4 relative w-full">
                <div className="w-full">
                  <form
                    method="POST"
                    className="w-full flex flex-col gap-3"
                    style={{
                      color:
                        "var(--token-78fe237d-cdda-442a-941c-79e916f3254d, rgb(250, 250, 250))",
                    }}
                  >
                    <div className="flex flex-col">
                      <label
                        className="mb-1 text-sm font-medium tracking-[0.03em]"
                        style={{
                          color:
                            "var(--token-34336198-31dd-4950-ac70-67552d075501, rgb(28, 28, 28))",
                        }}
                      >
                        First Name<span>*</span>
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        placeholder="First Name"
                        className="w-full outline-none p-3 rounded-lg text-sm shadow-[inset_0_0_0_1px_var(--token-6f326015-829d-47cf-a20c-39c4de67590c,rgba(28,28,28,0.08))]"
                        style={{
                          background:
                            "var(--token-eebcedd1-332e-46cf-8c65-2cec5140c2d1, rgba(243, 243, 243, 0.82))",
                          color:
                            "var(--token-34336198-31dd-4950-ac70-67552d075501, rgb(28, 28, 28))",
                          fontFamily:
                            'Montserrat, "Montserrat Placeholder", sans-serif',
                        }}
                      />
                    </div>

                    <div className="flex flex-col">
                      <label
                        className="mb-1 text-sm font-medium tracking-[0.03em]"
                        style={{
                          color:
                            "var(--token-34336198-31dd-4950-ac70-67552d075501, rgb(28, 28, 28))",
                        }}
                      >
                        Email<span>*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full outline-none p-3 rounded-lg text-sm shadow-[inset_0_0_0_1px_var(--token-6f326015-829d-47cf-a20c-39c4de67590c,rgba(28,28,28,0.08))]"
                        style={{
                          background:
                            "var(--token-eebcedd1-332e-46cf-8c65-2cec5140c2d1, rgba(243, 243, 243, 0.82))",
                          color:
                            "var(--token-34336198-31dd-4950-ac70-67552d075501, rgb(28, 28, 28))",
                          fontFamily:
                            'Montserrat, "Montserrat Placeholder", sans-serif',
                        }}
                      />
                    </div>

                    <div className="flex flex-col">
                      <label
                        className="mb-1 text-sm font-medium tracking-[0.03em]"
                        style={{
                          color:
                            "var(--token-34336198-31dd-4950-ac70-67552d075501, rgb(28, 28, 28))",
                        }}
                      >
                        Password<span>*</span>
                      </label>
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full outline-none p-3 rounded-lg text-sm shadow-[inset_0_0_0_1px_var(--token-6f326015-829d-47cf-a20c-39c4de67590c,rgba(28,28,28,0.08))]"
                        style={{
                          background:
                            "var(--token-eebcedd1-332e-46cf-8c65-2cec5140c2d1, rgba(243, 243, 243, 0.82))",
                          color:
                            "var(--token-34336198-31dd-4950-ac70-67552d075501, rgb(28, 28, 28))",
                          fontFamily:
                            'Montserrat, "Montserrat Placeholder", sans-serif',
                        }}
                      />
                    </div>

                    <input
                      type="submit"
                      value="Sign Up"
                      className="w-full p-3 rounded-full text-sm font-medium cursor-pointer"
                      style={{
                        background:
                          "var(--token-1bfc92b2-7a4b-45e2-a854-14ae137e253a, rgb(0, 0, 0))",
                        color:
                          "var(--token-78fe237d-cdda-442a-941c-79e916f3254d, rgb(250, 250, 250))",
                      }}
                    />
                  </form>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <p className="text-[#5e6b64] text-sm text-center">
                    Already have an account?
                  </p>
                  <p className="text-[#193625] text-sm underline text-center">
                    <a href="./signin">Sign In</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
      <div
        className="absolute top-0 right-0 bottom-0 w-1/2 flex-none overflow-hidden z-0"
        style={{
          backgroundColor:
            "var(--token-175f1acf-30a6-43a4-bf57-5e85aa379048, #fafafa)",
        }}
      ></div>
    </div>
  );
};

export default Register;
