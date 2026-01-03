"use client";
import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import Link from "next/link";
import React, { useState, useRef, useEffect, useTransition } from "react";
import { auth } from "../../firebase";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
    confirmationResult?: ConfirmationResult;
  }
}

const Login = () => {
  const router = useRouter();

  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState("");
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const [resendCountdown, setResendCountdown] = useState(0);
  const [isPending, startTransition] = useTransition();

  const formattedPhone = phoneNumber.startsWith("+91")
    ? phoneNumber
    : `+91${phoneNumber}`;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCountdown > 0) {
      timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCountdown]);

  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        { size: "invisible" }
      );
    }

    return () => {
      window.recaptchaVerifier?.clear();
      window.recaptchaVerifier = undefined;
    };
  }, []);

  const handleSendOtp = (e: React.FormEvent) => {
    e?.preventDefault();

    setResendCountdown(60);

    startTransition(async () => {
      setError("");

      if (!window.recaptchaVerifier) {
        setError("Recaptcha not ready");
        return;
      }

      try {
        const result = await signInWithPhoneNumber(
          auth,
          formattedPhone,
          window.recaptchaVerifier
        );

        setConfirmationResult(result);
        setSuccess("OTP sent successfully.");
        setStep("otp");
      } catch (err: any) {
        console.error(err);
        setResendCountdown(0);

        setError(err.code || "Failed to send OTP");
      }
    });
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e?.preventDefault();
    startTransition(async () => {
      setError("");

      if (!confirmationResult) {
        setError("Please request OTP first.");
        return;
      }

      try {
        const cred = await confirmationResult.confirm(otp);
        const firebaseUser = cred.user;

        const res = await fetch("/api/auth/post-login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firebaseUid: firebaseUser.uid,
            phone: firebaseUser.phoneNumber,
          }),
        });

        const data = await res.json();

        if (data.isNewUser) {
          router.replace("/complete-profile");
        } else {
          router.replace("/dashboard");
        }
      } catch (error) {
        console.log(error);

        setError("Failed to verify OTP. Please check the OTP.");
      }
    });
    console.log({ formattedPhone, otp });
  };

  const loadingIndicator = (
    <div role="status" className="flex justify-center items-center w-full">
      <svg
        aria-hidden="true"
        className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );

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
              <div className="flex flex-row flex-nowrap content-center items-center gap-3 h-min justify-center p-0 relative no-underline w-[95%]">
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
                <div className="relative w-auto h-auto text-[#ffffff]">
                  <p className="text-[#ffffff] text-4xl">Sylabus</p>
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
          <div className="flex flex-col flex-none flex-nowrap content-start items-start gap-4 h-min justify-start overflow-visible p-0 relative w-full">
            <header className="flex flex-col flex-none flex-nowrap content-start items-center gap-2 h-min justify-start overflow-visible p-0 relative w-full">
              <div className="outline-none flex flex-col justify-center shrink-0 flex-none h-auto w-auto relative">
                <h1 className="text-[32px] md:text-[42px] text-[#193625] tracking-tighter text-center">
                  {step === "phone" && "Login to Your Account"}
                  {step === "otp" && "Verify OTP to Login"}
                </h1>
              </div>
              <div className="outline-none flex flex-col justify-center shrink-0 flex-none h-auto w-auto relative">
                <h1 className="text-base text-[#5e6b64] tracking-tighter text-center">
                  {step === "phone" &&
                    "Welcome back, Please enter your credentials."}
                  {step === "otp" && (
                    <>
                      <span>
                        Enter a 6 digit code send to this phone number
                      </span>{" "}
                      <br />{" "}
                      <span className="font-semibold">+91 {phoneNumber}</span>{" "}
                      <button
                        type="button"
                        onClick={() => setStep("phone")}
                        className="pl-1 text-sm text-blue-500 font-semibold cursor-pointer hover:underline"
                      >
                        change
                      </button>
                    </>
                  )}
                </h1>
              </div>
            </header>
            {/* RIGHT PANEL */}
            <div className="w-full flex items-center justify-center">
              <div className="w-full p-8 ">
                {/* HEADER */}
                {/* <div className="mb-6 text-center">
                  <h1 className="text-2xl font-semibold text-[#193625]">
                    Welcome to Sylabus
                  </h1>
                  <p className="text-sm text-gray-500">
                    Login using your phone number
                  </p>
                </div> */}

                {/* PHONE STEP */}
                {step === "phone" && (
                  <form onSubmit={handleSendOtp} className="space-y-4">
                    <div className="flex flex-col gap-2">
                      {/* <label className="text-sm font-medium text-gray-700">
                        Mobile Number
                      </label> */}
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value="+91"
                          disabled
                          className="w-14 p-2.5 rounded-xl border border-slate-300 bg-slate-100 text-sm"
                        />
                        <input
                          type="tel"
                          placeholder="Phone number"
                          value={phoneNumber}
                          onChange={(e: any) => setPhoneNumber(e.target.value)}
                          className="flex-1 p-2.5 rounded-xl border border-slate-300 focus:border-[#13261b] focus:ring-2 focus:ring-[#13261b]/20 text-sm bg-white outline-none w-full"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="relative w-full h-10 rounded-xl bg-linear-to-b from-[#3a3a3a] via-[#111111] to-[#000000] text-white text-sm font-medium tracking-wide shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_6px_rgba(0,0,0,0.6)] hover:brightness-110 active:scale-[0.98] transition flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Send OTP
                    </button>
                  </form>
                )}

                {/* OTP STEP */}
                {step === "otp" && (
                  <form onSubmit={handleVerifyOtp} className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex flex-col gap-2">
                        <OtpInput value={otp} onChange={setOtp} />
                      </div>
                      <button
                        type="submit"
                        className="relative w-full h-10 rounded-xl bg-linear-to-b from-[#3a3a3a] via-[#111111] to-[#000000] text-white text-sm font-medium tracking-wide shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_6px_rgba(0,0,0,0.6)] hover:brightness-110 active:scale-[0.98] transition flex items-center justify-center gap-2 cursor-pointer"
                      >
                        Verify & Continue
                      </button>
                    </div>
                  </form>
                )}

                {/* DIVIDER */}
                <div className="flex items-center my-6 gap-3">
                  <div className="flex-1 h-px bg-slate-500" />
                  <span className="text-xs font-semibold text-slate-500">
                    OR
                  </span>
                  <div className="flex-1 h-px bg-slate-500" />
                </div>

                {/* GOOGLE LOGIN */}
                <button
                  type="button"
                  className="relative w-full h-10 rounded-xl bg-linear-to-b from-[#ffffff] via-[#f3f3f3] to-[#e5e5e5] text-[#1c1c1c] text-sm font-medium tracking-wide border border-slate-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_2px_6px_rgba(0,0,0,0.15)] active:scale-[0.98] transition flex items-center justify-center gap-2 cursor-pointer"
                  onClick={() => {
                    // 🔐 Google login handler
                    console.log("Google login");
                  }}
                >
                  <svg
                    version="1.1"
                    viewBox="0 0 268.1522 273.8827"
                    overflow="hidden"
                    xmlSpace="preserve"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                  >
                    <defs>
                      <linearGradient id="a">
                        <stop offset={0} stopColor="#0fbc5c" />
                        <stop offset={1} stopColor="#0cba65" />
                      </linearGradient>
                      <linearGradient id="g">
                        <stop offset=".2312727" stopColor="#0fbc5f" />
                        <stop offset=".3115468" stopColor="#0fbc5f" />
                        <stop offset=".3660131" stopColor="#0fbc5e" />
                        <stop offset=".4575163" stopColor="#0fbc5d" />
                        <stop offset=".540305" stopColor="#12bc58" />
                        <stop offset=".6993464" stopColor="#28bf3c" />
                        <stop offset=".7712418" stopColor="#38c02b" />
                        <stop offset=".8605665" stopColor="#52c218" />
                        <stop offset=".9150327" stopColor="#67c30f" />
                        <stop offset={1} stopColor="#86c504" />
                      </linearGradient>
                      <linearGradient id="h">
                        <stop offset=".1416122" stopColor="#1abd4d" />
                        <stop offset=".2475151" stopColor="#6ec30d" />
                        <stop offset=".3115468" stopColor="#8ac502" />
                        <stop offset=".3660131" stopColor="#a2c600" />
                        <stop offset=".4456735" stopColor="#c8c903" />
                        <stop offset=".540305" stopColor="#ebcb03" />
                        <stop offset=".6156363" stopColor="#f7cd07" />
                        <stop offset=".6993454" stopColor="#fdcd04" />
                        <stop offset=".7712418" stopColor="#fdce05" />
                        <stop offset=".8605661" stopColor="#ffce0a" />
                      </linearGradient>
                      <linearGradient id="f">
                        <stop offset=".3159041" stopColor="#ff4c3c" />
                        <stop offset=".6038179" stopColor="#ff692c" />
                        <stop offset=".7268366" stopColor="#ff7825" />
                        <stop offset=".884534" stopColor="#ff8d1b" />
                        <stop offset={1} stopColor="#ff9f13" />
                      </linearGradient>
                      <linearGradient id="b">
                        <stop offset=".2312727" stopColor="#ff4541" />
                        <stop offset=".3115468" stopColor="#ff4540" />
                        <stop offset=".4575163" stopColor="#ff4640" />
                        <stop offset=".540305" stopColor="#ff473f" />
                        <stop offset=".6993464" stopColor="#ff5138" />
                        <stop offset=".7712418" stopColor="#ff5b33" />
                        <stop offset=".8605665" stopColor="#ff6c29" />
                        <stop offset={1} stopColor="#ff8c18" />
                      </linearGradient>
                      <linearGradient id="d">
                        <stop offset=".4084578" stopColor="#fb4e5a" />
                        <stop offset={1} stopColor="#ff4540" />
                      </linearGradient>
                      <linearGradient id="c">
                        <stop offset=".1315461" stopColor="#0cba65" />
                        <stop offset=".2097843" stopColor="#0bb86d" />
                        <stop offset=".2972969" stopColor="#09b479" />
                        <stop offset=".3962575" stopColor="#08ad93" />
                        <stop offset=".4771242" stopColor="#0aa6a9" />
                        <stop offset=".5684245" stopColor="#0d9cc6" />
                        <stop offset=".667385" stopColor="#1893dd" />
                        <stop offset=".7687273" stopColor="#258bf1" />
                        <stop offset=".8585063" stopColor="#3086ff" />
                      </linearGradient>
                      <linearGradient id="e">
                        <stop offset=".3660131" stopColor="#ff4e3a" />
                        <stop offset=".4575163" stopColor="#ff8a1b" />
                        <stop offset=".540305" stopColor="#ffa312" />
                        <stop offset=".6156363" stopColor="#ffb60c" />
                        <stop offset=".7712418" stopColor="#ffcd0a" />
                        <stop offset=".8605665" stopColor="#fecf0a" />
                        <stop offset=".9150327" stopColor="#fecf08" />
                        <stop offset={1} stopColor="#fdcd01" />
                      </linearGradient>
                      <linearGradient
                        xlinkHref="#a"
                        id="s"
                        x1="219.6997"
                        y1="329.5351"
                        x2="254.4673"
                        y2="329.5351"
                        gradientUnits="userSpaceOnUse"
                      />
                      <radialGradient
                        xlinkHref="#b"
                        id="m"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="matrix(-1.936885,1.043001,1.455731,2.555422,290.5254,-400.6338)"
                        cx="109.6267"
                        cy="135.8619"
                        fx="109.6267"
                        fy="135.8619"
                        r="71.46001"
                      />
                      <radialGradient
                        xlinkHref="#c"
                        id="n"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="matrix(-3.512595,-4.45809,-1.692547,1.260616,870.8006,191.554)"
                        cx="45.25866"
                        cy="279.2738"
                        fx="45.25866"
                        fy="279.2738"
                        r="71.46001"
                      />
                      <radialGradient
                        xlinkHref="#d"
                        id="l"
                        cx="304.0166"
                        cy="118.0089"
                        fx="304.0166"
                        fy="118.0089"
                        r="47.85445"
                        gradientTransform="matrix(2.064353,-4.926832e-6,-2.901531e-6,2.592041,-297.6788,-151.7469)"
                        gradientUnits="userSpaceOnUse"
                      />
                      <radialGradient
                        xlinkHref="#e"
                        id="o"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="matrix(-0.2485783,2.083138,2.962486,0.3341668,-255.1463,-331.1636)"
                        cx="181.001"
                        cy="177.2013"
                        fx="181.001"
                        fy="177.2013"
                        r="71.46001"
                      />
                      <radialGradient
                        xlinkHref="#f"
                        id="p"
                        cx="207.6733"
                        cy="108.0972"
                        fx="207.6733"
                        fy="108.0972"
                        r="41.1025"
                        gradientTransform="matrix(-1.249206,1.343263,-3.896837,-3.425693,880.5011,194.9051)"
                        gradientUnits="userSpaceOnUse"
                      />
                      <radialGradient
                        xlinkHref="#g"
                        id="r"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="matrix(-1.936885,-1.043001,1.455731,-2.555422,290.5254,838.6834)"
                        cx="109.6267"
                        cy="135.8619"
                        fx="109.6267"
                        fy="135.8619"
                        r="71.46001"
                      />
                      <radialGradient
                        xlinkHref="#h"
                        id="j"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="matrix(-0.081402,-1.93722,2.926737,-0.1162508,-215.1345,632.8606)"
                        cx="154.8697"
                        cy="145.9691"
                        fx="154.8697"
                        fy="145.9691"
                        r="71.46001"
                      />
                      <filter
                        id="q"
                        x="-.04842873"
                        y="-.0582241"
                        width="1.096857"
                        height="1.116448"
                        colorInterpolationFilters="sRGB"
                      >
                        <feGaussianBlur stdDeviation="1.700914" />
                      </filter>
                      <filter
                        id="k"
                        x="-.01670084"
                        y="-.01009856"
                        width="1.033402"
                        height="1.020197"
                        colorInterpolationFilters="sRGB"
                      >
                        <feGaussianBlur stdDeviation=".2419367" />
                      </filter>
                      <clipPath clipPathUnits="userSpaceOnUse" id="i">
                        <path
                          d="M371.3784 193.2406H237.0825v53.4375h77.167c-1.2405 7.5627-4.0259 15.0024-8.1049 21.7862-4.6734 7.7723-10.4511 13.6895-16.373 18.1957-17.7389 13.4983-38.42 16.2584-52.7828 16.2584-36.2824 0-67.2833-23.2865-79.2844-54.9287-.4843-1.1482-.8059-2.3344-1.1975-3.5068-2.652-8.0533-4.101-16.5825-4.101-25.4474 0-9.226 1.5691-18.0575 4.4301-26.3985 11.2851-32.8967 42.9849-57.4674 80.1789-57.4674 7.4811 0 14.6854.8843 21.5173 2.6481 15.6135 4.0309 26.6578 11.9698 33.4252 18.2494l40.834-39.7111c-24.839-22.616-57.2194-36.3201-95.8444-36.3201-30.8782-.00066-59.3863 9.55308-82.7477 25.6992-18.9454 13.0941-34.4833 30.6254-44.9695 50.9861-9.75366 18.8785-15.09441 39.7994-15.09441 62.2934 0 22.495 5.34891 43.6334 15.10261 62.3374v.126c10.3023 19.8567 25.3678 36.9537 43.6783 49.9878 15.9962 11.3866 44.6789 26.5516 84.0307 26.5516 22.6301 0 42.6867-4.0517 60.3748-11.6447 12.76-5.4775 24.0655-12.6217 34.3012-21.8036 13.5247-12.1323 24.1168-27.1388 31.3465-44.4041 7.2297-17.2654 11.097-36.7895 11.097-57.957 0-9.858-.9971-19.8694-2.6881-28.9684Z"
                          fill="#000"
                        />
                      </clipPath>
                    </defs>
                    <g transform="matrix(0.957922,0,0,0.985255,-90.17436,-78.85577)">
                      <g clipPath="url(#i)">
                        <path
                          d="M92.07563 219.9585c.14844 22.14 6.5014 44.983 16.11767 63.4234v.1269c6.9482 13.3919 16.4444 23.9704 27.2604 34.4518l65.326-23.67c-12.3593-6.2344-14.2452-10.0546-23.1048-17.0253-9.0537-9.0658-15.8015-19.4735-20.0038-31.677h-.1693l.1693-.1269c-2.7646-8.0587-3.0373-16.6129-3.1393-25.5029Z"
                          fill="url(#j)"
                          filter="url(#k)"
                        />
                        <path
                          d="M237.0835 79.02491c-6.4568 22.52569-3.988 44.42139 0 57.16129 7.4561.0055 14.6388.8881 21.4494 2.6464 15.6135 4.0309 26.6566 11.97 33.424 18.2496l41.8794-40.7256c-24.8094-22.58904-54.6663-37.2961-96.7528-37.33169Z"
                          fill="url(#l)"
                          filter="url(#k)"
                        />
                        <path
                          d="M236.9434 78.84678c-31.6709-.00068-60.9107 9.79833-84.8718 26.35902-8.8968 6.149-17.0612 13.2521-24.3311 21.1509-1.9045 17.7429 14.2569 39.5507 46.2615 39.3702 15.5284-17.9373 38.4946-29.5427 64.0561-29.5427.0233 0 .046.0019.0693.002l-1.0439-57.33536c-.0472-.00003-.0929-.00406-.1401-.00406Z"
                          fill="url(#m)"
                          filter="url(#k)"
                        />
                        <path
                          d="m341.4751 226.3788-28.2685 19.2848c-1.2405 7.5627-4.0278 15.0023-8.1068 21.7861-4.6734 7.7723-10.4506 13.6898-16.3725 18.196-17.7022 13.4704-38.3286 16.2439-52.6877 16.2553-14.8415 25.1018-17.4435 37.6749 1.0439 57.9342 22.8762-.0167 43.157-4.1174 61.0458-11.7965 12.9312-5.551 24.3879-12.7913 34.7609-22.0964 13.7061-12.295 24.4421-27.5034 31.7688-45.0003 7.3267-17.497 11.2446-37.2822 11.2446-58.7336Z"
                          fill="url(#n)"
                          filter="url(#k)"
                        />
                        <path
                          d="M234.9956 191.2104v57.4981h136.0062c1.1962-7.8745 5.1523-18.0644 5.1523-26.5001 0-9.858-.9963-21.899-2.6873-30.998Z"
                          fill="#3086ff"
                          filter="url(#k)"
                        />
                        <path
                          d="M128.3894 124.3268c-8.393 9.1191-15.5632 19.326-21.2483 30.3646-9.75351 18.8785-15.09402 41.8295-15.09402 64.3235 0 .317.02642.6271.02855.9436 4.31953 8.2244 59.66647 6.6495 62.45617 0-.0035-.3103-.0387-.6128-.0387-.9238 0-9.226 1.5696-16.0262 4.4306-24.3672 3.5294-10.2885 9.0557-19.7628 16.1223-27.9257 1.6019-2.0309 5.8748-6.3969 7.1214-9.0157.4749-.9975-.8621-1.5574-.9369-1.9085-.0836-.3927-1.8762-.0769-2.2778-.3694-1.2751-.9288-3.8001-1.4138-5.3334-1.8449-3.2772-.9215-8.7085-2.9536-11.7252-5.0601-9.5357-6.6586-24.417-14.6122-33.5047-24.2164Z"
                          fill="url(#o)"
                          filter="url(#k)"
                        />
                        <path
                          d="M162.0989 155.8569c22.1123 13.3013 28.4714-6.7139 43.173-12.9771L179.698 90.21568c-9.4075 3.92642-18.2957 8.80465-26.5426 14.50442-12.316 8.5122-23.192 18.8995-32.1763 30.7204Z"
                          fill="url(#p)"
                          filter="url(#q)"
                        />
                        <path
                          d="M171.0987 290.222c-29.6829 10.6413-34.3299 11.023-37.0622 29.2903 5.2213 5.0597 10.8312 9.74 16.7926 13.9835 15.9962 11.3867 46.766 26.5517 86.1178 26.5517.0462 0 .0904-.004.1366-.004v-59.1574c-.0298.0001-.064.002-.0938.002-14.7359 0-26.5113-3.8435-38.5848-10.5273-2.9768-1.6479-8.3775 2.7772-11.1229.799-3.7865-2.7284-12.8991 2.3508-16.1833-.9378Z"
                          fill="url(#r)"
                          filter="url(#k)"
                        />
                        <path
                          d="M219.6997 299.0227v59.9959c5.506.6402 11.2361 1.0289 17.2472 1.0289 6.0259 0 11.8556-.3073 17.5204-.8723v-59.7481c-6.3482 1.0777-12.3272 1.461-17.4776 1.461-5.9318 0-11.7005-.6858-17.29-1.8654Z"
                          opacity=".5"
                          fill="url(#s)"
                          filter="url(#k)"
                        />
                      </g>
                    </g>
                  </svg>
                  <span className="pl-1">Continue with Google</span>
                </button>
              </div>
            </div>

            <div className="p-2 text-center flex w-full justify-center items-center">
              {error && <p className="text-red-500">{error}</p>}
              {success && <p className="text-green-500">{success}</p>}
            </div>

            <div id="recaptcha-container" />

            {isPending && loadingIndicator}
          </div>
        </div>
      </article>
    </div>
  );
};

export default Login;

type Props = {
  value: string;
  onChange: (otp: string) => void;
};

const OtpInput: React.FC<Props> = ({ value, onChange }) => {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (index: number, val: string) => {
    if (!/^\d?$/.test(val)) return;

    const otpArray = value.split("");
    otpArray[index] = val;
    const newOtp = otpArray.join("").padEnd(6, "");
    onChange(newOtp);

    if (val && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex gap-2 justify-center items-center">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <React.Fragment key={i}>
          <input
            ref={(el) => {
              inputsRef.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={value[i] || ""}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className="h-12 w-12 rounded-xl border-2 border-slate-300 text-center text-lg font-semibold outline-none focus:border-[#13261b] focus:ring-2 focus:ring-[#13261b]/20"
          />

          {/* Dot separator after 3rd box */}
          {i === 2 && <span className="mx-1 text-2xl select-none">•</span>}
        </React.Fragment>
      ))}
    </div>
  );
};
