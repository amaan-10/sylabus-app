"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/institute/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) router.push("/institute/dashboard");
    else alert("Invalid credentials");
  };

  return (
    <div className="flex flex-col flex-nowrap items-center content-center justify-start gap-0 h-min min-h-screen overflow-hidden p-0 relative w-auto font-poppins">
      <article className="flex content-center items-center flex-none flex-row flex-nowrap gap-0 justify-end min-h-screen overflow-hidden p-0 relative w-full z-1">
        <div className="hidden lg:flex flex-none flex-col flex-nowrap content-start items-start h-full justify-between overflow-hidden min-h-screen px-12 py-[62px] relative w-1/2 bg-[#13261b]">
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
          <div className="flex flex-col gap-14">
            <div className="flex-none h-auto w-auto relative">
              <div className="flex flex-row flex-nowrap content-center gap-3 h-min justify-center p-0 relative no-underline w-[95%]">
                <div
                  className="h-10 w-10 shrink-0 opacity-100 flex-none relative"
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
                      className="select-none w-full h-full inline-block shrink-0"
                    >
                      <g
                        transform="translate(0,100) scale(0.1,-0.1)"
                        fill="#fff"
                        stroke="none"
                      >
                        <path d="M626 894 l-49 -75 121 -122 121 -121 75 50 75 50 -147 147 -147 146 -49 -75z" />
                        <path d="M509 743 c-50 -26 -135 -43 -215 -43 l-50 0 -23 -97 c-13 -54 -52 -186 -87 -294 -35 -108 -64 -201 -64 -205 0 -5 81 72 180 171 113 112 178 185 175 194 -9 24 23 61 53 61 35 0 52 -16 52 -50 0 -33 -17 -50 -50 -50 -19 0 -66 -40 -205 -180 -99 -99 -176 -180 -171 -180 4 0 96 29 204 63 109 35 241 75 295 87 l97 24 0 50 c0 80 18 166 45 221 l25 50 -103 103 c-56 56 -104 101 -107 101 -3 -1 -26 -13 -51 -26z" />
                      </g>
                    </svg>
                  </div>
                </div>
                <div className="relative w-auto h-auto text-[#ffffff] flex flex-col gap-1">
                  <p className="text-[#ffffff] text-4xl">Sylabus</p>
                  <Image
                    src="/icon/for-institutes.png"
                    alt="for-institutes"
                    width={115}
                    height={115}
                    className="self-end"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col flex-none flex-nowrap content-start items-start gap-4 h-min justify-start overflow-hidden p-0 relative w-full">
              <div className="flex flex-col justify-start flex-none shrink-0 h-auto w-auto relative outline-none">
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
                    <div className="outline-none flex flex-col justify-start shrink-0 flex-none h-auto w-auto relative">
                      <p className="text-[#fafafaeb] text-base">{label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div></div>
        </div>
        <div className="content-center items-center flex flex-none flex-col flex-nowrap gap-4 h-full justify-center overflow-visible px-4 md:px-8 lg:px-12 py-0 relative w-full lg:w-1/2 bg-[#ffffff]">
          <div className="flex flex-col flex-none gap-4 flex-nowrap content-start items-start h-min justify-start overflow-visible p-0 relative w-full">
            <header className="flex flex-col flex-none flex-nowrap content-start items-center h-min justify-start overflow-visible p-0 relative w-full">
              <div className="outline-none flex flex-col justify-center shrink-0 flex-none h-auto w-auto relative">
                <h1 className="text-[32px] md:text-[42px] text-[#193625] tracking-tighter text-center">
                  Welcome Back
                </h1>
              </div>
              <div className="outline-none flex flex-col justify-center shrink-0 flex-none h-auto w-auto relative">
                <h1 className="text-base text-[#5e6b64] tracking-tighter text-center">
                  Sign in to continue.
                </h1>
              </div>
            </header>
            {/* RIGHT PANEL */}
            <div className="w-full flex items-center justify-center">
              <div className="w-full px-8 py-6 ">
                <form className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <div className="space-y-4">
                      <Input
                        label="Email"
                        placeholder="you@college.edu"
                        onChange={setEmail}
                      />
                      <Input
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                        onChange={setPassword}
                      />
                    </div>
                    <button
                      onClick={(e) => submit(e)}
                      className="relative w-full h-10 mt-2 rounded-xl bg-linear-to-b from-[#3a3a3a] via-[#111111] to-[#000000] text-white text-sm font-medium tracking-wide shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_6px_rgba(0,0,0,0.6)] hover:brightness-110 active:scale-[0.98] transition flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Login
                    </button>
                  </div>
                </form>
                <p className="mt-6 text-center text-sm text-slate-500">
                  Don't have an account?{" "}
                  <a
                    href="/institute/register"
                    className="text-black font-medium hover:underline"
                  >
                    Create one
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

function Input({
  label,
  placeholder,
  type = "text",
  onChange,
}: {
  label: string;
  placeholder: string;
  type?: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-600 mb-1">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full h-12 px-4 rounded-xl
          border border-slate-200
          bg-slate-50
          text-slate-900
          placeholder:text-slate-400
          focus:outline-none
          focus:ring-2 focus:ring-black/10
          focus:border-black
          transition
        "
      />
    </div>
  );
}
