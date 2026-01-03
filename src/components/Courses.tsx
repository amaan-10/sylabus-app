"use client";

import Image from "next/image";
import React, { useMemo, useState } from "react";
import { Bookmark } from "lucide-react";
import Link from "next/link";
import Filters from "./Filters";

type FiltersState = {
  featured: boolean;
  boards: string[];
  classes: string[];
  subjects: string[];
  medium: string[];
};

type CoursesProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  filters: FiltersState;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
};

type Course = {
  id: number;
  imgSrc: string;
  imgAlt: string;
  title: string;
  badges: string[]; // e.g. ["MSBHSE", "Secondary", "8th"]
  details: string[];
  href: string;
};

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FiltersState>({
    featured: false,
    boards: [],
    classes: [],
    subjects: [],
    medium: [],
  });

  const toggleInArray = (arr: string[], value: string) =>
    arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];

  const handleToggleSubject = (subject: string) => {
    setFilters((prev) => ({
      ...prev,
      subjects: toggleInArray(prev.subjects, subject),
    }));
  };

  const handleToggleBoard = (board: string) => {
    setFilters((prev) => ({
      ...prev,
      boards: toggleInArray(prev.boards, board),
    }));
  };

  const handleToggleClass = (cls: string) => {
    setFilters((prev) => ({
      ...prev,
      classes: toggleInArray(prev.classes, cls),
    }));
  };

  const handleToggleFeatured = () => {
    setFilters((prev) => ({
      ...prev,
      featured: !prev.featured,
    }));
  };

  const handleToggleSchoolMedium = (medium: string) => {
    setFilters((prev) => ({
      ...prev,
      medium: toggleInArray(prev.medium, medium),
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      featured: false,
      boards: [],
      classes: [],
      subjects: [],
      medium: [],
    });
    setSearchQuery("");
  };

  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([]);

  const courses: Course[] = useMemo(
    () => [
      {
        id: 1,
        imgSrc: "/eng-img.png",
        imgAlt: "english",
        title: "English",
        badges: ["MSBHSE", "English", "8th"],
        details: ["8 Chapters", "1,235 Questions"],
        href: "/courses/msbshse/english-medium/class-8/english",
      },
      {
        id: 2,
        imgSrc: "/mar-img.png",
        imgAlt: "marathi",
        title: "Marathi",
        badges: ["MSBHSE", "English", "8th"],
        details: ["8 Chapters", "1,235 Questions"],
        href: "/courses/msbshse/english-medium/class-8/marathi",
      },
      {
        id: 3,
        imgSrc: "/hin-img.png",
        imgAlt: "hindi",
        title: "Hindi",
        badges: ["MSBHSE", "Semi", "8th"],
        details: ["8 Chapters", "1,235 Questions"],
        href: "/courses/msbshse/semi-english-medium/class-8/hindi",
      },
      {
        id: 4,
        imgSrc: "/sci-img.png",
        imgAlt: "science",
        title: "Science",
        badges: ["MSBHSE", "English", "8th"],
        details: ["8 Chapters", "1,235 Questions"],
        href: "/courses/msbshse/english-medium/class-8/science",
      },
      {
        id: 5,
        imgSrc: "/math-img.png",
        imgAlt: "maths",
        title: "Maths",
        badges: ["MSBHSE", "English", "8th"],
        details: ["8 Chapters", "1,235 Questions"],
        href: "/courses/msbshse/english-medium/class-8/maths",
      },
      {
        id: 6,
        imgSrc: "/hist-img.png",
        imgAlt: "history",
        title: "History",
        badges: ["MSBHSE", "English", "8th"],
        details: ["8 Chapters", "1,235 Questions"],
        href: "/courses/msbshse/english-medium/class-8/history",
      },
      {
        id: 7,
        imgSrc: "/geo-img.png",
        imgAlt: "geography",
        title: "Geography",
        badges: ["MSBHSE", "English", "8th"],
        details: ["8 Chapters", "1,235 Questions"],
        href: "/courses/msbshse/english-medium/class-8/geography",
      },
    ],
    []
  );

  const toggleBookmark = (id: number) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((cId) => cId !== id) : [...prev, id]
    );
  };

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const q = searchQuery.trim().toLowerCase();

      const matchesSearch =
        !q ||
        course.title.toLowerCase().includes(q) ||
        course.badges.some((b) => b.toLowerCase().includes(q));

      const matchesSubject =
        filters.subjects.length === 0 ||
        filters.subjects.includes(course.title);

      const matchesBoard =
        filters.boards.length === 0 ||
        filters.boards.some((b) => course.badges.includes(b));

      const matchesSchoolMedium =
        filters.medium.length === 0 ||
        filters.medium.some((m) => course.badges.includes(m));

      const matchesClass =
        filters.classes.length === 0 ||
        filters.classes.some((cls) => course.badges.includes(cls));

      const matchesSaved =
        !filters.featured || bookmarkedIds.includes(course.id);

      return (
        matchesSearch &&
        matchesSubject &&
        matchesBoard &&
        matchesClass &&
        matchesSchoolMedium &&
        matchesSaved
      );
    });
  }, [courses, filters, searchQuery, bookmarkedIds]);

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row gap-2 h-[97vh] w-full bg-white relative">
      {/* ---------------- Sidebar (md+) ---------------- */}
      <aside className="hidden md:block">
        <div className="sticky">
          <Filters
            filters={filters}
            onToggleFeatured={handleToggleFeatured}
            onToggleSubject={handleToggleSubject}
            onToggleBoard={handleToggleBoard}
            onToggleClass={handleToggleClass}
            onToggleSchoolMedium={handleToggleSchoolMedium}
            onReset={handleResetFilters}
          />
        </div>
      </aside>

      {/* ---------------- Slide-over (mobile) ---------------- */}
      {/* animate in/out using translate-x */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity ${
          isFiltersOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isFiltersOpen}
      >
        {/* backdrop */}
        <div
          className={`absolute inset-0 bg-black/40`}
          onClick={() => setIsFiltersOpen?.(false)}
        />
        {/* panel */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-auto max-w-full bg-white shadow-xl transform transition-transform ${
            isFiltersOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-3 overflow-auto">
            <Filters
              filters={filters}
              onToggleFeatured={handleToggleFeatured}
              onToggleSubject={handleToggleSubject}
              onToggleBoard={handleToggleBoard}
              onToggleClass={handleToggleClass}
              onToggleSchoolMedium={handleToggleSchoolMedium}
              onReset={(...args) => {
                handleResetFilters(...args);
                // optionally close drawer on reset
                setIsFiltersOpen(false);
              }}
              setIsFiltersOpen={setIsFiltersOpen}
            />
          </div>
        </div>
      </div>
      <div className="md:border border-[rgba(25,26,32,0.08)] rounded-2xl flex content-center items-center flex-[1_0_0] flex-col gap-0 h-[97.5vh] justify-center overflow-visible p-px relative">
        {/* Search bar */}
        <div className="flex content-center items-center flex-none flex-row gap-2 h-min justify-center overflow-hidden px-0 md:px-4 p-4 relative w-full">
          <div className="border-[0.5px] border-[#191a205b] bg-white rounded-lg flex content-center items-center flex-[1_0_0] flex-row gap-2.5 h-11 justify-start overflow-hidden py-3 px-2 pl-3 relative w-px">
            <div className="flex-none h-5 w-5 relative shrink-0 fill-black text-black">
              <div className="svgContainer w-full h-full aspect-[inherit]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#191a205b"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-full h-full lucide lucide-search-icon lucide-search"
                >
                  <path d="m21 21-4.34-4.34" />
                  <circle cx="11" cy="11" r="8" />
                </svg>
              </div>
            </div>
            <div className="flex-[1_0_0] h-[204%] relative w-px">
              <input
                type="text"
                placeholder="Search Courses"
                className="h-full w-full bg-transparent border-none text-[16px] leading-[1em] font-normal text-[#191a20] placeholder:text-[#191a205b] outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <button
            className="border border-[#191a205b] place-content-center justify-start items-center rounded-lg flex md:hidden flex-none flex-row gap-2 h-full overflow-visible py-2 px-4 relative no-underline w-min cursor-pointer"
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          >
            <div className="flex-none h-5 w-5 relative shrink-0 [image-rendering:pixelated] ">
              <div className="svgContainer w-full h-full aspect-[inherit]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#191a205b"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-full h-full lucide lucide-list-filter-icon lucide-list-filter"
                >
                  <path d="M2 5h20" />
                  <path d="M6 12h12" />
                  <path d="M9 19h6" />
                </svg>
              </div>
            </div>
            <div className="outline-none flex flex-col justify-start shrink-0 flex-none h-auto relative whitespace-pre w-auto">
              <p className="text-xs text-[#191a205b]">Filters</p>
            </div>
          </button>
        </div>

        {/* Course cards */}
        <div className="flex-1 overflow-y-auto w-full">
          <div className="md:p-6">
            {filteredCourses.length === 0 ? (
              <p className="text-sm text-[#5e6b64]">No courses found.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCourses.map((course) => {
                  const isBookmarked = bookmarkedIds.includes(course.id);
                  return (
                    <Link
                      href={course.href}
                      key={course.id}
                      className="bg-white rounded-lg overflow-hidden h-full flex flex-col"
                    >
                      {/* Image */}
                      <div className="relative bg-muted overflow-hidden rounded-xl">
                        <Image
                          width={512}
                          height={512}
                          src={course.imgSrc || "/placeholder.svg"}
                          alt={course.imgAlt || "Course Image"}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent flex items-end p-3 gap-2">
                          {/* example: use first class + board from badges if present */}
                          <span className="inline-block bg-white text-xs font-medium px-3 py-1 rounded">
                            {course.badges.find((b) => b.includes("th")) ||
                              "8th"}
                          </span>
                          <span className="inline-block bg-white text-xs font-medium px-3 py-1 rounded">
                            {course.badges.find((b) =>
                              ["MSBHSE", "CBSE", "ICSE"].includes(b)
                            ) || "MSBHSE"}
                          </span>
                          <span className="inline-block bg-white text-xs font-medium px-3 py-1 rounded">
                            {course.badges.find((b) =>
                              ["English", "Hindi", "Marathi", "Semi"].includes(
                                b
                              )
                            ) || "English"}
                          </span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleBookmark(course.id);
                          }}
                          className="z-10 absolute top-3 right-3 bg-white rounded-md p-2 hover:bg-muted transition-colors cursor-pointer"
                        >
                          <Bookmark
                            className={`w-5 h-5 ${
                              isBookmarked
                                ? "fill-black text-black"
                                : "text-black"
                            }`}
                          />
                        </button>
                      </div>

                      {/* Content */}
                      <div className="py-3 pl-1 flex flex-col flex-1">
                        <h3 className="text-lg font-medium text-foreground mb-2 line-clamp-2">
                          {course.title}
                        </h3>

                        <div className="flex flex-wrap gap-2 text-xs text-[#5e6b64]">
                          {course.details.map((d, idx) => (
                            <span
                              key={idx}
                              className="inline-block bg-[#f3f4f6] px-2 py-1 rounded"
                            >
                              {d}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
