/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import React, {
  FormEvent,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../firebase";

declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
    confirmationResult?: ConfirmationResult;
  }
}

function OtpLogin() {
  const router = useRouter();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState("");
  const [resendCountdown, setResendCountdown] = useState(0);

  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);

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

  const verifyOtp = async () => {
    startTransition(async () => {
      setError("");

      if (!confirmationResult) {
        setError("Please request OTP first.");
        return;
      }

      try {
        await confirmationResult?.confirm(otp);
        router.replace("/");
      } catch (error) {
        console.log(error);

        setError("Failed to verify OTP. Please check the OTP.");
      }
    });
  };

  useEffect(() => {
    const hasEnteredAllDigits = otp.length === 6;
    if (hasEnteredAllDigits) {
      verifyOtp();
    }
  }, [otp]);

  const requestOtp = async (e?: FormEvent<HTMLFormElement>) => {
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
      } catch (err: any) {
        console.error(err);
        setResendCountdown(0);

        setError(err.code || "Failed to send OTP");
      }
    });
  };

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, val: string) => {
    if (!/^\d?$/.test(val)) return;

    const otpArray = otp.split("");
    otpArray[index] = val;
    const newOtp = otpArray.join("").padEnd(6, "");
    setOtp(newOtp);

    if (val && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const loadingIndicator = (
    <div role="status" className="flex justify-center">
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
    <div className="flex flex-col justify-center items-center">
      {!confirmationResult && (
        <form onSubmit={requestOtp}>
          <input
            className="flex-1 p-2.5 rounded-xl border border-slate-300 focus:border-[#13261b] focus:ring-2 focus:ring-[#13261b]/20 text-sm bg-white outline-none"
            type="tel"
            value={phoneNumber}
            onChange={(e: any) => setPhoneNumber(e.target.value)}
          />
          <p className="text-xs text-gray-400 mt-2">
            Please enter your number with the country code (i.e. +44 for UK)
          </p>
        </form>
      )}

      {confirmationResult && (
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
                value={otp[i] || ""}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="h-12 w-12 rounded-xl border-2 border-slate-300 text-center text-lg font-semibold outline-none focus:border-[#13261b] focus:ring-2 focus:ring-[#13261b]/20"
              />

              {/* Dot separator after 3rd box */}
              {i === 2 && <span className="mx-1 text-2xl select-none">•</span>}
            </React.Fragment>
          ))}
        </div>
      )}

      <button
        disabled={!phoneNumber || isPending || resendCountdown > 0}
        onClick={() => requestOtp()}
        className="relative w-full h-10 rounded-xl bg-linear-to-b from-[#3a3a3a] via-[#111111] to-[#000000] text-white text-sm font-medium tracking-wide shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_6px_rgba(0,0,0,0.6)] hover:brightness-110 active:scale-[0.98] transition flex items-center justify-center gap-2 cursor-pointer"
      >
        {resendCountdown > 0
          ? `Resend OTP in ${resendCountdown}`
          : isPending
          ? "Sending OTP"
          : "Send OTP"}
      </button>

      <div className="p-10 text-center">
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
      </div>

      <div id="recaptcha-container" />

      {isPending && loadingIndicator}
    </div>
  );
}

export default OtpLogin;
