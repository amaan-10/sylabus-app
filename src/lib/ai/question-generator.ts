// src/lib/ai/question-generator.ts

import { geminiModel } from "./gemini"; // Adjust path if needed
import { buildPaperPrompt } from "./prompt-builder"; // Adjust path if needed

export async function generateCompletePaper({ course, sections, topics }: any) {
  // 1. Build the single-fire prompt
  const prompt = buildPaperPrompt({
    course,
    sections,
    topics,
  });

  try {
    // 2. Make ONE call to Gemini
    const result = await geminiModel.generateContent(prompt);
    const text = result.response.text();

    // 3. Parse JSON
    // Note: Gemini 1.5/2.0 usually returns clean JSON if asked,
    // but cleaning markdown code blocks is a safe habit.
    const cleanJson = text.replace(/```json|```/g, "").trim();
    const data = JSON.parse(cleanJson);

    return data.sections;
  } catch (error) {
    console.error("AI Generation Failed:", error);
    throw new Error("Failed to generate paper. Model might be overloaded.");
  }
}
