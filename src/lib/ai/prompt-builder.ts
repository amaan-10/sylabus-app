// src/lib/prompt-builder.ts

export function buildPaperPrompt({ course, sections, topics }: any) {
  return `
You are an expert university question paper setter.

=====================
STRICT INSTRUCTIONS
=====================
1. Generate a COMPLETE question paper with multiple sections in ONE valid JSON response.
2. Use ONLY the provided syllabus topics.
3. Follow the "SECTION CONFIGURATION" exactly for marks, count, and difficulty.
4. If "hasInternalChoice" is true for a section, generate a valid alternative question for EACH question in that section.
5. Questions MUST be SHORT, clear, and to the point.
6. DO NOT add explanations, examples, hints, or extra context.

=====================
QUESTION LENGTH RULES (VERY IMPORTANT)
=====================
- MCQ question text: MAX 12 words
- Short answer questions: MAX 18 words
- Long answer questions: MAX 30 words
- Internal choice questions must follow the SAME length limits.
- If a question exceeds the word limit, it is INVALID.

=====================
COURSE DETAILS
=====================
Course: ${course.courseTitle} (${course.courseCode})
Semester: ${course.semester}

=====================
SYLLABUS TOPICS
=====================
${topics.map((t: string) => `- ${t}`).join("\n")}

=====================
SECTION CONFIGURATION (BLUEPRINT)
=====================
${JSON.stringify(sections, null, 2)}

=====================
OUTPUT JSON FORMAT
=====================
{
  "sections": [
    {
      "sectionTitle": "Section A",
      "questions": [
        {
          "id": "q1",
          "questionType": "MCQ | Short | Long",
          "question": "string",
          "marks": number,
          "difficulty": "easy | medium | hard",
          "options": ["A", "B", "C", "D"],
          "correctAnswer": "A",
          "internalChoice": {
            "question": "Alternative question string",
            "marks": number
          }
        }
      ]
    }
  ]
}
`;
}
