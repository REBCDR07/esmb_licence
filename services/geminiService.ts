import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AISuggestion, ProjectInfo } from "../types";

const apiKey = process.env.API_KEY;

// Initialize only if key exists to prevent runtime crash on init, check later
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const suggestObjectives = async (topic: string, major: string): Promise<AISuggestion | null> => {
  if (!ai) {
    console.warn("API Key missing for Gemini");
    return null;
  }

  const prompt = `
    Je suis un étudiant en ${major}.
    Mon sujet de mémoire est : "${topic}".
    Propose-moi un objectif général académique solide et 3 objectifs spécifiques pertinents pour ce travail.
    Réponds uniquement au format JSON.
  `;

  const responseSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      generalObjective: {
        type: Type.STRING,
        description: "Un objectif général académique concis et professionnel.",
      },
      specificObjectives: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "Exactement 3 objectifs spécifiques opérationnels.",
      },
    },
    required: ["generalObjective", "specificObjectives"],
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7,
      },
    });

    const text = response.text;
    if (!text) return null;

    return JSON.parse(text) as AISuggestion;
  } catch (error) {
    console.error("Error generating objectives:", error);
    return null;
  }
};

export const improveProjectDetails = async (currentData: ProjectInfo, major: string): Promise<ProjectInfo | null> => {
  if (!ai) {
    console.warn("API Key missing for Gemini");
    return null;
  }

  const prompt = `
    Agis comme un expert académique et professeur de méthodologie de recherche.
    Je suis étudiant en "${major}".
    Voici mes ébauches pour mon mémoire :
    - Sujet : "${currentData.topic}"
    - Objectif Général : "${currentData.generalObjective}"
    - Objectifs Spécifiques : ${JSON.stringify(currentData.specificObjectives)}

    Ta mission : Reformule et améliore ces textes pour qu'ils soient plus académiques, précis et professionnels.
    Ne change pas le sens de mon travail, mais améliore le vocabulaire et la structure.
    Si le sujet est mal formulé, propose une version plus titre de mémoire.
    Réponds uniquement au format JSON contenant les versions améliorées.
  `;

  const responseSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      topic: { type: Type.STRING, description: "Le sujet du mémoire reformulé de manière académique." },
      generalObjective: { type: Type.STRING, description: "L'objectif général amélioré." },
      specificObjectives: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "Les 3 objectifs spécifiques reformulés.",
      },
    },
    required: ["topic", "generalObjective", "specificObjectives"],
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.4, // Lower temperature for refinement/correction rather than creative generation
      },
    });

    const text = response.text;
    if (!text) return null;

    const result = JSON.parse(text);
    
    // Ensure we return exactly the tuple structure needed for specificObjectives
    return {
        topic: result.topic,
        generalObjective: result.generalObjective,
        specificObjectives: [
            result.specificObjectives[0] || currentData.specificObjectives[0],
            result.specificObjectives[1] || currentData.specificObjectives[1],
            result.specificObjectives[2] || currentData.specificObjectives[2]
        ]
    };
  } catch (error) {
    console.error("Error improving details:", error);
    return null;
  }
};