import Link from "next/link";
import React from "react";

const Account = () => {
  return (
    <section className="relative flex flex-row flex-nowrap flex-[1_0_0] items-start content-start justify-center gap-14 w-px min-h-screen h-min rounded-2xl bg-white border border-[rgba(0,0,0,0.08)] overflow-hidden p-[56px_32px_32px] will-change-transform">
      <div className="relative flex flex-col flex-nowrap flex-[1_0_0] items-center content-center justify-start gap-14 w-px max-w-[1200px] h-min overflow-hidden p-0">
        <div className="relative flex flex-row flex-nowrap flex-none items-start content-start justify-between w-full h-min overflow-hidden p-0">
          <div className="relative flex flex-col justify-start flex-none shrink-0 w-auto h-auto whitespace-pre outline-none">
            <h4 className="text-2xl text-[#193625] tracking-tight">Account</h4>
          </div>
        </div>
        <div className="relative flex flex-col flex-nowrap flex-none items-end content-end justify-center gap-2.5 w-full h-min overflow-hidden p-0">
          <section className="relative flex flex-col flex-nowrap flex-none items-center content-center justify-center gap-12 w-full h-min overflow-hidden px-4 py-8">
            <div className="relative flex flex-row flex-nowrap flex-none items-center content-center justify-center gap-4 w-full max-w-[400px] h-min p-4 overflow-visible rounded-2xl bg-[#ffffff] border border-[#d9d9d9] shadow-[0_24px_64px_#26214a1a]">
              <div className="relative flex flex-col flex-nowrap flex-none items-center content-center justify-center gap-2.5 w-min h-min p-2 overflow-hidden rounded-lg bg-[#fff8f4] will-change-transform">
                <div className="flex-none w-8 h-8 relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                    color="var(--token-5c28b080-63a4-416d-b638-2f3867ab529e, rgb(255, 102, 37))"
                    className="w-full h-full"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
              <div className="relative flex flex-col flex-nowrap flex-[1_0_0] items-start content-start justify-center gap-0 w-px h-min overflow-hidden p-0">
                <div className="relative flex flex-col justify-start flex-none shrink-0 w-full h-auto whitespace-pre-wrap wrap-break-word outline-none">
                  <p className="text-base text-[#193625] tracking-tight">
                    Artless
                  </p>
                </div>
                <div className="relative flex flex-col justify-start flex-none shrink-0 w-full h-auto whitespace-pre-wrap wrap-break-word opacity-50 outline-none">
                  <p className="text-sm">artlessdenominater@gmail.com</p>
                </div>
              </div>
            </div>
            <div className="relative flex flex-col flex-nowrap flex-none items-center content-center justify-center gap-4 w-full max-w-[400px] h-min overflow-hidden p-0">
              <div className="relative flex flex-col justify-start flex-none shrink-0 w-full h-auto whitespace-pre-wrap wrap-break-word outline-none">
                <p className="text-base text-[#193625] tracking-tight">
                  Account info
                </p>
              </div>
              <div className="flex-none w-full h-auto relative">
                <div className="relative w-full h-full flex justify-center items-center">
                  <form
                    method="POST"
                    className="relative flex flex-col w-full h-auto gap-4"
                  >
                    <div className="flex flex-col">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                        value="artlessdenominater@gmail.com"
                        className="w-full h-auto p-4 rounded-lg text-[16px] leading-[1em] outline-none border-none appearance-none bg-white shadow-[inset_0_0_0_1px_rgba(25,26,32,0.2)]"
                      />
                    </div>
                    <div className="flex flex-col">
                      <input
                        type="text"
                        name="first_name"
                        placeholder="First Name"
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                        value="Artless"
                        className="w-full h-auto p-4 rounded-lg text-[16px] leading-[1em] outline-none border-none appearance-none bg-white shadow-[inset_0_0_0_1px_rgba(25,26,32,0.2)]"
                      />
                    </div>
                    <div className="flex flex-col">
                      <input
                        type="text"
                        name="last_name"
                        placeholder="Last Name"
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                        value="Denominater"
                        className="w-full h-auto p-4 rounded-lg text-[16px] leading-[1em] outline-none border-none appearance-none bg-white shadow-[inset_0_0_0_1px_rgba(25,26,32,0.2)]"
                      />
                    </div>
                    <div>
                      <div className="block justify-end relative">
                        <div className="relative block">
                          <input
                            type="submit"
                            value="Save Changes"
                            className="appearance-none w-full h-full outline-none border-none cursor-pointer p-4 rounded-lg text-[16px] leading-[1em] font-normal bg-[rgb(25,26,32)] text-[rgb(245,245,245)] relative z-1"
                          />
                        </div>
                      </div>
                      <div
                        style={{
                          opacity: 0,
                          height: 0,
                          transform: "scale(0)",
                          willChange: "transform",
                        }}
                      >
                        <div style={{ paddingTop: 16 }}>
                          <div
                            style={{
                              padding: "1rem",
                              color: "rgb(255, 255, 255)",
                              fontSize: 16,
                              backgroundColor: "rgb(0, 200, 83)",
                              borderRadius: 8,
                            }}
                          ></div>
                        </div>
                      </div>
                      <div
                        style={{
                          opacity: 0,
                          height: 0,
                          transform: "scale(0)",
                          willChange: "transform",
                        }}
                      >
                        <div style={{ paddingTop: 16 }}>
                          <div
                            style={{
                              padding: "1rem",
                              color: "rgb(255, 255, 255)",
                              fontSize: 16,
                              backgroundColor: "rgb(224, 36, 36)",
                              borderRadius: 8,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="relative flex flex-col flex-nowrap flex-none items-center content-center justify-center gap-4 w-full max-w-[400px] h-min overflow-hidden pt-12 border-t border-[#d9d9d9]">
              <div className="relative flex flex-col justify-start flex-none shrink-0 w-full h-auto whitespace-pre-wrap wrap-break-word outline-none">
                <p className="text-base text-[#193625] tracking-tight">
                  Change password
                </p>
              </div>
              <div className="flex-none w-full h-auto relative">
                <div
                  style={{
                    width: "100%",
                    position: "relative",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <form
                    method="POST"
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "flex",
                      position: "relative",
                      flexDirection: "column",
                      color:
                        "var(--token-8162f168-ed62-49f3-b338-425fedfa1e6f, rgb(245, 245, 245))",
                      gap: 16,
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck="false"
                        value=""
                        style={{
                          appearance: "none",
                          width: "100%",
                          height: "auto",
                          outline: "none",
                          border: "none",
                          padding: 16,
                          borderRadius: 8,
                          fontSize: 16,
                          fontFamily:
                            'Lexend, "Lexend Placeholder", sans-serif',
                          fontStyle: "normal",
                          fontWeight: 400,
                          letterSpacing: 0,
                          lineHeight: "1em",
                          background: "rgb(255, 255, 255)",
                          color:
                            "var(--token-3991cae2-fa00-4648-803b-711c24c1718d, rgb(25, 26, 32))",
                          boxShadow:
                            "rgba(25, 26, 32, 0.2) 0px 0px 0px 1px inset",
                        }}
                      />
                    </div>
                    <div>
                      <div
                        style={{
                          display: "block",
                          justifyContent: "flex-end",
                          position: "relative",
                        }}
                      >
                        <div style={{ position: "relative", display: "block" }}>
                          <input
                            type="submit"
                            value="Send Reset Email"
                            style={{
                              appearance: "none",
                              width: "100%",
                              height: "100%",
                              outline: "none",
                              border: "none",
                              cursor: "pointer",
                              padding: 16,
                              borderRadius: 8,
                              fontSize: 16,
                              fontFamily:
                                'Lexend, "Lexend Placeholder", sans-serif',
                              fontStyle: "normal",
                              fontWeight: 400,
                              letterSpacing: 0,
                              lineHeight: "1em",
                              background:
                                "var(--token-3991cae2-fa00-4648-803b-711c24c1718d, rgb(25, 26, 32))",
                              color:
                                "var(--token-8162f168-ed62-49f3-b338-425fedfa1e6f, rgb(245, 245, 245))",
                              zIndex: 1,
                            }}
                          />
                        </div>
                      </div>
                      <div
                        style={{
                          opacity: 0,
                          height: 0,
                          transform: "scale(0)",
                          willChange: "transform",
                        }}
                      >
                        <div style={{ paddingTop: 16 }}>
                          <div
                            style={{
                              padding: "1rem",
                              color: "rgb(255, 255, 255)",
                              fontSize: 16,
                              backgroundColor: "rgb(0, 200, 83)",
                              borderRadius: 8,
                            }}
                          ></div>
                        </div>
                      </div>
                      <div
                        style={{
                          opacity: 0,
                          height: 0,
                          transform: "scale(0)",
                          willChange: "transform",
                        }}
                      >
                        <div style={{ paddingTop: 16 }}>
                          <div
                            style={{
                              padding: "1rem",
                              color: "rgb(255, 255, 255)",
                              fontSize: 16,
                              backgroundColor: "rgb(224, 36, 36)",
                              borderRadius: 8,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
          <div className="relative flex flex-row flex-nowrap flex-none items-center content-center justify-center gap-0 w-full h-min overflow-visible p-0 rounded-xl bg-white">
            <div className="flex-none w-auto h-auto relative">
              <Link
                href="./logout"
                className="relative flex flex-row flex-nowrap items-center content-center justify-center gap-2 cursor-pointer w-min h-min overflow-hidden px-3 py-2 no-underline rounded-sm bg-[rgb(245,223,223)] opacity-100 will-change-transform"
              >
                <div className="relative flex flex-col justify-start flex-none shrink-0 w-auto h-auto whitespace-pre outline-none opacity-100">
                  <p className="text-sm text-[#a60303] tracking-tight">
                    Log Out
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex-none h-auto relative w-full">
          <div className="flex place-content-center items-center flex-col gap-2.5 h-min overflow-hidden p-0 relative w-full">
            <div className="flex place-content-center justify-between items-center flex-none flex-row h-min max-w-[1200px] overflow-visible p-0 relative w-full">
              <div className="relative w-auto h-auto">
                <Link
                  aria-label="Logo"
                  className="flex flex-row place-content-center items-center gap-2 w-min h-min p-0 no-underline relative overflow-hidden"
                  href="./#hero"
                >
                  <div className="relative w-7 h-7">
                    {/* svg */}
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
                  <div className="relative w-auto h-auto text-[#193625]">
                    <p className="text-[#193625] text-2xl">Sylabus</p>
                  </div>
                </Link>
              </div>
              <div className="flex place-content-center items-center flex-none flex-row gap-3 h-min overflow-hidden p-0 relative w-min">
                <div className="flex-none h-auto relative whitespace-pre w-auto outline-none flex flex-col justify-start shrink-0 opacity-100">
                  <p className="text-xs text-[#193625]">
                    <Link
                      className="text-xs text-[#193625]"
                      href="./privacy-policy"
                    >
                      Privacy Policy
                    </Link>
                  </p>
                </div>
                <div className="flex-none h-auto relative whitespace-pre w-auto outline-none flex flex-col justify-start shrink-0 opacity-100">
                  <p className="text-xs text-[#193625]">
                    <Link
                      className="text-xs text-[#193625]"
                      href="./terms-of-service"
                    >
                      Terms of Service{" "}
                    </Link>
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

export default Account;
