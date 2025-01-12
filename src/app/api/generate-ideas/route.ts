import OpenAI from "openai";
import { NextResponse } from "next/server";

// Initialize OpenAI with API Key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure this is set in your .env.local
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    // Call OpenAI to generate ideas
    const response = await openai.chat.completions.create({
      model: "gpt-4", // Replace with the model you want to use
      messages: [{ role: "user", content: `Generate creative ideas for: ${prompt}` }],
      max_tokens: 150,
    });

    // Extract ideas from the response
    const ideas =
      response.choices[0].message?.content?.split("\n").filter((idea) => idea.trim()) || [];

    return NextResponse.json({ ideas });
  } catch (error: any) {
    console.error("Error with OpenAI API:", error);
    return NextResponse.json(
      { error: "An error occurred while generating ideas" },
      { status: 500 }
    );
  }
}
