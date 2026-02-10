import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

/**
 * Converts syllabus text into structured JSON
 * Supports MULTIPLE courses per PDF
 * ALWAYS validate with Zod before saving
 */
export async function generateCourseJSON(syllabusText: string): Promise<{
  courses: any[];
}> {
  const model = genAI.getGenerativeModel({
    model: "gemini-flash-latest",
  });

  const prompt = `
You are an academic syllabus parser.

THIS PDF MAY CONTAIN MULTIPLE COURSES.

RULES (VERY IMPORTANT):
- Do NOT invent content
- Do NOT guess missing values
- Use EXACT wording from syllabus
- Each course must be extracted separately
- If a field is not present, return null
- Return ONLY valid JSON
- NO markdown
- NO explanations
- NO comments

JSON SCHEMA (STRICT):
{
  "courses": [
    {
      "courseCode": string | null,
      "courseTitle": string | null,
      "courseType": string | null,
      "degree": string | null,
      "semester": number | null,
      "pattern": string | null,
      "courseOutcome": string[] | null,

      "credits": number | null,

      "units": [
        {
          "unit": string,
          "lectures": number | null,
          "topics": string[] | null,
        }
      ],
      "practicals": [
        {
          "title": string,
          "hours": string | null
        }
      ],
      "readings": string[] | null,
    }
  ]
}

SYLLABUS TEXT:
"""
${syllabusText}
"""
`;

  const result = await model.generateContent(prompt);
  const responseText = result.response.text();

  // ✅ Extract first JSON object safely
  const jsonMatch = responseText.match(/\{[\s\S]*\}/);

  if (!jsonMatch) {
    throw new Error("Gemini did not return valid JSON");
  }

  const parsed = JSON.parse(jsonMatch[0]);

  // ✅ Hard safety check
  if (!Array.isArray(parsed.courses)) {
    throw new Error("Invalid AI response: courses must be an array");
  }

  return parsed;
}
