
import { generateImages as generateWithGemini } from './geminiService';

// Define common types/interfaces for all API services
export type AspectRatio = "1:1" | "3:4" | "4:3" | "9:16" | "16:9";

export interface GenerationParams {
    prompt: string;
    negativePrompt?: string;
    aspectRatio?: AspectRatio;
    seed?: number;
    numberOfImages?: number;
}

// The apiService acts as a router to the correct API provider.
// This makes it easy to add new providers in the future.
export const apiService = {
    generateImages: (provider: string, params: GenerationParams): Promise<string[]> => {
        switch (provider) {
            case 'gemini':
                return generateWithGemini(params);
            case 'stability':
                // In a real app, you would import and call the Stability AI service here.
                // For now, we'll return a rejected promise as it's not implemented.
                return Promise.reject(new Error("Stability AI integration is not yet available."));
            default:
                return Promise.reject(new Error(`Unknown API provider: ${provider}`));
        }
    }
};
