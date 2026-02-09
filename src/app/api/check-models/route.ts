import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "No API Key found" }, { status: 500 });
  }

  try {
    // Directly ask Google which models are available for YOUR key
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`,
    );

    const data = await response.json();

    // Filter to show only models that can "generateContent"
    const availableModels = (data.models || [])
      .filter((m: any) =>
        m.supportedGenerationMethods?.includes("generateContent"),
      )
      .map((m: any) => m.name.replace("models/", "")); // Clean up the name

    return NextResponse.json({
      count: availableModels.length,
      recommendation: "Pick any model from the list below:",
      models: availableModels,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
