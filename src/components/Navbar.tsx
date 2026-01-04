"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, easeIn, easeOut, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { getAuth, signOut } from "firebase/auth";

const navVariants = {
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.32, ease: easeOut },
  },
  hidden: {
    y: -100,
    opacity: 0,
    transition: { duration: 0.28, ease: easeIn },
  },
};

const Navbar: React.FC<{ hasSession: boolean }> = ({ hasSession }) => {
  const [visible, setVisible] = useState(true);
  const prevY = useRef(0);
  const ticking = useRef(false);
  const router = useRouter();

  useEffect(() => {
    prevY.current = typeof window !== "undefined" ? window.scrollY : 0;

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      // use rAF for smoothness
      requestAnimationFrame(() => {
        const current = window.scrollY;
        const delta = current - prevY.current;

        // ignore tiny scrolls
        if (Math.abs(delta) > 10) {
          if (delta > 0 && current > 50) {
            // scrolled down -> hide
            setVisible(false);
          } else if (delta < 0) {
            // scrolled up -> show
            setVisible(true);
          }
          prevY.current = current;
        }

        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
      await signOut(getAuth()); // sign out from client side as well
      router.replace("/"); // go to home
      router.refresh(); // revalidate session
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <>
      <MobileNavbar
        visible={visible}
        hasSession={hasSession}
        handleLogout={handleLogout}
      />
      <motion.div
        variants={navVariants}
        initial="visible"
        animate={visible ? "visible" : "hidden"}
        // pointerEvents disabled while hidden so it doesn't block clicks
        style={{ pointerEvents: visible ? "auto" : "none" }}
        className="hidden md:block h-auto fixed z-50 top-0 left-0 right-0 font-poppins"
      >
        <div className="contents">
          <nav className="flex flex-row place-content-center items-center gap-12 w-full h-min min-h-[72px] px-12 relative overflow-hidden">
            <div className="z-0 flex-none absolute inset-0 overflow-visible bg-white" />
            <div className="flex flex-row flex-[1_0_0] place-content-between items-center w-px max-w-7xl h-min p-0 relative overflow-visible">
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

              <div className="flex flex-row flex-none place-content-center items-center gap-6 w-min h-[41px] p-0 relative overflow-hidden">
                {["Home", "Services", "About", "Contact"].map((label) => (
                  <div key={label} className="relative w-auto h-auto">
                    <a
                      href={`/#${label.toLowerCase()}`}
                      className="group cursor-pointer flex flex-col place-content-start items-center gap-2.5 w-min h-min p-0 no-underline relative overflow-hidden rounded-sm"
                      aria-label={label}
                    >
                      <div className="relative w-auto h-auto">
                        <span className="text-base text-[#5e6b64] transition-colors duration-200 motion-safe:transition-transform motion-safe:duration-300 group-hover:text-[#13261b] group-hover:-translate-y-0.5 motion-safe:group-hover:-translate-y-0.5 inline-block">
                          {label}
                        </span>

                        <span
                          className="absolute left-1/2 -bottom-0.5 block h-1 w-0 bg-[#13261b] rounded transition-all duration-300 group-hover:left-0 group-hover:w-full motion-safe:group-hover:w-full transform -translate-x-1/2 group-hover:translate-x-0"
                          aria-hidden="true"
                        />
                      </div>
                    </a>
                  </div>
                ))}

                {hasSession && (
                  <div className="relative w-auto h-auto">
                    <a
                      href={`/dashboard`}
                      className="group cursor-pointer flex flex-col place-content-start items-center gap-2.5 w-min h-min p-0 no-underline relative overflow-hidden rounded-sm"
                      aria-label="dashboard"
                    >
                      <div className="relative w-auto h-auto">
                        <span className="text-base text-[#5e6b64] transition-colors duration-200 motion-safe:transition-transform motion-safe:duration-300 group-hover:text-[#13261b] group-hover:-translate-y-0.5 motion-safe:group-hover:-translate-y-0.5 inline-block">
                          Dashboard
                        </span>

                        <span
                          className="absolute left-1/2 -bottom-0.5 block h-1 w-0 bg-[#13261b] rounded transition-all duration-300 group-hover:left-0 group-hover:w-full motion-safe:group-hover:w-full transform -translate-x-1/2 group-hover:translate-x-0"
                          aria-hidden="true"
                        />
                      </div>
                    </a>
                  </div>
                )}

                {/* login icon button */}
                {hasSession ? (
                  <div className="relative w-auto h-auto">
                    <button
                      aria-label="Logout Btn"
                      onClick={() => {
                        handleLogout();
                      }}
                      className="group rounded-full bg-[#13261b] p-2 px-5 flex items-center justify-center w-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer"
                    >
                      <div className="h-min flex transition-transform duration-1000 flex-row flex-none place-content-center items-center gap-2.5 pl-0 py-0 relative overflow-visible">
                        <div className="flex-none w-auto h-auto relative">
                          <p className="text-white text-base opacity-100 translate-x-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                            Logout
                          </p>
                        </div>
                      </div>
                    </button>
                  </div>
                ) : (
                  <div className="relative w-auto h-auto">
                    <button
                      aria-label="Login Btn"
                      onClick={() => {
                        window.location.href = "/signin";
                      }}
                      className="group rounded-full bg-[#13261b] p-2 hover:px-5 flex items-center justify-center w-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer"
                    >
                      <div className="h-min hidden group-hover:flex transition-transform duration-1000 flex-row flex-none place-content-center items-center gap-2.5 pr-2 pl-0 py-0 relative overflow-visible">
                        <div className="flex-none w-auto h-auto relative">
                          <p className="text-white text-base opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                            Login
                          </p>
                        </div>
                      </div>

                      <div
                        className="flex items-center justify-center flex-row flex-nowrap gap-2.5 flex-none h-min min-h-5 min-w-5 overflow-hidden relative -rotate-90"
                        style={{ opacity: 1 }}
                      >
                        <div className="absolute transition-all duration-300 ease-in-out group-hover:translate-x-[21px] group-hover:translate-y-[21px]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="var(--token-21001bb2-95fc-4899-93cf-7cca6736a1a2, rgb(0, 0, 0))"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ width: "100%", height: "100%" }}
                            className="stroke-white transition-colors duration-300"
                          >
                            <line x1="7" y1="7" x2="17" y2="17"></line>
                            <polyline points="17 7 17 17 7 17"></polyline>
                          </svg>
                        </div>

                        <div className="absolute top-[-21px] left-[-21px] w-5 h-5 transition-all duration-300 ease-in-out group-hover:translate-x-[21px] group-hover:translate-y-[21px]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="var(--token-21001bb2-95fc-4899-93cf-7cca6736a1a2, rgb(0, 0, 0))"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ width: "100%", height: "100%" }}
                            className=" stroke-white transition-colors duration-300"
                          >
                            <line x1="7" y1="7" x2="17" y2="17"></line>
                            <polyline points="17 7 17 17 7 17"></polyline>
                          </svg>
                        </div>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </nav>
        </div>
      </motion.div>
    </>
  );
};

const mobileMenuVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

function MobileNavbar({
  visible,
  hasSession,
  handleLogout,
}: {
  visible: boolean;
  hasSession: boolean;
  handleLogout: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      variants={navVariants}
      initial="visible"
      animate={visible ? "visible" : "hidden"}
      // pointerEvents disabled while hidden so it doesn't block clicks
      style={{ pointerEvents: visible ? "auto" : "none" }}
      className="md:hidden fixed top-0 left-0 right-0 z-50 font-poppins bg-white"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 h-16 bg-white">
        {/* Logo */}
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

        {/* Toggle */}
        <div
          onClick={() => setOpen(!open)}
          className="cursor-pointer flex w-10 h-10 overflow-hidden relative transform-none origin-center bg-[#f3f6f5] rounded-full p-2"
          data-framer-name="Icon"
          data-highlight="true"
        >
          <motion.div
            className="absolute w-5 h-0.5 left-1/4 overflow-hidden flex-none"
            animate={{
              top: open ? "calc(50% - 2px)" : "calc(60% - 2px)",
              rotate: open ? -45 : 0,
              borderRadius: open ? "50% / 501.099%" : "10px",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
              backgroundColor: "rgb(17, 17, 17)",
              transformOrigin: "50% 50% 0px",
              willChange: "transform",
            }}
          />

          {/* Top Line */}
          <motion.div
            className="absolute flex-none w-5 h-0.5 overflow-hidden left-1/4 top-[calc(40%-1px)] bg-[rgb(17,17,17)] rounded-[10px] origin-center"
            animate={{
              top: open ? "calc(50% - 2px)" : "calc(40% - 2px)",
              rotate: open ? 45 : 0,
              borderRadius: open ? "50% / 501.099%" : "10px",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
              backgroundColor: "rgb(17, 17, 17)",
              transformOrigin: "50% 50% 0px",
              willChange: "transform",
            }}
          />
        </div>
      </div>

      {/* Overlay Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 bg-white pt-24 px-4 -z-1"
          >
            <nav className="flex flex-col gap-6">
              {["Home", "Services", "About", "Contact"].map((item) => (
                <Link
                  key={item}
                  href={`/#${item.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  className="text-2xl text-[#193625] transition"
                >
                  {item}
                </Link>
              ))}

              {hasSession && (
                <Link
                  href={`/dashboard`}
                  onClick={() => setOpen(false)}
                  className="text-2xl text-[#193625] transition"
                >
                  Dashboard
                </Link>
              )}

              {/* login icon button */}
              {hasSession ? (
                <div className="relative w-auto h-auto">
                  <button
                    aria-label="Login Btn"
                    onClick={() => {
                      handleLogout();
                    }}
                    className="group flex items-center justify-center w-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer"
                  >
                    <div className="h-min flex transition-transform duration-1000 flex-row flex-none place-content-center items-center gap-2.5 pr-2 pl-0 py-0 relative overflow-visible">
                      <div className="flex-none w-auto h-auto relative">
                        <p className="text-red-700 text-2xl opacity-100 translate-x-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                          Logout
                        </p>
                      </div>
                    </div>

                    <div
                      className="flex items-center justify-center flex-row flex-nowrap gap-2.5 flex-none h-min min-h-7 min-w-7 overflow-hidden relative -rotate-90"
                      style={{ opacity: 1 }}
                    >
                      <div className="absolute transition-all duration-300 ease-in-out group-hover:translate-x-[21px] group-hover:translate-y-[21px]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="28"
                          height="28"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#13261b"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ width: "100%", height: "100%" }}
                          className="stroke-red-700 transition-colors duration-300"
                        >
                          <line x1="7" y1="7" x2="17" y2="17"></line>
                          <polyline points="17 7 17 17 7 17"></polyline>
                        </svg>
                      </div>

                      <div className="absolute top-[-21px] left-[-21px] w-7 h-7 transition-all duration-300 ease-in-out group-hover:translate-x-[21px] group-hover:translate-y-[21px]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="28"
                          height="28"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#13261b"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ width: "100%", height: "100%" }}
                          className=" stroke-red-700 transition-colors duration-300"
                        >
                          <line x1="7" y1="7" x2="17" y2="17"></line>
                          <polyline points="17 7 17 17 7 17"></polyline>
                        </svg>
                      </div>
                    </div>
                  </button>
                </div>
              ) : (
                <div className="relative w-auto h-auto">
                  <button
                    aria-label="Login Btn"
                    onClick={() => {
                      window.location.href = "/signin";
                    }}
                    className="group flex items-center justify-center w-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer"
                  >
                    <div className="h-min flex transition-transform duration-1000 flex-row flex-none place-content-center items-center gap-2.5 pr-2 pl-0 py-0 relative overflow-visible">
                      <div className="flex-none w-auto h-auto relative">
                        <p className="text-[#13261b] text-2xl opacity-100 translate-x-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                          Login
                        </p>
                      </div>
                    </div>

                    <div
                      className="flex items-center justify-center flex-row flex-nowrap gap-2.5 flex-none h-min min-h-7 min-w-7 overflow-hidden relative -rotate-90"
                      style={{ opacity: 1 }}
                    >
                      <div className="absolute transition-all duration-300 ease-in-out group-hover:translate-x-[21px] group-hover:translate-y-[21px]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="28"
                          height="28"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#13261b"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ width: "100%", height: "100%" }}
                          className="stroke-[#13261b] transition-colors duration-300"
                        >
                          <line x1="7" y1="7" x2="17" y2="17"></line>
                          <polyline points="17 7 17 17 7 17"></polyline>
                        </svg>
                      </div>

                      <div className="absolute top-[-21px] left-[-21px] w-7 h-7 transition-all duration-300 ease-in-out group-hover:translate-x-[21px] group-hover:translate-y-[21px]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="28"
                          height="28"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#13261b"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ width: "100%", height: "100%" }}
                          className=" stroke-[#13261b] transition-colors duration-300"
                        >
                          <line x1="7" y1="7" x2="17" y2="17"></line>
                          <polyline points="17 7 17 17 7 17"></polyline>
                        </svg>
                      </div>
                    </div>
                  </button>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Navbar;
