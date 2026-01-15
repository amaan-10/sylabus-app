"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Trash2, FileText, Calendar } from "lucide-react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import LoaderWrapper from "./PageLoader";
import { ClassKey } from "@/lib/subjects";

type SavedPaper = {
  _id: string;
  meta: {
    board: string;
    medium: string;
    classKey: string;
    subjectSlug: string;
    subjectName: string;
  };
  schoolName?: string;
  paperMode: "exam" | "custom";
  totalMarks: number;
  createdAt: string;
  questions: any[];
};

type UserData = {
  firebaseUid: string;
  name: string;
  phone: string;
  gender: string;
  role: string;
  board: string;
  medium: string;
  classLevel: string;
  userTier: string;
};

const GeneratedPapers = () => {
  const [papers, setPapers] = useState<SavedPaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // Firebase user exists but session may be gone
      if (!user) {
        setUserData(undefined);
        return;
      }

      try {
        const res = await fetch("/api/account/me");

        // Session expired or logged out
        if (res.status === 401) {
          await auth.signOut(); // force cleanup
          setUserData(undefined);
          return;
        }

        const data = await res.json();

        setUserData({
          firebaseUid: data.firebaseUid ?? "",
          name: data.name ?? "",
          phone: data.phone ?? "",
          gender: data.gender ?? "",
          role: data.role ?? "",
          board: data.board ?? "",
          medium: data.medium ?? "",
          classLevel: data.classLevel ?? "",
          userTier: data.userTier ?? "",
        });
      } catch (err) {
        console.error(err);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!userData?.firebaseUid) {
      return;
    }

    const fetchPapers = async () => {
      try {
        const res = await fetch(
          `/api/question-papers?userId=${userData.firebaseUid}`
        );
        const data = await res.json();
        setPapers(data.papers || []);
      } catch (err) {
        console.error("Failed to load generated papers", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPapers();
  }, [userData?.firebaseUid]);

  const deletePaper = async (e: React.MouseEvent, paperId: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm("Delete this paper permanently?")) return;

    await fetch("/api/question-papers", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paperId }),
    });

    setPapers((prev) => prev.filter((p) => p._id !== paperId));
  };

  return (
    <LoaderWrapper isLoading={loading}>
      <section className="md:border border-[rgba(0,0,0,0.08)] bg-white rounded-2xl flex justify-between items-center flex-[1_0_0] flex-col h-[97.5vh] overflow-y-auto p-[56px_8px_120px] md:py-16 md:px-8 md:pb-8 relative w-px gap-5">
        <div
          className={`flex place-content-center justify-between md:justify-normal items-center flex-none flex-col gap-5 ${
            papers.length > 0 ? "h-min" : ""
          } h-3/4 md:h-min max-w-[1200px] overflow-hidden p-0 relative w-full`}
        >
          <div className="flex place-content-start justify-between items-start flex-none flex-row h-min overflow-hidden p-0 relative w-full">
            <div className="outline-none flex flex-col justify-start shrink-0 flex-none h-auto relative whitespace-pre w-auto">
              <h4 className="text-2xl text-[#193625] tracking-tight">
                Generated Papers
              </h4>
            </div>
          </div>
          <div className="flex place-content-center items-center flex-col gap-2.5 h-min overflow-hidden p-0 relative w-full">
            <div className="flex place-content-center justify-between items-center flex-none flex-row h-min max-w-[1200px] overflow-visible p-0 relative w-full">
              {papers.length === 0 ? (
                <div className="relative flex flex-col flex-none place-content-end items-end gap-2.5 w-full h-min overflow-hidden p-0">
                  <div className="relative flex flex-col flex-none place-content-center items-center gap-8 w-full h-min overflow-hidden py-12">
                    <div className="flex-none w-[60px] h-[60px] relative">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 256 256"
                        focusable="false"
                        color="rgb(227, 227, 227)"
                        fill="rgb(227,227,277)"
                        className="inline-block w-full h-full select-none shrink-0"
                      >
                        <g color="rgb(227, 227, 227)">
                          <path d="M128,24a96.11,96.11,0,0,0-96,96v96a8,8,0,0,0,13.07,6.19l24.26-19.85L93.6,222.19a8,8,0,0,0,10.13,0L128,202.34l24.27,19.85a8,8,0,0,0,10.13,0l24.27-19.85,24.26,19.85A8,8,0,0,0,224,216V120A96.11,96.11,0,0,0,128,24ZM100,128a12,12,0,1,1,12-12A12,12,0,0,1,100,128Zm56,0a12,12,0,1,1,12-12A12,12,0,0,1,156,128Z"></path>
                        </g>
                      </svg>
                    </div>
                    <div className="relative flex flex-col flex-none place-content-center items-center gap-2.5 w-full h-min overflow-hidden p-0">
                      <div className="relative flex flex-col justify-start flex-none w-full h-auto whitespace-pre-wrap wrap-break-word outline-none">
                        <h3 className="text-2xl md:text-3xl font-medium text-[#193625] tracking-tight text-center">
                          Nothing to see here!
                        </h3>
                      </div>
                      <div className="relative flex flex-col justify-start flex-none shrink-0 w-full h-auto whitespace-pre-wrap wrap-break-word opacity-60 outline-none">
                        <p className="text-lg text-black text-center">
                          You haven&apos;t generated any papers yet.
                        </p>
                      </div>
                    </div>
                    <div className="flex-none h-auto relative w-auto">
                      <Link
                        href="./courses"
                        className="flex place-content-center items-center cursor-pointer flex-row gap-2 h-min overflow-hidden px-5 py-2 relative no-underline w-min bg-[#191a20] rounded-sm opacity-100 border-0"
                      >
                        <div className="flex-none h-auto relative whitespace-pre w-auto outline-none flex flex-col justify-start shrink-0 opacity-100">
                          <p className="text-base text-white tracking-tight">
                            Generate Papers
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 w-full">
                  {papers.map((paper) => (
                    <Link
                      href={`/generated-papers/${paper._id}`}
                      key={paper._id}
                      className="rounded-xl border border-slate-200 bg-[#f1f5f9] p-3 sm:p-4 shadow-sm hover:shadow transition active:scale-[0.98]"
                    >
                      {/* ICON */}
                      <svg
                        viewBox="-4 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-20 w-20 -ml-2"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <path
                            d="M25.6686 26.0962C25.1812 26.2401 24.4656 26.2563 23.6984 26.145C22.875 26.0256 22.0351 25.7739 21.2096 25.403C22.6817 25.1888 23.8237 25.2548 24.8005 25.6009C25.0319 25.6829 25.412 25.9021 25.6686 26.0962ZM17.4552 24.7459C17.3953 24.7622 17.3363 24.7776 17.2776 24.7939C16.8815 24.9017 16.4961 25.0069 16.1247 25.1005L15.6239 25.2275C14.6165 25.4824 13.5865 25.7428 12.5692 26.0529C12.9558 25.1206 13.315 24.178 13.6667 23.2564C13.9271 22.5742 14.193 21.8773 14.468 21.1894C14.6075 21.4198 14.7531 21.6503 14.9046 21.8814C15.5948 22.9326 16.4624 23.9045 17.4552 24.7459ZM14.8927 14.2326C14.958 15.383 14.7098 16.4897 14.3457 17.5514C13.8972 16.2386 13.6882 14.7889 14.2489 13.6185C14.3927 13.3185 14.5105 13.1581 14.5869 13.0744C14.7049 13.2566 14.8601 13.6642 14.8927 14.2326ZM9.63347 28.8054C9.38148 29.2562 9.12426 29.6782 8.86063 30.0767C8.22442 31.0355 7.18393 32.0621 6.64941 32.0621C6.59681 32.0621 6.53316 32.0536 6.44015 31.9554C6.38028 31.8926 6.37069 31.8476 6.37359 31.7862C6.39161 31.4337 6.85867 30.8059 7.53527 30.2238C8.14939 29.6957 8.84352 29.2262 9.63347 28.8054ZM27.3706 26.1461C27.2889 24.9719 25.3123 24.2186 25.2928 24.2116C24.5287 23.9407 23.6986 23.8091 22.7552 23.8091C21.7453 23.8091 20.6565 23.9552 19.2582 24.2819C18.014 23.3999 16.9392 22.2957 16.1362 21.0733C15.7816 20.5332 15.4628 19.9941 15.1849 19.4675C15.8633 17.8454 16.4742 16.1013 16.3632 14.1479C16.2737 12.5816 15.5674 11.5295 14.6069 11.5295C13.948 11.5295 13.3807 12.0175 12.9194 12.9813C12.0965 14.6987 12.3128 16.8962 13.562 19.5184C13.1121 20.5751 12.6941 21.6706 12.2895 22.7311C11.7861 24.0498 11.2674 25.4103 10.6828 26.7045C9.04334 27.3532 7.69648 28.1399 6.57402 29.1057C5.8387 29.7373 4.95223 30.7028 4.90163 31.7107C4.87693 32.1854 5.03969 32.6207 5.37044 32.9695C5.72183 33.3398 6.16329 33.5348 6.6487 33.5354C8.25189 33.5354 9.79489 31.3327 10.0876 30.8909C10.6767 30.0029 11.2281 29.0124 11.7684 27.8699C13.1292 27.3781 14.5794 27.011 15.985 26.6562L16.4884 26.5283C16.8668 26.4321 17.2601 26.3257 17.6635 26.2153C18.0904 26.0999 18.5296 25.9802 18.976 25.8665C20.4193 26.7844 21.9714 27.3831 23.4851 27.6028C24.7601 27.7883 25.8924 27.6807 26.6589 27.2811C27.3486 26.9219 27.3866 26.3676 27.3706 26.1461ZM30.4755 36.2428C30.4755 38.3932 28.5802 38.5258 28.1978 38.5301H3.74486C1.60224 38.5301 1.47322 36.6218 1.46913 36.2428L1.46884 3.75642C1.46884 1.6039 3.36763 1.4734 3.74457 1.46908H20.263L20.2718 1.4778V7.92396C20.2718 9.21763 21.0539 11.6669 24.0158 11.6669H30.4203L30.4753 11.7218L30.4755 36.2428ZM28.9572 10.1976H24.0169C21.8749 10.1976 21.7453 8.29969 21.7424 7.92417V2.95307L28.9572 10.1976ZM31.9447 36.2428V11.1157L21.7424 0.871022V0.823357H21.6936L20.8742 0H3.74491C2.44954 0 0 0.785336 0 3.75711V36.2435C0 37.5427 0.782956 40 3.74491 40H28.2001C29.4952 39.9997 31.9447 39.2143 31.9447 36.2428Z"
                            fill="#EB5757"
                          ></path>
                        </g>
                      </svg>

                      {/* HEADER */}
                      <div className="mt-2 sm:mt-3 flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="text-sm sm:text-base font-semibold text-slate-900 truncate">
                            {paper.meta.subjectName}
                          </h3>
                          <span className="flex flex-wrap gap-[0px_4px] text-[11px] sm:text-xs text-slate-500 truncate">
                            <span>{paper.meta.board.toUpperCase()}</span> •{" "}
                            <span className="capitalize">
                              {paper.meta.medium} Med
                            </span>{" "}
                            •{" "}
                            <span>
                              {getClassLabel(paper.meta.classKey as ClassKey)}
                            </span>
                          </span>
                        </div>

                        <button
                          onClick={(e) => deletePaper(e, paper._id)}
                          className="shrink-0 text-red-500 hover:text-red-600 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* META */}
                      <div className="mt-2 sm:mt-3 space-y-1 text-[11px] sm:text-xs text-slate-600">
                        <div className="flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          <span className="flex flex-wrap gap-[0px_4px]">
                            <span>{paper.questions.length} Questions</span> •{" "}
                            <span>{paper.totalMarks} Marks</span>
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(paper.createdAt).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </div>

                        <span
                          className="inline-block mt-1 rounded-full bg-emerald-100
                         px-2 py-0.5 text-[10px] sm:text-[11px]
                         font-semibold text-emerald-800"
                        >
                          {paper.paperMode === "exam"
                            ? "Exam Pattern"
                            : "Custom"}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
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
                  <div className="relative w-5 md:w-7 h-5 md:h-7 mb-[7px] md:mb-0">
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
                    <p className="text-[#193625] text-base md:text-2xl">
                      Sylabus
                    </p>
                  </div>
                </Link>
              </div>
              <div className="flex place-content-center items-center flex-none flex-row gap-3 h-min overflow-hidden p-0 relative w-min">
                <div className="flex-none h-auto relative whitespace-pre w-auto outline-none flex flex-col justify-start shrink-0 opacity-100">
                  <p className="text-xs text-[#193625]">
                    <Link
                      className="text-xs text-[#193625]"
                      href="./policies/privacy-policy"
                    >
                      Privacy Policy
                    </Link>
                  </p>
                </div>
                <div className="flex-none h-auto relative whitespace-pre w-auto outline-none flex flex-col justify-start shrink-0 opacity-100">
                  <p className="text-xs text-[#193625]">
                    <Link
                      className="text-xs text-[#193625]"
                      href="./policies/terms-of-service"
                    >
                      Terms of Service{" "}
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </LoaderWrapper>
  );
};

export default GeneratedPapers;

const getClassLabel = (classKey: ClassKey): string => {
  if (classKey === "8" || classKey === "9" || classKey === "10") {
    return `Class ${classKey}`;
  }
  const [std, stream] = classKey.split("-");
  const stdLabel = `Class ${std}`;
  const streamLabel = getStreamLabel(
    stream as "science" | "commerce" | "arts" | "humanities" | "all"
  );
  return `${stdLabel} - ${streamLabel}`;
};

const getStreamLabel = (
  stream: "science" | "commerce" | "arts" | "humanities" | "all"
): string => {
  switch (stream) {
    case "science":
      return "Sci";
    case "commerce":
      return "Com";
    case "arts":
      return "Arts";
    case "humanities":
      return "Hum";
    default:
      return "All Streams";
  }
};
