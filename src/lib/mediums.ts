// lib/mediums.ts

export interface MediumDetails {
  medium_name: string;
  slug: string;
  description: string;
  used_in_boards: string[];
  classes_available: string;
  subjects_common: {
    science: string[];
    commerce: string[];
    arts: string[];
  };
  difficulty_level: "easy" | "moderate" | "hard";
  official_textbook_source: string;
  exam_language_rules: string[];
  ui: {
    color: string;
    icon: string;
    image?: string;
  };
  notes: string[];
}

export const MEDIUMS: MediumDetails[] = [
  // ---------------------------------------------------------
  // ENGLISH MEDIUM  → MSBSHSE, CBSE, ICSE
  // ---------------------------------------------------------
  {
    medium_name: "English Medium",
    slug: "english",
    description:
      "English medium is widely adopted across India and provides strong foundation for competitive exams and higher studies. Used prominently in national boards like CBSE and ICSE, and also available in MSBSHSE.",
    used_in_boards: ["MSBSHSE", "CBSE", "ICSE"],
    classes_available: "8th to 12th",
    subjects_common: {
      science: [
        "Physics",
        "Chemistry",
        "Biology",
        "Mathematics",
        "Computer Science",
        "IT",
      ],
      commerce: [
        "Accountancy",
        "Economics",
        "Business Studies",
        "OCM",
        "Applied Mathematics",
      ],
      arts: [
        "History",
        "Geography",
        "Political Science",
        "Psychology",
        "Sociology",
      ],
    },
    difficulty_level: "moderate",
    official_textbook_source:
      "NCERT (for CBSE), Balbharati (for MSBSHSE), CISCE Publications (for ICSE/ISC)",
    exam_language_rules: [
      "Most competitive exams (JEE, NEET, UPSC) support English strongly.",
      "English medium students can answer in English across all boards.",
      "ICSE requires English as the primary medium for communication.",
    ],
    ui: {
      color: "#2563eb",
      icon: "📘",
      image: "/images/mediums/english.png",
    },
    notes: [
      "Most widely used medium in private schools.",
      "Higher comprehension requirement for literature-focused boards like ICSE.",
      "Best suited for students aiming for national-level exams.",
    ],
  },

  // ---------------------------------------------------------
  // MARATHI MEDIUM  → ONLY MSBSHSE
  // ---------------------------------------------------------
  {
    medium_name: "Marathi Medium",
    slug: "marathi",
    description:
      "Marathi medium is commonly used in Maharashtra state-board schools and is supported officially by MSBSHSE. It is known for strong fundamentals using Balbharati textbooks.",
    used_in_boards: ["MSBSHSE"],
    classes_available: "8th to 12th",
    subjects_common: {
      science: ["भौतिकशास्त्र", "रसायनशास्त्र", "जीवशास्त्र", "गणित"],
      commerce: ["अकाउंटन्सी", "अर्थशास्त्र", "ओसीएम", "व्यवसाय गणित"],
      arts: ["इतिहास", "भूगोल", "राज्यशास्त्र", "मानसशास्त्र"],
    },
    difficulty_level: "easy",
    official_textbook_source: "Balbharati (बालभारती) – Maharashtra State Board",
    exam_language_rules: [
      "MSBSHSE allows students to answer completely in Marathi.",
      "SSC & HSC question papers are available in Marathi.",
      "Competitive exam language support varies.",
    ],
    ui: {
      color: "#16a34a",
      icon: "📗",
      image: "/images/mediums/marathi.png",
    },
    notes: [
      "Perfect for students learning in regional schools.",
      "Highest availability in government and semi-government schools.",
      "Strong emphasis on conceptual clarity in native language.",
    ],
  },

  // ---------------------------------------------------------
  // SEMI-ENGLISH MEDIUM  → ONLY MSBSHSE
  // ---------------------------------------------------------
  {
    medium_name: "Semi-English Medium",
    slug: "semi-english",
    description:
      "Semi-English is unique to MSBSHSE where Science and Mathematics are taught in English while other subjects are taught in Marathi. Helps students transition from Marathi to English efficiently.",
    used_in_boards: ["MSBSHSE"],
    classes_available: "8th to 12th",
    subjects_common: {
      science: [
        "Physics (English)",
        "Chemistry (English)",
        "Biology (English)",
        "Mathematics (English)",
      ],
      commerce: [
        "Accountancy (English)",
        "Economics (Marathi/English)",
        "OCM (English)",
      ],
      arts: [
        "History (Marathi)",
        "Geography (Marathi)",
        "Political Science (Marathi)",
      ],
    },
    difficulty_level: "moderate",
    official_textbook_source: "Balbharati + English reference books",
    exam_language_rules: [
      "Students can answer non-science subjects in Marathi.",
      "Science and Mathematics must be answered in English.",
      "Ideal for students planning to shift to full English medium later.",
    ],
    ui: {
      color: "#f59e0b",
      icon: "📙",
      image: "/images/mediums/semi.png",
    },
    notes: [
      "Very popular in Maharashtra for balancing English exposure.",
      "Reduces difficulty of sudden switch from Marathi to English in higher classes.",
      "Widely preferred for 8th–10th students aiming for Science stream.",
    ],
  },

  // ---------------------------------------------------------
  // HINDI MEDIUM  → ONLY CBSE
  // ---------------------------------------------------------
  {
    medium_name: "Hindi Medium",
    slug: "hindi",
    description:
      "Hindi medium is commonly used in CBSE government schools and Kendriya Vidyalayas. NCERT provides full Hindi-medium textbook support.",
    used_in_boards: ["CBSE"],
    classes_available: "8th to 12th",
    subjects_common: {
      science: ["भौतिकी", "रसायन", "जीवविज्ञान", "गणित"],
      commerce: ["लेखांकन", "अर्थशास्त्र", "व्यवसाय अध्ययन"],
      arts: ["इतिहास", "भूगोल", "राजनीति विज्ञान", "मनोविज्ञान"],
    },
    difficulty_level: "moderate",
    official_textbook_source: "NCERT (Hindi Medium)",
    exam_language_rules: [
      "Students can write answers fully in Hindi.",
      "CBSE provides Hindi medium question papers.",
      "Optional bilingual examination for some subjects.",
    ],
    ui: {
      color: "#dc2626",
      icon: "📕",
      image: "/images/mediums/hindi.png",
    },
    notes: [
      "Mostly used in government schools across India.",
      "Strong NCERT support ensures high-quality content.",
      "Suitable for students planning Hindi-medium competitive exams.",
    ],
  },
];
