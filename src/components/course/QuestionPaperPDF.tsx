/* eslint-disable @typescript-eslint/no-explicit-any */
import { EXAM_PATTERN_12_SCIENCE } from "@/lib/examPattern";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { Font } from "@react-pdf/renderer";

/* ---------------- FONTS ---------------- */

Font.register({
  family: "Noto",
  fonts: [
    { src: "/fonts/NotoSerif-Regular.ttf", fontWeight: 400 },
    { src: "/fonts/NotoSerif-SemiBold.ttf", fontWeight: 600 },
    { src: "/fonts/NotoSerif-Bold.ttf", fontWeight: 700 },
    {
      src: "/fonts/NotoSerif-Italic.ttf",
      fontWeight: 400,
      fontStyle: "italic",
    },
    {
      src: "/fonts/NotoSerif-SemiBoldItalic.ttf",
      fontWeight: 600,
      fontStyle: "italic",
    },
    {
      src: "/fonts/NotoSerif-BoldItalic.ttf",
      fontWeight: 700,
      fontStyle: "italic",
    },
  ],
});

type ScienceSubjectKey = "physics" | "chemistry" | "biology";

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  page: {
    size: "A4",
    paddingTop: 36,
    paddingBottom: 70, // IMPORTANT for footer
    paddingHorizontal: 52,
    fontSize: 11,
    fontFamily: "Noto",
  },

  seatRow: {
    marginBottom: 6,
  },

  center: {
    textAlign: "center",
  },

  bold: {
    fontWeight: "bold",
  },

  headerTitle: {
    fontSize: 16,
    fontWeight: 600,
    marginTop: 10,
  },

  subTitle: {
    fontSize: 11,
    marginBottom: 6,
  },

  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
    fontSize: 11,
    fontWeight: "bold",
  },

  note: {
    marginTop: 6,
    marginBottom: 10,
    fontStyle: "italic",
  },

  sectionTitle: {
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 4,
  },

  questionBlock: {
    marginBottom: 10,
  },

  questionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  questionNumber: {
    width: "10%",
    fontWeight: 700,
  },

  questionText: {
    width: "88%",
  },

  marks: {
    width: "12%",
    textAlign: "right",
  },

  options: {
    marginLeft: 88,
    marginTop: 2,
  },

  footer: {
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: "center",
  },

  pageNumber: {
    fontSize: 10,
    fontWeight: 600,
  },

  endMark: {
    marginTop: 16,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
  },
});

/* ---------------- COMPONENT ---------------- */

export const QuestionPaperPDF = ({
  schoolName,
  subject,
  selected,
  paperMode,
  examPatternTotalMarks,
}: any) => {
  const examKey = subject.slug.toLowerCase();

  const isExamSupported =
    paperMode === "exam" &&
    ["physics", "chemistry", "biology"].includes(examKey);

  console.log(selected);

  const pattern = isExamSupported
    ? EXAM_PATTERN_12_SCIENCE[examKey as ScienceSubjectKey]
    : null;

  let questionCounter = 1;

  return (
    <Document>
      <Page style={styles.page}>
        {/* -------- HEADER -------- */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={[styles.seatRow, { fontWeight: 600 }]}>
            Seat Number ____________________
          </Text>
          <Text
            style={{ fontWeight: 600 }}
            render={({ totalPages }) => `(Total Pages ${totalPages})`}
          />
        </View>

        {schoolName && (
          <Text
            style={[
              styles.center,
              styles.bold,
              { fontSize: 20, marginTop: 10 },
            ]}
          >
            {schoolName}
          </Text>
        )}

        <Text style={[styles.center, styles.headerTitle]}>
          {subject.name.toUpperCase()}
        </Text>
        {/* <Text style={[styles.center, styles.subTitle]}>(REVISED COURSE)</Text> */}

        <View style={styles.metaRow}>
          <Text>
            Time : {paperMode === "exam" && pattern ? pattern.time : "2 Hrs."}
          </Text>
          <Text>
            Max. Marks :{" "}
            {paperMode === "exam" && pattern
              ? examPatternTotalMarks
              : selected.reduce((s: number, q: any) => s + q.marks, 0)}
          </Text>
        </View>

        {/* -------- NOTES -------- */}
        <View style={styles.note}>
          <Text style={styles.bold}>General Instructions :</Text>
          <View style={{ paddingHorizontal: 30 }}>
            <Text style={{ paddingVertical: 8 }}>
              The question paper is divided into{" "}
              <Text style={{ fontWeight: 600 }}>four</Text> sections :
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 20,
                width: "100%",
                paddingBottom: 8,
              }}
            >
              <Text style={{ width: "5%" }}>i) </Text>
              <Text style={{ fontWeight: 600 }}>Section A :</Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 5,
                  width: "80%",
                }}
              >
                <Text>
                  Contains{" "}
                  <Text style={{ fontWeight: 600 }}>
                    Ten multiple choice type
                  </Text>{" "}
                  of questions carrying{" "}
                  <Text style={{ fontWeight: 600 }}>One mark </Text>each.
                </Text>
                <Text>
                  Contains{" "}
                  <Text style={{ fontWeight: 600 }}>
                    Eight very short answer type
                  </Text>{" "}
                  of questions carrying{" "}
                  <Text style={{ fontWeight: 600 }}>One mark </Text>each.
                </Text>
              </View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 20,
                width: "100%",
                paddingBottom: 8,
              }}
            >
              <Text style={{ width: "5%" }}>ii) </Text>

              <Text style={{ fontWeight: 600 }}>Section B :</Text>

              <Text style={{ width: "80%" }}>
                Contain{" "}
                <Text style={{ fontWeight: 600 }}>
                  Twelve short answer type
                </Text>{" "}
                of questions carrying{" "}
                <Text style={{ fontWeight: 600 }}>Two marks</Text> each.
                (Attempt <Text style={{ fontWeight: 600 }}>any Eight</Text>).
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 20,
                width: "100%",
                paddingBottom: 8,
              }}
            >
              <Text style={{ width: "5%" }}>iii) </Text>

              <Text style={{ fontWeight: 600 }}>Section C :</Text>

              <Text style={{ width: "80%" }}>
                Contain{" "}
                <Text style={{ fontWeight: 600 }}>
                  Twelve short answer type
                </Text>{" "}
                of questions carrying{" "}
                <Text style={{ fontWeight: 600 }}>Three marks</Text> each.
                (Attempt <Text style={{ fontWeight: 600 }}>any Eight</Text>).
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 20,
                width: "100%",
                paddingBottom: 8,
              }}
            >
              <Text style={{ width: "5%" }}>iv) </Text>

              <Text style={{ fontWeight: 600 }}>Section D :</Text>

              <Text style={{ width: "80%" }}>
                Contain{" "}
                <Text style={{ fontWeight: 600 }}>Five long answer type</Text>{" "}
                of questions carrying{" "}
                <Text style={{ fontWeight: 600 }}>Four marks</Text>{" "}
                each.(Attempt <Text style={{ fontWeight: 600 }}>any Three</Text>
                ).
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 20,
                width: "100%",
                paddingBottom: 8,
              }}
            >
              <Text style={{ width: "5%" }}>v) </Text>
              <Text>
                Use of the log table is allowed. Use of calculator is{" "}
                <Text style={{ fontWeight: 600 }}>not</Text> allowed.
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 20,
                width: "100%",
                paddingBottom: 8,
              }}
            >
              <Text style={{ width: "5%" }}>vi) </Text>
              <Text>
                The numbers to the right of the questions indicate full marks.
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 20,
                width: "100%",
                paddingBottom: 8,
              }}
            >
              <Text style={{ width: "5%" }}>vii) </Text>
              <Text>
                In case of MCQs, only the{" "}
                <Text style={{ fontWeight: 600 }}>first attempt</Text> will be
                evaluated.
              </Text>
            </View>
          </View>
        </View>

        {/* -------- QUESTIONS -------- */}
        {paperMode === "exam" && pattern ? (
          <>
            {pattern.sections.map((sec) => {
              const qs = selected.filter(
                (q: any) =>
                  prettifyType(q.examSectionType) === sec.type &&
                  q.marks === sec.marks
              );
              console.log(sec.type);

              if (!qs.length) return null;

              // ---------- SECTION TITLE ----------
              let showSectionTitle = true;

              if (sec.key === "A2") {
                showSectionTitle = false;
              }

              // ---------- SECTION A GROUPING ----------
              const isMCQ = sec.key === "A1";
              const isVeryShort = sec.key === "A2";

              if (sec.key === "B") {
                questionCounter += 1;
              }

              return (
                <View key={sec.key} wrap>
                  {showSectionTitle && (
                    <Text
                      style={{
                        textAlign: "center",
                        marginTop: 12,
                        marginBottom: 10,
                        fontSize: 16,
                        fontWeight: 700,
                      }}
                    >
                      {sec.title}
                    </Text>
                  )}

                  {/* ---------- Q1 : MCQ ---------- */}
                  {isMCQ && (
                    <>
                      <View style={[styles.questionRow, { marginBottom: 10 }]}>
                        <Text style={styles.questionNumber}>
                          Q. {questionCounter}.
                        </Text>{" "}
                        <Text
                          style={[styles.questionText, { fontWeight: 700 }]}
                        >
                          Select and write the correct answers for the following
                          multiple choice type of questions :
                        </Text>
                        <Text style={[styles.marks, { fontWeight: 700 }]}>
                          [{sec.marks * sec.attemptAny}]
                        </Text>
                      </View>

                      {qs.map((q: any, i: number) => (
                        <View
                          key={q.id}
                          style={styles.questionBlock}
                          wrap={false}
                        >
                          <View
                            style={{
                              marginLeft: 48,
                              display: "flex",
                              flexDirection: "row",
                            }}
                          >
                            <Text style={{ width: "10%" }}>({toRoman(i)})</Text>
                            <View style={{ flex: 1 }}>
                              <Text style={styles.questionText}>{q.text}</Text>

                              {q.imageUrl && (
                                <Image
                                  src={q.imageUrl}
                                  style={{
                                    marginTop: 6,
                                    width: 100,
                                    height: "auto",
                                    objectFit: "contain",
                                  }}
                                />
                              )}
                            </View>
                            <Text style={{ width: "14%" }}></Text>
                          </View>

                          {q.options && (
                            <View style={styles.options}>
                              {q.options.map((o: string, idx: number) => (
                                <Text key={idx}>
                                  ({String.fromCharCode(97 + idx)}) {o}
                                </Text>
                              ))}
                            </View>
                          )}
                        </View>
                      ))}
                    </>
                  )}

                  {/* ---------- Q2 : VERY SHORT ---------- */}
                  {isVeryShort && (
                    <>
                      <View style={[styles.questionRow, { marginBottom: 10 }]}>
                        <Text style={styles.questionNumber}>
                          Q. {questionCounter + 1}.
                        </Text>{" "}
                        <Text
                          style={[styles.questionText, { fontWeight: 700 }]}
                        >
                          Answer the following questions :
                        </Text>
                        <Text style={[styles.marks, { fontWeight: 700 }]}>
                          [{sec.marks * sec.attemptAny}]
                        </Text>
                      </View>

                      {qs.map((q: any, i: number) => (
                        <View
                          key={q.id}
                          style={styles.questionBlock}
                          wrap={false}
                        >
                          <View
                            style={{
                              marginLeft: 48,
                              display: "flex",
                              flexDirection: "row",
                            }}
                          >
                            <Text style={{ width: "10%" }}>({toRoman(i)})</Text>
                            <View style={{ flex: 1 }}>
                              <Text style={styles.questionText}>{q.text}</Text>

                              {q.imageUrl && (
                                <Image
                                  src={q.imageUrl}
                                  style={{
                                    marginTop: 6,
                                    width: 100,
                                    height: "auto",
                                    objectFit: "contain",
                                  }}
                                />
                              )}
                            </View>
                            <Text style={{ width: "14%" }}></Text>
                          </View>
                        </View>
                      ))}
                    </>
                  )}

                  {/* ---------- NORMAL SECTIONS (B, C, D) ---------- */}
                  {!isMCQ &&
                    !isVeryShort &&
                    qs.map((q: any) => {
                      questionCounter++;

                      return (
                        <View
                          key={q.id}
                          style={styles.questionBlock}
                          wrap={false}
                        >
                          <View style={styles.questionRow}>
                            <Text style={styles.questionNumber}>
                              Q. {questionCounter}.
                            </Text>

                            <View style={{ flex: 1 }}>
                              <Text style={styles.questionText}>{q.text}</Text>

                              {q.imageUrl && (
                                <Image
                                  src={q.imageUrl}
                                  style={{
                                    marginTop: 6,
                                    width: 100,
                                    height: "auto",
                                    objectFit: "contain",
                                  }}
                                />
                              )}
                            </View>

                            <Text style={styles.marks}>({q.marks})</Text>
                          </View>
                        </View>
                      );
                    })}
                </View>
              );
            })}
          </>
        ) : (
          /* ---------------- CUSTOM MODE (EXISTING) ---------------- */ Object.entries(
            selected.reduce((acc: any, q: any) => {
              acc[q.type] = acc[q.type] || [];
              acc[q.type].push(q);
              return acc;
            }, {})
          ).map(([type, qs]: any, idx: number) => (
            <View key={type} wrap>
              {" "}
              <Text style={styles.sectionTitle}>
                {" "}
                {idx + 1}. ({type}){" "}
              </Text>{" "}
              {qs.map((q: any, i: number) => (
                <View key={q.id} style={styles.questionBlock} wrap={false}>
                  {" "}
                  <View style={styles.questionRow}>
                    <Text style={styles.questionNumber}>
                      Q. {questionCounter}.
                    </Text>{" "}
                    <View style={{ flex: 1 }}>
                      <Text style={styles.questionText}>{q.text}</Text>

                      {q.imageUrl && (
                        <Image
                          src={q.imageUrl}
                          style={{
                            marginTop: 6,
                            width: 100,
                            height: "auto",
                            objectFit: "contain",
                          }}
                        />
                      )}
                    </View>
                    <Text style={styles.marks}>({q.marks})</Text>{" "}
                  </View>{" "}
                  {q.options && (
                    <View style={styles.options}>
                      {" "}
                      {q.options.map((o: string, id: number) => (
                        <Text key={id}>
                          {" "}
                          ({String.fromCharCode(65 + id)}) {o}{" "}
                        </Text>
                      ))}{" "}
                    </View>
                  )}{" "}
                </View>
              ))}{" "}
            </View>
          ))
        )}

        <Text style={styles.endMark}>* * *</Text>
        {/* -------- FIXED FOOTER -------- */}
        <View fixed style={styles.footer}>
          <Text
            style={styles.pageNumber}
            render={({ pageNumber }) => `Page ${pageNumber}`}
          />
        </View>
      </Page>
    </Document>
  );
};

/* ---------------- HELPERS ---------------- */

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
