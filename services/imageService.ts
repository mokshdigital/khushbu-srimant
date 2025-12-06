import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

/**
 * Generate an image URL for a baby item using Gemini's image generation
 * For now, we'll use a placeholder service since Gemini doesn't directly generate images
 * We'll use a free placeholder image service with the word
 */
export const generateImage = async (word: string): Promise<string> => {
    // Use a placeholder image service
    // You can replace this with actual image generation if needed
    const encodedWord = encodeURIComponent(word.toLowerCase());

    // Using Unsplash for baby-related images
    return `https://source.unsplash.com/400x300/?baby,${encodedWord}`;
};
