"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex flex-col flex-nowrap items-center justify-start gap-0 min-h-screen h-min w-auto overflow-hidden p-0 bg-white font-poppins">
      <section className="relative flex flex-row flex-nowrap items-start justify-center flex-none gap-0 h-screen w-full overflow-hidden p-0">
        <div className="absolute inset-0 rounded-inherit">
          <Image
            decoding="async"
            width="1024"
            height="1024"
            sizes="100vw"
            src="/not-found.jpg"
            alt=""
            className="block w-full h-full rounded-inherit object-cover object-center"
          />
        </div>
        <div className="relative flex flex-col flex-nowrap items-start justify-center flex-none gap-2 h-min w-full overflow-hidden p-10 md:p-20 bg-linear-to-b from-[#191a20] via-transparent">
          <div className="relative flex flex-col justify-start flex-none shrink-0 w-full h-auto whitespace-pre-wrap wrap-break-word outline-none opacity-100 transform-[perspective(1200px)] will-change-transform">
            <h1 className="text-[160px] md:text-[196px] font-medium text-white leading-none">
              404
            </h1>
          </div>
          <div className="relative flex flex-col flex-nowrap items-start justify-start flex-none gap-14 h-min w-full overflow-visible p-0 opacity-100 transform-[perspective(1200px)] will-change-transform">
            <div className="relative flex flex-col justify-start flex-none shrink-0 w-full h-auto whitespace-pre-wrap wrap-break-word outline-none opacity-100 transform-[perspective(1200px)] will-change-transform">
              <p className="text-lg md:text-xl text-white">
                Oops! We couldn't find that page :(
              </p>
            </div>
            <Link
              className="relative flex flex-row flex-nowrap items-center justify-center flex-none gap-3 h-min w-min overflow-visible px-5 py-3 bg-[#f5f5f5] rounded-lg no-underline"
              href="./"
            >
              <div className="relative flex flex-col justify-start flex-none shrink-0 outline-none whitespace-pre transform-none w-auto h-auto">
                <p className="text-sm text-[#191a20]">Go back home</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
