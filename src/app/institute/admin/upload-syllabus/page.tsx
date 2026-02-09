"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, FileText, X } from "lucide-react";
import Image from "next/image";

export default function UploadPdfPage() {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [user, setUser] = useState<any>(null);
  const [institute, setInstitute] = useState<any>(null);

  const [programId, setProgramId] = useState("");
  const [pattern, setPattern] = useState<string | "">("");
  const [semester, setSemester] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Job + AI
  const [jobId, setJobId] = useState<string | null>(null);
  const [job, setJob] = useState<any>(null);
  const [aiData, setAiData] = useState<any>(null);

  // UI states
  const [generatingAI, setGeneratingAI] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const [programQuery, setProgramQuery] = useState("");
  const [programResults, setProgramResults] = useState<any[]>([]);
  const [programLoading, setProgramLoading] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<any>(null);

  useEffect(() => {
    const fetchMe = async () => {
      const res = await fetch("/api/institute/auth/me");
      if (!res.ok) {
        router.push("/institute/login");
        return;
      }

      const data = await res.json();
      setUser(data.user);
      setInstitute(data.user.instituteId);
    };

    fetchMe();
  }, [router]);

  useEffect(() => {
    if (!programQuery || !institute?._id) {
      setProgramResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        setProgramLoading(true);

        const res = await fetch(
          `/api/institute/search/program?instituteId=${institute._id}&q=${programQuery}`,
        );

        const data = await res.json();
        setProgramResults(Array.isArray(data) ? data : []);
      } catch (err: any) {
        setProgramResults([]);
      } finally {
        setProgramLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [programQuery, institute]);

  // Fetch job when jobId is set
  useEffect(() => {
    if (!jobId) return;

    fetch(`/api/institute/admin/pdf-job/${jobId}`)
      .then((res) => res.json())
      .then((data) => {
        setJob(data);
        if (data.aiJson) {
          setAiData(data.aiJson);
        }
      })
      .catch(() => setError("Failed to load PDF job"));
  }, [jobId]);

  // Generate AI JSON once
  useEffect(() => {
    if (!jobId || !job || job.aiJson) return;

    setGeneratingAI(true);

    fetch("/api/institute/admin/ai-structure", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobId }),
    })
      .then((res) => res.json())
      .then((data) => setAiData(data))
      .catch(() => setError("AI generation failed"))
      .finally(() => setGeneratingAI(false));
  }, [jobId, job]);

  async function handleUpload() {
    setError(null);

    if (!file) return setError("Please select a PDF file");
    if (file.type !== "application/pdf")
      return setError("Only PDF files are allowed");
    if (!programId) return setError("Program is required");
    if (!pattern) return setError("Exam pattern is required");
    if (!semester) return setError("Semester is required");

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file, file.name);

      const res = await fetch("/api/institute/admin/upload-pdf", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Upload failed");

      // ✅ store jobId locally
      setJobId(data.jobId);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!jobId || !programId || !pattern || !semester || !aiData) return;

    try {
      setSaving(true);

      const res = await fetch("/api/institute/admin/save-courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId,
          programId,
          instituteId: institute._id,
          pattern,
          semester: Number(semester),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Save failed");

      alert(`✅ ${data.count} courses saved`);

      // reset flow
      setJobId(null);
      setAiData(null);
      setJob(null);
      setPreviewOpen(false);
      setFile(null);
      setProgramId("");
      setSemester("");
      setSelectedProgram(null);
      setProgramQuery("");
    } catch (err: any) {
      alert(err.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  const SEMESTERS = [
    { value: 1, label: "Semester I" },
    { value: 2, label: "Semester II" },
    { value: 3, label: "Semester III" },
    { value: 4, label: "Semester IV" },
    { value: 5, label: "Semester V" },
    { value: 6, label: "Semester VI" },
  ];

  const PATTERNS = [
    { value: "NEP-2023", label: "NEP 2023" },
    { value: "NEP-2026", label: "NEP 2026" },
  ];

  return (
    <div className="min-h-screen bg-[#F6F7F9]">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-slate-900">
              Admin Dashboard
            </h1>
            <p className="text-xs text-slate-500">Upload & manage syllabus</p>
          </div>

          {user && (
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium text-slate-900">
                  {user.name}
                </p>
                <p className="text-xs text-slate-500">{user.role}</p>
              </div>
              <div className="h-9 w-9 rounded-full bg-slate-200 flex items-center justify-center text-sm font-medium text-slate-700">
                {user.name?.[0]}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-6xl px-6 py-10">
        {/* Institute Context */}
        {institute && (
          <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex gap-4">
              <Image
                src={institute.logoUrl || "/institute-placeholder.png"}
                alt="Institute Logo"
                width={128}
                height={128}
                className="rounded-lg border border-slate-200 bg-white p-2 w-auto h-32 object-contain"
              />
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Institute
                </p>
                <h2 className="my-1 text-lg font-semibold text-slate-900 leading-tight">
                  {institute.society} <br />
                  {institute.name} {institute.description} <br />
                  {institute.location}
                </h2>

                <p className="text-sm text-slate-500">
                  {institute.abbreviation} •{" "}
                  {institute.autonomous ? "(Autonomous)" : ""}{" "}
                  {institute.affiliation}
                </p>
                <p className="text-sm text-slate-500">
                  {institute.naac &&
                    `NAAC accredited '${institute.naac}' Grade`}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Left: Form */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-8">
              <h3 className="text-lg font-semibold text-slate-900">
                Upload Syllabus
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Upload semester-wise syllabus PDF
              </p>

              {/* Program */}
              <div className="mt-6 relative">
                <label className="text-sm font-medium text-slate-700">
                  Program
                </label>

                <input
                  value={
                    selectedProgram ? selectedProgram.program : programQuery
                  }
                  onChange={(e) => {
                    setSelectedProgram(null);
                    setProgramId("");
                    setProgramQuery(e.target.value);
                  }}
                  placeholder="Search program (e.g. Botany)"
                  className="mt-2 w-full h-11 rounded-xl border border-slate-300 px-4 text-sm
                           focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />

                {(programResults.length > 0 || programLoading) &&
                  !selectedProgram && (
                    <div className="absolute z-30 mt-2 w-full rounded-xl border border-slate-200 bg-white shadow-lg max-h-60 overflow-auto">
                      {programLoading && (
                        <div className="px-4 py-3 text-sm text-slate-500">
                          Searching…
                        </div>
                      )}

                      {programResults.map((p) => (
                        <div
                          key={p._id}
                          onClick={() => {
                            setSelectedProgram(p);
                            setProgramId(p._id);
                            setProgramQuery("");
                            setProgramResults([]);
                          }}
                          className="cursor-pointer px-4 py-3 hover:bg-slate-100"
                        >
                          <div className="text-sm font-medium text-slate-900">
                            {p.degree} {p.program}
                          </div>
                          <div className="text-xs text-slate-500">
                            {p.academicLevel} • {p.stream}
                          </div>
                        </div>
                      ))}

                      {!programLoading && programResults.length === 0 && (
                        <div className="px-4 py-3 text-sm text-slate-500">
                          No programs found
                        </div>
                      )}
                    </div>
                  )}
              </div>

              <div className="flex items-center gap-4">
                {/* Pattern */}
                <div className="mt-4 w-full">
                  <label className="text-sm font-medium text-slate-700">
                    Exam Pattern
                  </label>

                  <div className="relative">
                    <select
                      value={pattern}
                      onChange={(e) => setPattern(e.target.value)}
                      className="mt-2 w-full h-11 rounded-xl border border-slate-300 px-4 pr-10 text-sm bg-white cursor-pointer appearance-none focus:outline-none focus:ring-2 focus:ring-black"
                    >
                      <option value="" disabled>
                        Select pattern
                      </option>

                      {PATTERNS.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>

                    <span className="pointer-events-none absolute inset-y-0 top-2 right-3 flex items-center">
                      <ChevronDown size={16} className="text-slate-400" />
                    </span>
                  </div>
                </div>
                {/* Semester */}
                <div className="mt-4 w-full">
                  <label className="text-sm font-medium text-slate-700">
                    Semester
                  </label>

                  <div className="relative">
                    <select
                      value={semester}
                      onChange={(e) => setSemester(Number(e.target.value))}
                      className="mt-2 w-full h-11 rounded-xl border border-slate-300 px-4 pr-10 text-sm bg-white cursor-pointer appearance-none focus:outline-none focus:ring-2 focus:ring-black"
                    >
                      <option value="" disabled>
                        Select semester
                      </option>

                      {SEMESTERS.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>

                    <span className="pointer-events-none absolute inset-y-0 top-2 right-3 flex items-center">
                      <ChevronDown size={16} className="text-slate-400" />
                    </span>
                  </div>
                </div>
              </div>

              {/* File */}
              <div className="mt-6">
                <label className="text-sm font-medium text-slate-700">
                  Syllabus PDF
                </label>

                <label
                  htmlFor="syllabus-upload"
                  className="mt-2 flex cursor-pointer items-center justify-between rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 transition hover:border-slate-400 hover:bg-slate-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-600">
                      <FileText size={16} />
                    </div>

                    <div className="text-sm">
                      {file ? (
                        <p className="font-medium text-slate-900 truncate max-w-[220px]">
                          {file.name}
                        </p>
                      ) : (
                        <p className="text-slate-600">Click to upload PDF</p>
                      )}
                      <p className="text-xs text-slate-500">
                        PDF only • Max 2MB
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-medium text-slate-600">
                    Browse
                  </span>
                </label>

                <input
                  id="syllabus-upload"
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="hidden"
                />
              </div>

              {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

              <button
                onClick={handleUpload}
                disabled={loading}
                className={`mt-8 w-full h-11 rounded-xl text-sm font-medium text-white transition cursor-pointer
                ${
                  loading
                    ? "bg-slate-400 cursor-not-allowed"
                    : "bg-black hover:bg-neutral-800"
                }`}
              >
                {loading ? "Uploading…" : "Upload & Continue"}
              </button>
            </div>
          </div>

          {/* Right: Info / Tips */}
          <div className="hidden lg:flex flex-col gap-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h4 className="text-sm font-semibold text-slate-900">
                Guidelines
              </h4>

              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>• Upload PDF files only</li>
                <li>• Semester must match program structure</li>
                <li>• File name should be clear & readable</li>
                <li>• Avoid scanned low-quality PDFs</li>
                <li>• Review AI data before saving</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 h-full flex flex-col justify-between">
              {/* Header */}
              <div>
                <h4 className="text-sm font-semibold text-slate-900">
                  Save to Database
                </h4>
                <p className="mt-1 text-xs text-slate-500">
                  Review and persist AI-generated syllabus data
                </p>
              </div>

              {/* Body */}
              <div className="mt-4 flex-1">
                {jobId ? (
                  generatingAI ? (
                    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-slate-700" />
                      <p className="text-sm text-slate-600">
                        Generating AI-structured syllabus…
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {/* Preview */}
                      <button
                        onClick={() => setPreviewOpen(true)}
                        className="w-full h-10 rounded-xl text-sm font-medium
                       border border-slate-300 bg-white
                       hover:bg-slate-50 transition cursor-pointer"
                      >
                        Show Generated Data
                      </button>

                      {/* Save */}
                      <button
                        onClick={handleSave}
                        disabled={saving || !aiData}
                        className={`w-full h-11 rounded-xl text-sm font-medium text-white transition cursor-pointer
                        ${
                          saving || !aiData
                            ? "bg-slate-400 cursor-not-allowed"
                            : "bg-black hover:bg-neutral-800"
                        }`}
                      >
                        {saving ? "Saving to Database…" : "Save to Database"}
                      </button>

                      {!aiData && (
                        <p className="text-xs text-slate-500 text-center">
                          Waiting for AI data to be ready
                        </p>
                      )}
                    </div>
                  )
                ) : (
                  <div className="rounded-xl border border-slate-300 bg-slate-50 p-4 text-center h-full flex flex-col justify-center">
                    <p className="text-sm text-slate-600 font-medium">
                      Upload a syllabus PDF to generate AI-structured data.
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      You'll be able to review and save it here.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {previewOpen && (
            <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
              <div className="w-[95vw] max-w-7xl h-[85vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
                {/* ===== Header ===== */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-300 bg-white sticky top-0 z-10">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      AI Generated Preview
                    </h3>
                    <p className="text-xs text-slate-500">
                      Review extracted content before saving
                    </p>
                  </div>

                  <button
                    onClick={() => setPreviewOpen(false)}
                    className="text-sm font-medium text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
                  >
                    <X size={16} /> <span>Close</span>
                  </button>
                </div>

                {/* ===== Content ===== */}
                <div className="flex-1 overflow-hidden px-6 py-4">
                  <div className="h-full grid grid-cols-1 lg:grid-cols-1 gap-4">
                    {/* --- Extracted Text --- */}
                    <div className="flex flex-col border border-slate-300 rounded-xl overflow-hidden">
                      <div className="px-4 py-2 border-b border-slate-300 bg-slate-50">
                        <h4 className="text-sm font-medium text-slate-700">
                          Extracted Text
                        </h4>
                      </div>

                      <div className="flex-1 overflow-auto p-4 bg-white">
                        <pre className="text-xs text-slate-700 whitespace-pre-wrap wrap-break-word w-full ">
                          {job?.extractedText}
                        </pre>
                      </div>
                    </div>

                    {/* --- AI JSON --- */}
                    {/* <div className="flex flex-col border border-slate-300 rounded-xl overflow-hidden">
                      <div className="px-4 py-2 border-b border-slate-300 bg-slate-50 flex items-center justify-between">
                        <h4 className="text-sm font-medium text-slate-700">
                          Generated JSON
                        </h4>

                        {generatingAI && (
                          <span className="text-xs text-slate-500 animate-pulse">
                            Generating…
                          </span>
                        )}
                      </div>

                      <div className="flex-1 overflow-auto p-4 bg-white">
                        {generatingAI ? (
                          <div className="flex items-center gap-3 text-sm text-slate-600">
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-slate-700" />
                            Generating AI-structured data…
                          </div>
                        ) : (
                          <pre className="text-xs font-mono text-slate-700 whitespace-pre-wrap wrap-break-word">
                            {JSON.stringify(aiData, null, 2)}
                          </pre>
                        )}
                      </div>
                    </div> */}
                  </div>
                </div>

                {/* ===== Footer ===== */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-slate-300 bg-white sticky bottom-0">
                  <p className="text-xs text-slate-500">
                    Ensure the data structure is correct before saving.
                  </p>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setPreviewOpen(false)}
                      className="px-4 py-2 rounded-xl border border-slate-300 text-sm hover:bg-slate-50 cursor-pointer"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={handleSave}
                      disabled={saving || generatingAI || !aiData}
                      className={`px-6 py-2 rounded-xl text-sm font-medium text-white transition cursor-pointer
                      ${
                        saving || generatingAI || !aiData
                          ? "bg-slate-400 cursor-not-allowed"
                          : "bg-black hover:bg-neutral-800"
                      }`}
                    >
                      {saving ? "Saving…" : "Save to Database"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
