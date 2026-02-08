// src/lib/ai/question-generator.ts

import { geminiModel } from "./gemini";
import { buildPaperPrompt } from "./prompt-builder";

type GenerateArgs = {
  course: any;
  sections: any[];
  topics: string[];
  paperSets: number;
};

export type PaperSection = {
  sectionTitle: string;
  questions: Question[];
};

export type PaperSet = {
  setName: string;
  sections: PaperSection[];
};

export type Question = {
  question: string;
  marks: number;
  difficulty: "easy" | "medium" | "hard";
  options?: string[];
  correctAnswer?: string;
  internalChoice?: {
    question: string;
    marks: number;
  };
};

export async function generateCompletePaperSets({
  course,
  sections,
  topics,
  paperSets,
}: GenerateArgs) {
  console.log("sections: ", sections);
  // ✅ HARD INPUT VALIDATION
  if (!Array.isArray(sections)) {
    throw new Error("Blueprint sections must be an array");
  }

  const prompt = buildPaperPrompt({
    course,
    sections,
    topics,
    paperSets,
  });

  try {
    const result = await geminiModel.generateContent(prompt);
    const text = result.response.text();

    const cleanJson = text.replace(/```json|```/g, "").trim();
    const aiResponse = JSON.parse(cleanJson);

    // ✅ HARD AI OUTPUT VALIDATION
    if (!Array.isArray(aiResponse.sectionPools)) {
      console.error("Invalid AI response:", aiResponse);
      throw new Error("AI response missing sectionPools array");
    }

    // ✅ Create empty paper sets using BLUEPRINT
    const paperSetsResult: PaperSet[] = Array.from(
      { length: paperSets },
      (_, i) => ({
        setName: `Set ${String.fromCharCode(65 + i)}`,
        sections: sections.map((section) => ({
          sectionTitle: section.sectionTitle,
          questions: [] as Question[], // ✅ key line
          questionsToAttempt: section.questionsToAttempt,
          expectedCount: section.expectedCount,
        })),
      }),
    );

    // ✅ Distribute questions round-robin
    aiResponse.sectionPools.forEach(
      (sectionPool: any, sectionIndex: number) => {
        if (!Array.isArray(sectionPool.questionPool)) {
          throw new Error(
            `Invalid questionPool for section ${sectionPool.sectionTitle}`,
          );
        }

        sectionPool.questionPool.forEach((question: any, qIndex: number) => {
          const setIndex = qIndex % paperSets;
          paperSetsResult[setIndex].sections[sectionIndex].questions.push(
            question,
          );
        });
      },
    );

    return paperSetsResult;
  } catch (error) {
    console.error("AI Generation Failed:", error);
    throw new Error("Failed to generate paper sets.");
  }
}
