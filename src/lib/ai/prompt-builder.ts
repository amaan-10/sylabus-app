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

Keep it simple in low marks questions, like use Remember and Understand for 1-2 marks and save Apply, Analyze for higher marks questions and Evaluate, Create should be used rarely.

=====================
BLOOM VERB CONSTRAINTS (STRICT)
=====================
Use ONLY these verbs based on Bloom level:

Remember:
- Write, Define, Describe, Enumerate, Identify, Label, Match, Name, Read, Recognize, State, Study

Understand:
- Approximate, Articulate, Associate, Clarify, Classify, Compare, Compute, Convert, Describe, Detail, Differentiate, Discuss, Distinguish, Elaborate, Estimate, Example, Explain, Express, Extend, Factor, Give, Interpret, Observe, Predict, Review, Rewrite, Summarize

Apply:
- Acquire, Adapt, Allocate, Apply, Assign, Attain, Avoid, Calculate, Capture, Change, Classify, Complete, Compute, Construct, Customize, Demonstrate, Depreciate, Derive, Determine, Discover, Draw, Employ, Examine, Exercise, Explore, Expose, Express, Factor, Figure, Graph, Handle, Illustrate, Investigate, Manipulate, Modify, Operate, Personalize, Plot, Practice, Predict, Prepare, Process, Produce, Project, Provide, Sequence, Show, Simulate, Sketch, Solve, Tabulate, Transcribe, Use

Analyze:
- Analyze, Audit, Characterize, Classify, Compare, Confirm, Correlate, Detect, Diagram, Differentiate, Discriminate, Distinguish, Ensure, Examine, Explain, Explore, Figure out, File, Group, Identify, Interrupt, Investigate, Layout, Manage, Maximize, Minimize, Optimize, Order, Outline, Point out, Prioritize, Query, Relate, Select, Separate, Subdivide, Train, Transform

Evaluate:
- Appraise, Assess, Compare, Conclude, Contrast, Criticize, Determine, Discriminate, Estimate, Evaluate, Explain, Grade, Interpret, Judge, Justify, Measure, Predict, Prescribe, Rank, Rate, Recommend, Release, Select, Summarize, Support, Test, Validate, Verify

Create:
- Abstract, Animate, Arrange, Assemble, Budget, Categorize, Code, Combine, Compile, Compose, Construct, Correspond, Create, Cultivate, Debug, Depict, Design, Develop, Dictate, Enhance, Explain, Facilitate, Format, Formulate, Generalize, Handle, Import, Improve, Incorporate, Integrate, Interface, Join, Model, Modify, Network, Organize, Outline, Plan, Portray, Prepare, Prescribe, Produce, Program, Rearrange, Reconstruct, Relate, Reorganize, Revise, Rewrite, Specify, Summarize

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
STRUCTURE ADAPTATION RULE (IMPORTANT)
=====================

The structure of the output MUST strictly follow the input blueprint.

If a section contains:
- subQuestions → generate subQuestions structure.
- no subQuestions → generate flat section structure.

DO NOT invent subquestions.
DO NOT remove subquestions.
DO NOT change structure.

Mirror the blueprint exactly.


=====================
OUTPUT FORMAT (STRICT JSON ONLY)
=====================

Return ONLY valid JSON.
No markdown.
No comments.
No extra text.

If blueprint contains subQuestions:

{
  "mainQuestions": [...]
}

If blueprint does NOT contain subQuestions:

{
  "sectionPools": [...]
}

{
  "sectionPools": [
    {
      "sectionTitle": "string",
      "expectedCount": number,
      "questionsToAttempt": questionsToAttempt, 

      =====================If blueprint contains subQuestions: =====================

      "subQuestions": [
        { "label": "string", 
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

      =====================If blueprint does NOT contain subQuestions:=====================

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
