// "use client";

// import { BlobProvider, PDFDownloadLink } from "@react-pdf/renderer";
// import { QuestionPaperPDF } from "./QuestionPaperPDF";

// export const PDFPreviewModal = ({
//   open,
//   onClose,
//   schoolName,
//   subject,
//   selected,
//   paperMode,
//   sectionedSelected,
//   boardParam,
//   mediumSlug,
//   classKey,
//   firebaseUid,
//   allowRoute,
//   examPatternTotalMarks,
// }: any) => {
//   if (!open) return null;

//   const selectedForPDF =
//     paperMode === "exam" ? Object.values(sectionedSelected).flat() : selected;

//   const savePaperToDB = async () => {
//     const payload = {
//       userId: firebaseUid,
//       meta: {
//         board: boardParam,
//         medium: mediumSlug,
//         classKey,
//         subjectSlug: subject.slug,
//         subjectName: subject.name,
//       },
//       schoolName,
//       paperMode,
//       questions:
//         paperMode === "exam"
//           ? Object.values(sectionedSelected).flat()
//           : selected,
//       examSections: paperMode === "exam" ? sectionedSelected : null,
//       totalMarks:
//         paperMode === "exam"
//           ? examPatternTotalMarks
//           : selected.reduce((s: any, q: any) => s + q.marks, 0),
//     };

//     const res = await fetch("/api/question-papers", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });

//     if (!res.ok) {
//       alert("Failed to save paper");
//       return;
//     }

//     const data = await res.json();
//     alert("Paper saved successfully ✅");
//   };

//   console.log("selectedForPDF", selectedForPDF);

//   return (
//     <div className="fixed inset-0 z-100 bg-black/50 backdrop-blur-sm flex items-center justify-center">
//       <div className="bg-white w-[92vw] h-[92vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
//         {/* ---------------- HEADER ---------------- */}
//         <div className="flex items-center justify-between px-4 py-3 border-b border-slate-400 bg-slate-50">
//           <div>
//             <h3 className="text-sm font-semibold text-slate-900">
//               Question Paper Preview
//             </h3>
//             <p className="text-[11px] text-slate-500">
//               Review before downloading the final PDF
//             </p>
//           </div>

//           <div className="flex items-center gap-2">
//             <PDFDownloadLink
//               document={
//                 <QuestionPaperPDF
//                   schoolName={schoolName}
//                   subject={subject}
//                   selected={selectedForPDF}
//                   paperMode={paperMode}
//                   examPatternTotalMarks={examPatternTotalMarks}
//                 />
//               }
//               fileName={`${subject.slug}-question-paper.pdf`}
//             >
//               {({ loading }) => (
//                 <button
//                   className="rounded-lg bg-emerald-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-emerald-700 disabled:opacity-60 cursor-pointer"
//                   onClick={() => {
//                     allowRoute(() => {
//                       savePaperToDB(); // ✅ routing allowed
//                     });
//                   }}
//                   disabled={loading}
//                 >
//                   {loading ? "Preparing PDF…" : "Download PDF"}
//                 </button>
//               )}
//             </PDFDownloadLink>

//             <button
//               onClick={onClose}
//               className="rounded-lg border border-slate-400 px-3 py-1.5 text-xs hover:bg-slate-100 cursor-pointer"
//             >
//               Close
//             </button>
//           </div>
//         </div>

//         {/* ---------------- VIEWER ---------------- */}
//         <div className="flex-1 bg-slate-100 p-3">
//           <div className="h-full w-full rounded-xl overflow-hidden border border-slate-400 bg-white">
//             <BlobProvider
//               document={
//                 <QuestionPaperPDF
//                   schoolName={schoolName}
//                   subject={subject}
//                   selected={selectedForPDF}
//                   paperMode={paperMode}
//                   examPatternTotalMarks={examPatternTotalMarks}
//                 />
//               }
//             >
//               {({ url, loading }) =>
//                 loading ? (
//                   <div className="flex justify-center items-center h-[80vh]">
//                     Generating preview…
//                   </div>
//                 ) : (
//                   <iframe
//                     src={`${url}#toolbar=0&navpanes=0&scrollbar=0`}
//                     className="w-full h-[80vh] rounded-xl border"
//                   />
//                 )
//               }
//             </BlobProvider>
//           </div>
//         </div>

//         {/* ---------------- FOOTER ---------------- */}
//         <div className="border-t border-slate-400 px-4 py-2 text-[11px] text-slate-500 flex justify-between">
//           <span>
//             Subject: <span className="font-medium">{subject.name}</span>
//           </span>
//           <span>
//             Total Marks:{" "}
//             <span className="font-medium">{examPatternTotalMarks}</span>
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

"use client";

import { EXAM_PATTERN_12_SCIENCE } from "@/lib/examPattern";
import { getClassLabelforPaper, ScienceSubjectKey } from "@/lib/utility/helper";
import { useEffect, useState, useCallback, useMemo } from "react";

export const PDFPreviewModal = ({
  open,
  onClose,
  paperInfo,
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

  /* ---------------- STATE ---------------- */
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const examKey = subject.slug.toLowerCase();

  // const isExamSupported =
  //   paperMode === "exam" &&
  //   ["physics", "chemistry", "biology", "mathematics-statistics"].includes(
  //     examKey,
  //   );

  const resolvedPattern = EXAM_PATTERN_12_SCIENCE[examKey as ScienceSubjectKey];

  /* ---------------- PAYLOAD ---------------- */
  const pdfPayload = useMemo(
    () => ({
      paperInfo,
      subject,
      selected: selectedForPDF,
      paperMode,
      examPatternTotalMarks,
      pattern: resolvedPattern,
    }),
    [
      paperInfo,
      subject,
      selectedForPDF,
      paperMode,
      examPatternTotalMarks,
      resolvedPattern,
    ],
  );

  /* ---------------- SAVE PAPER ---------------- */
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
      paperInfo,
      paperMode,
      questions: selectedForPDF,
      examSections: paperMode === "exam" ? sectionedSelected : null,
      totalMarks:
        paperMode === "exam"
          ? examPatternTotalMarks
          : selectedForPDF.reduce((s: number, q: any) => s + q.marks, 0),
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

    alert("Paper saved successfully ✅");
  };

  /* ---------------- PREVIEW ---------------- */
  const generatePreview = useCallback(async () => {
    setLoadingPreview(true);

    const res = await fetch("/api/export-pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pdfPayload),
    });

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return url;
    });

    setLoadingPreview(false);
  }, []);

  /* Auto regenerate preview */
  useEffect(() => {
    const t = setTimeout(() => {
      generatePreview();
    }, 600);

    return () => clearTimeout(t);
  }, [generatePreview]);

  /* ---------------- DOWNLOAD ---------------- */
  const downloadPDF = async () => {
    setDownloading(true);

    await allowRoute(async () => {
      await savePaperToDB();
    });

    const res = await fetch("/api/export-pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pdfPayload),
    });

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${subject.slug}-question-paper.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();

    URL.revokeObjectURL(url);
    setDownloading(false);
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/30 backdrop-blur-md">
      <div className="flex h-[92vh] w-[92vw] max-w-6xl flex-col overflow-hidden rounded-3xl bg-white shadow-[0_30px_80px_rgba(0,0,0,0.18)] ring-1 ring-black/5">
        {/* ---------------- HEADER ---------------- */}
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <h3 className="text-sm font-medium text-slate-900">
              Question Paper Preview
            </h3>
            <p className="text-[11px] text-slate-500">
              Review before downloading the final PDF
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={downloadPDF}
              disabled={downloading}
              className="rounded-full bg-slate-900 px-4 py-1.5 text-xs font-medium text-white hover:bg-slate-800 disabled:opacity-50 cursor-pointer"
            >
              {downloading ? "Preparing…" : "Download PDF"}
            </button>

            <button
              onClick={onClose}
              className="rounded-full px-4 py-1.5 text-xs text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

        {/* ---------------- VIEWER ---------------- */}
        <div className="flex-1 px-5 pb-5">
          <div className="h-full w-full overflow-hidden rounded-2xl bg-slate-50 ring-1 ring-black/5">
            {loadingPreview || !previewUrl ? (
              <div className="flex h-full items-center justify-center text-sm text-slate-500">
                Generating preview…
              </div>
            ) : (
              <iframe
                src={`${previewUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                className="h-full w-full rounded-2xl bg-white"
              />
            )}
          </div>
        </div>

        {/* ---------------- FOOTER ---------------- */}
        <div className="flex justify-between px-6 pb-4 text-[11px] text-slate-500">
          <span>
            <span className="font-medium text-slate-700">{subject.name}</span> •{" "}
            {boardParam.toUpperCase()} •{" "}
            {mediumSlug.charAt(0).toUpperCase() + mediumSlug.slice(1)} •{" "}
            {getClassLabelforPaper(classKey)}
          </span>
          <span>
            Total Marks:{" "}
            <span className="font-medium text-slate-700">
              {examPatternTotalMarks}
            </span>{" "}
            • Mode:{" "}
            <span className="font-medium text-slate-700 capitalize">
              {paperMode} Pattern
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};
