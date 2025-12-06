import { GoogleGenAI, Type } from "@google/genai";

/**
 * MEMORY GAME SCORING SERVICE with Gemini AI
 * 
 * Uses Gemini AI for intelligent scoring with fallback to simple matching.
 */

// Get API key from environment (Vite uses import.meta.env)
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const scoreMemoryGame = async (
  userList: string,
  targetItems: string[]
): Promise<{ score: number; matches: string[] }> => {
  // Try Gemini AI first if API key is available
  if (ai && apiKey) {
    try {
      const model = "gemini-2.0-flash-exp";
      const prompt = `
        I will provide two lists. 
        List A (Target): ${targetItems.join(", ")}.
        List B (User Input): "${userList}".
        
        Compare List B to List A. 
        Identify which items in List B semantically match items in List A. 
        Be lenient with spelling and phrasing (e.g., "milk bottle" matches "Baby Bottle").
        
        Return a JSON object with:
        - 'score': number of unique items from List A found in List B.
        - 'matches': an array of strings listing the items from List A that were found.
      `;

      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.INTEGER },
              matches: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
            },
          },
        },
      });

      const text = response.text;
      if (text) {
        return JSON.parse(text);
      }
    } catch (error) {
      console.warn("Gemini AI error, using fallback:", error);
    }
  }

  // Fallback: Simple substring matching
  const matches: string[] = [];
  const lowerUser = userList.toLowerCase();

  targetItems.forEach(item => {
    const itemLower = item.toLowerCase();
    const itemWords = itemLower.split(' ');

    const hasMatch = itemWords.some(word => {
      if (word.length < 3) return false;
      return lowerUser.includes(word);
    });

    if (hasMatch) {
      matches.push(item);
    }
  });

  return { score: matches.length, matches };
};
