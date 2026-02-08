type Question = {
  bloomsLevel: string;
};

type Section = {
  sectionTitle: string;
  questions: Question[];
};

type Props = {
  sections: Section[];
};

const BLOOM_ORDER = [
  "Remember",
  "Understand",
  "Apply",
  "Analyze",
  "Evaluate",
  "Create",
];

const BLOOM_LABELS: Record<string, string> = {
  Remember: "R1",
  Understand: "U2",
  Apply: "A3",
  Analyze: "A4",
  Evaluate: "E5",
  Create: "C6",
};

export default function SectionWiseBloomTable({ sections }: Props) {
  console.log("sections: ", sections);

  return (
    <div className="mt-8 overflow-x-auto overflow-y-hidden">
      <h3 className="text-lg font-semibold mb-4">
        Bloom’s Taxonomy Distribution
      </h3>

      <table className="w-full border-collapse border border-slate-300 text-sm">
        <thead>
          {/* 🔹 Row 1: Section headings */}
          <tr>
            <th rowSpan={2} className="border px-3 py-2 text-center">
              Questions
            </th>

            {sections.map((section, sectionIdx) => (
              <th
                key={sectionIdx}
                colSpan={section.questions.length}
                className="border px-3 py-2 text-center"
              >
                Q. {sectionIdx + 1}.
              </th>
            ))}
          </tr>

          {/* 🔹 Row 2: Sub-question numbers */}
          <tr>
            {/* <th className="border px-3 py-2 text-center">Q.No.</th> */}

            {sections.map((section, sectionIdx) =>
              section.questions.map((_, qIdx) => (
                <th
                  key={`${sectionIdx}-${qIdx}`}
                  className="border px-3 py-2 text-center font-medium"
                >
                  {String.fromCharCode(97 + qIdx)}.
                </th>
              )),
            )}
          </tr>
        </thead>

        <tbody>
          <tr>
            <th className="border px-3 py-2 text-center">
              Bloom's Taxonomy level
            </th>

            {sections.map((section, sectionIdx) =>
              section.questions.map((q, qIdx) => (
                <th
                  key={`${sectionIdx}-${qIdx}`}
                  className="border px-3 py-2 text-center font-medium"
                >
                  {BLOOM_LABELS[q.bloomsLevel]}.
                </th>
              )),
            )}
          </tr>
        </tbody>
      </table>

      {/* Legend */}
      <div className="mt-3 text-xs text-slate-600">
        {BLOOM_ORDER.map((b) => (
          <span key={b} className="mr-4">
            <b>{b}</b>: {BLOOM_LABELS[b]}
          </span>
        ))}
      </div>
    </div>
  );
}
