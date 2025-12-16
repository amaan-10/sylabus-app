export type ScienceSubjectKey = "physics" | "chemistry" | "biology";

export type ExamSection = {
  key: string;
  title: string;
  type: string;
  marks: number;
  total: number;
  attemptAny?: number;
};

export type ExamPattern = {
  time: string;
  maxMarks: number;
  sections: ExamSection[];
};

export const EXAM_PATTERN_12_SCIENCE: Record<ScienceSubjectKey, ExamPattern> = {
  physics: {
    time: "3 Hours",
    maxMarks: 70,
    sections: [
      { key: "A1", title: "SECTION – A", type: "MCQ", marks: 1, total: 10 },
      {
        key: "A2",
        title: "SECTION – A",
        type: "Very short answer",
        marks: 1,
        total: 8,
      },
      {
        key: "B",
        title: "SECTION – B",
        type: "Short answer",
        marks: 2,
        total: 12,
        attemptAny: 8,
      },
      {
        key: "C",
        title: "SECTION – C",
        type: "Numerical problems",
        marks: 3,
        total: 12,
        attemptAny: 8,
      },
      {
        key: "D",
        title: "SECTION – D",
        type: "Long answer",
        marks: 4,
        total: 5,
        attemptAny: 3,
      },
    ],
  },

  chemistry: {
    time: "3 Hours",
    maxMarks: 70,
    sections: [
      { key: "A1", title: "SECTION – A", type: "MCQ", marks: 1, total: 10 },
      {
        key: "A2",
        title: "SECTION – A",
        type: "Very short answer",
        marks: 1,
        total: 8,
      },
      {
        key: "B",
        title: "SECTION – B",
        type: "Short answer",
        marks: 2,
        total: 12,
        attemptAny: 8,
      },
      {
        key: "C",
        title: "SECTION – C",
        type: "Short answer",
        marks: 3,
        total: 12,
        attemptAny: 8,
      },
      {
        key: "D",
        title: "SECTION – D",
        type: "Long answer",
        marks: 4,
        total: 5,
        attemptAny: 3,
      },
    ],
  },

  biology: {
    time: "3 Hours",
    maxMarks: 70,
    sections: [
      { key: "A1", title: "SECTION – A", type: "MCQ", marks: 1, total: 10 },
      {
        key: "A2",
        title: "SECTION – A",
        type: "Very short answer",
        marks: 1,
        total: 8,
      },
      {
        key: "B",
        title: "SECTION – B",
        type: "Short answer",
        marks: 2,
        total: 12,
        attemptAny: 8,
      },
      {
        key: "C",
        title: "SECTION – C",
        type: "Short answer",
        marks: 3,
        total: 12,
        attemptAny: 8,
      },
      {
        key: "D",
        title: "SECTION – D",
        type: "Long answer",
        marks: 4,
        total: 5,
        attemptAny: 3,
      },
    ],
  },
};
