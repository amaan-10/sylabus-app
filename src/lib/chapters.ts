// lib/chapters.ts

import type { BoardSlug, MediumSlug, ClassKey, Subject } from "./subjects";

// Basic question types for your platform
export type QuestionType = "mcq" | "short" | "long" | "true-false" | "fill" | "numerical";

// Difficulty levels
export type Difficulty = "easy" | "medium" | "hard";

// A single question inside a chapter
export interface Question {
  id: string;               // unique per chapter (e.g. "q1")
  type: QuestionType;
  difficulty: Difficulty;
  marks: number;
  text: string;
  options?: string[];       // for MCQ / True-False
  answer?: string;          // expected answer or correct option
  explanation?: string;     // optional explanation
  tags?: string[];          // e.g. ["algebra", "conceptual"]
}

// A chapter within a subject
export interface Chapter {
  id: string;               // unique within subject (e.g. "ch1")
  chapterNumber: number;
  title: string;
  slug: string;             // URL-safe (e.g. "number-systems")
  description?: string;
  topics?: string[];
  learningObjectives?: string[];
  questions: Question[];
}

// A mapping of (board + medium + class + subject) → chapters
export interface SubjectChapters {
  board: BoardSlug;
  medium: MediumSlug | "all"; // "all" = applies to all mediums of that board
  classKey: ClassKey;
  subjectSlug: string;        // must match Subject.slug from subjects.ts
  chapters: Chapter[];
}

// Helper to create slug from string
const slugify = (value: string): string =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// Helper to build simple question IDs
const qId = (chapterId: string, index: number) => `${chapterId}-q${index + 1}`;

// -----------------------------------------------------------------------------
// MAIN DATA
// NOTE: This is a *starting dataset* with example chapters/questions.
//       You can keep pushing more entries to this array per subject.
// -----------------------------------------------------------------------------

export const SUBJECT_CHAPTERS: SubjectChapters[] = [
  // ===========================================================================
  // ICSE – All Mediums – Example: Class 8, 9, 10 (English, Maths, Physics)
  // ===========================================================================

  // ICSE Class 8 – Mathematics
  {
    board: "icse",
    medium: "all",
    classKey: "8",
    subjectSlug: "mathematics", // from subjects.ts slug
    chapters: [
      {
        id: "icse-8-maths-ch1",
        chapterNumber: 1,
        title: "Rational Numbers",
        slug: slugify("Rational Numbers"),
        description: "Introduction to rational numbers and their properties.",
        topics: ["Number line", "Operations on rational numbers"],
        learningObjectives: [
          "Represent rational numbers on the number line",
          "Perform operations with rational numbers",
        ],
        questions: [
          {
            id: qId("icse-8-maths-ch1", 0),
            type: "mcq",
            difficulty: "easy",
            marks: 1,
            text: "Which of the following is a rational number?",
            options: ["√2", "π", "3/4", "√5"],
            answer: "3/4",
            explanation: "A rational number can be expressed as p/q where q ≠ 0.",
            tags: ["concept", "definition"],
          },
          {
            id: qId("icse-8-maths-ch1", 1),
            type: "short",
            difficulty: "medium",
            marks: 2,
            text: "Add 3/5 and 2/15 and simplify your answer.",
            answer: "11/15",
            explanation: "LCM of 5 and 15 is 15. 3/5 = 9/15, so 9/15 + 2/15 = 11/15.",
            tags: ["addition", "fractions"],
          },
        ],
      },
      {
        id: "icse-8-maths-ch2",
        chapterNumber: 2,
        title: "Algebraic Expressions",
        slug: slugify("Algebraic Expressions"),
        description: "Basics of algebraic expressions and simplification.",
        topics: ["Like & unlike terms", "Addition & subtraction of expressions"],
        learningObjectives: [
          "Identify like and unlike terms",
          "Simplify algebraic expressions",
        ],
        questions: [
          {
            id: qId("icse-8-maths-ch2", 0),
            type: "short",
            difficulty: "easy",
            marks: 2,
            text: "Simplify: 3x + 5x - 2x",
            answer: "6x",
            explanation: "3x + 5x - 2x = (3+5-2)x = 6x.",
            tags: ["algebra", "simplification"],
          },
        ],
      },
    ],
  },

  // ICSE Class 10 – Physics
  {
    board: "icse",
    medium: "all",
    classKey: "10",
    subjectSlug: "physics",
    chapters: [
      {
        id: "icse-10-phy-ch1",
        chapterNumber: 1,
        title: "Force and Pressure",
        slug: slugify("Force and Pressure"),
        description: "Understanding different types of forces and pressure.",
        topics: ["Balanced and unbalanced forces", "Pressure in fluids"],
        learningObjectives: [
          "Classify different types of forces",
          "Explain pressure in solids, liquids and gases",
        ],
        questions: [
          {
            id: qId("icse-10-phy-ch1", 0),
            type: "mcq",
            difficulty: "easy",
            marks: 1,
            text: "SI unit of force is:",
            options: ["dyne", "newton", "joule", "pascal"],
            answer: "newton",
            explanation: "The SI unit of force is newton (N).",
            tags: ["units", "basic"],
          },
          {
            id: qId("icse-10-phy-ch1", 1),
            type: "long",
            difficulty: "medium",
            marks: 5,
            text: "Explain with example how pressure changes with area on which a force acts.",
            answer:
              "Pressure is inversely proportional to the area. For the same force, smaller area means more pressure. Example: a sharp knife cuts better than a blunt knife.",
            tags: ["pressure", "conceptual"],
          },
        ],
      },
    ],
  },

  // ===========================================================================
  // MSBSHSE – All Mediums – Example: 10th Science, 11th Science, 12th Commerce
  // ===========================================================================

  // MSBSHSE Class 10
  {
  board: "msbshse",
  medium: "english",
  classKey: "10",
  subjectSlug: "science-technology-1",
  chapters: [
    {
      id: "ms-10-sci-ch1",
      chapterNumber: 1,
      title: "Gravitation",
      "slug": "gravitation",
      "description": "Concept of gravitational force, Newton’s law of gravitation, Kepler’s laws, free fall, acceleration due to gravity, escape velocity, and weightlessness.",
      "topics": [
        "Newton’s Law of Gravitation",
        "Kepler's Laws",
        "Centripetal Force",
        "Acceleration due to Gravity",
        "Free Fall",
        "Escape Velocity",
        "Weight vs Mass",
        "Gravitational Potential Energy"
      ],
      "learningObjectives": [
        "Explain Newton’s universal law of gravitation.",
        "Apply Kepler’s laws to planetary motion.",
        "Differentiate between mass and weight.",
        "Solve numerical problems based on gravitational force and free fall.",
        "Define escape velocity and weightlessness."
      ],
      "questions": [
        {
          "id": "ms-10-sci-ch1-q1",
          "type": "short",
          "difficulty": "easy",
          "marks": 2,
          "text": "State Newton’s universal law of gravitation.",
          "answer": "According to the law, every object in the universe attracts every other object with a force directly proportional to the product of their masses and inversely proportional to the square of the distance between them.",
          "tags": ["definition", "gravitation"]
        },
        {
          "id": "ms-10-sci-ch1-q2",
          "type": "mcq",
          "difficulty": "easy",
          "marks": 1,
          "text": "Which force is responsible for circular motion of a stone tied to a string rotating in a horizontal circle?",
          "options": ["Centrifugal force", "Gravitational force", "Centripetal force", "Frictional force"],
          "answer": "Centripetal force",
          "tags": ["centripetal-force"]
        },
        {
          "id": "ms-10-sci-ch1-q3",
          "type": "short",
          "difficulty": "medium",
          "marks": 3,
          "text": "State Kepler’s second law of planetary motion and explain its meaning.",
          "answer": "Kepler’s second law states that the line joining a planet and the Sun sweeps out equal areas in equal intervals of time. This means planets move faster when closer to the Sun and slower when farther away.",
          "tags": ["kepler-laws"]
        },
        {
          "id": "ms-10-sci-ch1-q4",
          "type": "numerical",
          "difficulty": "medium",
          "marks": 3,
          "text": "Two masses of 10 kg and 20 kg are placed 2 m apart. Calculate the gravitational force between them. Take G = 6.67 × 10⁻¹¹ Nm²/kg².",
          "answer": "F = Gm₁m₂ / r² = (6.67×10⁻¹¹ × 10 × 20) / 4 = 3.335 × 10⁻⁹ N.",
          "tags": ["numerical", "gravitation"]
        },
        {
          "id": "ms-10-sci-ch1-q5",
          "type": "long",
          "difficulty": "hard",
          "marks": 5,
          "text": "Explain how Kepler’s third law helped Newton derive the inverse square law of gravitation.",
          "answer": "Kepler’s third law states that T² ∝ r³. Using circular motion, centripetal force F = mv²/r and v = 2πr/T. Substituting these into the equation shows that F ∝ 1/r², indicating that the gravitational force decreases with the square of distance.",
          "tags": ["kepler-laws", "derivation"]
        },
        {
          "id": "ms-10-sci-ch1-q6",
          "type": "mcq",
          "difficulty": "medium",
          "marks": 1,
          "text": "The value of acceleration due to gravity ‘g’ is highest at:",
          "options": ["Equator", "Poles", "Mount Everest", "Centre of the Earth"],
          "answer": "Poles",
          "tags": ["acceleration-due-to-gravity"]
        },
        {
          "id": "ms-10-sci-ch1-q7",
          "type": "short",
          "difficulty": "easy",
          "marks": 2,
          "text": "What is free fall?",
          "answer": "When an object moves only under the influence of gravitational force, it is said to be in free fall.",
          "tags": ["free-fall"]
        },
        {
          "id": "ms-10-sci-ch1-q8",
          "type": "numerical",
          "difficulty": "medium",
          "marks": 3,
          "text": "A stone is dropped from a height of 80 m. Calculate the time taken to reach the ground. (g = 10 m/s²)",
          "answer": "Using s = ½gt² → 80 = 5t² → t² = 16 → t = 4 s.",
          "tags": ["numerical", "free-fall"]
        },
        {
          "id": "ms-10-sci-ch1-q9",
          "type": "short",
          "difficulty": "medium",
          "marks": 3,
          "text": "Define escape velocity and state its value on Earth.",
          "answer": "Escape velocity is the minimum velocity required for an object to escape Earth’s gravitational pull without falling back. For Earth, it is 11.2 km/s.",
          "tags": ["escape-velocity"]
        },
        {
          "id": "ms-10-sci-ch1-q10",
          "type": "long",
          "difficulty": "hard",
          "marks": 5,
          "text": "Explain the concept of weightlessness in spacecraft.",
          "answer": "Space travellers appear weightless because spacecraft and everything inside it are in free fall under Earth's gravity. Since all fall with the same acceleration, no normal force acts on the astronauts, making them feel weightless.",
          "tags": ["weightlessness", "gravity"]
        }
      ]
    },
    {
  "id": "ms-10-sci-ch2",
  "chapterNumber": 2,
  "title": "Periodic Classification of Elements",
  "slug": "periodic-classification-of-elements",
  "description": "Classification of elements, Dobereiner’s triads, Newlands’ law of octaves, Mendeleev’s periodic table, and the evolution of modern periodic classification.",
  "topics": [
    "Need for classification",
    "Dobereiner’s Triads",
    "Newlands’ Law of Octaves",
    "Mendeleev’s Periodic Table",
    "Periodic Law",
    "Limitations of early classification methods"
  ],
  "learningObjectives": [
    "Explain why elements are classified.",
    "Describe Dobereiner's triads with examples.",
    "State Newlands’ law of octaves and identify its limitations.",
    "Explain the construction and advantages of Mendeleev’s periodic table.",
    "Apply periodic classification to compare element properties."
  ],
  "questions": [
    {
      "id": "ms-10-sci-ch2-q1",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "What were Dobereiner’s triads? Give one example.",
      "answer": "Dobereiner classified elements into groups of three with similar properties, where the atomic mass of the middle element was approximately the mean of the other two. Example: Li (6.9), Na (23), K (39.1).",
      "tags": ["triads", "classification"]
    },
    {
      "id": "ms-10-sci-ch2-q2",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "According to Newlands’ law of octaves, the properties of elements repeat after:",
      "options": ["Every 5th element", "Every 7th element", "Every 8th element", "Every 10th element"],
      "answer": "Every 8th element",
      "tags": ["octaves"]
    },
    {
      "id": "ms-10-sci-ch2-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "State Newlands’ law of octaves and mention one limitation.",
      "answer": "Newlands stated that when elements are arranged in increasing order of atomic mass, every eighth element shows properties similar to the first. Limitation: The law was applicable only up to calcium and could not accommodate newly discovered elements.",
      "tags": ["octaves", "limitations"]
    },
    {
      "id": "ms-10-sci-ch2-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Explain how Mendeleev arranged the elements in his periodic table.",
      "answer": "Mendeleev arranged 63 elements in increasing order of atomic mass and grouped them based on similarities in the chemical and physical properties of their oxides and hydrides.",
      "tags": ["mendeleev"]
    },
    {
      "id": "ms-10-sci-ch2-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 1,
      "text": "Which property did Mendeleev consider fundamental while preparing the periodic table?",
      "options": ["Atomic number", "Atomic mass", "Density", "Electronegativity"],
      "answer": "Atomic mass",
      "tags": ["mendeleev"]
    },
    {
      "id": "ms-10-sci-ch2-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Write two achievements of Mendeleev’s periodic table.",
      "answer": "1. It predicted the existence and properties of undiscovered elements. 2. It grouped elements with similar properties together and corrected wrong atomic masses.",
      "tags": ["mendeleev", "achievements"]
    },
    {
      "id": "ms-10-sci-ch2-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Why could Newlands not include noble gases in his law of octaves?",
      "answer": "Noble gases had not been discovered at the time, and their later inclusion disturbed the arrangement because they appeared after every seven elements.",
      "tags": ["octaves", "limitations"]
    },
    {
      "id": "ms-10-sci-ch2-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Discuss the limitations of Mendeleev’s periodic table.",
      "answer": "1. Position of hydrogen was uncertain as it resembled both alkali metals and halogens. 2. Increasing atomic mass did not always match with chemical properties, causing element reversal (e.g., Co and Ni). 3. No place for isotopes since they have identical properties but different masses. 4. The table could not fully explain the structure of atoms.",
      "tags": ["limitations", "mendeleev"]
    },
    {
      "id": "ms-10-sci-ch2-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Compare Dobereiner’s triads, Newlands’ octaves, and Mendeleev’s periodic table.",
      "answer": "Dobereiner grouped elements in triads based on atomic mass mean values. Newlands arranged elements in increasing atomic mass and observed repetition every eighth element. Mendeleev arranged elements by atomic mass but grouped them by chemical properties, predicting new elements and correcting atomic masses.",
      "tags": ["comparison", "classification"]
    },
    {
      "id": "ms-10-sci-ch2-q10",
      "type": "short",
      "difficulty": "hard",
      "marks": 4,
      "text": "Explain how Mendeleev predicted the existence of undiscovered elements.",
      "answer": "While arranging elements, Mendeleev noticed gaps where no known element fit the expected chemical properties. He left these gaps and predicted elements like eka-silicon and eka-aluminium, describing their properties accurately before their discovery.",
      "tags": ["mendeleev", "prediction"]
    }
  ]
}, {
  "id": "ms-10-sci-ch3",
  "chapterNumber": 3,
  "title": "Chemical Reactions and Equations",
  "slug": "chemical-reactions-and-equations",
  "description": "Types of chemical reactions, balancing equations, oxidation-reduction, and identification of chemical change.",
  "topics": [
    "Chemical equations",
    "Balancing equations",
    "Types of chemical reactions",
    "Oxidation and reduction",
    "Displacement & double displacement reactions",
    "Neutralization and precipitation"
  ],
  "learningObjectives": [
    "Write and balance chemical equations.",
    "Differentiate between various types of chemical reactions.",
    "Identify oxidation and reduction processes.",
    "Explain displacement, decomposition, and combination reactions.",
    "Interpret chemical change through observations."
  ],
  "questions": [
    {
      "id": "ms-10-sci-ch3-q1",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "Define a chemical reaction with one example.",
      "answer": "A chemical reaction is a process in which reactants convert into products with new chemical properties. Example: 2H₂ + O₂ → 2H₂O.",
      "tags": ["definition"]
    },
    {
      "id": "ms-10-sci-ch3-q2",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Which of the following is a decomposition reaction?",
      "options": ["2Mg + O₂ → 2MgO", "CaCO₃ → CaO + CO₂", "Zn + CuSO₄ → ZnSO₄ + Cu", "HCl + NaOH → NaCl + H₂O"],
      "answer": "CaCO₃ → CaO + CO₂",
      "tags": ["types-of-reaction"]
    },
    {
      "id": "ms-10-sci-ch3-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Why do chemical equations need to be balanced?",
      "answer": "Chemical equations must be balanced to follow the law of conservation of mass, which states that matter cannot be created or destroyed in a chemical reaction.",
      "tags": ["balancing"]
    },
    {
      "id": "ms-10-sci-ch3-q4",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 1,
      "text": "Which of the following reactions is a redox reaction?",
      "options": [
        "Zn + CuSO₄ → ZnSO₄ + Cu",
        "AgNO₃ + NaCl → AgCl + NaNO₃",
        "HCl + NaOH → NaCl + H₂O",
        "CaO + H₂O → Ca(OH)₂"
      ],
      "answer": "Zn + CuSO₄ → ZnSO₄ + Cu",
      "tags": ["oxidation-reduction"]
    },
    {
      "id": "ms-10-sci-ch3-q5",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "State any two observations that indicate a chemical reaction is taking place.",
      "answer": "1. Formation of precipitate. 2. Change in color. 3. Evolution of gas. 4. Change in temperature.",
      "tags": ["observations"]
    },
    {
      "id": "ms-10-sci-ch3-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Write the balanced equation for the reaction between aluminium and oxygen.",
      "answer": "4Al + 3O₂ → 2Al₂O₃",
      "tags": ["balancing"]
    },
    {
      "id": "ms-10-sci-ch3-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is oxidation? Give one example.",
      "answer": "Oxidation is the process in which a substance gains oxygen or loses electrons. Example: 2Mg + O₂ → 2MgO.",
      "tags": ["oxidation"]
    },
    {
      "id": "ms-10-sci-ch3-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain displacement and double displacement reactions with suitable examples.",
      "answer": "In displacement reactions, a more reactive element displaces a less reactive element from its compound. Example: Zn + CuSO₄ → ZnSO₄ + Cu. In double displacement reactions, ions of two compounds exchange places to form new compounds. Example: AgNO₃ + NaCl → AgCl (ppt) + NaNO₃.",
      "tags": ["displacement"]
    },
    {
      "id": "ms-10-sci-ch3-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Describe the various types of chemical reactions with one example each.",
      "answer": "1. Combination: 2Mg + O₂ → 2MgO. 2. Decomposition: CaCO₃ → CaO + CO₂. 3. Displacement: Fe + CuSO₄ → FeSO₄ + Cu. 4. Double displacement: BaCl₂ + Na₂SO₄ → BaSO₄ + 2NaCl. 5. Redox reactions: Zn + CuSO₄ → ZnSO₄ + Cu.",
      "tags": ["types-of-reaction"]
    },
    {
      "id": "ms-10-sci-ch3-q10",
      "type": "short",
      "difficulty": "hard",
      "marks": 4,
      "text": "Explain reduction with an example.",
      "answer": "Reduction is the process in which a substance loses oxygen or gains electrons. Example: CuO + H₂ → Cu + H₂O, where CuO is reduced to Cu.",
      "tags": ["reduction"]
    }
  ]
}, 
{
  "id": "ms-10-sci-ch4",
  "chapterNumber": 4,
  "title": "Effects of Electric Current",
  "slug": "effects-of-electric-current",
  "description": "Heating, magnetic and chemical effects of electric current, electric power, electric circuits and applications.",
  "topics": [
    "Heating effect of current",
    "Joule’s law",
    "Magnetic effect of electric current",
    "Right-hand thumb rule",
    "Electromagnet and its applications",
    "Chemical effect of electric current",
    "Electric power and energy"
  ],
  "learningObjectives": [
    "Explain heating, magnetic, and chemical effects of electric current.",
    "Apply Joule’s law to calculate heat produced.",
    "Describe working of electromagnets and electric motors.",
    "Interpret magnetic field patterns around conductors.",
    "Solve numericals based on electric power and electrical energy."
  ],
  "questions": [
    {
      "id": "ms-10-sci-ch4-q1",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "State Joule’s law of heating.",
      "answer": "Joule’s law states that the heat produced in a conductor is directly proportional to the square of the current, resistance of the conductor, and time: H ∝ I²Rt.",
      "tags": ["joules-law", "heating-effect"]
    },
    {
      "id": "ms-10-sci-ch4-q2",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "What happens when an electric current flows through a conductor?",
      "options": [
        "Only heat is produced",
        "Only magnetic field is produced",
        "Both heat and magnetic field are produced",
        "Nothing happens"
      ],
      "answer": "Both heat and magnetic field are produced",
      "tags": ["effects-of-current"]
    },
    {
      "id": "ms-10-sci-ch4-q3",
      "type": "numerical",
      "difficulty": "medium",
      "marks": 3,
      "text": "Calculate the heat produced when a 2 A current flows through a 5 Ω resistor for 10 seconds.",
      "answer": "Using H = I²Rt → H = (2²)(5)(10) = 200 J.",
      "tags": ["numerical", "joules-law"]
    },
    {
      "id": "ms-10-sci-ch4-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "State the right-hand thumb rule.",
      "answer": "If the right-hand thumb points in the direction of current, the curled fingers show the direction of the magnetic field around the conductor.",
      "tags": ["magnetic-field"]
    },
    {
      "id": "ms-10-sci-ch4-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 1,
      "text": "An electromagnet is stronger when:",
      "options": [
        "The current is reduced",
        "A soft iron core is used",
        "The coil has fewer turns",
        "It is kept in a wooden frame"
      ],
      "answer": "A soft iron core is used",
      "tags": ["electromagnet"]
    },
    {
      "id": "ms-10-sci-ch4-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is the chemical effect of electric current? Give one application.",
      "answer": "When an electric current passes through a conducting solution, chemical reactions occur. Example: Electroplating.",
      "tags": ["chemical-effect"]
    },
    {
      "id": "ms-10-sci-ch4-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Define electric power and write its SI unit.",
      "answer": "Electric power is the rate at which electrical energy is consumed or converted. Its SI unit is watt (W).",
      "tags": ["electric-power"]
    },
    {
      "id": "ms-10-sci-ch4-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain the working of an electric motor using the magnetic effect of current.",
      "answer": "Electric motors work on the principle that a current-carrying conductor experiences a force in a magnetic field. A rectangular coil placed between magnet poles rotates when current flows through it due to the force on its arms. A commutator reverses the current every half turn, ensuring continuous rotation.",
      "tags": ["electric-motor", "magnetic-effect"]
    },
    {
      "id": "ms-10-sci-ch4-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Describe the magnetic field produced around a straight conductor and a solenoid.",
      "answer": "A straight conductor produces concentric circular magnetic field lines around it. A solenoid produces a uniform magnetic field inside, similar to a bar magnet, with a north and south pole. The field strength increases with increased current and number of turns.",
      "tags": ["magnetic-field", "solenoid"]
    },
    {
      "id": "ms-10-sci-ch4-q10",
      "type": "numerical",
      "difficulty": "hard",
      "marks": 4,
      "text": "A device consumes 1000 W of power and operates for 3 hours. Calculate the electrical energy consumed in kWh.",
      "answer": "Energy = Power × Time = 1000 W × 3 h = 3 kWh.",
      "tags": ["numerical", "electric-energy"]
    }
  ]
}, {
  "id": "ms-10-sci-ch5",
  "chapterNumber": 5,
  "title": "Heat",
  "slug": "heat",
  "description": "Temperature, modes of heat transfer, latent heat, specific heat capacity, calorimetry, and change of state.",
  "topics": [
    "Temperature and heat",
    "Specific heat capacity",
    "Latent heat",
    "Change of state",
    "Conduction, convection, radiation",
    "Calorimetry"
  ],
  "learningObjectives": [
    "Differentiate between heat and temperature.",
    "Explain conduction, convection, and radiation.",
    "Define specific heat capacity and latent heat.",
    "Solve numerical problems based on heat calculations.",
    "Explain real-life applications of heat transfer."
  ],
  "questions": [
    {
      "id": "ms-10-sci-ch5-q1",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "What is specific heat capacity?",
      "answer": "Specific heat capacity is the amount of heat required to raise the temperature of 1 kg of a substance by 1°C.",
      "tags": ["specific-heat"]
    },
    {
      "id": "ms-10-sci-ch5-q2",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Which mode of heat transfer does NOT require a medium?",
      "options": ["Conduction", "Convection", "Radiation", "All of the above"],
      "answer": "Radiation",
      "tags": ["radiation"]
    },
    {
      "id": "ms-10-sci-ch5-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Differentiate between heat and temperature.",
      "answer": "Heat is a form of energy transferred due to temperature difference, while temperature is a measure of the average kinetic energy of particles in a substance.",
      "tags": ["heat-vs-temperature"]
    },
    {
      "id": "ms-10-sci-ch5-q4",
      "type": "numerical",
      "difficulty": "medium",
      "marks": 3,
      "text": "How much heat is required to raise the temperature of 2 kg of water from 20°C to 40°C? (Specific heat of water = 4200 J/kg°C)",
      "answer": "Q = mcΔT = 2 × 4200 × (40 − 20) = 168,000 J.",
      "tags": ["numerical", "specific-heat"]
    },
    {
      "id": "ms-10-sci-ch5-q5",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is latent heat of fusion?",
      "answer": "Latent heat of fusion is the heat absorbed by a solid to convert into a liquid at constant temperature.",
      "tags": ["latent-heat"]
    },
    {
      "id": "ms-10-sci-ch5-q6",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 1,
      "text": "Convection occurs mainly in:",
      "options": ["Solids", "Liquids and gases", "Vacuum", "Metals"],
      "answer": "Liquids and gases",
      "tags": ["convection"]
    },
    {
      "id": "ms-10-sci-ch5-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Explain why cooking takes longer at high altitudes.",
      "answer": "At high altitudes, atmospheric pressure is lower, so water boils at a lower temperature. Since the temperature is lower, food takes longer to cook.",
      "tags": ["applications"]
    },
    {
      "id": "ms-10-sci-ch5-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain conduction, convection, and radiation with examples.",
      "answer": "Conduction: Heat transfer through solids without movement of particles, e.g., a metal rod heated at one end. Convection: Heat transfer by movement of particles in liquids/gases, e.g., water heating in a vessel. Radiation: Heat transfer through electromagnetic waves, e.g., heat from the Sun.",
      "tags": ["modes-of-heat-transfer"]
    },
    {
      "id": "ms-10-sci-ch5-q9",
      "type": "numerical",
      "difficulty": "hard",
      "marks": 4,
      "text": "How much heat is required to convert 500 g of ice at 0°C into water at 0°C? (Latent heat of fusion of ice = 3.34 × 10⁵ J/kg)",
      "answer": "Q = mL = 0.5 × 3.34 × 10⁵ = 1.67 × 10⁵ J.",
      "tags": ["numerical", "latent-heat"]
    },
    {
      "id": "ms-10-sci-ch5-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Describe the working principle of a calorimeter.",
      "answer": "A calorimeter works on the principle of conservation of energy. It measures heat exchange between substances placed inside it. Its insulating walls prevent external heat loss, allowing accurate measurement of heat gained or lost by materials.",
      "tags": ["calorimetry"]
    }
  ]
}, {
  "id": "ms-10-sci-ch6",
  "chapterNumber": 6,
  "title": "Refraction of Light",
  "slug": "refraction-of-light",
  "description": "Refraction through plane surfaces, laws of refraction, refractive index, optical density, and real-life applications.",
  "topics": [
    "Laws of refraction",
    "Refractive index",
    "Optical density",
    "Refraction through glass slab",
    "Apparent depth",
    "Real and apparent shift",
    "Speed of light in media"
  ],
  "learningObjectives": [
    "State and explain the laws of refraction.",
    "Define refractive index and calculate its value.",
    "Explain optical density and its effect on refraction.",
    "Describe refraction through a glass slab and real-life examples.",
    "Solve numerical problems involving refractive index and velocity of light."
  ],
  "questions": [
    {
      "id": "ms-10-sci-ch6-q1",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "What is refraction of light?",
      "answer": "Refraction is the bending of light when it passes from one transparent medium to another due to a change in its speed.",
      "tags": ["refraction"]
    },
    {
      "id": "ms-10-sci-ch6-q2",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Which quantity determines how much the light bends during refraction?",
      "options": ["Mass", "Refractive index", "Intensity", "Wavelength"],
      "answer": "Refractive index",
      "tags": ["refractive-index"]
    },
    {
      "id": "ms-10-sci-ch6-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "State Snell’s law of refraction.",
      "answer": "Snell’s law states that the ratio of the sine of the angle of incidence to the sine of the angle of refraction is constant for a given pair of media: sin i / sin r = constant = n.",
      "tags": ["snells-law"]
    },
    {
      "id": "ms-10-sci-ch6-q4",
      "type": "numerical",
      "difficulty": "medium",
      "marks": 3,
      "text": "If the refractive index of water is 1.33, find the speed of light in water. (Speed of light in air = 3 × 10⁸ m/s)",
      "answer": "v = c / n = 3 × 10⁸ / 1.33 ≈ 2.26 × 10⁸ m/s.",
      "tags": ["numerical", "refractive-index"]
    },
    {
      "id": "ms-10-sci-ch6-q5",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Explain optical density and how it affects the speed of light.",
      "answer": "A medium with higher optical density slows down light more than a medium of lower optical density. Light bends towards the normal when entering a denser medium.",
      "tags": ["optical-density"]
    },
    {
      "id": "ms-10-sci-ch6-q6",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 1,
      "text": "When a ray of light travels from glass to air, it bends:",
      "options": ["Towards the normal", "Away from the normal", "Stops completely", "Does not bend"],
      "answer": "Away from the normal",
      "tags": ["refraction"]
    },
    {
      "id": "ms-10-sci-ch6-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is meant by apparent depth?",
      "answer": "Due to refraction, an object in a denser medium appears to be raised when viewed from a rarer medium. This apparent shift is called apparent depth.",
      "tags": ["apparent-depth"]
    },
    {
      "id": "ms-10-sci-ch6-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain refraction through a glass slab using a ray diagram and describe lateral shift.",
      "answer": "When light enters a glass slab, it bends towards the normal due to higher density. On emerging, it bends away from the normal, making emergent ray parallel to the incident ray. The perpendicular distance between the emergent and incident rays is called lateral shift.",
      "tags": ["glass-slab", "lateral-shift"]
    },
    {
      "id": "ms-10-sci-ch6-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Describe real-life applications of refraction with at least three examples.",
      "answer": "Examples include: 1) Apparent bending of a stick in water. 2) Formation of mirages. 3) Lenses used in spectacles and cameras. 4) Twinkling of stars due to atmospheric refraction.",
      "tags": ["applications"]
    },
    {
      "id": "ms-10-sci-ch6-q10",
      "type": "numerical",
      "difficulty": "hard",
      "marks": 4,
      "text": "A ray of light enters a medium with angle of incidence 30° and angle of refraction 20°. Calculate the refractive index of the second medium.",
      "answer": "n = sin i / sin r = sin 30° / sin 20° = 0.5 / 0.342 = 1.46.",
      "tags": ["numerical", "snells-law"]
    }
  ]
}, {
  "id": "ms-10-sci-ch7",
  "chapterNumber": 7,
  "title": "Lenses",
  "slug": "lenses",
  "description": "Types of lenses, refraction through lenses, sign conventions, lens formula, magnification, and applications.",
  "topics": [
    "Convex and concave lenses",
    "Refraction through lenses",
    "Rules for ray diagrams",
    "Image formation by lenses",
    "Lens formula",
    "Magnification",
    "Power of lens"
  ],
  "learningObjectives": [
    "Differentiate between convex and concave lenses.",
    "Draw ray diagrams for image formation by lenses.",
    "Use lens formula and magnification formula.",
    "Explain real-life applications of lenses.",
    "Solve numerical problems involving lenses."
  ],
  "questions": [
    {
      "id": "ms-10-sci-ch7-q1",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "What is a convex lens?",
      "answer": "A convex lens is a transparent optical device that is thicker at the center than at the edges and converges incoming parallel rays to a point.",
      "tags": ["convex-lens"]
    },
    {
      "id": "ms-10-sci-ch7-q2",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Which lens diverges parallel rays of light?",
      "options": ["Convex lens", "Concave lens", "Cylindrical lens", "None of these"],
      "answer": "Concave lens",
      "tags": ["concave-lens"]
    },
    {
      "id": "ms-10-sci-ch7-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "State the lens formula and explain each term.",
      "answer": "The lens formula is 1/f = 1/v - 1/u, where f = focal length, v = image distance, and u = object distance.",
      "tags": ["lens-formula"]
    },
    {
      "id": "ms-10-sci-ch7-q4",
      "type": "numerical",
      "difficulty": "medium",
      "marks": 3,
      "text": "An object is placed 20 cm from a convex lens of focal length 10 cm. Find the image distance.",
      "answer": "Using 1/f = 1/v - 1/u → 1/10 = 1/v + 1/20 → 1/v = 1/10 - 1/20 = 1/20 → v = 20 cm.",
      "tags": ["numerical", "lens-formula"]
    },
    {
      "id": "ms-10-sci-ch7-q5",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Explain the sign convention used for lenses.",
      "answer": "All distances are measured from the optical center. The direction of incident light is positive. Distances measured against the direction of incident light are negative. Heights above the principal axis are positive, below are negative.",
      "tags": ["sign-convention"]
    },
    {
      "id": "ms-10-sci-ch7-q6",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 1,
      "text": "A concave lens always forms:",
      "options": ["Real and inverted image", "Virtual and erect image", "Real and erect image", "Enlarged image"],
      "answer": "Virtual and erect image",
      "tags": ["concave-lens"]
    },
    {
      "id": "ms-10-sci-ch7-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is magnification? Write its formula.",
      "answer": "Magnification is the ratio of the height of the image to the height of the object. m = h₂/h₁ = v/u.",
      "tags": ["magnification"]
    },
    {
      "id": "ms-10-sci-ch7-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Describe image formation by a convex lens when the object is placed beyond 2F.",
      "answer": "When the object is beyond 2F, the image is formed between F and 2F, real, inverted, and smaller in size. Ray diagram: 1) A ray parallel to principal axis passes through F. 2) A ray through optical center continues straight without deviation.",
      "tags": ["ray-diagram", "convex-lens"]
    },
    {
      "id": "ms-10-sci-ch7-q9",
      "type": "numerical",
      "difficulty": "hard",
      "marks": 4,
      "text": "Calculate the power of a lens of focal length +50 cm.",
      "answer": "P = 1/f (in meters) → f = 0.50 m → P = 1/0.50 = +2 diopters.",
      "tags": ["power-of-lens"]
    },
    {
      "id": "ms-10-sci-ch7-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain the working of a compound microscope.",
      "answer": "A compound microscope uses two convex lenses—the objective lens and eyepiece. The objective lens forms a magnified real image of the object near its focus. The eyepiece further magnifies this image, producing a highly enlarged virtual image.",
      "tags": ["application", "microscope"]
    }
  ]
}, {
  "id": "ms-10-sci-ch8",
  "chapterNumber": 8,
  "title": "Metallurgy",
  "slug": "metallurgy",
  "description": "Occurrence of metals, concentration of ore, extraction processes, refining methods, and applications of metals.",
  "topics": [
    "Occurrence of metals",
    "Minerals and ores",
    "Steps in metallurgy",
    "Concentration of ores",
    "Extraction of metals",
    "Thermal and electrolytic reduction",
    "Refining of metals"
  ],
  "learningObjectives": [
    "Explain the terms mineral, ore, and metallurgy.",
    "Describe various methods of concentration of ore.",
    "Explain extraction steps for metals of different reactivity.",
    "Differentiate between roasting and calcination.",
    "Describe refining methods and real-life applications."
  ],
  "questions": [
    {
      "id": "ms-10-sci-ch8-q1",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "What is an ore?",
      "answer": "An ore is a naturally occurring mineral from which a metal can be extracted profitably and conveniently.",
      "tags": ["ore"]
    },
    {
      "id": "ms-10-sci-ch8-q2",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Which process is used to remove impurities lighter than the ore?",
      "options": ["Magnetic separation", "Froth flotation", "Gravity separation", "Electrolysis"],
      "answer": "Froth flotation",
      "tags": ["concentration"]
    },
    {
      "id": "ms-10-sci-ch8-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Differentiate between minerals and ores.",
      "answer": "Minerals are naturally occurring inorganic compounds of metals. Ores are minerals from which extraction of metal is economically feasible.",
      "tags": ["ore", "mineral"]
    },
    {
      "id": "ms-10-sci-ch8-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is roasting?",
      "answer": "Roasting is a process in which sulphide ores are heated in the presence of air to convert them into oxides.",
      "tags": ["roasting"]
    },
    {
      "id": "ms-10-sci-ch8-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 1,
      "text": "Highly reactive metals like sodium and aluminium are extracted by:",
      "options": ["Roasting", "Smelting", "Electrolysis", "Reduction with carbon"],
      "answer": "Electrolysis",
      "tags": ["extraction"]
    },
    {
      "id": "ms-10-sci-ch8-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Explain calcination with one example.",
      "answer": "Calcination is the heating of an ore in the absence of air to remove water or volatile impurities. Example: ZnCO₃ → ZnO + CO₂.",
      "tags": ["calcination"]
    },
    {
      "id": "ms-10-sci-ch8-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Name the three steps in metallurgy.",
      "answer": "1. Concentration of ore, 2. Extraction of metal, 3. Refining of metal.",
      "tags": ["metallurgy-steps"]
    },
    {
      "id": "ms-10-sci-ch8-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Describe the electrolytic extraction of aluminium.",
      "answer": "Aluminium is extracted from alumina (Al₂O₃) using electrolysis. Alumina is dissolved in molten cryolite to lower melting point. In the electrolytic cell, aluminium is deposited at the cathode, while oxygen is released at the carbon anode, which gradually burns away.",
      "tags": ["electrolysis", "aluminium"]
    },
    {
      "id": "ms-10-sci-ch8-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain the process of refining by electrolysis.",
      "answer": "In electrolytic refining, the impure metal is used as the anode and the pure metal as the cathode. The electrolyte contains a salt solution of the metal. Impure metal dissolves from the anode and deposits pure metal on the cathode, leaving impurities as sludge.",
      "tags": ["refining", "electrolysis"]
    },
    {
      "id": "ms-10-sci-ch8-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Describe the extraction of iron from its ore in the blast furnace.",
      "answer": "Iron is extracted from hematite in a blast furnace. Coke acts as a reducing agent, limestone removes impurities as slag, and hot air supports combustion. Iron oxide is reduced to molten iron, which collects at the bottom, while slag floats on top.",
      "tags": ["extraction", "iron", "blast-furnace"]
    }
  ]
}, {
  "id": "ms-10-sci-ch9",
  "chapterNumber": 9,
  "title": "Carbon Compounds",
  "slug": "carbon-compounds",
  "description": "Covalent bonding, versatile nature of carbon, homologous series, functional groups, nomenclature, and chemical properties of carbon compounds.",
  "topics": [
    "Covalent bonding",
    "Characteristics of carbon",
    "Hydrocarbons",
    "Saturated and unsaturated compounds",
    "Homologous series",
    "Functional groups",
    "Nomenclature",
    "Chemical reactions of carbon compounds"
  ],
  "learningObjectives": [
    "Explain the covalent bonding in carbon compounds.",
    "Differentiate between saturated and unsaturated hydrocarbons.",
    "Identify functional groups and name organic compounds.",
    "Understand homologous series and its characteristics.",
    "Describe chemical reactions involving carbon compounds."
  ],
  "questions": [
    {
      "id": "ms-10-sci-ch9-q1",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "What are hydrocarbons?",
      "answer": "Hydrocarbons are organic compounds composed only of carbon and hydrogen atoms.",
      "tags": ["hydrocarbons"]
    },
    {
      "id": "ms-10-sci-ch9-q2",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Which of the following is an alkene?",
      "options": ["C₂H₆", "C₂H₄", "CH₄", "C₃H₈"],
      "answer": "C₂H₄",
      "tags": ["alkenes"]
    },
    {
      "id": "ms-10-sci-ch9-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is a homologous series? State one characteristic.",
      "answer": "A homologous series is a group of organic compounds having the same functional group and general formula. Consecutive members differ by −CH₂− and show a gradual change in properties.",
      "tags": ["homologous-series"]
    },
    {
      "id": "ms-10-sci-ch9-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Differentiate between saturated and unsaturated hydrocarbons.",
      "answer": "Saturated hydrocarbons have only single bonds (alkanes), while unsaturated hydrocarbons contain double or triple bonds (alkenes and alkynes).",
      "tags": ["hydrocarbons"]
    },
    {
      "id": "ms-10-sci-ch9-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 1,
      "text": "Which functional group is present in alcohols?",
      "options": ["–COOH", "–OH", "–CHO", "–COO–"],
      "answer": "–OH",
      "tags": ["functional-groups"]
    },
    {
      "id": "ms-10-sci-ch9-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Name the following compound: CH₃–CH₂–COOH",
      "answer": "Propanoic acid",
      "tags": ["nomenclature"]
    },
    {
      "id": "ms-10-sci-ch9-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Explain the versatile nature of carbon.",
      "answer": "Carbon is versatile due to catenation (ability to form long chains), tetravalency, ability to form strong covalent bonds, and formation of various structures like rings and branched chains.",
      "tags": ["carbon"]
    },
    {
      "id": "ms-10-sci-ch9-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Describe the chemical properties of ethanol.",
      "answer": "1. Combustion: Ethanol burns to form CO₂ and water. 2. Reaction with sodium: Produces sodium ethoxide and hydrogen. 3. Dehydration: Ethanol forms ethene in presence of concentrated H₂SO₄.",
      "tags": ["ethanol"]
    },
    {
      "id": "ms-10-sci-ch9-q9",
      "type": "numerical",
      "difficulty": "hard",
      "marks": 4,
      "text": "Write the molecular formula for the 4th member of the alkene series.",
      "answer": "General formula for alkenes: CₙH₂ₙ → For n = 4: C₄H₈.",
      "tags": ["alkenes"]
    },
    {
      "id": "ms-10-sci-ch9-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain esterification with a chemical equation.",
      "answer": "Esterification is the reaction between an alcohol and a carboxylic acid to form an ester and water. Example: CH₃COOH + C₂H₅OH → CH₃COOC₂H₅ + H₂O.",
      "tags": ["esterification"]
    }
  ]
}, {
  "id": "ms-10-sci-ch10",
  "chapterNumber": 10,
  "title": "Space Missions",
  "slug": "space-missions",
  "description": "Evolution of space missions, satellites, launch vehicles, Indian space programs, and applications of satellites.",
  "topics": [
    "Types of satellites",
    "Orbits of satellites",
    "Launch vehicles",
    "PSLV and GSLV",
    "Indian space research",
    "Applications of satellites",
    "Challenges in space missions"
  ],
  "learningObjectives": [
    "Explain different types of satellites and their uses.",
    "Describe the working and purpose of launch vehicles.",
    "Understand PSLV and GSLV technologies.",
    "Describe major achievements of India in space exploration.",
    "Explain applications of artificial satellites."
  ],
  "questions": [
    {
      "id": "ms-10-sci-ch10-q1",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "What is an artificial satellite?",
      "answer": "An artificial satellite is a man-made object placed in orbit around Earth or another celestial body for communication, research, weather forecasting, and other purposes.",
      "tags": ["satellites"]
    },
    {
      "id": "ms-10-sci-ch10-q2",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Which of the following is a launch vehicle developed by ISRO?",
      "options": ["Falcon 9", "PSLV", "Saturn V", "Soyuz"],
      "answer": "PSLV",
      "tags": ["launch-vehicles"]
    },
    {
      "id": "ms-10-sci-ch10-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Differentiate between geostationary and polar satellites.",
      "answer": "Geostationary satellites orbit Earth at 36,000 km and appear stationary relative to Earth, used for communication. Polar satellites orbit over poles at low altitudes and cover the entire Earth, used for weather and mapping.",
      "tags": ["satellites", "orbits"]
    },
    {
      "id": "ms-10-sci-ch10-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is the purpose of a launch vehicle?",
      "answer": "A launch vehicle is used to carry a satellite or spacecraft into space by overcoming Earth’s gravitational force using high thrust engines.",
      "tags": ["launch-vehicles"]
    },
    {
      "id": "ms-10-sci-ch10-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 1,
      "text": "Which of the following satellites is used for weather forecasting?",
      "options": ["INSAT", "IRNSS", "Cartosat", "Hubble"],
      "answer": "INSAT",
      "tags": ["applications"]
    },
    {
      "id": "ms-10-sci-ch10-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is PSLV? Mention one of its achievements.",
      "answer": "PSLV (Polar Satellite Launch Vehicle) is an ISRO-developed launch vehicle known for launching satellites into polar orbits. It successfully launched 104 satellites in a single mission in 2017.",
      "tags": ["pslv"]
    },
    {
      "id": "ms-10-sci-ch10-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Explain any two applications of artificial satellites.",
      "answer": "1. Communication: TV, internet, telephone signals. 2. Navigation: GPS and location services. 3. Weather forecasting: Predicting natural disasters. 4. Earth observation: Mapping and resource management.",
      "tags": ["applications"]
    },
    {
      "id": "ms-10-sci-ch10-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain the working principle of a geostationary satellite with a diagram.",
      "answer": "A geostationary satellite orbits Earth at 36,000 km in the equatorial plane, completing one revolution in 24 hours. Thus, it appears fixed over one point on Earth. It constantly relays signals for communication. Its orbital speed matches Earth’s rotational speed.",
      "tags": ["geostationary-satellites"]
    },
    {
      "id": "ms-10-sci-ch10-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Describe the features and significance of India’s Mars Orbiter Mission (Mangalyaan).",
      "answer": "Mangalyaan was India's first interplanetary mission launched in 2013. It made India the first Asian nation to reach Mars orbit and the first in the world to do so on its first attempt. It studied Martian atmosphere, surface features, and captured high-resolution images.",
      "tags": ["space-missions", "isro"]
    },
    {
      "id": "ms-10-sci-ch10-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain GSLV and how it differs from PSLV.",
      "answer": "GSLV (Geosynchronous Satellite Launch Vehicle) uses a cryogenic upper stage and is designed to launch heavier satellites into geostationary orbits. PSLV is used mainly for launching lighter satellites into polar orbits. GSLV has higher payload capacity and uses more advanced propulsion.",
      "tags": ["gslv", "pslv"]
    }
  ]
}

  ]
}, {
  board: "msbshse",
  medium: "english",
  classKey: "10",
  subjectSlug: "science-technology-2",
  chapters: [
    {
  "id": "ms-10-sci2-ch1",
  "chapterNumber": 1,
  "title": "Heredity and Evolution",
  "slug": "heredity-and-evolution",
  "description": "Heredity, genes, transcription–translation, mutation, evolution, Lamarckism, Darwin’s theory, speciation, and human evolution.",
  "topics": [
    "Heredity and hereditary changes",
    "DNA, RNA, Transcription",
    "Translation and Translocation",
    "Mutation",
    "Evolution and evidence",
    "Darwin’s theory of natural selection",
    "Lamarckism",
    "Speciation",
    "Human evolution"
  ],
  "learningObjectives": [
    "Explain the mechanisms of heredity and gene expression.",
    "Describe transcription, translation, and mutation.",
    "State major theories and proofs of evolution.",
    "Differentiate Lamarckism and Darwinism.",
    "Understand speciation and human evolutionary history."
  ],
  "questions": [
    {
      "id": "ms-10-sci2-ch1-q1",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "What is heredity?",
      "answer": "Heredity is the transfer of biological characters from one generation to the next through genes. Genes present on chromosomes carry this information. :contentReference[oaicite:3]{index=3}",
      "tags": ["heredity"]
    },
    {
      "id": "ms-10-sci2-ch1-q2",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Which molecule carries the genetic information required for protein synthesis?",
      "options": ["RNA", "DNA", "Glucose", "ATP"],
      "answer": "DNA",
      "tags": ["dna", "genetic-material"]
    },
    {
      "id": "ms-10-sci2-ch1-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is transcription?",
      "answer": "Transcription is the process in which mRNA is synthesized from the DNA template. Only one strand of DNA is used, and uracil replaces thymine in RNA. :contentReference[oaicite:4]{index=4}",
      "tags": ["transcription"]
    },
    {
      "id": "ms-10-sci2-ch1-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Explain translation and translocation in protein synthesis.",
      "answer": "Translation is the process by which tRNA brings amino acids to the mRNA codons to form proteins. Ribosomes move one codon at a time along mRNA—this movement is called translocation. :contentReference[oaicite:5]{index=5}",
      "tags": ["translation", "protein-synthesis"]
    },
    {
      "id": "ms-10-sci2-ch1-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 1,
      "text": "Which scientist proposed the theory of natural selection?",
      "options": ["Lamarck", "Darwin", "Hugo de Vries", "Avery"],
      "answer": "Darwin",
      "tags": ["darwin"]
    },
    {
      "id": "ms-10-sci2-ch1-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is mutation? Give an example.",
      "answer": "Mutation is a sudden change in the nucleotide sequence of a gene. Example: mutation causing sickle cell anaemia. :contentReference[oaicite:6]{index=6}",
      "tags": ["mutation"]
    },
    {
      "id": "ms-10-sci2-ch1-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Differentiate between Lamarckism and Darwinism.",
      "answer": "Lamarckism states that acquired characters are inherited, while Darwinism states that natural selection allows organisms with favorable variations to survive and reproduce. :contentReference[oaicite:7]{index=7}",
      "tags": ["lamarckism", "darwinism"]
    },
    {
      "id": "ms-10-sci2-ch1-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain the evidences of evolution with examples.",
      "answer": "Evidences include morphological similarities (e.g., leaf venation, mouthparts), anatomical evidences (similar bone structure in human hand, bat wing, whale flipper), vestigial organs (appendix, body hair), fossil records showing gradual development, and embryological similarities. :contentReference[oaicite:8]{index=8}",
      "tags": ["evolution-evidence"]
    },
    {
      "id": "ms-10-sci2-ch1-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain speciation. How does geographical isolation contribute to it?",
      "answer": "Speciation is the formation of new species from an existing one when populations accumulate genetic variations over time. Geographical isolation prevents interbreeding, leading to independent evolution and formation of new species. :contentReference[oaicite:9]{index=9}",
      "tags": ["speciation"]
    },
    {
      "id": "ms-10-sci2-ch1-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Describe the evolution of modern humans.",
      "answer": "Human evolution began around 7 crore years ago with lemur-like ancestors. Ape-like ancestors evolved into Dryopithecus, Ramapithecus, Australopithecus, and then upright man. Neanderthal and Cro-Magnon humans followed. Homo sapiens evolved around 50,000 years ago, developed tools, agriculture, and civilizations. :contentReference[oaicite:10]{index=10}",
      "tags": ["human-evolution"]
    }
  ]
}, {
  "id": "ms-10-sci2-ch2",
  "chapterNumber": 2,
  "title": "Life Processes in Living Organisms Part - 1",
  "slug": "life-processes-part-1",
  "description": "Human organ systems, energy production, respiration, digestion, circulation, excretion, and control systems.",
  "topics": [
    "Living organisms and life processes",
    "Energy production in cells",
    "Role of digestive, respiratory and circulatory systems",
    "ATP and mitochondria",
    "Control and coordination",
    "Cell division as a life process"
  ],
  "learningObjectives": [
    "Explain the interdependence of organ systems in the human body.",
    "Describe digestion, respiration, circulation and excretion.",
    "Understand ATP generation and cellular energy production.",
    "Explain the role of control systems such as the nervous and endocrine system.",
    "State the importance of cell division in life processes."
  ],
  "questions": [
    {
      "id": "ms-10-sci2-ch2-q1",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "What is the importance of a balanced diet for the human body?",
      "answer": "A balanced diet provides all essential nutrients required for energy production, growth, repair, and proper functioning of body systems. :contentReference[oaicite:1]{index=1}",
      "tags": ["diet"]
    },
    {
      "id": "ms-10-sci2-ch2-q2",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Which cell organelle is known as the powerhouse of the cell?",
      "options": ["Ribosome", "Mitochondria", "Nucleus", "Golgi body"],
      "answer": "Mitochondria",
      "tags": ["cell-organelles", "mitochondria"]
    },
    {
      "id": "ms-10-sci2-ch2-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is respiration? How does it occur in the human body?",
      "answer": "Respiration is the process of breaking down food to release energy. In humans, oxygen is taken in through breathing and transported to cells where it helps oxidize glucose to release ATP. :contentReference[oaicite:2]{index=2}",
      "tags": ["respiration"]
    },
    {
      "id": "ms-10-sci2-ch2-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Explain the role of digestive juices in digestion.",
      "answer": "Digestive juices contain enzymes that break down complex nutrients like carbohydrates, proteins, and fats into simpler absorbable forms. They help in efficient nutrient absorption. :contentReference[oaicite:3]{index=3}",
      "tags": ["digestion"]
    },
    {
      "id": "ms-10-sci2-ch2-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 1,
      "text": "Which system carries oxygen and nutrients to every cell of the body?",
      "options": ["Respiratory system", "Digestive system", "Circulatory system", "Excretory system"],
      "answer": "Circulatory system",
      "tags": ["circulation"]
    },
    {
      "id": "ms-10-sci2-ch2-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Why is oxygen essential for energy production in cells?",
      "answer": "Oxygen is necessary for the oxidation of food molecules in mitochondria. This oxidation releases energy stored in food and converts it into ATP, the usable form of energy in cells. :contentReference[oaicite:4]{index=4}",
      "tags": ["energy-production"]
    },
    {
      "id": "ms-10-sci2-ch2-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "How are various functions occurring in the human body coordinated?",
      "answer": "Functions of the body are coordinated by the nervous system and endocrine system, which regulate responses, maintain balance, and ensure proper functioning of organs. :contentReference[oaicite:5]{index=5}",
      "tags": ["control-system"]
    },
    {
      "id": "ms-10-sci2-ch2-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain the process of energy production inside cells.",
      "answer": "Energy is produced in mitochondria during cellular respiration. Glucose and oxygen are transported to cells via the circulatory system. Inside mitochondria, glucose is oxidized to release ATP. This ATP powers metabolic processes essential for life. :contentReference[oaicite:6]{index=6}",
      "tags": ["energy-production", "mitochondria"]
    },
    {
      "id": "ms-10-sci2-ch2-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Describe the role of the circulatory system in energy production and waste removal.",
      "answer": "The circulatory system transports oxygen and nutrients to cells for ATP production. It also carries waste products like carbon dioxide and urea to excretory organs for removal. Thus it maintains cellular homeostasis. :contentReference[oaicite:7]{index=7}",
      "tags": ["circulation", "waste-removal"]
    },
    {
      "id": "ms-10-sci2-ch2-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain why coordination between digestive, respiratory, and circulatory systems is essential for survival.",
      "answer": "The digestive system supplies nutrients, the respiratory system provides oxygen, and the circulatory system transports both to body cells. Only when all three systems work in coordination can cells produce ATP needed for survival. Failure in any one system affects the entire organism. :contentReference[oaicite:8]{index=8}",
      "tags": ["coordination", "organ-systems"]
    }
  ]
}, {
  "id": "ms-10-sci2-ch3",
  "chapterNumber": 3,
  "title": "Life Processes in Living Organisms Part - 2",
  "slug": "life-processes-part-2",
  "description": "Asexual and sexual reproduction, reproduction in plants and animals, fertilization, embryo development, cell division (mitosis & meiosis).",
  "topics": [
    "Asexual reproduction",
    "Sexual reproduction",
    "Reproduction in flowering plants",
    "Human reproductive system",
    "Fertilization and embryo development",
    "Mitosis and meiosis",
    "Binary fission and budding"
  ],
  "learningObjectives": [
    "Differentiate between asexual and sexual reproduction.",
    "Describe reproduction in plants and human beings.",
    "Explain fertilization, embryo development and pregnancy.",
    "Understand mitosis and meiosis with diagrams.",
    "Explain how genetic continuity is maintained through cell division."
  ],
  "questions": [
    {
      "id": "ms-10-sci2-ch3-q1",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "What is asexual reproduction?",
      "answer": "Asexual reproduction is a mode in which a single parent produces offspring without gamete formation. Offspring are genetically identical to the parent. :contentReference[oaicite:3]{index=3}",
      "tags": ["asexual-reproduction"]
    },
    {
      "id": "ms-10-sci2-ch3-q2",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Binary fission occurs in:",
      "options": ["Amoeba", "Yeast", "Hydra", "Moss"],
      "answer": "Amoeba",
      "tags": ["binary-fission"]
    },
    {
      "id": "ms-10-sci2-ch3-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "State any two differences between asexual and sexual reproduction.",
      "answer": "1. Asexual reproduction involves one parent; sexual reproduction involves two. 2. Asexual offspring are identical; sexual reproduction produces genetically diverse offspring. :contentReference[oaicite:4]{index=4}",
      "tags": ["comparison"]
    },
    {
      "id": "ms-10-sci2-ch3-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is fertilization?",
      "answer": "Fertilization is the process of fusion of male and female gametes to form a zygote, which develops into an embryo. :contentReference[oaicite:5]{index=5}",
      "tags": ["fertilization"]
    },
    {
      "id": "ms-10-sci2-ch3-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 1,
      "text": "Which of the following is NOT a method of asexual reproduction?",
      "options": ["Binary fission", "Budding", "Fragmentation", "Pollination"],
      "answer": "Pollination",
      "tags": ["asexual-reproduction"]
    },
    {
      "id": "ms-10-sci2-ch3-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Explain budding with an example.",
      "answer": "In budding, a new organism develops from a small outgrowth (bud) on the parent body. Example: Yeast reproduces by budding. :contentReference[oaicite:6]{index=6}",
      "tags": ["budding"]
    },
    {
      "id": "ms-10-sci2-ch3-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is the role of meiosis in sexual reproduction?",
      "answer": "Meiosis reduces the chromosome number to half in gametes, ensuring that fertilization restores the diploid number, maintaining genetic stability across generations. :contentReference[oaicite:7]{index=7}",
      "tags": ["meiosis"]
    },
    {
      "id": "ms-10-sci2-ch3-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Describe the process of reproduction in flowering plants.",
      "answer": "Flowering plants reproduce sexually. Pollination transfers pollen from anther to stigma. Pollen tube carries male gametes to ovule. Fertilization forms a zygote, which becomes an embryo. Ovule forms seed and ovary becomes fruit. :contentReference[oaicite:8]{index=8}",
      "tags": ["plant-reproduction"]
    },
    {
      "id": "ms-10-sci2-ch3-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain mitosis and its significance.",
      "answer": "Mitosis is equational cell division producing two identical daughter cells. Stages include prophase, metaphase, anaphase and telophase. It enables growth, repair, and replacement of cells while maintaining chromosome number. :contentReference[oaicite:9]{index=9}",
      "tags": ["mitosis"]
    },
    {
      "id": "ms-10-sci2-ch3-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Describe the process of human reproduction from gamete formation to embryo development.",
      "answer": "Gametes form through meiosis. During fertilization, sperm fuses with ovum to form a zygote. The zygote undergoes mitosis to form a blastocyst, which implants in the uterus. It develops into an embryo supported by placenta and continues growth during pregnancy. :contentReference[oaicite:10]{index=10}",
      "tags": ["human-reproduction"]
    }
  ]
}, {
  "id": "ms-10-sci2-ch4",
  "chapterNumber": 4,
  "title": "Environmental Management",
  "slug": "environmental-management",
  "description": "Ecosystems, biodiversity, food chains, environmental conservation, waste management, pollution, and sustainable development.",
  "topics": [
    "Ecosystems and components",
    "Food chains and food webs",
    "Biodiversity and conservation",
    "Environmental pollution",
    "Waste management",
    "Sustainable development",
    "Conservation of natural resources"
  ],
  "learningObjectives": [
    "Explain the concept of ecosystems and biodiversity.",
    "Identify types of pollution and their impact on the environment.",
    "Describe food chains, webs, and trophic levels.",
    "Understand methods of waste management and environmental conservation.",
    "Explain sustainable development practices."
  ],
  "questions": [
    {
      "id": "ms-10-sci2-ch4-q1",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "What is an ecosystem?",
      "answer": "An ecosystem is a system formed by the interaction between living organisms (biotic factors) and their physical environment (abiotic factors). :contentReference[oaicite:2]{index=2}",
      "tags": ["ecosystem"]
    },
    {
      "id": "ms-10-sci2-ch4-q2",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Which of the following is a renewable resource?",
      "options": ["Coal", "Petroleum", "Wind energy", "Natural gas"],
      "answer": "Wind energy",
      "tags": ["renewable-resources"]
    },
    {
      "id": "ms-10-sci2-ch4-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is biodiversity? Why is it important?",
      "answer": "Biodiversity refers to the variety of living organisms in an environment. It maintains ecological balance, provides resources, and supports ecosystem services. :contentReference[oaicite:3]{index=3}",
      "tags": ["biodiversity"]
    },
    {
      "id": "ms-10-sci2-ch4-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is meant by sustainable development?",
      "answer": "Sustainable development means fulfilling present needs without compromising the ability of future generations to meet their own needs. :contentReference[oaicite:4]{index=4}",
      "tags": ["sustainable-development"]
    },
    {
      "id": "ms-10-sci2-ch4-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 1,
      "text": "Which of the following is an example of biodegradable waste?",
      "options": ["Plastic", "Glass", "Kitchen waste", "Aluminium"],
      "answer": "Kitchen waste",
      "tags": ["waste-management"]
    },
    {
      "id": "ms-10-sci2-ch4-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Explain the term food chain with an example.",
      "answer": "A food chain shows how energy flows from one organism to another. Example: Grass → Grasshopper → Frog → Snake. :contentReference[oaicite:5]{index=5}",
      "tags": ["food-chain"]
    },
    {
      "id": "ms-10-sci2-ch4-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "State two causes of air pollution.",
      "answer": "Major causes include vehicle emissions, burning of fossil fuels, industrial smoke, and deforestation. :contentReference[oaicite:6]{index=6}",
      "tags": ["air-pollution"]
    },
    {
      "id": "ms-10-sci2-ch4-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "What is waste management? Describe any two modern waste management techniques.",
      "answer": "Waste management involves collection, treatment, and disposal of waste materials. Techniques include: 1. Composting—organic waste decomposed into manure. 2. Recycling—processing used materials into new products. 3. Vermiculture—using earthworms to convert waste into nutrient-rich compost. :contentReference[oaicite:7]{index=7}",
      "tags": ["waste-management"]
    },
    {
      "id": "ms-10-sci2-ch4-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain the interrelationship between components of an ecosystem with examples.",
      "answer": "Biotic and abiotic components interact to maintain balance. Plants depend on sunlight, water, and soil nutrients; herbivores depend on plants; carnivores depend on herbivores. Decomposers recycle nutrients back into the soil. These interactions create a stable ecosystem. :contentReference[oaicite:8]{index=8}",
      "tags": ["ecosystem"]
    },
    {
      "id": "ms-10-sci2-ch4-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Describe major causes of environmental degradation and measures to prevent it.",
      "answer": "Causes include pollution, overexploitation of resources, deforestation, and improper waste disposal. Preventive measures include afforestation, using renewable energy, reducing waste, pollution control technologies, and enforcing environmental laws. :contentReference[oaicite:9]{index=9}",
      "tags": ["environmental-management"]
    }
  ]
}, {
  "id": "ms-10-sci2-ch5",
  "chapterNumber": 5,
  "title": "Towards Green Energy",
  "slug": "towards-green-energy",
  "description": "Conventional and non-conventional energy sources, solar energy, wind energy, hydroelectricity, biofuels, nuclear energy, and energy conservation.",
  "topics": [
    "Conventional and non-conventional energy sources",
    "Solar energy and photovoltaic cells",
    "Wind energy",
    "Hydroelectricity",
    "Biofuels and biomass",
    "Nuclear energy",
    "Energy conservation"
  ],
  "learningObjectives": [
    "Differentiate between conventional and non-conventional energy sources.",
    "Explain solar, wind, and hydroelectric energy generation.",
    "Describe biomass, biogas, and biofuels.",
    "Understand nuclear energy and its advantages and risks.",
    "Explain the importance of energy conservation."
  ],
  "questions": [
    {
      "id": "ms-10-sci2-ch5-q1",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "What are non-conventional energy sources?",
      "answer": "Non-conventional energy sources are renewable forms of energy such as solar, wind, tidal, geothermal, and biomass, which are environment-friendly and abundant. :contentReference[oaicite:2]{index=2}",
      "tags": ["non-conventional-energy"]
    },
    {
      "id": "ms-10-sci2-ch5-q2",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Which device converts solar energy into electrical energy?",
      "options": ["Solar heater", "Solar cooker", "Photovoltaic cell", "Transformer"],
      "answer": "Photovoltaic cell",
      "tags": ["solar-energy"]
    },
    {
      "id": "ms-10-sci2-ch5-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "State two advantages of wind energy.",
      "answer": "1. It is a renewable and clean source of energy. 2. Wind turbines have low operational costs once installed. :contentReference[oaicite:3]{index=3}",
      "tags": ["wind-energy"]
    },
    {
      "id": "ms-10-sci2-ch5-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is biomass? Give an example.",
      "answer": "Biomass is organic material obtained from plants and animals used as fuel. Example: Cow dung, agricultural waste. :contentReference[oaicite:4]{index=4}",
      "tags": ["biomass"]
    },
    {
      "id": "ms-10-sci2-ch5-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 1,
      "text": "Hydroelectricity is generated using:",
      "options": ["Sunlight", "Flowing water", "Wind", "Biogas"],
      "answer": "Flowing water",
      "tags": ["hydroelectricity"]
    },
    {
      "id": "ms-10-sci2-ch5-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is nuclear energy? How is it obtained?",
      "answer": "Nuclear energy is the energy released from the nucleus of atoms during nuclear fission or fusion. It is obtained mainly by fission of uranium or plutonium in reactors. :contentReference[oaicite:5]{index=5}",
      "tags": ["nuclear-energy"]
    },
    {
      "id": "ms-10-sci2-ch5-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Explain the importance of energy conservation.",
      "answer": "Energy conservation reduces energy waste, saves natural resources, lowers pollution, and ensures sustainable energy availability for future generations. :contentReference[oaicite:6]{index=6}",
      "tags": ["energy-conservation"]
    },
    {
      "id": "ms-10-sci2-ch5-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain how electricity is generated using solar energy.",
      "answer": "Solar energy is absorbed by photovoltaic (PV) cells made from semiconductor materials like silicon. Sunlight excites electrons, generating electric current. PV modules are connected to form solar panels, which supply usable electricity. Solar farms produce electricity on a large scale. :contentReference[oaicite:7]{index=7}",
      "tags": ["solar-energy"]
    },
    {
      "id": "ms-10-sci2-ch5-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Describe the working of a biogas plant with a labeled diagram.",
      "answer": "Biogas plants use anaerobic digestion of biomass such as cow dung and agricultural waste. The mixture is placed in an airtight digester where microbes decompose it, releasing methane-rich biogas. The gas is used as fuel, while the residue works as fertilizer. :contentReference[oaicite:8]{index=8}",
      "tags": ["biogas"]
    },
    {
      "id": "ms-10-sci2-ch5-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Compare conventional and non-conventional energy sources with suitable examples.",
      "answer": "Conventional sources such as coal, petroleum, and natural gas are non-renewable, cause pollution, and have limited availability. Non-conventional sources such as solar, wind, tidal, and geothermal are renewable, eco-friendly, and sustainable. :contentReference[oaicite:9]{index=9}",
      "tags": ["energy-sources"]
    }
  ]
}, {
  "id": "ms-10-sci2-ch6",
  "chapterNumber": 6,
  "title": "Animal Classification",
  "slug": "animal-classification",
  "description": "Classification of animals based on body structure, symmetry, germ layers, coelom, and phyla such as Porifera, Coelenterata, Arthropoda, Mollusca, Echinodermata, and Chordata.",
  "topics": [
    "Need for classification",
    "Levels of body organization",
    "Symmetry",
    "Germ layers",
    "Coelom",
    "Invertebrate phyla",
    "Chordates and vertebrates"
  ],
  "learningObjectives": [
    "Understand the need for classification of animals.",
    "Differentiate between types of symmetry and germ layers.",
    "Describe major animal phyla with characteristics and examples.",
    "Explain the structure and features of chordates.",
    "Classify animals based on body organization and coelom."
  ],
  "questions": [
    {
      "id": "ms-10-sci2-ch6-q1",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "What is bilateral symmetry?",
      "answer": "Bilateral symmetry is when the body can be divided into two equal halves through only one plane, forming mirror images. :contentReference[oaicite:2]{index=2}",
      "tags": ["symmetry"]
    },
    {
      "id": "ms-10-sci2-ch6-q2",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Animals with a notochord belong to which group?",
      "options": ["Arthropoda", "Chordata", "Mollusca", "Echinodermata"],
      "answer": "Chordata",
      "tags": ["chordata"]
    },
    {
      "id": "ms-10-sci2-ch6-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Define coelom. Name its three types.",
      "answer": "Coelom is a fluid-filled body cavity between the digestive canal and the body wall. Types: Acoelomate, Pseudocoelomate, and Coelomate. :contentReference[oaicite:3]{index=3}",
      "tags": ["coelom"]
    },
    {
      "id": "ms-10-sci2-ch6-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What are germ layers? Name them.",
      "answer": "Germ layers are primary layers of cells formed during embryonic development. They are ectoderm, mesoderm, and endoderm. :contentReference[oaicite:4]{index=4}",
      "tags": ["germ-layers"]
    },
    {
      "id": "ms-10-sci2-ch6-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 1,
      "text": "Which phylum includes starfish and sea urchins?",
      "options": ["Mollusca", "Echinodermata", "Chordata", "Arthropoda"],
      "answer": "Echinodermata",
      "tags": ["echinodermata"]
    },
    {
      "id": "ms-10-sci2-ch6-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "State two characteristics of arthropods.",
      "answer": "1. They have jointed appendages. 2. Their body is segmented and covered by an exoskeleton made of chitin. :contentReference[oaicite:5]{index=5}",
      "tags": ["arthropoda"]
    },
    {
      "id": "ms-10-sci2-ch6-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Differentiate between vertebrates and invertebrates.",
      "answer": "Vertebrates possess a vertebral column and internal skeleton, while invertebrates lack a vertebral column and have simpler body structures. :contentReference[oaicite:6]{index=6}",
      "tags": ["vertebrates", "invertebrates"]
    },
    {
      "id": "ms-10-sci2-ch6-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain the characteristics of phylum Chordata.",
      "answer": "Chordates possess a notochord, dorsal hollow nerve cord, pharyngeal gill slits, post-anal tail, and a closed circulatory system. They show bilateral symmetry and are triploblastic coelomates. Examples: fish, amphibians, reptiles, birds, mammals. :contentReference[oaicite:7]{index=7}",
      "tags": ["chordata"]
    },
    {
      "id": "ms-10-sci2-ch6-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Describe the differences between Mollusca and Echinodermata.",
      "answer": "Mollusca: Soft-bodied animals, usually with a calcareous shell; bilateral symmetry; examples include octopus, snails. Echinodermata: Marine organisms with spiny skin; radial symmetry in adults; water vascular system; examples include starfish and sea lilies. :contentReference[oaicite:8]{index=8}",
      "tags": ["mollusca", "echinodermata"]
    },
    {
      "id": "ms-10-sci2-ch6-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain the basis of animal classification using body symmetry, germ layers, and coelom.",
      "answer": "Animals are classified based on: 1. Body symmetry: asymmetrical (sponges), radial (cnidarians), bilateral (arthropods, chordates). 2. Germ layers: diploblastic (two layers) or triploblastic (three layers). 3. Coelom: acoelomate, pseudocoelomate, or coelomate. These features indicate evolutionary complexity. :contentReference[oaicite:9]{index=9}",
      "tags": ["classification"]
    }
  ]
}, {
  "id": "ms-10-sci2-ch7",
  "chapterNumber": 7,
  "title": "Introduction to Microbiology",
  "slug": "introduction-to-microbiology",
  "description": "Microorganisms, their characteristics, industrial applications, biotechnology, antibiotics, vaccines, fermentation, biofertilizers, and microbial ecology.",
  "topics": [
    "Types of microorganisms",
    "Useful and harmful microbes",
    "Fermentation",
    "Antibiotics and vaccines",
    "Biotechnology",
    "Biofertilizers",
    "Industrial microbiology"
  ],
  "learningObjectives": [
    "Identify major groups of microorganisms and their characteristics.",
    "Explain industrial applications of microbes such as fermentation and antibiotic production.",
    "Understand vaccines, immunity, and microbial diseases.",
    "Describe the role of microorganisms in agriculture and environment.",
    "Explain biotechnology and its applications."
  ],
  "questions": [
    {
      "id": "ms-10-sci2-ch7-q1",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "What are microorganisms?",
      "answer": "Microorganisms are tiny living organisms such as bacteria, fungi, protozoa, algae, and viruses that are too small to be seen with the naked eye. :contentReference[oaicite:2]{index=2}",
      "tags": ["microorganisms"]
    },
    {
      "id": "ms-10-sci2-ch7-q2",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Which microorganism is used in the production of curd?",
      "options": ["Saccharomyces", "Lactobacillus", "Rhizobium", "Penicillium"],
      "answer": "Lactobacillus",
      "tags": ["lactobacillus"]
    },
    {
      "id": "ms-10-sci2-ch7-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Define fermentation. Give one example.",
      "answer": "Fermentation is a metabolic process in which microorganisms convert sugars into alcohol or acids. Example: Yeast ferments sugar to produce alcohol. :contentReference[oaicite:3]{index=3}",
      "tags": ["fermentation"]
    },
    {
      "id": "ms-10-sci2-ch7-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What are antibiotics?",
      "answer": "Antibiotics are chemical substances produced by microorganisms that inhibit or destroy harmful microbes. Example: Penicillin. ",
      "tags": ["antibiotics"]
    },
    {
      "id": "ms-10-sci2-ch7-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 1,
      "text": "Which microorganism increases soil fertility by nitrogen fixation?",
      "options": ["Lactobacillus", "Aspergillus", "Rhizobium", "Plasmodium"],
      "answer": "Rhizobium",
      "tags": ["biofertilizers"]
    },
    {
      "id": "ms-10-sci2-ch7-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is biotechnology?",
      "answer": "Biotechnology is the use of living organisms or their products to develop useful materials, medicines, and technologies. It includes genetic engineering, fermentation, and industrial microbiology. ",
      "tags": ["biotechnology"]
    },
    {
      "id": "ms-10-sci2-ch7-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "State two uses of microorganisms in industry.",
      "answer": "1. Production of antibiotics such as penicillin. 2. Fermentation processes to make wine, beer, vinegar, and cheese. :contentReference[oaicite:6]{index=6}",
      "tags": ["industrial-microbiology"]
    },
    {
      "id": "ms-10-sci2-ch7-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain how vaccines work. Give an example.",
      "answer": "Vaccines contain weakened or inactive pathogens that stimulate the immune system to produce antibodies. This creates immunity without causing disease. Example: Polio vaccine trains the body to fight poliovirus. ",
      "tags": ["vaccines", "immunity"]
    },
    {
      "id": "ms-10-sci2-ch7-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Describe the role of microorganisms in agriculture.",
      "answer": "Microorganisms such as Rhizobium fix atmospheric nitrogen in soil. Cyanobacteria enrich soil fertility. Decomposers break down organic matter, improving soil nutrients. Biopesticides derived from microbes control pests naturally. :contentReference[oaicite:8]{index=8}",
      "tags": ["agriculture", "biofertilizers"]
    },
    {
      "id": "ms-10-sci2-ch7-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain industrial production of antibiotics with reference to Penicillin.",
      "answer": "Penicillin is produced by cultivating Penicillium fungus in large fermenters under controlled conditions. After fermentation, the antibiotic is extracted, purified, and prepared for medicinal use. This process revolutionized treatment of bacterial infections. ",
      "tags": ["antibiotics", "penicillin"]
    }
  ]
}, {
  "id": "ms-10-sci2-ch8",
  "chapterNumber": 8,
  "title": "Cell Biology and Biotechnology",
  "slug": "cell-biology-and-biotechnology",
  "description": "Genetic engineering, recombinant DNA technology, gene therapy, stem cells, transgenic organisms, bioinformatics, and applications of biotechnology.",
  "topics": [
    "Recombinant DNA technology",
    "Genetic engineering",
    "Cloning",
    "Stem cells",
    "Gene therapy",
    "Transgenic organisms",
    "Bioinformatics"
  ],
  "learningObjectives": [
    "Explain the process and purpose of genetic engineering.",
    "Understand recombinant DNA technology and its applications.",
    "Describe cloning, stem cells, and gene therapy.",
    "Differentiate between types of stem cells.",
    "Explain importance of bioinformatics in biotechnology."
  ],
  "questions": [
    {
      "id": "ms-10-sci2-ch8-q1",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "What is genetic engineering?",
      "answer": "Genetic engineering is the technique of manipulating an organism’s DNA to change or introduce characteristics by adding, removing, or modifying genes. ",
      "tags": ["genetic-engineering"]
    },
    {
      "id": "ms-10-sci2-ch8-q2",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Which enzyme is used to cut DNA at specific sites?",
      "options": ["DNA ligase", "Helicase", "Restriction endonuclease", "Polymerase"],
      "answer": "Restriction endonuclease",
      "tags": ["enzymes", "restriction-enzyme"]
    },
    {
      "id": "ms-10-sci2-ch8-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is recombinant DNA?",
      "answer": "Recombinant DNA is DNA formed by combining genes from two different organisms using enzymes like restriction endonucleases and ligases. ",
      "tags": ["recombinant-dna"]
    },
    {
      "id": "ms-10-sci2-ch8-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Explain cloning with an example.",
      "answer": "Cloning is producing genetically identical copies of organisms. Example: Dolly the sheep was the first mammal cloned using a somatic cell. ",
      "tags": ["cloning"]
    },
    {
      "id": "ms-10-sci2-ch8-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 1,
      "text": "Which of the following is NOT an application of biotechnology?",
      "options": ["Production of insulin", "Gene therapy", "Formation of fossils", "Cloning"],
      "answer": "Formation of fossils",
      "tags": ["biotechnology"]
    },
    {
      "id": "ms-10-sci2-ch8-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What are stem cells? Name their two main types.",
      "answer": "Stem cells are undifferentiated cells capable of division and differentiation. Types: 1. Embryonic stem cells, 2. Adult stem cells. ",
      "tags": ["stem-cells"]
    },
    {
      "id": "ms-10-sci2-ch8-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Explain gene therapy.",
      "answer": "Gene therapy is a technique that involves inserting a normal gene into cells in place of a defective one to treat genetic disorders. ",
      "tags": ["gene-therapy"]
    },
    {
      "id": "ms-10-sci2-ch8-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Describe the steps involved in recombinant DNA technology.",
      "answer": "Steps include: 1. Isolation of desired gene. 2. Cutting DNA with restriction enzymes. 3. Insertion of gene into vector DNA. 4. Ligation using DNA ligase. 5. Transfer of recombinant DNA into host organism. 6. Expression of new gene to produce desired protein. ",
      "tags": ["recombinant-dna", "genetic-engineering"]
    },
    {
      "id": "ms-10-sci2-ch8-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain the importance of biotechnology in agriculture and medicine.",
      "answer": "In agriculture, biotechnology helps produce pest-resistant crops, increase yield, and improve nutritional quality. In medicine, it enables production of vaccines, insulin, antibiotics, gene therapy, and diagnosis through DNA fingerprinting. ",
      "tags": ["biotechnology", "applications"]
    },
    {
      "id": "ms-10-sci2-ch8-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "What is bioinformatics? Explain its applications.",
      "answer": "Bioinformatics is the use of computer technology to manage and analyze biological data such as DNA sequences. Applications include genome mapping, drug development, studying protein structures, and disease diagnosis. ",
      "tags": ["bioinformatics"]
    }
  ]
}, {
  "id": "ms-10-sci2-ch9",
  "chapterNumber": 9,
  "title": "Social Health",
  "slug": "social-health",
  "description": "Mental health, emotional balance, addiction, family and peer relationships, lifestyle diseases, coping strategies, and factors affecting social well-being.",
  "topics": [
    "Mental health",
    "Factors affecting social health",
    "Addiction and its effects",
    "Family and peer relationships",
    "Stress management",
    "Community health",
    "Healthy lifestyle"
  ],
  "learningObjectives": [
    "Explain the meaning and importance of social and mental health.",
    "Understand addiction, its consequences, and prevention.",
    "Identify factors that affect socially healthy behavior.",
    "Learn methods of stress management and emotional balance.",
    "Recognize the importance of family, friends, and support systems."
  ],
  "questions": [
    {
      "id": "ms-10-sci2-ch9-q1",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "What is social health?",
      "answer": "Social health is the ability of a person to form satisfying interpersonal relationships and adapt comfortably to different social situations. ",
      "tags": ["social-health"]
    },
    {
      "id": "ms-10-sci2-ch9-q2",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Which of the following is a sign of good mental health?",
      "options": ["Aggressive behavior", "Self-confidence", "Isolation", "Addiction"],
      "answer": "Self-confidence",
      "tags": ["mental-health"]
    },
    {
      "id": "ms-10-sci2-ch9-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "State any two factors that affect social health.",
      "answer": "1. Family environment. 2. Peer relationships. 3. Economic conditions. 4. Education and lifestyle. ",
      "tags": ["factors"]
    },
    {
      "id": "ms-10-sci2-ch9-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is addiction? Give one example.",
      "answer": "Addiction is a mental or physical dependence on substances or activities that affect normal life. Example: addiction to alcohol or drugs. ",
      "tags": ["addiction"]
    },
    {
      "id": "ms-10-sci2-ch9-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 1,
      "text": "Which of the following is a healthy coping mechanism for stress?",
      "options": ["Substance use", "Physical exercise", "Avoiding responsibilities", "Aggression"],
      "answer": "Physical exercise",
      "tags": ["stress-management"]
    },
    {
      "id": "ms-10-sci2-ch9-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Explain the role of family in maintaining social health.",
      "answer": "Family provides emotional support, teaches values, and helps develop communication and problem-solving skills, all of which contribute to social well-being. ",
      "tags": ["family"]
    },
    {
      "id": "ms-10-sci2-ch9-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What are lifestyle diseases? Give two examples.",
      "answer": "Lifestyle diseases arise from unhealthy habits such as poor diet, inactivity, and stress. Examples: diabetes, hypertension, heart disease. ",
      "tags": ["lifestyle-diseases"]
    },
    {
      "id": "ms-10-sci2-ch9-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain the effects of addiction on personal and social life.",
      "answer": "Addiction causes physical illness, emotional instability, financial problems, and poor academic or work performance. It damages relationships, leads to social isolation, and increases crime rates and burden on healthcare systems. ",
      "tags": ["addiction-effects"]
    },
    {
      "id": "ms-10-sci2-ch9-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Describe the importance of mental health and methods to maintain it.",
      "answer": "Mental health ensures emotional balance, decision-making, and productivity. It can be maintained through regular exercise, communication, meditation, time management, seeking counseling, and maintaining healthy relationships. ",
      "tags": ["mental-health"]
    },
    {
      "id": "ms-10-sci2-ch9-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain how peer influence can be positive or negative.",
      "answer": "Positive peer influence promotes good habits, discipline, motivation, and teamwork. Negative influence may lead to substance abuse, risky behavior, poor academic performance, and emotional stress. Guidance and self-awareness help manage peer influence. ",
      "tags": ["peer-influence"]
    }
  ]
}, {
  "id": "ms-10-sci2-ch10",
  "chapterNumber": 10,
  "title": "Disaster Management",
  "slug": "disaster-management",
  "description": "Types of disasters, disaster preparedness, mitigation, relief measures, first aid, rescue operations, and roles of government and community.",
  "topics": [
    "Natural and man-made disasters",
    "Disaster preparedness",
    "Mitigation strategies",
    "Rescue operations",
    "First aid",
    "Government disaster management systems",
    "Community participation"
  ],
  "learningObjectives": [
    "Differentiate between natural and man-made disasters.",
    "Explain disaster preparedness and mitigation techniques.",
    "Understand the importance of rescue operations and first aid.",
    "Identify government and community roles in disaster management.",
    "Describe steps to reduce disaster risks."
  ],
  "questions": [
    {
      "id": "ms-10-sci2-ch10-q1",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "What is a disaster?",
      "answer": "A disaster is a sudden event that causes extensive damage to life, property, and the environment, disrupting normal functioning of communities. ",
      "tags": ["disaster"]
    },
    {
      "id": "ms-10-sci2-ch10-q2",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Which of the following is a natural disaster?",
      "options": ["Terrorist attack", "Earthquake", "Nuclear explosion", "Fire due to short circuit"],
      "answer": "Earthquake",
      "tags": ["natural-disasters"]
    },
    {
      "id": "ms-10-sci2-ch10-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is disaster preparedness?",
      "answer": "Disaster preparedness includes planning, training, and taking precautions to reduce loss of life and property during disasters through early warning systems, drills, and resource readiness. ",
      "tags": ["preparedness"]
    },
    {
      "id": "ms-10-sci2-ch10-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "State two differences between natural and man-made disasters.",
      "answer": "Natural disasters occur due to natural processes (earthquakes, floods), while man-made disasters result from human activities (industrial accidents, bomb blasts). Their causes, predictability, and mitigation methods vary. ",
      "tags": ["comparison"]
    },
    {
      "id": "ms-10-sci2-ch10-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 1,
      "text": "What should be the first step in first aid?",
      "options": ["Start treatment immediately", "Ensure safety of victim and rescuer", "Call media", "Move the injured person forcefully"],
      "answer": "Ensure safety of victim and rescuer",
      "tags": ["first-aid"]
    },
    {
      "id": "ms-10-sci2-ch10-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Define mitigation. Give an example.",
      "answer": "Mitigation refers to long-term measures taken to reduce disaster risks, such as building earthquake-resistant structures or constructing flood-control dams. ",
      "tags": ["mitigation"]
    },
    {
      "id": "ms-10-sci2-ch10-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Explain the importance of community participation during disasters.",
      "answer": "Community members provide immediate help, communicate early warnings, participate in rescue operations, donate resources, and support rehabilitation efforts, reducing overall damage. ",
      "tags": ["community"]
    },
    {
      "id": "ms-10-sci2-ch10-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Describe the steps involved in rescue operations during disasters.",
      "answer": "Rescue operations involve: 1. Assessing the situation and ensuring safety. 2. Mobilizing trained teams. 3. Removing victims from danger zones. 4. Providing first aid. 5. Transporting injured individuals to hospitals. 6. Coordinating with fire, medical, and police departments. ",
      "tags": ["rescue-operations"]
    },
    {
      "id": "ms-10-sci2-ch10-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain the role of government agencies in disaster management.",
      "answer": "Government agencies establish disaster management authorities, create early warning systems, coordinate rescue teams, supply essential materials, run rehabilitation programs, enforce safety laws, and train communities through awareness programs. ",
      "tags": ["government-role"]
    },
    {
      "id": "ms-10-sci2-ch10-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "What safety measures should be followed during an earthquake?",
      "answer": "Safety measures include: staying away from windows, taking shelter under sturdy furniture, turning off electricity and gas, avoiding elevators, moving to open spaces, and following evacuation routes. Buildings should be earthquake-resistant to reduce risk. ",
      "tags": ["earthquake-safety"]
    }
  ]
}
  ]
}, {
  board: "msbshse",
  medium: "english",
  classKey: "10",
  subjectSlug: "mathematics-1",
  chapters: [
    {
  "id": "ms-10-m1-ch1",
  "chapterNumber": 1,
  "title": "Linear Equations in Two Variables",
  "slug": "linear-equations-two-variables",
  "description": "Introduction to linear equations in two variables, solution methods, graphing, and applications in real-life situations.",
  "topics": [
    "Definition of linear equation",
    "Solutions of linear equations",
    "Graph of a linear equation",
    "Intercepts and slope concept",
    "Word problems"
  ],
  "learningObjectives": [
    "Identify and form linear equations in two variables.",
    "Find solutions of linear equations through substitution and trial values.",
    "Plot graphs of linear equations using ordered pairs.",
    "Interpret graphs to understand real-life situations involving linear relationships."
  ],
  "questions": [
    {
      "id": "ms-10-m1-ch1-q1",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "Define a linear equation in two variables with an example.",
      "answer": "An equation of the form ax + by + c = 0 where a, b, and c are real numbers and a, b are not both zero is a linear equation in two variables. Example: 2x + 3y - 6 = 0.",
      "tags": ["definition"]
    },
    {
      "id": "ms-10-m1-ch1-q2",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Which of the following is a solution of the equation 2x + y = 7?",
      "options": ["x=1, y=5", "x=2, y=4", "x=3, y=1", "x=0, y=8"],
      "answer": "x=3, y=1",
      "tags": ["solution"]
    },
    {
      "id": "ms-10-m1-ch1-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Find any two solutions of the equation x − 2y = 4.",
      "answer": "Some solutions are (4, 0), (6, 1), (8, 2), etc. (Any two are correct.)",
      "tags": ["solutions"]
    },
    {
      "id": "ms-10-m1-ch1-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "If the cost of 1 pen is ₹x and the cost of 1 pencil is ₹y, write the linear equation representing a total expense of ₹50.",
      "answer": "The required linear equation is x + y = 50 (or ax + by = 50 depending on quantities).",
      "tags": ["word-problem"]
    },
    {
      "id": "ms-10-m1-ch1-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 2,
      "text": "The graph of a linear equation in two variables is:",
      "options": ["A curve", "A straight line", "A parabola", "A circle"],
      "answer": "A straight line",
      "tags": ["graph"]
    },
    {
      "id": "ms-10-m1-ch1-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Plot the points (0, 3) and (2, -1). What can be said about the line passing through them?",
      "answer": "Both points lie on a unique straight line which represents a linear equation in two variables.",
      "tags": ["graph", "points"]
    },
    {
      "id": "ms-10-m1-ch1-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Write intercepts of the equation 3x + 6y = 12.",
      "answer": "x-intercept = 4 (when y = 0), y-intercept = 2 (when x = 0).",
      "tags": ["intercepts"]
    },
    {
      "id": "ms-10-m1-ch1-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Draw the graph of the equation x + 2y = 6. Identify any two points on the graph and determine whether (2, 2) lies on it.",
      "answer": "Taking values: y=0 → x=6 gives (6, 0); y=1 → x=4 gives (4, 1). Plotting these gives a straight line. Substituting (2,2): 2 + 4 = 6 ✓, hence (2,2) lies on the line.",
      "tags": ["graph", "verification"]
    },
    {
      "id": "ms-10-m1-ch1-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "A fruit seller sells apples at ₹x per kg and oranges at ₹y per kg. On a particular day, he sold 5 kg apples and 8 kg oranges for a total of ₹760. Form the linear equation. If apples cost ₹40/kg, find the price of oranges.",
      "answer": "Linear equation: 5x + 8y = 760. Substituting x = 40: 200 + 8y = 760 → 8y = 560 → y = 70. Oranges cost ₹70/kg.",
      "tags": ["application", "word-problem"]
    },
    {
      "id": "ms-10-m1-ch1-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain why a linear equation in two variables has infinitely many solutions. Support your answer using an example.",
      "answer": "A linear equation in two variables represents a straight line, and every point on that line is a solution. Thus, infinitely many ordered pairs satisfy it. Example: For x + y = 5, pairs like (1,4), (2,3), (3,2) etc. are all valid, and the list is infinite.",
      "tags": ["conceptual"]
    }
  ]
}, {
  "id": "ms-10-m1-ch2",
  "chapterNumber": 2,
  "title": "Quadratic Equations",
  "slug": "quadratic-equations",
  "description": "Quadratic equations in standard form, methods of solving (factorization, completing the square, quadratic formula), nature of roots, and word problems.",
  "topics": [
    "Standard form of quadratic equation",
    "Methods of solving quadratic equations",
    "Factorization",
    "Completing the square",
    "Quadratic formula",
    "Discriminant and nature of roots",
    "Word problems"
  ],
  "learningObjectives": [
    "Recognize and convert equations into standard quadratic form.",
    "Solve quadratic equations by factorization and formula.",
    "Interpret discriminant to determine nature of roots.",
    "Apply quadratic equations to solve real-life word problems."
  ],
  "questions": [
    {
      "id": "ms-10-m1-ch2-q1",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "Define a quadratic equation with an example.",
      "answer": "A quadratic equation is of the form ax² + bx + c = 0, where a ≠ 0. Example: 2x² + 5x - 3 = 0.",
      "tags": ["definition"]
    },
    {
      "id": "ms-10-m1-ch2-q2",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Which of the following is a quadratic equation?",
      "options": ["3x + 5 = 0", "x² - 4x + 4 = 0", "2x³ + 1 = 0", "7 = x"],
      "answer": "x² - 4x + 4 = 0",
      "tags": ["identification"]
    },
    {
      "id": "ms-10-m1-ch2-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Solve the quadratic equation x² - 9 = 0.",
      "answer": "x² = 9 → x = ±3.",
      "tags": ["factorization"]
    },
    {
      "id": "ms-10-m1-ch2-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Find the discriminant of the quadratic equation 2x² + 5x + 3 = 0.",
      "answer": "D = b² - 4ac = 5² - 4(2)(3) = 25 - 24 = 1.",
      "tags": ["discriminant"]
    },
    {
      "id": "ms-10-m1-ch2-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 2,
      "text": "If the discriminant of a quadratic equation is negative, the roots are:",
      "options": ["Real and equal", "Real and distinct", "Imaginary", "Zero"],
      "answer": "Imaginary",
      "tags": ["nature-of-roots"]
    },
    {
      "id": "ms-10-m1-ch2-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Solve by factorization: x² + 7x + 12 = 0.",
      "answer": "(x + 3)(x + 4) = 0 → x = -3, -4.",
      "tags": ["factorization"]
    },
    {
      "id": "ms-10-m1-ch2-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "State the quadratic formula.",
      "answer": "x = [-b ± √(b² - 4ac)] / (2a).",
      "tags": ["formula"]
    },
    {
      "id": "ms-10-m1-ch2-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": `"Solve using the quadratic formula: 3x² - 2x - 1 = 0.",
      "answer": "a=3, b=-2, c=-1 → D = (-2)² - 4(3)(-1) = 4 + 12 = 16.  
x = [2 ± √16] / 6 → x = (2 ± 4)/6 → Solutions: x = 1 or x = -1/3."`,
      "tags": ["quadratic-formula"]
    },
    {
      "id": "ms-10-m1-ch2-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "The length of a rectangle is 3 m more than its breadth. If the area is 70 m², form the quadratic equation and find its dimensions.",
      "answer": `"Let breadth = x; length = x + 3.  
x(x + 3) = 70 → x² + 3x - 70 = 0.  
Solving: x = 7 or x = -10. Negative rejected.  
Breadth = 7 m, Length = 10 m."`,
      "tags": ["word-problem", "area"]
    },
    {
      "id": "ms-10-m1-ch2-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain how the nature of roots of a quadratic equation is determined using the discriminant. Give examples.",
      "answer": `If D = b² - 4ac:  
      • D > 0 → real and distinct roots (e.g., x² - 5x + 6 = 0).  
      • D = 0 → real and equal roots (e.g., x² - 4x + 4 = 0).  
      • D < 0 → non-real/imaginary roots (e.g., x² + x + 1 = 0).`,
      "tags": ["conceptual", "discriminant"]
    }
  ]
}, {
  "id": "ms-10-m1-ch3",
  "chapterNumber": 3,
  "title": "Arithmetic Progression",
  "slug": "arithmetic-progression",
  "description": "Introduction to arithmetic progressions (AP), common difference, nth term, sum of first n terms, and application-based word problems.",
  "topics": [
    "Arithmetic sequence",
    "Common difference",
    "General term (nth term)",
    "Sum of first n terms",
    "Applications of AP"
  ],
  "learningObjectives": [
    "Identify and form arithmetic progressions.",
    "Find common difference of an AP.",
    "Calculate the nth term of an AP.",
    "Calculate sum of first n terms.",
    "Solve real-life word problems using AP."
  ],
  "questions": [
    {
      "id": "ms-10-m1-ch3-q1",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "Define an arithmetic progression (AP).",
      "answer": "A sequence is called an arithmetic progression if the difference between any two consecutive terms is constant. This constant is called the common difference.",
      "tags": ["definition"]
    },
    {
      "id": "ms-10-m1-ch3-q2",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "What is the common difference of the AP 7, 10, 13, 16, …?",
      "options": ["2", "3", "4", "5"],
      "answer": "3",
      "tags": ["common-difference"]
    },
    {
      "id": "ms-10-m1-ch3-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Find the 12th term of the AP 5, 11, 17, …",
      "answer": `"a = 5, d = 6.  
T₁₂ = a + (12 − 1)d = 5 + 66 = 71."`,
      "tags": ["nth-term"]
    },
    {
      "id": "ms-10-m1-ch3-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Which term of the AP 4, 9, 14, 19, … is 99?",
      "answer": `"a = 4, d = 5.  
99 = 4 + (n − 1)5 → n = 20.  
So, 99 is the 20th term."`,
      "tags": ["term-number"]
    },
    {
      "id": "ms-10-m1-ch3-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 2,
      "text": "The sum of first n terms of an AP is given by:",
      "options": [
        "Sₙ = n/2 (a − l)",
        "Sₙ = n/2 (2a + (n−1)d)",
        "Sₙ = a + nd",
        "Sₙ = a × d × n"
      ],
      "answer": "Sₙ = n/2 (2a + (n−1)d)",
      "tags": ["sum"]
    },
    {
      "id": "ms-10-m1-ch3-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Find the sum of the first 15 terms of the AP 3, 7, 11, …",
      "answer": `"a = 3, d = 4.  
S₁₅ = 15/2 (2×3 + 14×4) = 15/2 (6 + 56) = 15/2 × 62 = 465."`,
      "tags": ["sum"]
    },
    {
      "id": "ms-10-m1-ch3-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "How many terms of the AP 6, 13, 20, … are needed to make a sum of 406?",
      "answer": `"a = 6, d = 7.  
Sₙ = n/2 (2a + (n−1)d) = 406  
n/2 (12 + 7n − 7) = 406  
n(7n + 5) = 812  
7n² + 5n − 812 = 0 → n = 11."`,
      "tags": ["sum", "term-number"]
    },
    {
      "id": "ms-10-m1-ch3-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "The 5th term of an AP is 22 and the 15th term is 52. Find the first term and the common difference.",
      "answer": `"Given: T₅ = a + 4d = 22  
T₁₅ = a + 14d = 52  
Subtract: 10d = 30 → d = 3  
Substitute: a + 12 = 22 → a = 10."`,
      "tags": ["nth-term", "parameters"]
    },
    {
      "id": "ms-10-m1-ch3-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "A worker earns ₹800 in the first month and gets a raise of ₹50 every month. How much will he earn in the 12th month? What will be his total earning in 12 months?",
      "answer": `"a = 800, d = 50.  
T₁₂ = 800 + 11×50 = 1350.  
S₁₂ = 12/2 (2×800 + 11×50) = 6 (1600 + 550) = 12,900."`,
      "tags": ["word-problem"]
    },
    {
      "id": "ms-10-m1-ch3-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain why the sequence formed by the total distance travelled by a car each hour at constant speed is an AP. Give an example.",
      "answer": `"At constant speed, equal distances are covered in equal intervals of time, so the total distance increases by a fixed amount each hour.  
Example: At 50 km/h: distances = 50, 100, 150, 200… (AP with d = 50)."`,
      "tags": ["application", "conceptual"]
    }
  ]
}, {
  "id": "ms-10-m1-ch4",
  "chapterNumber": 4,
  "title": "Financial Planning",
  "slug": "financial-planning",
  "description": "Profit–loss, simple interest, compound interest, GST, income tax, discount, commissions, investments, savings, and budgeting.",
  "topics": [
    "Profit and loss",
    "Simple interest",
    "Compound interest",
    "Goods and Services Tax (GST)",
    "Income tax",
    "Discount and commission",
    "Savings and investment",
    "Budgeting"
  ],
  "learningObjectives": [
    "Calculate profit, loss, discount, and commission.",
    "Understand and compute simple and compound interest.",
    "Apply GST concepts to real-life billing problems.",
    "Compute income tax using tax slabs.",
    "Prepare basic household budgets and financial plans."
  ],
  "questions": [
    {
      "id": "ms-10-m1-ch4-q1",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "Define simple interest and write its formula.",
      "answer": "Simple interest is interest calculated on the principal for a fixed time period and rate. Formula: SI = (P × R × T) / 100.",
      "tags": ["simple-interest"]
    },
    {
      "id": "ms-10-m1-ch4-q2",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "If GST rate is 18%, which of the following is the correct split between CGST and SGST?",
      "options": ["12% + 6%", "9% + 9%", "10% + 8%", "8% + 10%"],
      "answer": "9% + 9%",
      "tags": ["gst"]
    },
    {
      "id": "ms-10-m1-ch4-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "A shopkeeper earns a profit of ₹180 on selling an item for ₹900. Find the cost price.",
      "answer": "Profit = SP − CP → 180 = 900 − CP → CP = ₹720.",
      "tags": ["profit-loss"]
    },
    {
      "id": "ms-10-m1-ch4-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Find the simple interest on ₹5000 at 12% per annum for 2 years.",
      "answer": "SI = (5000 × 12 × 2)/100 = ₹1200.",
      "tags": ["simple-interest"]
    },
    {
      "id": "ms-10-m1-ch4-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 2,
      "text": "If a customer gets 20% discount on a marked price of ₹1500, the selling price is:",
      "options": ["₹1000", "₹1100", "₹1200", "₹1300"],
      "answer": "₹1200",
      "tags": ["discount"]
    },
    {
      "id": "ms-10-m1-ch4-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "A bill shows taxable value = ₹2500 and GST = 18%. Find the total bill amount.",
      "answer": "GST = 18% of 2500 = ₹450; Total = 2500 + 450 = ₹2950.",
      "tags": ["gst"]
    },
    {
      "id": "ms-10-m1-ch4-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "A person invests ₹10,000 at 10% compound interest for 2 years. Find the amount.",
      "answer": "Amount = P(1 + R/100)² = 10000(1.1)² = 10000 × 1.21 = ₹12,100.",
      "tags": ["compound-interest"]
    },
    {
      "id": "ms-10-m1-ch4-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "A trader allows 10% discount on an article marked ₹2000 and still gains 8%. Find the cost price.",
      "answer": `"SP after discount = 2000 − 10% of 2000 = 2000 − 200 = ₹1800.  
Since gain = 8%, CP = SP / 1.08 = 1800 / 1.08 = ₹1666.67 (approx)."`,
      "tags": ["profit-loss", "discount"]
    },
    {
      "id": "ms-10-m1-ch4-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "An employee with an annual income of ₹4,80,000 gets: standard deduction ₹50,000 and investments under 80C = ₹1,00,000. Tax slab: 5% on income up to ₹3,00,000 (after deductions). Calculate income tax.",
      "answer": `"Taxable income = 4,80,000 − 50,000 − 1,00,000 = ₹3,30,000.  
Tax = 5% on ₹3,00,000 = ₹15,000.  
Remaining ₹30,000 taxed at 20% = ₹6,000.  
Total tax = ₹21,000."`,
      "tags": ["income-tax"]
    },
    {
      "id": "ms-10-m1-ch4-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "A person takes a loan of ₹1,20,000 at 10% annual compound interest. He repays in 2 equal annual installments. Find each installment using EMI formula.",
      "answer": `"EMI formula: EMI = P × R(1+R)ⁿ / [(1+R)ⁿ − 1]  
R = 10% = 0.10, n = 2  
EMI = 120000 × 0.10 × 1.10² / (1.10² − 1)  
= 120000 × 0.10 × 1.21 / 0.21  
= 120000 × 0.121 / 0.21  
= ₹69,142.86 approx."`,
      "tags": ["emi", "loan", "compound-interest"]
    }
  ]
}, {
  "id": "ms-10-m1-ch5",
  "chapterNumber": 5,
  "title": "Probability",
  "slug": "probability",
  "description": "Classical (theoretical) probability, sample space, events, complementary events, and real-life applications.",
  "topics": [
    "Random experiments",
    "Sample space",
    "Events",
    "Classical probability formula",
    "Complementary events",
    "Applications of probability"
  ],
  "learningObjectives": [
    "Understand the concept of a random experiment and sample space.",
    "Compute classical probability of events.",
    "Identify complementary events and use them for calculations.",
    "Solve real-life problems involving probability."
  ],
  "questions": [
    {
      "id": "ms-10-m1-ch5-q1",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "Define probability.",
      "answer": "Probability is the measure of the likelihood of an event occurring and is given by: P(E) = (Number of favourable outcomes) / (Total number of possible outcomes).",
      "tags": ["definition"]
    },
    {
      "id": "ms-10-m1-ch5-q2",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "What is the probability of getting a tail when tossing a fair coin?",
      "options": ["0", "1", "1/2", "2"],
      "answer": "1/2",
      "tags": ["coin-toss"]
    },
    {
      "id": "ms-10-m1-ch5-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "A die is rolled. What is the probability of getting a number greater than 4?",
      "answer": `"Numbers greater than 4 are 5 and 6 → 2 favourable outcomes.  
Total outcomes = 6 → Probability = 2/6 = 1/3."`,
      "tags": ["die", "events"]
    },
    {
      "id": "ms-10-m1-ch5-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "A bag contains 3 red balls and 5 blue balls. A ball is drawn at random. Find the probability of drawing a blue ball.",
      "answer": "Total balls = 8, blue balls = 5 → Probability = 5/8.",
      "tags": ["balls", "events"]
    },
    {
      "id": "ms-10-m1-ch5-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 2,
      "text": "If P(A) = 0.7, then P(A') (complement of A) is:",
      "options": ["0.3", "0.7", "1.7", "0"],
      "answer": "0.3",
      "tags": ["complementary-events"]
    },
    {
      "id": "ms-10-m1-ch5-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "A card is drawn from a deck of 52 playing cards. Find the probability of drawing a king.",
      "answer": "There are 4 kings in the deck → Probability = 4/52 = 1/13.",
      "tags": ["cards"]
    },
    {
      "id": "ms-10-m1-ch5-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Find the probability of getting an even number when a die is rolled.",
      "answer": `"Even numbers: 2, 4, 6 → 3 favourable outcomes.  
Probability = 3/6 = 1/2."`,
      "tags": ["die"]
    },
    {
      "id": "ms-10-m1-ch5-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "A box contains 2 white, 3 black, and 5 red balls. One ball is drawn at random. Find the probability of drawing (a) a white ball, (b) a black ball, (c) a red ball.",
      "answer": `"Total balls = 10  
(a) P(white) = 2/10 = 1/5  
(b) P(black) = 3/10  
(c) P(red) = 5/10 = 1/2"`,
      "tags": ["balls", "multiple-events"]
    },
    {
      "id": "ms-10-m1-ch5-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "The probability that a student passes an exam is 0.78. What is the probability that the student fails? Also interpret the meaning.",
      "answer":` "P(fail) = 1 − 0.78 = 0.22.  
Interpretation: Out of 100 similar students, about 22 may fail."`,
      "tags": ["complementary-events", "interpretation"]
    },
    {
      "id": "ms-10-m1-ch5-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "A number is chosen randomly from the numbers 1 to 30. Find the probability that the number is (a) a multiple of 3, (b) a prime number.",
      "answer": `"(a) Multiples of 3: 3,6,9,12,15,18,21,24,27,30 → 10 numbers → P = 10/30 = 1/3  
(b) Prime numbers between 1 and 30: 2,3,5,7,11,13,17,19,23,29 → 10 numbers → P = 10/30 = 1/3."`,
      "tags": ["number-system", "events"]
    }
  ]
}, {
  "id": "ms-10-m1-ch6",
  "chapterNumber": 6,
  "title": "Statistics",
  "slug": "statistics",
  "description": "Mean, median, mode, grouped and ungrouped data, cumulative frequency tables, ogives, and data interpretation.",
  "topics": [
    "Ungrouped data",
    "Grouped frequency distribution",
    "Mean",
    "Median",
    "Mode",
    "Cumulative frequency",
    "Ogive",
    "Graphical interpretation"
  ],
  "learningObjectives": [
    "Calculate mean, median, and mode for grouped and ungrouped data.",
    "Prepare grouped frequency tables and cumulative frequency tables.",
    "Interpret data using graphs and ogives.",
    "Solve real-life problems involving statistical data."
  ],
  "questions": [
    {
      "id": "ms-10-m1-ch6-q1",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "Define mean of ungrouped data.",
      "answer": "Mean is the sum of all observations divided by the total number of observations.",
      "tags": ["mean"]
    },
    {
      "id": "ms-10-m1-ch6-q2",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "The median of the data 4, 7, 2, 9, 5 is:",
      "options": ["4", "5", "7", "9"],
      "answer": "5",
      "tags": ["median"]
    },
    {
      "id": "ms-10-m1-ch6-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Find the mean of the following data: 10, 20, 30, 40, 50.",
      "answer": "Mean = (10 + 20 + 30 + 40 + 50) / 5 = 150 / 5 = 30.",
      "tags": ["mean"]
    },
    {
      "id": "ms-10-m1-ch6-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "For the data: 2, 3, 3, 4, 5, 5, 5, 6, find the mode.",
      "answer": "Mode is 5 (it appears most frequently).",
      "tags": ["mode"]
    },
    {
      "id": "ms-10-m1-ch6-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 2,
      "text": "Which of the following represents a cumulative frequency?",
      "options": [
        "Frequency of one class",
        "Sum of all frequencies",
        "Running total of frequencies",
        "Difference between frequencies"
      ],
      "answer": "Running total of frequencies",
      "tags": ["cumulative-frequency"]
    },
    {
      "id": "ms-10-m1-ch6-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": `"Find the median class for the following table:  
Class intervals: 0–10, 10–20, 20–30, 30–40  
Frequencies: 5, 8, 12, 5"`,
      "answer": `"Total frequency = 30 → Median lies at 15th observation.  
Cumulative frequencies: 5, 13, 25, 30 → Median class = 20–30."`,
      "tags": ["median", "grouped-data"]
    },
    {
      "id": "ms-10-m1-ch6-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Write the formula for mean of grouped data.",
      "answer": "Mean = Σ(f × x) / Σf, where x is the midpoint of each class.",
      "tags": ["mean", "grouped-data"]
    },
    {
      "id": "ms-10-m1-ch6-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": `"The following table shows marks scored by students. Find the mean.  
Class intervals: 0–10, 10–20, 20–30, 30–40  
Frequencies: 4, 6, 10, 5"`,
      "answer": `"Midpoints: 5, 15, 25, 35  
Σ(fx) = 4×5 + 6×15 + 10×25 + 5×35  
= 20 + 90 + 250 + 175 = 535  
Σf = 25  
Mean = 535 / 25 = 21.4"`,
      "tags": ["mean", "grouped-data"]
    },
    {
      "id": "ms-10-m1-ch6-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain how to draw a less-than ogive for grouped data.",
      "answer": `"Steps:  
1. Prepare cumulative frequencies for 'less-than' type.  
2. Plot points (upper class boundary, cumulative frequency).  
3. Join points smoothly to form the ogive.  
4. Use it to estimate median graphically.  
This graph shows cumulative distribution of data."`,
      "tags": ["ogive", "graph"]
    },
    {
      "id": "ms-10-m1-ch6-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "A student scored the following marks in 6 tests: 35, 40, 50, 45, 55, 65. Find the mean, median, and mode.",
      "answer": `"Mean = (35 + 40 + 50 + 45 + 55 + 65) / 6 = 290 / 6 = 48.33  
Arranged data: 35, 40, 45, 50, 55, 65  
Median = average of 3rd and 4th terms = (45 + 50)/2 = 47.5  
Mode = none (all values appear once)."`,
      "tags": ["mean", "median", "mode"]
    }
  ]
}
]
}, {
  board: "msbshse",
  medium: "english",
  classKey: "10",
  subjectSlug: "mathematics-2",
  chapters: [
    {
  "id": "ms-10-m2-ch1",
  "chapterNumber": 1,
  "title": "Similarity",
  "slug": "similarity",
  "description": "Properties of similar triangles, tests of similarity, basic proportionality theorem, ratio of areas, and applications.",
  "topics": [
    "Definition of similarity",
    "Basic proportionality theorem (Thales theorem)",
    "Tests of similarity (AAA, SAS, SSS)",
    "Properties of similar triangles",
    "Ratio of areas of similar triangles",
    "Applications of similarity in geometry"
  ],
  "learningObjectives": [
    "Understand the meaning of similarity and criteria for similar triangles.",
    "Apply AAA, SAS, and SSS tests to determine triangle similarity.",
    "Use basic proportionality theorem to solve geometric problems.",
    "Compare areas and sides of similar triangles.",
    "Apply similarity to real-life and geometric constructions."
  ],
  "questions": [
    {
      "id": "ms-10-m2-ch1-q1",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "Define similar triangles.",
      "answer": "Two triangles are said to be similar if their corresponding angles are equal and their corresponding sides are in proportion.",
      "tags": ["definition"]
    },
    {
      "id": "ms-10-m2-ch1-q2",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Which of the following is a valid similarity test for triangles?",
      "options": ["ASA", "AAA", "RHS", "HL"],
      "answer": "AAA",
      "tags": ["tests-of-similarity"]
    },
    {
      "id": "ms-10-m2-ch1-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "State the Basic Proportionality Theorem (Thales theorem).",
      "answer": "If a line is drawn parallel to one side of a triangle intersecting the other two sides, it divides those two sides proportionally.",
      "tags": ["bpt", "theorem"]
    },
    {
      "id": "ms-10-m2-ch1-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "In ΔABC, DE ∥ BC and intersects AB at D and AC at E. If AD = 3, DB = 6, and AE = 4, find EC.",
      "answer": "Since DE ∥ BC, AD/DB = AE/EC → 3/6 = 4/EC → 1/2 = 4/EC → EC = 8.",
      "tags": ["bpt", "ratio"]
    },
    {
      "id": "ms-10-m2-ch1-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 2,
      "text": "If two triangles are similar, then the ratio of their areas is equal to:",
      "options": ["ratio of sides", "square of ratio of sides", "ratio of angles", "ratio of perimeters"],
      "answer": "square of ratio of sides",
      "tags": ["area-ratio"]
    },
    {
      "id": "ms-10-m2-ch1-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "If ΔABC ∼ ΔPQR and AB/PQ = 3/5, what is the ratio of their areas?",
      "answer": "Area ratio = (AB/PQ)² = (3/5)² = 9/25.",
      "tags": ["area-ratio"]
    },
    {
      "id": "ms-10-m2-ch1-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Triangles ABC and DEF are similar. If AB = 7, DE = 14, and BC = 5, find EF.",
      "answer": "Scale factor = DE/AB = 14/7 = 2 → EF = 2 × BC = 10.",
      "tags": ["similarity", "ratio"]
    },
    {
      "id": "ms-10-m2-ch1-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Prove that if two triangles are similar, then their corresponding medians are in the same ratio as their corresponding sides.",
      "answer": `"Let ΔABC ∼ ΔPQR with AB/PQ = k.  
Consider medians AM and PU.  
Since medians join vertices to midpoints of opposite sides,  
AB/PQ = BC/QR = CA/PR = k.  
Thus, midpoints divide sides proportionally.  
Using triangle similarity between ΔABM and ΔPQU, we get AM/PU = k."`,
      "tags": ["proof", "medians", "similarity"]
    },
    {
      "id": "ms-10-m2-ch1-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "In ΔABC, DE ∥ BC. If AB = 10, AD = 6, and AC = 12, find AE.",
      "answer": `"By BPT: AD/DB = AE/EC.  
DB = AB − AD = 10 − 6 = 4.  
So AD/DB = 6/4 = 3/2.  
Also AC = AE + EC → 12 = AE + EC.  
AE/EC = 3/2 → Let AE = 3k, EC = 2k → 3k + 2k = 5k = 12 → k = 2.4.  
Thus AE = 3k = 7.2."`,
      "tags": ["bpt", "application"]
    },
    {
      "id": "ms-10-m2-ch1-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "If ΔABC ∼ ΔPQR and the area of ΔABC is 63 cm² while the area of ΔPQR is 112 cm², and BC = 9 cm, find QR.",
      "answer": `"Area ratio = 63/112 = 9/16.  
Thus (BC/QR)² = 9/16.  
Taking square roots: BC/QR = 3/4 → QR = (4/3) × 9 = 12 cm."`,
      "tags": ["area-ratio", "similarity"]
    }
  ]
}, {
  "id": "ms-10-m2-ch2",
  "chapterNumber": 2,
  "title": "Pythagoras Theorem",
  "slug": "pythagoras-theorem",
  "description": "Properties of right-angled triangles, Pythagoras theorem, its converse, applications, and proofs based on similarity.",
  "topics": [
    "Right-angled triangles",
    "Pythagoras theorem",
    "Converse of Pythagoras theorem",
    "Geometric proof using similarity",
    "Applications in measurement problems"
  ],
  "learningObjectives": [
    "Understand and apply Pythagoras theorem to find sides of right-angled triangles.",
    "Use the converse of Pythagoras theorem to test if a triangle is right-angled.",
    "Solve practical and geometrical problems using the theorem.",
    "Prove the theorem using similarity of triangles."
  ],
  "questions": [
    {
      "id": "ms-10-m2-ch2-q1",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "State the Pythagoras theorem.",
      "answer": "In a right-angled triangle, the square of the hypotenuse is equal to the sum of the squares of the other two sides.",
      "tags": ["definition", "theorem"]
    },
    {
      "id": "ms-10-m2-ch2-q2",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "In a right-angled triangle, the longest side is called the:",
      "options": ["Base", "Altitude", "Median", "Hypotenuse"],
      "answer": "Hypotenuse",
      "tags": ["right-triangle"]
    },
    {
      "id": "ms-10-m2-ch2-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Find the hypotenuse of a right-angled triangle with legs 9 cm and 12 cm.",
      "answer": "Hypotenuse = √(9² + 12²) = √(81 + 144) = √225 = 15 cm.",
      "tags": ["numerical"]
    },
    {
      "id": "ms-10-m2-ch2-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Check whether the sides 7 cm, 24 cm, and 25 cm form a right-angled triangle.",
      "answer": "25² = 625 and 7² + 24² = 49 + 576 = 625 → Satisfies Pythagoras theorem → Yes, it is a right-angled triangle.",
      "tags": ["converse", "right-triangle"]
    },
    {
      "id": "ms-10-m2-ch2-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 2,
      "text": "If a triangle has sides 10, 15, and 20 cm, then:",
      "options": [
        "It is a right-angled triangle",
        "It is not a right-angled triangle",
        "It must be isosceles",
        "It must be equilateral"
      ],
      "answer": "It is not a right-angled triangle",
      "tags": ["converse"]
    },
    {
      "id": "ms-10-m2-ch2-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "In a right-angled triangle ABC, right-angled at B, AB = 8 cm and AC = 17 cm. Find BC.",
      "answer": "BC = √(AC² − AB²) = √(289 − 64) = √225 = 15 cm.",
      "tags": ["numerical"]
    },
    {
      "id": "ms-10-m2-ch2-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "State the converse of the Pythagoras theorem.",
      "answer": "If in a triangle the square of one side equals the sum of squares of the other two sides, then the triangle is right-angled.",
      "tags": ["definition", "converse"]
    },
    {
      "id": "ms-10-m2-ch2-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Prove the Pythagoras theorem using similarity of triangles.",
      "answer": `"In right triangle ABC, ∠ABC = 90°.  
Draw altitude BD on AC.  
Triangles ABD, CBD, and ABC are similar.  
From similarity, AB² = AD × AC and BC² = CD × AC.  
Adding both: AB² + BC² = AC(AD + CD) = AC².  
Hence proved."`,
      "tags": ["proof", "similarity"]
    },
    {
      "id": "ms-10-m2-ch2-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": `"A ladder 13 m long is leaning against a wall. Its foot is 5 m away from the wall. Find the height reached by the ladder.",
      "answer": "Let height reached = h.  
h² + 5² = 13² → h² + 25 = 169 → h² = 144 → h = 12 m."`,
      "tags": ["application"]
    },
    {
      "id": "ms-10-m2-ch2-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "A man walks 8 km west and then 6 km north. How far is he from the starting point?",
      "answer": "Distance = √(8² + 6²) = √(64 + 36) = √100 = 10 km.",
      "tags": ["application", "distance"]
    }
  ]
}, {
  "id": "ms-10-m2-ch3",
  "chapterNumber": 3,
  "title": "Circle",
  "slug": "circle",
  "description": "Properties of tangents to a circle, perpendicularity of radius to tangent, number of tangents from a point, and applications in geometry.",
  "topics": [
    "Tangent to a circle",
    "Radius-tangent relationship",
    "Number of tangents from a point",
    "Properties of tangents",
    "Length of tangents",
    "Applications in geometric problems"
  ],
  "learningObjectives": [
    "Understand properties of tangents to a circle.",
    "Apply the theorem: Tangent is perpendicular to radius.",
    "Find number of tangents from internal and external points.",
    "Use tangent properties to solve geometrical problems.",
    "Prove tangent-related statements using geometry."
  ],
  "questions": [
    {
      "id": "ms-10-m2-ch3-q1",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "Define a tangent to a circle.",
      "answer": "A tangent is a line that touches the circle at exactly one point.",
      "tags": ["definition"]
    },
    {
      "id": "ms-10-m2-ch3-q2",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "A tangent to a circle is always ______ to the radius at the point of contact.",
      "options": ["parallel", "equal", "perpendicular", "secant"],
      "answer": "perpendicular",
      "tags": ["tangent-radius"]
    },
    {
      "id": "ms-10-m2-ch3-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "How many tangents can be drawn to a circle from an external point?",
      "answer": "Exactly two tangents can be drawn from an external point.",
      "tags": ["tangents"]
    },
    {
      "id": "ms-10-m2-ch3-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "State the theorem related to the radius and tangent at their point of contact.",
      "answer": "The tangent to a circle is perpendicular to the radius drawn to the point of contact.",
      "tags": ["theorem"]
    },
    {
      "id": "ms-10-m2-ch3-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 2,
      "text": "If two tangents are drawn from a point to a circle, then the lengths of the tangents are:",
      "options": ["Unequal", "Always equal", "Sometimes equal", "Cannot be determined"],
      "answer": "Always equal",
      "tags": ["tangent-length"]
    },
    {
      "id": "ms-10-m2-ch3-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "In a circle, from an external point P, tangents PA and PB are drawn. If PA = 12 cm, find PB.",
      "answer": "PB = 12 cm (tangents from an external point are equal).",
      "tags": ["tangent-length"]
    },
    {
      "id": "ms-10-m2-ch3-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "In ΔAPB formed by two tangents PA and PB, show that ∠APB is supplementary to the central angle.",
      "answer": "In a circle, ∠AOB + ∠APB = 180° because quadrilateral APOB is cyclic.",
      "tags": ["cyclic", "tangent-properties"]
    },
    {
      "id": "ms-10-m2-ch3-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Prove that the lengths of two tangents drawn from an external point to a circle are equal.",
      "answer": `"Let PA and PB be tangents from point P to the circle with center O.  
Join OA and OB.  
PA ⟂ OA and PB ⟂ OB.  
OA = OB (radii).  
Right triangles OAP and OBP share OP as common side.  
By RHS congruence, ΔOAP ≅ ΔOBP → PA = PB."`,
      "tags": ["proof", "tangent-length"]
    },
    {
      "id": "ms-10-m2-ch3-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "From a point 15 cm away from the center of a circle, a tangent of length 9 cm is drawn. Find the radius of the circle.",
      "answer": `"Let O be center, P external point, A point of contact.  
OP² = OA² + AP²  
15² = r² + 9² → 225 = r² + 81 → r² = 144 → r = 12 cm."`,
      "tags": ["numerical", "application"]
    },
    {
      "id": "ms-10-m2-ch3-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": `"Two tangents PA and PB are drawn from a point P to a circle with center O. If ∠APB = 70°, find ∠AOB.",
      "answer": "∠AOB = 180° − ∠APB (tangent–radius theorem and cyclic quadrilateral).  
∠AOB = 180° − 70° = 110°."`,
      "tags": ["angles", "tangent-theorem"]
    }
  ]
}, {
  "id": "ms-10-m2-ch4",
  "chapterNumber": 4,
  "title": "Geometric Constructions",
  "slug": "geometric-constructions",
  "description": "Construction of similar triangles, division of lines, construction of tangents, and geometric reasoning using ruler–compass.",
  "topics": [
    "Division of a line segment",
    "Construction of similar triangles",
    "Construction using scale factor",
    "Construction of tangents",
    "Geometric reasoning in constructions"
  ],
  "learningObjectives": [
    "Construct similar triangles using a given scale factor.",
    "Divide a line segment into n equal parts using ruler and compass.",
    "Construct tangents from an external point to a circle.",
    "Understand geometric reasoning behind each construction step.",
    "Apply constructions in solving real geometric problems."
  ],
  "questions": [
    {
      "id": "ms-10-m2-ch4-q1",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "State the steps to divide a line segment AB into 3 equal parts.",
      "answer": "1. Draw a ray AX making an acute angle with AB. 2. Mark 3 equal points A1, A2, A3 on AX. 3. Join A3 to B. 4. Draw lines through A1 and A2 parallel to A3B using a compass or set square.",
      "tags": ["division"]
    },
    {
      "id": "ms-10-m2-ch4-q2",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "To construct a triangle similar to a given triangle with scale factor 3/2, we:",
      "options": [
        "Reduce the length of sides",
        "Increase the length of sides",
        "Reflect the triangle",
        "Rotate the triangle"
      ],
      "answer": "Increase the length of sides",
      "tags": ["similar-triangles"]
    },
    {
      "id": "ms-10-m2-ch4-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is a scale factor in geometric constructions?",
      "answer": "Scale factor is the ratio by which all sides of a given figure are increased or decreased to construct a similar figure.",
      "tags": ["scale-factor"]
    },
    {
      "id": "ms-10-m2-ch4-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Describe how to construct a triangle similar to ΔABC with scale factor 2/3.",
      "answer": "1. Draw a ray from A. 2. Mark 3 equal segments since denominator is 3. 3. Join the 2nd point (numerator) to C. 4. Draw a line parallel to it from the 3rd point to cut AB. 5. Connect appropriately to get the reduced triangle.",
      "tags": ["construction", "similarity"]
    },
    {
      "id": "ms-10-m2-ch4-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 2,
      "text": "How many tangents can be drawn from a point outside a circle?",
      "options": ["None", "One", "Two", "Infinitely many"],
      "answer": "Two",
      "tags": ["tangent-construction"]
    },
    {
      "id": "ms-10-m2-ch4-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Explain why a triangle constructed with scale factor 1/2 is similar to the original triangle.",
      "answer": "Because each side of the new triangle is proportional to the corresponding side of the original triangle by the ratio 1:2, and proportional sides preserve angle equality, ensuring similarity.",
      "tags": ["similarity", "reasoning"]
    },
    {
      "id": "ms-10-m2-ch4-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Write steps to construct tangents from an external point P to a circle with center O.",
      "answer": "1. Join OP. 2. Find midpoint M of OP. 3. Draw a circle with center M and radius MP. 4. The intersections with the given circle give tangent points. 5. Join P to the points of contact.",
      "tags": ["tangents"]
    },
    {
      "id": "ms-10-m2-ch4-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Construct a triangle similar to ΔABC with scale factor 4/3. Explain each step.",
      "answer": `"Steps:  
1. Draw ΔABC.  
2. From A, draw a ray making an acute angle with AB.  
3. Mark 4 equal segments on the ray (numerator = 4).  
4. Join the 3rd mark (denominator = 3) to B.  
5. Draw a line from the 4th mark parallel to this line to meet AB extended at B'.  
6. From B', draw a line parallel to BC to meet AC produced at C'.  
ΔAB'C' is similar to ΔABC with scale factor 4/3."`,
      "tags": ["similar-construction", "scale-factor"]
    },
    {
      "id": "ms-10-m2-ch4-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "A segment of length 9 cm must be divided in the ratio 4:5. Describe the construction steps.",
      "answer": `"1. Draw segment AB = 9 cm.  
2. Draw a ray from A making an acute angle with AB.  
3. Mark 9 equal parts on the ray.  
4. Join the 9th point to B.  
5. Draw a line through the 4th point parallel to the joining line.  
The intersection on AB gives the point dividing AB in ratio 4:5."`,
      "tags": ["division", "ratio"]
    },
    {
      "id": "ms-10-m2-ch4-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Construct tangents from an external point P to a circle of radius 3 cm and center O, where OP = 8 cm. State the reasoning behind the construction.",
      "answer": `"Construction:  
1. Join OP.  
2. Find midpoint M of OP.  
3. Draw a circle with center M and radius MP.  
4. Let it intersect the given circle at points A and B.  
5. Lines PA and PB are tangents.  
Reason: OM = MP creates a right triangle AMP, ensuring PA ⟂ OA at the point of contact."`,
      "tags": ["tangent-construction", "reasoning"]
    }
  ]
}, {
  "id": "ms-10-m2-ch5",
  "chapterNumber": 5,
  "title": "Coordinate Geometry",
  "slug": "coordinate-geometry",
  "description": "Distance formula, section formula, area of triangle, midpoint formula, and applications in coordinate geometry.",
  "topics": [
    "Distance formula",
    "Midpoint formula",
    "Section formula",
    "Area of triangle",
    "Collinearity",
    "Applications of coordinate geometry"
  ],
  "learningObjectives": [
    "Calculate the distance between two points using the distance formula.",
    "Find the midpoint of a segment joining two points.",
    "Use the section formula to divide a line segment in a given ratio.",
    "Calculate the area of a triangle using coordinates.",
    "Determine collinearity of points using area formula."
  ],
  "questions": [
    {
      "id": "ms-10-m2-ch5-q1",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "Write the distance formula between two points (x₁, y₁) and (x₂, y₂).",
      "answer": "Distance = √[(x₂ − x₁)² + (y₂ − y₁)²].",
      "tags": ["distance-formula"]
    },
    {
      "id": "ms-10-m2-ch5-q2",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "What is the midpoint of the segment joining (2, 6) and (4, 10)?",
      "options": ["(3, 8)", "(6, 16)", "(1, 4)", "(8, 3)"],
      "answer": "(3, 8)",
      "tags": ["midpoint"]
    },
    {
      "id": "ms-10-m2-ch5-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Find the distance between the points A(1, 2) and B(7, 5).",
      "answer": "Distance = √[(7 − 1)² + (5 − 2)²] = √(36 + 9) = √45 = 3√5.",
      "tags": ["distance-formula"]
    },
    {
      "id": "ms-10-m2-ch5-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Find the coordinates of the point dividing the segment joining (2, 3) and (8, 9) in the ratio 1:2.",
      "answer": `"Using section formula:  
x = (1×8 + 2×2) / 3 = 12/3 = 4  
y = (1×9 + 2×3) / 3 = 15/3 = 5  
Point = (4, 5)."`,
      "tags": ["section-formula"]
    },
    {
      "id": "ms-10-m2-ch5-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 2,
      "text": "If area of triangle ABC is zero, then the points A, B, C are:",
      "options": ["Concurrent", "Coplanar", "Collinear", "None"],
      "answer": "Collinear",
      "tags": ["collinearity"]
    },
    {
      "id": "ms-10-m2-ch5-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Find the area of the triangle with vertices (1, 1), (4, 5), and (6, 2).",
      "answer": `"Area = 1/2 |x₁(y₂ − y₃) + x₂(y₃ − y₁) + x₃(y₁ − y₂)|  
= 1/2 |1(5 − 2) + 4(2 − 1) + 6(1 − 5)|  
= 1/2 |3 + 4 − 24| = 1/2 × 17 = 8.5 sq. units."`,
      "tags": ["area"]
    },
    {
      "id": "ms-10-m2-ch5-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Find the midpoint of the segment joining (−3, 7) and (5, −1).",
      "answer": "Midpoint = ((−3 + 5)/2, (7 − 1)/2) = (1, 3).",
      "tags": ["midpoint"]
    },
    {
      "id": "ms-10-m2-ch5-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Show that the points (2, −1), (4, 3), and (6, 7) are collinear.",
      "answer": `"Area = 1/2 |2(3 − 7) + 4(7 + 1) + 6(−1 − 3)|  
= 1/2 |2(−4) + 4(8) + 6(−4)|  
= 1/2 |−8 + 32 − 24| = 1/2 × 0 = 0  
Since area = 0, points are collinear."`,
      "tags": ["collinearity", "area"]
    },
    {
      "id": "ms-10-m2-ch5-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "A point divides the segment joining A(−2, 4) and B(8, 10) in the ratio 3:2 internally. Find its coordinates.",
      "answer": `"Using section formula:  
x = (3×8 + 2×(−2)) / 5 = (24 − 4)/5 = 20/5 = 4  
y = (3×10 + 2×4) / 5 = (30 + 8)/5 = 38/5 = 7.6  
Point = (4, 7.6)."`,
      "tags": ["section-formula"]
    },
    {
      "id": "ms-10-m2-ch5-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "The vertices of a triangle are A(1, 2), B(4, 6), and C(−2, 8). Find its area and determine whether it is a right triangle.",
      "answer": `"Area = 1/2 |1(6 − 8) + 4(8 − 2) + (−2)(2 − 6)|  
= 1/2 |1(−2) + 4(6) + (−2)(−4)|  
= 1/2 |−2 + 24 + 8| = 1/2 × 30 = 15 sq. units.  
Check right triangle using distance formula:  
AB = √[(4 − 1)² + (6 − 2)²] = 5  
BC = √[(−2 − 4)² + (8 − 6)²] = √40  
CA = √[(1 + 2)² + (2 − 8)²] = √45  
Check AB² + BC² = CA²?  
25 + 40 ≠ 45 → Not a right triangle."`,
      "tags": ["area", "distance", "classification"]
    }
  ]
}, {
  "id": "ms-10-m2-ch6",
  "chapterNumber": 6,
  "title": "Trigonometry",
  "slug": "trigonometry",
  "description": "Introduction to trigonometric ratios, identities, values of standard angles, and applications in height–distance problems.",
  "topics": [
    "Trigonometric ratios",
    "Values of trigonometric ratios",
    "Trigonometric identities",
    "Heights and distances",
    "Right triangle applications"
  ],
  "learningObjectives": [
    "Understand definitions of trigonometric ratios using right triangles.",
    "Recall and apply standard trigonometric values.",
    "Use basic identities such as sin²θ + cos²θ = 1.",
    "Solve height and distance problems using trigonometry.",
    "Apply trigonometric ratios to real-life measurement situations."
  ],
  "questions": [
    {
      "id": "ms-10-m2-ch6-q1",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "Define sin θ and cos θ in a right-angled triangle.",
      "answer": "sin θ = (Opposite side) / (Hypotenuse), cos θ = (Adjacent side) / (Hypotenuse).",
      "tags": ["ratios"]
    },
    {
      "id": "ms-10-m2-ch6-q2",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "What is the value of tan 45°?",
      "options": ["0", "1", "√3", "Undefined"],
      "answer": "1",
      "tags": ["standard-values"]
    },
    {
      "id": "ms-10-m2-ch6-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "If sin θ = 3/5, find cos θ.",
      "answer": "sin θ = 3/5 → Opp = 3, Hyp = 5 → Adj = √(5² − 3²) = 4 → cos θ = 4/5.",
      "tags": ["ratios", "numerical"]
    },
    {
      "id": "ms-10-m2-ch6-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "State the identity relating sin²θ and cos²θ.",
      "answer": "sin²θ + cos²θ = 1.",
      "tags": ["identity"]
    },
    {
      "id": "ms-10-m2-ch6-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 2,
      "text": "If tan θ = 1/√3, what is θ?",
      "options": ["30°", "45°", "60°", "90°"],
      "answer": "30°",
      "tags": ["standard-values"]
    },
    {
      "id": "ms-10-m2-ch6-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Evaluate: cos 30° + sin 60°.",
      "answer": "cos 30° = √3/2, sin 60° = √3/2 → Sum = √3.",
      "tags": ["evaluation"]
    },
    {
      "id": "ms-10-m2-ch6-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "If a ladder makes an angle of 60° with the ground and reaches a height of 8 m, find the length of the ladder.",
      "answer": "sin 60° = √3/2 = 8/L → L = 8 × 2/√3 = 16/√3 = 9.24 m approx.",
      "tags": ["application", "height-distance"]
    },
    {
      "id": "ms-10-m2-ch6-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Prove that tan θ = sin θ / cos θ.",
      "answer": `"In a right-angled triangle:  
tan θ = Opp/Adj, sin θ = Opp/Hyp, cos θ = Adj/Hyp.  
Thus sin θ / cos θ = (Opp/Hyp) / (Adj/Hyp) = Opp/Adj = tan θ."`,
      "tags": ["identity", "proof"]
    },
    {
      "id": "ms-10-m2-ch6-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "An observer standing 20 m from a tree sees the top at an angle of elevation of 45°. Find the height of the tree.",
      "answer": "tan 45° = 1 = height / 20 → height = 20 m.",
      "tags": ["height-distance", "application"]
    },
    {
      "id": "ms-10-m2-ch6-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "A man on top of a tower 30 m high sees a car on the road at a distance. The angle of depression is 30°. Find the distance of the car from the tower base.",
      "answer": "tan 30° = 1/√3 = 30 / d → d = 30√3 ≈ 51.96 m.",
      "tags": ["distance", "application"]
    }
  ]
}, {
  "id": "ms-10-m2-ch7",
  "chapterNumber": 7,
  "title": "Mensuration",
  "slug": "mensuration",
  "description": "Surface areas and volumes of basic solid figures such as cuboid, cylinder, cone, sphere, hemisphere, and frustum.",
  "topics": [
    "Surface area of cuboid & cube",
    "Surface area of cylinder",
    "Surface area of cone",
    "Surface area of sphere & hemisphere",
    "Volume of solids",
    "Frustum of cone",
    "Applications of mensuration"
  ],
  "learningObjectives": [
    "Calculate curved and total surface areas of standard solids.",
    "Find volumes of cubes, cuboids, cylinders, cones, spheres, and hemispheres.",
    "Apply formulas to solve practical mensuration problems.",
    "Understand and compute surface area and volume of a frustum.",
    "Use mensuration concepts in real-life applications involving 3D shapes."
  ],
  "questions": [
    {
      "id": "ms-10-m2-ch7-q1",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "Write the formula for the volume of a cylinder.",
      "answer": "Volume of cylinder = πr²h.",
      "tags": ["cylinder", "volume"]
    },
    {
      "id": "ms-10-m2-ch7-q2",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "The curved surface area of a cone is given by:",
      "options": [
        "πr²",
        "πrl",
        "2πrh",
        "4πr²"
      ],
      "answer": "πrl",
      "tags": ["cone", "surface-area"]
    },
    {
      "id": "ms-10-m2-ch7-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "A hemisphere has radius 7 cm. Find its curved surface area.",
      "answer": "CSA = 2πr² = 2π(7²) = 98π cm².",
      "tags": ["hemisphere", "surface-area"]
    },
    {
      "id": "ms-10-m2-ch7-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "A cone has radius 5 cm and slant height 13 cm. Find its curved surface area.",
      "answer": "CSA = πrl = π × 5 × 13 = 65π cm².",
      "tags": ["cone", "surface-area"]
    },
    {
      "id": "ms-10-m2-ch7-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 2,
      "text": "Which of the following is the formula for the volume of a sphere?",
      "options": [
        "(4/3)πr³",
        "2πr²h",
        "πr²h",
        "πrl"
      ],
      "answer": "(4/3)πr³",
      "tags": ["sphere", "volume"]
    },
    {
      "id": "ms-10-m2-ch7-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "A cylindrical water tank has radius 4 m and height 6 m. Find its volume.",
      "answer": "Volume = πr²h = π × 16 × 6 = 96π m³.",
      "tags": ["cylinder", "volume"]
    },
    {
      "id": "ms-10-m2-ch7-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "A sphere has radius 3 cm. Find its total surface area.",
      "answer": "TSA = 4πr² = 4π(3²) = 36π cm².",
      "tags": ["sphere", "surface-area"]
    },
    {
      "id": "ms-10-m2-ch7-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "A frustum of a cone has radii 6 cm and 10 cm and height 12 cm. Find its volume.",
      "answer": `"Volume of frustum = (1/3)πh(R² + r² + Rr)  
= (1/3)π × 12 × (10² + 6² + 10×6)  
= 4π × (100 + 36 + 60)  
= 4π × 196 = 784π cm³."`,
      "tags": ["frustum", "volume"]
    },
    {
      "id": "ms-10-m2-ch7-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "A cone is melted to form a cylinder of radius 3 cm and height 4 cm. If the radius of the cone is 6 cm, find its height.",
      "answer": `"Volume of cone = Volume of cylinder  
(1/3)πR²H = πr²h  
(1/3)π × 6² × H = π × 3² × 4  
12H = 36  
H = 3 cm."`,
      "tags": ["mensuration", "volume", "conversion"]
    },
    {
      "id": "ms-10-m2-ch7-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "A solid metallic sphere of radius 5 cm is melted and recast into cones of radius 2 cm and height 10 cm. How many cones are formed?",
      "answer": `"Volume of sphere = (4/3)π(5³) = (4/3)π × 125 = 500π/3  
Volume of cone = (1/3)πr²h = (1/3)π × 4 × 10 = 40π/3  
Number of cones = (500π/3) ÷ (40π/3) = 500/40 = 12.5 → 12 cones (full cones)."`,
      "tags": ["sphere", "cone", "mensuration"]
    }
  ]
}
  ]
}, {
  board: "msbshse",
  medium: "english",
  classKey: "10",
  subjectSlug: "history-and-political-science",
  chapters: [
    {
  "id": "ms-10-hps-ch1",
  "chapterNumber": 1,
  "title": "Historiography: Development in the West",
  "slug": "historiography-development-west",
  "description": "Study of how Western historiography developed through various philosophical traditions and methodological shifts.",
  "topics": [
    "Greek Historiography",
    "Roman Historiography",
    "Renaissance and Scientific Approach",
    "Modern Historiography",
    "Positivism",
    "Marxist Historiography",
    "Annales School"
  ],
  "learningObjectives": [
    "Explain the evolution of historiography in Western civilisation.",
    "Understand key historiographical traditions such as Positivism, Marxism, and Annales School.",
    "Differentiate between ancient, medieval, and modern approaches to history writing.",
    "Recognize the contribution of Western thinkers to historiographical methods."
  ],
  "questions": [
    {
      "id": "ms-10-hps-ch1-q1",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Who is known as the 'Father of Scientific History'?",
      "options": ["Herodotus", "Thucydides", "Karl Marx", "Voltaire"],
      "answer": "Thucydides",
      "tags": ["greek", "scientific-approach"]
    },
    {
      "id": "ms-10-hps-ch1-q2",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "What is meant by historiography?",
      "answer": "Historiography refers to the study of how history is written, including the methods, sources, interpretations, and philosophy behind writing history.",
      "tags": ["definition"]
    },
    {
      "id": "ms-10-hps-ch1-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "State any two features of Roman historiography.",
      "answer": "Roman historiography emphasized chronological narration of political events, and often included explanations highlighting moral lessons or glorifying Rome.",
      "tags": ["roman-history"]
    },
    {
      "id": "ms-10-hps-ch1-q4",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 2,
      "text": "Which philosophical approach emphasised 'scientific method' in history?",
      "options": ["Annales School", "Positivism", "Romanticism", "Marxism"],
      "answer": "Positivism",
      "tags": ["positivism"]
    },
    {
      "id": "ms-10-hps-ch1-q5",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is the main focus of Marxist historiography?",
      "answer": "Marxist historiography focuses on class struggle, economic forces, and material conditions as the primary drivers of historical change.",
      "tags": ["marxism"]
    },
    {
      "id": "ms-10-hps-ch1-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Explain the contribution of the Annales School to historiography.",
      "answer": "The Annales School emphasized long-term social history ('longue durée'), studying common people, environment, and structures rather than only political events.",
      "tags": ["annales-school"]
    },
    {
      "id": "ms-10-hps-ch1-q7",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 2,
      "text": "Which Western thinker is associated with applying rational and secular methods in history writing during the Enlightenment?",
      "options": ["Voltaire", "Herodotus", "Thucydides", "Levi-Strauss"],
      "answer": "Voltaire",
      "tags": ["enlightenment"]
    },
    {
      "id": "ms-10-hps-ch1-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain how historiography changed during the Renaissance.",
      "answer": "During the Renaissance, historians began using critical methods, studied ancient texts with renewed interest, emphasized human agency, and shifted from religious explanations to rational and secular interpretations. It marked the transition from medieval to modern historical analysis.",
      "tags": ["renaissance", "modern-historiography"]
    },
    {
      "id": "ms-10-hps-ch1-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Compare ancient Greek historiography with modern scientific historiography.",
      "answer": "Greek historiography focused on accurate accounts of wars and political events using eyewitness evidence (e.g., Thucydides). Modern scientific historiography uses systematic methods, verifiable evidence, interdisciplinary tools, and avoids mythological explanations. It emphasises neutrality, causation, and objective analysis.",
      "tags": ["comparative", "greek", "scientific"]
    },
    {
      "id": "ms-10-hps-ch1-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Describe the impact of Positivism on the development of historiography.",
      "answer": "Positivism, influenced by Auguste Comte, insisted that history should follow the scientific method. Historians were encouraged to rely only on empirical evidence, avoid speculation, classify facts systematically, and discover laws of historical development. This transformed history into a more objective and disciplined field.",
      "tags": ["positivism", "modern-historiography"]
    }
  ]
}, {
  "id": "ms-10-hps-ch2",
  "chapterNumber": 2,
  "title": "Historiography: Indian Tradition",
  "slug": "historiography-indian-tradition",
  "description": "Study of the evolution of Indian historiography from ancient times to the colonial and modern period, including various literature forms and historical traditions.",
  "topics": [
    "Ancient Indian Historiography",
    "Vedic Literature",
    "Puranas",
    "Buddhist and Jain Literature",
    "Court Chronicles",
    "Bakhar Tradition",
    "Colonial Historiography",
    "Nationalist Historiography"
  ],
  "learningObjectives": [
    "Understand key sources of ancient Indian history such as Vedas, Puranas, and Buddhist literature.",
    "Explain the characteristics of traditional Indian historiography.",
    "Recognize the contributions of court chronicles and the Bakhar tradition.",
    "Identify the impact of colonial and nationalist historiography on Indian historical writing.",
    "Differentiate Indian historiographical approaches from Western traditions."
  ],
  "questions": [
    {
      "id": "ms-10-hps-ch2-q1",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Which of the following is considered a source of ancient Indian historiography?",
      "options": ["The Iliad", "The Vedas", "The Bible", "The Odyssey"],
      "answer": "The Vedas",
      "tags": ["vedic-literature"]
    },
    {
      "id": "ms-10-hps-ch2-q2",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "What are Puranas?",
      "answer": "Puranas are ancient Indian texts that include myths, genealogies, and historical traditions of various dynasties, sages, and deities.",
      "tags": ["puranas"]
    },
    {
      "id": "ms-10-hps-ch2-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What role did Buddhist literature play in Indian historiography?",
      "answer": "Buddhist literature such as Tripitaka preserved historical information about Gautama Buddha, monastic traditions, contemporary rulers, social conditions, and events of that period.",
      "tags": ["buddhist-literature"]
    },
    {
      "id": "ms-10-hps-ch2-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Explain the importance of court chronicles in medieval Indian historiography.",
      "answer": "Court chronicles recorded political events, royal achievements, administrative systems, wars, and cultural life under various kings, serving as primary historical records.",
      "tags": ["court-chronicles"]
    },
    {
      "id": "ms-10-hps-ch2-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 2,
      "text": "Which tradition of Maharashtra is known for writing historical narratives?",
      "options": ["Bakhar", "Annales", "Romanticism", "Positivism"],
      "answer": "Bakhar",
      "tags": ["bakhar"]
    },
    {
      "id": "ms-10-hps-ch2-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is nationalist historiography?",
      "answer": "Nationalist historiography focuses on interpreting history from the perspective of national pride, identity, and unity, often highlighting resistance movements and cultural achievements.",
      "tags": ["nationalist-historiography"]
    },
    {
      "id": "ms-10-hps-ch2-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Give any two differences between Western and Indian historiographical traditions.",
      "answer": "Western historiography emphasises analytical, scientific methods, while Indian tradition blends mythology with history. Western records focus on chronology; Indian sources highlight moral, religious, and philosophical narratives.",
      "tags": ["comparison"]
    },
    {
      "id": "ms-10-hps-ch2-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Describe the contribution of Vedic literature to Indian historiography.",
      "answer": "Vedic literature including Rigveda provides information on early Aryan culture, social structure, economy, political organization, religious practices, and linguistic evolution. Although not strictly historical, these texts preserve valuable historical insights about ancient Indian life.",
      "tags": ["vedic-literature"]
    },
    {
      "id": "ms-10-hps-ch2-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain how colonial historians influenced the writing of Indian history.",
      "answer": "Colonial historians interpreted Indian history through a Eurocentric perspective, often portraying Indians as static and unchanging. They emphasized foreign invasions and British contributions, sometimes distorting facts to justify colonial rule. Their work shaped Indian historical narratives for decades.",
      "tags": ["colonial-historiography"]
    },
    {
      "id": "ms-10-hps-ch2-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Discuss the importance of the Bakhar tradition in reconstructing Maratha history.",
      "answer": "Bakhars provide detailed accounts of Maratha rulers, battles, administrative policies, diplomacy, and social life. Although written with some exaggeration, they preserve crucial historical data about Chhatrapati Shivaji Maharaj and later Maratha rulers, making them essential for understanding regional history.",
      "tags": ["bakhar", "maratha-history"]
    }
  ]
}, {
  "id": "ms-10-hps-ch3",
  "chapterNumber": 3,
  "title": "Applied History",
  "slug": "applied-history",
  "description": "Application of historical knowledge in fields such as research, heritage management, museum work, tourism, archaeology, and archival studies.",
  "topics": [
    "Meaning of Applied History",
    "Archaeology",
    "Museums and Archives",
    "Heritage Management",
    "Tourism and History",
    "Application of Historical Sources",
    "Interdisciplinary History"
  ],
  "learningObjectives": [
    "Understand how historical knowledge is applied in modern fields.",
    "Explain the role of archaeology, museums, and archives in preserving history.",
    "Recognize the importance of heritage management.",
    "Understand how history contributes to tourism and cultural preservation.",
    "Explore interdisciplinary applications of history."
  ],
  "questions": [
    {
      "id": "ms-10-hps-ch3-q1",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Applied History mainly focuses on:",
      "options": ["Writing poems", "Practical use of historical knowledge", "Making sculptures", "Painting"],
      "answer": "Practical use of historical knowledge",
      "tags": ["definition"]
    },
    {
      "id": "ms-10-hps-ch3-q2",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "Define Archaeology.",
      "answer": "Archaeology is the scientific study of past human life and culture through the excavation and analysis of material remains.",
      "tags": ["archaeology"]
    },
    {
      "id": "ms-10-hps-ch3-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is the role of museums in applied history?",
      "answer": "Museums preserve, display, and interpret historical objects, helping people understand the past through visual and material evidence.",
      "tags": ["museums"]
    },
    {
      "id": "ms-10-hps-ch3-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is heritage management?",
      "answer": "Heritage management involves the preservation, protection, and promotion of cultural, historical, and natural heritage sites for future generations.",
      "tags": ["heritage-management"]
    },
    {
      "id": "ms-10-hps-ch3-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 2,
      "text": "Which of the following is NOT a field related to applied history?",
      "options": ["Tourism", "Archaeology", "Archive Management", "Astronomy"],
      "answer": "Astronomy",
      "tags": ["applied-history"]
    },
    {
      "id": "ms-10-hps-ch3-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Explain the connection between tourism and history.",
      "answer": "Historical sites attract tourists, and tourism promotes conservation. Tourism helps people understand cultural heritage, while also generating revenue for preservation.",
      "tags": ["tourism"]
    },
    {
      "id": "ms-10-hps-ch3-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Why are archives important for historians?",
      "answer": "Archives preserve original documents such as letters, government records, manuscripts, and reports. These primary sources help historians authenticate facts and reconstruct events.",
      "tags": ["archives"]
    },
    {
      "id": "ms-10-hps-ch3-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Describe how archaeology contributes to the reconstruction of history.",
      "answer": "Archaeology uncovers material remains such as tools, structures, pottery, and inscriptions that reveal information about ancient societies. These remains help historians understand lifestyle, economy, religion, and cultural development, filling gaps not covered by written records.",
      "tags": ["archaeology", "reconstruction"]
    },
    {
      "id": "ms-10-hps-ch3-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain the importance of applied history in modern society.",
      "answer": "Applied history helps in heritage preservation, museum curation, tourism development, policy making, education, environmental studies, and understanding cultural identity. It provides context for current issues by analysing past events and patterns.",
      "tags": ["importance"]
    },
    {
      "id": "ms-10-hps-ch3-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Discuss the interdisciplinary nature of applied history with examples.",
      "answer": "Applied history uses methods from archaeology, anthropology, architecture, geology, sociology, and environmental science. For example, archaeologists use carbon dating (science), and tourism studies use cultural history. This integration improves accuracy and enriches understanding of the past.",
      "tags": ["interdisciplinary"]
    }
  ]
}, {
  "id": "ms-10-hps-ch4",
  "chapterNumber": 4,
  "title": "Mass Media and History",
  "slug": "mass-media-and-history",
  "description": "Study of how mass media such as newspapers, radio, television, cinema, and the internet contribute to the creation, preservation, and interpretation of history.",
  "topics": [
    "Newspapers as historical sources",
    "Print media and public opinion",
    "Television and radio broadcasting",
    "Films as historical documents",
    "Digital media and archives",
    "Role of media in social and political movements",
    "Media literacy and interpretation"
  ],
  "learningObjectives": [
    "Understand how mass media provides evidence for historical research.",
    "Explain the role of newspapers, films, and broadcasts in recording events.",
    "Recognize how media influences public opinion and historical interpretation.",
    "Evaluate media as a source of authentic information.",
    "Understand the role of digital technology in preserving historical records."
  ],
  "questions": [
    {
      "id": "ms-10-hps-ch4-q1",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Which of the following is a primary mass media source for historians?",
      "options": ["Poetry books", "Newspapers", "Textbooks", "Dictionaries"],
      "answer": "Newspapers",
      "tags": ["newspapers"]
    },
    {
      "id": "ms-10-hps-ch4-q2",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "Why are newspapers important for historical research?",
      "answer": "Newspapers provide firsthand accounts of political events, social movements, economic activities, advertisements, and public opinion from specific periods.",
      "tags": ["newspapers", "sources"]
    },
    {
      "id": "ms-10-hps-ch4-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "State one advantage and one limitation of using films as historical sources.",
      "answer": "Advantage: Films visually recreate historical events and social life. Limitation: Films may exaggerate or fictionalize events for entertainment.",
      "tags": ["films"]
    },
    {
      "id": "ms-10-hps-ch4-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Explain how radio broadcasting contributed to historical documentation.",
      "answer": "Radio broadcasts recorded speeches, announcements, wartime information, and cultural programs, preserving the tone and atmosphere of specific historical periods.",
      "tags": ["radio"]
    },
    {
      "id": "ms-10-hps-ch4-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 2,
      "text": "Which medium revolutionized access to historical information in the 21st century?",
      "options": ["Radio", "Newspapers", "Internet", "Cinema"],
      "answer": "Internet",
      "tags": ["internet", "digital-media"]
    },
    {
      "id": "ms-10-hps-ch4-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "How does mass media influence public opinion about historical events?",
      "answer": "Media selects, presents, and interprets events, shaping how society perceives causes, consequences, and significance of those events.",
      "tags": ["public-opinion"]
    },
    {
      "id": "ms-10-hps-ch4-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is media literacy and why is it important for historians?",
      "answer": "Media literacy is the ability to critically evaluate media content. Historians need it to identify bias, verify authenticity, and interpret media sources accurately.",
      "tags": ["media-literacy"]
    },
    {
      "id": "ms-10-hps-ch4-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain the role of mass media in documenting social and political movements.",
      "answer": "Mass media captures protests, speeches, public gatherings, interviews, and government responses. It provides chronological evidence of events, highlights public sentiment, and preserves visual/audio records that become valuable historical sources. Media coverage also influences the spread and impact of movements.",
      "tags": ["social-movements", "political-movements"]
    },
    {
      "id": "ms-10-hps-ch4-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Discuss the importance of digital archives in preserving historical information.",
      "answer": "Digital archives store newspapers, documents, photographs, videos, and interviews in searchable formats. They prevent loss due to physical decay, enable global access, and support advanced research tools like metadata indexing and cross-referencing.",
      "tags": ["digital-archives", "preservation"]
    },
    {
      "id": "ms-10-hps-ch4-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Evaluate the reliability of mass media as a historical source.",
      "answer": "Mass media provides immediate, detailed coverage of events, making it valuable. However, media may reflect bias, political influence, commercial interests, or selective reporting. Historians cross-check multiple sources, verify evidence, and identify bias to ensure reliability.",
      "tags": ["analysis", "reliability"]
    }
  ]
}, {
  "id": "ms-10-hps-ch5",
  "chapterNumber": 5,
  "title": "Entertainment Media and History",
  "slug": "entertainment-media-and-history",
  "description": "Understanding how entertainment media such as theatre, films, television, cartoons, and animations depict and preserve historical events, culture, and social life.",
  "topics": [
    "Theatre and History",
    "Film as Historical Representation",
    "Television Serials and Documentaries",
    "Cartoons and Social Commentary",
    "Animation and Visual Storytelling",
    "Historical Dramatization",
    "Impact of Entertainment Media on Society"
  ],
  "learningObjectives": [
    "Understand how entertainment media recreates historical events and culture.",
    "Identify the role of theatre, films, and serials in shaping historical awareness.",
    "Evaluate the strengths and limitations of entertainment media as historical sources.",
    "Analyze the impact of cartoons and animations on social and political commentary.",
    "Recognize how dramatization influences public perception of history."
  ],
  "questions": [
    {
      "id": "ms-10-hps-ch5-q1",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Which entertainment medium is most commonly used to recreate historical events?",
      "options": ["Radio", "Cinema", "Newspapers", "Magazines"],
      "answer": "Cinema",
      "tags": ["films"]
    },
    {
      "id": "ms-10-hps-ch5-q2",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "How does theatre contribute to historical understanding?",
      "answer": "Theatre reenacts historical events, cultural practices, and social life through live performance, helping audiences visualize and emotionally connect with history.",
      "tags": ["theatre"]
    },
    {
      "id": "ms-10-hps-ch5-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "State one advantage and one disadvantage of using films in historical interpretation.",
      "answer": "Advantage: Films bring history to life through visual and dramatic representation. Disadvantage: They may distort facts for entertainment or dramatization.",
      "tags": ["films", "accuracy"]
    },
    {
      "id": "ms-10-hps-ch5-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is the role of television documentaries in preserving history?",
      "answer": "Documentaries provide factual, research-based presentations of historical events, using interviews, archival footage, and expert analysis.",
      "tags": ["documentaries"]
    },
    {
      "id": "ms-10-hps-ch5-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 2,
      "text": "Which entertainment form often uses humor to comment on social and political issues?",
      "options": ["Animation films", "Cartoons", "Soap operas", "Mystery shows"],
      "answer": "Cartoons",
      "tags": ["cartoons"]
    },
    {
      "id": "ms-10-hps-ch5-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Explain how historical dramatization can influence public perception.",
      "answer": "Dramatization adds emotion and narrative elements that may shape or alter public memory, sometimes overshadowing factual accuracy.",
      "tags": ["dramatization", "public-opinion"]
    },
    {
      "id": "ms-10-hps-ch5-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What role does animation play in representing history?",
      "answer": "Animation simplifies complex historical events and makes them accessible, especially for young audiences, through visual storytelling.",
      "tags": ["animation"]
    },
    {
      "id": "ms-10-hps-ch5-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Discuss the importance of cinema as a medium for documenting social and cultural history.",
      "answer": "Cinema captures contemporary society, lifestyle, language, fashion, and social issues of its time. Films reflect public sentiment, cultural changes, and historical events, providing rich sources for historians studying societal evolution.",
      "tags": ["cinema", "social-history"]
    },
    {
      "id": "ms-10-hps-ch5-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain how entertainment media can distort historical facts. Provide examples.",
      "answer": "Entertainment media may modify timelines, exaggerate characters, or fictionalize events to increase drama. This can mislead audiences. For example, film adaptations of historical battles may alter strategies or outcomes for dramatic effect.",
      "tags": ["distortion", "films"]
    },
    {
      "id": "ms-10-hps-ch5-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Evaluate the role of cartoons and satire in documenting political history.",
      "answer": "Cartoons use humor and exaggeration to highlight political events, corruption, leadership flaws, and public sentiment. They effectively capture the mood of an era and serve as valuable sources for understanding political culture.",
      "tags": ["cartoons", "political-history"]
    }
  ]
}, {
  "id": "ms-10-hps-ch6",
  "chapterNumber": 6,
  "title": "Art, Sports, Literature and History",
  "slug": "art-sports-literature-and-history",
  "description": "Understanding how art, sports, and literature reflect historical developments, social changes, cultural expressions, and national identity.",
  "topics": [
    "Art as a reflection of society",
    "Literature as a historical source",
    "Sports and cultural development",
    "Artistic heritage",
    "Traditional and modern sports",
    "Evolution of literature",
    "Cultural identity and nationalism"
  ],
  "learningObjectives": [
    "Explain how various art forms reflect social and historical changes.",
    "Understand the role of literature in recording emotions, ideas, and events of the past.",
    "Recognize the importance of sports in cultural and national development.",
    "Identify historical information contained in paintings, sculptures, and manuscripts.",
    "Analyze how artistic and literary expressions shape cultural identity."
  ],
  "questions": [
    {
      "id": "ms-10-hps-ch6-q1",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Which of the following can be considered a historical source?",
      "options": ["Novels", "Sports magazines", "Paintings", "All of the above"],
      "answer": "All of the above",
      "tags": ["sources"]
    },
    {
      "id": "ms-10-hps-ch6-q2",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "How does art help historians understand the past?",
      "answer": "Art reflects contemporary lifestyle, cultural values, clothing, social conditions, and important events, providing visual evidence for historians.",
      "tags": ["art"]
    },
    {
      "id": "ms-10-hps-ch6-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "State one way literature contributes to history writing.",
      "answer": "Literature captures the emotions, struggles, celebrations, and thoughts of people from a particular period, revealing social and cultural history.",
      "tags": ["literature"]
    },
    {
      "id": "ms-10-hps-ch6-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Explain the historical importance of traditional sports in India.",
      "answer": "Traditional sports like wrestling, kabaddi, and archery reflect societal values, physical culture, community bonding, and ancient training systems.",
      "tags": ["sports"]
    },
    {
      "id": "ms-10-hps-ch6-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 2,
      "text": "Which form of art is directly linked with cultural heritage?",
      "options": ["Graffiti", "Classical dance", "Modern comics", "Short films"],
      "answer": "Classical dance",
      "tags": ["cultural-heritage"]
    },
    {
      "id": "ms-10-hps-ch6-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "How do sports contribute to national identity?",
      "answer": "Sports encourage unity, national pride, international recognition, and cultural representation through participation and achievements.",
      "tags": ["national-identity"]
    },
    {
      "id": "ms-10-hps-ch6-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Explain why literature is considered a powerful medium for expressing social history.",
      "answer": "Literature expresses personal experiences, social conflicts, customs, beliefs, and cultural movements, offering deeper insights into societal changes.",
      "tags": ["literature", "social-history"]
    },
    {
      "id": "ms-10-hps-ch6-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Discuss the importance of art forms such as painting and sculpture in understanding ancient civilizations.",
      "answer": "Paintings and sculptures depict religious beliefs, attire, architecture, social roles, economic activities, and symbolic expressions of ancient societies. They serve as primary sources when written records are limited, helping historians reconstruct cultural and political life.",
      "tags": ["art", "ancient-history"]
    },
    {
      "id": "ms-10-hps-ch6-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Evaluate the role of sports in shaping social and cultural development.",
      "answer": "Sports promote discipline, teamwork, and mutual respect. They influence cultural development through festivals, local traditions, and community engagement. International sports foster cultural exchange and enhance a nation's global presence.",
      "tags": ["sports", "cultural-development"]
    },
    {
      "id": "ms-10-hps-ch6-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain how literature and art together help historians create a multidimensional picture of the past.",
      "answer": "Art provides visual representation, while literature conveys emotions, ideas, and narratives. Together, they capture cultural, social, political, and psychological aspects of historical periods, enabling historians to form a holistic understanding of human experience.",
      "tags": ["art", "literature", "analysis"]
    }
  ]
}, {
  "id": "ms-10-hps-ch7",
  "chapterNumber": 7,
  "title": "Tourism and History",
  "slug": "tourism-and-history",
  "description": "Understanding the relationship between tourism and history, types of tourism, importance of heritage sites, and the role of tourism in cultural and economic development.",
  "topics": [
    "Cultural Tourism",
    "Historical Tourism",
    "Heritage Sites",
    "Museums and Tourism",
    "Eco-Tourism",
    "Tourism Industry",
    "Preservation of Heritage"
  ],
  "learningObjectives": [
    "Understand how historical sites attract tourism and promote cultural heritage.",
    "Identify various types of tourism linked to history.",
    "Recognize the importance of preserving heritage sites for future tourism.",
    "Explain the economic and cultural impact of tourism.",
    "Evaluate challenges faced in heritage management due to tourism."
  ],
  "questions": [
    {
      "id": "ms-10-hps-ch7-q1",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "What type of tourism involves visiting historical monuments and heritage sites?",
      "options": ["Eco-tourism", "Historical tourism", "Medical tourism", "Adventure tourism"],
      "answer": "Historical tourism",
      "tags": ["tourism-types"]
    },
    {
      "id": "ms-10-hps-ch7-q2",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "What is cultural tourism?",
      "answer": "Cultural tourism involves traveling to experience the traditions, customs, art, festivals, and heritage of a particular region or society.",
      "tags": ["cultural-tourism"]
    },
    {
      "id": "ms-10-hps-ch7-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "State two benefits of promoting historical tourism.",
      "answer": "It helps preserve heritage sites and boosts the economy by generating revenue and creating employment.",
      "tags": ["historical-tourism", "benefits"]
    },
    {
      "id": "ms-10-hps-ch7-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Why are museums important for tourism?",
      "answer": "Museums preserve artifacts, artworks, and historical objects that attract tourists and educate them about the past.",
      "tags": ["museums"]
    },
    {
      "id": "ms-10-hps-ch7-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 2,
      "text": "Which factor can negatively affect heritage sites?",
      "options": ["Responsible tourism", "Conservation efforts", "Overcrowding", "Government protection"],
      "answer": "Overcrowding",
      "tags": ["heritage-threats"]
    },
    {
      "id": "ms-10-hps-ch7-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Explain the role of tourism in economic development.",
      "answer": "Tourism generates revenue, increases employment, promotes regional development, and supports local businesses such as hotels and handicrafts.",
      "tags": ["economy"]
    },
    {
      "id": "ms-10-hps-ch7-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What precautions should be taken at heritage sites to promote sustainable tourism?",
      "answer": "Avoid littering, restrict harmful activities, follow preservation rules, control visitor numbers, and ensure proper maintenance of sites.",
      "tags": ["sustainable-tourism"]
    },
    {
      "id": "ms-10-hps-ch7-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Describe the relationship between tourism and history.",
      "answer": "Tourism often revolves around historical monuments, museums, cultural events, and heritage sites. History enriches tourism by offering meaningful experiences, while tourism promotes conservation and awareness of historical treasures. Both fields support each other economically and culturally.",
      "tags": ["analysis", "tourism-history"]
    },
    {
      "id": "ms-10-hps-ch7-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain the importance of preserving heritage sites for future generations.",
      "answer": "Heritage sites represent cultural identity, architectural achievements, and historical milestones. Preserving them ensures future generations can study, appreciate, and learn from the past, while also supporting sustainable tourism and cultural continuity.",
      "tags": ["heritage-preservation"]
    },
    {
      "id": "ms-10-hps-ch7-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Discuss challenges faced in managing heritage sites due to increasing tourism.",
      "answer": "Challenges include overcrowding, environmental damage, vandalism, commercialization, lack of funds for maintenance, and balancing preservation with tourist accessibility. These issues require strict regulations and sustainable tourism policies.",
      "tags": ["heritage-management", "tourism-impact"]
    }
  ]
}, {
  "id": "ms-10-hps-ch8",
  "chapterNumber": 8,
  "title": "Heritage Management",
  "slug": "heritage-management",
  "description": "Study of preservation, protection, and management of cultural and natural heritage, including roles of government, citizens, and institutions.",
  "topics": [
    "Meaning of Heritage",
    "Types of Heritage",
    "Need for Heritage Conservation",
    "Role of ASI and UNESCO",
    "Museums and Archives",
    "Local and National Heritage",
    "Sustainable Heritage Management"
  ],
  "learningObjectives": [
    "Understand the concept and importance of cultural and natural heritage.",
    "Recognize the need for preservation and conservation.",
    "Identify national and international organizations responsible for heritage management.",
    "Explain how museums, archives, and local bodies help manage heritage.",
    "Evaluate challenges and strategies for sustainable heritage protection."
  ],
  "questions": [
    {
      "id": "ms-10-hps-ch8-q1",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Which organization declares World Heritage Sites?",
      "options": ["UNICEF", "UNESCO", "WHO", "ASI"],
      "answer": "UNESCO",
      "tags": ["unesco"]
    },
    {
      "id": "ms-10-hps-ch8-q2",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "Define heritage.",
      "answer": "Heritage refers to the cultural, historical, natural, and architectural assets inherited from past generations and preserved for the future.",
      "tags": ["definition"]
    },
    {
      "id": "ms-10-hps-ch8-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "State two types of heritage with examples.",
      "answer": "Cultural heritage (e.g., monuments, literature) and natural heritage (e.g., national parks, biodiversity-rich landscapes).",
      "tags": ["types-of-heritage"]
    },
    {
      "id": "ms-10-hps-ch8-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Why is heritage conservation necessary?",
      "answer": "Conservation preserves cultural identity, supports tourism, protects historical knowledge, and ensures that future generations can learn from past achievements.",
      "tags": ["conservation"]
    },
    {
      "id": "ms-10-hps-ch8-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 2,
      "text": "Which government body manages archaeological sites in India?",
      "options": ["NITI Aayog", "ASI", "ISRO", "Supreme Court"],
      "answer": "ASI",
      "tags": ["asi"]
    },
    {
      "id": "ms-10-hps-ch8-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Explain the role of museums in heritage management.",
      "answer": "Museums preserve, exhibit, and protect cultural objects, educate the public, and help maintain historical and artistic heritage.",
      "tags": ["museums"]
    },
    {
      "id": "ms-10-hps-ch8-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What role do citizens play in managing heritage?",
      "answer": "Citizens help by following conservation rules, spreading awareness, reporting vandalism, volunteering for clean-up drives, and respecting heritage sites.",
      "tags": ["citizen-responsibility"]
    },
    {
      "id": "ms-10-hps-ch8-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Discuss the major challenges in heritage management.",
      "answer": "Challenges include pollution, urbanization, overcrowding at sites, vandalism, lack of funds, natural disasters, and neglect. Balancing tourism with preservation is also a key issue. These challenges require strict policies and community involvement.",
      "tags": ["challenges", "heritage-management"]
    },
    {
      "id": "ms-10-hps-ch8-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain the contributions of UNESCO to the protection of world heritage.",
      "answer": "UNESCO identifies and designates World Heritage Sites, sets global conservation standards, provides funding and expertise, raises awareness, and encourages international cooperation for heritage protection.",
      "tags": ["unesco", "global-conservation"]
    },
    {
      "id": "ms-10-hps-ch8-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Describe the role of the Archaeological Survey of India (ASI) in heritage management.",
      "answer": "ASI maintains, excavates, preserves, and protects monuments of national importance. It conducts research, maintains records, collaborates with international bodies, and enforces laws related to antiquities and heritage preservation.",
      "tags": ["asi", "heritage-protection"]
    }
  ]
}, {
  "id": "ms-10-hps-ch9",
  "chapterNumber": 9,
  "title": "History and the Profession",
  "slug": "history-and-the-profession",
  "description": "Understanding how history forms the foundation of various professions such as research, teaching, museum work, archaeology, tourism, archiving, journalism, and heritage management.",
  "topics": [
    "Professions related to History",
    "Archaeology as a career",
    "Museum and archival work",
    "Tourism and guiding profession",
    "History in media and research",
    "Role of historians",
    "Skills developed through history"
  ],
  "learningObjectives": [
    "Identify various careers linked to the study of history.",
    "Understand the work done by archaeologists, archivists, and museum curators.",
    "Recognize how history contributes to journalism, tourism, and research.",
    "Explain the importance of historical skills such as analysis and interpretation.",
    "Understand how history helps in nation-building and cultural preservation."
  ],
  "questions": [
    {
      "id": "ms-10-hps-ch9-q1",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Which profession involves studying material remains of the past?",
      "options": ["Sociology", "Archaeology", "Accountancy", "Law"],
      "answer": "Archaeology",
      "tags": ["archaeology"]
    },
    {
      "id": "ms-10-hps-ch9-q2",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "What does a museum curator do?",
      "answer": "A curator manages historical collections, preserves artifacts, organizes exhibitions, and educates visitors about cultural heritage.",
      "tags": ["museum"]
    },
    {
      "id": "ms-10-hps-ch9-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "State any two skills developed by studying history.",
      "answer": "Critical thinking and evidence-based analysis are key skills developed through historical study.",
      "tags": ["skills"]
    },
    {
      "id": "ms-10-hps-ch9-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is the role of archives in history-related professions?",
      "answer": "Archives preserve manuscripts, government records, letters, maps, and other primary sources essential for historical research and documentation.",
      "tags": ["archives"]
    },
    {
      "id": "ms-10-hps-ch9-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 2,
      "text": "Which profession uses history for creating scripts, documentaries, and informational content?",
      "options": ["Engineering", "Media and Journalism", "Chemistry", "Mathematics"],
      "answer": "Media and Journalism",
      "tags": ["journalism"]
    },
    {
      "id": "ms-10-hps-ch9-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Explain the role of a tourist guide in relation to history.",
      "answer": "A tourist guide explains the historical significance of monuments, cultural sites, and heritage locations, helping visitors understand the past meaningfully.",
      "tags": ["tourism"]
    },
    {
      "id": "ms-10-hps-ch9-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Why is research an important profession for historians?",
      "answer": "Research helps historians discover new facts, reinterpret old findings, write analytical reports, and contribute to academic knowledge.",
      "tags": ["research"]
    },
    {
      "id": "ms-10-hps-ch9-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Describe how journalism benefits from the study of history.",
      "answer": "History provides journalists with background knowledge for reporting events, analyzing political developments, understanding social issues, and avoiding misinformation. It helps them draw parallels, interpret causes, and present accurate narratives.",
      "tags": ["journalism", "analysis"]
    },
    {
      "id": "ms-10-hps-ch9-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain the role of archaeologists in preserving cultural heritage.",
      "answer": "Archaeologists excavate and document ancient sites, study artifacts, analyze structures, and protect material remains. Their work provides insights into past civilizations and ensures heritage sites are preserved for future generations.",
      "tags": ["archaeology", "heritage"]
    },
    {
      "id": "ms-10-hps-ch9-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Discuss the importance of history-related professions in society.",
      "answer": "History-related professions preserve cultural identity, support research, enhance tourism, guide policymaking, enrich education, and promote national consciousness. They ensure society learns from the past to make informed decisions for the future.",
      "tags": ["importance", "society"]
    }
  ]
}, {
  "id": "ms-10-hps-ch10",
  "chapterNumber": 10,
  "title": "Working of the Constitution",
  "slug": "working-of-the-constitution",
  "description": "Understanding how the Indian Constitution functions through concepts like rights, duties, government structure, federalism, elections, and functioning of institutions.",
  "topics": [
    "Features of the Indian Constitution",
    "Fundamental Rights and Duties",
    "Federal System",
    "Parliamentary Democracy",
    "Judiciary",
    "Executive and Legislature",
    "Rule of Law"
  ],
  "learningObjectives": [
    "Understand the functioning of key constitutional institutions.",
    "Explain the roles of the Legislature, Executive, and Judiciary.",
    "Recognize the importance of rights, duties, and rule of law.",
    "Understand federalism and distribution of powers.",
    "Analyze how the Constitution works in day-to-day governance."
  ],
  "questions": [
    {
      "id": "ms-10-hps-ch10-q1",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Who is the head of the Union Executive?",
      "options": ["Prime Minister", "Chief Justice", "President", "Governor"],
      "answer": "President",
      "tags": ["executive"]
    },
    {
      "id": "ms-10-hps-ch10-q2",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "What is meant by the rule of law?",
      "answer": "Rule of law means that no one is above the law, and all citizens and institutions are subject to the same legal framework.",
      "tags": ["rule-of-law"]
    },
    {
      "id": "ms-10-hps-ch10-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "State any two Fundamental Duties of Indian citizens.",
      "answer": "To respect the Constitution and national institutions, and to promote harmony and common brotherhood among all people.",
      "tags": ["fundamental-duties"]
    },
    {
      "id": "ms-10-hps-ch10-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is federalism?",
      "answer": "Federalism is a system where powers are divided between a central government and state governments.",
      "tags": ["federalism"]
    },
    {
      "id": "ms-10-hps-ch10-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 2,
      "text": "Which institution interprets the Constitution?",
      "options": ["Parliament", "Election Commission", "Judiciary", "Finance Commission"],
      "answer": "Judiciary",
      "tags": ["judiciary"]
    },
    {
      "id": "ms-10-hps-ch10-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Explain the role of Parliament in the working of the Constitution.",
      "answer": "Parliament makes laws, controls the Executive, approves budgets, amends the Constitution, and represents the people through elected members.",
      "tags": ["parliament"]
    },
    {
      "id": "ms-10-hps-ch10-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is meant by separation of powers?",
      "answer": "It refers to dividing the functions of government among the Legislature, Executive, and Judiciary to avoid concentration of power.",
      "tags": ["separation-of-powers"]
    },
    {
      "id": "ms-10-hps-ch10-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Describe the relationship between the Legislature and the Executive in a parliamentary system.",
      "answer": "In a parliamentary system, the Executive (Prime Minister and Council of Ministers) is drawn from the Legislature and is accountable to it. The Legislature can question, vote out, or approve the policies of the Executive. They work interdependently, ensuring democratic functioning.",
      "tags": ["parliamentary-system"]
    },
    {
      "id": "ms-10-hps-ch10-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain how the Judiciary safeguards the Constitution.",
      "answer": "The Judiciary ensures laws are constitutional, protects Fundamental Rights, settles disputes between governments, and interprets the Constitution. It acts as guardian of justice and prevents misuse of power through judicial review.",
      "tags": ["judiciary", "safeguards"]
    },
    {
      "id": "ms-10-hps-ch10-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Discuss the importance of Fundamental Rights in the functioning of Indian democracy.",
      "answer": "Fundamental Rights protect individual liberty, ensure equality, promote justice, and prevent discrimination. They enable citizens to participate freely in political and social life, forming the backbone of democratic governance.",
      "tags": ["fundamental-rights"]
    }
  ]
}, {
  "id": "ms-10-hps-ch11",
  "chapterNumber": 11,
  "title": "The Electoral Process",
  "slug": "the-electoral-process",
  "description": "Study of how elections are conducted in India, including Election Commission, voters’ rights, voting methods, nomination, political campaigning, and democratic participation.",
  "topics": [
    "Meaning and Importance of Elections",
    "Universal Adult Franchise",
    "Election Commission",
    "Voter List",
    "Nomination of Candidates",
    "Election Campaign",
    "Voting and Counting Process",
    "Types of Elections"
  ],
  "learningObjectives": [
    "Understand the need for elections in a democracy.",
    "Explain the functioning and powers of the Election Commission.",
    "Describe the steps of the electoral process from nomination to counting.",
    "Recognize the importance of voting and voter participation.",
    "Understand different types of elections held in India."
  ],
  "questions": [
    {
      "id": "ms-10-hps-ch11-q1",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Who conducts elections in India?",
      "options": ["Parliament", "Supreme Court", "Election Commission", "President"],
      "answer": "Election Commission",
      "tags": ["election-commission"]
    },
    {
      "id": "ms-10-hps-ch11-q2",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "What is meant by Universal Adult Franchise?",
      "answer": "Universal Adult Franchise means every citizen aged 18 or above has the right to vote, irrespective of caste, gender, religion, or economic status.",
      "tags": ["franchise"]
    },
    {
      "id": "ms-10-hps-ch11-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "State any two functions of the Election Commission.",
      "answer": "The Election Commission prepares and updates the voter list, conducts free and fair elections, supervises the nomination process, and implements the Code of Conduct.",
      "tags": ["election-commission", "functions"]
    },
    {
      "id": "ms-10-hps-ch11-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Why is an updated voter list important for elections?",
      "answer": "An updated voter list ensures only eligible citizens vote, prevents duplication, and maintains fairness in the electoral process.",
      "tags": ["voter-list"]
    },
    {
      "id": "ms-10-hps-ch11-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 2,
      "text": "What do candidates submit during the nomination process?",
      "options": ["A manifesto", "Identity card", "Nomination form and deposit", "Voter ID"],
      "answer": "Nomination form and deposit",
      "tags": ["nomination"]
    },
    {
      "id": "ms-10-hps-ch11-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is the Model Code of Conduct?",
      "answer": "The Model Code of Conduct is a set of guidelines that political parties and candidates must follow during elections to ensure fairness and prevent misuse of power.",
      "tags": ["code-of-conduct"]
    },
    {
      "id": "ms-10-hps-ch11-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Explain the significance of voting in a democracy.",
      "answer": "Voting allows citizens to choose their representatives, participate in governance, and hold the government accountable, ensuring democratic functioning.",
      "tags": ["voting", "democracy"]
    },
    {
      "id": "ms-10-hps-ch11-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Describe the steps involved in the electoral process from voter registration to counting of votes.",
      "answer": `"The steps include:  
1. Preparation and revision of voter list.  
2. Announcement of election schedule.  
3. Nomination of candidates.  
4. Scrutiny and withdrawal.  
5. Election campaign and implementation of Code of Conduct.  
6. Voting through secret ballot or EVM.  
7. Counting of votes and declaration of results."`,
      "tags": ["electoral-process"]
    },
    {
      "id": "ms-10-hps-ch11-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain the significance of the Election Commission in ensuring free and fair elections.",
      "answer": "The Election Commission supervises elections independently, monitors campaigns, enforces the Code of Conduct, controls expenditure, prevents malpractice, deploys security forces, and ensures transparency in voting and counting. Its autonomy maintains democratic integrity.",
      "tags": ["election-commission", "importance"]
    },
    {
      "id": "ms-10-hps-ch11-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Discuss the challenges faced in conducting elections in India.",
      "answer": "Challenges include large population, geographical diversity, political pressure, misuse of money and muscle power, ensuring voter turnout, maintaining security, and preventing misinformation. The Election Commission addresses these through strict laws, monitoring, and public awareness.",
      "tags": ["challenges", "elections"]
    }
  ]
}, {
  "id": "ms-10-hps-ch12",
  "chapterNumber": 12,
  "title": "Political Parties",
  "slug": "political-parties",
  "description": "Understanding the role, functions, types, and importance of political parties in a democratic system.",
  "topics": [
    "Meaning of Political Parties",
    "Types of Political Parties",
    "Functions of Parties",
    "Party System",
    "Role in Democracy",
    "Challenges Faced by Parties",
    "Party Organization"
  ],
  "learningObjectives": [
    "Define political parties and understand their necessity in a democracy.",
    "Distinguish between national and regional parties.",
    "Explain the major functions performed by political parties.",
    "Analyze the role of parties in shaping public opinion and governance.",
    "Understand challenges faced by political parties in India."
  ],
  "questions": [
    {
      "id": "ms-10-hps-ch12-q1",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "A political party is a group of people who come together to:",
      "options": [
        "Play sports",
        "Form government and contest elections",
        "Write books",
        "Run businesses"
      ],
      "answer": "Form government and contest elections",
      "tags": ["definition"]
    },
    {
      "id": "ms-10-hps-ch12-q2",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "What is a national party?",
      "answer": "A national party is a political party recognized in multiple states and having a nationwide presence and agenda.",
      "tags": ["types"]
    },
    {
      "id": "ms-10-hps-ch12-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "State any two functions of political parties.",
      "answer": "Political parties contest elections and form government; they also shape public opinion and create public policies.",
      "tags": ["functions"]
    },
    {
      "id": "ms-10-hps-ch12-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is meant by party system?",
      "answer": "Party system refers to the pattern of political party organization in a country, such as one-party, two-party, or multi-party system.",
      "tags": ["party-system"]
    },
    {
      "id": "ms-10-hps-ch12-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 2,
      "text": "Which of the following is a feature of a multi-party system?",
      "options": ["Only one party exists", "Two major parties dominate", "Multiple parties compete for power", "Elections are not held"],
      "answer": "Multiple parties compete for power",
      "tags": ["multi-party"]
    },
    {
      "id": "ms-10-hps-ch12-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Explain the role of opposition parties.",
      "answer": "Opposition parties question government decisions, highlight public issues, provide alternative policies, and ensure accountability in governance.",
      "tags": ["opposition"]
    },
    {
      "id": "ms-10-hps-ch12-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Why are political parties necessary in a democracy?",
      "answer": "They organize elections, represent public interests, form government, ensure political stability, and act as a link between citizens and the government.",
      "tags": ["importance"]
    },
    {
      "id": "ms-10-hps-ch12-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Describe the structure of a political party organization.",
      "answer": "A political party typically has grassroots local units, district-level committees, state leadership, and a national executive. It includes members, workers, office holders, and specialized wings such as youth, women, and labor wings.",
      "tags": ["organization"]
    },
    {
      "id": "ms-10-hps-ch12-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain the challenges faced by political parties in India.",
      "answer": "Challenges include internal party corruption, use of muscle and money power, lack of internal democracy, criminalization of politics, factionalism, and declining trust among citizens.",
      "tags": ["challenges"]
    },
    {
      "id": "ms-10-hps-ch12-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Evaluate the role of political parties in strengthening democracy.",
      "answer": "Parties provide platforms for political participation, mobilize citizens, aggregate interests, form stable governments, and create policies. They promote debate, accountability, and governance, which are essential for democratic functioning.",
      "tags": ["democracy", "importance"]
    }
  ]
}, {
  "id": "ms-10-hps-ch13",
  "chapterNumber": 13,
  "title": "Social and Political Movements",
  "slug": "social-and-political-movements",
  "description": "Study of major social and political movements in India, their significance, types, and role in strengthening democracy and social justice.",
  "topics": [
    "Social Movements",
    "Political Movements",
    "Environmental Movements",
    "Women’s Movement",
    "Dalit Movement",
    "Farmers’ Movement",
    "Linguistic and Regional Movements",
    "Role of Movements in Democracy"
  ],
  "learningObjectives": [
    "Understand the meaning and nature of social and political movements.",
    "Identify different movements such as environmental, women's, Dalit, and farmers' movements.",
    "Explain the role of movements in promoting justice and rights.",
    "Recognize how movements influence government policies and democratic processes.",
    "Evaluate the importance of collective action in social change."
  ],
  "questions": [
    {
      "id": "ms-10-hps-ch13-q1",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Which movement focuses on protecting natural resources and the environment?",
      "options": ["Women’s Movement", "Environmental Movement", "Dalit Movement", "Farmers’ Movement"],
      "answer": "Environmental Movement",
      "tags": ["environmental"]
    },
    {
      "id": "ms-10-hps-ch13-q2",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "What is meant by a social movement?",
      "answer": "A social movement is a collective effort by a group of people to bring about social change or resist injustice.",
      "tags": ["definition"]
    },
    {
      "id": "ms-10-hps-ch13-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "State one objective of the women’s movement in India.",
      "answer": "One objective is to ensure gender equality by demanding equal rights, education, and protection against discrimination.",
      "tags": ["women"]
    },
    {
      "id": "ms-10-hps-ch13-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is the main aim of the Dalit movement?",
      "answer": "The Dalit movement aims to end caste-based discrimination and secure social equality, dignity, and justice for Dalits.",
      "tags": ["dalit"]
    },
    {
      "id": "ms-10-hps-ch13-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 2,
      "text": "Which movement is associated with issues like crop prices and agricultural reforms?",
      "options": ["Environmental Movement", "Farmers’ Movement", "Dalit Movement", "Students’ Movement"],
      "answer": "Farmers’ Movement",
      "tags": ["farmers"]
    },
    {
      "id": "ms-10-hps-ch13-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Explain the importance of environmental movements.",
      "answer": "Environmental movements raise awareness about deforestation, pollution, and degradation of resources, and demand policies for sustainable development.",
      "tags": ["environmental"]
    },
    {
      "id": "ms-10-hps-ch13-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "How do social movements strengthen democracy?",
      "answer": "They encourage citizen participation, hold the government accountable, highlight public issues, and bring reforms that promote justice and equality.",
      "tags": ["democracy"]
    },
    {
      "id": "ms-10-hps-ch13-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Describe the role of the women’s movement in achieving social justice in India.",
      "answer": "The women’s movement has campaigned for education, employment, political representation, legal reforms, and protection against violence. It challenged patriarchal norms and secured laws related to dowry, domestic violence, and gender equality, contributing significantly to social justice.",
      "tags": ["women", "social-justice"]
    },
    {
      "id": "ms-10-hps-ch13-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain the impact of farmers’ movements on government policies.",
      "answer": "Farmers’ movements have influenced policies regarding crop prices, loan waivers, irrigation, electricity supply, and agricultural reforms. They draw attention to rural problems and push the government to implement farmer-friendly measures.",
      "tags": ["farmers", "policies"]
    },
    {
      "id": "ms-10-hps-ch13-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Discuss the role of social and political movements in bringing social change.",
      "answer": "Movements mobilize people, challenge injustice, demand laws, and influence policy-making. They raise awareness, represent marginalized groups, and bring about reforms in areas like environment protection, gender equality, caste discrimination, and economic rights, leading to long-term social transformation.",
      "tags": ["social-change", "movements"]
    }
  ]
}, {
  "id": "ms-10-hps-ch14",
  "chapterNumber": 14,
  "title": "Challenges Faced by Indian Democracy",
  "slug": "challenges-faced-by-indian-democracy",
  "description": "Study of major political, social, and economic challenges affecting the proper functioning of Indian democracy and measures to overcome them.",
  "topics": [
    "Corruption",
    "Criminalisation of Politics",
    "Casteism and Communalism",
    "Inequality and Poverty",
    "Regionalism",
    "Unemployment",
    "Lack of Transparency",
    "Strengthening Democracy"
  ],
  "learningObjectives": [
    "Identify key challenges faced by Indian democracy.",
    "Understand how corruption and criminalisation affect governance.",
    "Explain social challenges like casteism and communalism.",
    "Recognize economic limitations such as poverty and unemployment.",
    "Evaluate measures needed to strengthen democratic values and institutions."
  ],
  "questions": [
    {
      "id": "ms-10-hps-ch14-q1",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Which of the following is a major challenge to Indian democracy?",
      "options": ["High literacy", "Corruption", "Industrial growth", "Technological development"],
      "answer": "Corruption",
      "tags": ["corruption"]
    },
    {
      "id": "ms-10-hps-ch14-q2",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "What is meant by criminalisation of politics?",
      "answer": "Criminalisation of politics refers to people with criminal backgrounds entering politics or influencing political processes.",
      "tags": ["criminalisation"]
    },
    {
      "id": "ms-10-hps-ch14-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "State any two effects of corruption on democracy.",
      "answer": "Corruption weakens trust in government and leads to misuse of public funds, reducing the quality of governance.",
      "tags": ["corruption-effects"]
    },
    {
      "id": "ms-10-hps-ch14-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "How does casteism affect democratic values?",
      "answer": "Casteism encourages discrimination, undermines equality, influences voting patterns, and prevents fair political representation.",
      "tags": ["casteism"]
    },
    {
      "id": "ms-10-hps-ch14-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 2,
      "text": "Which social issue threatens unity and harmony in India?",
      "options": ["Communalism", "Urbanization", "Globalization", "Privatization"],
      "answer": "Communalism",
      "tags": ["communalism"]
    },
    {
      "id": "ms-10-hps-ch14-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Why is unemployment a challenge for democracy?",
      "answer": "Unemployment creates economic inequality, reduces people's participation in governance, and increases social unrest.",
      "tags": ["unemployment"]
    },
    {
      "id": "ms-10-hps-ch14-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Explain the meaning of transparency in a democracy.",
      "answer": "Transparency means government decisions and processes are open to public scrutiny, ensuring accountability and reducing corruption.",
      "tags": ["transparency"]
    },
    {
      "id": "ms-10-hps-ch14-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Describe how communalism poses a threat to Indian democracy.",
      "answer": "Communalism divides people based on religion, causing mistrust, violence, and political manipulation. It weakens national unity, disturbs social harmony, and distracts from developmental issues. Communal tensions can influence elections and undermine democratic processes.",
      "tags": ["communalism", "democracy"]
    },
    {
      "id": "ms-10-hps-ch14-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain the challenges created by regionalism in Indian democracy.",
      "answer": "Regionalism prioritizes regional interests over national unity. It can cause disputes over resources, demands for separate states, political polarisation, and identity conflict. While regional aspirations are natural, excessive regionalism may hinder national development.",
      "tags": ["regionalism"]
    },
    {
      "id": "ms-10-hps-ch14-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Suggest measures to strengthen Indian democracy.",
      "answer": "Measures include reducing corruption, promoting transparency, ensuring fast trials for criminal cases, strengthening education, empowering citizens, protecting rights, improving economic equality, enhancing participation, and promoting tolerance and national unity.",
      "tags": ["strengthening-democracy"]
    }
  ]
}

  ]
}, {
  board: "msbshse",
  medium: "english",
  classKey: "10",
  subjectSlug: "geography",
  chapters: [
{
  "id": "ms-10-geo-ch1",
  "chapterNumber": 1,
  "title": "Field Visit",
  "slug": "field-visit",
  "description": "Understanding the purpose, planning, execution and reporting of geographical field visits.",
  "topics": [
    "Need and Importance of Field Visit",
    "Planning a Field Visit",
    "Data Collection Methods",
    "Observation and Recording",
    "Interview Techniques",
    "Preparation of Field Report",
    "Use of Maps and Sketches"
  ],
  "learningObjectives": [
    "Explain the importance of field visits in geography.",
    "Understand how to plan and organise a field visit.",
    "Use observation, interviews and surveys to collect geographical data.",
    "Prepare field notes and a structured field report.",
    "Interpret field data using sketches, photographs and maps."
  ],
  "questions": [
    {
      "id": "ms-10-geo-ch1-q1",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Which of the following is the first step in organising a field visit?",
      "options": ["Writing a report", "Planning the visit", "Collecting data", "Preparing questionnaires"],
      "answer": "Planning the visit",
      "tags": ["planning"]
    },
    {
      "id": "ms-10-geo-ch1-q2",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "Why are field visits important in geography?",
      "answer": "Field visits help students observe real geographical phenomena, collect first-hand data and understand concepts through practical experience.",
      "tags": ["importance"]
    },
    {
      "id": "ms-10-geo-ch1-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "State any two methods used for collecting information during a field visit.",
      "answer": "Observation and interviews are commonly used methods for collecting information.",
      "tags": ["data-collection"]
    },
    {
      "id": "ms-10-geo-ch1-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What precautions should be taken during a field visit?",
      "answer": "Students should follow safety rules, stay with the group, respect local people and avoid disturbing the environment.",
      "tags": ["safety", "precautions"]
    },
    {
      "id": "ms-10-geo-ch1-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 2,
      "text": "Which of the following is NOT a tool used in field data collection?",
      "options": ["Questionnaire", "Measuring tape", "Camera", "Textbook exercises"],
      "answer": "Textbook exercises",
      "tags": ["tools"]
    },
    {
      "id": "ms-10-geo-ch1-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is the role of sketches and photographs in field visits?",
      "answer": "Sketches and photographs visually record observations, making it easier to analyse and present geographical information.",
      "tags": ["sketches", "photographs"]
    },
    {
      "id": "ms-10-geo-ch1-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What should be included in a field report?",
      "answer": "A field report should include introduction, objectives, methods, observations, data, sketches, photographs and conclusions.",
      "tags": ["report"]
    },
    {
      "id": "ms-10-geo-ch1-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain the steps involved in planning and conducting a field visit.",
      "answer": "Steps include: selecting a suitable location, deciding objectives, preparing questionnaires, arranging transport and safety, collecting data through observation and interviews, taking photographs, noting field data and finally preparing a report.",
      "tags": ["planning", "execution"]
    },
    {
      "id": "ms-10-geo-ch1-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Discuss the importance of interviews during a field visit.",
      "answer": "Interviews provide direct information from local residents or experts. They help understand cultural, economic or environmental aspects that may not be obvious from observation alone and add depth to the collected data.",
      "tags": ["interviews"]
    },
    {
      "id": "ms-10-geo-ch1-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Describe how field observations help in understanding geographical concepts.",
      "answer": "Field observations allow students to directly study landforms, settlements, climate patterns, natural resources and human activities. This real-world exposure strengthens conceptual understanding and connects theory with practice.",
      "tags": ["observation", "concepts"]
    }
  ]
},
{
  "id": "ms-10-geo-ch2",
  "chapterNumber": 2,
  "title": "Location and Extent",
  "slug": "location-and-extent",
  "description": "Understanding India’s geographical location, latitudinal and longitudinal extent, tropic passage, standard meridian, and neighbouring countries.",
  "topics": [
    "Latitudinal Extent",
    "Longitudinal Extent",
    "Effects of Latitudes and Longitudes",
    "Standard Meridian of India",
    "Tropic of Cancer",
    "Neighbouring Countries",
    "Geopolitical Importance of India’s Location"
  ],
  "learningObjectives": [
    "Locate India on a world map using latitudes and longitudes.",
    "Explain the significance of India’s latitudinal and longitudinal extent.",
    "Understand the importance of the Tropic of Cancer and Standard Meridian.",
    "Identify India’s neighbouring countries.",
    "Recognize India’s strategic location in South Asia."
  ],
  "questions": [
    {
      "id": "ms-10-geo-ch2-q1",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Between which latitudes does India lie?",
      "options": [
        "8°4'N to 37°6'N",
        "0° to 30°N",
        "10°S to 10°N",
        "5°N to 55°N"
      ],
      "answer": "8°4'N to 37°6'N",
      "tags": ["latitudes"]
    },
    {
      "id": "ms-10-geo-ch2-q2",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "What is the longitudinal extent of India?",
      "answer": "India extends from 68°7'E to 97°25'E longitudes.",
      "tags": ["longitudes"]
    },
    {
      "id": "ms-10-geo-ch2-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Name any two countries that share land borders with India.",
      "answer": "Pakistan and Nepal (Other options: China, Bhutan, Bangladesh, Myanmar).",
      "tags": ["neighbouring-countries"]
    },
    {
      "id": "ms-10-geo-ch2-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is the significance of the Tropic of Cancer in India?",
      "answer": "The Tropic of Cancer (23°30'N) divides India into almost equal northern and southern halves and influences the climate by marking tropical and subtropical zones.",
      "tags": ["tropic-of-cancer"]
    },
    {
      "id": "ms-10-geo-ch2-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 2,
      "text": "Which longitude is used as the Standard Meridian of India?",
      "options": [
        "82°30'E",
        "68°7'E",
        "97°25'E",
        "90°E"
      ],
      "answer": "82°30'E",
      "tags": ["standard-meridian"]
    },
    {
      "id": "ms-10-geo-ch2-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Explain why the Standard Meridian is necessary for India.",
      "answer": "India has a wide longitudinal extent, which leads to differences in local time. A standard meridian ensures uniform time across the country (IST).",
      "tags": ["standard-meridian", "time"]
    },
    {
      "id": "ms-10-geo-ch2-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Why is India's location considered strategic?",
      "answer": "India lies between East and West Asia, has a long coastline along the Indian Ocean, and serves as a link between Europe, Africa, and Southeast Asia, making it geopolitically important.",
      "tags": ["geopolitical"]
    },
    {
      "id": "ms-10-geo-ch2-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Describe how India’s latitudinal extent influences its climate.",
      "answer": "India’s latitudinal spread (from 8°4'N to 37°6'N) places the southern region in the tropical zone and the northern region in the subtropical zone. As a result, southern India experiences higher temperatures and smaller seasonal variations, while northern India has more distinct seasons, including a cold winter.",
      "tags": ["climate", "latitudes"]
    },
    {
      "id": "ms-10-geo-ch2-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain the effects of India’s longitudinal extent on time difference within the country.",
      "answer": "The longitudinal extent of nearly 30° results in a time difference of about 2 hours from east to west. Places in Arunachal Pradesh see sunrise earlier than places in Gujarat. To avoid confusion, IST (82°30'E) is used as the standard time for the entire country.",
      "tags": ["longitudes", "time-difference"]
    },
    {
      "id": "ms-10-geo-ch2-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Discuss how India’s location along the Indian Ocean has contributed to its cultural and economic interactions throughout history.",
      "answer": "India’s central location in the Indian Ocean enabled ancient trade with Africa, Middle East, and Southeast Asia. Maritime routes facilitated cultural exchange, spread of religions, development of ports, and economic prosperity. India's coastal position continues to support international trade and naval significance.",
      "tags": ["indian-ocean", "trade", "cultural-exchange"]
    }
  ]
}, {
  "id": "ms-10-geo-ch3",
  "chapterNumber": 3,
  "title": "Physiography and Drainage",
  "slug": "physiography-and-drainage",
  "description": "Study of India’s major physiographic divisions, their characteristics, and the drainage systems including major rivers and river basins.",
  "topics": [
    "Himalayan Mountains",
    "Northern Plains",
    "Peninsular Plateau",
    "Coastal Plains",
    "Islands",
    "Himalayan Rivers",
    "Peninsular Rivers",
    "River Basins and Drainage Patterns"
  ],
  "learningObjectives": [
    "Identify and describe India’s major physiographic divisions.",
    "Differentiate between Himalayan and Peninsular rivers.",
    "Understand the importance of river systems in India’s development.",
    "Locate major rivers and physiographic features on a map.",
    "Explain how physiographic features influence climate, agriculture, and population distribution."
  ],
  "questions": [
    {
      "id": "ms-10-geo-ch3-q1",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Which of the following is a Himalayan river?",
      "options": ["Godavari", "Krishna", "Ganga", "Cauvery"],
      "answer": "Ganga",
      "tags": ["himalayan-rivers"]
    },
    {
      "id": "ms-10-geo-ch3-q2",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "Name any two physiographic divisions of India.",
      "answer": "The Himalayan Mountains and the Peninsular Plateau.",
      "tags": ["physiography"]
    },
    {
      "id": "ms-10-geo-ch3-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Why are the Northern Plains densely populated?",
      "answer": "The Northern Plains have fertile alluvial soil, adequate water supply, favourable climate, and flat terrain, making them suitable for agriculture and settlement.",
      "tags": ["northern-plains", "population"]
    },
    {
      "id": "ms-10-geo-ch3-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "State one difference between Himalayan and Peninsular rivers.",
      "answer": "Himalayan rivers are perennial as they receive water from snowmelt and rainfall, whereas Peninsular rivers are seasonal and depend mainly on monsoon rains.",
      "tags": ["rivers", "comparison"]
    },
    {
      "id": "ms-10-geo-ch3-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 2,
      "text": "Which physiographic division is the oldest landmass of India?",
      "options": ["Himalayas", "Northern Plains", "Peninsular Plateau", "Coastal Plains"],
      "answer": "Peninsular Plateau",
      "tags": ["peninsular-plateau"]
    },
    {
      "id": "ms-10-geo-ch3-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What are the Western and Eastern Ghats?",
      "answer": "The Western and Eastern Ghats are long mountain ranges that border the Peninsular Plateau, influencing climate, rainfall, and biodiversity.",
      "tags": ["ghats"]
    },
    {
      "id": "ms-10-geo-ch3-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Explain any two characteristics of coastal plains.",
      "answer": "Coastal plains are narrow stretches of land along the coast. They are suitable for fishing, agriculture, and development of ports.",
      "tags": ["coastal-plains"]
    },
    {
      "id": "ms-10-geo-ch3-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Describe the major physiographic divisions of India.",
      "answer": `"India has six major physiographic divisions:  
1. **Himalayan Mountains** – high young fold mountains.  
2. **Northern Plains** – fertile alluvial plains formed by Himalayan rivers.  
3. **Peninsular Plateau** – ancient and stable rocky region.  
4. **Coastal Plains** – eastern and western coastal lowlands.  
5. **Thar Desert** – arid region with sandy terrain.  
6. **Islands** – Andaman-Nicobar and Lakshadweep groups."`,
      "tags": ["physiography", "divisions"]
    },
    {
      "id": "ms-10-geo-ch3-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain the importance of rivers in India’s economic development.",
      "answer": "Rivers provide water for irrigation, drinking, industry, and hydropower. They support agriculture, fisheries, transport, and settlement. River basins form fertile regions and help maintain ecological balance.",
      "tags": ["rivers", "economy"]
    },
    {
      "id": "ms-10-geo-ch3-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Discuss the drainage patterns found in India with examples.",
        "answer": `"India has dendritic, trellis, radial, and parallel drainage patterns.  
  - **Dendritic**: Ganga basin.  
  - **Trellis**: Rivers in the Vindhya ranges.  
  - **Radial**: Rivers originating from Amarkantak and volcanic cones.  
  - **Parallel**: Western Ghats region.  
  These patterns reflect geological structure and slope."`,
      "tags": ["drainage-patterns"]
    }
  ]
}, {
  "id": "ms-10-geo-ch4",
  "chapterNumber": 4,
  "title": "Climate",
  "slug": "climate",
  "description": "Study of India’s climate, including seasons, monsoon mechanism, temperature and rainfall distribution, and factors influencing climatic variations.",
  "topics": [
    "Characteristics of Indian Climate",
    "Factors Affecting Climate",
    "Indian Monsoon",
    "Rainfall Distribution",
    "Temperature Distribution",
    "Climatic Seasons",
    "Retreating Monsoon",
    "Cyclones and Local Winds"
  ],
  "learningObjectives": [
    "Understand the major climatic controls in India.",
    "Explain the mechanism of the Indian monsoon.",
    "Describe seasonal variations in temperature and rainfall.",
    "Identify the causes of uneven rainfall distribution.",
    "Recognize the significance of monsoon for agriculture and economy."
  ],
  "questions": [
    {
      "id": "ms-10-geo-ch4-q1",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Which factor is mainly responsible for the onset of monsoon in India?",
      "options": ["Land-Sea breeze", "Low pressure over Northwest India", "Western disturbances", "Snowfall in Himalayas"],
      "answer": "Low pressure over Northwest India",
      "tags": ["monsoon"]
    },
    {
      "id": "ms-10-geo-ch4-q2",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "Name the four main seasons of India.",
      "answer": "The four seasons are: Winter, Summer, Monsoon, and Retreating Monsoon.",
      "tags": ["seasons"]
    },
    {
      "id": "ms-10-geo-ch4-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is the role of the Himalayas in influencing India’s climate?",
      "answer": "The Himalayas prevent cold winds from Central Asia from entering India and force monsoon winds to rise, causing heavy rainfall on the northern plains.",
      "tags": ["himalayas"]
    },
    {
      "id": "ms-10-geo-ch4-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Explain why Tamil Nadu receives rainfall during the retreating monsoon.",
      "answer": "During retreating monsoon, winds blow from the northeast, picking up moisture from the Bay of Bengal and bringing rainfall to Tamil Nadu.",
      "tags": ["retreating-monsoon"]
    },
    {
      "id": "ms-10-geo-ch4-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 2,
      "text": "Which region receives the highest rainfall in India?",
      "options": ["Western Rajasthan", "Gujarat Plains", "Mawsynram–Meghalaya", "Punjab"],
      "answer": "Mawsynram–Meghalaya",
      "tags": ["rainfall"]
    },
    {
      "id": "ms-10-geo-ch4-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "State any two factors affecting India’s climate.",
      "answer": "Latitude, altitude, distance from the sea, relief, and monsoon winds are major climatic controls.",
      "tags": ["climatic-factors"]
    },
    {
      "id": "ms-10-geo-ch4-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Why does Western Rajasthan receive very low rainfall?",
      "answer": "Western Rajasthan lies in the rain shadow region, has high temperature leading to high evaporation, and lacks moisture-laden winds.",
      "tags": ["rainfall-distribution"]
    },
    {
      "id": "ms-10-geo-ch4-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain the mechanism of the Indian monsoon.",
      "answer": "During summer, intense heating creates low pressure over northwest India, while high pressure exists over the Indian Ocean. Moist winds from the ocean blow towards the low-pressure area, bringing heavy rainfall. The monsoon is influenced by ITCZ shift, differential heating of land and sea, and the role of the Himalayas.",
      "tags": ["monsoon", "mechanism"]
    },
    {
      "id": "ms-10-geo-ch4-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Describe the temperature distribution in India during summer and winter.",
      "answer": "In summer, temperatures are highest in northwestern India, with heat waves common. Southern regions have moderate temperatures due to maritime influence. In winter, northern India experiences very low temperatures due to cold continental winds, while southern peninsular India remains warm.",
      "tags": ["temperature"]
    },
    {
      "id": "ms-10-geo-ch4-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Discuss the importance of monsoon rainfall for India’s agriculture and economy.",
      "answer": "Monsoon rainfall is crucial for irrigation, crop growth, drinking water reservoirs, hydropower generation, and groundwater recharge. A good monsoon boosts food production and economy, while weak monsoon leads to droughts, crop failure, and inflation.",
      "tags": ["monsoon", "economy", "agriculture"]
    }
  ]
}, {
  "id": "ms-10-geo-ch5",
  "chapterNumber": 5,
  "title": "Natural Vegetation and Wildlife",
  "slug": "natural-vegetation-and-wildlife",
  "description": "Study of India’s natural vegetation types, wildlife distribution, biodiversity, threats to forests and wildlife, and conservation measures.",
  "topics": [
    "Factors Affecting Natural Vegetation",
    "Types of Forests in India",
    "Grasslands and Desert Vegetation",
    "Mangroves",
    "Wildlife Distribution",
    "Biodiversity",
    "Conservation of Forests and Wildlife",
    "National Parks and Sanctuaries"
  ],
  "learningObjectives": [
    "Understand the relationship between climate, soil, and vegetation.",
    "Identify major vegetation types found in India.",
    "Explain the distribution and importance of wildlife.",
    "Recognize threats to forests and wildlife.",
    "Describe conservation measures such as national parks, protected areas, and afforestation."
  ],
  "questions": [
    {
      "id": "ms-10-geo-ch5-q1",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Which type of forest is found in areas with heavy rainfall?",
      "options": ["Mangroves", "Desert vegetation", "Evergreen forests", "Thorn forests"],
      "answer": "Evergreen forests",
      "tags": ["forest-types"]
    },
    {
      "id": "ms-10-geo-ch5-q2",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "What is biodiversity?",
      "answer": "Biodiversity refers to the variety of plant and animal species in a particular region.",
      "tags": ["biodiversity"]
    },
    {
      "id": "ms-10-geo-ch5-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "State any two factors that influence natural vegetation in India.",
      "answer": "Climate (temperature and rainfall) and soil types are major factors influencing natural vegetation.",
      "tags": ["factors"]
    },
    {
      "id": "ms-10-geo-ch5-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Why are mangrove forests found in coastal regions?",
      "answer": "Mangroves grow in saline, tidal waters where silt and mud accumulate, making coastal deltas ideal for their growth.",
      "tags": ["mangroves"]
    },
    {
      "id": "ms-10-geo-ch5-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 2,
      "text": "Which animal is mainly found in the desert vegetation region?",
      "options": ["Tiger", "Camel", "Elephant", "Leopard"],
      "answer": "Camel",
      "tags": ["desert"]
    },
    {
      "id": "ms-10-geo-ch5-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Explain why wildlife conservation is necessary.",
      "answer": "Wildlife conservation is essential to protect endangered species, maintain ecological balance, preserve biodiversity, and sustain natural habitats.",
      "tags": ["conservation"]
    },
    {
      "id": "ms-10-geo-ch5-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "State two reasons for the decline of forests in India.",
      "answer": "Deforestation for agriculture and urbanisation, and illegal logging are major reasons for forest decline.",
      "tags": ["deforestation"]
    },
    {
      "id": "ms-10-geo-ch5-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Describe the main characteristics of tropical deciduous forests.",
      "answer": "Tropical deciduous forests occur in areas with 100–200 cm rainfall. Trees shed leaves in the dry season to conserve water. Teak, sal, and bamboo are common species. These forests support diverse wildlife and are economically important.",
      "tags": ["deciduous-forests"]
    },
    {
      "id": "ms-10-geo-ch5-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain the causes and effects of wildlife depletion in India.",
      "answer": "Causes include poaching, habitat destruction, pollution, climate change, and deforestation. Effects include loss of biodiversity, disruption of food chains, ecological imbalance, and threat to endangered species.",
      "tags": ["wildlife", "depletion"]
    },
    {
      "id": "ms-10-geo-ch5-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Discuss various measures taken by the government to conserve forests and wildlife.",
      "answer": "Measures include establishing national parks, wildlife sanctuaries, biosphere reserves, enforcing Wildlife Protection Act, afforestation programs, banning hunting, and promoting awareness about conservation.",
      "tags": ["government-measures", "conservation"]
    }
  ]
}, {
  "id": "ms-10-geo-ch6",
  "chapterNumber": 6,
  "title": "Population",
  "slug": "population",
  "description": "Study of India’s population distribution, density, growth, composition, literacy, sex ratio, age structure, and economic activities.",
  "topics": [
    "Population Distribution",
    "Population Density",
    "Population Growth",
    "Birth Rate and Death Rate",
    "Age Composition",
    "Sex Ratio",
    "Literacy Rate",
    "Economic Composition of Population"
  ],
  "learningObjectives": [
    "Understand the distribution and density of population in India.",
    "Explain population growth patterns and related factors.",
    "Interpret population composition through sex ratio, age structure, and literacy.",
    "Analyze the relationship between economic development and population characteristics.",
    "Identify factors influencing uneven population distribution."
  ],
  "questions": [
    {
      "id": "ms-10-geo-ch6-q1",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Which state has the highest population in India (as per recent Census trends)?",
      "options": ["Maharashtra", "Uttar Pradesh", "Bihar", "Tamil Nadu"],
      "answer": "Uttar Pradesh",
      "tags": ["distribution"]
    },
    {
      "id": "ms-10-geo-ch6-q2",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "Define population density.",
      "answer": "Population density refers to the number of people living per unit area, usually per square kilometre.",
      "tags": ["density"]
    },
    {
      "id": "ms-10-geo-ch6-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Name any two factors affecting population distribution in India.",
      "answer": "Relief (terrain) and climate are major factors. Fertile plains and moderate climate attract high population.",
      "tags": ["distribution-factors"]
    },
    {
      "id": "ms-10-geo-ch6-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is sex ratio? Why is it important?",
      "answer": "Sex ratio is the number of females per 1000 males. It indicates gender balance and reflects social conditions of a region.",
      "tags": ["sex-ratio"]
    },
    {
      "id": "ms-10-geo-ch6-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 2,
      "text": "Which of the following contributes to population growth?",
      "options": ["High death rate", "High birth rate", "Low life expectancy", "Migration only"],
      "answer": "High birth rate",
      "tags": ["growth"]
    },
    {
      "id": "ms-10-geo-ch6-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Explain the significance of literacy rate.",
      "answer": "Literacy rate indicates the educational level of the population and affects employability, economic development, and quality of life.",
      "tags": ["literacy"]
    },
    {
      "id": "ms-10-geo-ch6-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is age composition of population?",
      "answer": "Age composition refers to the distribution of population in different age groups such as young (0–14), working (15–59), and aged (60+).",
      "tags": ["age-composition"]
    },
    {
      "id": "ms-10-geo-ch6-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Describe the factors affecting uneven population distribution in India.",
      "answer": "Population distribution depends on climate, relief, soil fertility, water availability, industrialization, transport facilities, and economic opportunities. Fertile plains like the Ganga basin are densely populated, while deserts, mountains, and forests have sparse population.",
      "tags": ["distribution-analysis"]
    },
    {
      "id": "ms-10-geo-ch6-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain the relationship between population and economic development.",
      "answer": "A skilled and healthy population boosts productivity and economic growth. Overpopulation can cause unemployment and pressure on resources. Balanced population growth supports sustainable development.",
      "tags": ["economy", "population"]
    },
    {
      "id": "ms-10-geo-ch6-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Discuss the issues arising from rapid population growth in India.",
      "answer": "Rapid population growth leads to unemployment, pressure on land, shortage of food and water, increased pollution, inadequate housing, and strain on health and education facilities.",
      "tags": ["population-problems"]
    }
  ]
}, {
  "id": "ms-10-geo-ch7",
  "chapterNumber": 7,
  "title": "Human Settlements",
  "slug": "human-settlements",
  "description": "Study of rural and urban settlements, settlement patterns, growth of towns and cities, problems of urbanisation, and planning for sustainable settlements.",
  "topics": [
    "Meaning of Human Settlements",
    "Rural and Urban Settlements",
    "Settlement Patterns",
    "Growth of Urban Centres",
    "Migration and Urbanisation",
    "Slums and Urban Problems",
    "Sustainable Development of Settlements"
  ],
  "learningObjectives": [
    "Differentiate between rural and urban settlements.",
    "Understand factors influencing the location and growth of settlements.",
    "Identify settlement patterns and their characteristics.",
    "Explain the causes and effects of urbanisation.",
    "Recognize urban problems and steps for sustainable settlement planning."
  ],
  "questions": [
    {
      "id": "ms-10-geo-ch7-q1",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Which of the following is an example of a rural settlement?",
      "options": ["Village", "Metropolitan city", "Industrial township", "Mega city"],
      "answer": "Village",
      "tags": ["rural"]
    },
    {
      "id": "ms-10-geo-ch7-q2",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "Define urbanisation.",
      "answer": "Urbanisation is the increase in the proportion of the population living in urban areas due to migration and natural growth.",
      "tags": ["urbanisation"]
    },
    {
      "id": "ms-10-geo-ch7-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "State any two differences between rural and urban settlements.",
      "answer": "Rural settlements depend mainly on agriculture and have low population density, while urban settlements depend on industry and services and have high population density.",
      "tags": ["comparison"]
    },
    {
      "id": "ms-10-geo-ch7-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What are nucleated settlements?",
      "answer": "Nucleated settlements are settlements where houses and buildings are located close together around a central point such as a market or water source.",
      "tags": ["settlement-patterns"]
    },
    {
      "id": "ms-10-geo-ch7-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 2,
      "text": "Which factor least influences the location of human settlements?",
      "options": ["Relief", "Climate", "Soil", "Colour of buildings"],
      "answer": "Colour of buildings",
      "tags": ["location-factors"]
    },
    {
      "id": "ms-10-geo-ch7-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Explain how migration contributes to urbanisation.",
      "answer": "Migration increases the population of cities as people move from rural areas in search of better jobs, education, and living conditions.",
      "tags": ["migration"]
    },
    {
      "id": "ms-10-geo-ch7-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What are slums, and why do they develop?",
      "answer": "Slums are overcrowded and poorly serviced urban areas. They develop due to rapid urbanisation, lack of affordable housing, and poverty.",
      "tags": ["slums"]
    },
    {
      "id": "ms-10-geo-ch7-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Describe the major problems faced by urban areas in India.",
      "answer": "Urban areas face problems such as congestion, pollution, shortage of housing, traffic jams, unemployment, inadequate water supply, waste management issues, and development of slums.",
      "tags": ["urban-problems"]
    },
    {
      "id": "ms-10-geo-ch7-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain the different types of settlement patterns with examples.",
      "answer": `"Settlement patterns include:  
1. **Nucleated** – houses clustered together (e.g., villages near rivers).  
2. **Dispersed** – houses scattered over a large area (e.g., hilly regions).  
3. **Linear** – settlements along roads, rivers or railways.  
These patterns depend on relief, resources, and socio-economic factors."`,
      "tags": ["settlement-patterns"]
    },
    {
      "id": "ms-10-geo-ch7-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Suggest measures for sustainable development of human settlements.",
      "answer": "Measures include planning affordable housing, improving transport, providing clean water and sanitation, promoting green spaces, controlling pollution, decentralized development, and creating employment opportunities in smaller towns.",
      "tags": ["sustainable-development"]
    }
  ]
}, {
  "id": "ms-10-geo-ch8",
  "chapterNumber": 8,
  "title": "Economy and Occupations",
  "slug": "economy-and-occupations",
  "description": "Study of India’s economic structure including primary, secondary, and tertiary occupations, their characteristics, distribution, and importance in national development.",
  "topics": [
    "Primary Occupations",
    "Secondary Occupations",
    "Tertiary Occupations",
    "Agriculture",
    "Industries",
    "Service Sector",
    "Employment Distribution",
    "Economic Development"
  ],
  "learningObjectives": [
    "Differentiate between primary, secondary, and tertiary occupations.",
    "Understand the importance of agriculture, industries, and services in India’s economy.",
    "Analyze the distribution of occupations among India’s population.",
    "Explain the factors influencing the development of different economic sectors.",
    "Recognize challenges faced by workers in various occupations."
  ],
  "questions": [
    {
      "id": "ms-10-geo-ch8-q1",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Which of the following is a primary occupation?",
      "options": ["Banking", "Farming", "Textile production", "Teaching"],
      "answer": "Farming",
      "tags": ["primary"]
    },
    {
      "id": "ms-10-geo-ch8-q2",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "Define secondary occupations.",
      "answer": "Secondary occupations involve manufacturing and processing raw materials into finished goods, such as industries.",
      "tags": ["secondary"]
    },
    {
      "id": "ms-10-geo-ch8-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "State any two examples of tertiary occupations.",
      "answer": "Banking and transportation are examples of tertiary occupations.",
      "tags": ["tertiary"]
    },
    {
      "id": "ms-10-geo-ch8-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Why is agriculture considered the backbone of India’s economy?",
      "answer": "Agriculture employs a large portion of the population, provides raw materials to industries, contributes to food security, and supports exports.",
      "tags": ["agriculture"]
    },
    {
      "id": "ms-10-geo-ch8-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 2,
      "text": "Which sector has shown the fastest growth in recent years?",
      "options": ["Primary", "Secondary", "Tertiary", "Traditional"],
      "answer": "Tertiary",
      "tags": ["growth"]
    },
    {
      "id": "ms-10-geo-ch8-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Explain the importance of transport and communication in economic development.",
      "answer": "Transport and communication connect markets, support trade, reduce travel time, improve access to services, and promote regional development.",
      "tags": ["transport", "communication"]
    },
    {
      "id": "ms-10-geo-ch8-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What are the challenges faced by the industrial sector?",
      "answer": "Industries face challenges like inadequate infrastructure, power shortage, lack of skilled labour, pollution, and competition.",
      "tags": ["industry"]
    },
    {
      "id": "ms-10-geo-ch8-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Describe the occupational structure of India.",
      "answer": "India’s occupational structure is dominated by primary activities, especially agriculture. Secondary occupations (industries) employ fewer people due to limited industrialization. Tertiary occupations like transport, banking, education, and IT are growing rapidly and contribute significantly to GDP.",
      "tags": ["occupational-structure"]
    },
    {
      "id": "ms-10-geo-ch8-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain the role of the tertiary sector in India’s economy.",
      "answer": "The tertiary sector provides essential services such as education, healthcare, communication, tourism, banking, and trade. It supports primary and secondary sectors, enhances productivity, creates jobs, and drives economic growth.",
      "tags": ["tertiary", "services"]
    },
    {
      "id": "ms-10-geo-ch8-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Discuss the factors affecting the development of industries in India.",
      "answer": "Industrial development depends on availability of raw materials, power supply, labour, capital, transport facilities, government policies, market demand, and technological advancement.",
      "tags": ["industrial-development"]
    }
  ]
}, {
  "id": "ms-10-geo-ch9",
  "chapterNumber": 9,
  "title": "Tourism, Transport and Communication",
  "slug": "tourism-transport-and-communication",
  "description": "Study of tourism in India, major transport systems, modern communication networks, and their importance in economic and social development.",
  "topics": [
    "Types of Tourism",
    "Importance of Tourism",
    "Road Transport",
    "Rail Transport",
    "Waterways",
    "Air Transport",
    "Modern Communication Systems",
    "Role in Economic Development"
  ],
  "learningObjectives": [
    "Understand different types of tourism and their importance to India.",
    "Describe major transport systems and their characteristics.",
    "Recognize the importance of communication in modern society.",
    "Explain how transport and communication support economic development.",
    "Identify challenges in tourism and transport infrastructure."
  ],
  "questions": [
    {
      "id": "ms-10-geo-ch9-q1",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Which of the following is the fastest mode of transport?",
      "options": ["Roadways", "Railways", "Airways", "Waterways"],
      "answer": "Airways",
      "tags": ["transport"]
    },
    {
      "id": "ms-10-geo-ch9-q2",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "Define tourism.",
      "answer": "Tourism is the activity of traveling for leisure, recreation, education, or business purposes.",
      "tags": ["tourism"]
    },
    {
      "id": "ms-10-geo-ch9-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "State any two types of tourism in India.",
      "answer": "Cultural tourism and adventure tourism are two major types of tourism in India.",
      "tags": ["tourism-types"]
    },
    {
      "id": "ms-10-geo-ch9-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Why are waterways considered economical?",
      "answer": "Waterways are economical because they can transport large quantities of goods at low cost and require less fuel compared to other transport modes.",
      "tags": ["waterways"]
    },
    {
      "id": "ms-10-geo-ch9-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 2,
      "text": "Which transport system has the largest route network in India?",
      "options": ["Roadways", "Railways", "Airways", "Pipelines"],
      "answer": "Roadways",
      "tags": ["roadways"]
    },
    {
      "id": "ms-10-geo-ch9-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Mention two advantages of road transport.",
      "answer": "Road transport provides door-to-door service and is suitable for short distances and perishable goods.",
      "tags": ["road-transport"]
    },
    {
      "id": "ms-10-geo-ch9-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Explain the role of communication in today’s world.",
      "answer": "Communication enables quick exchange of information through phones, internet, and media, supporting business, governance, education, and social connectivity.",
      "tags": ["communication"]
    },
    {
      "id": "ms-10-geo-ch9-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Describe the importance of tourism for India’s economy.",
      "answer": "Tourism generates employment, supports hospitality industries, earns foreign exchange, promotes cultural exchange, and encourages development of infrastructure such as transport and hotels. It boosts local economies and preserves heritage sites.",
      "tags": ["tourism-importance"]
    },
    {
      "id": "ms-10-geo-ch9-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain the advantages and limitations of rail transport in India.",
      "answer": `"Advantages: Railways are suitable for long-distance travel, carry heavy goods, are economical, and connect remote regions.  
Limitations: Overcrowding, delays, high maintenance costs, limited reach in hilly regions, and dependence on large infrastructure."`,
      "tags": ["railways"]
    },
    {
      "id": "ms-10-geo-ch9-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Discuss how transport and communication contribute to national development.",
      "answer": "Transport enables movement of goods, people, and raw materials, supporting trade and industry. Communication ensures fast information exchange, enhances governance, connects markets, and promotes education and awareness. Together, they integrate regions and accelerate economic growth.",
      "tags": ["development", "transport", "communication"]
    }
  ]
}
  ]
},
  // MSBSHSE Class 10
{
  board: "msbshse",
  medium: "english",
  classKey: "12-science",
  subjectSlug: "biology",
  chapters: [
    {
  "id": "ms-12-bio-ch1",
  "chapterNumber": 1,
  "title": "Reproduction in Lower and Higher Plants",
  "slug": "reproduction-in-plants",
  "description": "Study of asexual and sexual reproduction in lower plants (algae, fungi, bryophytes, pteridophytes) and higher plants (gymnosperms and angiosperms), along with structure and development of flowers, pollen, ovules, fruits, and seeds.",
  "topics": [
    "Asexual Reproduction",
    "Vegetative Propagation",
    "Sexual Reproduction in Plants",
    "Microsporogenesis and Megasporogenesis",
    "Pollination Types and Mechanisms",
    "Fertilization",
    "Endosperm and Embryo Development",
    "Fruit and Seed Formation"
  ],
  "learningObjectives": [
    "Differentiate between asexual and sexual modes of reproduction in plants.",
    "Understand microsporogenesis and megasporogenesis processes.",
    "Explain types and agents of pollination.",
    "Describe double fertilization and post-fertilization events.",
    "Understand fruit and seed development in angiosperms."
  ],
  "questions": [
    {
      "id": "ms-12-bio-ch1-q1",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Which of the following is an asexual method of reproduction?",
      "options": ["Gametogenesis", "Fragmentation", "Fertilization", "Pollination"],
      "answer": "Fragmentation",
      "tags": ["asexual"]
    },
    {
      "id": "ms-12-bio-ch1-q2",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "Define vegetative propagation.",
      "answer": "Vegetative propagation is a type of asexual reproduction in which new plants develop from vegetative parts like roots, stems, or leaves.",
      "tags": ["vegetative-propagation"]
    },
    {
      "id": "ms-12-bio-ch1-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is microsporogenesis?",
      "answer": "Microsporogenesis is the process of formation of microspores (pollen grains) from microspore mother cells through meiosis.",
      "tags": ["microsporogenesis"]
    },
    {
      "id": "ms-12-bio-ch1-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "State two differences between self-pollination and cross-pollination.",
      "answer": "Self-pollination occurs within the same flower or plant, ensures purity of race; cross-pollination occurs between different plants of the same species and increases genetic variation.",
      "tags": ["pollination"]
    },
    {
      "id": "ms-12-bio-ch1-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 2,
      "text": "Double fertilization is characteristic of:",
      "options": ["Algae", "Bryophytes", "Gymnosperms", "Angiosperms"],
      "answer": "Angiosperms",
      "tags": ["fertilization"]
    },
    {
      "id": "ms-12-bio-ch1-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is the function of the endosperm?",
      "answer": "Endosperm provides stored nutrients required for the growth and development of the embryo.",
      "tags": ["endosperm"]
    },
    {
      "id": "ms-12-bio-ch1-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Explain the term megasporogenesis.",
      "answer": "Megasporogenesis is the formation of megaspores from the megaspore mother cell inside the ovule through meiosis.",
      "tags": ["megasporogenesis"]
    },
    {
      "id": "ms-12-bio-ch1-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Describe the process of double fertilization in angiosperms.",
      "answer": "In double fertilization, one male gamete fuses with the egg cell to form the zygote (syngamy), while the other male gamete fuses with the two polar nuclei to form the triploid primary endosperm nucleus (triple fusion). This unique process results in simultaneous formation of embryo and endosperm.",
      "tags": ["double-fertilization"]
    },
    {
      "id": "ms-12-bio-ch1-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain post-fertilization changes occurring in a flower.",
      "answer": "After fertilization, the ovary develops into a fruit, ovules develop into seeds, endosperm forms to nourish the embryo, integuments form the seed coat, and petals and other floral parts wither away.",
      "tags": ["post-fertilization"]
    },
    {
      "id": "ms-12-bio-ch1-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Discuss types of asexual reproduction in lower plants with suitable examples.",
      "answer": "Lower plants reproduce asexually through methods such as fragmentation (Spirogyra), spore formation (Rhizopus), budding (Yeast), and binary fission (Bacteria). These methods help rapid multiplication and survival under unfavorable conditions.",
      "tags": ["lower-plants", "asexual"]
    }
  ]
}, {
  "id": "ms-12-bio-ch2",
  "chapterNumber": 2,
  "title": "Reproduction in Lower and Higher Animals",
  "slug": "reproduction-in-animals",
  "description": "Study of asexual and sexual reproduction in lower and higher animals, including gametogenesis, fertilization, embryonic development, reproductive health, and human reproductive systems.",
  "topics": [
    "Asexual Reproduction in Animals",
    "Sexual Reproduction",
    "Gametogenesis",
    "Male and Female Reproductive Systems",
    "Menstrual Cycle",
    "Fertilization",
    "Embryonic Development",
    "Reproductive Health and Assisted Reproductive Technologies"
  ],
  "learningObjectives": [
    "Differentiate between asexual and sexual reproduction in animals.",
    "Understand gametogenesis and structure of human reproductive systems.",
    "Explain the menstrual cycle and hormonal regulation.",
    "Describe fertilization and stages of embryonic development.",
    "Learn about reproductive health and modern reproductive technologies."
  ],
  "questions": [
    {
      "id": "ms-12-bio-ch2-q1",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Binary fission is commonly seen in:",
      "options": ["Amoeba", "Frog", "Earthworm", "Human"],
      "answer": "Amoeba",
      "tags": ["asexual"]
    },
    {
      "id": "ms-12-bio-ch2-q2",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "Define fertilization.",
      "answer": "Fertilization is the fusion of male and female gametes to form a diploid zygote.",
      "tags": ["fertilization"]
    },
    {
      "id": "ms-12-bio-ch2-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is ovulation?",
      "answer": "Ovulation is the release of a mature ovum from the ovary, typically occurring midway through the menstrual cycle.",
      "tags": ["ovulation"]
    },
    {
      "id": "ms-12-bio-ch2-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "State two differences between external and internal fertilization.",
      "answer": "External fertilization occurs outside the body and requires water; internal fertilization occurs inside the body and offers greater protection to the embryo.",
      "tags": ["fertilization-types"]
    },
    {
      "id": "ms-12-bio-ch2-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 2,
      "text": "Which hormone triggers ovulation?",
      "options": ["FSH", "LH", "Progesterone", "Oxytocin"],
      "answer": "LH",
      "tags": ["hormones"]
    },
    {
      "id": "ms-12-bio-ch2-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is spermatogenesis?",
      "answer": "Spermatogenesis is the process of formation of sperms from spermatogonial stem cells in the testes.",
      "tags": ["spermatogenesis"]
    },
    {
      "id": "ms-12-bio-ch2-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Explain the importance of the placenta.",
      "answer": "The placenta facilitates exchange of nutrients, gases, and waste products between mother and fetus and secretes essential hormones.",
      "tags": ["placenta"]
    },
    {
      "id": "ms-12-bio-ch2-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Describe the phases of the menstrual cycle.",
      "answer": `"The menstrual cycle has four phases:  
1. **Menstrual Phase** – Shedding of uterine lining.  
2. **Follicular Phase** – Follicle development and increase in estrogen.  
3. **Ovulation** – Release of ovum triggered by LH surge.  
4. **Luteal Phase** – Corpus luteum forms and secretes progesterone; if no fertilization occurs, cycle repeats."`,
      "tags": ["menstrual-cycle"]
    },
    {
      "id": "ms-12-bio-ch2-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain the process of embryonic development from zygote to blastocyst.",
      "answer": "After fertilization, the zygote divides by mitosis into a morula, then develops into a blastocyst. The blastocyst forms a trophoblast and inner cell mass and implants into the uterine wall for further development.",
      "tags": ["embryonic-development"]
    },
    {
      "id": "ms-12-bio-ch2-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Discuss assisted reproductive technologies (ART) such as IVF and ICSI.",
      "answer": "ART includes methods like IVF, where fertilization occurs outside the body, and ICSI, where a single sperm is injected into an ovum. These techniques help couples with infertility and ensure embryo development before implantation.",
      "tags": ["ART", "IVF", "ICSI"]
    }
  ]
}, {
  "id": "ms-12-bio-ch3",
  "chapterNumber": 3,
  "title": "Inheritance and Variation",
  "slug": "inheritance-and-variation",
  "description": "Study of Mendelian genetics, laws of inheritance, gene interactions, linkage, crossing over, chromosomal disorders, and variations in living organisms.",
  "topics": [
    "Mendel's Laws of Inheritance",
    "Monohybrid and Dihybrid Crosses",
    "Law of Segregation",
    "Law of Independent Assortment",
    "Incomplete Dominance",
    "Co-dominance",
    "Multiple Alleles",
    "Linkage and Crossing Over",
    "Chromosomal Disorders",
    "Types of Variation"
  ],
  "learningObjectives": [
    "Understand Mendel's experiments and laws of inheritance.",
    "Analyze monohybrid and dihybrid crosses.",
    "Differentiate between complete dominance, incomplete dominance, and co-dominance.",
    "Explain linkage, crossing over, and sex-linked inheritance.",
    "Identify chromosomal disorders and their genetic basis."
  ],
  "questions": [
    {
      "id": "ms-12-bio-ch3-q1",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Mendel is known as the father of:",
      "options": ["Ecology", "Genetics", "Evolution", "Taxonomy"],
      "answer": "Genetics",
      "tags": ["mendel"]
    },
    {
      "id": "ms-12-bio-ch3-q2",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "Define phenotype.",
      "answer": "Phenotype is the observable physical or physiological trait of an organism determined by genotype and environment.",
      "tags": ["phenotype"]
    },
    {
      "id": "ms-12-bio-ch3-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "State Mendel's Law of Segregation.",
      "answer": "The Law of Segregation states that alleles of a gene separate during gamete formation so each gamete carries only one allele.",
      "tags": ["law-of-segregation"]
    },
    {
      "id": "ms-12-bio-ch3-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is incomplete dominance? Give one example.",
      "answer": "Incomplete dominance occurs when neither allele is completely dominant, resulting in an intermediate phenotype. Example: Pink flowers in Mirabilis jalapa.",
      "tags": ["incomplete-dominance"]
    },
    {
      "id": "ms-12-bio-ch3-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 2,
      "text": "ABO blood group system shows:",
      "options": ["Multiple alleles", "Incomplete dominance", "Linkage", "Sex-linked inheritance"],
      "answer": "Multiple alleles",
      "tags": ["multiple-alleles"]
    },
    {
      "id": "ms-12-bio-ch3-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is crossing over?",
      "answer": "Crossing over is the exchange of genetic material between non-sister chromatids of homologous chromosomes during meiosis, leading to recombination.",
      "tags": ["crossing-over"]
    },
    {
      "id": "ms-12-bio-ch3-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Name two chromosomal disorders and state their chromosomal basis.",
      "answer": "Down syndrome – trisomy 21; Turner syndrome – monosomy X.",
      "tags": ["chromosomal-disorders"]
    },
    {
      "id": "ms-12-bio-ch3-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain Mendel’s dihybrid cross and the Law of Independent Assortment.",
      "answer": "Mendel crossed plants differing in two characters (e.g., yellow round × green wrinkled). The F2 generation showed a phenotypic ratio of 9:3:3:1. This demonstrated the Law of Independent Assortment, which states that alleles of different genes assort independently during gamete formation.",
      "tags": ["dihybrid-cross"]
    },
    {
      "id": "ms-12-bio-ch3-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Describe linkage and how it differs from independent assortment.",
      "answer": "Linkage is the tendency of genes located on the same chromosome to be inherited together. Unlike independent assortment, linked genes do not assort independently unless crossing over separates them. Linkage reduces recombination frequency.",
      "tags": ["linkage"]
    },
    {
      "id": "ms-12-bio-ch3-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Discuss the types of variation seen in organisms and their significance.",
      "answer": "Variations include somatic and germinal variations, continuous and discontinuous variations. They arise from mutations, recombination, and environmental factors. Variations allow natural selection, help species adapt, and contribute to evolution.",
      "tags": ["variation"]
    }
  ]
}, {
  "id": "ms-12-bio-ch4",
  "chapterNumber": 4,
  "title": "Molecular Basis of Inheritance",
  "slug": "molecular-basis-of-inheritance",
  "description": "Study of DNA structure, replication, transcription, translation, gene expression, genetic code, regulation of gene activity, mutations, and concepts of genomics and proteomics.",
  "topics": [
    "Discovery of DNA",
    "Structure of DNA and RNA",
    "DNA Replication",
    "Transcription",
    "Translation",
    "Genetic Code",
    "Gene Regulation (Operon Model)",
    "Mutations",
    "Genomics and Proteomics"
  ],
  "learningObjectives": [
    "Explain the structure and functions of DNA and RNA.",
    "Understand DNA replication and enzymes involved.",
    "Describe transcription and translation processes.",
    "Interpret the genetic code and protein synthesis.",
    "Understand gene regulation, mutations, and modern molecular biology applications."
  ],
  "questions": [
    {
      "id": "ms-12-bio-ch4-q1",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "DNA is made up of:",
      "options": ["Amino acids", "Nucleotides", "Monosaccharides", "Fatty acids"],
      "answer": "Nucleotides",
      "tags": ["dna-structure"]
    },
    {
      "id": "ms-12-bio-ch4-q2",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "Define a gene.",
      "answer": "A gene is a specific segment of DNA that codes for a particular protein or functional RNA.",
      "tags": ["gene"]
    },
    {
      "id": "ms-12-bio-ch4-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is semi-conservative DNA replication?",
      "answer": "Semi-conservative replication means each new DNA molecule consists of one parental strand and one newly synthesized strand.",
      "tags": ["replication"]
    },
    {
      "id": "ms-12-bio-ch4-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Differentiate between transcription and translation.",
      "answer": "Transcription is the synthesis of RNA from DNA template, whereas translation is the synthesis of protein from mRNA with the help of tRNA and ribosomes.",
      "tags": ["transcription", "translation"]
    },
    {
      "id": "ms-12-bio-ch4-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 2,
      "text": "Which codon is a start codon?",
      "options": ["UAG", "UGA", "AUG", "UAA"],
      "answer": "AUG",
      "tags": ["genetic-code"]
    },
    {
      "id": "ms-12-bio-ch4-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Explain the role of helicase enzyme in DNA replication.",
      "answer": "Helicase unwinds and separates the two DNA strands by breaking hydrogen bonds, creating the replication fork.",
      "tags": ["helicase"]
    },
    {
      "id": "ms-12-bio-ch4-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is a mutation? Give an example.",
      "answer": "A mutation is a sudden heritable change in DNA sequence. Example: Sickle-cell anemia caused by a point mutation in the β-globin gene.",
      "tags": ["mutation"]
    },
    {
      "id": "ms-12-bio-ch4-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Describe the process of transcription in detail.",
      "answer": `"Transcription involves:  
1. **Initiation** – RNA polymerase binds to promoter and unwinds DNA.  
2. **Elongation** – RNA nucleotides pair with complementary DNA bases forming mRNA.  
3. **Termination** – Polymerase reaches terminator sequence and releases mRNA.  
In eukaryotes, mRNA undergoes capping, polyadenylation, and splicing."`,
      "tags": ["transcription"]
    },
    {
      "id": "ms-12-bio-ch4-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain the lac operon model of gene regulation.",
      "answer": `"The lac operon in bacteria is regulated by lactose availability.  
- In absence of lactose, the repressor binds operator preventing transcription.  
- In presence of lactose, it binds repressor, inactivating it, allowing transcription of genes for lactose metabolism.  
This demonstrates inducible gene regulation."`,
      "tags": ["gene-regulation", "operon"]
    },
    {
      "id": "ms-12-bio-ch4-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Discuss the central dogma of molecular biology.",
      "answer": "The central dogma states that genetic information flows from DNA → RNA → Protein. DNA replicates, is transcribed into RNA, and RNA is translated into proteins, which determine phenotype. It explains gene expression at molecular level.",
      "tags": ["central-dogma"]
    }
  ]
}, {
  "id": "ms-12-bio-ch5",
  "chapterNumber": 5,
  "title": "Origin and Evolution of Life",
  "slug": "origin-and-evolution-of-life",
  "description": "Study of theories of origin of life, early earth conditions, chemical evolution, biological evolution, Darwinism, Lamarckism, Hardy-Weinberg equilibrium, and evidences of evolution.",
  "topics": [
    "Early Earth Conditions",
    "Chemical Evolution",
    "Miller-Urey Experiment",
    "Darwin's Theory of Natural Selection",
    "Lamarckism",
    "Modern Synthetic Theory",
    "Hardy-Weinberg Law",
    "Speciation",
    "Fossil Evidence",
    "Human Evolution"
  ],
  "learningObjectives": [
    "Understand early conditions on Earth and theories of origin of life.",
    "Explain chemical evolution and Miller-Urey's experiment.",
    "Differentiate between Lamarckism and Darwinism.",
    "Interpret Hardy-Weinberg equilibrium and factors affecting it.",
    "Recognize evidences of evolution and human evolutionary stages."
  ],
  "questions": [
    {
      "id": "ms-12-bio-ch5-q1",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Which scientist performed the experiment supporting chemical evolution?",
      "options": ["Darwin", "Mendel", "Miller and Urey", "Linnaeus"],
      "answer": "Miller and Urey",
      "tags": ["chemical-evolution"]
    },
    {
      "id": "ms-12-bio-ch5-q2",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "Define evolution.",
      "answer": "Evolution is the gradual change in the heritable characteristics of populations over generations.",
      "tags": ["evolution"]
    },
    {
      "id": "ms-12-bio-ch5-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "State any two evidences supporting evolution.",
      "answer": "Fossil records and homologous organs are strong evidences supporting evolution.",
      "tags": ["evidence"]
    },
    {
      "id": "ms-12-bio-ch5-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is natural selection according to Darwin?",
      "answer": "Natural selection is the process where organisms with favorable traits survive and reproduce, passing those traits to the next generation.",
      "tags": ["darwin"]
    },
    {
      "id": "ms-12-bio-ch5-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 2,
      "text": "Which of the following violates Hardy-Weinberg equilibrium?",
      "options": ["Random mating", "Large population size", "No mutation", "Migration"],
      "answer": "Migration",
      "tags": ["hardy-weinberg"]
    },
    {
      "id": "ms-12-bio-ch5-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Explain Lamarck’s theory with an example.",
      "answer": "Lamarck proposed that acquired characters are inherited. Example: Giraffes developed long necks because they stretched to reach leaves, and this trait was passed to offspring.",
      "tags": ["lamarck"]
    },
    {
      "id": "ms-12-bio-ch5-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is speciation?",
      "answer": "Speciation is the formation of new species through genetic divergence, often due to isolation and natural selection.",
      "tags": ["speciation"]
    },
    {
      "id": "ms-12-bio-ch5-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Describe the Miller-Urey experiment and its significance.",
      "answer": "Miller and Urey created an apparatus simulating early Earth conditions with gases like methane, ammonia, hydrogen, and water vapor. Electric sparks simulated lightning. After several days, organic molecules like amino acids formed. This supported chemical evolution and the idea that life originated from simple organic compounds.",
      "tags": ["miller-urey"]
    },
    {
      "id": "ms-12-bio-ch5-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain the Hardy-Weinberg equilibrium and factors affecting it.",
      "answer": "Hardy-Weinberg equilibrium states that allele frequencies remain constant in a population if conditions like random mating, no mutation, no migration, large population, and no selection are met. Factors disrupting equilibrium include mutation, migration, genetic drift, natural selection, and non-random mating.",
      "tags": ["population-genetics"]
    },
    {
      "id": "ms-12-bio-ch5-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Discuss the major stages in human evolution.",
      "answer": `"Human evolution includes:  
1. **Australopithecus** – bipedal, small brain.  
2. **Homo habilis** – tool user.  
3. **Homo erectus** – upright posture, fire use.  
4. **Neanderthals** – strong build, cultural development.  
5. **Homo sapiens** – modern humans with advanced intelligence and culture."`,
      "tags": ["human-evolution"]
    }
  ]
}, {
  "id": "ms-12-bio-ch6",
  "chapterNumber": 6,
  "title": "Plant Water Relation",
  "slug": "plant-water-relation",
  "description": "Study of water absorption, water potential, diffusion, osmosis, plasmolysis, transpiration, ascent of sap, and factors regulating water movement in plants.",
  "topics": [
    "Diffusion",
    "Osmosis",
    "Water Potential",
    "Plasmolysis",
    "Imbibition",
    "Absorption of Water",
    "Pathways of Water Movement",
    "Ascent of Sap",
    "Transpiration",
    "Factors Affecting Water Transport"
  ],
  "learningObjectives": [
    "Understand basic principles of water movement in plants.",
    "Explain osmosis, diffusion, imbibition, and water potential.",
    "Describe mechanisms of absorption and conduction of water.",
    "Understand transpiration and its significance.",
    "Explain ascent of sap and forces involved in water transport."
  ],
  "questions": [
    {
      "id": "ms-12-bio-ch6-q1",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Movement of molecules from higher concentration to lower concentration is called:",
      "options": ["Osmosis", "Diffusion", "Imbibition", "Plasmolysis"],
      "answer": "Diffusion",
      "tags": ["diffusion"]
    },
    {
      "id": "ms-12-bio-ch6-q2",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "Define osmosis.",
      "answer": "Osmosis is the movement of water molecules from a region of higher water potential to lower water potential across a semipermeable membrane.",
      "tags": ["osmosis"]
    },
    {
      "id": "ms-12-bio-ch6-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is water potential?",
      "answer": "Water potential (Ψ) is the potential energy of water, determining the direction of its movement. Pure water has the highest water potential (Ψ = 0).",
      "tags": ["water-potential"]
    },
    {
      "id": "ms-12-bio-ch6-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Explain plasmolysis with an example.",
      "answer": "Plasmolysis is the shrinkage of the cytoplasm away from the cell wall when a cell is placed in a hypertonic solution. Example: Onion peel cells in concentrated salt solution.",
      "tags": ["plasmolysis"]
    },
    {
      "id": "ms-12-bio-ch6-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 2,
      "text": "Which tissue is mainly responsible for upward conduction of water?",
      "options": ["Phloem", "Xylem", "Parenchyma", "Collenchyma"],
      "answer": "Xylem",
      "tags": ["xylem"]
    },
    {
      "id": "ms-12-bio-ch6-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is transpiration?",
      "answer": "Transpiration is the loss of water in the form of vapor from aerial parts of plants, mainly through stomata.",
      "tags": ["transpiration"]
    },
    {
      "id": "ms-12-bio-ch6-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Explain imbibition.",
      "answer": "Imbibition is the adsorption of water by hydrophilic substances like cellulose and seeds, causing them to swell.",
      "tags": ["imbibition"]
    },
    {
      "id": "ms-12-bio-ch6-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Describe the cohesion-tension theory of ascent of sap.",
      "answer": "The cohesion-tension theory states that water molecules stick together by cohesion and adhere to xylem vessels. Transpiration pull creates negative pressure, which pulls water upward through the plant from roots to leaves.",
      "tags": ["ascent-of-sap"]
    },
    {
      "id": "ms-12-bio-ch6-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain the apoplast and symplast pathways of water movement.",
      "answer": "In the apoplast pathway, water moves through cell walls and intercellular spaces. In the symplast pathway, water moves from cell to cell through the cytoplasm via plasmodesmata. The endodermis forces water into the symplast before entering the xylem.",
      "tags": ["water-pathways"]
    },
    {
      "id": "ms-12-bio-ch6-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Discuss the significance of transpiration in plants.",
      "answer": "Transpiration helps in cooling the plant, maintaining turgor, absorption and upward movement of water, mineral transport, and creating transpiration pull for ascent of sap.",
      "tags": ["transpiration-significance"]
    }
  ]
}, {
  "id": "ms-12-bio-ch7",
  "chapterNumber": 7,
  "title": "Plant Growth and Mineral Nutrition",
  "slug": "plant-growth-and-mineral-nutrition",
  "description": "Study of plant growth phases, growth regulators, mineral absorption, essential elements, deficiency symptoms, nitrogen cycle, and role of macronutrients and micronutrients.",
  "topics": [
    "Phases of Growth",
    "Growth Curve",
    "Plant Growth Regulators",
    "Essential Mineral Elements",
    "Macronutrients and Micronutrients",
    "Mineral Absorption",
    "Nitrogen Metabolism and Nitrogen Cycle",
    "Deficiency Symptoms in Plants"
  ],
  "learningObjectives": [
    "Understand phases and characteristics of plant growth.",
    "Identify essential mineral nutrients and their functions.",
    "Explain mechanisms of mineral absorption.",
    "Describe nitrogen cycle and nitrogen fixation.",
    "Recognize deficiency symptoms of various nutrients."
  ],
  "questions": [
    {
      "id": "ms-12-bio-ch7-q1",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Which of the following is a micronutrient?",
      "options": ["Nitrogen", "Potassium", "Iron", "Calcium"],
      "answer": "Iron",
      "tags": ["micronutrients"]
    },
    {
      "id": "ms-12-bio-ch7-q2",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "Define meristematic growth.",
      "answer": "Meristematic growth refers to growth due to continuous cell division in meristematic tissues.",
      "tags": ["growth"]
    },
    {
      "id": "ms-12-bio-ch7-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Name any two plant growth regulators and state their functions.",
      "answer": "Auxins promote cell elongation; cytokinins promote cell division.",
      "tags": ["growth-regulators"]
    },
    {
      "id": "ms-12-bio-ch7-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is the significance of nitrogen in plant nutrition?",
      "answer": "Nitrogen is essential for synthesis of proteins, nucleic acids, chlorophyll, and enzymes.",
      "tags": ["nitrogen"]
    },
    {
      "id": "ms-12-bio-ch7-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 2,
      "text": "Chlorosis is caused due to deficiency of:",
      "options": ["Calcium", "Iron", "Sulphur", "Manganese"],
      "answer": "Iron",
      "tags": ["chlorosis"]
    },
    {
      "id": "ms-12-bio-ch7-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Differentiate between macronutrients and micronutrients.",
      "answer": "Macronutrients are required in large amounts (e.g., N, P, K), whereas micronutrients are needed in trace amounts (e.g., Fe, Zn, Cu).",
      "tags": ["nutrients"]
    },
    {
      "id": "ms-12-bio-ch7-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is biological nitrogen fixation?",
      "answer": "Biological nitrogen fixation is conversion of atmospheric nitrogen into ammonia by microorganisms like Rhizobium.",
      "tags": ["nitrogen-fixation"]
    },
    {
      "id": "ms-12-bio-ch7-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Describe the sigmoid (S-shaped) growth curve in plants.",
      "answer": "The sigmoid growth curve consists of lag phase (slow growth), log phase (rapid exponential growth), and stationary phase (growth slows due to limited resources). It represents the typical growth pattern of plant tissues.",
      "tags": ["growth-curve"]
    },
    {
      "id": "ms-12-bio-ch7-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain passive and active absorption of minerals by plants.",
      "answer": "Passive absorption occurs without energy expenditure through diffusion. Active absorption requires ATP and involves carrier proteins moving ions against concentration gradients.",
      "tags": ["mineral-absorption"]
    },
    {
      "id": "ms-12-bio-ch7-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Discuss the nitrogen cycle and its significance in plant growth.",
      "answer": "The nitrogen cycle includes nitrogen fixation, ammonification, nitrification, and denitrification. It converts atmospheric nitrogen into usable forms like nitrates. This maintains soil fertility and supports plant growth.",
      "tags": ["nitrogen-cycle"]
    }
  ]
}, {
  "id": "ms-12-bio-ch8",
  "chapterNumber": 8,
  "title": "Respiration and Circulation",
  "slug": "respiration-and-circulation",
  "description": "Study of respiratory mechanisms in humans, exchange and transport of gases, structure and working of the heart, cardiac cycle, blood vessels, and regulation of circulation.",
  "topics": [
    "Human Respiratory System",
    "Mechanism of Breathing",
    "Exchange of Gases",
    "Transport of Oxygen and Carbon Dioxide",
    "Circulatory System",
    "Structure and Function of Heart",
    "Cardiac Cycle",
    "Blood Pressure",
    "Double Circulation"
  ],
  "learningObjectives": [
    "Understand the structure and mechanism of human respiration.",
    "Explain gaseous exchange at lungs and tissues.",
    "Describe oxygen and carbon dioxide transport in blood.",
    "Understand structure of the heart and working of cardiac cycle.",
    "Explain blood circulation routes and blood pressure regulation."
  ],
  "questions": [
    {
      "id": "ms-12-bio-ch8-q1",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Which pigment is responsible for transport of oxygen in humans?",
      "options": ["Chlorophyll", "Hemoglobin", "Myosin", "Keratin"],
      "answer": "Hemoglobin",
      "tags": ["oxygen-transport"]
    },
    {
      "id": "ms-12-bio-ch8-q2",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "Define tidal volume.",
      "answer": "Tidal volume is the amount of air inhaled or exhaled during normal quiet breathing, approximately 500 mL.",
      "tags": ["tidal-volume"]
    },
    {
      "id": "ms-12-bio-ch8-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is double circulation?",
      "answer": "Double circulation refers to the separate pulmonary and systemic circuits in which blood passes through the heart twice during one complete circulation.",
      "tags": ["double-circulation"]
    },
    {
      "id": "ms-12-bio-ch8-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Name the stages of the cardiac cycle.",
      "answer": "Atrial systole, ventricular systole, and joint diastole.",
      "tags": ["cardiac-cycle"]
    },
    {
      "id": "ms-12-bio-ch8-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 2,
      "text": "Which blood vessel carries oxygenated blood from lungs to heart?",
      "options": ["Pulmonary artery", "Pulmonary vein", "Aorta", "Vena cava"],
      "answer": "Pulmonary vein",
      "tags": ["blood-vessels"]
    },
    {
      "id": "ms-12-bio-ch8-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Explain Bohr effect.",
      "answer": "Bohr effect refers to the decrease in hemoglobin's affinity for oxygen due to increased CO₂ concentration or lowered pH, enhancing oxygen release in tissues.",
      "tags": ["bohr-effect"]
    },
    {
      "id": "ms-12-bio-ch8-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is systolic and diastolic blood pressure?",
      "answer": "Systolic pressure is the pressure in arteries during ventricular contraction; diastolic pressure is the pressure during ventricular relaxation.",
      "tags": ["blood-pressure"]
    },
    {
      "id": "ms-12-bio-ch8-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Describe the mechanism of breathing in humans.",
      "answer": `"Breathing involves inspiration and expiration.  
During inspiration, diaphragm contracts and flattens, external intercostal muscles raise ribs, increasing thoracic volume, causing air to flow into lungs.  
During expiration, diaphragm relaxes, ribs move down, thoracic volume decreases, forcing air out."`,
      "tags": ["breathing"]
    },
    {
      "id": "ms-12-bio-ch8-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain the exchange of gases at alveoli and tissues.",
      "answer": `"At alveoli: O₂ diffuses from alveolar air to blood due to higher partial pressure, while CO₂ diffuses from blood to alveoli.  
At tissues: O₂ diffuses from blood to cells and CO₂ diffuses from cells to blood due to concentration gradients."`,
      "tags": ["gas-exchange"]
    },
    {
      "id": "ms-12-bio-ch8-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Describe the structure of the human heart and its working.",
      "answer": "The heart has four chambers: right and left atria, right and left ventricles. Valves ensure one-way flow. Deoxygenated blood enters right atrium → right ventricle → lungs. Oxygenated blood from lungs enters left atrium → left ventricle → pumped to body. Heart functions through rhythmic contraction and relaxation known as the cardiac cycle.",
      "tags": ["heart-structure", "cardiac-cycle"]
    }
  ]
}, {
  "id": "ms-12-bio-ch9",
  "chapterNumber": 9,
  "title": "Control and Coordination",
  "slug": "control-and-coordination",
  "description": "Study of the nervous system, endocrine system, neurons, synapses, reflex action, hormones, and regulation of physiological processes in animals.",
  "topics": [
    "Structure and Functions of Neurons",
    "Transmission of Nerve Impulse",
    "Central and Peripheral Nervous System",
    "Autonomic Nervous System",
    "Reflex Action and Reflex Arc",
    "Endocrine Glands and Hormones",
    "Feedback Mechanisms",
    "Coordination Between Nervous and Endocrine Systems"
  ],
  "learningObjectives": [
    "Understand the structure of neurons and the mechanism of nerve impulse transmission.",
    "Differentiate between CNS, PNS, and ANS.",
    "Explain reflex action and reflex arc.",
    "Describe endocrine glands and hormone functions.",
    "Understand feedback systems and coordination between nervous and endocrine systems."
  ],
  "questions": [
    {
      "id": "ms-12-bio-ch9-q1",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "The structural and functional unit of the nervous system is:",
      "options": ["Axon", "Neuron", "Dendrite", "Synapse"],
      "answer": "Neuron",
      "tags": ["neuron"]
    },
    {
      "id": "ms-12-bio-ch9-q2",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "What is a synapse?",
      "answer": "A synapse is a junction between two neurons where nerve impulses are transmitted chemically or electrically.",
      "tags": ["synapse"]
    },
    {
      "id": "ms-12-bio-ch9-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Explain the term reflex action.",
      "answer": "Reflex action is an automatic, immediate response to a stimulus, controlled by the spinal cord without involvement of the brain.",
      "tags": ["reflex"]
    },
    {
      "id": "ms-12-bio-ch9-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "State any two functions of the autonomic nervous system.",
      "answer": "The autonomic nervous system regulates involuntary activities such as heartbeat, digestion, glandular secretion, and smooth muscle contraction.",
      "tags": ["ans"]
    },
    {
      "id": "ms-12-bio-ch9-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 2,
      "text": "Which gland is known as the master gland?",
      "options": ["Thyroid", "Adrenal", "Pituitary", "Pancreas"],
      "answer": "Pituitary",
      "tags": ["pituitary"]
    },
    {
      "id": "ms-12-bio-ch9-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is the role of myelin sheath in neurons?",
      "answer": "The myelin sheath insulates axons, increases speed of nerve impulse conduction, and prevents signal loss.",
      "tags": ["myelin"]
    },
    {
      "id": "ms-12-bio-ch9-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Name two hormones secreted by the adrenal gland and state their functions.",
      "answer": "Adrenaline – prepares body for 'fight or flight'; Aldosterone – regulates sodium and potassium balance.",
      "tags": ["hormones"]
    },
    {
      "id": "ms-12-bio-ch9-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Describe the mechanism of nerve impulse transmission across a synapse.",
      "answer": "When an impulse reaches the axon terminal, calcium ions enter, causing synaptic vesicles to release neurotransmitters into the synaptic cleft. These bind to receptors on the postsynaptic membrane, generating a new impulse. Neurotransmitters are then broken down or reabsorbed.",
      "tags": ["nerve-impulse"]
    },
    {
      "id": "ms-12-bio-ch9-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain the endocrine system with examples of glands and hormones they secrete.",
      "answer": "The endocrine system consists of glands that secrete hormones directly into the bloodstream. Examples: Thyroid secretes thyroxine; Pancreas secretes insulin and glucagon; Pituitary secretes growth hormone; Adrenal secretes adrenaline and aldosterone.",
      "tags": ["endocrine-system"]
    },
    {
      "id": "ms-12-bio-ch9-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Discuss coordination between the nervous and endocrine systems with an example.",
      "answer": "Both systems work together to maintain homeostasis. Example: Stress triggers hypothalamus, which stimulates adrenal glands via neural signals to release adrenaline, increasing heart rate and respiration. This illustrates neuroendocrine coordination.",
      "tags": ["coordination"]
    }
  ]
}, {
  "id": "ms-12-bio-ch10",
  "chapterNumber": 10,
  "title": "Human Health and Diseases",
  "slug": "human-health-and-diseases",
  "description": "Study of infectious and non-infectious diseases, immunity, vaccines, immune response, AIDS, cancer, addiction, and strategies for disease prevention.",
  "topics": [
    "Concept of Health and Disease",
    "Types of Diseases",
    "Pathogens and Transmission",
    "Immune System",
    "Innate and Acquired Immunity",
    "Vaccination and Immunization",
    "AIDS and HIV",
    "Cancer",
    "Drug and Alcohol Addiction"
  ],
  "learningObjectives": [
    "Differentiate between infectious and non-infectious diseases.",
    "Understand the structure and functioning of the immune system.",
    "Explain types of immunity and principles of vaccination.",
    "Recognize major diseases such as AIDS, cancer, and their causes.",
    "Understand causes and consequences of drug and alcohol abuse."
  ],
  "questions": [
    {
      "id": "ms-12-bio-ch10-q1",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "The pathogen that causes tuberculosis is:",
      "options": ["HIV", "Plasmodium", "Mycobacterium tuberculosis", "Salmonella typhi"],
      "answer": "Mycobacterium tuberculosis",
      "tags": ["diseases"]
    },
    {
      "id": "ms-12-bio-ch10-q2",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "Define immunity.",
      "answer": "Immunity is the ability of the body to resist and fight infections through defense mechanisms.",
      "tags": ["immunity"]
    },
    {
      "id": "ms-12-bio-ch10-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is the difference between innate and acquired immunity?",
      "answer": "Innate immunity is present from birth and provides immediate defense, while acquired immunity develops after exposure to pathogens and is highly specific.",
      "tags": ["innate-vs-acquired"]
    },
    {
      "id": "ms-12-bio-ch10-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Name any two sexually transmitted diseases (STDs).",
      "answer": "AIDS and syphilis are two sexually transmitted diseases.",
      "tags": ["std"]
    },
    {
      "id": "ms-12-bio-ch10-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 2,
      "text": "Which cells produce antibodies?",
      "options": ["T-lymphocytes", "B-lymphocytes", "Macrophages", "Neutrophils"],
      "answer": "B-lymphocytes",
      "tags": ["antibodies"]
    },
    {
      "id": "ms-12-bio-ch10-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Explain the term vaccination.",
      "answer": "Vaccination is the process of administering weakened or inactive pathogens to stimulate immunity without causing disease.",
      "tags": ["vaccination"]
    },
    {
      "id": "ms-12-bio-ch10-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is AIDS? How is it transmitted?",
      "answer": "AIDS is Acquired Immunodeficiency Syndrome caused by HIV. It is transmitted through unprotected sex, contaminated needles, infected blood, and mother-to-child transmission.",
      "tags": ["aids"]
    },
    {
      "id": "ms-12-bio-ch10-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Describe the structure of the human immune system.",
      "answer": "The immune system consists of lymphoid organs such as thymus, spleen, lymph nodes, bone marrow, and circulating immune cells like T-cells, B-cells, macrophages, and antigen-presenting cells. These organs and cells coordinate to detect, attack, and eliminate pathogens.",
      "tags": ["immune-system"]
    },
    {
      "id": "ms-12-bio-ch10-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain the causes and symptoms of cancer.",
      "answer": "Cancer is caused by uncontrolled cell division due to mutations, carcinogens, radiation, viruses, or genetic factors. Symptoms include formation of tumors, weight loss, fatigue, abnormal bleeding, and organ dysfunction.",
      "tags": ["cancer"]
    },
    {
      "id": "ms-12-bio-ch10-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Discuss the effects of drug and alcohol addiction on human health.",
      "answer": "Drug and alcohol addiction affect the nervous system, cause liver damage, impair judgment, weaken immunity, lead to mental disorders, social problems, accidents, and long-term physiological damage.",
      "tags": ["addiction"]
    }
  ]
}, {
  "id": "ms-12-bio-ch11",
  "chapterNumber": 11,
  "title": "Enhancement of Food Production",
  "slug": "enhancement-of-food-production",
  "description": "Study of crop improvement, plant breeding, animal husbandry, dairy and poultry management, fisheries, biofortification, tissue culture, and modern agricultural technologies.",
  "topics": [
    "Plant Breeding",
    "Hybridization",
    "Mutation Breeding",
    "Tissue Culture and Micropropagation",
    "Animal Husbandry",
    "Dairy and Poultry Management",
    "Fisheries and Aquaculture",
    "Biofortification",
    "Single Cell Protein (SCP)",
    "Apiculture"
  ],
  "learningObjectives": [
    "Understand methods of improving crop yield and quality.",
    "Explain plant breeding techniques like hybridization and mutation breeding.",
    "Recognize the importance of animal husbandry and fisheries.",
    "Understand biofortification and its role in nutrition.",
    "Explain tissue culture and modern biotechnological tools in food production."
  ],
  "questions": [
    {
      "id": "ms-12-bio-ch11-q1",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Single-cell protein (SCP) is obtained from:",
      "options": ["Algae", "Bacteria and fungi", "Cereals", "Animals"],
      "answer": "Bacteria and fungi",
      "tags": ["scp"]
    },
    {
      "id": "ms-12-bio-ch11-q2",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "Define plant breeding.",
      "answer": "Plant breeding is the purposeful manipulation of plant species to create desired varieties with improved yield, quality, and resistance.",
      "tags": ["plant-breeding"]
    },
    {
      "id": "ms-12-bio-ch11-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is biofortification?",
      "answer": "Biofortification is the process of increasing the nutritional value of crops through breeding, genetic engineering, or agronomic practices.",
      "tags": ["biofortification"]
    },
    {
      "id": "ms-12-bio-ch11-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Name two applications of tissue culture in agriculture.",
      "answer": "Micropropagation for mass production of disease-free plants and production of somaclones with desirable traits.",
      "tags": ["tissue-culture"]
    },
    {
      "id": "ms-12-bio-ch11-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 2,
      "text": "Which of the following is a high-yielding variety (HYV) crop?",
      "options": ["IR-8 rice", "Wild rice", "Traditional wheat", "Basmati"],
      "answer": "IR-8 rice",
      "tags": ["hyv"]
    },
    {
      "id": "ms-12-bio-ch11-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is animal husbandry?",
      "answer": "Animal husbandry is the science of breeding, feeding, and caring for domestic animals to obtain useful products like milk, eggs, meat, and wool.",
      "tags": ["animal-husbandry"]
    },
    {
      "id": "ms-12-bio-ch11-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Explain the importance of fishery development.",
      "answer": "Fishery provides protein-rich food, employment, foreign exchange, and supports rural economies through aquaculture and marine fishing.",
      "tags": ["fisheries"]
    },
    {
      "id": "ms-12-bio-ch11-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Describe the steps involved in hybridization in plants.",
      "answer": "Steps include selection of parents, emasculation, bagging, pollination, tagging, and collection of hybrid seeds. The resulting hybrids show improved traits such as yield, disease resistance, and stress tolerance.",
      "tags": ["hybridization"]
    },
    {
      "id": "ms-12-bio-ch11-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain mutation breeding and give an example.",
      "answer": "Mutation breeding involves exposing seeds or tissues to chemicals or radiation to induce mutations, followed by selection of desirable mutants. Example: Sharbati Sonora wheat variety developed through gamma radiation.",
      "tags": ["mutation-breeding"]
    },
    {
      "id": "ms-12-bio-ch11-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Discuss the role of biotechnology in enhancing food production.",
      "answer": "Biotechnology helps increase yield and nutritional value through genetic modification, tissue culture, microbial fermentation (SCP), pest-resistant GM crops, improved varieties through marker-assisted selection, and biofertilizers improving soil fertility.",
      "tags": ["biotechnology"]
    }
  ]
}, {
  "id": "ms-12-bio-ch12",
  "chapterNumber": 12,
  "title": "Biotechnology",
  "slug": "biotechnology",
  "description": "Study of principles, tools, and applications of biotechnology including recombinant DNA technology, plasmids, restriction enzymes, PCR, transgenic organisms, and ethical issues.",
  "topics": [
    "Principles of Biotechnology",
    "Restriction Enzymes",
    "Plasmids and Vectors",
    "Recombinant DNA Technology",
    "PCR and Gel Electrophoresis",
    "Cloning",
    "Applications in Agriculture and Medicine",
    "GM Crops",
    "Ethical Issues and Biosafety"
  ],
  "learningObjectives": [
    "Understand the principles and steps of recombinant DNA technology.",
    "Explain the role of restriction enzymes and vectors.",
    "Describe PCR, cloning, and electrophoresis techniques.",
    "Explore applications of biotechnology in various fields.",
    "Understand ethical concerns and biosafety measures."
  ],
  "questions": [
    {
      "id": "ms-12-bio-ch12-q1",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "The enzyme used to cut DNA at specific sites is called:",
      "options": ["Ligase", "Polymerase", "Restriction endonuclease", "Helicase"],
      "answer": "Restriction endonuclease",
      "tags": ["restriction-enzymes"]
    },
    {
      "id": "ms-12-bio-ch12-q2",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "Define biotechnology.",
      "answer": "Biotechnology is the use of living organisms, cells, or biological systems to develop products or processes for human welfare.",
      "tags": ["definition"]
    },
    {
      "id": "ms-12-bio-ch12-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is a cloning vector? Give an example.",
      "answer": "A cloning vector is a DNA molecule that carries foreign DNA into a host cell for replication. Example: Plasmid pBR322.",
      "tags": ["vectors"]
    },
    {
      "id": "ms-12-bio-ch12-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Explain the function of DNA ligase.",
      "answer": "DNA ligase joins DNA fragments by forming phosphodiester bonds, sealing nicks in the sugar-phosphate backbone.",
      "tags": ["ligase"]
    },
    {
      "id": "ms-12-bio-ch12-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 2,
      "text": "Which technique is used to amplify DNA fragments?",
      "options": ["PCR", "Gel electrophoresis", "Blotting", "Centrifugation"],
      "answer": "PCR",
      "tags": ["pcr"]
    },
    {
      "id": "ms-12-bio-ch12-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is recombinant DNA?",
      "answer": "Recombinant DNA is artificially created DNA formed by combining DNA from two different organisms or sources.",
      "tags": ["rdna"]
    },
    {
      "id": "ms-12-bio-ch12-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Name two applications of biotechnology in medicine.",
      "answer": "Production of insulin using recombinant DNA technology and development of vaccines.",
      "tags": ["applications"]
    },
    {
      "id": "ms-12-bio-ch12-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain the steps involved in recombinant DNA technology.",
      "answer": `"Steps include:  
1. Isolation of DNA.  
2. Cutting DNA with restriction enzymes.  
3. Insertion into a cloning vector.  
4. Introduction of recombinant DNA into host cells.  
5. Selection of transformed cells.  
6. Expression of the inserted gene to obtain the desired product."`,
      "tags": ["rdna-steps"]
    },
    {
      "id": "ms-12-bio-ch12-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Describe the process and significance of gel electrophoresis.",
      "answer": "Gel electrophoresis separates DNA fragments based on size. DNA samples are loaded into agarose gel and subjected to electric current. Smaller fragments move faster towards the positive electrode. It is used in DNA fingerprinting, PCR analysis, and gene cloning.",
      "tags": ["electrophoresis"]
    },
    {
      "id": "ms-12-bio-ch12-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Discuss ethical issues related to genetic engineering and GM crops.",
      "answer": "Concerns include ecological risks, gene transfer to wild species, loss of biodiversity, food safety issues, labeling requirements, and ethical debate over manipulating life forms. Biosafety regulations are necessary to prevent misuse.",
      "tags": ["gmo-ethics"]
    }
  ]
}, {
  "id": "ms-12-bio-ch13",
  "chapterNumber": 13,
  "title": "Organisms and Populations",
  "slug": "organisms-and-populations",
  "description": "Study of ecological levels, abiotic factors, adaptations, population attributes, population interactions, and growth models.",
  "topics": [
    "Levels of Ecological Organization",
    "Abiotic Factors (Temperature, Water, Light, Soil)",
    "Adaptations in Organisms",
    "Population Attributes",
    "Natality and Mortality",
    "Population Age Pyramids",
    "Population Growth Models",
    "Population Interactions (Competition, Predation, Parasitism, Commensalism, Mutualism)"
  ],
  "learningObjectives": [
    "Understand how organisms interact with their environment.",
    "Explain adaptations to various abiotic factors.",
    "Analyze population attributes such as size, density, and age structure.",
    "Differentiate population interactions and their ecological significance.",
    "Interpret population growth curves and survivorship patterns."
  ],
  "questions": [
    {
      "id": "ms-12-bio-ch13-q1",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "The study of interaction between organisms and their environment is called:",
      "options": ["Taxonomy", "Ecology", "Genetics", "Evolution"],
      "answer": "Ecology",
      "tags": ["ecology"]
    },
    {
      "id": "ms-12-bio-ch13-q2",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "Define habitat.",
      "answer": "Habitat is the natural living place of an organism where it obtains food, shelter, and reproduces.",
      "tags": ["habitat"]
    },
    {
      "id": "ms-12-bio-ch13-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is acclimatization? Give an example.",
      "answer": "Acclimatization is the reversible adjustment of an organism to a change in its environment. Example: Humans adjusting to high altitudes.",
      "tags": ["acclimatization"]
    },
    {
      "id": "ms-12-bio-ch13-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Differentiate between natality and mortality.",
      "answer": "Natality is the birth rate of a population, whereas mortality is the death rate.",
      "tags": ["population"]
    },
    {
      "id": "ms-12-bio-ch13-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 2,
      "text": "The logistic growth curve is:",
      "options": ["J-shaped", "S-shaped", "Linear", "Exponential"],
      "answer": "S-shaped",
      "tags": ["growth"]
    },
    {
      "id": "ms-12-bio-ch13-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Explain mutualism with an example.",
      "answer": "Mutualism is an interaction where both species benefit. Example: Lichens consist of algae and fungi living together.",
      "tags": ["mutualism"]
    },
    {
      "id": "ms-12-bio-ch13-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What are age pyramids? Name their types.",
      "answer": "Age pyramids show the age distribution of a population. Types: Expanding, stable, and declining.",
      "tags": ["age-pyramid"]
    },
    {
      "id": "ms-12-bio-ch13-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Describe the exponential growth model.",
      "answer": "In exponential growth, resources are unlimited and population grows at its maximum rate, forming a J-shaped curve. The growth rate is proportional to the existing population, represented by the equation dN/dt = rN.",
      "tags": ["exponential-growth"]
    },
    {
      "id": "ms-12-bio-ch13-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain predation and its ecological importance.",
      "answer": "Predation is the interaction where one organism (predator) kills and consumes another (prey). It maintains population balance, drives evolution through natural selection, and regulates energy flow in ecosystems.",
      "tags": ["predation"]
    },
    {
      "id": "ms-12-bio-ch13-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Discuss adaptations of organisms to extreme environments.",
      "answer": "Adaptations include morphological (thick fur in polar animals), physiological (heat tolerance in desert plants), and behavioral (burrowing in rodents). These enable survival under extreme temperature, salinity, pressure, or light conditions.",
      "tags": ["adaptations"]
    }
  ]
}, {
  "id": "ms-12-bio-ch14",
  "chapterNumber": 14,
  "title": "Ecosystems and Energy Flow",
  "slug": "ecosystems-and-energy-flow",
  "description": "Study of ecosystem structure, biotic and abiotic components, food chains and food webs, ecological pyramids, productivity, energy flow, and nutrient cycles.",
  "topics": [
    "Components of Ecosystems",
    "Food Chains and Food Webs",
    "Ecological Pyramids",
    "Energy Flow in Ecosystems",
    "Trophic Levels",
    "GPP, NPP, Productivity",
    "Biogeochemical Cycles (Water, Carbon, Nitrogen)",
    "Decomposition"
  ],
  "learningObjectives": [
    "Understand the structure and components of ecosystems.",
    "Differentiate between food chains and food webs.",
    "Interpret ecological pyramids and energy flow models.",
    "Explain primary and secondary productivity.",
    "Understand the importance of nutrient cycles."
  ],
  "questions": [
    {
      "id": "ms-12-bio-ch14-q1",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "The primary source of energy in an ecosystem is:",
      "options": ["Moon", "Soil", "Sunlight", "Wind"],
      "answer": "Sunlight",
      "tags": ["energy"]
    },
    {
      "id": "ms-12-bio-ch14-q2",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "Define ecosystem.",
      "answer": "An ecosystem is a functional unit consisting of living organisms interacting with each other and with the physical environment.",
      "tags": ["ecosystem"]
    },
    {
      "id": "ms-12-bio-ch14-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is a food web?",
      "answer": "A food web is a network of interconnected food chains that shows multiple feeding relationships in an ecosystem.",
      "tags": ["food-web"]
    },
    {
      "id": "ms-12-bio-ch14-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Explain Gross Primary Productivity (GPP).",
      "answer": "GPP is the total amount of energy captured by producers through photosynthesis in a given time.",
      "tags": ["gpp"]
    },
    {
      "id": "ms-12-bio-ch14-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 2,
      "text": "Ecological pyramids represent:",
      "options": ["Only number of organisms", "Only biomass", "Only energy", "Number, biomass, or energy"],
      "answer": "Number, biomass, or energy",
      "tags": ["ecological-pyramids"]
    },
    {
      "id": "ms-12-bio-ch14-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is decomposition?",
      "answer": "Decomposition is the breakdown of organic matter by microorganisms, releasing nutrients back into the environment.",
      "tags": ["decomposition"]
    },
    {
      "id": "ms-12-bio-ch14-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "State the 10% law of energy transfer.",
      "answer": "According to the 10% law, only about 10% of energy is transferred from one trophic level to the next; the rest is lost as heat.",
      "tags": ["energy-flow"]
    },
    {
      "id": "ms-12-bio-ch14-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Describe the nitrogen cycle in an ecosystem.",
      "answer": "The nitrogen cycle includes nitrogen fixation (conversion of N₂ to ammonia), nitrification (ammonia to nitrates), assimilation by plants, ammonification (decomposition releasing ammonia), and denitrification (conversion of nitrates back to N₂). This cycle maintains soil fertility.",
      "tags": ["nitrogen-cycle"]
    },
    {
      "id": "ms-12-bio-ch14-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain the flow of energy in an ecosystem.",
      "answer": "Energy flows unidirectionally from the sun to producers and then to consumers and decomposers. At each trophic level, most energy is lost as heat, making the energy pyramid always upright.",
      "tags": ["energy-flow"]
    },
    {
      "id": "ms-12-bio-ch14-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Discuss differences between food chains and food webs.",
      "answer": "A food chain shows a single linear pathway of energy flow. A food web consists of multiple interconnected chains, offering greater stability to the ecosystem by providing alternative feeding routes.",
      "tags": ["food-chain-vs-web"]
    }
  ]
}, {
  "id": "ms-12-bio-ch15",
  "chapterNumber": 15,
  "title": "Biodiversity, Conservation and Environmental Issues",
  "slug": "biodiversity-conservation-environmental-issues",
  "description": "Study of biodiversity levels, importance of biodiversity, threats to biodiversity, conservation strategies, pollution, global warming, ozone depletion, and sustainable development.",
  "topics": [
    "Levels of Biodiversity",
    "Importance of Biodiversity",
    "Threats to Biodiversity",
    "Endangered and Endemic Species",
    "In-situ and Ex-situ Conservation",
    "Wildlife Protection and Policies",
    "Environmental Pollution",
    "Global Warming and Climate Change",
    "Ozone Depletion",
    "Sustainable Development"
  ],
  "learningObjectives": [
    "Understand biodiversity at genetic, species, and ecosystem levels.",
    "Recognize the importance and value of biodiversity.",
    "Identify major threats such as habitat loss, poaching, pollution, and climate change.",
    "Differentiate between in-situ and ex-situ conservation.",
    "Understand environmental issues and the need for sustainable development."
  ],
  "questions": [
    {
      "id": "ms-12-bio-ch15-q1",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Biosphere reserves, national parks, and wildlife sanctuaries are examples of:",
      "options": ["Ex-situ conservation", "In-situ conservation", "Cryopreservation", "Captive breeding"],
      "answer": "In-situ conservation",
      "tags": ["conservation"]
    },
    {
      "id": "ms-12-bio-ch15-q2",
      "type": "short",
      "difficulty": "easy",
      "marks": 2,
      "text": "Define biodiversity.",
      "answer": "Biodiversity refers to the variety of life forms at genetic, species, and ecosystem levels.",
      "tags": ["biodiversity"]
    },
    {
      "id": "ms-12-bio-ch15-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "State two major threats to biodiversity.",
      "answer": "Habitat loss and fragmentation, and poaching of wildlife are major threats to biodiversity.",
      "tags": ["threats"]
    },
    {
      "id": "ms-12-bio-ch15-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is global warming? Mention one cause.",
      "answer": "Global warming is the rise in Earth's average temperature due to increased greenhouse gases such as CO₂.",
      "tags": ["global-warming"]
    },
    {
      "id": "ms-12-bio-ch15-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 2,
      "text": "Ozone depletion is mainly caused by:",
      "options": ["CO₂", "CFCs", "SO₂", "CH₄"],
      "answer": "CFCs",
      "tags": ["ozone"]
    },
    {
      "id": "ms-12-bio-ch15-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "Explain ex-situ conservation with an example.",
      "answer": "Ex-situ conservation involves protecting species outside their natural habitats. Example: Botanical gardens and seed banks.",
      "tags": ["ex-situ"]
    },
    {
      "id": "ms-12-bio-ch15-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 3,
      "text": "What is eutrophication?",
      "answer": "Eutrophication is nutrient enrichment of water bodies causing excessive algal growth, depletion of oxygen, and damage to aquatic life.",
      "tags": ["pollution"]
    },
    {
      "id": "ms-12-bio-ch15-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Describe the major types of biodiversity.",
      "answer": `"Types include:  
1. **Genetic diversity** – variation in genes within a species.  
2. **Species diversity** – variety of species within a region.  
3. **Ecosystem diversity** – diversity of ecosystems such as forests, deserts, wetlands.  
These levels reflect complexity and stability of life on Earth."`,
      "tags": ["biodiversity-types"]
    },
    {
      "id": "ms-12-bio-ch15-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Explain how climate change affects biodiversity.",
      "answer": "Climate change alters temperature and rainfall patterns, causing habitat shifts, species migration, coral bleaching, extinction of sensitive species, and disruption of ecological interactions like pollination and migration.",
      "tags": ["climate-change"]
    },
    {
      "id": "ms-12-bio-ch15-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 5,
      "text": "Discuss sustainable development and its importance.",
      "answer": "Sustainable development meets present needs without compromising future generations by balancing economic growth, environmental protection, and social well-being. It promotes conservation of resources, renewable energy use, and pollution control.",
      "tags": ["sustainable-development"]
    }
  ]
}
  ]
}, {
  board: "msbshse",
  medium: "english",
  classKey: "12-science",
  subjectSlug: "chemistry",
  chapters: [
    {
  "id": "ms-12-chem-ch1",
  "chapterNumber": 1,
  "title": "Solid State",
  "slug": "solid-state",
  "description": "Classification of solids, crystal lattices, unit cells, packing efficiency, voids, imperfections, electrical and magnetic properties.",
  "topics": [
    "Classification of Solids",
    "Crystalline and Amorphous Solids",
    "Unit Cell and Lattice Parameters",
    "Packing Efficiency",
    "Tetrahedral and Octahedral Voids",
    "Point Defects",
    "Electrical and Magnetic Properties"
  ],
  "learningObjectives": [
    "Differentiate between crystalline and amorphous solids.",
    "Understand types of unit cells and lattice parameters.",
    "Calculate packing efficiency and number of voids.",
    "Explain point defects in ionic and non-ionic solids.",
    "Describe electrical, magnetic, and dielectric properties of solids."
  ],
  "questions": [
    {
      "id": "ms-12-chem-ch1-q1",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Which of the following is an amorphous solid?",
      "options": ["Quartz", "Glass", "Diamond", "Ice"],
      "answer": "Glass",
      "tags": ["amorphous"]
    },
    {
      "id": "ms-12-chem-ch1-q2",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 1,
      "text": "In a simple cubic unit cell, the number of atoms present is:",
      "options": ["1", "2", "3", "4"],
      "answer": "1",
      "tags": ["unit-cell"]
    },
    {
      "id": "ms-12-chem-ch1-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 2,
      "text": "Define packing efficiency. What is the packing efficiency of a bcc lattice?",
      "answer": "Packing efficiency is the percentage of space occupied by particles in a unit cell. For bcc, it is 68%.",
      "tags": ["packing-efficiency"]
    },
    {
      "id": "ms-12-chem-ch1-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 2,
      "text": "What is a Schottky defect? How does it affect the density of a crystal?",
      "answer": "Schottky defect occurs when equal number of cations and anions are missing, creating vacancies. It reduces the density.",
      "tags": ["defects"]
    },
    {
      "id": "ms-12-chem-ch1-q5",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 1,
      "text": "Coordination number of fcc lattice is:",
      "options": ["4", "6", "8", "12"],
      "answer": "12",
      "tags": ["coordination-number"]
    },
    {
      "id": "ms-12-chem-ch1-q6",
      "type": "long",
      "difficulty": "hard",
      "marks": 3,
      "text": "Explain the difference between crystalline and amorphous solids with any three points.",
      "answer": "Crystalline solids have long-range order, sharp melting point, anisotropic properties; amorphous solids have short-range order, soften over a range, isotropic properties.",
      "tags": ["crystalline-vs-amorphous"]
    },
    {
      "id": "ms-12-chem-ch1-q7",
      "type": "numerical",
      "difficulty": "hard",
      "marks": 3,
      "text": "Calculate the number of octahedral voids in 0.5 mol of a hcp metal.",
      "answer": "Number of octahedral voids = number of atoms = 0.5 × NA = 3.011×10^23 voids.",
      "tags": ["voids"]
    },
    {
      "id": "ms-12-chem-ch1-q8",
      "type": "short",
      "difficulty": "medium",
      "marks": 2,
      "text": "What is isomorphism? Give one example.",
      "answer": "Two compounds having the same crystal structure are isomorphous. Example: NaNO3 and CaCO3.",
      "tags": ["isomorphism"]
    },
    {
      "id": "ms-12-chem-ch1-q9",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Which of the following defects does NOT change the density of the crystal?",
      "options": ["Schottky defect", "Vacancy defect", "Frenkel defect", "Substitution impurity defect"],
      "answer": "Frenkel defect",
      "tags": ["defects"]
    },
    {
      "id": "ms-12-chem-ch1-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 3,
      "text": "Explain tetrahedral and octahedral voids with diagrams and coordination numbers.",
      "answer": "Tetrahedral voids are surrounded by 4 atoms; octahedral voids by 6 atoms. Two tetrahedral voids form per atom; one octahedral void per atom.",
      "tags": ["voids"]
    }
  ]
}, {
  "id": "ms-12-chem-ch2",
  "chapterNumber": 2,
  "title": "Solutions",
  "slug": "solutions",
  "description": "Types of solutions, concentration terms, solubility, vapor pressure of solutions, Raoult’s law, ideal and non-ideal solutions, colligative properties and abnormal molar mass.",
  "topics": [
    "Types of Solutions",
    "Concentration Terms (molarity, molality, mole fraction)",
    "Solubility and Factors Affecting Solubility",
    "Vapour Pressure of Solutions",
    "Raoult's Law and Ideal Solutions",
    "Non-ideal Solutions and Azeotropes",
    "Colligative Properties",
    "Abnormal Molar Mass and van’t Hoff Factor"
  ],
  "learningObjectives": [
    "Classify solutions based on physical state and concentration.",
    "Use different concentration units to express composition of solutions.",
    "Explain Raoult’s law and distinguish between ideal and non-ideal solutions.",
    "Define and apply various colligative properties to determine molar mass.",
    "Explain abnormal molar mass using van’t Hoff factor."
  ],
  "questions": [
    {
      "id": "ms-12-chem-ch2-q1",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Which concentration term is temperature independent?",
      "options": ["Molarity", "Molality", "Normality", "Formality"],
      "answer": "Molality",
      "tags": ["concentration"]
    },
    {
      "id": "ms-12-chem-ch2-q2",
      "type": "short",
      "difficulty": "medium",
      "marks": 2,
      "text": "State Raoult’s law for a solution of volatile liquids.",
      "answer": "Raoult’s law states that the partial vapour pressure of each component in an ideal solution is directly proportional to its mole fraction in the solution.",
      "tags": ["raoults-law"]
    },
    {
      "id": "ms-12-chem-ch2-q3",
      "type": "numerical",
      "difficulty": "medium",
      "marks": 3,
      "text": "Calculate the molality of a solution prepared by dissolving 18 g of glucose (M = 180 g mol⁻¹) in 90 g of water.",
      "answer": "Moles of glucose = 18/180 = 0.1 mol; mass of solvent = 0.090 kg; molality = 0.1 / 0.090 ≈ 1.11 m.",
      "tags": ["molality"]
    },
    {
      "id": "ms-12-chem-ch2-q4",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Which of the following is a colligative property?",
      "options": ["Viscosity", "Surface tension", "Relative lowering of vapour pressure", "Refractive index"],
      "answer": "Relative lowering of vapour pressure",
      "tags": ["colligative-properties"]
    },
    {
      "id": "ms-12-chem-ch2-q5",
      "type": "short",
      "difficulty": "medium",
      "marks": 2,
      "text": "Differentiate between ideal and non-ideal solutions on the basis of enthalpy change of mixing.",
      "answer": "In ideal solutions, enthalpy of mixing (ΔHmix) is zero, whereas in non-ideal solutions ΔHmix is not zero (it may be positive or negative).",
      "tags": ["ideal-solutions"]
    },
    {
      "id": "ms-12-chem-ch2-q6",
      "type": "numerical",
      "difficulty": "hard",
      "marks": 3,
      "text": "A solution containing 1.0 g of a non-volatile solute in 100 g of water boils at 100.15°C. Calculate the molar mass of the solute. (Kb for water = 0.52 K kg mol⁻¹).",
      "answer": "ΔTb = 0.15 K; molality = ΔTb / Kb = 0.15 / 0.52 ≈ 0.288 m. Moles of solute = 0.288 × 0.100 = 0.0288 mol. Molar mass = 1.0 / 0.0288 ≈ 34.7 g mol⁻¹.",
      "tags": ["elevation-boiling-point"]
    },
    {
      "id": "ms-12-chem-ch2-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 2,
      "text": "Define solubility. How does temperature affect solubility of solids in liquids?",
      "answer": "Solubility is the maximum amount of solute that can dissolve in a given amount of solvent at a specific temperature. Generally, solubility of solids in liquids increases with increase in temperature.",
      "tags": ["solubility"]
    },
    {
      "id": "ms-12-chem-ch2-q8",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 1,
      "text": "For a solution showing positive deviation from Raoult’s law:",
      "options": [
        "ΔHmix = 0 and ΔVmix = 0",
        "ΔHmix < 0 and ΔVmix < 0",
        "ΔHmix > 0 and ΔVmix > 0",
        "ΔHmix < 0 and ΔVmix > 0"
      ],
      "answer": "ΔHmix > 0 and ΔVmix > 0",
      "tags": ["non-ideal-solutions"]
    },
    {
      "id": "ms-12-chem-ch2-q9",
      "type": "short",
      "difficulty": "medium",
      "marks": 2,
      "text": "What is van’t Hoff factor? How is it related to abnormal molar mass?",
      "answer": "van’t Hoff factor (i) is the ratio of the observed colligative property to the calculated colligative property for a nonelectrolyte. Due to association or dissociation, the effective number of particles changes, giving abnormal molar mass, which is corrected by using i.",
      "tags": ["vant-hoff-factor"]
    },
    {
      "id": "ms-12-chem-ch2-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 3,
      "text": "Explain the concept of azeotropes. Distinguish between minimum boiling and maximum boiling azeotropes with suitable examples.",
      "answer": "Azeotropes are constant boiling mixtures whose composition in liquid and vapour phase is the same. Minimum boiling azeotropes show positive deviation and boil at a temperature lower than that of either component (e.g. ethanol–water). Maximum boiling azeotropes show negative deviation and boil at a temperature higher than either component (e.g. HNO₃–water).",
      "tags": ["azeotropes"]
    }
  ]
}, {
  "id": "ms-12-chem-ch3",
  "chapterNumber": 3,
  "title": "Ionic Equilibria",
  "slug": "ionic-equilibria",
  "description": "Concept of acids and bases, ionization of weak electrolytes, Ostwald’s dilution law, pH scale, buffer solutions, solubility product and common ion effect.",
  "topics": [
    "Arrhenius, Bronsted–Lowry and Lewis Acids and Bases",
    "Ionization of Weak Electrolytes",
    "Ostwald’s Dilution Law",
    "pH, pOH and Ionic Product of Water",
    "Buffer Solutions and Henderson–Hasselbalch Equation",
    "Hydrolysis of Salts",
    "Solubility Product (Ksp)",
    "Common Ion Effect"
  ],
  "learningObjectives": [
    "Compare different concepts of acids and bases.",
    "Derive and apply Ostwald’s dilution law for weak electrolytes.",
    "Calculate pH of strong and weak acid/base solutions.",
    "Explain the working of buffer solutions using Henderson–Hasselbalch equation.",
    "Use solubility product to predict precipitation and solubility."
  ],
  "questions": [
    {
      "id": "ms-12-chem-ch3-q1",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Which of the following is a Lewis acid?",
      "options": ["NH₃", "BF₃", "OH⁻", "H₂O"],
      "answer": "BF₃",
      "tags": ["acids-bases"]
    },
    {
      "id": "ms-12-chem-ch3-q2",
      "type": "short",
      "difficulty": "medium",
      "marks": 2,
      "text": "State Ostwald’s dilution law for a weak electrolyte.",
      "answer": "Ostwald’s dilution law states that the degree of dissociation of a weak electrolyte is inversely proportional to the square root of its concentration and relates dissociation constant K to concentration c and degree of dissociation α by K = cα² / (1 − α).",
      "tags": ["ostwalds-law"]
    },
    {
      "id": "ms-12-chem-ch3-q3",
      "type": "numerical",
      "difficulty": "medium",
      "marks": 3,
      "text": "Calculate the pH of 0.001 M HCl solution.",
      "answer": "HCl is a strong acid and fully ionizes. [H⁺] = 0.001 M = 10⁻³ M; pH = −log[H⁺] = 3.",
      "tags": ["ph-calculation"]
    },
    {
      "id": "ms-12-chem-ch3-q4",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "The ionic product of water (Kw) at 25°C is approximately:",
      "options": ["1 × 10⁻¹⁰", "1 × 10⁻¹²", "1 × 10⁻¹⁴", "1 × 10⁻¹⁶"],
      "answer": "1 × 10⁻¹⁴",
      "tags": ["kw"]
    },
    {
      "id": "ms-12-chem-ch3-q5",
      "type": "short",
      "difficulty": "medium",
      "marks": 2,
      "text": "What is a buffer solution? Give one example each of acidic and basic buffer.",
      "answer": "A buffer solution resists change in pH on addition of small amounts of acid or base. Example of acidic buffer: CH₃COOH and CH₃COO⁻Na⁺; basic buffer: NH₄OH and NH₄Cl.",
      "tags": ["buffers"]
    },
    {
      "id": "ms-12-chem-ch3-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 2,
      "text": "Write Henderson–Hasselbalch equation for an acidic buffer and explain each term.",
      "answer": "For an acidic buffer, pH = pKa + log([salt]/[acid]), where pKa is −log Ka, [salt] is concentration of conjugate base and [acid] is concentration of weak acid.",
      "tags": ["henderson-hasselbalch"]
    },
    {
      "id": "ms-12-chem-ch3-q7",
      "type": "numerical",
      "difficulty": "hard",
      "marks": 3,
      "text": "The solubility product of AgCl at 25°C is 1.6 × 10⁻¹⁰. Calculate its solubility in mol L⁻¹ in pure water.",
      "answer": "For AgCl ⇌ Ag⁺ + Cl⁻, Ksp = s²; s = √(1.6 × 10⁻¹⁰) ≈ 1.26 × 10⁻⁵ mol L⁻¹.",
      "tags": ["solubility-product"]
    },
    {
      "id": "ms-12-chem-ch3-q8",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 1,
      "text": "Common ion effect is observed when:",
      "options": [
        "A weak electrolyte is mixed with a strong electrolyte having a common ion",
        "Two strong electrolytes are mixed",
        "Two weak electrolytes are mixed",
        "A salt is added to a non-aqueous solvent"
      ],
      "answer": "A weak electrolyte is mixed with a strong electrolyte having a common ion",
      "tags": ["common-ion-effect"]
    },
    {
      "id": "ms-12-chem-ch3-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 3,
      "text": "Explain hydrolysis of salts formed from (i) strong acid and weak base, (ii) weak acid and strong base with suitable examples.",
      "answer": "i) Salts of strong acid and weak base (e.g. NH₄Cl) hydrolyse to give acidic solution because the cation reacts with water to produce H⁺. ii) Salts of weak acid and strong base (e.g. CH₃COONa) hydrolyse to give basic solution because the anion reacts with water to produce OH⁻.",
      "tags": ["hydrolysis"]
    },
    {
      "id": "ms-12-chem-ch3-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 3,
      "text": "Derive the expression for pH of a weak acid solution using its dissociation constant (Ka) and concentration.",
      "answer": "For weak acid HA of initial concentration C, degree of dissociation α is small. Ka = Cα²/(1−α) ≈ Cα². [H⁺] = Cα = √(CKa). Hence pH = −log[H⁺] = −log(√(C Ka)) = 1/2 (pKa − log C).",
      "tags": ["ph-weak-acid"]
    }
  ]
}, {
  "id": "ms-12-chem-ch4",
  "chapterNumber": 4,
  "title": "Chemical Thermodynamics",
  "slug": "chemical-thermodynamics",
  "description": "Basic thermodynamic terms, first law, enthalpy changes, Hess’s law, spontaneity, entropy, Gibbs free energy and criteria for equilibrium.",
  "topics": [
    "System, Surroundings and Types of Systems",
    "State Functions and Thermodynamic Processes",
    "First Law of Thermodynamics",
    "Internal Energy and Enthalpy",
    "Heat of Reaction and Hess’s Law",
    "Second Law, Entropy and Spontaneity",
    "Gibbs Free Energy and Work Function",
    "Relationship between ΔG, ΔH and ΔS"
  ],
  "learningObjectives": [
    "Define system, surroundings and types of thermodynamic systems.",
    "Apply first law of thermodynamics to physical and chemical processes.",
    "Explain enthalpy changes and use Hess’s law for calculation.",
    "Describe entropy and spontaneity in terms of second law.",
    "Use ΔG = ΔH − TΔS to predict feasibility of reactions."
  ],
  "questions": [
    {
      "id": "ms-12-chem-ch4-q1",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Which of the following is an extensive property?",
      "options": ["Temperature", "Density", "Enthalpy", "Pressure"],
      "answer": "Enthalpy",
      "tags": ["state-functions"]
    },
    {
      "id": "ms-12-chem-ch4-q2",
      "type": "short",
      "difficulty": "medium",
      "marks": 2,
      "text": "State the first law of thermodynamics.",
      "answer": "The first law of thermodynamics states that energy can neither be created nor destroyed; it can only be converted from one form to another. Mathematically, ΔU = q + w.",
      "tags": ["first-law"]
    },
    {
      "id": "ms-12-chem-ch4-q3",
      "type": "numerical",
      "difficulty": "medium",
      "marks": 3,
      "text": "An ideal gas absorbs 500 J of heat and does 200 J of work. Calculate the change in internal energy of the system.",
      "answer": "ΔU = q + w = 500 J + (−200 J) = 300 J.",
      "tags": ["internal-energy"]
    },
    {
      "id": "ms-12-chem-ch4-q4",
      "type": "short",
      "difficulty": "medium",
      "marks": 2,
      "text": "State Hess’s law of constant heat summation.",
      "answer": "Hess’s law states that the enthalpy change of a reaction is the same whether it occurs in one step or in a series of steps.",
      "tags": ["hess-law"]
    },
    {
      "id": "ms-12-chem-ch4-q5",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "For a spontaneous process at constant temperature and pressure:",
      "options": ["ΔG > 0", "ΔG = 0", "ΔG < 0", "ΔH = 0"],
      "answer": "ΔG < 0",
      "tags": ["gibbs-free-energy"]
    },
    {
      "id": "ms-12-chem-ch4-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 2,
      "text": "Define entropy. What is its SI unit?",
      "answer": "Entropy is a measure of randomness or disorder of a system. Its SI unit is J K⁻¹ mol⁻¹.",
      "tags": ["entropy"]
    },
    {
      "id": "ms-12-chem-ch4-q7",
      "type": "numerical",
      "difficulty": "hard",
      "marks": 3,
      "text": "Calculate ΔG for a reaction at 298 K if ΔH = −40 kJ mol⁻¹ and ΔS = −50 J K⁻¹ mol⁻¹. Comment on spontaneity.",
      "answer": "Convert ΔS to kJ: −50 J K⁻¹ mol⁻¹ = −0.050 kJ K⁻¹ mol⁻¹. ΔG = ΔH − TΔS = −40 − 298(−0.050) = −40 + 14.9 = −25.1 kJ mol⁻¹. Since ΔG < 0, the reaction is spontaneous.",
      "tags": ["delta-g"]
    },
    {
      "id": "ms-12-chem-ch4-q8",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 1,
      "text": "Which of the following processes has ΔS > 0?",
      "options": [
        "Freezing of water",
        "Condensation of steam",
        "Dissolution of a salt in water",
        "Formation of ionic solid from gaseous ions"
      ],
      "answer": "Dissolution of a salt in water",
      "tags": ["entropy-change"]
    },
    {
      "id": "ms-12-chem-ch4-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 3,
      "text": "Distinguish between reversible and irreversible processes with suitable examples.",
      "answer": "Reversible processes occur infinitely slowly through a series of equilibrium states and can be reversed by an infinitesimal change (e.g. isothermal reversible expansion of an ideal gas). Irreversible processes occur spontaneously in a finite time with driving force; they cannot be exactly reversed (e.g. free expansion of gas, natural heat flow from hot to cold body).",
      "tags": ["reversible-irreversible"]
    },
    {
      "id": "ms-12-chem-ch4-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 3,
      "text": "Explain the relationship ΔG = −nFE and its significance in electrochemical cells.",
      "answer": "ΔG is the maximum non-expansion work obtainable from a galvanic cell. For a cell involving n moles of electrons and emf E, ΔG = −nFE (F is Faraday constant). A negative ΔG corresponds to positive E and a spontaneous cell reaction.",
      "tags": ["delta-g-cell"]
    }
  ]
}, {
  "id": "ms-12-chem-ch5",
  "chapterNumber": 5,
  "title": "Electrochemistry",
  "slug": "electrochemistry",
  "description": "Electrolytic and galvanic cells, electrode potential, Nernst equation, electrochemical series, conductance of electrolytes, Kohlrausch’s law and applications.",
  "topics": [
    "Electrolytes and Conductance",
    "Molar and Equivalent Conductance",
    "Electrolytic and Galvanic Cells",
    "Standard Electrode Potential",
    "Nernst Equation",
    "Electrochemical Series",
    "Primary and Secondary Cells",
    "Fuel Cells and Corrosion"
  ],
  "learningObjectives": [
    "Differentiate between electrolytic and galvanic cells.",
    "Explain electrode potential and its measurement.",
    "Apply Nernst equation to calculate cell potential.",
    "Use electrochemical series to predict feasibility and EMF.",
    "Describe working of important electrochemical cells and corrosion."
  ],
  "questions": [
    {
      "id": "ms-12-chem-ch5-q1",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Unit of molar conductance is:",
      "options": ["S cm", "S cm² mol⁻¹", "S mol⁻¹", "S cm⁻¹"],
      "answer": "S cm² mol⁻¹",
      "tags": ["conductance"]
    },
    {
      "id": "ms-12-chem-ch5-q2",
      "type": "short",
      "difficulty": "medium",
      "marks": 2,
      "text": "Define standard electrode potential.",
      "answer": "Standard electrode potential is the potential difference between a metal/metal ion electrode and standard hydrogen electrode when the ionic concentration is 1 M, gas pressure 1 bar and temperature 298 K.",
      "tags": ["electrode-potential"]
    },
    {
      "id": "ms-12-chem-ch5-q3",
      "type": "numerical",
      "difficulty": "medium",
      "marks": 3,
      "text": "Calculate the EMF of a cell: Zn | Zn²⁺ (0.1 M) || Cu²⁺ (1.0 M) | Cu. Given E°cell = 1.10 V, n = 2.",
      "answer": "E = E° − (0.0591/2) log([Zn²⁺]/[Cu²⁺]) = 1.10 − 0.02955 log(0.1/1) = 1.10 − 0.02955(−1) ≈ 1.13 V.",
      "tags": ["nernst-equation"]
    },
    {
      "id": "ms-12-chem-ch5-q4",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "In an electrolytic cell, the electrode at which oxidation occurs is called:",
      "options": ["Anode", "Cathode", "Salt bridge", "Diaphragm"],
      "answer": "Anode",
      "tags": ["electrolysis"]
    },
    {
      "id": "ms-12-chem-ch5-q5",
      "type": "short",
      "difficulty": "medium",
      "marks": 2,
      "text": "State Kohlrausch’s law of independent migration of ions.",
      "answer": "Kohlrausch’s law states that at infinite dilution, the limiting molar conductance of an electrolyte is equal to the sum of the individual contributions of its cation and anion.",
      "tags": ["kohlrausch-law"]
    },
    {
      "id": "ms-12-chem-ch5-q6",
      "type": "numerical",
      "difficulty": "hard",
      "marks": 3,
      "text": "The limiting molar conductance of NaCl, HCl and NaAc are 126.4, 426.2 and 91.0 S cm² mol⁻¹ respectively. Calculate the limiting molar conductance of CH₃COOH.",
      "answer": "Λ°(CH₃COOH) = Λ°(HCl) + Λ°(NaAc) − Λ°(NaCl) = 426.2 + 91.0 − 126.4 = 390.8 S cm² mol⁻¹.",
      "tags": ["lambda-m-zero"]
    },
    {
      "id": "ms-12-chem-ch5-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 2,
      "text": "What is a fuel cell? Give one example.",
      "answer": "A fuel cell converts the chemical energy of a fuel directly into electrical energy by an electrochemical reaction. Example: Hydrogen–oxygen fuel cell.",
      "tags": ["fuel-cells"]
    },
    {
      "id": "ms-12-chem-ch5-q8",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 1,
      "text": "Rusting of iron is an example of:",
      "options": ["Electrolysis", "Electroplating", "Galvanic corrosion", "Passivation"],
      "answer": "Galvanic corrosion",
      "tags": ["corrosion"]
    },
    {
      "id": "ms-12-chem-ch5-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 3,
      "text": "Explain the construction and working of a lead storage battery.",
      "answer": "A lead storage battery consists of lead anode and lead dioxide cathode dipped in aqueous H₂SO₄. During discharge, Pb is oxidized to PbSO₄ and PbO₂ is reduced to PbSO₄, producing electrical energy. On charging, these reactions are reversed, regenerating Pb and PbO₂.",
      "tags": ["lead-battery"]
    },
    {
      "id": "ms-12-chem-ch5-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 3,
      "text": "What is electrochemical series? Give any three applications.",
      "answer": "Electrochemical series is an arrangement of elements in order of their standard reduction potentials. Applications: predicting feasibility of redox reactions, calculating EMF of cells, determining the oxidizing/reducing strength of species and metal displacement reactions.",
      "tags": ["electrochemical-series"]
    }
  ]
}, {
  "id": "ms-12-chem-ch6",
  "chapterNumber": 6,
  "title": "Chemical Kinetics",
  "slug": "chemical-kinetics",
  "description": "Rate of reaction, factors affecting rate, rate laws, order and molecularity, integrated rate equations, half-life, collision theory and catalysis.",
  "topics": [
    "Average and Instantaneous Rate of Reaction",
    "Rate Law and Rate Constant",
    "Order and Molecularity",
    "Integrated Rate Equations for Zero and First Order",
    "Half-life Period",
    "Temperature Dependence of Rate (Arrhenius Equation)",
    "Collision Theory",
    "Catalysis and Activation Energy"
  ],
  "learningObjectives": [
    "Define rate of reaction and express it mathematically.",
    "Determine order and rate constant from experimental data.",
    "Use integrated rate equations for zero and first order reactions.",
    "Explain effect of temperature on rate using Arrhenius equation.",
    "Describe collision theory and role of catalyst."
  ],
  "questions": [
    {
      "id": "ms-12-chem-ch6-q1",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "The unit of rate constant for a first-order reaction is:",
      "options": ["mol L⁻¹ s⁻¹", "L mol⁻¹ s⁻¹", "s⁻¹", "L² mol⁻² s⁻¹"],
      "answer": "s⁻¹",
      "tags": ["rate-constant"]
    },
    {
      "id": "ms-12-chem-ch6-q2",
      "type": "short",
      "difficulty": "medium",
      "marks": 2,
      "text": "Define order of a reaction. How is it different from molecularity?",
      "answer": "Order is the sum of powers of concentration terms in the rate law and is an experimental quantity. Molecularity is the number of molecules colliding in a single step and is a theoretical concept defined only for elementary reactions.",
      "tags": ["order-molecularity"]
    },
    {
      "id": "ms-12-chem-ch6-q3",
      "type": "numerical",
      "difficulty": "medium",
      "marks": 3,
      "text": "For a first order reaction, the rate constant is 0.693 min⁻¹. Calculate its half-life.",
      "answer": "For first order, t½ = 0.693 / k = 0.693 / 0.693 = 1 min.",
      "tags": ["half-life"]
    },
    {
      "id": "ms-12-chem-ch6-q4",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "According to Arrhenius equation, rate constant k is related to temperature T as:",
      "options": ["k = Ae^(−Eₐ/RT)", "k = A/RT", "k = Eₐ e^(−RT)", "k = A + EₐT"],
      "answer": "k = Ae^(−Eₐ/RT)",
      "tags": ["arrhenius"]
    },
    {
      "id": "ms-12-chem-ch6-q5",
      "type": "short",
      "difficulty": "medium",
      "marks": 2,
      "text": "What is activation energy? How does a catalyst affect it?",
      "answer": "Activation energy is the minimum extra energy that reacting molecules must possess to undergo a chemical reaction. A catalyst lowers the activation energy by providing an alternative pathway.",
      "tags": ["activation-energy"]
    },
    {
      "id": "ms-12-chem-ch6-q6",
      "type": "numerical",
      "difficulty": "hard",
      "marks": 3,
      "text": "A zero order reaction has a rate constant of 2.0 × 10⁻³ mol L⁻¹ s⁻¹. How long will it take for the concentration of reactant to fall from 0.10 mol L⁻¹ to 0.04 mol L⁻¹?",
      "answer": "For zero order: [A]t = [A]0 − kt. So t = ([A]0 − [A]t)/k = (0.10 − 0.04)/(2.0 × 10⁻³) = 0.06 / 2.0×10⁻³ = 30 s.",
      "tags": ["zero-order"]
    },
    {
      "id": "ms-12-chem-ch6-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 2,
      "text": "Write integrated rate law for first order reaction and explain the terms.",
      "answer": "For A → products, ln[A]t = ln[A]0 − kt or [A]t = [A]0 e^(−kt); [A]0 is initial concentration, [A]t is concentration at time t, k is rate constant.",
      "tags": ["integrated-rate-law"]
    },
    {
      "id": "ms-12-chem-ch6-q8",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 1,
      "text": "Which factor does NOT affect rate of a chemical reaction?",
      "options": ["Temperature", "Concentration", "Nature of reactants", "Avogadro number"],
      "answer": "Avogadro number",
      "tags": ["rate-factors"]
    },
    {
      "id": "ms-12-chem-ch6-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 3,
      "text": "Explain collision theory of bimolecular reactions.",
      "answer": "According to collision theory, molecules must collide with sufficient energy (≥ activation energy) and proper orientation to react. Rate is proportional to the number of effective collisions per unit time. Temperature increases kinetic energy and collision frequency, increasing rate.",
      "tags": ["collision-theory"]
    },
    {
      "id": "ms-12-chem-ch6-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 3,
      "text": "Discuss the effect of temperature on rate constant using Arrhenius equation and explain how activation energy can be determined graphically.",
      "answer": "Arrhenius equation k = Ae^(−Eₐ/RT) shows that k increases with temperature. Taking log gives ln k = ln A − Eₐ/RT. A plot of ln k versus 1/T is a straight line with slope −Eₐ/R from which activation energy Eₐ is calculated.",
      "tags": ["arrhenius-graph"]
    }
  ]
}, {
  "id": "ms-12-chem-ch7",
  "chapterNumber": 7,
  "title": "Elements of Groups 16, 17 and 18",
  "slug": "elements-groups-16-17-18",
  "description": "Study of p-block elements of groups 16, 17 and 18, their electronic configurations, trends, important compounds and anomalous behaviour of oxygen and fluorine.",
  "topics": [
    "Electronic Configuration and General Trends",
    "Group 16 Elements: O, S and Their Compounds",
    "Oxyacids of Sulphur",
    "Group 17 Elements: Halogens",
    "Hydrogen Halides and Oxyacids of Halogens",
    "Interhalogen Compounds",
    "Group 18 Elements: Noble Gases",
    "Compounds of Xenon"
  ],
  "learningObjectives": [
    "Write electronic configurations of group 16, 17 and 18 elements.",
    "Explain trends in physical and chemical properties down the groups.",
    "Describe preparation and properties of important compounds like O₂, O₃, SO₂, H₂SO₄, Cl₂ and HCl.",
    "Draw structures of oxyacids of sulphur and halogens.",
    "Explain formation and structure of xenon compounds."
  ],
  "questions": [
    {
      "id": "ms-12-chem-ch7-q1",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Which of the following is a group 16 element?",
      "options": ["Nitrogen", "Oxygen", "Fluorine", "Neon"],
      "answer": "Oxygen",
      "tags": ["group-16"]
    },
    {
      "id": "ms-12-chem-ch7-q2",
      "type": "short",
      "difficulty": "medium",
      "marks": 2,
      "text": "Why is O–O bond weaker than S–S bond?",
      "answer": "Due to small size of oxygen atoms, electron–electron repulsions in O–O bond are higher, weakening the bond, whereas sulphur has larger size and less repulsion in S–S bond.",
      "tags": ["anomalous-oxygen"]
    },
    {
      "id": "ms-12-chem-ch7-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 2,
      "text": "Write any two uses of sulphuric acid.",
      "answer": "Used in manufacture of fertilizers like ammonium sulphate and superphosphate; used in petroleum refining, dyes, paints and as a dehydrating agent.",
      "tags": ["h2so4"]
    },
    {
      "id": "ms-12-chem-ch7-q4",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Which hydrogen halide is the strongest acid in aqueous solution?",
      "options": ["HF", "HCl", "HBr", "HI"],
      "answer": "HI",
      "tags": ["hydrogen-halides"]
    },
    {
      "id": "ms-12-chem-ch7-q5",
      "type": "short",
      "difficulty": "medium",
      "marks": 2,
      "text": "What are interhalogen compounds? Give one example.",
      "answer": "Compounds formed between different halogen atoms are called interhalogen compounds, e.g. ClF₃, ICl.",
      "tags": ["interhalogens"]
    },
    {
      "id": "ms-12-chem-ch7-q6",
      "type": "long",
      "difficulty": "hard",
      "marks": 3,
      "text": "Explain the structure and bonding in ozone (O₃).",
      "answer": "Ozone is angular with O–O–O bond angle about 117°. It shows resonance between two equivalent structures with one O–O single bond and one O=O double bond, giving equalized bond order of 1.5.",
      "tags": ["ozone"]
    },
    {
      "id": "ms-12-chem-ch7-q7",
      "type": "short",
      "difficulty": "medium",
      "marks": 2,
      "text": "Why are noble gases chemically inert?",
      "answer": "They have stable ns²np⁶ configuration (except He: 1s²) with completely filled valence shell and high ionization energy, so they do not easily gain or lose electrons.",
      "tags": ["noble-gases"]
    },
    {
      "id": "ms-12-chem-ch7-q8",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 1,
      "text": "Which xenon compound has square planar geometry around xenon?",
      "options": ["XeF₂", "XeF₄", "XeF₆", "XeO₃"],
      "answer": "XeF₄",
      "tags": ["xenon-compounds"]
    },
    {
      "id": "ms-12-chem-ch7-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 3,
      "text": "Describe contact process for manufacture of sulphuric acid with reactions.",
      "answer": "Steps: (i) Burning S or FeS₂ in air to form SO₂. (ii) Catalytic oxidation of SO₂ to SO₃ using V₂O₅ at 720–770 K and 1–2 bar: 2SO₂ + O₂ ⇌ 2SO₃. (iii) Absorption of SO₃ in conc. H₂SO₄ to form oleum, then dilution with water to get desired concentration of H₂SO₄.",
      "tags": ["contact-process"]
    },
    {
      "id": "ms-12-chem-ch7-q10",
      "type": "long",
      "difficulty": "hard",
      "marks": 3,
      "text": "Explain anomalous behaviour of fluorine compared to other halogens.",
      "answer": "Fluorine is most electronegative, smallest in size and has no d-orbitals. It forms only one oxidation state (−1), shows high reactivity, forms strong hydrogen bonds, low bond dissociation energy of F–F and does not form oxyacids like other halogens.",
      "tags": ["fluorine-anomaly"]
    }
  ]
}, {
  "id": "ms-12-chem-ch8",
  "chapterNumber": 8,
  "title": "Transition and Inner Transition Elements",
  "slug": "transition-inner-transition-elements",
  "description": "Study of d-block and f-block elements, general properties, variable oxidation states, complex formation, magnetic behaviour and lanthanoid contraction.",
  "topics": [
    "Electronic Configuration of d-block Elements",
    "General Characteristics of Transition Metals",
    "Variable Oxidation States and Colour",
    "Magnetic Properties and Alloy Formation",
    "Preparation and Properties of Important Compounds",
    "f-block Elements: Lanthanoids and Actinoids",
    "Lanthanoid Contraction",
    "Comparison between Lanthanoids and Actinoids"
  ],
  "learningObjectives": [
    "Write electronic configurations of transition and inner transition elements.",
    "Explain general properties like variable oxidation state, catalytic activity and complex formation.",
    "Interpret magnetic properties and colour on the basis of unpaired electrons.",
    "Describe lanthanoid contraction and its consequences.",
    "Differentiate between lanthanoids and actinoids."
  ],
  "questions": [
    {
      "id": "ms-12-chem-ch8-q1",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Which of the following is a d-block element?",
      "options": ["Na", "Mg", "Fe", "Ne"],
      "answer": "Fe",
      "tags": ["d-block"]
    },
    {
      "id": "ms-12-chem-ch8-q2",
      "type": "short",
      "difficulty": "medium",
      "marks": 2,
      "text": "Why do transition metals show variable oxidation states?",
      "answer": "Because of small energy difference between (n−1)d and ns orbitals, both can participate in bonding, giving multiple oxidation states.",
      "tags": ["variable-oxidation-state"]
    },
    {
      "id": "ms-12-chem-ch8-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 2,
      "text": "Explain why most transition metal salts are coloured.",
      "answer": "Presence of partially filled d-orbitals allows d–d transitions of electrons under ligand field, absorbing certain wavelengths and giving colour.",
      "tags": ["colour-transition-metals"]
    },
    {
      "id": "ms-12-chem-ch8-q4",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Which property generally increases with number of unpaired electrons?",
      "options": ["Diamagnetism", "Paramagnetism", "Boiling point", "Atomic radius"],
      "answer": "Paramagnetism",
      "tags": ["magnetic-properties"]
    },
    {
      "id": "ms-12-chem-ch8-q5",
      "type": "short",
      "difficulty": "medium",
      "marks": 2,
      "text": "What is lanthanoid contraction?",
      "answer": "It is the steady decrease in atomic and ionic radii of lanthanoids (from La³⁺ to Lu³⁺) with increasing atomic number due to poor shielding by 4f electrons.",
      "tags": ["lanthanoid-contraction"]
    },
    {
      "id": "ms-12-chem-ch8-q6",
      "type": "long",
      "difficulty": "hard",
      "marks": 3,
      "text": "Give any three consequences of lanthanoid contraction.",
      "answer": "i) Similarity in size of Zr and Hf and their similar properties. ii) Difficulty in separation of lanthanoids due to close radii. iii) Higher basicity of early lanthanoid hydroxides compared to later ones.",
      "tags": ["lanthanoid-consequences"]
    },
    {
      "id": "ms-12-chem-ch8-q7",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 1,
      "text": "Which of the following is an actinoid element?",
      "options": ["Ce", "Eu", "Th", "Zn"],
      "answer": "Th",
      "tags": ["actinoids"]
    },
    {
      "id": "ms-12-chem-ch8-q8",
      "type": "short",
      "difficulty": "medium",
      "marks": 2,
      "text": "Transition metals form alloys easily. Why?",
      "answer": "Because their atomic sizes are similar and crystal structures are compatible, atoms of one metal can replace those of another in the lattice to form alloys.",
      "tags": ["alloy-formation"]
    },
    {
      "id": "ms-12-chem-ch8-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 3,
      "text": "Compare lanthanoids and actinoids with respect to (i) oxidation states, (ii) radioactivity, (iii) complex formation.",
      "answer": "i) Lanthanoids mainly show +3 state with few exceptions; actinoids show wider range from +3 to +6. ii) Most lanthanoids are non-radioactive (except promethium); almost all actinoids are radioactive. iii) Actinoids show stronger tendency for complex formation due to higher charge and larger size.",
      "tags": ["lanthanoids-vs-actinoids"]
    },
    {
      "id": "ms-12-chem-ch8-q10",
      "type": "numerical",
      "difficulty": "hard",
      "marks": 3,
      "text": "An aqueous solution of a metal ion M²⁺ has three unpaired electrons. Calculate its magnetic moment (spin-only formula).",
      "answer": "n = 3; μ = √(n(n+2)) BM = √(3×5) = √15 ≈ 3.87 BM.",
      "tags": ["magnetic-moment"]
    }
  ]
}, {
  "id": "ms-12-chem-ch9",
  "chapterNumber": 9,
  "title": "Coordination Compounds",
  "slug": "coordination-compounds",
  "description": "Werner’s theory, nomenclature, isomerism, valence bond theory, crystal field theory, stability and applications of coordination compounds.",
  "topics": [
    "Basic Terms: Ligand, Coordination Number, Coordination Sphere",
    "Werner’s Theory and EAN Rule",
    "Nomenclature of Coordination Compounds",
    "Types of Ligands and Denticity",
    "Isomerism in Coordination Compounds",
    "Valence Bond Theory (VBT)",
    "Crystal Field Theory (CFT)",
    "Applications of Coordination Compounds"
  ],
  "learningObjectives": [
    "Use IUPAC rules to name coordination compounds.",
    "Classify ligands and determine coordination number.",
    "Identify and explain different kinds of isomerism in complexes.",
    "Apply VBT and CFT to predict geometry and magnetic properties.",
    "Explain stability and uses of coordination compounds."
  ],
  "questions": [
    {
      "id": "ms-12-chem-ch9-q1",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "In the complex [Co(NH₃)₆]Cl₃, the coordination number of Co is:",
      "options": ["3", "4", "5", "6"],
      "answer": "6",
      "tags": ["coordination-number"]
    },
    {
      "id": "ms-12-chem-ch9-q2",
      "type": "short",
      "difficulty": "medium",
      "marks": 2,
      "text": "Define ligand and give one example each of monodentate and bidentate ligand.",
      "answer": "Ligand is an ion or molecule capable of donating a pair of electrons to central metal atom/ion. Monodentate: Cl⁻; Bidentate: ethane-1,2-diamine (en).",
      "tags": ["ligands"]
    },
    {
      "id": "ms-12-chem-ch9-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 2,
      "text": "Write IUPAC name of [Fe(CN)₆]⁴⁻.",
      "answer": "Hexacyanidoferrate(II) ion.",
      "tags": ["nomenclature"]
    },
    {
      "id": "ms-12-chem-ch9-q4",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 1,
      "text": "Which type of isomerism is shown by [Co(NH₃)₄Cl₂]Cl and [Co(NH₃)₄ClCl₂]?",
      "options": ["Ionization isomerism", "Linkage isomerism", "Coordination isomerism", "Geometrical isomerism"],
      "answer": "Ionization isomerism",
      "tags": ["isomerism"]
    },
    {
      "id": "ms-12-chem-ch9-q5",
      "type": "long",
      "difficulty": "hard",
      "marks": 3,
      "text": "Explain geometrical isomerism in square planar complex [Pt(NH₃)₂Cl₂].",
      "answer": "In square planar [Pt(NH₃)₂Cl₂], ligands can be arranged as cis (two Cl⁻ adjacent) and trans (two Cl⁻ opposite). These isomers differ in physical and chemical properties; cis is more reactive and used as anticancer drug (cis-platin).",
      "tags": ["geometrical-isomerism"]
    },
    {
      "id": "ms-12-chem-ch9-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 2,
      "text": "What is effective atomic number (EAN)? State its significance.",
      "answer": "EAN is the total number of electrons present around the central metal ion including those donated by ligands. Complexes with EAN equal to nearest noble gas configuration are often more stable.",
      "tags": ["ean-rule"]
    },
    {
      "id": "ms-12-chem-ch9-q7",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 1,
      "text": "A complex with d²sp³ hybridization has which geometry?",
      "options": ["Tetrahedral", "Square planar", "Octahedral (inner orbital)", "Octahedral (outer orbital)"],
      "answer": "Octahedral (inner orbital)",
      "tags": ["vbt"]
    },
    {
      "id": "ms-12-chem-ch9-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 3,
      "text": "Explain high-spin and low-spin complexes with reference to crystal field splitting.",
      "answer": "In octahedral field, Δo may be small or large. For weak-field ligands (small Δo), electrons occupy higher energy t2g and eg orbitals singly, giving more unpaired electrons (high-spin complex). For strong-field ligands (large Δo), electrons pair in lower t2g orbitals before occupying eg, giving fewer unpaired electrons (low-spin complex).",
      "tags": ["cft"]
    },
    {
      "id": "ms-12-chem-ch9-q9",
      "type": "short",
      "difficulty": "medium",
      "marks": 2,
      "text": "Give any two applications of coordination compounds in daily life or industry.",
      "answer": "Used in metallurgy for extraction (e.g., cyanide complexes in gold extraction), as catalysts (e.g., Wilkinson’s catalyst), in medicine (e.g., cis-platin), and as complexometric indicators (EDTA in water hardness estimation).",
      "tags": ["applications"]
    },
    {
      "id": "ms-12-chem-ch9-q10",
      "type": "numerical",
      "difficulty": "hard",
      "marks": 3,
      "text": "Calculate the oxidation state of cobalt in the complex [Co(NH₃)₅Cl]Cl₂.",
      "answer": "Let oxidation state of Co be x. NH₃ is neutral, Cl⁻ ligand is −1, two counter Cl⁻ are −2: x + (−1) + 0 = +2 (overall charge of complex cation). So x = +3.",
      "tags": ["oxidation-state"]
    }
  ]
}, {
  "id": "ms-12-chem-ch10",
  "chapterNumber": 10,
  "title": "Halogen Derivatives",
  "slug": "halogen-derivatives",
  "description": "Classification, nomenclature, methods of preparation and reactions of haloalkanes and haloarenes, mechanism of nucleophilic substitution and elimination reactions.",
  "topics": [
    "Classification and Nomenclature of Haloalkanes and Haloarenes",
    "Nature of C–X Bond",
    "Preparation of Haloalkanes and Haloarenes",
    "SN1 and SN2 Mechanisms",
    "Elimination (E1 and E2) Reactions",
    "Reactivity and Selectivity",
    "Polyhalogen Compounds and Uses",
    "Environmental Effects (CFCs)"
  ],
  "learningObjectives": [
    "Write IUPAC names and classify haloalkanes and haloarenes.",
    "Describe methods of preparation and properties of halogen derivatives.",
    "Differentiate between SN1 and SN2 mechanisms.",
    "Explain elimination reactions and Saytzeff rule.",
    "Discuss uses and environmental hazards of important polyhalogen compounds."
  ],
  "questions": [
    {
      "id": "ms-12-chem-ch10-q1",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Which of the following is a primary haloalkane?",
      "options": ["2-bromopropane", "1-bromopropane", "2-bromobutane", "tert-butyl chloride"],
      "answer": "1-bromopropane",
      "tags": ["classification"]
    },
    {
      "id": "ms-12-chem-ch10-q2",
      "type": "short",
      "difficulty": "medium",
      "marks": 2,
      "text": "Write IUPAC name of CH₃–CH(Br)–CH₂–CH₃.",
      "answer": "2-bromobutane.",
      "tags": ["nomenclature"]
    },
    {
      "id": "ms-12-chem-ch10-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 2,
      "text": "What is Walden inversion?",
      "answer": "In SN2 reactions at a chiral carbon, the configuration inverts due to backside attack of nucleophile; this is called Walden inversion.",
      "tags": ["sn2"]
    },
    {
      "id": "ms-12-chem-ch10-q4",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 1,
      "text": "SN1 reactions are favoured by:",
      "options": ["Primary halides in polar protic solvents", "Tertiary halides in polar protic solvents", "Tertiary halides in non-polar solvents", "Primary halides in polar aprotic solvents"],
      "answer": "Tertiary halides in polar protic solvents",
      "tags": ["sn1"]
    },
    {
      "id": "ms-12-chem-ch10-q5",
      "type": "short",
      "difficulty": "medium",
      "marks": 2,
      "text": "State Saytzeff’s rule with an example.",
      "answer": "In dehydrohalogenation of haloalkanes, the major alkene formed is the one with greater number of alkyl substituents on doubly bonded carbon atoms. Example: 2-bromobutane gives mainly 2-butene.",
      "tags": ["elimination"]
    },
    {
      "id": "ms-12-chem-ch10-q6",
      "type": "long",
      "difficulty": "hard",
      "marks": 3,
      "text": "Explain the electrophilic substitution reactions of chlorobenzene.",
      "answer": "Chlorobenzene undergoes substitution such as nitration, sulphonation and halogenation. Cl is deactivating but o,p-directing. Reaction conditions are harsher than benzene due to −I effect of Cl.",
      "tags": ["haloarenes"]
    },
    {
      "id": "ms-12-chem-ch10-q7",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Which of these is a polyhalogen compound used as a refrigerant?",
      "options": ["Chloroform", "Carbon tetrachloride", "Freon-12", "Iodoform"],
      "answer": "Freon-12",
      "tags": ["polyhalogen"]
    },
    {
      "id": "ms-12-chem-ch10-q8",
      "type": "short",
      "difficulty": "medium",
      "marks": 2,
      "text": "Why are aryl halides less reactive towards nucleophilic substitution than alkyl halides?",
      "answer": "Due to partial double bond character of C–X bond because of resonance and because the carbon in ring is sp²-hybridized and holds halogen more strongly.",
      "tags": ["aryl-halides"]
    },
    {
      "id": "ms-12-chem-ch10-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 3,
      "text": "Differentiate between SN1 and SN2 mechanisms (any three points).",
      "answer": "SN1: two-step, carbocation intermediate, first order, favoured by tertiary halides and polar protic solvents, racemization at chiral centre. SN2: one-step, backside attack, second order, favoured by primary halides and polar aprotic solvents, Walden inversion.",
      "tags": ["sn1-vs-sn2"]
    },
    {
      "id": "ms-12-chem-ch10-q10",
      "type": "numerical",
      "difficulty": "hard",
      "marks": 3,
      "text": "A chiral haloalkane undergoes SN1 reaction. If the initial optical rotation is +20°, what will be the observed rotation if complete racemization occurs?",
      "answer": "For complete racemization, equal amounts of enantiomers are formed; net optical rotation becomes 0°.",
      "tags": ["optical-activity"]
    }
  ]
}, {
  "id": "ms-12-chem-ch11",
  "chapterNumber": 11,
  "title": "Alcohols, Phenols and Ethers",
  "slug": "alcohols-phenols-ethers",
  "description": "Nomenclature, preparation, physical and chemical properties of alcohols, phenols and ethers; acidity of alcohols and phenols; Williamson ether synthesis.",
  "topics": [
    "Classification and Nomenclature",
    "Preparation of Alcohols and Phenols",
    "Physical Properties and Hydrogen Bonding",
    "Reactions of Alcohols",
    "Acidity of Alcohols and Phenols",
    "Electrophilic Substitution in Phenols",
    "Structure and Reactions of Ethers",
    "Williamson Ether Synthesis"
  ],
  "learningObjectives": [
    "Name and classify alcohols, phenols and ethers.",
    "Describe methods of preparation of these compounds.",
    "Explain acidity of phenols and compare with alcohols.",
    "Discuss important reactions such as dehydration, oxidation and electrophilic substitution.",
    "Explain Williamson synthesis and cleavage of ethers."
  ],
  "questions": [
    {
      "id": "ms-12-chem-ch11-q1",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Which of the following will show highest boiling point?",
      "options": ["Ethanol", "Dimethyl ether", "Propane", "Chloroethane"],
      "answer": "Ethanol",
      "tags": ["physical-properties"]
    },
    {
      "id": "ms-12-chem-ch11-q2",
      "type": "short",
      "difficulty": "medium",
      "marks": 2,
      "text": "Give IUPAC name of (CH₃)₃C–OH.",
      "answer": "2-methylpropan-2-ol.",
      "tags": ["nomenclature"]
    },
    {
      "id": "ms-12-chem-ch11-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 2,
      "text": "Explain why phenol is more acidic than ethanol.",
      "answer": "Phenoxide ion formed after deprotonation is resonance-stabilized, whereas ethoxide ion is not; this makes phenol more acidic.",
      "tags": ["acidity"]
    },
    {
      "id": "ms-12-chem-ch11-q4",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 1,
      "text": "Dehydration of ethanol with conc. H₂SO₄ at 443 K gives mainly:",
      "options": ["Ethane", "Ethene", "Diethyl ether", "Acetaldehyde"],
      "answer": "Ethene",
      "tags": ["dehydration"]
    },
    {
      "id": "ms-12-chem-ch11-q5",
      "type": "short",
      "difficulty": "medium",
      "marks": 2,
      "text": "Write equation for Williamson synthesis of ethoxybenzene (phenetole).",
      "answer": "C₂H₅Br + C₆H₅O⁻Na⁺ → C₆H₅–O–C₂H₅ + NaBr.",
      "tags": ["williamson"]
    },
    {
      "id": "ms-12-chem-ch11-q6",
      "type": "long",
      "difficulty": "hard",
      "marks": 3,
      "text": "Describe electrophilic substitution reactions of phenol.",
      "answer": "Phenol undergoes nitration, halogenation and sulphonation more readily than benzene due to +M effect of –OH. It is o,p-directing: nitration gives o- and p-nitrophenols; bromination gives 2,4,6-tribromophenol in absence of solvent.",
      "tags": ["phenol-reactions"]
    },
    {
      "id": "ms-12-chem-ch11-q7",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Which reagent is used to distinguish primary, secondary and tertiary alcohols?",
      "options": ["Lucas reagent", "Tollen’s reagent", "Fehling’s solution", "Bromine water"],
      "answer": "Lucas reagent",
      "tags": ["tests"]
    },
    {
      "id": "ms-12-chem-ch11-q8",
      "type": "short",
      "difficulty": "medium",
      "marks": 2,
      "text": "What happens when anisole reacts with HI?",
      "answer": "Anisole undergoes cleavage to give phenol and iodomethane: C₆H₅–O–CH₃ + HI → C₆H₅–OH + CH₃I.",
      "tags": ["ether-cleavage"]
    },
    {
      "id": "ms-12-chem-ch11-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 3,
      "text": "Explain oxidation reactions of primary and secondary alcohols.",
      "answer": "Primary alcohols oxidize to aldehydes and further to acids (e.g., ethanol → ethanal → ethanoic acid). Secondary alcohols oxidize to ketones (e.g., isopropanol → acetone). Tertiary alcohols resist oxidation under mild conditions.",
      "tags": ["oxidation"]
    },
    {
      "id": "ms-12-chem-ch11-q10",
      "type": "numerical",
      "difficulty": "hard",
      "marks": 3,
      "text": "0.92 g of ethanol is completely burned. Calculate moles of CO₂ formed. (Molar mass of ethanol = 46 g mol⁻¹).",
      "answer": "Moles of ethanol = 0.92/46 = 0.02 mol. Combustion: C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O. Moles of CO₂ = 2 × 0.02 = 0.04 mol.",
      "tags": ["stoichiometry"]
    }
  ]
}, {
  "id": "ms-12-chem-ch12",
  "chapterNumber": 12,
  "title": "Aldehydes, Ketones and Carboxylic acids",
  "slug": "aldehydes-ketones-carboxylic-acids",
  "description": "Nomenclature, preparation and reactions of aldehydes, ketones and carboxylic acids; nucleophilic addition, oxidation–reduction and strength of acids.",
  "topics": [
    "Nomenclature and Structure of Carbonyl Group",
    "Preparation of Aldehydes and Ketones",
    "Nucleophilic Addition Reactions",
    "Oxidation and Reduction",
    "Reactivity of Aldehydes versus Ketones",
    "Preparation and Properties of Carboxylic Acids",
    "Acidity of Carboxylic Acids",
    "Important Reactions (esterification, decarboxylation)"
  ],
  "learningObjectives": [
    "Write IUPAC names and structures of aldehydes, ketones and carboxylic acids.",
    "Explain nucleophilic addition reactions of carbonyl compounds.",
    "Compare reactivity of aldehydes and ketones.",
    "Describe methods of preparation and reactions of carboxylic acids.",
    "Explain factors affecting acidity of carboxylic acids."
  ],
  "questions": [
    {
      "id": "ms-12-chem-ch12-q1",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "The functional group present in aldehydes is:",
      "options": ["–CO–", "–CHO", "–COOH", "–COOR"],
      "answer": "–CHO",
      "tags": ["functional-groups"]
    },
    {
      "id": "ms-12-chem-ch12-q2",
      "type": "short",
      "difficulty": "medium",
      "marks": 2,
      "text": "Give IUPAC name of CH₃–CO–CH₃.",
      "answer": "Propan-2-one (acetone).",
      "tags": ["nomenclature"]
    },
    {
      "id": "ms-12-chem-ch12-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 2,
      "text": "State any two differences between aldehydes and ketones.",
      "answer": "Aldehydes have –CHO group at end of chain while ketones have >C=O within chain; aldehydes are generally more reactive and are easily oxidized to acids, whereas ketones resist oxidation.",
      "tags": ["aldehyde-vs-ketone"]
    },
    {
      "id": "ms-12-chem-ch12-q4",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 1,
      "text": "Benedict’s solution is used to distinguish:",
      "options": ["Alcohols and phenols", "Aldehydes and ketones", "Acids and esters", "Primary and secondary alcohols"],
      "answer": "Aldehydes and ketones",
      "tags": ["tests"]
    },
    {
      "id": "ms-12-chem-ch12-q5",
      "type": "short",
      "difficulty": "medium",
      "marks": 2,
      "text": "Write the reaction of acetaldehyde with hydrogen cyanide.",
      "answer": "CH₃–CHO + HCN → CH₃–CH(OH)–CN (cyanohydrin).",
      "tags": ["nucleophilic-addition"]
    },
    {
      "id": "ms-12-chem-ch12-q6",
      "type": "long",
      "difficulty": "hard",
      "marks": 3,
      "text": "Explain the mechanism of nucleophilic addition to the carbonyl group.",
      "answer": "First, nucleophile attacks electrophilic carbon of C=O, forming a tetrahedral intermediate. Then protonation of oxygen (or deprotonation of nucleophile) occurs to give addition product. Polarization of C=O makes carbon susceptible to nucleophilic attack.",
      "tags": ["mechanism"]
    },
    {
      "id": "ms-12-chem-ch12-q7",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "The reaction of carboxylic acid with alcohol in presence of conc. H₂SO₄ is called:",
      "options": ["Hydrolysis", "Esterification", "Decarboxylation", "Reduction"],
      "answer": "Esterification",
      "tags": ["esterification"]
    },
    {
      "id": "ms-12-chem-ch12-q8",
      "type": "short",
      "difficulty": "medium",
      "marks": 2,
      "text": "Why are carboxylic acids stronger acids than alcohols?",
      "answer": "Carboxylate ion is resonance-stabilized with negative charge delocalized over two oxygen atoms, whereas alkoxide ion is not; this stabilizes conjugate base and increases acidity.",
      "tags": ["acid-strength"]
    },
    {
      "id": "ms-12-chem-ch12-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 3,
      "text": "Explain Hell–Volhard–Zelinsky (HVZ) reaction.",
      "answer": "HVZ reaction is α-halogenation of carboxylic acids. Carboxylic acid is converted to its acyl halide with PCl₃/Cl₂, then halogen substitutes α-hydrogen, followed by hydrolysis to give α-halo acid.",
      "tags": ["hvz"]
    },
    {
      "id": "ms-12-chem-ch12-q10",
      "type": "numerical",
      "difficulty": "hard",
      "marks": 3,
      "text": "0.1 mol of acetic acid is neutralized by NaOH releasing 5.7 kJ heat. Calculate molar enthalpy of neutralization.",
      "answer": "ΔHneutralization = −5.7 kJ / 0.1 mol = −57 kJ mol⁻¹.",
      "tags": ["enthalpy"]
    }
  ]
}, {
  "id": "ms-12-chem-ch13",
  "chapterNumber": 13,
  "title": "Amines",
  "slug": "amines",
  "description": "Classification, nomenclature, methods of preparation, basic character, reactions and identification of primary, secondary and tertiary amines.",
  "topics": [
    "Classification and Nomenclature of Amines",
    "Preparation of Amines",
    "Physical Properties",
    "Basicity of Amines and Factors Affecting It",
    "Reactions: Alkylation, Acylation, Carbylamine, Diazotization",
    "Aromatic Diazonium Salts and Their Reactions",
    "Distinction between Primary, Secondary and Tertiary Amines"
  ],
  "learningObjectives": [
    "Classify and name aliphatic and aromatic amines.",
    "Describe various methods of preparation of amines.",
    "Explain basic nature of amines and compare strengths.",
    "Discuss important reactions including diazotization and coupling.",
    "Use chemical tests to distinguish different classes of amines."
  ],
  "questions": [
    {
      "id": "ms-12-chem-ch13-q1",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Which of the following is a secondary amine?",
      "options": ["CH₃NH₂", "(CH₃)₂NH", "(CH₃)₃N", "C₆H₅NH₂"],
      "answer": "(CH₃)₂NH",
      "tags": ["classification"]
    },
    {
      "id": "ms-12-chem-ch13-q2",
      "type": "short",
      "difficulty": "medium",
      "marks": 2,
      "text": "Write IUPAC name of aniline.",
      "answer": "Benzenamine.",
      "tags": ["nomenclature"]
    },
    {
      "id": "ms-12-chem-ch13-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 2,
      "text": "State carbylamine reaction.",
      "answer": "Primary amines on heating with chloroform and alcoholic KOH form isocyanides (carbylamines) with foul smell; used as a test for primary amines.",
      "tags": ["carbylamine"]
    },
    {
      "id": "ms-12-chem-ch13-q4",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 1,
      "text": "Which amine is most basic in aqueous solution?",
      "options": ["NH₃", "C₂H₅NH₂", "(C₂H₅)₂NH", "Aniline"],
      "answer": "(C₂H₅)₂NH",
      "tags": ["basicity"]
    },
    {
      "id": "ms-12-chem-ch13-q5",
      "type": "short",
      "difficulty": "medium",
      "marks": 2,
      "text": "What is diazotization? Write equation for diazotization of aniline.",
      "answer": "Conversion of primary aromatic amine into diazonium salt with nitrous acid at low temperature. C₆H₅NH₂ + HNO₂ + HCl → C₆H₅N₂⁺Cl⁻ + 2H₂O.",
      "tags": ["diazotization"]
    },
    {
      "id": "ms-12-chem-ch13-q6",
      "type": "long",
      "difficulty": "hard",
      "marks": 3,
      "text": "Explain why aniline is less basic than ethylamine.",
      "answer": "In aniline, lone pair on nitrogen is delocalized into benzene ring by resonance, reducing availability for protonation. In ethylamine, lone pair is localized and +I effect of ethyl group increases electron density, making it more basic.",
      "tags": ["basicity-comparison"]
    },
    {
      "id": "ms-12-chem-ch13-q7",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Which reagent is used to distinguish primary, secondary and tertiary amines?",
      "options": ["HNO₂", "Grignard reagent", "Lucas reagent", "FeCl₃"],
      "answer": "HNO₂",
      "tags": ["distinction"]
    },
    {
      "id": "ms-12-chem-ch13-q8",
      "type": "short",
      "difficulty": "medium",
      "marks": 2,
      "text": "What is coupling reaction of diazonium salts?",
      "answer": "Aromatic diazonium salts react with phenols or aromatic amines to form azo compounds with –N=N– linkage, often coloured dyes.",
      "tags": ["coupling"]
    },
    {
      "id": "ms-12-chem-ch13-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 3,
      "text": "Explain Gabriel phthalimide synthesis for preparation of primary amines.",
      "answer": "Phthalimide reacts with alcoholic KOH to form potassium salt, which undergoes nucleophilic substitution with alkyl halide to form N-alkyl phthalimide. Hydrolysis of this gives primary amine and phthalic acid.",
      "tags": ["gabriel"]
    },
    {
      "id": "ms-12-chem-ch13-q10",
      "type": "numerical",
      "difficulty": "hard",
      "marks": 3,
      "text": "0.93 g of an amine neutralizes 0.1 mol of HCl. Determine molar mass of the amine assuming it is monobasic.",
      "answer": "If it neutralizes 0.1 mol HCl, moles of amine = 0.1 mol. Molar mass = 0.93 / 0.1 = 9.3 g mol⁻¹ (hypothetical example for calculation practice).",
      "tags": ["stoichiometry"]
    }
  ]
}, {
  "id": "ms-12-chem-ch14",
  "chapterNumber": 14,
  "title": "Biomolecules",
  "slug": "biomolecules",
  "description": "Carbohydrates, amino acids, proteins, vitamins and nucleic acids – their classification, structure and biological importance.",
  "topics": [
    "Classification of Carbohydrates",
    "Monosaccharides: Glucose and Fructose",
    "Disaccharides and Polysaccharides",
    "Amino Acids and Peptides",
    "Structure and Levels of Proteins",
    "Vitamins and Their Deficiency Diseases",
    "Nucleic Acids: DNA and RNA",
    "Enzymes as Biocatalysts"
  ],
  "learningObjectives": [
    "Classify carbohydrates and represent monosaccharides using Fischer and Haworth projections.",
    "Explain structure of amino acids and formation of peptides.",
    "Describe different levels of protein structure.",
    "Differentiate between DNA and RNA in structure and function.",
    "Explain role of vitamins and enzymes in biological systems."
  ],
  "questions": [
    {
      "id": "ms-12-chem-ch14-q1",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Glucose is an example of:",
      "options": ["Monosaccharide", "Disaccharide", "Polysaccharide", "Oligosaccharide"],
      "answer": "Monosaccharide",
      "tags": ["carbohydrates"]
    },
    {
      "id": "ms-12-chem-ch14-q2",
      "type": "short",
      "difficulty": "medium",
      "marks": 2,
      "text": "What is an essential amino acid?",
      "answer": "Amino acid that cannot be synthesized by the human body and must be supplied through diet is called essential amino acid.",
      "tags": ["amino-acids"]
    },
    {
      "id": "ms-12-chem-ch14-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 2,
      "text": "Define peptide bond.",
      "answer": "Peptide bond is an amide linkage formed between –COOH group of one amino acid and –NH₂ group of another with elimination of water (–CO–NH–).",
      "tags": ["peptides"]
    },
    {
      "id": "ms-12-chem-ch14-q4",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 1,
      "text": "Which of the following is a storage polysaccharide in animals?",
      "options": ["Cellulose", "Starch", "Glycogen", "Chitin"],
      "answer": "Glycogen",
      "tags": ["polysaccharides"]
    },
    {
      "id": "ms-12-chem-ch14-q5",
      "type": "long",
      "difficulty": "hard",
      "marks": 3,
      "text": "Explain primary, secondary and tertiary structure of proteins.",
      "answer": "Primary: linear sequence of amino acids. Secondary: regular folding into α-helix or β-pleated sheet due to hydrogen bonding. Tertiary: further folding into specific 3D shape stabilized by H-bonds, disulphide bonds, hydrophobic interactions and ionic interactions.",
      "tags": ["protein-structure"]
    },
    {
      "id": "ms-12-chem-ch14-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 2,
      "text": "Name the vitamin whose deficiency causes scurvy and give its chemical name.",
      "answer": "Vitamin C; chemical name ascorbic acid.",
      "tags": ["vitamins"]
    },
    {
      "id": "ms-12-chem-ch14-q7",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "The sugar present in RNA is:",
      "options": ["Glucose", "Deoxyribose", "Ribose", "Fructose"],
      "answer": "Ribose",
      "tags": ["rna"]
    },
    {
      "id": "ms-12-chem-ch14-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 3,
      "text": "Differentiate between DNA and RNA (any three points).",
      "answer": "DNA has deoxyribose sugar, RNA has ribose. DNA contains bases A, G, C, T while RNA has A, G, C, U. DNA is double stranded helix, RNA usually single stranded. DNA is genetic material; RNA involved in protein synthesis.",
      "tags": ["dna-vs-rna"]
    },
    {
      "id": "ms-12-chem-ch14-q9",
      "type": "short",
      "difficulty": "medium",
      "marks": 2,
      "text": "What is an enzyme? Mention any one characteristic.",
      "answer": "Enzymes are biocatalysts which speed up biochemical reactions. They are highly specific for substrate and work under mild conditions.",
      "tags": ["enzymes"]
    },
    {
      "id": "ms-12-chem-ch14-q10",
      "type": "numerical",
      "difficulty": "hard",
      "marks": 3,
      "text": "If a tripeptide is made from three different amino acids A, B and C, how many different sequences are possible?",
      "answer": "Number of permutations of 3 different amino acids = 3! = 6 sequences.",
      "tags": ["combinatorics"]
    }
  ]
}, {
  "id": "ms-12-chem-ch15",
  "chapterNumber": 15,
  "title": "Introduction to Polymer Chemistry",
  "slug": "polymer-chemistry",
  "description": "Classification of polymers, addition and condensation polymerization, natural and synthetic polymers, properties and uses of important polymers and biodegradable polymers.",
  "topics": [
    "Definition and Classification of Polymers",
    "Types Based on Source and Structure",
    "Addition and Condensation Polymerization",
    "Natural Rubber and Vulcanization",
    "Synthetic Fibres and Plastics",
    "Thermoplastics and Thermosetting Polymers",
    "Copolymers and Biodegradable Polymers"
  ],
  "learningObjectives": [
    "Classify polymers on different bases such as source, structure and mode of polymerization.",
    "Differentiate between addition and condensation polymerization.",
    "Explain preparation and properties of important polymers like PVC, teflon, nylon and bakelite.",
    "Describe vulcanization of rubber and its advantages.",
    "Discuss significance of biodegradable polymers."
  ],
  "questions": [
    {
      "id": "ms-12-chem-ch15-q1",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "The polymer of tetrafluoroethene is known as:",
      "options": ["PVC", "Polystyrene", "Teflon", "Bakelite"],
      "answer": "Teflon",
      "tags": ["polymers"]
    },
    {
      "id": "ms-12-chem-ch15-q2",
      "type": "short",
      "difficulty": "medium",
      "marks": 2,
      "text": "Define monomer and give one example.",
      "answer": "Monomer is a small molecule that combines with similar molecules to form a polymer; e.g., ethene is monomer of polyethene.",
      "tags": ["monomer"]
    },
    {
      "id": "ms-12-chem-ch15-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 2,
      "text": "Differentiate between thermoplastics and thermosetting plastics.",
      "answer": "Thermoplastics soften on heating and can be reshaped; thermosetting plastics harden permanently on heating and cannot be remoulded.",
      "tags": ["plastics"]
    },
    {
      "id": "ms-12-chem-ch15-q4",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 1,
      "text": "Which of the following is a condensation polymer?",
      "options": ["Polyethene", "Teflon", "Nylon-6,6", "Polystyrene"],
      "answer": "Nylon-6,6",
      "tags": ["condensation-polymer"]
    },
    {
      "id": "ms-12-chem-ch15-q5",
      "type": "long",
      "difficulty": "hard",
      "marks": 3,
      "text": "Explain vulcanization of rubber.",
      "answer": "Natural rubber is heated with sulphur and accelerators. Sulphur forms cross-links between polyisoprene chains, increasing elasticity, tensile strength and resistance to temperature changes.",
      "tags": ["vulcanization"]
    },
    {
      "id": "ms-12-chem-ch15-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 2,
      "text": "What is a copolymer? Give one example.",
      "answer": "Polymer formed from two or more different monomers is copolymer; e.g., Buna-S from butadiene and styrene.",
      "tags": ["copolymer"]
    },
    {
      "id": "ms-12-chem-ch15-q7",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Which of the following is a biodegradable polymer?",
      "options": ["PVC", "PHBV", "Teflon", "Bakelite"],
      "answer": "PHBV",
      "tags": ["biodegradable"]
    },
    {
      "id": "ms-12-chem-ch15-q8",
      "type": "short",
      "difficulty": "medium",
      "marks": 2,
      "text": "State any two disadvantages of synthetic polymers.",
      "answer": "They are often non-biodegradable causing environmental pollution; burning them may release toxic gases.",
      "tags": ["environment"]
    },
    {
      "id": "ms-12-chem-ch15-q9",
      "type": "long",
      "difficulty": "hard",
      "marks": 3,
      "text": "Describe the preparation and uses of bakelite.",
      "answer": "Bakelite is formed by condensation polymerization of phenol and formaldehyde in presence of acid or base catalyst, followed by cross-linking. It is a thermosetting plastic used in electrical switches, plugs, handles of utensils etc.",
      "tags": ["bakelite"]
    },
    {
      "id": "ms-12-chem-ch15-q10",
      "type": "numerical",
      "difficulty": "hard",
      "marks": 3,
      "text": "If the average degree of polymerization of a polymer sample is 1000 and molecular mass of its monomer is 28 g mol⁻¹, calculate the approximate molecular mass of the polymer.",
      "answer": "Molecular mass of polymer ≈ 1000 × 28 = 2.8 × 10⁴ g mol⁻¹.",
      "tags": ["degree-polymerization"]
    }
  ]
}, {
  "id": "ms-12-chem-ch16",
  "chapterNumber": 16,
  "title": "Green Chemistry and Nanochemistry",
  "slug": "green-chemistry-nanochemistry",
  "description": "Principles of green chemistry, sustainable development, introduction to nanoscience and nanomaterials, methods of synthesis and applications.",
  "topics": [
    "Concept and Need of Green Chemistry",
    "Twelve Principles of Green Chemistry",
    "Alternative Green Solvents and Catalysts",
    "Atom Economy and Waste Minimization",
    "Introduction to Nanochemistry and Nanomaterials",
    "Top-down and Bottom-up Approaches",
    "Properties of Nanomaterials",
    "Applications and Risks of Nanotechnology"
  ],
  "learningObjectives": [
    "Explain the concept and importance of green chemistry.",
    "State and illustrate twelve principles of green chemistry.",
    "Describe atom economy and its calculation.",
    "Explain basic methods for synthesis of nanomaterials.",
    "Discuss unique properties and applications of nanomaterials with awareness of safety aspects."
  ],
  "questions": [
    {
      "id": "ms-12-chem-ch16-q1",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Green chemistry aims primarily at:",
      "options": [
        "Maximizing profit only",
        "Minimizing use and generation of hazardous substances",
        "Increasing complexity of reactions",
        "Using more toxic reagents"
      ],
      "answer": "Minimizing use and generation of hazardous substances",
      "tags": ["green-chemistry"]
    },
    {
      "id": "ms-12-chem-ch16-q2",
      "type": "short",
      "difficulty": "medium",
      "marks": 2,
      "text": "What is atom economy?",
      "answer": "Atom economy is the percentage of reactant atoms that are incorporated into the desired product; it is calculated as (molar mass of desired product / sum of molar masses of all reactants) × 100.",
      "tags": ["atom-economy"]
    },
    {
      "id": "ms-12-chem-ch16-q3",
      "type": "short",
      "difficulty": "medium",
      "marks": 2,
      "text": "Name any two green solvents.",
      "answer": "Water, supercritical CO₂, ionic liquids (any two).",
      "tags": ["green-solvents"]
    },
    {
      "id": "ms-12-chem-ch16-q4",
      "type": "mcq",
      "difficulty": "medium",
      "marks": 1,
      "text": "Which of the following is a bottom-up approach in nanomaterial synthesis?",
      "options": ["Ball milling", "Lithography", "Sol–gel method", "Mechanical grinding"],
      "answer": "Sol–gel method",
      "tags": ["nanochemistry"]
    },
    {
      "id": "ms-12-chem-ch16-q5",
      "type": "long",
      "difficulty": "hard",
      "marks": 3,
      "text": "Write any four principles of green chemistry and explain them briefly.",
      "answer": "Examples: (i) Prevention: better to prevent waste than treat it. (ii) Atom economy: design processes maximizing incorporation of materials into product. (iii) Use of safer solvents and auxiliaries. (iv) Energy efficiency: conduct reactions at ambient temperature and pressure when possible.",
      "tags": ["principles"]
    },
    {
      "id": "ms-12-chem-ch16-q6",
      "type": "short",
      "difficulty": "medium",
      "marks": 2,
      "text": "What are nanomaterials? Give typical size range.",
      "answer": "Materials with at least one dimension in the nanometer range, typically 1–100 nm, are called nanomaterials.",
      "tags": ["nanomaterials"]
    },
    {
      "id": "ms-12-chem-ch16-q7",
      "type": "mcq",
      "difficulty": "easy",
      "marks": 1,
      "text": "Unique properties of nanomaterials are mainly due to:",
      "options": ["Lower density", "Higher atomic mass", "Large surface area to volume ratio and quantum effects", "High melting point"],
      "answer": "Large surface area to volume ratio and quantum effects",
      "tags": ["nano-properties"]
    },
    {
      "id": "ms-12-chem-ch16-q8",
      "type": "long",
      "difficulty": "hard",
      "marks": 3,
      "text": "Explain any three applications of nanomaterials.",
      "answer": "Applications: (i) In medicine for targeted drug delivery and imaging. (ii) In electronics for smaller, faster devices using nanotubes and quantum dots. (iii) In catalysis, nanoparticles offer high surface area and improved activity in environmental remediation.",
      "tags": ["nano-applications"]
    },
    {
      "id": "ms-12-chem-ch16-q9",
      "type": "short",
      "difficulty": "medium",
      "marks": 2,
      "text": "Give one example of a green chemistry practice in industry.",
      "answer": "Use of supercritical CO₂ as a solvent instead of organic solvents in dry cleaning or extraction processes is a green practice.",
      "tags": ["green-practice"]
    },
    {
      "id": "ms-12-chem-ch16-q10",
      "type": "numerical",
      "difficulty": "hard",
      "marks": 3,
      "text": "In a reaction A + 2B → C + D, total molar mass of reactants is 150 g and that of desired product C is 90 g. Calculate atom economy.",
      "answer": "Atom economy = (90 / 150) × 100 = 60%.",
      "tags": ["atom-economy"]
    }
  ]
}
  ]
},

  // MSBSHSE Class 11 – Science – Physics
  {
    board: "msbshse",
    medium: "all",
    classKey: "11-science",
    subjectSlug: "physics",
    chapters: [
      {
        id: "ms-11-phy-ch1",
        chapterNumber: 1,
        title: "Units and Measurements",
        slug: slugify("Units and Measurements"),
        description:
          "Fundamental and derived units, measurement of physical quantities.",
        topics: ["SI units", "Significant figures", "Dimensional analysis"],
        learningObjectives: [
          "Recall base and derived units in SI",
          "Solve problems using dimensional analysis",
        ],
        questions: [
          {
            id: qId("ms-11-phy-ch1", 0),
            type: "mcq",
            difficulty: "easy",
            marks: 1,
            text: "Which of the following is NOT a base quantity in SI?",
            options: ["Length", "Mass", "Time", "Velocity"],
            answer: "Velocity",
            tags: ["units"],
          },
        ],
      },
    ],
  },

  // MSBSHSE Class 12 – Commerce – Accountancy
  {
    board: "msbshse",
    medium: "all",
    classKey: "12-commerce",
    subjectSlug: "accountancy",
    chapters: [
      {
        id: "ms-12-acct-ch1",
        chapterNumber: 1,
        title: "Partnership Final Accounts",
        slug: slugify("Partnership Final Accounts"),
        description: "Preparation of final accounts of partnership firms.",
        topics: ["Profit & Loss Appropriation", "Partners' capital accounts"],
        learningObjectives: [
          "Prepare profit and loss appropriation account",
          "Understand adjustments related to partners",
        ],
        questions: [
          {
            id: qId("ms-12-acct-ch1", 0),
            type: "long",
            difficulty: "hard",
            marks: 8,
            text:
              "A and B are partners sharing profits in the ratio of 3:2. Prepare Profit & Loss Appropriation Account given suitable figures and adjustments.",
            tags: ["final-accounts", "partnership"],
          },
        ],
      },
    ],
  },

  // ===========================================================================
  // CBSE – English Medium – Example: 10th Maths, 12th Science Physics
  // ===========================================================================

  // CBSE Class 10 – Mathematics
  {
    board: "cbse",
    medium: "english",
    classKey: "10",
    subjectSlug: "mathematics",
    chapters: [
      {
        id: "cbse-10-maths-ch1",
        chapterNumber: 1,
        title: "Real Numbers",
        slug: slugify("Real Numbers"),
        description: "Number system, Euclid’s division lemma and applications.",
        topics: ["Euclid's division lemma", "HCF & LCM", "Irrational numbers"],
        learningObjectives: [
          "Apply Euclid's division lemma to find HCF",
          "Understand representation of irrational numbers",
        ],
        questions: [
          {
            id: qId("cbse-10-maths-ch1", 0),
            type: "short",
            difficulty: "medium",
            marks: 3,
            text: "Use Euclid's division lemma to find the HCF of 56 and 96.",
            answer: "8",
            tags: ["hcf", "euclid-lemma"],
          },
          {
            id: qId("cbse-10-maths-ch1", 1),
            type: "true-false",
            difficulty: "easy",
            marks: 1,
            text: "√3 is a rational number. True or False?",
            options: ["True", "False"],
            answer: "False",
            explanation: "√3 cannot be expressed as p/q, so it is irrational.",
            tags: ["irrational"],
          },
        ],
      },
    ],
  },

  // CBSE Class 12 – Science – Physics
  {
    board: "cbse",
    medium: "english",
    classKey: "12-science",
    subjectSlug: "physics",
    chapters: [
      {
        id: "cbse-12-phy-ch1",
        chapterNumber: 1,
        title: "Electric Charges and Fields",
        slug: slugify("Electric Charges and Fields"),
        description: "Basics of electrostatics, Coulomb's law, electric field.",
        topics: [
          "Electric charge",
          "Coulomb's law",
          "Electric field and field lines",
        ],
        learningObjectives: [
          "State and apply Coulomb's law",
          "Define electric field intensity",
        ],
        questions: [
          {
            id: qId("cbse-12-phy-ch1", 0),
            type: "mcq",
            difficulty: "easy",
            marks: 1,
            text: "SI unit of electric charge is:",
            options: ["Coulomb", "Ampere", "Volt", "Ohm"],
            answer: "Coulomb",
            tags: ["units", "electrostatics"],
          },
          {
            id: qId("cbse-12-phy-ch1", 1),
            type: "long",
            difficulty: "hard",
            marks: 5,
            text:
              "State Coulomb's law in electrostatics and explain the vector form of the law.",
            tags: ["derivation", "theory"],
          },
        ],
      },
    ],
  },

  // ===========================================================================
  // CBSE – Hindi Medium – Example: Class 9 Science
  // ===========================================================================
  {
    board: "cbse",
    medium: "hindi",
    classKey: "9",
    subjectSlug: "विज्ञान-science",
    chapters: [
      {
        id: "cbse-9-sci-hindi-ch1",
        chapterNumber: 1,
        title: "हमारा आस-पास का पदार्थ (Matter in Our Surroundings)",
        slug: slugify("Matter in Our Surroundings"),
        description: "पदार्थ की अवस्थाएँ, ठोस, द्रव और गैस की विशेषताएँ।",
        topics: ["ठोस, द्रव, गैस", "पदार्थ की अवस्था परिवर्तन"],
        learningObjectives: [
          "पदार्थ की तीन अवस्थाओं की व्याख्या करना",
          "तापमान और दाब के प्रभाव को समझना",
        ],
        questions: [
          {
            id: qId("cbse-9-sci-hindi-ch1", 0),
            type: "short",
            difficulty: "easy",
            marks: 2,
            text: "ठोस और द्रव के बीच दो अंतर लिखिए।",
            tags: ["basic", "states-of-matter"],
          },
        ],
      },
    ],
  },
];

// -----------------------------------------------------------------------------
// HELPERS
// -----------------------------------------------------------------------------

/**
 * Get all chapters for a given board + medium + class + subjectSlug
 * Falls back to medium "all" for that board if exact medium not found.
 */
export const getChaptersFor = (
  board: BoardSlug,
  medium: MediumSlug,
  classKey: ClassKey,
  subjectSlug: string
): Chapter[] => {
  // Try exact (board + medium + class + subject)
  const exact = SUBJECT_CHAPTERS.find(
    (entry) =>
      entry.board === board &&
      entry.medium === medium &&
      entry.classKey === classKey &&
      entry.subjectSlug === subjectSlug
  );
  if (exact) return exact.chapters;

  // Fallback: "all" mediums for that board
  const fallback = SUBJECT_CHAPTERS.find(
    (entry) =>
      entry.board === board &&
      entry.medium === "all" &&
      entry.classKey === classKey &&
      entry.subjectSlug === subjectSlug
  );
  return fallback ? fallback.chapters : [];
};

/**
 * Get a single chapter by its slug
 */
export const getChapterBySlug = (
  board: BoardSlug,
  medium: MediumSlug,
  classKey: ClassKey,
  subjectSlug: string,
  chapterSlug: string
): Chapter | undefined => {
  const chapters = getChaptersFor(board, medium, classKey, subjectSlug);
  return chapters.find((ch) => ch.slug === chapterSlug);
};
