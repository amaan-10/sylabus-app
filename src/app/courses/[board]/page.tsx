// src/app/courses/[board]/page.tsx
"use client";

import React from "react";
import { useParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { ChevronRight, Home } from "lucide-react";
import Image from "next/image";
import { BOARDS, EducationBoard } from "@/lib/boards";
import StreamCard from "@/components/StreamCard";
import ExamCard from "@/components/ExamCard";
import Link from "next/link";

const BoardDetailsPage = () => {
  const params = useParams<{ board: string }>();
  const boardName = params?.board ?? "";

  const board = BOARDS.find(
    (b) => b.abbreviation.toUpperCase() === boardName.toUpperCase()
  );

  if (!board) {
    // If board not found, you can use Next.js notFound()
    // or show a custom message
    // notFound(); // (uncomment if you have a 404 page)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="max-w-md text-center space-y-4">
          <h1 className="text-2xl font-semibold text-slate-900">
            Board not found
          </h1>
          <p className="text-slate-600">
            We couldn&apos;t find any board with abbreviation{" "}
            <span className="font-mono font-semibold">
              {boardName.toUpperCase()}
            </span>
            .
          </p>
        </div>
      </div>
    );
  }

  const formattedBoardName = boardName
    .toString()
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const items = [
    { label: "Courses", href: "/courses" },
    {
      label: `${formattedBoardName.toUpperCase()}`,
      href: `/courses/${boardName}`,
      active: true,
    },
  ];

  return (
    <div className="flex place-content-start items-start bg-slate-50 md:bg-white flex-row gap-2 h-min overflow-hidden py-2 px-2 pl-2 md:pl-[104px] relative min-h-screen w-auto font-poppins">
      <Sidebar />

      <section className="relative flex flex-row flex-nowrap flex-[1_0_0] items-start content-start justify-center gap-14 w-px min-h-screen h-min rounded-2xl bg-slate-50 md:border border-[rgba(0,0,0,0.08)] overflow-hidden p-[56px_8px_120px] md:p-[56px_32px_32px] will-change-transform">
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

          <div className="min-h-screen py-10">
            <div className="md:px-8 space-y-8">
              {/* Header */}
              <header className="space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center rounded-full bg-slate-900 px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-50">
                    {board.abbreviation}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-slate-200 px-3 py-1 text-xs font-medium text-slate-700">
                    {board.type}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900">
                  {board.board_name}
                </h1>
                <p className="text-sm text-slate-600">
                  Established in {board.established_year} • Headquarters:{" "}
                  <span className="font-medium">{board.headquarters}</span>
                </p>
                <a
                  href={board.official_website}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex text-sm font-medium text-emerald-700 hover:text-emerald-800 hover:underline"
                >
                  Visit official website
                </a>
              </header>

              {/* Top Stats */}
              <section className="grid gap-4 md:grid-cols-3">
                <div className="col-span-2">
                  <MediumSelector board={board} />
                </div>
                <div className="rounded-2xl col-span-2 md:col-span-1 border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Class Range
                  </p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">
                    {board.class_range}
                  </p>
                </div>

                {/* <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Mediums of Instruction
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {board.mediums.map((medium) => (
                      <span
                        key={medium}
                        className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-800"
                      >
                        {medium}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Affiliated Schools
                  </p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">
                    {board.additional_details.total_schools_affiliated.toLocaleString()}
                    +
                  </p>
                  {board.additional_details.international_presence && (
                    <p className="mt-1 text-xs text-slate-600">
                      Presence in{" "}
                      <span className="font-medium">
                        {board.additional_details.international_presence}
                      </span>{" "}
                      countries
                    </p>
                  )}
                </div> */}
              </section>

              {/* Medium Selector + Other Boards */}

              <section
                id="mediums"
                className="grid gap-6 lg:grid-cols-[2fr,1fr]"
              >
                <OtherBoardsList currentAbbreviation={board.abbreviation} />
              </section>

              {/* Layout: Left details + Right exams */}
              <div className="grid gap-6 lg:grid-cols-3">
                {/* Left Column */}
                <div className="space-y-6 lg:col-span-2">
                  {/* Streams */}
                  <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <h2 className="text-base font-semibold text-slate-900">
                      Streams & Subjects (Class 11–12)
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">
                      Typical subjects offered in each stream may vary slightly
                      by school.
                    </p>

                    <div className="mt-4 grid gap-4 md:grid-cols-3">
                      <StreamCard
                        title="Science"
                        subjects={board.streams_for_class_11_12.science}
                      />
                      <StreamCard
                        title="Commerce"
                        subjects={board.streams_for_class_11_12.commerce}
                      />
                      <StreamCard
                        title="Arts / Humanities"
                        subjects={board.streams_for_class_11_12.arts}
                      />
                    </div>
                  </section>

                  {/* Grading & Evaluation */}
                  <section className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                      <h2 className="text-base font-semibold text-slate-900">
                        Grading Pattern
                      </h2>
                      <dl className="mt-3 space-y-2 text-sm text-slate-700">
                        <div>
                          <dt className="font-medium text-slate-600">Type</dt>
                          <dd>{board.grading_pattern.type}</dd>
                        </div>
                        {board.grading_pattern.passing_percentage !==
                          undefined && (
                          <div>
                            <dt className="font-medium text-slate-600">
                              Passing Percentage
                            </dt>
                            <dd>{board.grading_pattern.passing_percentage}%</dd>
                          </div>
                        )}
                        {board.grading_pattern.passing_grade && (
                          <div>
                            <dt className="font-medium text-slate-600">
                              Passing Grade
                            </dt>
                            <dd>{board.grading_pattern.passing_grade}</dd>
                          </div>
                        )}
                        {board.grading_pattern.grades &&
                          board.grading_pattern.grades.length > 0 && (
                            <div>
                              <dt className="font-medium text-slate-600">
                                Grade Scale
                              </dt>
                              <dd>{board.grading_pattern.grades.join(", ")}</dd>
                            </div>
                          )}
                        {board.grading_pattern.additional_grace_rules &&
                          board.grading_pattern.additional_grace_rules.length >
                            0 && (
                            <div>
                              <dt className="font-medium text-slate-600">
                                Grace Rules
                              </dt>
                              <dd className="text-xs text-slate-600">
                                {board.grading_pattern.additional_grace_rules.join(
                                  "; "
                                )}
                              </dd>
                            </div>
                          )}
                      </dl>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                      <h2 className="text-base font-semibold text-slate-900">
                        Evaluation System
                      </h2>
                      <dl className="mt-3 space-y-2 text-sm text-slate-700">
                        {board.evaluation_system.theory_weightage !==
                          undefined && (
                          <div>
                            <dt className="font-medium text-slate-600">
                              Theory Weightage
                            </dt>
                            <dd>{board.evaluation_system.theory_weightage}%</dd>
                          </div>
                        )}
                        {board.evaluation_system.internal_weightage !==
                          undefined && (
                          <div>
                            <dt className="font-medium text-slate-600">
                              Internal / Internal Assessment
                            </dt>
                            <dd>
                              {board.evaluation_system.internal_weightage}%
                            </dd>
                          </div>
                        )}
                        {board.evaluation_system.internal_assessment && (
                          <div>
                            <dt className="font-medium text-slate-600">
                              Internal Assessment
                            </dt>
                            <dd>
                              {board.evaluation_system.internal_assessment}
                            </dd>
                          </div>
                        )}
                        {board.evaluation_system.practical_weightage && (
                          <div>
                            <dt className="font-medium text-slate-600">
                              Practical Weightage
                            </dt>
                            <dd className="text-xs text-slate-700">
                              {Object.entries(
                                board.evaluation_system.practical_weightage
                              )
                                .map(
                                  ([key, value]) =>
                                    `${key[0].toUpperCase() + key.slice(1)}: ${
                                      value as number
                                    }%`
                                )
                                .join(" • ")}
                            </dd>
                          </div>
                        )}
                        {board.evaluation_system.projects && (
                          <div>
                            <dt className="font-medium text-slate-600">
                              Projects
                            </dt>
                            <dd className="text-xs text-slate-700">
                              {board.evaluation_system.projects.join(" • ")}
                            </dd>
                          </div>
                        )}
                        {board.evaluation_system.project_work && (
                          <div>
                            <dt className="font-medium text-slate-600">
                              Project Work
                            </dt>
                            <dd className="text-xs text-slate-700">
                              {board.evaluation_system.project_work}
                            </dd>
                          </div>
                        )}
                        {board.evaluation_system.practicals && (
                          <div>
                            <dt className="font-medium text-slate-600">
                              Practicals
                            </dt>
                            <dd className="text-xs text-slate-700">
                              {board.evaluation_system.practicals}
                            </dd>
                          </div>
                        )}
                      </dl>
                    </div>
                  </section>
                </div>

                {/* Right Column – Exams */}
                <aside className="space-y-4">
                  <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <h2 className="text-base font-semibold text-slate-900">
                      Key Examinations
                    </h2>
                    <div className="mt-4 space-y-4">
                      <ExamCard
                        title="Class 10 Board Exam"
                        exam={board.examinations.class_10}
                      />
                      <ExamCard
                        title="Class 12 Board Exam"
                        exam={board.examinations.class_12}
                      />
                    </div>
                  </section>

                  <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm text-sm text-slate-700">
                    <h2 className="text-base font-semibold text-slate-900">
                      Recognition & Authority
                    </h2>
                    <ul className="mt-2 space-y-1 list-disc pl-5">
                      {board.recognized_by.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
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

export default BoardDetailsPage;

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .concat("-medium");

// Medium selector component
const MediumSelector: React.FC<{ board: EducationBoard }> = ({ board }) => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-base font-semibold text-slate-900">Choose Medium</h2>
      <p className="mt-1 text-xs text-slate-500">
        Select the medium to view content and structure specific to that
        language.
      </p>
      <div className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3">
        {board.mediums.slice(0, 3).map((medium) => (
          <Link
            key={medium}
            href={`/courses/${encodeURIComponent(
              board.abbreviation.toLowerCase()
            )}/${slugify(medium)}`}
            className="group rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition overflow-hidden hover:-translate-y-1 active:scale-[0.97]"
          >
            <div className="flex flex-col items-center p-4 space-y-3">
              <div className="h-14 w-14 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden group-hover:bg-emerald-50 transition">
                <Image
                  width={36}
                  height={36}
                  src={`/mediums/${medium.toLowerCase()}-med.png`}
                  alt={medium}
                  className="h-full w-full object-contain"
                />
              </div>

              <p className="text-sm font-semibold text-slate-800 group-hover:text-emerald-700 transition">
                {medium}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

// Other boards component
const OtherBoardsList: React.FC<{ currentAbbreviation: string }> = ({
  currentAbbreviation,
}) => {
  const otherBoards = BOARDS.filter(
    (b) => b.abbreviation !== currentAbbreviation
  );

  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-base font-semibold text-slate-900">
        Explore Other Boards
      </h2>
      <p className="mt-1 text-xs text-slate-500">
        Jump to medium selection for another board.
      </p>
      <div className="mt-4 grid grid-cols-2 gap-4 w-fit">
        {otherBoards.map((board) => (
          <Link
            key={board.abbreviation}
            href={`/courses/${encodeURIComponent(
              board.abbreviation.toLowerCase()
            )}`}
          >
            <div className="group w-full sm:w-40 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition overflow-hidden hover:-translate-y-1 active:scale-[0.97]">
              <div className="flex flex-col items-center space-y-3">
                <div className="h-full w-full rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden group-hover:bg-emerald-50 transition">
                  {board ? (
                    <Image
                      width={360}
                      height={360}
                      src={`/boards/${board.abbreviation.toLowerCase()}.jpg`}
                      alt={board.abbreviation}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <span className="text-2xl">📘</span>
                  )}
                </div>
              </div>
            </div>
            <p className="text-sm pt-2 pl-2 w-full sm:w-40 font-semibold text-slate-800 group-hover:text-emerald-700 transition">
              {board.abbreviation} - {board.board_name}
            </p>
          </Link>
        ))}
      </div>
    </aside>
  );
};
