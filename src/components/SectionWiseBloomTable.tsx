type Question = {
  bloomsLevel: string;
};

type Section = {
  subQuestions: Question[];
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
  const hasSubQuestions = (section: any) => section.subQuestions?.length > 0;

  const getBloomLabelWithInternal = (question: any) => {
    const bloom = BLOOM_LABELS[question.bloomsLevel];

    if (question.internalChoice) {
      return `${bloom}, ${bloom}`;
    }

    return bloom;
  };

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

            {sections.map((section, sectionIdx) => {
              const count = hasSubQuestions(section)
                ? section.subQuestions.length
                : section.questions.length;

              return (
                <th
                  key={sectionIdx}
                  colSpan={count}
                  className="border px-3 py-2 text-center"
                >
                  Q. {sectionIdx + 1}.
                </th>
              );
            })}
          </tr>

          {/* 🔹 Row 2: Sub-question numbers */}
          <tr>
            {sections.map((section, sectionIdx) => {
              if (hasSubQuestions(section)) {
                return section.subQuestions.map((_: any, subIdx: number) => (
                  <th
                    key={`${sectionIdx}-${subIdx}`}
                    className="border px-3 py-2 text-center font-medium"
                  >
                    {String.fromCharCode(65 + subIdx)}.
                  </th>
                ));
              }

              return section.questions.map((_: any, qIdx: number) => (
                <th
                  key={`${sectionIdx}-${qIdx}`}
                  className="border px-3 py-2 text-center font-medium"
                >
                  {String.fromCharCode(97 + qIdx)}.
                </th>
              ));
            })}
          </tr>
        </thead>

        <tbody>
          <tr>
            <th className="border px-3 py-2 text-center">
              Bloom's Taxonomy level
            </th>

            {sections.map((section, sectionIdx) => {
              if (hasSubQuestions(section)) {
                return section.subQuestions.map((sub: any, subIdx: number) => {
                  const bloomLevels = (sub.questions || [])
                    .map((q: any) => getBloomLabelWithInternal(q))
                    .join(", ");

                  return (
                    <th
                      key={`${sectionIdx}-${subIdx}`}
                      className="border px-3 py-2 text-center font-medium"
                    >
                      {bloomLevels}
                    </th>
                  );
                });
              }

              return section.questions.map((q: any, qIdx: number) => (
                <th
                  key={`${sectionIdx}-${qIdx}`}
                  className="border px-3 py-2 text-center font-medium"
                >
                  {getBloomLabelWithInternal(q)}
                </th>
              ));
            })}
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
