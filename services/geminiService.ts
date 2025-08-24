
import { GoogleGenAI, Type } from "@google/genai";
import { PitchData } from '../types';

if (!process.env.API_KEY) {
  // This is a placeholder for environments where process.env is not defined.
  // In a real build environment, this should be handled by the build tool.
  // For this context, we will mock it to avoid runtime errors,
  // but the actual key will be injected by the runtime environment.
  (window as any).process = { env: { API_KEY: "YOUR_API_KEY_HERE" } };
  console.warn("process.env.API_KEY is not defined. Using a placeholder. Ensure API_KEY is set in your environment.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const PITCH_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    elevator_pitch: {
      type: Type.STRING,
      description: "A 30–60 word compelling pitch that summarizes the startup idea."
    },
    tagline: {
      type: Type.STRING,
      description: "A short, catchy slogan (max 10 words)."
    },
    slide_bullets: {
      type: Type.ARRAY,
      description: "A list of 7 crucial topics for a pitch deck.",
      items: { type: Type.STRING }
    },
    value_proposition: {
      type: Type.STRING,
      description: "A 3-4 sentence summary highlighting why this startup is unique and valuable."
    },
    competitors: {
      type: Type.ARRAY,
      description: "A list of 3 potential competitors with a brief description for each.",
      items: { type: Type.STRING }
    },
    revenue_models: {
      type: Type.ARRAY,
      description: "A list of at least 3 relevant revenue model suggestions.",
      items: { type: Type.STRING }
    },
    suggested_pitch_slide_titles: {
      type: Type.ARRAY,
      description: "A list of 7 essential slide titles for a pitch deck.",
      items: { type: Type.STRING }
    }
  },
  required: [
    "elevator_pitch",
    "tagline",
    "slide_bullets",
    "value_proposition",
    "competitors",
    "revenue_models",
    "suggested_pitch_slide_titles"
  ]
};

export async function generatePitch(idea: string): Promise<PitchData> {
  const prompt = `
    You are an AI Business Pitch Generator for students participating in hackathons or pitch fests.
    Analyze the following startup idea and generate a structured business pitch.
    Keep the tone professional, concise, and startup-friendly.

    Startup Idea:
    ---
    ${idea}
    ---

    Generate the pitch based on the provided JSON schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: PITCH_SCHEMA,
        temperature: 0.7,
      },
    });

    const jsonText = response.text.trim();
    if (!jsonText) {
      throw new Error("Received an empty response from the API.");
    }

    const parsedData: PitchData = JSON.parse(jsonText);
    return parsedData;
  } catch (error) {
    console.error("Error generating pitch:", error);
    if (error instanceof SyntaxError) {
      throw new Error("Failed to parse the API response. The format was invalid.");
    }
    throw new Error("An error occurred while communicating with the AI model.");
  }
}
