import { MoodType } from './MoodType';

export interface DayMood {
  date: string; // ISO date string YYYY-MM-DD
  mood: MoodType;
}

export interface MoodDistribution {
  mood: MoodType;
  percentage: number;
  count: number;
}

export interface EmotionalTrend {
  weekMoods: DayMood[];
  distribution: MoodDistribution[];
  topKeywords: string[];
}
