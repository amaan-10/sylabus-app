"use client";
import {
  Bookmark,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Clock,
  FileText,
  Layers,
  NotepadText,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";

import { useEffect, useState } from "react";
import { auth } from "../../firebase"; // adjust path
import { onAuthStateChanged } from "firebase/auth";
import LoaderWrapper from "./PageLoader";

type SubjectData = {
  id: string;
  imgSrc: string;
  imgAlt: string;
  title: string;
  board: string;
  medium: string;
  classLevel: string;
  chapterCount: number;
  questionCount: number;
  // details: string[];
  link: string;
};

type SavedSubject = {
  userId: string;
  subjectId: string;
  subjectData: SubjectData;
};

type SavedPaperDrafts = {
  _id: string;
  userId: string;
  draftName: string;
  subjectSlug: string;
  paperMode: string;
  draft: {
    selected: any[];
    sectionedSelected: Record<string, any>;
  };
  lastUpdated: string;
  createdAt: string;
  updatedAt: string;
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

const Saved = () => {
  const [loading, setLoading] = useState(true);
  const [savedSubjects, setSavedSubjects] = useState<SavedSubject[]>([]);
  const [savedSubjectIds, setSavedSubjectIds] = useState<string[]>([]);
  const [savedPaperDrafts, setSavedPaperDrafts] = useState<SavedPaperDrafts[]>(
    []
  );
  const [savedPaperDraftsIds, setSavedPaperDraftsIds] = useState<
    SavedPaperDrafts[]
  >([]);

  const [userData, setUserData] = useState<UserData>();

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // Firebase user exists but session may be gone
      if (!user) {
        setUserData(undefined);
        // setLoading(false);
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
      // setLoading(false);
      return;
    }
    const loadSaved = async () => {
      try {
        const res = await fetch(
          `/api/saved-subjects?userId=${userData.firebaseUid}`
        );

        const data = await res.json();
        setSavedSubjects(Array.isArray(data) ? data : []);
        setSavedSubjectIds(data.map((s: any) => s.subjectId));
      } catch (err) {
        console.error("Failed to load saved subjects", err);
      } finally {
        setLoading(false);
      }
    };

    loadSaved();
  }, [userData?.firebaseUid]);

  useEffect(() => {
    if (!userData?.firebaseUid) {
      // setLoading(false);
      return;
    }
    const loadSaved = async () => {
      try {
        const res = await fetch(
          `/api/paper-drafts?userId=${userData.firebaseUid}`
        );

        const data = await res.json();
        setSavedPaperDrafts(data.drafts);
        setSavedPaperDraftsIds(data.drafts.map((s: any) => s._id));
      } catch (err) {
        console.error("Failed to load saved subjects", err);
      } finally {
        setLoading(false);
      }
    };

    loadSaved();
  }, [userData?.firebaseUid]);

  const toggleBookmark = async (e: React.MouseEvent, subject: SubjectData) => {
    e.preventDefault();
    e.stopPropagation();

    if (!userData?.firebaseUid) return;

    const isSaved = savedSubjects.some((s) => s.subjectId === subject.id);

    // ✅ OPTIMISTIC UI (THIS FIXES THE VANISH ISSUE)
    setSavedSubjects((prev) =>
      isSaved
        ? prev.filter((s) => s.subjectId !== subject.id) // vanish instantly
        : [
            ...prev,
            {
              _id: "temp-" + subject.id, // temp key
              userId: userData.firebaseUid,
              subjectId: subject.id,
              subjectData: subject,
            },
          ]
    );

    try {
      await fetch("/api/saved-subjects", {
        method: isSaved ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userData.firebaseUid,
          subjectId: subject.id,
          subjectData: subject,
        }),
      });
    } catch (err) {
      // 🔁 rollback
      setSavedSubjects((prev) =>
        isSaved
          ? [
              ...prev,
              {
                _id: "rollback-" + subject.id,
                userId: userData.firebaseUid,
                subjectId: subject.id,
                subjectData: subject,
              },
            ]
          : prev.filter((s) => s.subjectId !== subject.id)
      );
    }
  };

  const onDelete = async (draftId: string) => {
    if (!confirm("Delete this paper permanently?")) return;

    await fetch(
      `/api/paper-drafts?userId=${userData?.firebaseUid}&draftId=${draftId}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ draftId }),
      }
    );

    setSavedPaperDrafts((prev) => prev.filter((p) => p._id !== draftId));
  };

  const savedSubjectData = savedSubjects.map((s) => s.subjectData);

  const formatDateTime = (date: string | Date) => {
    const d = new Date(date);

    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();

    let hours = d.getHours();
    const minutes = String(d.getMinutes()).padStart(2, "0");

    const period = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours === 0 ? 12 : hours; // 12 AM / 12 PM

    const formattedHours = String(hours).padStart(2, "0");

    return `${day}/${month}/${year}, ${formattedHours}:${minutes} ${period}`;
  };

  return (
    <LoaderWrapper isLoading={loading}>
      <section className="md:border border-[rgba(0,0,0,0.08)] bg-white rounded-2xl flex justify-between items-center flex-[1_0_0] flex-col h-[97.5vh] overflow-y-auto p-[56px_8px_120px] md:py-16 md:px-8 md:pb-8 relative w-px gap-5">
        <div
          className={`flex place-content-center justify-between md:justify-normal items-center flex-none flex-col gap-5 ${
            savedSubjects.length > 0 ? "h-min" : ""
          } h-3/4 md:h-min max-w-[1200px] overflow-y-auto p-0 relative w-full`}
        >
          <div className="flex place-content-start justify-between items-start flex-none flex-row h-min overflow-hidden p-0 relative w-full">
            <div className="outline-none flex flex-col justify-start shrink-0 flex-none h-auto relative whitespace-pre w-auto">
              <h4 className="text-2xl text-[#193625] tracking-tight">Saved</h4>
            </div>
          </div>
          {savedSubjects.length === 0 &&
            savedPaperDrafts.length === 0 &&
            !loading && (
              <div className="flex place-content-center items-center flex-none flex-row gap-2.5 h-min overflow-hidden p-0 relative w-full">
                <div className="flex-[1_0_0] h-auto relative w-px">
                  <div className="flex place-content-center items-center flex-row gap-2.5 h-min overflow-hidden p-0 relative w-full">
                    <div className="flex-none h-auto relative w-auto">
                      <div className="flex place-content-center items-center flex-col gap-6 overflow-hidden p-6 md:p-10 relative bg-[#f9f9f9] rounded-3xl shadow-[0_0_12px_rgba(0,0,0,0.04)_inset] opacity-100 w-[360px] md:w-full h-[456px] md:h-full">
                        <div className="aspect-[1.95849/1] flex-none h-[196px] overflow-hidden relative w-full">
                          <div className="absolute inset-0 rounded-inherit">
                            <Image
                              decoding="async"
                              width="1684"
                              height="1132"
                              sizes="calc(100vw - 168px)"
                              src="/saved.png"
                              alt=""
                              className="block w-full h-full rounded-inherit object-center object-contain"
                            />
                          </div>
                        </div>
                        <div className="flex place-content-center items-center flex-none flex-col gap-5 h-min overflow-visible p-0 relative w-full">
                          <div className="flex place-content-center items-center flex-none flex-col gap-1 h-min overflow-visible p-0 relative w-full">
                            <div className="flex-none h-auto relative whitespace-pre-wrap w-full wrap-break-word outline-none flex flex-col justify-start shrink-0 opacity-100">
                              <p className="text-xl md:text-2xl font-medium text-[#193625] tracking-tight text-center">
                                Saved Papers will appear here
                              </p>
                            </div>
                            <div className="flex-none h-auto relative whitespace-pre-wrap w-full wrap-break-word outline-none flex flex-col justify-start shrink-0 opacity-60">
                              <p className="text-[13px] md:text-sm text-[#193625] tracking-tight text-center">
                                Add papers to bookmarks to have them appear here
                              </p>
                            </div>
                          </div>
                          <div className="flex-none h-auto relative w-auto">
                            <Link
                              href="./courses"
                              className="flex place-content-center items-center cursor-pointer flex-row gap-2 h-min overflow-hidden px-3 py-2 relative no-underline w-min bg-[#191a20] rounded-sm opacity-100 border-0"
                            >
                              <div className="flex-none h-auto relative whitespace-pre w-auto outline-none flex flex-col justify-start shrink-0 opacity-100">
                                <p className="text-sm text-white tracking-tight">
                                  Generate and Save Papers
                                </p>
                              </div>
                              <div className="flex-none h-5 w-5 relative shrink-0 opacity-100">
                                <div className="svgContainer w-full h-full aspect-[inherit] flex items-center justify-center">
                                  <Sparkles className="text-white h-4 w-4" />
                                </div>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          {savedSubjects.length > 0 && (
            <div className="w-full">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg">Subjects</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => scroll("left")}
                    className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                    aria-label="Scroll left"
                  >
                    <ChevronLeft className="w-6 h-6 text-foreground" />
                  </button>
                  <button
                    onClick={() => scroll("right")}
                    className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                    aria-label="Scroll right"
                  >
                    <ChevronRight className="w-6 h-6 text-foreground" />
                  </button>
                </div>
              </div>

              <div
                ref={scrollContainerRef}
                className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 no-scrollbar"
                style={{ scrollBehavior: "smooth" }}
              >
                {savedSubjectData.map((item) => {
                  const isSaved = savedSubjectIds.includes(item.id);

                  return (
                    <div
                      key={item.id}
                      className="self-start flex-none relative"
                    >
                      <Link
                        href={item.link}
                        className="flex flex-col items-start justify-start cursor-pointer overflow-hidden
                     relative rounded-xl opacity-100 h-min
                     w-[220px] sm:w-[260px] md:w-[315px]"
                      >
                        {/* IMAGE */}
                        <div
                          className="relative w-full aspect-3/4 md:aspect-4/3
                       flex-none overflow-hidden rounded-xl will-change-transform"
                        >
                          <div
                            className="absolute top-0 left-1/2 w-full
                         aspect-3/4 md:aspect-4/3
                         -translate-x-1/2 origin-center
                         flex flex-col justify-end p-3 sm:p-4"
                          >
                            <div className="absolute inset-0 overflow-hidden bg-[#f1f5f9]">
                              <Image
                                src={item.imgSrc}
                                alt={item.imgAlt}
                                fill
                                className="object-contain"
                              />
                            </div>
                          </div>

                          {/* BADGES */}
                          <div className="absolute flex-col-reverse md:flex-row gap-2 md:gap-0 left-1/2 bottom-3 w-[92%] flex items-center justify-between -translate-x-1/2">
                            <div className="flex gap-1 self-start">
                              <span className="bg-white rounded px-2 py-0.5 text-xs text-black">
                                {item.board}
                              </span>
                              <span className="bg-white rounded px-2 py-0.5 text-xs text-black">
                                {item.medium}
                              </span>
                            </div>

                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleBookmark(e, item);
                              }}
                              className="bg-white rounded p-1 self-end"
                            >
                              <Bookmark
                                className={`w-5 h-5 ${
                                  isSaved
                                    ? "fill-black text-black"
                                    : "text-black"
                                }`}
                              />
                            </button>
                          </div>
                        </div>

                        {/* CONTENT */}
                        <div className="pt-4 w-full">
                          <p className="text-base font-medium text-black leading-snug">
                            {item.title} – {item.classLevel}
                          </p>

                          <div className="mt-2 flex items-center gap-2 text-xs md:text-sm text-black/80">
                            <div className="flex items-center gap-1">
                              <NotepadText className="w-3.5 h-3.5" />
                              <span>{item.chapterCount} Chapters</span>
                            </div>

                            <span className="w-1 h-1 rounded-full bg-black/70" />

                            <div className="flex items-center gap-1">
                              <BookOpen className="w-4 h-4" />
                              <span>
                                {item.questionCount.toLocaleString()} Questions
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {savedPaperDrafts.length > 0 && (
            <div className="w-full">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg">Paper Drafts</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                {savedPaperDrafts.map((draft) => {
                  const questionCount = draft.draft?.selected?.length ?? 0;

                  return (
                    <div
                      key={draft._id}
                      className="rounded-xl sm:rounded-2xl border border-slate-200 bg-[#f1f5f9] p-3 sm:p-4 md:p-5 shadow-sm hover:shadow-md transition"
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm sm:text-base md:text-lg font-semibold text-[#193625] truncate">
                          {draft.draftName}
                        </h3>

                        <span className="shrink-0 rounded-full bg-emerald-100 px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium text-emerald-700 capitalize">
                          {draft.paperMode}
                        </span>
                      </div>

                      {/* Meta */}
                      <div className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-black/70">
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <Layers className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          <span>{questionCount} Questions</span>
                        </div>

                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          <span className="capitalize truncate">
                            {draft.subjectSlug}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          <span className="truncate">
                            {formatDateTime(draft.lastUpdated)}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="mt-4 sm:mt-5 flex justify-between items-center text-xs sm:text-sm">
                        <Link
                          href={`/saved/draft/${draft._id}`}
                          className="font-medium text-emerald-700 hover:underline"
                        >
                          Open →
                        </Link>

                        <button
                          onClick={() => onDelete(draft._id)}
                          className="text-red-600 hover:underline cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
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

export default Saved;
