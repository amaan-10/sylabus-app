import { Suspense } from "react";
import CustomPaper from "@/components/course/CustomPaper";
import Sidebar from "@/components/Sidebar";

const CustomPaperPage = () => {
  return (
    <div className="flex place-content-start items-start bg-white flex-row gap-2 h-min overflow-hidden py-2 px-2 pl-2 md:pl-[104px] relative min-h-screen w-auto font-poppins">
      <Sidebar />

      <Suspense fallback={<CustomPaperLoader />}>
        <CustomPaper />
      </Suspense>
    </div>
  );
};

export default CustomPaperPage;

/* ---------- Fallback UI ---------- */

const CustomPaperLoader = () => (
  <div className="flex items-center justify-center h-screen w-full rounded-2xl bg-slate-50 border border-[rgba(0,0,0,0.08)]">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width={100}
      height={100}
      viewBox="0 0 100 100"
      className="animate-rocket-launch h-14 w-14 inline-block shrink-0 fill-[#193625] text-[#193625]"
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
);
