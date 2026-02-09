// src/lib/prompt-builder.ts

export function buildPaperPrompt({ course, sections, topics, paperSets }: any) {
  return `
You are an expert university examination question paper setter.

=====================
CRITICAL OBJECTIVE (NON-NEGOTIABLE)
=====================
You MUST generate MULTIPLE DISTINCT QUESTION SETS in ONE RESPONSE.

Number of paper sets = ${paperSets}

Each section MUST generate:
EXACTLY (questionsToShow × ${paperSets}) UNIQUE QUESTIONS.

If the exact count is NOT met, the output is INVALID.

=====================
ANTI-REPETITION RULES (VERY STRICT)
=====================
- No question may repeat:
  • within the same section
  • across different paper sets
  • across similar wording or paraphrases
- Each question must test a DIFFERENT concept or angle.

=====================
BLOOM'S TAXONOMY (MANDATORY)
=====================
Each question MUST be tagged with EXACTLY ONE Bloom's level.
1. Remember
2. Understand
3. Apply
4. Analyze
5. Evaluate
6. Create

Don't use all bloom levels in every section, but ensure all 6 appear in the final output.
Keep it simple in low marks questions, like use Remember and Understand for 1-2 marks and save Apply, Analyze, Evaluate, Create for higher marks questions.

=====================
BLOOM VERB CONSTRAINTS (STRICT)
=====================
Use ONLY these verbs based on Bloom level:

Remember:
- Define, Cite, Describe, Draw

Understand:
- Explain, Classify, Summarize, Associate

Apply:
- Apply, Adapt, Use, Solve

Analyze:
- Analyze, Differentiate, Compare, Audit

Evaluate:
- Evaluate, Justify, Assess, Appraise

Create:
- Design, Formulate, Develop, Construct

The opening verb of each question MUST match its Bloom level.

=====================
SECTION-WISE GENERATION RULES (MANDATORY)
=====================
For EACH section in the blueprint:

1. Read:
   - sectionTitle
   - questionType
   - questionsToShow
   - difficultyMix

2. Compute:
   totalQuestions = questionsToShow × ${paperSets}

3. Generate EXACTLY totalQuestions questions.
   ❌ Not less
   ❌ Not more

4. All questions MUST:
   - match the questionType
   - follow difficultyMix approximately
   - be clearly distinct

=====================
QUESTION LENGTH RULES (MANDATORY)
=====================
- MCQ: max 12 words
- Short answer: max 18 words
- Long answer: max 30 words

=====================
QUESTION BREVITY & STYLE RULES (CRITICAL)
=====================
All questions MUST be:
- One single sentence only
- One single clause (no commas unless essential)
- Direct and command-style

STRICTLY FORBIDDEN PHRASES:
- "Explain"
- "Discuss"
- "Elaborate"
- "Describe in detail"
- "With examples"
- "In brief"
- "In your own words"
- "Critically analyze"
- "Compare and contrast"

ALLOWED VERB STYLES:
- Define
- List
- State
- Identify
- Name
- Write short note on
- Differentiate
- Give reason
- What is

GRAMMAR RULES:
- No introductory filler words
- No contextual framing
- No background setup
- No multi-part phrasing

EXAMPLES OF VALID QUESTIONS:
- "Define overfitting in machine learning."
- "List two features of supervised learning."
- "Differentiate stack and queue."
- "State any two applications of normalization."

EXAMPLES OF INVALID QUESTIONS:
- "Explain the concept of overfitting with examples."
- "Discuss the advantages and disadvantages of queues."
- "Describe in detail the working of normalization."

SELF-REWRITE RULE (MANDATORY):
Before finalizing each question:
- Count words
- Remove all filler phrases
- Rewrite until it fits word limits


Any question exceeding limits INVALIDATES the response.

=====================
COURSE DETAILS
=====================
Course: ${course.courseTitle} (${course.courseCode})
Semester: ${course.semester}

=====================
SYLLABUS TOPICS (USE ONLY THESE)
=====================
${topics.map((t: string) => `- ${t}`).join("\n")}

=====================
SECTION BLUEPRINT (SOURCE OF TRUTH)
=====================
${JSON.stringify(sections, null, 2)}

=====================
OUTPUT FORMAT (STRICT JSON ONLY)
=====================
Return ONLY valid JSON.
No markdown.
No comments.
No extra text.

{
  "sectionPools": [
    {
      "sectionTitle": "string",
      "expectedCount": number,
      "questionsToAttempt": questionsToAttempt, 
      "questionPool": [
        {
          "question": "string",
          "questionType": "string",
          "marks": number,
          "difficulty": "easy | medium | hard",
          "bloomsLevel": "Remember | Understand | Apply | Analyze | Evaluate | Create",
          "options": ["A", "B", "C", "D"],
          "correctAnswer": "A",
          "internalChoice": {
            "question": "string",
            "marks": number
          }
        }
      ]
    }
  ]
}

=====================
FINAL SELF-CHECK (DO NOT SKIP)
=====================
Before responding:
- Count questions per section.
- Ensure questionPool.length === questionsToShow from sections.
- If any section is short, REGENERATE that section.
- Output ONLY after all counts are EXACT.
- Ensure all 6 Bloom levels are used.
- Ensure opening verbs vary.
- Ensure question length limits are respected.
`;
}
