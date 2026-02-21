"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import LoaderWrapper from "@/components/PageLoader";
import { useLeaveGuard } from "@/hook/useLeaveGuard";
import { PDFPreviewModal } from "@/components/course/PDFPreviewModal";

type Question = any;
type PaperMode = "exam" | "custom";
type SectionedSelection = Record<string, Question[]>;
type DialogData = {
  schoolName: string;
  className: string;
  subjectName: string;
  testName: string;
  examDate: string;
  time: number;
  includeInstructions: boolean;
  logo?: string;
  watermark: string;
};

const SavedPaperDetailPage = () => {
  const { paperId } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [paper, setPaper] = useState<any>(null);
  const [subject, setSubject] = useState<any>(null);
  const [selected, setSelected] = useState<Question[]>([]);
  const [paperMode, setPaperMode] = useState<PaperMode>("custom");
  const [sectionedSelected, setSectionedSelected] =
    useState<SectionedSelection>({});
  const today = new Date().toISOString().split("T")[0];

  const [paperInfo, setPaperInfo] = useState<DialogData>({
    schoolName: "",
    className: "",
    subjectName: "",
    testName: "",
    examDate: today,
    includeInstructions: true,
    logo: "",
    watermark: "",
    time: 0,
  });
  const [previewOpen, setPreviewOpen] = useState(true);

  useEffect(() => {
    if (!paperId) return;
    const loadPaper = async () => {
      try {
        const res = await fetch(`/api/question-papers/${paperId}`);
        if (!res.ok) {
          alert("Failed to load paper");
          router.push("/generated-papers");
          return;
        }

        const data = await res.json();
        const p = data.paper;

        setPaper(p);
        setSubject({
          slug: p.meta.subjectSlug,
          name: p.meta.subjectName,
        });
        setPaperMode(p.paperMode);
        setPaperInfo(p.paperInfo);
        setSelected(p.questions || []);
        setSectionedSelected(p.examSections || {});
      } catch (err) {
        console.error("Failed to load generated paper", err);
      } finally {
        setLoading(false);
      }
    };

    loadPaper();
  }, [paperId, router]);

  const shouldBlock = previewOpen ? false : selected.length > 0;

  const {
    showDialog: showLeaveDialog,
    confirmLeave,
    cancelLeave,
    allowRoute,
  } = useLeaveGuard(shouldBlock);

  const selectedForPDF =
    paperMode === "exam" ? Object.values(sectionedSelected).flat() : selected;

  return (
    <div className="flex place-content-start items-start bg-white flex-row gap-2 h-min overflow-hidden py-2 px-2 pl-[104px] relative min-h-screen w-auto font-poppins">
      <Sidebar />
      <LoaderWrapper isLoading={loading}>
        <section className="border border-[rgba(0,0,0,0.08)] bg-white rounded-2xl flex place-content-between justify-center items-center flex-[1_0_0] flex-col h-[97.5vh] overflow-hidden pt-14 px-8 pb-8 relative w-full gap-5">
          <div className="min-h-screen w-full px-4 py-6">
            <div className="max-w-7xl mx-auto space-y-4">
              {/* ---------- PDF Preview ---------- */}
              {paper && subject && (
                <PDFPreviewModal
                  open={previewOpen}
                  onClose={() => {
                    setPreviewOpen(false);
                    router.push("/generated-papers");
                  }}
                  paperInfo={paperInfo}
                  subject={subject}
                  selected={selected}
                  paperMode={paperMode}
                  sectionedSelected={sectionedSelected}
                  boardParam={paper.meta.board}
                  mediumSlug={paper.meta.medium}
                  classKey={paper.meta.classKey}
                  firebaseUid={paper.userId}
                  allowRoute={allowRoute}
                  examPatternTotalMarks={paper.totalMarks}
                />
              )}
            </div>
          </div>
        </section>
      </LoaderWrapper>
    </div>
  );
};

export default SavedPaperDetailPage;
