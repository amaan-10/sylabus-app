"use client";

import { BlobProvider, PDFDownloadLink } from "@react-pdf/renderer";
import { QuestionPaperPDF } from "./QuestionPaperPDF";

export const PDFPreviewModal = ({
  open,
  onClose,
  schoolName,
  subject,
  selected,
  paperMode,
  sectionedSelected,
  boardParam,
  mediumSlug,
  classKey,
  firebaseUid,
  allowRoute,
  examPatternTotalMarks,
}: any) => {
  if (!open) return null;

  const selectedForPDF =
    paperMode === "exam" ? Object.values(sectionedSelected).flat() : selected;

  const savePaperToDB = async () => {
    const payload = {
      userId: firebaseUid,
      meta: {
        board: boardParam,
        medium: mediumSlug,
        classKey,
        subjectSlug: subject.slug,
        subjectName: subject.name,
      },
      schoolName,
      paperMode,
      questions:
        paperMode === "exam"
          ? Object.values(sectionedSelected).flat()
          : selected,
      examSections: paperMode === "exam" ? sectionedSelected : null,
      totalMarks:
        paperMode === "exam"
          ? examPatternTotalMarks
          : selected.reduce((s: any, q: any) => s + q.marks, 0),
    };

    const res = await fetch("/api/question-papers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      alert("Failed to save paper");
      return;
    }

    const data = await res.json();
    alert("Paper saved successfully ✅");
  };

  return (
    <div className="fixed inset-0 z-100 bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white w-[92vw] h-[92vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* ---------------- HEADER ---------------- */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-400 bg-slate-50">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Question Paper Preview
            </h3>
            <p className="text-[11px] text-slate-500">
              Review before downloading the final PDF
            </p>
          </div>

          <div className="flex items-center gap-2">
            <PDFDownloadLink
              document={
                <QuestionPaperPDF
                  schoolName={schoolName}
                  subject={subject}
                  selected={selectedForPDF}
                  paperMode={paperMode}
                  examPatternTotalMarks={examPatternTotalMarks}
                />
              }
              fileName={`${subject.slug}-question-paper.pdf`}
            >
              {({ loading }) => (
                <button
                  className="rounded-lg bg-emerald-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-emerald-700 disabled:opacity-60 cursor-pointer"
                  onClick={() => {
                    allowRoute(() => {
                      savePaperToDB(); // ✅ routing allowed
                    });
                  }}
                  disabled={loading}
                >
                  {loading ? "Preparing PDF…" : "Download PDF"}
                </button>
              )}
            </PDFDownloadLink>

            <button
              onClick={onClose}
              className="rounded-lg border border-slate-400 px-3 py-1.5 text-xs hover:bg-slate-100 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

        {/* ---------------- VIEWER ---------------- */}
        <div className="flex-1 bg-slate-100 p-3">
          <div className="h-full w-full rounded-xl overflow-hidden border border-slate-400 bg-white">
            <BlobProvider
              document={
                <QuestionPaperPDF
                  schoolName={schoolName}
                  subject={subject}
                  selected={selectedForPDF}
                  paperMode={paperMode}
                  examPatternTotalMarks={examPatternTotalMarks}
                />
              }
            >
              {({ url, loading }) =>
                loading ? (
                  <div className="flex justify-center items-center h-[80vh]">
                    Generating preview…
                  </div>
                ) : (
                  <iframe
                    src={`${url}#toolbar=0&navpanes=0&scrollbar=0`}
                    className="w-full h-[80vh] rounded-xl border"
                  />
                )
              }
            </BlobProvider>
          </div>
        </div>

        {/* ---------------- FOOTER ---------------- */}
        <div className="border-t border-slate-400 px-4 py-2 text-[11px] text-slate-500 flex justify-between">
          <span>
            Subject: <span className="font-medium">{subject.name}</span>
          </span>
          <span>
            Total Marks:{" "}
            <span className="font-medium">{examPatternTotalMarks}</span>
          </span>
        </div>
      </div>
    </div>
  );
};
