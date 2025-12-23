"use client";
import {
  Bookmark,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  NotepadText,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";

import { useEffect, useState } from "react";
import { auth } from "../../firebase"; // adjust path
import { onAuthStateChanged } from "firebase/auth";

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
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("/api/account/me", {
          headers: {
            "x-user-uid": user.uid,
          },
        });

        if (!res.ok) throw new Error("Failed to load user");

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
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!userData?.firebaseUid) {
      setLoading(false);
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

  const savedSubjectData = savedSubjects.map((s) => s.subjectData);

  return (
    <section className="border border-[rgba(0,0,0,0.08)] bg-white rounded-2xl flex justify-between items-center flex-[1_0_0] flex-col h-[97.5vh] overflow-hidden pt-14 px-8 pb-8 relative w-px gap-5">
      <div className="flex place-content-center items-center flex-none flex-col gap-5 h-min max-w-[1200px] overflow-hidden p-0 relative w-full">
        <div className="flex place-content-start justify-between items-start flex-none flex-row h-min overflow-hidden p-0 relative w-full">
          <div className="outline-none flex flex-col justify-start shrink-0 flex-none h-auto relative whitespace-pre w-auto">
            <h4 className="text-2xl text-[#193625] tracking-tight">Saved</h4>
          </div>
        </div>
        {savedSubjects.length === 0 && !loading && (
          <div className="flex place-content-center items-center flex-none flex-row gap-2.5 h-min overflow-hidden p-0 relative w-full">
            <div className="flex-[1_0_0] h-auto relative w-px">
              <div className="flex place-content-center items-center flex-row gap-2.5 h-min overflow-hidden p-0 relative w-full">
                <div className="flex-none h-auto relative w-auto">
                  <div className="flex place-content-center items-center flex-col gap-6 overflow-hidden p-10 relative bg-[#f9f9f9] rounded-3xl shadow-[0_0_12px_rgba(0,0,0,0.04)_inset] opacity-100">
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
                          <p className="text-2xl text-[#193625] tracking-tight text-center">
                            Saved Papers will appear here
                          </p>
                        </div>
                        <div className="flex-none h-auto relative whitespace-pre-wrap w-full wrap-break-word outline-none flex flex-col justify-start shrink-0 opacity-60">
                          <p className="text-sm text-[#193625] tracking-tight text-center">
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
        {loading && (
          <div className="flex items-center justify-center py-20">
            <p className="text-sm opacity-60">Loading saved courses...</p>
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
              className="flex gap-6 overflow-x-auto pb-4 no-scrollbar"
              style={{ scrollBehavior: "smooth" }}
            >
              {savedSubjectData.map((item) => {
                const isSaved = savedSubjectIds.includes(item.id);
                console.log(isSaved, item.id, savedSubjectIds);
                return (
                  <div
                    key={item.id}
                    className="self-start flex-none h-full relative"
                  >
                    <Link
                      href={item.link}
                      className="flex flex-col items-start justify-start gap-0 cursor-pointer overflow-hidden relative rounded-xl opacity-100 h-min w-[315px] will-change-transform"
                    >
                      <div className="relative w-full h-full aspect-4/3 flex-none overflow-hidden rounded-xl opacity-100 will-change-transform">
                        <div className="absolute top-0 left-1/2 w-full flex flex-col items-start justify-end gap-2 p-4 aspect-4/3 -translate-x-1/2 origin-center flex-none overflow-visible rounded-[3.08221%/4.85451%]">
                          <div className="absolute inset-0 overflow-hidden">
                            <Image
                              src={item.imgSrc}
                              alt=""
                              fill
                              className="object-cover blur-lg scale-110 opacity-40"
                            />
                            <Image
                              src={item.imgSrc}
                              alt={item.imgAlt}
                              fill
                              className="object-contain"
                            />
                          </div>
                        </div>
                        <div className="absolute left-1/2 bottom-3 w-[92%] flex flex-row items-center justify-between flex-none h-min overflow-visible p-0 -translate-x-1/2 opacity-100">
                          <div className="relative flex flex-row items-center justify-center flex-none gap-1 h-[26px] w-min overflow-visible p-0">
                            <div className="relative flex flex-row items-center justify-start flex-none gap-0 h-min w-min overflow-visible px-3 py-1 bg-white rounded opacity-100">
                              <div className="relative flex flex-col justify-start flex-none shrink-0 outline-none whitespace-pre opacity-100 transform-none w-auto h-auto">
                                <p className="text-xs text-black">
                                  {item.board}
                                </p>
                              </div>
                            </div>
                            <div className="relative flex flex-row items-center justify-start flex-none gap-0 h-min w-min overflow-visible px-3 py-1 bg-white rounded opacity-100">
                              <div className="relative flex flex-col justify-start flex-none shrink-0 outline-none whitespace-pre opacity-100 transform-none w-auto h-auto">
                                <p className="text-xs text-black">
                                  {item.medium}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="relative flex flex-row items-center justify-center flex-none gap-1 h-min w-min overflow-visible bg-white rounded px-1.5 py-1">
                            <div className="relative flex-none w-auto h-auto">
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  toggleBookmark(e, item);
                                }}
                                className="relative flex flex-row flex-nowrap items-center justify-center gap-1.5 h-min w-min overflow-visible p-0 cursor-pointer no-underline"
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
                        </div>
                      </div>
                      <div className="relative flex flex-col items-start justify-start flex-none gap-3 h-min w-full overflow-visible pt-4 px-0 no-underline">
                        <div className="relative flex flex-col items-start justify-start flex-none gap-2 h-min w-full overflow-visible p-0">
                          <div className="relative flex flex-col justify-start flex-none shrink-0 outline-none whitespace-pre transform-none opacity-100 w-auto h-auto">
                            <p className="text-lg font-medium text-black">
                              {item.title} - {item.classLevel}
                            </p>
                          </div>
                          <div className="relative flex flex-row items-center justify-start flex-none gap-2.5 h-min w-min overflow-visible p-0 opacity-80">
                            <div className="relative flex flex-row items-center justify-start flex-none gap-1 h-min w-min overflow-visible p-0">
                              <div className="relative flex-none shrink-0 w-4 h-4 text-black fill-current opacity-100 image-pixelated">
                                <div className="w-full h-full aspect-[inherit]">
                                  <NotepadText className="w-3.5 h-3.5" />
                                </div>
                              </div>
                              <div className="relative flex flex-col justify-start flex-none shrink-0 outline-none whitespace-pre transform-none opacity-100 w-auto h-auto">
                                <p className="text-sm text-black">
                                  {item.chapterCount} Chapters
                                </p>
                              </div>
                            </div>
                            <div className="relative flex-none w-1.5 h-1.5 aspect-square rounded-full bg-[#191A20] opacity-100"></div>
                            <div className="relative flex flex-row items-center justify-start flex-none gap-1 h-min w-min overflow-visible p-0">
                              <div className="relative flex-none shrink-0 w-4 h-4 text-black fill-current opacity-100 image-pixelated">
                                <div className="w-full h-full aspect-[inherit]">
                                  <BookOpen className="w-[15px] h-[15px]" />
                                </div>
                              </div>
                              <div className="relative flex flex-col justify-start flex-none shrink-0 outline-none whitespace-pre transform-none opacity-100 w-auto h-auto">
                                <p className="text-sm text-black">
                                  {item.questionCount.toLocaleString()}{" "}
                                  Questions
                                </p>
                              </div>
                            </div>
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
            <div className="flex place-content-center items-center flex-none flex-row gap-3 h-min overflow-hidden p-0 relative w-min">
              <div className="flex-none h-auto relative whitespace-pre w-auto outline-none flex flex-col justify-start shrink-0 opacity-100">
                <p className="text-xs text-[#193625]">
                  <Link
                    className="text-xs text-[#193625]"
                    href="./privacy-policy"
                  >
                    Privacy Policy
                  </Link>
                </p>
              </div>
              <div className="flex-none h-auto relative whitespace-pre w-auto outline-none flex flex-col justify-start shrink-0 opacity-100">
                <p className="text-xs text-[#193625]">
                  <Link
                    className="text-xs text-[#193625]"
                    href="./terms-of-service"
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
  );
};

export default Saved;
