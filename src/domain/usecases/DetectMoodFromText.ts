import { MoodType, MOOD_CONFIGS } from '../entities/MoodType';

export interface DetectMoodResult {
  mood: MoodType;
  detectedKeywords: string[];
}

/**
 * Use case: detect emotional state from journal text by keyword matching.
 * Follows SOLID - single responsibility, no side effects.
 */
export function detectMoodFromText(text: string): DetectMoodResult {
  const lower = text.toLowerCase();
  const scores: Record<MoodType, string[]> = {
    neutral: [],
    sadness: [],
    anxiety: [],
    anger: [],
  };

  for (const [mood, config] of Object.entries(MOOD_CONFIGS) as [MoodType, typeof MOOD_CONFIGS[MoodType]][]) {
    for (const keyword of config.keywords) {
      if (lower.includes(keyword)) {
        scores[mood].push(keyword);
      }
    }
  }

  // Priority: anger > anxiety > sadness > neutral (calm default)
  const priority: MoodType[] = ['anger', 'anxiety', 'sadness', 'neutral'];
  const allKeywords: string[] = [];

  for (const mood of priority) {
    if (scores[mood].length > 0) {
      allKeywords.push(...scores[mood]);
      return { mood, detectedKeywords: [...new Set(allKeywords)] };
    }
  }

  return { mood: 'neutral', detectedKeywords: [] };
}
