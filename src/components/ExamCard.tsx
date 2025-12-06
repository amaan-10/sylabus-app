import { EducationBoard } from "@/lib/boards";

const ExamCard: React.FC<{
  title: string;
  exam: EducationBoard["examinations"]["class_10"];
}> = ({ title, exam }) => (
  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm">
    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
      {title}
    </p>
    <p className="mt-1 text-sm font-semibold text-slate-900">
      {exam.name}{" "}
      <span className="text-xs font-normal text-slate-500">
        ({exam.full_form})
      </span>
    </p>
    <p className="mt-2 text-xs text-slate-600">
      <span className="font-semibold text-slate-700">Exam Months:</span>{" "}
      {exam.exam_months.join(", ")}
    </p>
    <p className="mt-1 text-xs text-slate-600">
      <span className="font-semibold text-slate-700">Results:</span>{" "}
      {exam.result_month}
    </p>
  </div>
);
export default ExamCard;
