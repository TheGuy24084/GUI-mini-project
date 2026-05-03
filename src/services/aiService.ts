import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Service for interacting with Gemini 3 Pro / Flash AI.
 * Day 7 - AI Integration Task.
 */
export class GeminiAIService {
  private genAI: GoogleGenerativeAI;
  private modelName: string;

  constructor(apiKey: string | undefined, model: 'Gemini-3-Flash' | 'Gemini-3-Pro' = 'Gemini-3-Flash') {
    if (!apiKey) {
      console.warn('VITE_GEMINI_API_KEY is not defined. AI features will be limited.');
    }
    this.genAI = new GoogleGenerativeAI(apiKey || 'DUMMY_KEY');
    this.modelName = model;
  }

  /**
   * Generates a concise, 2-sentence summary of a recipe.
   */
  async generateSummary(name: string, cuisine: string): Promise<string> {
    if (!import.meta.env.VITE_GEMINI_API_KEY) {
      // Mock for demo
      return `"${name}" is a signature ${cuisine} dish that balances traditional flavors with modern culinary techniques. It offers a unique sensory experience, making it a favorite for both casual meals and special occasions.`;
    }

    try {
      const model = this.genAI.getGenerativeModel({ 
        model: this.modelName,
        systemInstruction: 'You are a professional Executive Chef. Provide a concise, 2-sentence description of this recipe.'
      });

      const prompt = `Recipe: ${name}\nCuisine: ${cuisine}\n\nPlease provide a 2-sentence summary.`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text().trim();
    } catch (error) {
      console.error('Gemini AI Error (Summary):', error);
      throw new Error('AI is resting');
    }
  }

  /**
   * Suggests 3 relevant tags for a recipe based on metadata.
   */
  async suggestTags(name: string, cuisine: string, difficulty: string): Promise<string[]> {
    if (!import.meta.env.VITE_GEMINI_API_KEY) {
      // Mock for demo
      return ['Healthy', 'Quick', 'Authentic'];
    }

    try {
      const model = this.genAI.getGenerativeModel({ model: this.modelName });
      const prompt = `Based on the recipe "${name}" (${cuisine}) with difficulty "${difficulty}", suggest exactly 3 short culinary tags (e.g., "Spicy", "Vegetarian", "Dinner"). Return ONLY the tags separated by commas.`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text().trim();
      
      return text.split(',').map((tag: string) => tag.trim().replace(/^"|"$/g, '')).slice(0, 3);
    } catch (error) {
      console.error('Gemini AI Error (Tags):', error);
      throw new Error('AI is resting');
    }
  }

  /**
   * Generates a 2-sentence summary of the culinary data using Gemini 3 Pro.
   */
  async generateAnalyticsSummary(stats: any, cuisines: string[]): Promise<string> {
    if (!import.meta.env.VITE_GEMINI_API_KEY) {
      // Mock for demo
      return "Your recipe collection features a wide variety of global flavors. With a healthy ratio of favorites, you are well-equipped for any culinary occasion.";
    }

    try {
      const model = this.genAI.getGenerativeModel({ 
        model: 'gemini-3-pro',
        systemInstruction: 'You are an expert Culinary Data Analyst. Provide a concise, maximum 2-sentence summary of the recipe collection data.'
      });

      const prompt = `Culinary Data Snapshot:\n- Total Recipes: ${stats.total}\n- Favorites: ${stats.favorited}\n- Unique Cuisines: ${stats.cuisines}\n- Cuisines present: ${cuisines.join(', ')}\n\nProvide a 2-sentence summary emphasizing the culinary diversity and engagement.`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text().trim();
    } catch (error) {
      console.error('Gemini AI Error (Analytics):', error);
      throw new Error('AI is resting');
    }
  }
}

// Export a singleton instance using the environment variable
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
export const aiService = new GeminiAIService(API_KEY);
