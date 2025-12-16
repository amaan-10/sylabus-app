/* eslint-disable @typescript-eslint/no-explicit-any */
import { EXAM_PATTERN_12_SCIENCE } from "@/lib/examPattern";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { Font } from "@react-pdf/renderer";

/* ---------------- FONTS ---------------- */

Font.register({
  family: "Noto",
  src: "/fonts/NotoSerif-Regular.ttf",
});

Font.register({
  family: "Noto-Bold",
  src: "/fonts/NotoSerif-Bold.ttf",
});

Font.register({
  family: "Noto-SemiBold",
  src: "/fonts/NotoSerif-SemiBold.ttf",
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
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 2,
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
    width: "7%",
  },

  questionText: {
    width: "88%",
  },

  marks: {
    width: "12%",
    textAlign: "right",
  },

  options: {
    marginLeft: 34,
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
    fontFamily: "Noto-SemiBold",
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
}: any) => {
  const examKey = subject.slug.toLowerCase();

  const isExamSupported =
    paperMode === "exam" &&
    ["physics", "chemistry", "biology"].includes(examKey);

  const pattern = isExamSupported
    ? EXAM_PATTERN_12_SCIENCE[examKey as ScienceSubjectKey]
    : null;

  return (
    <Document>
      <Page style={styles.page}>
        {/* -------- HEADER -------- */}
        <Text style={styles.seatRow}>Seat No. ____________________</Text>

        {schoolName && (
          <Text style={[styles.center, styles.bold]}>{schoolName}</Text>
        )}

        <Text style={[styles.center, styles.headerTitle]}>
          {subject.name.toUpperCase()}
        </Text>
        <Text style={[styles.center, styles.subTitle]}>(REVISED COURSE)</Text>

        <View style={styles.metaRow}>
          <Text>Time : 2 Hours</Text>
          <Text>
            Max. Marks :{" "}
            {paperMode === "exam" && pattern
              ? pattern.maxMarks
              : selected.reduce((s: number, q: any) => s + q.marks, 0)}
          </Text>
        </View>

        {/* -------- NOTES -------- */}
        <View style={styles.note}>
          <Text style={styles.bold}>Note :—</Text>
          <Text>(i) All questions are compulsory.</Text>
          <Text>(ii) Use of calculator is not allowed.</Text>
          <Text>
            (iii) The numbers to the right of the questions indicate full marks.
          </Text>
          <Text>
            (iv) In case of MCQs, only the first attempt will be evaluated.
          </Text>
        </View>

        {/* -------- QUESTIONS -------- */}
        {paperMode === "exam" && pattern ? (
          <>
            {pattern.sections.map((sec) => {
              const qs = selected.filter(
                (q: any) =>
                  prettifyType(q.type) === sec.type && q.marks === sec.marks
              );

              if (!qs.length) return null;

              return (
                <View key={sec.key} wrap>
                  <Text
                    style={{
                      textAlign: "center",
                      marginTop: 8,
                      marginBottom: 18,
                      fontSize: 18,
                      fontFamily: "Noto-Bold",
                    }}
                  >
                    {sec.title}
                  </Text>

                  <Text
                    style={{
                      marginBottom: 8,
                      marginHorizontal: 30,
                      fontSize: 12,
                      fontFamily: "Noto-SemiBold",
                    }}
                  >
                    {sec.attemptAny
                      ? `Attempt any ${sec.attemptAny} questions of the following : `
                      : ""}
                    {sec.type === "MCQ"
                      ? "Select and write the correct answers for the following multiple choice type of questions :"
                      : ""}
                  </Text>

                  {qs.map((q: any, i: number) => (
                    <View key={q.id} style={styles.questionBlock} wrap={false}>
                      <View style={styles.questionRow}>
                        <Text style={styles.questionNumber}>Q.{i + 1}</Text>
                        <Text style={styles.questionText}>{q.text}</Text>
                        <Text style={styles.marks}>({q.marks})</Text>
                      </View>

                      {q.options && (
                        <View style={styles.options}>
                          {q.options.map((o: string, idx: number) => (
                            <Text key={idx}>
                              ({String.fromCharCode(65 + idx)}) {o}
                            </Text>
                          ))}
                        </View>
                      )}
                    </View>
                  ))}
                </View>
              );
            })}
          </>
        ) : null}

        <Text style={styles.endMark}>* * *</Text>
        {/* -------- FIXED FOOTER (MOST RELIABLE WAY) -------- */}
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
