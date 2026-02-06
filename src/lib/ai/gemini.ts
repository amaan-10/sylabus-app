// lib/gemini.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Use 'gemini-1.5-flash' for higher rate limits (15 RPM, 1500 RPD in free tier)
// If you need even more volume later, enable billing on Google Cloud Console.
// lib/gemini.ts
export const geminiModel = genAI.getGenerativeModel({
  // Change "gemini-1.5-flash" to "gemini-1.5-flash-001" or "gemini-1.5-flash-002"
  model: "gemini-flash-lite-latest",
  generationConfig: {
    responseMimeType: "application/json",
  },
});
