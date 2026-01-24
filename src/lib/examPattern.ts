export type ScienceSubjectKey =
  | "physics"
  | "chemistry"
  | "biology"
  | "mathematics-statistics"
  | "english"
  | "geography"
  | "hindi";

export type ExamSection = {
  key: string;
  title: string;
  type: string;
  marks: number;
  total: number;
  attemptAny: number;
};

export type ExamPattern = {
  time: number;
  maxMarks: number;
  sections: ExamSection[];
};

export const EXAM_PATTERN_12_SCIENCE: Record<ScienceSubjectKey, ExamPattern> = {
  physics: {
    time: 180,
    maxMarks: 70,
    sections: [
      {
        key: "A1",
        title: "SECTION – A",
        type: "MCQ",
        marks: 1,
        total: 10,
        attemptAny: 10,
      },
      {
        key: "A2",
        title: "SECTION – A",
        type: "Very short answer",
        marks: 1,
        total: 8,
        attemptAny: 8,
      },
      {
        key: "B",
        title: "SECTION – B",
        type: "Short answer 1",
        marks: 2,
        total: 12,
        attemptAny: 8,
      },
      {
        key: "C",
        title: "SECTION – C",
        type: "Short answer 2",
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
    time: 180,
    maxMarks: 70,
    sections: [
      {
        key: "A1",
        title: "SECTION – A",
        type: "MCQ",
        marks: 1,
        total: 10,
        attemptAny: 10,
      },
      {
        key: "A2",
        title: "SECTION – A",
        type: "Very short answer",
        marks: 1,
        total: 8,
        attemptAny: 8,
      },
      {
        key: "B",
        title: "SECTION – B",
        type: "Short answer 1",
        marks: 2,
        total: 12,
        attemptAny: 8,
      },
      {
        key: "C",
        title: "SECTION – C",
        type: "Short answer 2",
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
    time: 180,
    maxMarks: 70,
    sections: [
      {
        key: "A1",
        title: "SECTION – A",
        type: "MCQ",
        marks: 1,
        total: 10,
        attemptAny: 10,
      },
      {
        key: "A2",
        title: "SECTION – A",
        type: "Very short answer",
        marks: 1,
        total: 8,
        attemptAny: 8,
      },
      {
        key: "B",
        title: "SECTION – B",
        type: "Short answer 1",
        marks: 2,
        total: 12,
        attemptAny: 8,
      },
      {
        key: "C",
        title: "SECTION – C",
        type: "Short answer 2",
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

  "mathematics-statistics": {
    time: 180,
    maxMarks: 80,
    sections: [
      {
        key: "A1",
        title: "SECTION - A",
        type: "MCQ",
        marks: 2,
        total: 8,
        attemptAny: 8,
      },
      {
        key: "A2",
        title: "SECTION - A",
        type: "Very short answer",
        marks: 1,
        total: 4,
        attemptAny: 4,
      },
      {
        key: "B",
        title: "SECTION - B",
        type: "Short answer 1",
        marks: 2,
        total: 12,
        attemptAny: 8,
      },
      {
        key: "C",
        title: "SECTION - C",
        type: "Short answer 2",
        marks: 3,
        total: 12,
        attemptAny: 8,
      },
      {
        key: "D",
        title: "SECTION - D",
        type: "Long answer",
        marks: 4,
        total: 8,
        attemptAny: 5,
      },
    ],
  },

  english: {
    time: 180,
    maxMarks: 80,
    sections: [
      {
        key: "I-1",
        title: "SECTION – I",
        type: "Prose",
        marks: 2,
        total: 8,
        attemptAny: 8,
      },
      {
        key: "I-2",
        title: "SECTION – I",
        type: "Prose",
        marks: 2,
        total: 9,
        attemptAny: 9,
      },
      {
        key: "II",
        title: "SECTION – II",
        type: "Poetry",
        marks: 2,
        total: 7,
        attemptAny: 7,
      },
      {
        key: "III",
        title: "SECTION – III",
        type: "Writing Skills",
        marks: 4,
        total: 4,
        attemptAny: 12,
      },
      {
        key: "IV",
        title: "SECTION – IV",
        type: "Literary Genre (Novel)",
        marks: 4,
        total: 4,
        attemptAny: 4,
      },
    ],
  },

  geography: {
    time: 180,
    maxMarks: 80,
    sections: [
      {
        key: "A-1",
        title: "SECTION – A",
        type: "Complete the chain",
        marks: 5,
        total: 1,
        attemptAny: 1,
      },
      {
        key: "A-2",
        title: "SECTION – A",
        type: "Do as directed",
        marks: 1,
        total: 5,
        attemptAny: 5,
      },
      {
        key: "A-3",
        title: "SECTION – A",
        type: "Identify the correct co-relation",
        marks: 1,
        total: 5,
        attemptAny: 5,
      },
      {
        key: "A-4",
        title: "SECTION – A",
        type: "Identify the incorrect factors",
        marks: 1,
        total: 5,
        attemptAny: 5,
      },
      {
        key: "B",
        title: "SECTION – B",
        type: "Give Reasons",
        marks: 3,
        total: 6,
        attemptAny: 4,
      },
      {
        key: "C",
        title: "SECTION – C",
        type: "Differentiate Between",
        marks: 3,
        total: 5,
        attemptAny: 3,
      },
      {
        key: "D-1",
        title: "SECTION – D",
        type: "Mark on the map",
        marks: 1,
        total: 8,
        attemptAny: 6,
      },
      {
        key: "D-2",
        title: "SECTION – D",
        type: "Map/Graphs",
        marks: 1,
        total: 5,
        attemptAny: 5,
      },
      {
        key: "E",
        title: "SECTION – E",
        type: "Short Notes",
        marks: 4,
        total: 5,
        attemptAny: 3,
      },
      {
        key: "F-1",
        title: "SECTION – F",
        type: "Passage",
        marks: 1,
        total: 4,
        attemptAny: 4,
      },
      {
        key: "F-2",
        title: "SECTION – F",
        type: "Diagrams",
        marks: 2,
        total: 3,
        attemptAny: 2,
      },
      {
        key: "G",
        title: "SECTION – G",
        type: "Answer in detail",
        marks: 8,
        total: 2,
        attemptAny: 1,
      },
    ],
  },

  hindi: {
    time: 180,
    maxMarks: 80,
    sections: [
      {
        key: "A",
        title: "विभाग – 1",
        type: "गद्य",
        marks: 2,
        total: 10,
        attemptAny: 10,
      },
      {
        key: "B",
        title: "विभाग – 2",
        type: "पद्य",
        marks: 2,
        total: 10,
        attemptAny: 10,
      },
      {
        key: "C",
        title: "विभाग – 3",
        type: "विशेष अध्ययन",
        marks: 4,
        total: 5,
        attemptAny: 5,
      },
      {
        key: "D",
        title: "विभाग – 4",
        type: "व्यावहारिक हिंदी / अपठित गद्यांश / पारिभाषिक शब्दावली",
        marks: 4,
        total: 5,
        attemptAny: 5,
      },
      {
        key: "E",
        title: "विभाग – 5",
        type: "व्याकरण",
        marks: 4,
        total: 5,
        attemptAny: 5,
      },
    ],
  },
};
