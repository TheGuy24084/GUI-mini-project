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
   * Generates a concise, 2-sentence summary of a book.
   */
  async generateSummary(title: string, author: string): Promise<string> {
    if (!import.meta.env.VITE_GEMINI_API_KEY) {
      // Mock for demo
      return `"${title}" by ${author} is a masterful exploration of its themes, blending intricate character development with a compelling narrative. It remains a seminal work that continues to influence readers and writers alike with its profound insights.`;
    }

    try {
      const model = this.genAI.getGenerativeModel({ 
        model: this.modelName,
        systemInstruction: 'You are a professional librarian. Provide a concise, 2-sentence summary of this book.'
      });

      const prompt = `Title: ${title}\nAuthor: ${author}\n\nPlease provide a 2-sentence summary.`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text().trim();
    } catch (error) {
      console.error('Gemini AI Error (Summary):', error);
      throw new Error('AI is resting');
    }
  }

  /**
   * Suggests 3 relevant tags for a book based on metadata.
   */
  async suggestTags(title: string, author: string, category: string): Promise<string[]> {
    if (!import.meta.env.VITE_GEMINI_API_KEY) {
      // Mock for demo
      return ['Classic', 'Must-Read', 'Thought-Provoking'];
    }

    try {
      const model = this.genAI.getGenerativeModel({ model: this.modelName });
      const prompt = `Based on the book "${title}" by ${author} in the category "${category}", suggest exactly 3 short tags (e.g., "Classic", "Must-read"). Return ONLY the tags separated by commas.`;
      
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
   * Generates a 2-sentence summary of the library's data using Gemini 3 Pro.
   */
  async generateAnalyticsSummary(stats: any, categories: string[]): Promise<string> {
    if (!import.meta.env.VITE_GEMINI_API_KEY) {
      // Mock for demo
      return "Most of your collection is distributed across various categories. The availability rate remains high with a few books currently borrowed.";
    }

    try {
      const model = this.genAI.getGenerativeModel({ 
        model: 'gemini-3-pro',
        systemInstruction: 'You are an expert Data Analyst and Librarian. Provide a concise, maximum 2-sentence summary of the library data.'
      });

      const prompt = `Library Data Snapshot:\n- Total Books: ${stats.total}\n- Available: ${stats.available}\n- Borrowed: ${stats.borrowed}\n- Categories present: ${categories.join(', ')}\n\nProvide a 2-sentence summary emphasizing the distribution and what it says about the collection.`;
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
