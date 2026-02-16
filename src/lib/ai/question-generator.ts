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
  subQuestions: SubQuestion[];
  sectionTitle: string;
  questions: Question[];
};

export type PaperSet = {
  setName: string;
  sections: PaperSection[];
};

export type Question = {
  question: string;
  questionType: string;
  marks: number;
  difficulty: "easy" | "medium" | "hard";
  options?: string[];
  correctAnswer?: string;
  internalChoice?: {
    question: string;
    marks: number;
  };
};

export type SubQuestion = {
  label: string;
  questions: Question[];
};

export async function generateCompletePaperSets({
  course,
  sections,
  topics,
  paperSets,
}: GenerateArgs) {
  console.log("sections: ", sections);
  console.log(
    "sections subquestion:",
    sections.map((section) => section.subQuestions),
  );
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
        sections: sections.map((section) => {
          // CASE 1: Section has subQuestions in blueprint
          if (Array.isArray(section.subQuestions)) {
            return {
              sectionTitle: section.sectionTitle,
              questionsToAttempt: section.questionsToAttempt,
              expectedCount: section.expectedCount,

              // Initialize subQuestions properly
              subQuestions: section.subQuestions.map((sub: any) => ({
                label: sub.label,
                questionsToAttempt: sub.questionsToAttempt,
                questions: [] as Question[], // IMPORTANT
              })),

              // No flat questions here
              questions: [],
            };
          }

          // CASE 2: Flat section
          return {
            sectionTitle: section.sectionTitle,
            questionsToAttempt: section.questionsToAttempt,
            expectedCount: section.expectedCount,

            questions: [] as Question[],
            subQuestions: [],
          };
        }),
      }),
    );

    console.log("aiResponse", aiResponse);
    console.log(
      "aiResponse.sectionPools[2].subQuestions",
      aiResponse.sectionPools[2].subQuestions,
    );

    // ✅ Distribute questions round-robin
    aiResponse.sectionPools.forEach(
      (sectionPool: any, sectionIndex: number) => {
        const targetSection = paperSetsResult[0].sections[sectionIndex];

        // ------------------------------
        // CASE 1: Section HAS subQuestions
        // ------------------------------
        if (Array.isArray(sectionPool.subQuestions)) {
          sectionPool.subQuestions.forEach((subQ: any, subIndex: number) => {
            if (!Array.isArray(subQ.questionPool)) {
              throw new Error(
                `Invalid questionPool for subQuestion ${subQ.label} in section ${sectionPool.sectionTitle}`,
              );
            }

            subQ.questionPool.forEach((question: any, qIndex: number) => {
              const setIndex = qIndex % paperSets;

              console.log(
                "subQuestions: ",
                paperSetsResult[setIndex].sections[sectionIndex].subQuestions[
                  subIndex
                ].questions,
              );

              paperSetsResult[setIndex].sections[sectionIndex].subQuestions[
                subIndex
              ].questions.push(question);
            });
          });
        }

        // ------------------------------
        // CASE 2: Section WITHOUT subQuestions
        // ------------------------------
        else if (Array.isArray(sectionPool.questionPool)) {
          sectionPool.questionPool.forEach((question: any, qIndex: number) => {
            const setIndex = qIndex % paperSets;

            console.log(
              "questions: ",
              paperSetsResult[setIndex].sections[sectionIndex].questions,
            );
            paperSetsResult[setIndex].sections[sectionIndex].questions.push(
              question,
            );
          });
        } else {
          throw new Error(
            `Invalid structure in section ${sectionPool.sectionTitle}`,
          );
        }
      },
    );

    return paperSetsResult;
  } catch (error) {
    console.error("AI Generation Failed:", error);
    throw new Error("Failed to generate paper sets.");
  }
}
