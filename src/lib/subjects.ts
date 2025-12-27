// lib/subjects.ts

export type BoardSlug = "icse" | "msbshse" | "cbse";
export type MediumSlug =
  | "english"
  | "marathi"
  | "semi-english"
  | "hindi"
  | "all";

// matches your URL values: "8", "11-arts", "12-humanities", etc.
export type ClassKey =
  | "8"
  | "9"
  | "10"
  | "11-arts"
  | "11-commerce"
  | "11-science"
  | "11-humanities"
  | "12-arts"
  | "12-commerce"
  | "12-science"
  | "12-humanities";

export type SubjectCategory = "language" | "core" | "elective" | "skill";

export interface Subject {
  code: string; // internal code, e.g. "eng", "maths"
  name: string; // display name
  shortName?: string;
  slug: string; // URL-friendly slug
  category: SubjectCategory;
  isCompulsory: boolean;
  stream?: "science" | "commerce" | "arts" | "humanities" | "all";
  description?: string;
}

export interface BoardMediumClassSubjects {
  board: BoardSlug;
  medium: MediumSlug; // "all" means applies to all mediums for that board
  classKey: ClassKey;
  subjects: Subject[];
}

// Helper creators
const toSlug = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const core = (
  code: string,
  name: string,
  shortName: string,
  description?: string,
  stream: Subject["stream"] = undefined,
  isCompulsory = true
): Subject => ({
  code,
  name,
  shortName,
  slug: toSlug(name), // 👈 NEW
  category: "core",
  isCompulsory,
  stream,
  description,
});

const elective = (
  code: string,
  name: string,
  shortName: string,
  description?: string,
  stream: Subject["stream"] = undefined,
  isCompulsory = false
): Subject => ({
  code,
  name,
  shortName,
  slug: toSlug(name), // 👈 NEW
  category: "elective",
  isCompulsory,
  stream,
  description,
});

const lang = (
  code: string,
  name: string,
  shortName: string,
  description?: string
): Subject => ({
  code,
  name,
  shortName,
  slug: toSlug(shortName), // 👈 NEW
  category: "language",
  isCompulsory: true,
  stream: undefined,
  description,
});

// -----------------------------------------------------------------------------
// MAIN DATA
// -----------------------------------------------------------------------------

export const BOARD_MEDIUM_CLASS_SUBJECTS: BoardMediumClassSubjects[] = [
  // ===========================================================================
  // ICSE (All Mediums) – 8th, 9th, 10th
  // ===========================================================================

  {
    board: "icse",
    medium: "all",
    classKey: "8",
    subjects: [
      lang("eng", "English", "English"),
      lang("2nd-lang", "Second Language", "2nd Lang"),
      core("maths", "Mathematics", "Maths"),
      core("phy", "Physics", "Physics"),
      core("chem", "Chemistry", "Chem"),
      core("bio", "Biology", "Bio"),
      core("hist-civ", "History & Civics", "Hist & Civics"),
      core("geo", "Geography", "Geography"),
      elective("comp-app", "Computer Applications", "Comp App"),
      elective("art", "Art Education", "Art"),
    ],
  },
  {
    board: "icse",
    medium: "all",
    classKey: "9",
    subjects: [
      lang("eng", "English", "English"),
      lang("2nd-lang", "Second Language", "2nd Lang"),
      core("maths", "Mathematics", "Maths"),
      core("phy", "Physics", "Physics"),
      core("chem", "Chemistry", "Chem"),
      core("bio", "Biology", "Bio"),
      core("hist-civ", "History & Civics", "Hist & Civics"),
      core("geo", "Geography", "Geography"),
      elective("comp-app", "Computer Applications", "Comp App"),
      elective("eco-app", "Economic Applications", "Eco App"),
    ],
  },
  {
    board: "icse",
    medium: "all",
    classKey: "10",
    subjects: [
      lang("eng", "English", "English"),
      lang("2nd-lang", "Second Language", "2nd Lang"),
      core("maths", "Mathematics", "Maths"),
      core("phy", "Physics", "Physics"),
      core("chem", "Chemistry", "Chem"),
      core("bio", "Biology", "Bio"),
      core("hist-civ", "History & Civics", "Hist & Civics"),
      core("geo", "Geography", "Geography"),
      elective("comp-app", "Computer Applications", "Comp App"),
      elective("comm-app", "Commercial Applications", "Comm App"),
    ],
  },

  // ===========================================================================
  // MSBSHSE (All Mediums) – 8th, 9th, 10th, 11th/12th Arts, Commerce, Science
  // ===========================================================================

  // 8th English Medium
  {
    board: "msbshse",
    medium: "english",
    classKey: "8",
    subjects: [
      lang("eng", "English Balbharati", "English"),
      lang("mar", "Marathi Sulabhbharati", "Marathi"),
      lang("hin", "Hindi Sulabhbharati", "Hindi"),
      core("maths", "Mathematics", "Maths"),
      core("science", "General Science", "Science"),
      core("hist", "History and Civics", "History"),
      core("geo", "Geography", "Geography"),
    ],
  },
  // 9th English Medium
  {
    board: "msbshse",
    medium: "english",
    classKey: "9",
    subjects: [
      lang("eng", "English Kumarbharti", "English"),
      lang("mar", "Marathi Aksharbharati", "Marathi"),
      lang("hin", "Hindi Lokbharti", "Hindi"),
      core("maths-1", "Mathematics 1", "Algebra"),
      core("maths-2", "Mathematics 2", "Geometry"),
      core("science", "Science & Technology", "Science"),
      core("hist", "History and Political Science", "History"),
      core("geo", "Geography", "Geography"),
    ],
  },
  // 10th English Medium
  {
    board: "msbshse",
    medium: "english",
    classKey: "10",
    subjects: [
      lang("eng", "English Kumarbharti", "English"),
      lang("mar", "Marathi Aksharbharati", "Marathi"),
      lang("hin", "Hindi Lokbharti", "Hindi"),
      core("maths-1", "Mathematics 1", "Algebra"),
      core("maths-2", "Mathematics 2", "Geometry"),
      core("science-1", "Science & Technology 1", "Physics & Chemistry"),
      core("science-2", "Science & Technology 2", "Biology & Environment"),
      core("hist", "History and Political Science", "History"),
      core("geo", "Geography", "Geography"),
    ],
  },

  // 11th Arts English Medium
  {
    board: "msbshse",
    medium: "all",
    classKey: "11-arts",
    subjects: [
      lang("eng", "English Yuvakbharthi", "English"),
      lang("hin", "Hindi Yuvakbharthi", "Hindi"),
      core("hist", "History", "History", undefined, "arts"),
      core("geo", "Geography", "Geography", undefined, "arts"),
      core("pol-sci", "Political Science", "Pol Science", undefined, "arts"),
      elective("psy", "Psychology", "Psychology", undefined, "arts"),
      elective("soc", "Sociology", "Sociology", undefined, "arts"),
    ],
  },
  // 12th Arts English Medium
  {
    board: "msbshse",
    medium: "all",
    classKey: "12-arts",
    subjects: [
      lang("eng", "English Yuvakbharthi", "English"),
      lang("hin", "Hindi Yuvakbharthi", "Hindi"),
      core("hist", "History", "History", undefined, "arts"),
      core("geo", "Geography", "Geography", undefined, "arts"),
      core("pol-sci", "Political Science", "Pol Science", undefined, "arts"),
      elective("psy", "Psychology", "Psychology", undefined, "arts"),
      elective("logic", "Logic", "Logic", undefined, "arts"),
    ],
  },

  // 11th Commerce English Medium
  {
    board: "msbshse",
    medium: "all",
    classKey: "11-commerce",
    subjects: [
      lang("eng", "English Yuvakbharthi", "English"),
      lang("hin", "Hindi Yuvakbharthi", "Hindi"),
      core("acct", "Accountancy", "Accounts", undefined, "commerce"),
      core("eco", "Economics", "Economics", undefined, "commerce"),
      core(
        "ocm",
        "Organization of Commerce & Management",
        "OCM",
        undefined,
        "commerce"
      ),
      elective(
        "maths-1",
        "Mathematics & Statistics 1",
        "Maths 1",
        undefined,
        "commerce"
      ),
      elective(
        "maths-2",
        "Mathematics & Statistics 2",
        "Maths 2",
        undefined,
        "commerce"
      ),
      elective("it", "Information Technology", "IT", undefined, "commerce"),
    ],
  },
  // 12th Commerce English Medium
  {
    board: "msbshse",
    medium: "all",
    classKey: "12-commerce",
    subjects: [
      lang("eng", "English Yuvakbharthi", "English"),
      lang("hin", "Hindi Yuvakbharthi", "Hindi"),
      core("acct", "Accountancy", "Accounts", undefined, "commerce"),
      core("eco", "Economics", "Economics", undefined, "commerce"),
      core(
        "ocm",
        "Organization of Commerce & Management",
        "OCM",
        undefined,
        "commerce"
      ),
      elective(
        "maths-1",
        "Mathematics & Statistics 1",
        "Maths 1",
        undefined,
        "commerce"
      ),
      elective(
        "maths-2",
        "Mathematics & Statistics 2",
        "Maths 2",
        undefined,
        "commerce"
      ),
      elective("it", "Information Technology", "IT", undefined, "commerce"),
    ],
  },

  // 11th Science English Medium
  {
    board: "msbshse",
    medium: "english",
    classKey: "11-science",
    subjects: [
      lang("eng", "English Yuvakbharthi", "English"),
      core("phy", "Physics", "Physics", undefined, "science"),
      core("chem", "Chemistry", "Chemistry", undefined, "science"),
      elective(
        "maths-1",
        "Mathematics & Statistics 1",
        "Maths 1",
        undefined,
        "science"
      ),
      elective(
        "maths-2",
        "Mathematics & Statistics 2",
        "Maths 2",
        undefined,
        "science"
      ),
      elective("bio", "Biology", "Biology", undefined, "science"),
      elective("geo", "Geography", "Geography", undefined, "all"),
      elective("hin", "Hindi Yuvakbharthi", "Hindi", undefined, "all"),
      elective("it", "Information Technology", "IT", undefined, "all"),
      elective("cs", "Computer Science", "CS", undefined, "all"),
    ],
  },
  // 12th Science English Medium
  {
    board: "msbshse",
    medium: "english",
    classKey: "12-science",
    subjects: [
      lang("eng", "English Yuvakbharthi", "English"),
      core("phy", "Physics", "Physics", undefined, "science"),
      core("chem", "Chemistry", "Chemistry", undefined, "science"),
      elective(
        "maths-1",
        "Mathematics & Statistics 1",
        "Maths 1",
        undefined,
        "science"
      ),
      elective(
        "maths-2",
        "Mathematics & Statistics 2",
        "Maths 2",
        undefined,
        "science"
      ),
      elective("bio", "Biology", "Biology", undefined, "science"),
      elective("geo", "Geography", "Geography", undefined, "all"),
      elective("hin", "Hindi Yuvakbharthi", "Hindi", undefined, "all"),
      elective("it", "Information Technology", "IT", undefined, "all"),
      elective("cs", "Computer Science", "CS", undefined, "all"),
    ],
  },

  // ===========================================================================
  // CBSE – English Medium: 8,9,10,11/12 Humanities, Commerce, Science
  // ===========================================================================

  // 8th
  {
    board: "cbse",
    medium: "english",
    classKey: "8",
    subjects: [
      lang("eng", "English", "English"),
      lang("hin", "Hindi", "Hindi"),
      lang("sans", "Sanskrit", "Sanskrit"),
      core("maths", "Mathematics", "Maths"),
      core("science", "Science", "Science"),
      core("sst", "Social Science", "SST"),
      elective("comp", "Computer Science", "CS"),
      elective("it", "Information Technology", "IT"),
    ],
  },
  // 9th
  {
    board: "cbse",
    medium: "english",
    classKey: "9",
    subjects: [
      lang("eng", "English", "English"),
      lang("hin", "Hindi", "Hindi"),
      lang("sans", "Sanskrit", "Sanskrit"),
      core("maths", "Mathematics", "Maths"),
      core("science", "Science", "Science"),
      core("sst", "Social Science", "SST"),
      elective(
        "ai",
        "Artificial Intelligence (Skill)",
        "AI",
        "all",
        undefined,
        false
      ),
      elective("it", "Information Technology", "IT"),
    ],
  },
  // 10th
  {
    board: "cbse",
    medium: "english",
    classKey: "10",
    subjects: [
      lang("eng", "English", "English"),
      lang("hin", "Hindi", "Hindi"),
      lang("sans", "Sanskrit", "Sanskrit"),
      core("maths", "Mathematics", "Maths"),
      core("science", "Science", "Science"),
      core("sst", "Social Science", "SST"),
      elective("it", "Information Technology", "IT"),
      elective(
        "ai",
        "Artificial Intelligence (Skill)",
        "AI",
        undefined,
        "all",
        false
      ),
    ],
  },

  // 11th Humanities
  {
    board: "cbse",
    medium: "english",
    classKey: "11-humanities",
    subjects: [
      lang("eng", "English Core", "English"),
      core("hist", "History", "History", undefined, "humanities"),
      core("geo", "Geography", "Geography", undefined, "humanities"),
      core(
        "pol-sci",
        "Political Science",
        "Pol Science",
        undefined,
        "humanities"
      ),
      elective("psy", "Psychology", "Psychology", "humanities"),
      elective("soc", "Sociology", "Sociology", "humanities"),
      elective("fine-art", "Fine Arts", "Fine Arts", "humanities"),
    ],
  },
  // 12th Humanities
  {
    board: "cbse",
    medium: "english",
    classKey: "12-humanities",
    subjects: [
      lang("eng", "English Core", "English"),
      core("hist", "History", "History", undefined, "humanities"),
      core("geo", "Geography", "Geography", undefined, "humanities"),
      core(
        "pol-sci",
        "Political Science",
        "Pol Science",
        undefined,
        "humanities"
      ),
      elective("psy", "Psychology", "Psychology", "humanities"),
      elective("soc", "Sociology", "Sociology", "humanities"),
      elective("fine-art", "Fine Arts", "Fine Arts", "humanities"),
    ],
  },

  // 11th Commerce
  {
    board: "cbse",
    medium: "english",
    classKey: "11-commerce",
    subjects: [
      lang("eng", "English Core", "English"),
      core("acct", "Accountancy", "Accounts", undefined, "commerce"),
      core("bstud", "Business Studies", "B. Studies", undefined, "commerce"),
      core("eco", "Economics", "Economics", undefined, "commerce"),
      elective("maths", "Mathematics / Applied Maths", "Maths", "commerce"),
      elective("ip", "Information Practices", "IP", "commerce"),
    ],
  },
  // 12th Commerce
  {
    board: "cbse",
    medium: "english",
    classKey: "12-commerce",
    subjects: [
      lang("eng", "English Core", "English"),
      core("acct", "Accountancy", "Accounts", undefined, "commerce"),
      core("bstud", "Business Studies", "B. Studies", undefined, "commerce"),
      core("eco", "Economics", "Economics", undefined, "commerce"),
      elective("maths", "Mathematics / Applied Maths", "Maths", "commerce"),
      elective("ip", "Informatics Practices", "IP", "commerce"),
    ],
  },

  // 11th Science
  {
    board: "cbse",
    medium: "english",
    classKey: "11-science",
    subjects: [
      lang("eng", "English Core", "English"),
      core("phy", "Physics", "Physics", undefined, "science"),
      core("chem", "Chemistry", "Chemistry", undefined, "science"),
      core("maths", "Mathematics", "Maths", undefined, "science"),
      elective("bio", "Biology", "Biology", "science"),
      elective("cs", "Computer Science", "CS", "science"),
      elective("ip", "Informatics Practices", "IP", "science"),
    ],
  },
  // 12th Science
  {
    board: "cbse",
    medium: "english",
    classKey: "12-science",
    subjects: [
      lang("eng", "English Core", "English"),
      core("phy", "Physics", "Physics", undefined, "science"),
      core("chem", "Chemistry", "Chemistry", undefined, "science"),
      core("maths", "Mathematics", "Maths", undefined, "science"),
      elective("bio", "Biology", "Biology", "science"),
      elective("cs", "Computer Science", "CS", "science"),
      elective("ip", "Informatics Practices", "IP", "science"),
    ],
  },

  // ===========================================================================
  // CBSE – Hindi Medium: 8, 9, 10
  // ===========================================================================

  {
    board: "cbse",
    medium: "hindi",
    classKey: "8",
    subjects: [
      lang("hin", "Hindi", "Hindi"),
      lang("eng", "English", "English"),
      core("maths", "गणित (Mathematics)", "Maths"),
      core("science", "विज्ञान (Science)", "Science"),
      core("sst", "सामाजिक विज्ञान (Social Science)", "SST"),
    ],
  },
  {
    board: "cbse",
    medium: "hindi",
    classKey: "9",
    subjects: [
      lang("hin", "Hindi", "Hindi"),
      lang("eng", "English", "English"),
      core("maths", "गणित (Mathematics)", "Maths"),
      core("science", "विज्ञान (Science)", "Science"),
      core("sst", "सामाजिक विज्ञान (Social Science)", "SST"),
    ],
  },
  {
    board: "cbse",
    medium: "hindi",
    classKey: "10",
    subjects: [
      lang("hin", "Hindi", "Hindi"),
      lang("eng", "English", "English"),
      core("maths", "गणित (Mathematics)", "Maths"),
      core("science", "विज्ञान (Science)", "Science"),
      core("sst", "सामाजिक विज्ञान (Social Science)", "SST"),
    ],
  },
];

// -----------------------------------------------------------------------------
// HELPER FUNCTIONS
// -----------------------------------------------------------------------------

export const getSubjectsFor = (
  board: BoardSlug,
  medium: MediumSlug,
  classKey: ClassKey
): Subject[] => {
  // Try exact match (board + medium)
  const exact = BOARD_MEDIUM_CLASS_SUBJECTS.find(
    (entry) =>
      entry.board === board &&
      entry.medium === medium &&
      entry.classKey === classKey
  );
  if (exact) return exact.subjects;

  // Fallback to "all" medium for that board
  const fallback = BOARD_MEDIUM_CLASS_SUBJECTS.find(
    (entry) =>
      entry.board === board &&
      entry.medium === "all" &&
      entry.classKey === classKey
  );
  return fallback ? fallback.subjects : [];
};
