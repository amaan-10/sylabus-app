// lib/boards.ts

export interface ExamInfo {
  name: string;
  full_form: string;
  exam_months: string[];
  result_month: string;
}

export interface Streams {
  science: string[];
  commerce: string[];
  arts: string[];
}

export interface GradingPattern {
  type: string;
  passing_percentage?: number;
  passing_grade?: string;
  grades?: string[];
  additional_grace_rules?: string[];
}

export interface EvaluationSystem {
  theory_weightage?: number;
  internal_assessment?: number | string;
  internal_weightage?: number;
  practical_weightage?: Record<string, number>;
  project_work?: string;
  projects?: string[];
  practicals?: string;
}

export interface EducationBoard {
  board_name: string;
  abbreviation: string;
  type: string;
  established_year: number;
  headquarters: string;
  official_website: string;
  recognized_by: string[];
  class_range: string;
  examinations: {
    class_10: ExamInfo;
    class_12: ExamInfo;
  };
  mediums: string[];
  streams_for_class_11_12: Streams;
  grading_pattern: GradingPattern;
  evaluation_system: EvaluationSystem;
  additional_details: {
    total_schools_affiliated: number;
    regional_divisions?: number;
    international_presence?: number;
    board_features: string[];
  };
}

export const BOARDS: EducationBoard[] = [
  {
    board_name: "Maharashtra State Board of Secondary and Higher Secondary Education",
    abbreviation: "MSBSHSE",
    type: "State Board",
    established_year: 1965,
    headquarters: "Pune, Maharashtra",
    official_website: "https://mahahsscboard.in",
    recognized_by: [
      "Ministry of Education, Government of Maharashtra",
      "Government of India"
    ],
    class_range: "8th to 12th",
    examinations: {
      class_10: {
        name: "SSC",
        full_form: "Secondary School Certificate",
        exam_months: ["March", "July"],
        result_month: "June"
      },
      class_12: {
        name: "HSC",
        full_form: "Higher Secondary Certificate",
        exam_months: ["February–March"],
        result_month: "May"
      }
    },
    mediums: ["English", "Semi-English", "Marathi", "Hindi", "Urdu", "Gujarati", "Kannada"],
    streams_for_class_11_12: {
      science: ["Physics", "Chemistry", "Biology", "Mathematics", "IT", "Electronics"],
      commerce: ["Accountancy", "Economics", "OCM", "Business Maths", "Marketing"],
      arts: ["History", "Geography", "Political Science", "Psychology", "Sociology"]
    },
    grading_pattern: {
      type: "Marks-based",
      passing_percentage: 35,
      additional_grace_rules: ["ATKT allowed in some conditions"]
    },
    evaluation_system: {
      theory_weightage: 80,
      internal_weightage: 20,
      practical_weightage: {
        science: 30,
        vocational: 50
      }
    },
    additional_details: {
      total_schools_affiliated: 21000,
      regional_divisions: 9,
      board_features: [
        "State syllabus aligned with NEP updates",
        "Practical-focused learning",
        "Large student population"
      ]
    }
  },

  {
    board_name: "Central Board of Secondary Education",
    abbreviation: "CBSE",
    type: "National Board",
    established_year: 1962,
    headquarters: "New Delhi, India",
    official_website: "https://cbse.gov.in",
    recognized_by: ["Ministry of Education, Government of India"],
    class_range: "1st to 12th",
    // curriculum_base: "NCERT",
    examinations: {
      class_10: {
        name: "AISSE",
        full_form: "All India Secondary School Examination",
        exam_months: ["February–March"],
        result_month: "May"
      },
      class_12: {
        name: "AISSCE",
        full_form: "All India Senior School Certificate Examination",
        exam_months: ["February–March"],
        result_month: "May"
      }
    },
    mediums: ["English", "Hindi"],
    streams_for_class_11_12: {
      science: ["Physics", "Chemistry", "Biology", "Maths", "Computer Science", "IP"],
      commerce: ["Accountancy", "Business Studies", "Economics", "Applied Maths"],
      arts: ["Political Science", "History", "Geography", "Psychology", "Fine Arts"]
    },
    grading_pattern: {
      type: "9-point grading",
      grades: ["A1", "A2", "B1", "B2", "C1", "C2", "D", "E1", "E2"],
      passing_grade: "D"
    },
    evaluation_system: {
      theory_weightage: 80,
      internal_assessment: 20,
      practical_weightage: {
        science: 30,
        cs_ip: 30
      },
      projects: ["Mandatory project for class 12 subjects"]
    },
    additional_details: {
      total_schools_affiliated: 28000,
      international_presence: 26,
      board_features: [
        "Strong focus on conceptual learning",
        "National-level uniform syllabus",
        "Ideal for competitive exams like JEE/NEET"
      ]
    }
  },

  {
    board_name: "Council for the Indian School Certificate Examinations",
    abbreviation: "ICSE",
    type: "National Private Board",
    established_year: 1958,
    headquarters: "New Delhi, India",
    official_website: "https://cisce.org",
    recognized_by: ["Government of India"],
    class_range: "3rd to 12th",
    examinations: {
      class_10: {
        name: "ICSE",
        full_form: "Indian Certificate of Secondary Education",
        exam_months: ["February–March"],
        result_month: "May"
      },
      class_12: {
        name: "ISC",
        full_form: "Indian School Certificate",
        exam_months: ["February–April"],
        result_month: "May"
      }
    },
    mediums: ["English"],
    streams_for_class_11_12: {
      science: ["Physics", "Chemistry", "Biology", "Maths", "Biotechnology"],
      commerce: ["Accountancy", "Commerce", "Economics", "Business Studies"],
      arts: ["Political Science", "Fine Arts", "Fashion Designing", "Psychology"]
    },
    grading_pattern: {
      type: "Percentage-based",
      passing_percentage: 35
    },
    evaluation_system: {
      internal_assessment: "20–50% weightage depending on subject",
      practicals: "Compulsory for sciences",
      project_work: "Required for most ISC subjects"
    },
    additional_details: {
      total_schools_affiliated: 2400,
      board_features: [
        "Strong English foundational curriculum",
        "High project and practical emphasis",
        "Detailed subject depth"
      ]
    }
  }
];
