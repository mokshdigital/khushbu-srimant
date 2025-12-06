import { GoogleGenAI, Type } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

/**
 * Get a random letter for name suggestions
 * Uses Gemini AI if available, otherwise picks from common name-starting letters
 */
export const getRandomLetters = async (): Promise<string> => {
    // Try Gemini AI first if API key is available
    if (ai && apiKey) {
        try {
            const model = "gemini-2.0-flash-exp";
            const prompt = `
        Generate ONE random letter from the English alphabet that is commonly used to start baby names.
        Prefer letters like A, B, D, K, M, N, R, S, etc. that have many name options.
        Avoid rare letters like Q, X, Z.
        
        Return ONLY the single uppercase letter, nothing else.
      `;

            const response = await ai.models.generateContent({
                model,
                contents: prompt,
            });

            const text = response.text?.trim();
            if (text && text.length === 1 && /[A-Z]/.test(text)) {
                return text;
            }
        } catch (error) {
            console.warn("Gemini AI error, using fallback:", error);
        }
    }

    // Fallback: Pick from common name-starting letters
    const commonLetters = ['A', 'B', 'C', 'D', 'E', 'J', 'K', 'L', 'M', 'N', 'R', 'S', 'T', 'V'];
    return commonLetters[Math.floor(Math.random() * commonLetters.length)];
};
