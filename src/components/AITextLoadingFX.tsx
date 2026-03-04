"use client";

import { ReactNode, useEffect, useState } from "react";

const messages = [
  "Processing...",
  "Analyzing...",
  "Computing...",
  "Almost...",
  "Thinking...",
];

interface RocketLoaderWrapperProps {
  isLoading: boolean;
  duration?: number;
  children: ReactNode;
}

export default function AITextLoadingFX({
  isLoading,
  duration,
  children,
}: RocketLoaderWrapperProps) {
  const [showLoader, setShowLoader] = useState(isLoading);

  useEffect(() => {
    setShowLoader(isLoading);

    if (isLoading && duration) {
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isLoading, duration]);

  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(false);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % messages.length);
        setAnimate(true);
      }, 250);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {showLoader ? (
        <div className="flex items-center justify-center w-full h-[97vh] overflow-hidden">
          <span
            className={`text-2xl md:text-3xl lg:text-4xl text-center leading-normal tracking-tight font-semibold 
                bg-linear-to-r from-[#193625] via-[#5e6b64] to-[#193625]
                bg-size-[200%_100%]
                bg-clip-text text-transparent
                transition-opacity duration-300 px-0.5
                ${
                  animate
                    ? "animate-[shimmer_2.5s_linear_infinite,aiFadeUp_0.5s_ease]"
                    : "opacity-0"
                }
            `}
          >
            {messages[index]}
          </span>
        </div>
      ) : (
        children
      )}
    </>
  );
}
