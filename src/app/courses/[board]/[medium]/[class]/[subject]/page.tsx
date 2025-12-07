/* eslint-disable react-hooks/rules-of-hooks */
// src/app/courses/[board]/[medium]/[class]/[subject]/page.tsx
"use client";

import React, { useState } from "react";
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
import { getChaptersFor, Chapter, Question } from "@/lib/chapters";
import Sidebar from "@/components/Sidebar";
import { ChevronRight, Home } from "lucide-react";

const SubjectChaptersPage: React.FC = () => {
  const params = useParams();

  const boardParam = String(params?.board || "").toLowerCase(); // "cbse"
  const mediumSegment = String(params?.medium || ""); // "english-medium"
  const classSegment = String(params?.class || "").toLowerCase(); // "class-10", "class-12-science"
  const subjectSegment = String(params?.subject || "").toLowerCase(); // "science", "physics", etc.

  // ---------------------------------------------------------------------------
  // Resolve Board
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
        message={`"${board.board_name}" is not yet configured in the subjects/chapters library.`}
        href="/"
        cta="Go back home"
      />
    );
  }

  // ---------------------------------------------------------------------------
  // Resolve Medium from URL (english-medium -> "english")
  // ---------------------------------------------------------------------------
  let mediumSlug: string = mediumSegment.toLowerCase();
  mediumSlug = mediumSlug
    .replace(/-?medium$/, "") // remove "-medium" or "medium"
    .replace(/[^a-z-]/g, ""); // letters and "-"

  const medium =
    MEDIUMS.find(
      (m) =>
        m.slug === mediumSlug &&
        m.used_in_boards.some(
          (abbr) => abbr.toLowerCase() === board.abbreviation.toLowerCase()
        )
    ) || null;

  const mediumSlugForSubjects = (mediumSlug || "english") as MediumSlug;
  const mediumLabel = medium?.medium_name || "All Mediums";

  // ---------------------------------------------------------------------------
  // Resolve ClassKey from URL (class-10 -> "10", class-12-science -> "12-science")
  // ---------------------------------------------------------------------------
  const rawClassKey = classSegment.replace(/^class-/, "");
  const classKey = rawClassKey as ClassKey;

  // ---------------------------------------------------------------------------
  // Find subject from subjects library for this combination
  // ---------------------------------------------------------------------------
  const subjectsForCombo = getSubjectsFor(
    boardSlug,
    mediumSlugForSubjects,
    classKey
  );

  const subject =
    subjectsForCombo.find(
      (s) => s.slug.toLowerCase() === subjectSegment.toLowerCase()
    ) || null;

  if (!subject) {
    return (
      <NotFoundBlock
        title="Subject not found"
        message={`We couldn't find subject "${subjectSegment}" for ${board.abbreviation.toUpperCase()} — ${mediumLabel} — ${getClassLabel(
          classKey
        )}.`}
        href={`/courses/${boardParam}/${mediumSegment}`}
        cta="Back to courses"
      />
    );
  }

  // ---------------------------------------------------------------------------
  // Get chapters for this subject
  // ---------------------------------------------------------------------------
  const chapters = getChaptersFor(
    boardSlug,
    mediumSlugForSubjects,
    classKey,
    subject.slug
  );

  if (!chapters || chapters.length === 0) {
    return (
      <NotFoundBlock
        title="No chapters configured"
        message={`We don't yet have chapter data for ${
          subject.name
        } (${board.abbreviation.toUpperCase()}, ${mediumLabel}, ${getClassLabel(
          classKey
        )}).`}
        href={`/courses/${boardParam}/${mediumSegment}/class-${rawClassKey}`}
        cta="Back to class subjects"
      />
    );
  }

  const totalChapters = chapters.length;
  const totalQuestions = chapters.reduce(
    (sum, ch) => sum + ch.questions.length,
    0
  );

  const [openChapterId, setOpenChapterId] = useState<string | null>(
    chapters[0]?.id || null
  );

  const handleToggleChapter = (id: string) => {
    setOpenChapterId((prev) => (prev === id ? null : id));
  };

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
    },
    {
      label: subject.name,
      href: `/courses/${boardParam}/${mediumSegment}/${classSegment}/${subject.slug}`,
      active: true,
    },
  ];

  return (
    <div className="flex items-start bg-white flex-row gap-2 overflow-hidden py-2 px-2 pl-[104px] relative min-h-screen w-full font-poppins">
      <Sidebar />

      <section className="relative flex flex-row flex-nowrap flex-[1_0_0] items-start content-start justify-center gap-14 w-px min-h-screen h-min rounded-2xl bg-slate-50 border border-[rgba(0,0,0,0.08)] overflow-hidden p-[56px_32px_32px] will-change-transform">
        <div className="w-full">
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
                  <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700">
                    {mediumLabel}
                  </span>
                  <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700">
                    {getClassLabel(classKey)}
                  </span>
                  <span className="inline-flex items-center rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800">
                    {subject.name}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900">
                  {subject.name} — {board.board_name} ({getClassLabel(classKey)}
                  )
                </h1>

                <p className="max-w-3xl text-sm text-slate-600">
                  Explore all chapters and questions for this subject. Each
                  chapter can include theory, practice questions, and exam-style
                  problems that you can connect to your learning content.
                </p>
              </header>

              {/* Summary cards */}
              <section className="grid gap-4 md:grid-cols-3">
                <SummaryCard
                  label="Total Chapters"
                  value={totalChapters.toString()}
                />
                <SummaryCard
                  label="Total Questions"
                  value={totalQuestions.toString()}
                />
                <SummaryCard
                  label="Subject Type"
                  value={getCategoryLabel(subject.category)}
                  helper={
                    subject.isCompulsory
                      ? "Compulsory subject"
                      : "Elective subject"
                  }
                />
              </section>

              {/* Chapters Accordion */}
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <h2 className="text-base font-semibold text-slate-900">
                    Chapters & Questions
                  </h2>
                  <p className="text-xs text-slate-500">
                    Click on a chapter to view its description and questions.
                  </p>
                </div>

                <div className="mt-4 space-y-3">
                  {chapters.map((chapter) => {
                    const isOpen = chapter.id === openChapterId;
                    return (
                      <ChapterAccordionItem
                        key={chapter.id}
                        chapter={chapter}
                        isOpen={isOpen}
                        onToggle={() => handleToggleChapter(chapter.id)}
                      />
                    );
                  })}
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SubjectChaptersPage;

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

// Accordion item for a chapter
const ChapterAccordionItem: React.FC<{
  chapter: Chapter;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ chapter, isOpen, onToggle }) => {
  const totalQuestions = chapter.questions.length;

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-slate-800 hover:bg-slate-100 transition"
      >
        <div className="flex flex-col gap-0.5">
          <span className="text-[11px] uppercase tracking-wide text-slate-500">
            Chapter {chapter.chapterNumber}
          </span>
          <span>{chapter.title}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] rounded-full bg-white px-2 py-0.5 text-slate-600 border border-slate-200">
            {totalQuestions} Questions
          </span>
          <span
            className={`inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 bg-white text-xs transition-transform ${
              isOpen ? "rotate-90" : ""
            }`}
          >
            ▸
          </span>
        </div>
      </button>

      {isOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 text-sm text-slate-700 space-y-4">
          {/* Chapter meta */}
          {(chapter.description ||
            chapter.topics ||
            chapter.learningObjectives) && (
            <div className="space-y-2">
              {chapter.description && (
                <p className="text-xs text-slate-600">{chapter.description}</p>
              )}

              {chapter.topics && chapter.topics.length > 0 && (
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    Topics
                  </p>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {chapter.topics.map((topic) => (
                      <span
                        key={topic}
                        className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-700"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {chapter.learningObjectives &&
                chapter.learningObjectives.length > 0 && (
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                      Learning Objectives
                    </p>
                    <ul className="mt-1 list-disc pl-5 text-xs text-slate-600 space-y-1">
                      {chapter.learningObjectives.map((obj) => (
                        <li key={obj}>{obj}</li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>
          )}

          {/* Questions */}
          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Questions
            </p>
            {chapter.questions.length === 0 ? (
              <p className="text-xs text-slate-500">
                No questions added for this chapter yet.
              </p>
            ) : (
              <div className="space-y-3">
                {chapter.questions.map((q) => (
                  <QuestionCard key={q.id} question={q} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const QuestionCard: React.FC<{ question: Question }> = ({ question }) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700">
      <div className="flex items-start justify-between gap-2">
        <p className="font-medium">{question.text}</p>
        <div className="flex flex-col items-end gap-1">
          <span className="inline-flex items-center rounded-full bg-white px-2 py-0.5 text-[10px] font-medium text-slate-600 border border-slate-200">
            {getQuestionTypeLabel(question.type)}
          </span>
          <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-800 border border-emerald-200">
            {question.marks} marks • {capitalize(question.difficulty)}
          </span>
        </div>
      </div>

      {question.options && question.options.length > 0 && (
        <ul className="mt-2 list-disc pl-5 space-y-1">
          {question.options.map((opt, idx) => (
            <li key={idx}>{opt}</li>
          ))}
        </ul>
      )}

      {question.answer && (
        <p className="mt-2 text-[11px] text-slate-700">
          <span className="font-semibold">Answer:</span> {question.answer}
        </p>
      )}

      {question.explanation && (
        <p className="mt-1 text-[11px] text-slate-500">
          <span className="font-semibold">Explanation:</span>{" "}
          {question.explanation}
        </p>
      )}

      {question.tags && question.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {question.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full bg-white px-2 py-0.5 text-[10px] text-slate-500 border border-slate-200"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

// ----------------------- Utility functions -----------------------

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
    stream as "science" | "commerce" | "arts" | "humanities" | "all"
  );
  return `${stdLabel} — ${streamLabel}`;
};

const getStreamLabel = (
  stream: "science" | "commerce" | "arts" | "humanities" | "all"
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

const getQuestionTypeLabel = (type: Question["type"]): string => {
  switch (type) {
    case "mcq":
      return "MCQ";
    case "short":
      return "Short Answer";
    case "long":
      return "Long Answer";
    case "true-false":
      return "True / False";
    case "fill":
      return "Fill in the Blanks";
    default:
      return type;
  }
};

const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);
