"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronDown, Plus, Trash2, X } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { auth } from "../../../../../firebase";
import { onAuthStateChanged } from "firebase/auth";

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

export default function QuestionBankPage() {
  const searchParams = useSearchParams();
  const subjectSlug = searchParams.get("subject");
  const [questions, setQuestions] = useState<any[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [chapterId, setChapterId] = useState("");
  const [loading, setLoading] = useState(true);
  const [UserData, setUserData] = useState<UserData>();
  const [meta, setMeta] = useState<{
    chapters: any[];
    taxonomySet: any[];
  }>({
    chapters: [],
    taxonomySet: [],
  });

  const [courseOutcomes, setCourseOutcomes] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [imageFile, setImageFile] = useState<File | null>(null);

  const [showAll, setShowAll] = useState(false);

  // ---------- Set Account Data ----------

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // Firebase user exists but session may be gone
      if (!user) {
        setUserData(undefined);
        setLoading(false);
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
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!chapterId) return;

    // Fetch course outcomes for the selected chapter
    const selectedChapter = meta.chapters.find((ch) => ch.id === chapterId);
    if (selectedChapter?.courseOutcomes) {
      setCourseOutcomes(selectedChapter.courseOutcomes);
    } else {
      setCourseOutcomes([]);
    }
  }, [chapterId, meta.chapters]);

  meta.taxonomySet;

  const [bank, setBank] = useState({
    title: "",
    subject: "",
    chapter: "",
  });

  const [q, setQ] = useState<any>({
    type: "",
    difficulty: "",
    marks: 1,
    text: "",
    options: ["", "", "", ""],
    answer: "",
    tags: "",
  });

  useEffect(() => {
    if (!subjectSlug) {
      setQuestions([]);
      setSelected(null);
      return;
    }

    const loadQuestions = async () => {
      try {
        const res = await fetch(`/api/subjects?subjectSlug=${subjectSlug}`);

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        data.chapters;
        setMeta(data);

        let allQuestions: any[] = [];

        if (showAll) {
          // 🔥 collect questions from ALL chapters
          allQuestions = data.chapters.flatMap((ch: any) => ch.questions || []);
        } else {
          const chapter = data.chapters.find((ch: any) => ch.id === chapterId);
          allQuestions = chapter?.questions || [];
        }

        setQuestions(allQuestions);
        setSelected(null);

        setSelected(null);
      } catch (err) {
        console.error("LOAD QUESTIONS ERROR:", err);
        setQuestions([]);
      }
    };

    loadQuestions();
  }, [subjectSlug, chapterId, showAll]);

  const addQuestion = async () => {
    if (!subjectSlug || !chapterId) {
      alert("Select subject & chapter");
      return;
    }

    const imageUrl = await uploadImage();

    const payload = {
      subjectSlug,
      chapterId,
      question: {
        ...q,
        createdBy: UserData?.firebaseUid,
        author: UserData?.name,
        imageUrl,
        id: crypto.randomUUID(),
      },
    };

    try {
      const res = await fetch("/api/subjects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed");

      setQuestions((prev) => [...prev, payload.question]);

      setQ({
        type: "",
        difficulty: "",
        marks: 1,
        text: "",
        options: ["", "", "", ""],
        answer: "",
        imageUrl: "",
        hasSubQuestions: false,
        subQuestions: [],
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      console.error(err);
      alert("Failed to save question");
    }
  };

  const deleteQuestion = async (index: number) => {
    const question = questions[index];
    if (!question) return;

    const confirmDelete = confirm("Delete this question?");
    if (!confirmDelete) return;

    try {
      const res = await fetch("/api/subjects", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subjectSlug,
          chapterId,
          questionId: question.id,
        }),
      });

      if (!res.ok) throw new Error("Delete failed");

      setQuestions((prev) => prev.filter((_, i) => i !== index));
      setSelected(null);
    } catch (err) {
      console.error("DELETE ERROR:", err);
      alert("Failed to delete question");
    }
  };

  const saveQuestionBank = async () => {
    if (!bank.title || questions.length === 0) return;

    const payload = {
      title: bank.title,
      subject: bank.subject,
      chapter: bank.chapter,
      questions,
    };

    try {
      const res = await fetch("/api/question-banks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save");

      alert("Question Bank saved successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to save question bank");
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/png", "image/jpeg"].includes(file.type)) {
      alert("Only PNG and JPG images are allowed");
      e.target.value = "";
      return;
    }

    setImageFile(file);
  };

  const uploadImage = async () => {
    if (!imageFile) return "";

    const formData = new FormData();
    formData.append("image", imageFile);

    const res = await fetch("/api/upload-question-image", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Image upload failed");
    }

    const data = await res.json();
    return data.url as string;
  };

  const groupedQuestions = questions.reduce<Record<string, any[]>>((acc, q) => {
    const type = q.type || "other";
    if (!acc[type]) acc[type] = [];
    acc[type].push(q);
    return acc;
  }, {});

  const QUESTION_TYPE_ORDER = ["mcq", "short", "long"];

  const preview = selected !== null ? questions[selected] : null;

  return (
    <div className="flex place-content-start items-start bg-white flex-row gap-2 h-min overflow-hidden py-2 px-2 pl-2 md:pl-[104px] relative min-h-screen w-auto font-poppins">
      <Sidebar />
      <div className="h-[97.5vh] flex flex-col rounded-2xl bg-slate-50 md:border border-[rgba(0,0,0,0.08)] overflow-y-auto">
        {/* ================= HEADER ================= */}
        <header className="bg-white border-b border-stone-300">
          <div className="max-w-7xl flex justify-between mx-auto px-6 pb-4 pt-8 ">
            {/* p-[56px_8px_120px] md:p-[56px_32px_32px] */}
            <h1 className="text-xl capitalize font-semibold text-stone-900 mb-4">
              {subjectSlug} Question Bank
            </h1>
            {meta.chapters && chapterId && (
              <h1 className="text-xl capitalize font-semibold text-stone-900 mb-4">
                Chapter{" "}
                {
                  meta.chapters.find((ch: any) => ch.id === chapterId)
                    .chapterNumber
                }
                . {meta.chapters.find((ch: any) => ch.id === chapterId).title}
              </h1>
            )}
            {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                className="input-field"
                placeholder="Question Bank Name"
                value={bank.title}
                onChange={(e) => setBank({ ...bank, title: e.target.value })}
              />
              <input
                className="input-field"
                placeholder="Subject"
                value={bank.subject}
                onChange={(e) => setBank({ ...bank, subject: e.target.value })}
              />
              <input
                className="input-field"
                placeholder="Chapter"
                value={bank.chapter}
                onChange={(e) => setBank({ ...bank, chapter: e.target.value })}
              />
              <button
                onClick={saveQuestionBank}
                disabled={!bank.title || questions.length === 0}
                className={`px-5 py-2 h-full rounded-lg text-sm font-medium transition
        ${
          !bank.title || questions.length === 0
            ? "bg-stone-200 text-stone-400 cursor-not-allowed"
            : "bg-stone-900 text-white hover:bg-stone-800"
        }`}
              >
                Save Bank ({questions.length})
              </button>
            </div> */}
            {/* <button
              onClick={saveQuestionBank}
              disabled={!bank.title || questions.length === 0}
              className={`px-5 py-2 h-full rounded-lg text-sm font-medium transition
        ${
          !bank.title || questions.length === 0
            ? "bg-stone-200 text-stone-400 cursor-not-allowed"
            : "bg-stone-900 text-white hover:bg-stone-800"
        }`}
            >
              Save Bank ({questions.length})
            </button> */}
          </div>
        </header>

        {/* ================= MAIN ================= */}
        <main className="flex-1 grid grid-cols-1 lg:grid-cols-6 gap-5 p-6 max-w-7xl mx-auto w-full">
          {/* ===== Question List ===== */}
          <aside className="lg:col-span-2 bg-white rounded-lg border border-stone-300">
            <div className="flex justify-between p-4 border-b border-stone-300">
              <h2 className="font-semibold text-stone-900">
                {showAll ? "All" : ""} Questions ({questions.length})
              </h2>
              {showAll ? (
                <button
                  onClick={() => {
                    setShowAll(false);
                  }}
                  className="text-xs text-blue-700 hover:underline cursor-pointer"
                >
                  <X size={14} />
                </button>
              ) : (
                <button
                  onClick={() => {
                    setShowAll(true);
                  }}
                  className="text-xs text-blue-700 hover:underline cursor-pointer"
                >
                  Show All Questions
                </button>
              )}
            </div>

            <div className="max-h-96 overflow-y-auto">
              {QUESTION_TYPE_ORDER.map((type) => {
                const items = groupedQuestions[type] || [];
                if (items.length === 0) return null;

                return (
                  <div
                    key={type}
                    className="border-b border-stone-200 last:border-0"
                  >
                    {/* TYPE HEADER */}
                    <div className="px-4 py-2 bg-stone-200/80 text-xs font-semibold text-stone-600 uppercase tracking-wide">
                      {type === "mcq"
                        ? "MCQ"
                        : type === "short"
                        ? "Short Answer"
                        : "Long Answer"}{" "}
                      ({items.length})
                    </div>

                    {/* QUESTIONS */}
                    {items.map((q, i) => {
                      const globalIndex = questions.findIndex(
                        (qq) => qq.id === q.id
                      );

                      return (
                        <button
                          key={q.id}
                          onClick={() => setSelected(globalIndex)}
                          className={`w-full text-left px-4 py-3 hover:bg-stone-50 transition-colors cursor-pointer ${
                            selected === globalIndex
                              ? "bg-stone-100 border-l-2 border-stone-900"
                              : ""
                          }`}
                        >
                          <p className="font-medium text-sm text-stone-900 truncate">
                            Q{globalIndex + 1}. {q.text || "Untitled"}
                          </p>

                          <div className="flex gap-2 text-xs text-stone-500 mt-1">
                            <span className="capitalize">{q.difficulty}</span>
                            <span>{q.marks}M</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                );
              })}

              {questions.length === 0 && (
                <p className="text-stone-400 text-sm text-center p-6">
                  No questions yet
                </p>
              )}
            </div>
          </aside>

          {/* ===== Preview ===== */}
          <section className="lg:col-span-4 bg-white rounded-lg border border-stone-300 p-6">
            {!preview ? (
              <div className="text-center py-12">
                <p className="text-stone-400 text-sm">
                  Select a question to preview
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Meta Tags */}
                <div className="flex flex-wrap gap-2">
                  {preview.type && (
                    <TagBadge>
                      {preview.type.charAt(0).toUpperCase() +
                        preview.type.slice(1)}
                    </TagBadge>
                  )}
                  {preview.difficulty && (
                    <TagBadge>
                      {preview.difficulty.charAt(0).toUpperCase() +
                        preview.difficulty.slice(1)}
                    </TagBadge>
                  )}
                  {preview.marks && <TagBadge>{preview.marks} Marks</TagBadge>}
                  {preview.courseOutcomes && (
                    <TagBadge>{preview.courseOutcomes.slice(0, 3)}</TagBadge>
                  )}
                  {preview.taxonomy && (
                    <TagBadge>{preview.taxonomy.slice(0, 3)}</TagBadge>
                  )}
                </div>

                {/* Question Text */}
                <div>
                  <p className="text-lg text-stone-900 leading-relaxed">
                    {preview.text}
                  </p>
                </div>

                {/* Options */}
                {preview.type === "mcq" && (
                  <div className="space-y-2">
                    {preview.options.map(
                      (o: string, i: number) =>
                        o && (
                          <div
                            key={i}
                            className="flex gap-3 p-2 bg-stone-50 rounded"
                          >
                            <span className="font-semibold text-stone-600 min-w-6">
                              {String.fromCharCode(65 + i)}.
                            </span>
                            <span className="text-stone-900">{o}</span>
                          </div>
                        )
                    )}
                  </div>
                )}

                {/* Sub Questions */}
                {preview.hasSubQuestions &&
                  preview.subQuestions?.length > 0 && (
                    <div className="space-y-2">
                      {preview.subQuestions.map((sq: string, i: number) => (
                        <div
                          key={i}
                          className="flex gap-3 p-2 bg-stone-50 rounded"
                        >
                          <span className="font-semibold text-stone-600 min-w-6">
                            {i + 1}.
                          </span>
                          <span className="text-stone-900">{sq}</span>
                        </div>
                      ))}
                    </div>
                  )}

                {preview.imageUrl && (
                  <div className="mt-2">
                    <img
                      src={preview.imageUrl}
                      alt="Question"
                      className="max-h-48 rounded-lg border border-stone-300"
                    />
                  </div>
                )}

                {/* Answer */}
                <div className="border-t border-stone-300 pt-4">
                  <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-2">
                    Answer / Solution
                  </p>
                  <p className="text-sm text-stone-700 leading-relaxed">
                    {preview.answer}
                  </p>
                </div>

                {/* Delete Button */}
                <div className="flex justify-between">
                  <button
                    onClick={() =>
                      selected !== null && deleteQuestion(selected)
                    }
                    className="inline-flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer"
                  >
                    <Trash2 size={16} />
                    Delete Question
                  </button>
                  {preview.author && (
                    <div className="inline-flex gap-2 justify-center items-center">
                      <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
                        Author:
                      </p>
                      <p className="text-[13px] text-stone-700 leading-relaxed">
                        {preview.author}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>
        </main>

        {/* ================= QUESTION EDITOR ================= */}
        <footer className="sticky bottom-0 bg-white border-t border-stone-300 shadow-lg">
          <div className="max-w-7xl mx-auto p-6 space-y-4">
            {/* Row 1 – Metadata */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              <div className="relative">
                <select
                  value={chapterId}
                  onChange={(e) => setChapterId(e.target.value)}
                  disabled={!meta.chapters.length}
                  className={`input-field appearance-none pr-8 w-full ${
                    !meta.chapters.length
                      ? "text-stone-300 bg-stone-100 cursor-not-allowed"
                      : !chapterId
                      ? "text-stone-400"
                      : "text-stone-900"
                  }`}
                >
                  <option value="" disabled>
                    Select Chapter
                  </option>

                  {meta.chapters.map((ch) => (
                    <option
                      key={ch.id}
                      value={ch.id}
                      className="text-stone-900"
                    >
                      Ch {ch.chapterNumber} – {ch.title}
                    </option>
                  ))}
                </select>

                {/* Custom Chevron */}
                <ChevronDown
                  size={16}
                  className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${
                    !meta.chapters.length
                      ? "text-stone-300"
                      : !chapterId
                      ? "text-stone-400"
                      : "text-stone-700"
                  }`}
                />
              </div>
              <div className="relative">
                <select
                  value={q.type || ""}
                  onChange={(e) => setQ({ ...q, type: e.target.value })}
                  className={`input-field appearance-none pr-8 w-full ${
                    !q.type ? "text-stone-400" : "text-stone-900"
                  }`}
                >
                  <option value="" disabled>
                    Question Type
                  </option>

                  <option value="mcq" className="text-stone-900">
                    MCQ
                  </option>
                  <option value="short" className="text-stone-900">
                    Short Answer
                  </option>
                  <option value="long" className="text-stone-900">
                    Long Answer
                  </option>
                </select>

                {/* Custom Chevron */}
                <ChevronDown
                  size={16}
                  className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${
                    !q.type ? "text-stone-400" : "text-stone-700"
                  }`}
                />
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500 text-sm">
                  {q.marks === 1 ? "Mark:" : "Marks:"}
                </span>

                <input
                  type="number"
                  placeholder="Marks"
                  min="1"
                  className="input-field pl-16 w-full"
                  value={q.marks}
                  onChange={(e) => setQ({ ...q, marks: +e.target.value })}
                />
              </div>
              <div className="relative">
                <select
                  value={q.difficulty || ""}
                  onChange={(e) => setQ({ ...q, difficulty: e.target.value })}
                  className={`input-field appearance-none pr-8 w-full ${
                    !q.difficulty ? "text-stone-400" : "text-stone-900"
                  }`}
                >
                  <option value="" disabled>
                    Difficulty
                  </option>

                  <option value="easy" className="text-stone-900">
                    Easy
                  </option>
                  <option value="medium" className="text-stone-900">
                    Medium
                  </option>
                  <option value="hard" className="text-stone-900">
                    Hard
                  </option>
                </select>

                {/* Custom Chevron */}
                <ChevronDown
                  size={16}
                  className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${
                    !q.difficulty ? "text-stone-400" : "text-stone-700"
                  }`}
                />
              </div>

              <div className="relative">
                <select
                  value={q.courseOutcomes || ""}
                  onChange={(e) =>
                    setQ({ ...q, courseOutcomes: e.target.value })
                  }
                  className={`input-field appearance-none pr-8 w-full ${
                    !q.courseOutcomes ? "text-stone-400" : "text-stone-900"
                  }`}
                >
                  <option value="" disabled>
                    CO Level
                  </option>

                  {courseOutcomes?.map((co) => (
                    <option key={co} value={co} className="text-stone-900">
                      {co}
                    </option>
                  ))}
                </select>

                {/* Custom Chevron */}
                <ChevronDown
                  size={16}
                  className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${
                    !q.courseOutcomes ? "text-stone-400" : "text-stone-700"
                  }`}
                />
              </div>

              <div className="relative">
                <select
                  value={q.taxonomy || ""}
                  onChange={(e) => setQ({ ...q, taxonomy: e.target.value })}
                  className={`input-field appearance-none pr-8 w-full ${
                    !q.taxonomy ? "text-stone-400" : "text-stone-900"
                  }`}
                >
                  <option value="" disabled>
                    Taxonomy
                  </option>

                  {meta.taxonomySet.map((t) => (
                    <option
                      key={t.level}
                      value={t.level}
                      className="text-stone-900"
                    >
                      {t.level} – {t.name}
                    </option>
                  ))}
                </select>

                {/* Custom Chevron */}
                <ChevronDown
                  size={16}
                  className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${
                    !q.taxonomy ? "text-stone-400" : "text-stone-700"
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Question Text */}
              <textarea
                className="input-field min-h-14 w-full"
                placeholder="Enter question text here…"
                value={q.text}
                onChange={(e) => setQ({ ...q, text: e.target.value })}
              />
              {/* Answer */}
              <textarea
                className="input-field min-h-14 w-full"
                placeholder="Answer / Solution / Explanation"
                value={q.answer}
                onChange={(e) => setQ({ ...q, answer: e.target.value })}
              />
            </div>

            <div className="flex justify-between">
              {/* Has Sub-Questions Checkbox */}
              {q.type !== "mcq" && (
                <label className="inline-flex items-center gap-2 text-sm text-stone-600 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-stone-300"
                    checked={q.hasSubQuestions || false}
                    onChange={(e) =>
                      setQ({
                        ...q,
                        hasSubQuestions: e.target.checked,
                        subQuestions: e.target.checked ? [""] : [],
                      })
                    }
                  />
                  <span>Has Sub-Questions</span>
                </label>
              )}

              <div className="space-y-1">
                <label className="text-sm font-medium text-stone-600 mr-2">
                  Question Image (optional):
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={handleImageSelect}
                  className="inline-block text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-stone-100 file:text-stone-700 hover:file:bg-stone-200 file:cursor-pointer cursor-pointer"
                />
              </div>
            </div>

            {/* MCQ Options */}
            {q.type === "mcq" && !q.hasSubQuestions && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {q.options.map((_: any, i: number) => (
                  <input
                    key={i}
                    className="input-field"
                    placeholder={`Option ${String.fromCharCode(65 + i)}`}
                    value={_}
                    onChange={(e) => {
                      const opts = [...q.options];
                      opts[i] = e.target.value;
                      setQ({ ...q, options: opts });
                    }}
                  />
                ))}
              </div>
            )}

            {/* Sub-questions */}
            {q.hasSubQuestions && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {(q.subQuestions || [""]).map((sq: string, i: number) => (
                    <div key={i} className="relative">
                      <input
                        className="input-field pr-9 w-full"
                        placeholder={`Sub-question ${i + 1}`}
                        value={sq}
                        onChange={(e) => {
                          const subs = [...(q.subQuestions || [])];
                          subs[i] = e.target.value;
                          setQ({ ...q, subQuestions: subs });
                        }}
                      />

                      {/* ❌ Remove Button */}
                      {(q.subQuestions?.length || 0) > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const subs = [...(q.subQuestions || [])];
                            subs.splice(i, 1);
                            setQ({ ...q, subQuestions: subs });
                          }}
                          className="absolute right-2 top-1/2 -translate-y-1/2
                         text-stone-400 hover:text-red-600 transition cursor-pointer"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* ➕ Add Sub-question */}
                <button
                  type="button"
                  onClick={() =>
                    setQ({
                      ...q,
                      subQuestions: [...(q.subQuestions || []), ""],
                    })
                  }
                  className="flex items-center gap-1 text-sm text-blue-700 hover:text-blue-800 transition-colors"
                >
                  <Plus size={16} />
                  Add Sub-question
                </button>
              </div>
            )}

            {/* Action Button */}
            <button
              onClick={addQuestion}
              className="w-full text-sm bg-stone-900 text-white py-3 rounded-lg font-medium hover:bg-stone-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Plus size={16} />
              Add Question to Bank
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}

/* ---------- UI Components ---------- */
function TagBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-medium">
      {children}
    </span>
  );
}
