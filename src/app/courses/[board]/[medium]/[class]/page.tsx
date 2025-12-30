/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { BOARDS } from "@/lib/boards";
import { MEDIUMS } from "@/lib/mediums";
import {
  getSubjectsFor,
  BoardSlug,
  MediumSlug,
  ClassKey,
  Subject,
} from "@/lib/subjects";
import { ChevronRight, Home } from "lucide-react";
import Sidebar from "@/components/Sidebar";

const ClassSubjectsPage: React.FC = () => {
  const params = useParams();

  const boardParam = String(params?.board || "").toLowerCase(); // "cbse"
  const mediumSegment = String(params?.medium || ""); // "english-medium"
  const classSegment = String(params?.class || "").toLowerCase(); // "class-10", "class-11-science"

  // ---------------------------------------------------------------------------
  // Resolve Board from URL
  // ---------------------------------------------------------------------------
  const board = BOARDS.find((b) =>
    b.abbreviation.toLowerCase().includes(boardParam)
  );

  if (!board) {
    return (
      <NotFoundBlock
        title="Board not found"
        message={`We couldn't find any board for "${boardParam}".`}
        href="/"
        cta="Go back home"
      />
    );
  }

  const boardSlug = resolveBoardSlug(board.abbreviation);
  if (!boardSlug) {
    return (
      <NotFoundBlock
        title="Unsupported board"
        message={`"${board.board_name}" is not yet configured in the subjects library.`}
        href="/"
        cta="Go back home"
      />
    );
  }

  // ---------------------------------------------------------------------------
  // Resolve Medium from URL (english-medium -> english)
  // ---------------------------------------------------------------------------
  let mediumSlug: string = mediumSegment.toLowerCase();
  mediumSlug = mediumSlug
    .replace(/-?medium$/, "") // remove "-medium" or "medium" suffix
    .replace(/[^a-z-]/g, ""); // keep only letters and "-"

  const medium =
    MEDIUMS.find(
      (m) =>
        m.slug === mediumSlug &&
        m.used_in_boards.some(
          (abbr) => abbr.toLowerCase() === board.abbreviation.toLowerCase()
        )
    ) || null;

  // If no specific medium found (e.g. ICSE using "all"), it's okay: getSubjectsFor will fall back.
  const mediumForLabel = medium ?? {
    medium_name: "All Mediums",
    slug: mediumSlug || "all",
  };

  const mediumSlugForSubjects = (medium?.slug ||
    mediumSlug ||
    "all") as MediumSlug;

  // ---------------------------------------------------------------------------
  // Resolve ClassKey from URL (class-10 -> "10", class-11-science -> "11-science")
  // ---------------------------------------------------------------------------
  const classKeyRaw = classSegment.replace(/^class-/, ""); // "10", "11-science"
  const classKey = classKeyRaw as ClassKey;

  const subjects = getSubjectsFor(boardSlug, mediumSlugForSubjects, classKey);

  if (!subjects || subjects.length === 0) {
    return (
      <NotFoundBlock
        title="No subjects configured"
        message={`We don't have subject data yet for ${board.abbreviation.toUpperCase()} — ${
          mediumForLabel.medium_name
        } — ${getClassLabel(classKey)}.`}
        href={`/courses/${boardParam}/${mediumSegment}`}
        cta="Back to board & medium"
      />
    );
  }

  const items = [
    { label: "Courses", href: "/courses" },
    {
      label: `${boardParam.toUpperCase()}`,
      href: `/courses/${boardParam}`,
    },
    {
      label: `${
        mediumSlug.charAt(0).toUpperCase() + mediumSlug.slice(1)
      } Medium`,
      href: `/courses/${boardParam}/${mediumSegment}`,
    },
    {
      label: getClassLabel(classKey),
      href: `/courses/${boardParam}/${mediumSegment}/${classSegment}`,
      active: true,
    },
  ];

  const totalCompulsory = subjects.filter(
    (s: Subject) => s.isCompulsory
  ).length;
  const totalElectives = subjects.length - totalCompulsory;

  return (
    <div className="flex place-content-start items-start bg-slate-50 md:bg-white flex-row gap-2 h-min overflow-hidden py-2 px-2 pl-2 md:pl-[104px] relative min-h-screen w-auto font-poppins">
      <Sidebar />

      <section className="relative flex flex-row flex-nowrap flex-[1_0_0] items-start content-start justify-center gap-14 w-px min-h-screen h-min rounded-2xl bg-slate-50 md:border border-[rgba(0,0,0,0.08)] overflow-hidden p-[56px_8px_120px] md:p-[56px_32px_32px] will-change-transform">
        <div className="w-full">
          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
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
            <div className="px-0 md:px-8 space-y-8">
              {/* Header */}
              <header className="space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center rounded-full bg-slate-900 px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-50">
                    {board.abbreviation}
                  </span>
                  <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700">
                    {board.type}
                  </span>
                  <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700">
                    {mediumForLabel.medium_name}
                  </span>
                  <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700">
                    {getClassLabel(classKey)}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900">
                  {board.board_name} — {mediumForLabel.medium_name} —{" "}
                  {getClassLabel(classKey)}
                </h1>

                <p className="max-w-3xl text-sm text-slate-600">
                  Below are the subjects usually offered for this board, medium
                  and class combination. You can connect each subject to
                  chapters, topics, notes, question banks, and videos.
                </p>
              </header>

              {/* Summary cards */}
              {/* <section className="grid gap-4 md:grid-cols-3">
                <SummaryCard
                  label="Total Subjects"
                  value={subjects.length.toString()}
                  helper="Includes compulsory + elective subjects."
                />
                <SummaryCard
                  label="Compulsory Subjects"
                  value={totalCompulsory.toString()}
                />
                <SummaryCard
                  label="Electives / Optional"
                  value={totalElectives.toString()}
                />
              </section> */}

              {/* Subjects list */}
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-base font-semibold text-slate-900">
                    Subjects for {getClassLabel(classKey)}
                  </h2>
                  <p className="text-xs text-slate-500">
                    Category tags show Language, Core, Elective, Skill and
                    streams like Science / Commerce / Arts.
                  </p>
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {subjects.map((subject) => (
                    <SubjectCard
                      key={subject.code}
                      subject={subject}
                      boardSlug={boardSlug}
                      mediumSegment={mediumSegment}
                      classKey={classKey}
                    />
                  ))}
                </div>
              </section>

              {/* Placeholder: Your course mapping */}
              {/* <section className="rounded-2xl border border-dashed border-emerald-300 bg-emerald-50/40 p-5">
                <h2 className="text-base font-semibold text-emerald-900">
                  Map Subjects to Your Courses
                </h2>
                <p className="mt-2 text-sm text-emerald-800">
                  Here you can fetch course data (chapters, topics, tests, etc.)
                  filtered by:
                </p>
                <ul className="mt-2 text-sm text-emerald-900 list-disc pl-5 space-y-1">
                  <li>
                    <code>board = &quot;{boardSlug}&quot;</code>
                  </li>
                  <li>
                    <code>medium = &quot;{mediumSlugForSubjects}&quot;</code>
                  </li>
                  <li>
                    <code>classKey = &quot;{classKey}&quot;</code>
                  </li>
                </ul>
                <p className="mt-3 text-xs text-emerald-900/80">
                  Use this as a filter in your DB query or API route to return
                  content per subject.
                </p>
              </section> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ClassSubjectsPage;

// ---------------------------------------------------------------------------
// Helper Components & Functions
// ---------------------------------------------------------------------------

const NotFoundBlock: React.FC<{
  title: string;
  message: string;
  href: string;
  cta: string;
}> = ({ title, message, href, cta }) => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
    <div className="max-w-md text-center space-y-4">
      <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
      <p className="text-sm text-slate-600">{message}</p>
      <Link
        href={href}
        className="inline-flex mt-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-slate-50 hover:bg-slate-800"
      >
        {cta}
      </Link>
    </div>
  </div>
);

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

const SubjectCard: React.FC<{
  subject: Subject;
  boardSlug: string;
  mediumSegment: string;
  classKey: string;
}> = ({ subject, boardSlug, mediumSegment, classKey }) => {
  const subjectSlug = subject.slug;

  const href = `/courses/${boardSlug}/${mediumSegment}/class-${classKey}/${subjectSlug}`;

  return (
    <Link
      href={href}
      className="
        group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white 
        p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md hover:border-emerald-300
      "
    >
      <div>
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 group-hover:text-emerald-700 transition">
              {subject.name}
            </h3>
            {subject.shortName && (
              <p className="text-xs text-slate-500">{subject.shortName}</p>
            )}
          </div>

          <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${getCategoryBadgeClass(
              subject.category
            )}`}
          >
            {getCategoryLabel(subject.category)}
          </span>
        </div>

        {subject.description && (
          <p className="mt-2 text-xs text-slate-600">{subject.description}</p>
        )}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600 border border-slate-200">
          {subject.isCompulsory ? "Compulsory" : "Elective"}
        </span>

        {subject.stream !== undefined && (
          <span className="inline-flex items-center rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-semibold text-white">
            {getStreamLabel(subject.stream ?? "all")}
          </span>
        )}

        <span className="inline-flex items-center rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-mono text-slate-700">
          {subject.code}
        </span>
      </div>
    </Link>
  );
};

// Resolve BoardSlug from abbreviation like "CBSE" or "CISCE / ICSE / ISC"
const resolveBoardSlug = (abbreviation: string): BoardSlug | null => {
  const abbr = abbreviation.toLowerCase();
  if (abbr.includes("cbse")) return "cbse";
  if (abbr.includes("msbshse") || abbr.includes("maharashtra"))
    return "msbshse";
  if (abbr.includes("icse") || abbr.includes("cisce")) return "icse";
  return null;
};

const getClassLabel = (classKey: ClassKey): string => {
  if (classKey === "8" || classKey === "9" || classKey === "10") {
    return `Class ${classKey}`;
  }

  const [std, stream] = classKey.split("-");
  const stdLabel = `Class ${std}`;
  const streamLabel = getStreamLabel(
    stream as "science" | "commerce" | "arts" | "humanities" | "all" | "none"
  );
  return `${stdLabel} — ${streamLabel}`;
};

const getStreamLabel = (
  stream: "science" | "commerce" | "arts" | "humanities" | "all" | "none"
): string => {
  switch (stream) {
    case "science":
      return "Science";
    case "commerce":
      return "Commerce";
    case "arts":
      return "Arts";
    case "humanities":
      return "Humanities";
    default:
      return "All Streams";
  }
};

const getCategoryLabel = (category: Subject["category"]): string => {
  switch (category) {
    case "language":
      return "Language";
    case "core":
      return "Core";
    case "elective":
      return "Elective";
    case "skill":
      return "Skill";
    default:
      return category;
  }
};

const getCategoryBadgeClass = (category: Subject["category"]): string => {
  switch (category) {
    case "language":
      return "bg-sky-100 text-sky-800 border border-sky-200";
    case "core":
      return "bg-emerald-100 text-emerald-800 border border-emerald-200";
    case "elective":
      return "bg-amber-100 text-amber-800 border border-amber-200";
    case "skill":
      return "bg-purple-100 text-purple-800 border border-purple-200";
    default:
      return "bg-slate-100 text-slate-800 border border-slate-200";
  }
};
