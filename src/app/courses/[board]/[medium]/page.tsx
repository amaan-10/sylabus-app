// src/app/courses/[board]/[medium]/page.tsx
"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { BOARDS } from "@/lib/boards";
import { MEDIUMS } from "@/lib/mediums";
import { ChevronRight, Home } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";

const CoursesByBoardMediumPage: React.FC = () => {
  const params = useParams();

  const boardParam = String(params?.board || "").toLowerCase(); // e.g. "cbse"
  // normalize incoming medium url
  let mediumParam = String(params?.medium || "").toLowerCase();

  // handle variations like: "english-medium", "semi-english-medium"
  mediumParam = mediumParam
    .replace(/-?medium$/, "") // remove "-medium" OR "medium"
    .replace(/[^a-z-]/g, ""); // clean unwanted chars

  // Find board by abbreviation (supports things like "CISCE / ICSE / ISC" too)
  const board = BOARDS.find((b) => {
    const abbr = b.abbreviation.toLowerCase();
    return abbr === boardParam || abbr.includes(boardParam);
  });

  if (!board) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="max-w-md text-center space-y-4">
          <h1 className="text-2xl font-semibold text-slate-900">
            Board not found
          </h1>
          <p className="text-sm text-slate-600">
            We couldn&apos;t find any courses for board:{" "}
            <span className="font-mono font-semibold">{boardParam}</span>.
          </p>
          <Link
            href="/"
            className="inline-flex mt-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-slate-50 hover:bg-slate-800"
          >
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  // Find medium details and make sure it is valid for this board
  const medium = MEDIUMS.find(
    (m) =>
      m.slug === mediumParam &&
      m.used_in_boards.some(
        (abbr) => abbr.toLowerCase() === board.abbreviation.toLowerCase()
      )
  );

  if (!medium) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="max-w-md text-center space-y-4">
          <h1 className="text-2xl font-semibold text-slate-900">
            Medium not available
          </h1>
          <p className="text-sm text-slate-600">
            The medium{" "}
            <span className="font-mono font-semibold">{mediumParam}</span> is
            not available for{" "}
            <span className="font-semibold">{board.board_name}</span>.
          </p>
          <Link
            href={`/boards/${encodeURIComponent(board.abbreviation)}#mediums`}
            className="inline-flex mt-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-slate-50 hover:bg-slate-800"
          >
            Choose another medium
          </Link>
        </div>
      </div>
    );
  }

  // Mediums for this board (for quick switching)
  const mediumsForBoard = MEDIUMS.filter((m) =>
    m.used_in_boards.some(
      (abbr) => abbr.toLowerCase() === board.abbreviation.toLowerCase()
    )
  );

  // Other boards that also use this medium (for horizontal jump)
  const otherBoardsForMedium = BOARDS.filter(
    (b) =>
      b.abbreviation.toLowerCase() !== board.abbreviation.toLowerCase() &&
      MEDIUMS.some(
        (m) =>
          m.slug === medium.slug &&
          m.used_in_boards.some(
            (abbr) => abbr.toLowerCase() === b.abbreviation.toLowerCase()
          )
      )
  );

  const items = [
    { label: "Courses", href: "/courses" },
    {
      label: `${boardParam.toUpperCase()}`,
      href: `/courses/${boardParam}`,
    },
    {
      label: `${
        mediumParam.charAt(0).toUpperCase() + mediumParam.slice(1)
      } Medium`,
      href: `/courses/${boardParam}/${mediumParam}`,
      active: true,
    },
  ];

  return (
    <div className="flex items-start bg-white flex-row gap-2 overflow-hidden py-2 px-2 pl-[104px] relative min-h-screen w-full font-poppins">
      <Sidebar />

      <section className="relative flex flex-row flex-nowrap flex-[1_0_0] items-start content-start justify-center gap-14 w-px min-h-screen h-min rounded-2xl bg-slate-50 border border-[rgba(0,0,0,0.08)] overflow-hidden p-[56px_32px_32px] will-change-transform">
        <div className="">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Home className="w-4 h-4" />
            {items.map((item, index) => (
              <span key={index} className="flex items-center gap-1.5">
                <ChevronRight className="w-3.5 h-3.5" />
                <a
                  href={item.href}
                  className={`hover:text-foreground transition-colors ${
                    item.active ? "text-foreground font-medium" : ""
                  }`}
                >
                  {item.label}
                </a>
              </span>
            ))}
          </nav>

          {/* Header */}
          <div className="min-h-screen py-10">
            <div className="px-4 sm:px-6 lg:px-8 space-y-8">
              {/* Header */}
              <header className="space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center rounded-full bg-slate-900 px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-50">
                    {board.abbreviation}
                  </span>
                  <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700">
                    {board.type}
                  </span>
                  <span
                    className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium"
                    style={{
                      backgroundColor: `${medium.ui.color}1A`, // light tint
                      color: medium.ui.color,
                    }}
                  >
                    <span className="text-base">{medium.ui.icon}</span>
                    {medium.medium_name}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900">
                  {board.board_name} — {medium.medium_name} Courses (8th–12th)
                </h1>

                <p className="max-w-3xl text-sm text-slate-600">
                  {medium.description}
                </p>
              </header>

              {/* Summary Cards */}
              <section className="grid gap-4 md:grid-cols-3">
                <SummaryCard
                  label="Class Range"
                  value={board.class_range}
                  helper="Courses available for middle & higher secondary."
                />
                <SummaryCard
                  label="Medium Availability"
                  value={medium.classes_available}
                  helper={`This medium is supported for ${medium.used_in_boards.join(
                    ", "
                  )}.`}
                />
                <SummaryCard
                  label="Difficulty Level"
                  value={capitalize(medium.difficulty_level)}
                  helper="Based on language and typical subject complexity."
                />
              </section>

              {/* Class Selector for this Board + Medium */}
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="text-base font-semibold text-slate-900">
                  Choose Class (8th – 12th)
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Select your class to view courses and resources for{" "}
                  {board.abbreviation} — {medium.medium_name}.
                </p>

                <div className="mt-4">
                  <ClassSelector
                    boardSlug={boardParam} // e.g. "cbse"
                    mediumSegment={String(params?.medium || "")} // e.g. "english-medium"
                  />
                </div>
              </section>

              {/* Main layout: left course info, right switching */}
              <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
                {/* Left: Subjects, rules, notes */}
                <div className="space-y-6">
                  {/* Subjects by stream */}
                  <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <h2 className="text-base font-semibold text-slate-900">
                      Subjects by Stream (8th–12th)
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">
                      Typical subjects offered in this board & medium
                      combination. Actual subjects may vary slightly per school.
                    </p>

                    <div className="mt-4 grid gap-4 md:grid-cols-3">
                      <StreamSubjectsCard
                        title="Science"
                        subjects={medium.subjects_common.science}
                      />
                      <StreamSubjectsCard
                        title="Commerce"
                        subjects={medium.subjects_common.commerce}
                      />
                      <StreamSubjectsCard
                        title="Arts / Humanities"
                        subjects={medium.subjects_common.arts}
                      />
                    </div>
                  </section>

                  {/* Exam language rules + textbooks */}
                  <section className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                      <h2 className="text-base font-semibold text-slate-900">
                        Exam Language Rules
                      </h2>
                      <ul className="mt-3 space-y-2 text-sm text-slate-700 list-disc pl-5">
                        {medium.exam_language_rules.map((rule) => (
                          <li key={rule}>{rule}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                      <h2 className="text-base font-semibold text-slate-900">
                        Official Textbooks
                      </h2>
                      <p className="mt-3 text-sm text-slate-700">
                        <span className="font-medium text-slate-800">
                          Primary source:
                        </span>{" "}
                        {medium.official_textbook_source}
                      </p>
                      <p className="mt-2 text-xs text-slate-500">
                        You can connect this with your internal database of
                        books, PDFs, or question papers for this medium.
                      </p>
                    </div>
                  </section>

                  {/* Notes */}
                  <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <h2 className="text-base font-semibold text-slate-900">
                      Important Notes for {medium.medium_name}
                    </h2>
                    <ul className="mt-3 space-y-2 text-sm text-slate-700 list-disc pl-5">
                      {medium.notes.map((note) => (
                        <li key={note}>{note}</li>
                      ))}
                    </ul>
                  </section>

                  {/* Placeholder: hook your course data here */}
                  <section className="rounded-2xl border border-dashed border-emerald-300 bg-emerald-50/40 p-5">
                    <h2 className="text-base font-semibold text-emerald-900">
                      Your Courses / Content Area
                    </h2>
                    <p className="mt-2 text-sm text-emerald-800">
                      Here you can list:
                    </p>
                    <ul className="mt-2 text-sm text-emerald-900 list-disc pl-5 space-y-1">
                      <li>
                        Class-wise courses for {board.abbreviation} (
                        {medium.slug})
                      </li>
                      <li>Chapters, topics, and question banks</li>
                      <li>Video lessons / PDFs / notes per class</li>
                    </ul>
                    <p className="mt-3 text-xs text-emerald-900/80">
                      Hook this section to your `/api/courses` or database query
                      filtered by{" "}
                      <code>board=&quot;{board.abbreviation}&quot;</code> and{" "}
                      <code>medium=&quot;{medium.slug}&quot;</code>.
                    </p>
                  </section>
                </div>

                {/* Right: Switch medium/board */}
                <aside className="space-y-4">
                  {/* Switch medium within this board */}
                  <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm text-sm text-slate-700">
                    <h2 className="text-base font-semibold text-slate-900">
                      Switch Medium (Same Board)
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">
                      Quickly change medium for {board.abbreviation}.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {mediumsForBoard.map((m) => {
                        // const active = m.slug === medium.slug;
                        const baseUrl = `/courses/${encodeURIComponent(
                          boardParam
                        )}/${m.slug}`;
                        return (
                          <Link
                            key={mediumsForBoard.indexOf(m)}
                            href={baseUrl}
                            className="group w-full sm:w-40 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition overflow-hidden hover:-translate-y-1 active:scale-[0.97]"
                          >
                            <div className="flex flex-col items-center p-4 space-y-3">
                              <div className="h-14 w-14 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden group-hover:bg-emerald-50 transition">
                                {medium ? (
                                  <Image
                                    width={36}
                                    height={36}
                                    src={`/mediums/${m.slug}-med.png`}
                                    alt={m.medium_name}
                                    className="h-full w-full object-contain"
                                  />
                                ) : (
                                  <span className="text-2xl">📘</span>
                                )}
                              </div>

                              <p className="text-sm font-semibold text-slate-800 group-hover:text-emerald-700 transition">
                                {m.medium_name}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </section>

                  {/* Other boards with same medium */}
                  {otherBoardsForMedium.length > 0 && (
                    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm text-sm text-slate-700">
                      <h2 className="text-base font-semibold text-slate-900">
                        Same Medium in Other Boards
                      </h2>
                      <p className="mt-1 text-xs text-slate-500">
                        Explore how {medium.medium_name} looks in other boards.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-5">
                        {otherBoardsForMedium.map((b) => {
                          const targetBoardParam = b.abbreviation.toLowerCase();
                          const url = `/courses/${encodeURIComponent(
                            targetBoardParam
                          )}/${medium.slug}`;
                          return (
                            <Link
                              key={otherBoardsForMedium.indexOf(b)}
                              href={url}
                            >
                              <div className="group w-full sm:w-40 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition overflow-hidden hover:-translate-y-1 active:scale-[0.97]">
                                <div className="flex flex-col items-center space-y-3">
                                  <div className="h-full w-full rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden group-hover:bg-emerald-50 transition">
                                    {board ? (
                                      <Image
                                        width={360}
                                        height={360}
                                        src={`/boards/${b.abbreviation.toLowerCase()}.jpg`}
                                        alt={b.abbreviation}
                                        className="h-full w-full object-contain"
                                      />
                                    ) : (
                                      <span className="text-2xl">📘</span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <p className="text-sm pt-2 pl-2 w-full sm:w-40 font-semibold text-slate-800 group-hover:text-emerald-700 transition">
                                {b.abbreviation} - {b.board_name}
                              </p>
                            </Link>
                          );
                        })}
                      </div>
                    </section>
                  )}

                  {/* Link back to board overview */}
                  <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm text-sm text-slate-700">
                    <h2 className="text-base font-semibold text-slate-900">
                      Board Overview
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">
                      View grading, evaluation system, exams and more for this
                      board.
                    </p>
                    <Link
                      href={`/boards/${encodeURIComponent(board.abbreviation)}`}
                      className="mt-3 inline-flex rounded-full bg-slate-900 px-4 py-1.5 text-xs font-medium text-slate-50 hover:bg-slate-800"
                    >
                      Go to board page
                    </Link>
                  </section>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CoursesByBoardMediumPage;

// ------------ Small Helper Components ------------

const SummaryCard: React.FC<{
  label: string;
  value: string;
  helper?: string;
}> = ({ label, value, helper }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
      {label}
    </p>
    <p className="mt-1 text-lg font-semibold text-slate-900">{value}</p>
    {helper && <p className="mt-1 text-xs text-slate-500">{helper}</p>}
  </div>
);

const StreamSubjectsCard: React.FC<{ title: string; subjects: string[] }> = ({
  title,
  subjects,
}) => (
  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
    <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
    {subjects.length === 0 ? (
      <p className="mt-2 text-xs text-slate-500">Not commonly offered.</p>
    ) : (
      <ul className="mt-2 flex flex-wrap gap-1.5">
        {subjects.map((subject) => (
          <li
            key={subject}
            className="inline-flex items-center rounded-full bg-white px-2 py-0.5 text-xs text-slate-700 shadow-sm"
          >
            {subject}
          </li>
        ))}
      </ul>
    )}
  </div>
);

const capitalize = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);

const CLASS_SELECTOR_GRID =
  "grid gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5";

type ClassOption = {
  label: string; // what user sees
  value: string; // what goes into the URL (class-<value>)
};

const ClassSelector: React.FC<{
  boardSlug: string; // URL segment like "cbse", "msbshse", "icse"
  mediumSegment: string; // URL segment like "english-medium", "hindi-medium"
}> = ({ boardSlug, mediumSegment }) => {
  // Normalize board
  const normalizedBoard = boardSlug.toLowerCase().replace(/[^a-z]/g, "");

  // Derive medium slug from URL segment ("english-medium" -> "english")
  let mediumSlug = mediumSegment.toLowerCase();
  mediumSlug = mediumSlug
    .replace(/-?medium$/, "") // remove "-medium" or "medium" suffix
    .replace(/[^a-z-]/g, ""); // keep only letters and "-"

  const options = getClassOptionsForBoardAndMedium(normalizedBoard, mediumSlug);

  return (
    <div className={CLASS_SELECTOR_GRID}>
      {options.map((opt) => (
        <Link
          key={opt.value}
          href={`/courses/${encodeURIComponent(
            normalizedBoard
          )}/${encodeURIComponent(mediumSegment)}/class-${opt.value}`}
          className="group flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 px-4 py-5 text-sm font-medium text-slate-800 shadow-sm transition hover:-translate-y-1 hover:border-emerald-300 hover:bg-emerald-50 hover:shadow-md active:scale-[0.97]"
        >
          <span className="text-xs uppercase tracking-wide text-slate-500">
            Class
          </span>
          <span className="mt-1 text-sm font-semibold text-slate-900 group-hover:text-emerald-700 text-center">
            {opt.label}
          </span>
        </Link>
      ))}
    </div>
  );
};

const getClassOptionsForBoardAndMedium = (
  board: string,
  medium: string
): ClassOption[] => {
  const isCBSE = board.includes("cbse");
  const isMSBSHSE = board.includes("msbshse");
  const isICSE = board.includes("icse") || board.includes("cisce");

  // Helper for simple classes: 8th, 9th, 10th etc
  const basic = (n: number): ClassOption => ({
    label: `${n}th`,
    value: `${n}`,
  });

  // ----------------- ICSE (All Mediums) -----------------
  if (isICSE) {
    // 8th, 9th, 10th
    return [8, 9, 10].map(basic);
  }

  // ----------------- MSBSHSE (All Mediums) -----------------
  if (isMSBSHSE) {
    // 8, 9, 10 + 11/12 with Arts / Commerce / Science
    return [
      basic(8),
      basic(9),
      basic(10),
      { label: "11th Arts", value: "11-arts" },
      { label: "11th Commerce", value: "11-commerce" },
      { label: "11th Science", value: "11-science" },
      { label: "12th Arts", value: "12-arts" },
      { label: "12th Commerce", value: "12-commerce" },
      { label: "12th Science", value: "12-science" },
    ];
  }

  // ----------------- CBSE -----------------
  if (isCBSE) {
    // CBSE English: 8,9,10 + 11/12 Humanities, Commerce, Science
    if (medium === "english") {
      return [
        basic(8),
        basic(9),
        basic(10),
        { label: "11th Humanities", value: "11-humanities" },
        { label: "11th Commerce", value: "11-commerce" },
        { label: "11th Science", value: "11-science" },
        { label: "12th Humanities", value: "12-humanities" },
        { label: "12th Commerce", value: "12-commerce" },
        { label: "12th Science", value: "12-science" },
      ];
    }

    // CBSE Hindi: 8, 9, 10 only
    if (medium === "hindi") {
      return [8, 9, 10].map(basic);
    }
  }

  // ----------------- Fallback (other boards) -----------------
  return [8, 9, 10, 11, 12].map(basic);
};
