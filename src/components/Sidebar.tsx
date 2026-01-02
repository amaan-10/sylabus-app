"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { JSX } from "react";

type NavItem = {
  href: string;
  label: string;
  icon: (active: boolean) => JSX.Element;
};

const navItems: NavItem[] = [
  {
    href: "/dashboard",
    label: "Home",
    icon: (active) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke={active ? "#fff" : "currentColor"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-full h-full"
        aria-hidden="true"
      >
        <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
        <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      </svg>
    ),
  },
  // {
  //   href: "/search",
  //   label: "Search",
  //   icon: (active) => (
  //     <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       width="24"
  //       height="24"
  //       viewBox="0 0 24 24"
  //       fill="none"
  //       stroke={active ? "#fff" : "currentColor"}
  //       strokeWidth="2"
  //       strokeLinecap="round"
  //       strokeLinejoin="round"
  //       className="w-full h-full"
  //       aria-hidden="true"
  //     >
  //       <path d="m21 21-4.34-4.34" />
  //       <circle cx="11" cy="11" r="8" />
  //     </svg>
  //   ),
  // },

  {
    href: "/courses",
    label: "Courses",
    icon: (active) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke={active ? "#fff" : "currentColor"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-full h-full"
        aria-hidden="true"
      >
        <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
        <path d="M22 10v6" />
        <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
      </svg>
    ),
  },
  {
    href: "/generated-papers",
    label: "Generated Papers",
    icon: (active) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke={active ? "#fff" : "currentColor"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-full h-full"
        aria-hidden="true"
      >
        <path d="M8 2v4" />
        <path d="M12 2v4" />
        <path d="M16 2v4" />
        <rect width="16" height="18" x="4" y="4" rx="2" />
        <path d="M8 10h6" />
        <path d="M8 14h8" />
        <path d="M8 18h5" />
      </svg>
    ),
  },
  {
    href: "/saved",
    label: "Saved",
    icon: (active) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke={active ? "#fff" : "currentColor"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-full h-full"
        aria-hidden="true"
      >
        <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
      </svg>
    ),
  },
  {
    href: "/account",
    label: "Account",
    icon: (active) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke={active ? "#fff" : "currentColor"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-full h-full"
        aria-hidden="true"
      >
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
];
const Sidebar = () => {
  const pathname = usePathname() ?? "/";

  return (
    <div className="fixed z-20 bottom-0 left-1/2 -translate-x-1/2 md:bottom-auto md:left-2 md:top-2 md:translate-x-0 w-full md:w-auto">
      <nav className="flex gap-2 p-2 relative border border-[rgba(0,0,0,0.08)] rounded-t-2xl md:rounded-2xl bg-white w-full h-auto md:w-min md:h-[97.5vh]">
        <div className="flex items-center justify-center md:justify-between flex-row md:flex-col w-full md:w-min h-auto md:h-full px-4 py-3 md:px-3 md:py-8 bg-white rounded-xl">
          <Link
            href="/"
            className="hidden md:block flex-none h-6 relative no-underline w-8 shrink-0 [image-rendering:pixelated] fill-black text-black opacity-100"
          >
            <div className="w-full h-full aspect-[inherit]">
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
          </Link>
          <div className="flex flex-row md:flex-col items-center gap-4 p-0 relative">
            {navItems.slice(0, 4).map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative no-underline flex items-center justify-center w-min rounded-xl transition ${
                    isActive
                      ? "bg-[#13261b] text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div className="p-3 w-min">
                    <div className="w-6 h-6">{item.icon(isActive)}</div>
                  </div>

                  {/* Tooltip Label */}
                  <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full -mt-3 md:left-full md:top-1/2 md:ml-3 md:mt-0 md:translate-x-0 md:-translate-y-1/2 whitespace-nowrap text-sm font-medium bg-white text-black px-3 py-2 rounded-xl shadow-md opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="flex flex-row md:flex-col items-center gap-4 ml-4 md:ml-0 p-0 relative">
            {navItems.slice(4).map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative no-underline flex items-center justify-center w-min rounded-xl transition ${
                    isActive
                      ? "bg-[#13261b] text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div className="p-3 w-min">
                    <div className="w-6 h-6">{item.icon(isActive)}</div>
                  </div>

                  {/* Tooltip Label */}
                  <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full -mt-3 md:left-full md:top-1/2 md:ml-3 md:mt-0 md:translate-x-0 md:-translate-y-1/2 whitespace-nowrap text-sm font-medium bg-white text-black px-3 py-2 rounded-xl shadow-md opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
