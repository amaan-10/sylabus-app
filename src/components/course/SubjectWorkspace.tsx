"use client";

import { ChevronRight, Home } from "lucide-react";
import {
  Chapter,
  getClassLabel,
  prettifyType,
  QuestionSource,
  ScienceSubjectKey,
} from "@/lib/utility/helper";
import { ChapterSkeleton } from "./ChapterSkeleton";
import { EXAM_PATTERN_12_SCIENCE } from "@/lib/examPattern";
import { Section } from "@/models/for-sylabus-app/subjectQuestionBank";

interface SubjectWorkspaceProps {
  items?: any[];
  draftName?: string;
  board: any;
  classKey: any;
  mediumLabel: any;
  subject: any;
  questionSource: string;
  setQuestionSource: React.Dispatch<React.SetStateAction<QuestionSource>>;
  activeContainers: Chapter[] | Section[];
  openContainerId: any;
  loading: boolean;
  handleToggleContainer: (id: string) => void;
  questionTypes: any;
  handleOpenQuestionType: (
    label: string,
    marks: number,
    chapterSlug: string,
    chapterTitle?: string,
    chapterNumber?: number,
  ) => void;
}

export function SubjectWorkspace({
  items,
  draftName,
  board,
  classKey,
  mediumLabel,
  subject,
  questionSource,
  setQuestionSource,
  activeContainers,
  openContainerId,
  loading,
  handleToggleContainer,
  questionTypes,
  handleOpenQuestionType,
}: SubjectWorkspaceProps) {
  const isLanguageSubject = ["english", "hindi", "marathi"].includes(
    subject.name.toLowerCase(),
  );

  const examKey = subject.slug.toLowerCase() as ScienceSubjectKey;
  const languageSections = EXAM_PATTERN_12_SCIENCE[examKey]?.sections ?? [];

  return (
    <section className="relative flex flex-row flex-nowrap flex-[1_0_0] items-start content-start justify-center gap-14 w-px min-h-screen h-min rounded-2xl bg-slate-50 md:border border-[rgba(0,0,0,0.08)] overflow-hidden p-[40px_8px_120px] md:p-[40px_32px_32px] will-change-transform">
      <div className="w-full">
        {/* Breadcrumb */}
        {items && (
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
        )}
        {draftName && (
          <h1 className="px-0 md:px-8 text-2xl font-semibold text-slate-900">
            {draftName}
          </h1>
        )}

        {/* Header */}
        <div className="min-h-screen py-10">
          <div className="px-0 md:px-8 space-y-8">
            <header className="space-y-3">
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
                {subject.name} - {board.abbreviation} ({getClassLabel(classKey)}
                )
              </h1>

              <p className="max-w-3xl text-sm text-slate-600">
                Explore chapters and open question-type lists. While viewing
                questions you can select ones you want and assemble a question
                paper using the Paper Builder (panel on the right).
              </p>
            </header>

            {/* Tabs */}
            <div className="inline-flex rounded-full bg-slate-200 p-1 text-xs font-medium cursor-pointer">
              <button
                type="button"
                onClick={() => setQuestionSource("balbharati")}
                className={`px-3 py-1 rounded-full transition cursor-pointer ${
                  questionSource === "balbharati"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Balbharati / Textbook
              </button>
              <button
                type="button"
                onClick={() => setQuestionSource("pyq")}
                className={`px-3 py-1 rounded-full transition cursor-pointer ${
                  questionSource === "pyq"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Previous Year Questions
              </button>
            </div>

            {/* Chapters Accordion */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <h2 className="text-base font-semibold text-slate-900">
                  {isLanguageSubject ? "Paper Sections" : "Chapters"}
                </h2>
                <p className="text-xs text-slate-500">
                  Select questions to add them to the paper.
                </p>
              </div>

              <div className="mt-4 space-y-3">
                {loading ? (
                  <ChapterSkeleton />
                ) : (
                  <>
                    {activeContainers?.map((container: any) => {
                      const isOpen = container.id === openContainerId;

                      return (
                        <div key={container.id}>
                          {/* Optional Math headers (chapters only) */}
                          {!isLanguageSubject &&
                            container.id === "ms-12-maths1-ch1" && (
                              <div className="text-base font-medium pl-3 pb-2">
                                Mathematics & Statistics 1
                              </div>
                            )}
                          {!isLanguageSubject &&
                            container.id === "ms-12-maths2-ch1" && (
                              <div className="text-base font-medium pl-3 pt-4 pb-2">
                                Mathematics & Statistics 2
                              </div>
                            )}

                          <div className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden">
                            <button
                              type="button"
                              onClick={() => {
                                handleToggleContainer(container.id);
                              }}
                              className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-slate-800 hover:bg-slate-100 transition cursor-pointer"
                            >
                              <div className="flex flex-col gap-0.5">
                                <span className="text-[11px] uppercase tracking-wide text-slate-500">
                                  {isLanguageSubject
                                    ? container.title // Section title
                                    : `Chapter ${container.chapterNumber}`}
                                </span>
                                <span>{container.title}</span>
                              </div>

                              <span
                                className={`inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 bg-white text-xs transition-transform ${
                                  isOpen ? "rotate-90" : ""
                                }`}
                              >
                                ▸
                              </span>
                            </button>

                            {isOpen && (
                              <div className="border-t border-slate-200 bg-white px-4 py-4 text-sm text-slate-700 space-y-4">
                                {/* Description (chapter or section) */}
                                {container.description && (
                                  <p className="text-xs text-slate-600">
                                    {container.description}
                                  </p>
                                )}

                                {/* Question types */}
                                <div className="space-y-2">
                                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                                    Practice by Question Type (
                                    {questionSource === "balbharati"
                                      ? "Textbook"
                                      : "PYQ"}
                                    )
                                  </p>

                                  <div className="space-y-2 mt-1">
                                    {questionTypes.map((type: any) => (
                                      <button
                                        key={type.key}
                                        onClick={() =>
                                          handleOpenQuestionType(
                                            type.label,
                                            type.marks,
                                            container.slug,
                                            container.title,
                                            container.chapterNumber,
                                          )
                                        }
                                        className="group flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 shadow-sm transition-all hover:-translate-y-px hover:border-emerald-300 hover:bg-emerald-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-200 cursor-pointer"
                                      >
                                        <div className="flex flex-col items-start">
                                          <span className="font-medium leading-tight">
                                            {prettifyType(type.label)}
                                          </span>
                                          <span className="mt-0.5 text-xs text-slate-500">
                                            {type.marks} Marks
                                          </span>
                                        </div>

                                        <div className="flex items-center gap-1 text-xs font-medium text-emerald-600">
                                          <span className="opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0">
                                            Open
                                          </span>
                                          <span className="text-base leading-none">
                                            →
                                          </span>
                                        </div>
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
