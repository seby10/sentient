import { MoodType } from './MoodType';

export interface MoodScore {
  mood: MoodType;
  percentage: number;
}

export interface AnonymousRequest {
  id: string;
  anonymousId: string; // e.g. "User #4A2F"
  requestedAt: Date;
  topMoods: MoodScore[];
  recentKeywords: string[];
  sessionCount: number;
  note?: string;
}
