import { parseMath } from "@/lib/math/parseMath";

/* ---------- HELPERS ---------- */

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function renderMathHtml(text: string) {
  const parts = parseMath(text);

  return parts
    .map((p) =>
      p.type === "text"
        ? escapeHtml(p.content)
        : p.display
          ? `\\[${p.content}\\]`
          : `\\(${p.content}\\)`,
    )
    .join("");
}

const prettifyType = (t?: string): string => {
  if (!t) return "";

  const map: Record<string, string> = {
    mcq: "MCQ",
    "multiple choice": "MCQ",
    "multiple choice questions": "MCQ",
    short: "Short answer",
    "short-1": "Short answer 1",
    "short-2": "Short answer 2",
    "very-short": "Very short answer",
    "very short": "Very short answer",
    long: "Long answer",
    numerical: "Numerical problems",
    diagram: "Diagram based questions",
    reasoning: "Give reason",
    "fill in the blanks": "Fill in the blanks",
    "match the following": "Match the following",
    "complete the table": "Complete the table",
    "short notes": "Short notes",
    "label the diagram": "Label the diagram",
  };

  const key = t.toLowerCase().trim();

  return (
    map[key] ||
    key.replace(/[_-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
  );
};

const toRoman = (n: number) => {
  const romans = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x"];
  return romans[n] || `${n + 1}`;
};

function numberToWords(n: number) {
  const words = [
    "Zero",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
    "Twenty",
  ];
  return words[n] || n.toString();
}

function pluralize(word: string, count: number) {
  return count === 1 ? word : word + "s";
}

function buildSectionInstructions(sections: any[]) {
  const grouped: Record<string, any[]> = {};

  // group by section title (A, B, C...)
  sections.forEach((s) => {
    if (!grouped[s.title]) grouped[s.title] = [];
    grouped[s.title].push(s);
  });

  return Object.entries(grouped)
    .map(([title, items]) => {
      const body = items
        .map((s) => {
          const totalText = numberToWords(s.total);
          const marksText = numberToWords(s.marks);
          const attempt =
            s.total !== s.attemptAny
              ? ` (Attempt <b>any ${numberToWords(s.attemptAny)}</b>)`
              : "";

          return `
            <p>
              Contains <b>${totalText} ${s.type === "MCQ" ? "multiple choice" : s.type === "Short answer 1" || s.type === "Short answer 2" ? "short answer" : s.type.toLowerCase()} type</b>
              ${pluralize("question", s.total)}
              carrying <b>${marksText} ${s.marks === 1 ? "mark" : "marks"}</b> each.${attempt}
            </p>
          `;
        })
        .join("");

      return `
        <li>
          <div class="section-info">
            <div class="section-label">${title} :</div>
            <div class="section-body">
              ${body}
            </div>
          </div>
        </li>
      `;
    })
    .join("");
}

/* ---------- MAIN BUILDER ---------- */

export function buildHtmlPaper({
  paperInfo,
  subject,
  selected,
  paperMode,
  examPatternTotalMarks,
  pattern,
}: any) {
  let questionCounter = 1;

  const isExam = paperMode === "exam" && Array.isArray(pattern?.sections);
  console.log("paperInfo", paperInfo);

  const formatTime = (minutes: number) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hrs === 0) return `${mins} Min`;
    if (mins === 0) return `${hrs} Hrs.`;

    return `${hrs} Hrs. ${mins} Min`;
  };

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const groupedByType = selected.reduce((acc: any, q: any) => {
    if (!acc[q.type]) acc[q.type] = [];
    acc[q.type].push(q);
    return acc;
  }, {});

  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />

<!-- MathJax -->
<script>
window.MathJax = {
  tex: {
    inlineMath: [['\\\\(', '\\\\)']],
    displayMath: [['\\\\[', '\\\\]']],
  },
  options: { enableMenu: false }
};
</script>
<script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js"></script>
<script>
function isMultiLine(el) {
  const range = document.createRange();
  range.selectNodeContents(el);

  const rects = range.getClientRects();

  // If more than 1 rect → text wrapped into multiple lines
  return rects.length > 1;
}

function adjustOptionsGrid() {
  document.querySelectorAll(".options").forEach(function(optionsEl) {
    const optionEls = optionsEl.querySelectorAll(".option");

    let forceSingleColumn = false;

    optionEls.forEach(function(option) {
      if (isMultiLine(option)) {
        forceSingleColumn = true;
      }
    });

    if (forceSingleColumn) {
      optionsEl.classList.add("single-column");
    }
  });
}
</script>

<script>
MathJax.typesetPromise().then(function () {
  adjustOptionsGrid();
});
</script>



<style>

body {
  font-family: "Times New Roman", serif;
  font-size: 14pt;
}

.header {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
}

.center { text-align: center; }
.bold { font-weight: bold; }
.semi { font-weight: 500; }

h1 {
  font-size: 20pt;
  margin: 10px 0 4px;
}

h2 {
  font-size: 18pt;
  margin: 0;
}

h3 {
  font-size: 16pt;
  margin: 0;
}

.meta {
  display: flex;
  justify-content: space-between;
  margin: 8px 0;
  font-weight: bold;
}

.note {
  margin: 10px 0;
  padding: 10px;
  border: none;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
  font-style: italic;
}

/* CSS (exam/paper style) */
.section-info {
  display: grid;
  grid-template-columns: auto 1fr;   /* label column + flexible body column */
  column-gap: 12px;                  /* space between label and body */
  align-items: start;

  padding: 4px 0;

  font-family: "Times New Roman", serif;
  font-size: 18px;
  font-style: italic;               /* whole block italic */
}

/* label (left column) */
.section-label {
  font-weight: bold;
  font-style: italic;                /* keep label italic as well */
  /* slightly reduce whitespace after colon if needed */
  padding-right: 4px;
  white-space: nowrap;               /* keep "Section A :" on one line */
}

/* body (right column) */
.section-body p {
  margin: 0;
  padding-bottom: 4px;                     /* spacing similar to your image */
}

/* emphasize words inside body while keeping italics */
.section-body b {
  font-weight: 700;
  font-style: italic;                /* stays italic but bolder */
}


.section-title {
  text-align: center;
  font-size: 20pt;
  font-weight: bold;
  margin: 20px 0;
}

.question { display: flex; align-items: flex-start; }

.question-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 18px;
}

/* LEFT SIDE */
/* Question layout */
.question-left {
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 10px;
  align-items: start;
}

/* Question number */
.q-no {
  white-space: nowrap;
  align-self: start;
  line-height: 1.6;
}

/* 🔥 applied only when display math exists */
.q-no.has-display-math {
  margin-top: 20px;   /* tweak: 6–10px depending on font */
}


/* Text block */
.q-text {
  position: relative;
  left: 68px;
  margin-left: -50px;
  line-height: 1.6;
}

.marks {
  position: absolute;
  right: 0px;
}

.options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px 20px;
  margin-left: 16%;
  margin-bottom: 16px;
}

.options.single-column {
  grid-template-columns: 1fr;
}

.option {
  font-family: "Times New Roman", serif;
  font-size: 18px;
  line-height: 1.5;
  white-space: normal;
  word-break: break-word;
  margin-bottom: 8px;
  display: inline-flex;
    align-items: center;
}

/* ---------- WATERMARK ---------- */
.watermark {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-30deg);
  font-size: 80px;
  color: rgba(0, 0, 0, 0.1);
  z-index: 0;
  pointer-events: none;
  white-space: nowrap;
}

.page-content {
  position: relative;
  z-index: 1;
}

.end {
  margin-top: 16px;
  text-align: center;
  font-size: 18pt;
  font-weight: bold;
}
</style>
</head>

<body>
<!-- WATERMARK -->
${
  paperInfo.watermark
    ? `
    <div class="watermark">
      ${paperInfo.watermark}
    </div>
  `
    : ""
}

  <div class="page-content">


${
  paperInfo.logo || paperInfo.schoolName
    ? `
  <div style="
    display:flex;
    align-items:center;
    justify-content:center;
    gap:12px;
    margin-bottom:6px;
    ${paperInfo.logo ? "height:42px;" : "height:100%;"}
  ">
    ${
      paperInfo.logo
        ? `
      <img
        src="${baseUrl}${paperInfo.logo}"
        style="height:42px; object-fit:contain;"
      />
    `
        : ""
    }
    ${
      paperInfo.schoolName
        ? `
      <span style="font-size:18pt; font-weight:bold; display:flex; align-self:center; justify-self:center; height:100%;">
        ${paperInfo.schoolName}
      </span>
    `
        : ""
    }
  </div>
`
    : ""
}
  ${paperInfo.testName ? `<h2 class="center bold">${paperInfo.testName}</h1>` : ""}
  ${paperInfo.subjectName ? `<h2 class="center">${paperInfo.subjectName.toUpperCase()}</h2>` : ""}

  <div class="meta">
    ${paperInfo.className ? `<span>Class : ${paperInfo.className}</span>` : ""}
    ${paperInfo.examDate ? `<span>Date : ${paperInfo.examDate.split("-").reverse().join("/")}</span>` : ""}
  </div>

  <div class="meta">
    <span>Time : ${paperInfo.time ? formatTime(paperInfo.time) : "2 Hrs."}</span>
    <span>Max. Marks : ${
      isExam
        ? examPatternTotalMarks
        : selected.reduce((s: number, q: any) => s + q.marks, 0)
    }</span>
  </div>

  ${
    paperInfo.includeInstructions
      ? `
              <div class="note">
                <b>General Instructions :</b>
                <ol type="i">
                ${
                  isExam
                    ? `
                  <li>The question paper is divided into the following sections.</li>

                  <ol type="a">
                    ${buildSectionInstructions(pattern.sections)}
                  </ol>
                  `
                    : ``
                }

                  <li>Use of log table is allowed. Calculator is <b>not</b> allowed.</li>
                  <li>The numbers to the right of the questions indicate full marks.</li>
                  <li>In case of MCQs, only the <b>first attempt</b> will be evaluated.</li>
                </ol>
              </div>

      `
      : ""
  }

${
  isExam
    ? pattern.sections
        .map((sec: any) => {
          const qs = selected.filter(
            (q: any) =>
              prettifyType(q.examSectionType) === sec.type &&
              q.marks === sec.marks,
          );

          if (!qs.length) return "";

          const isMCQ = sec.key === "A1";
          const isVeryShort = sec.key === "A2";
          const showTitle = sec.key !== "A2";

          let html = "";

          if (showTitle) {
            html += `<div class="section-title">${sec.title}</div>`;
          }

          if (sec.key === "B" || sec.key === "C") {
            html += `
              <div class="question-row">
                <span>
                  <span class="bold" style="margin-left: 62px;">
                    Attempt any EIGHT of the following questions :
                  </span>
                </span>
                <div class="bold">[${sec.marks * sec.attemptAny}]</div>
              </div>
            `;
          }

          if (sec.key === "D") {
            html += `
              <div class="question-row">
                <span>
                  <span class="bold" style="margin-left: 62px;">
                    Attempt any FIVE of the following questions :
                  </span>
                </span>
                <div class="bold">[${sec.marks * sec.attemptAny}]</div>
              </div>
            `;
          }

          /* ---- MCQ ---- */
          if (isMCQ) {
            html += `
              <div class="question-row">
                <span style="width:82%">
                  <span class="q-no bold">Q. ${questionCounter}.</span>
                  <span class="q-text bold">
                    Select and write the correct answer of the following multiple choice type of questions :
                  </span>
                </span>
                <div class="bold">[${sec.marks * sec.attemptAny}]</div>
              </div>
            `;

            qs.forEach((q: any, i: number) => {
              html += `
                <div class="question">
                  <div style="width:82%; margin-left: 56px;">
                    <span class="q-no">
                    (${toRoman(i)})
                    </span>
                    <span class="q-text">${renderMathHtml(q.text)}</span>
                  </div>
                </div>
                ${
                  q.imageUrl
                    ? `
                    <div style="display: flex; justify-content: center; align-items: center;">
                      <img
                        src="${baseUrl}${q.imageUrl}"
                        style="height:130px; object-fit:contain; margin-bottom: 12px;"
                      />
                    </div>
                    `
                    : ""
                }
              `;

              if (q.options) {
                html += `<div class="options">`;
                q.options.forEach((o: string, idx: number) => {
                  html += `
                    <span style="width:90%;">
                      <span class="q-no">(${String.fromCharCode(97 + idx)})</span> 
                      <span style="position: relative; left: 32px; margin-left: -25px; line-height: 1.6;">${renderMathHtml(o)}</span>
                    </span>
                  `;
                });
                html += `</div>`;
              }
            });

            questionCounter++;
          } else if (isVeryShort) {
            /* ---- VERY SHORT ---- */
            html += `
              <div class="question-row">
                <span>
                  <span class="q-no bold">Q. ${questionCounter}.</span>
                  <span class="bold">
                    Answer the following questions :
                  </span>
                </span>
                <div class="bold">[${sec.marks * sec.attemptAny}]</div>
              </div>
            `;

            qs.forEach((q: any, i: number) => {
              console.log("qs", qs);
              html += `
                <div class="question">
                  <div class="q-no">(${toRoman(i)})</div>
                  <div class="q-text">${renderMathHtml(q.text)}</div>
                </div>
                ${
                  q.imageUrl
                    ? `
                    <div style="display: flex; justify-content: center; align-items: center;">
                      <img
                        src="${baseUrl}${q.imageUrl}"
                        style="height:130px; object-fit:contain; margin-bottom: 12px;"
                      />
                    </div>
                    `
                    : ""
                }
              `;
            });
          } else {
            /* ---- NORMAL ---- */

            qs.forEach((q: any) => {
              questionCounter++;
              html += `
                <div class="question-row">
                  <div style="width:82%">
                    <span class="q-no bold">
                      Q. ${questionCounter}.
                    </span>
                    <span class="q-text">${renderMathHtml(q.text)}</span>
                    <span class="marks">(${q.marks})</span>
                  </div>
                </div>
                ${
                  q.imageUrl
                    ? `
                    <div style="display: flex; justify-content: center; align-items: center;">
                      <img
                        src="${baseUrl}${q.imageUrl}"
                        style="height:130px; object-fit:contain; margin-bottom: 12px;"
                      />
                    </div>
                    `
                    : ""
                }
              `;
            });
          }

          return html;
        })
        .join("")
    : Object.entries(groupedByType)
        .map(
          ([type, questions]: any) => `
    <div class="question-type-group">
      <div class="question-row">
        <span style="width:82%">
          <span class="q-no bold">Q. ${questionCounter++}.</span>
          <span class="q-text bold">
            ${type === "mcq" ? "Select and write the correct answer of the following multiple choice type of questions :" : "Answer the following questions :"}                  </span>
        </span>
      </div>

      ${questions
        .map(
          (q: any, i: number) => `
            <div class="question-row">
              <div style="width:82%">
                <span class="q-no">
                 (${i + 1})
                </span>
                <span class="q-text">${renderMathHtml(q.text)}</span>
                <span class="marks">(${q.marks})</span>
              </div>
            </div>

            ${
              q.imageUrl
                ? `
                  <div style="display:flex; justify-content:center;">
                    <img
                      src="${baseUrl}${q.imageUrl}"
                      style="height:130px; object-fit:contain; margin-bottom:12px;"
                    />
                  </div>
                `
                : ""
            }
          `,
        )
        .join("")}
    </div>
  `,
        )
        .join("")
}

<div class="end">* * *</div>

</div>
</body>
</html>
`;
}
