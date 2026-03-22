import { MoodType } from './MoodType';

export interface JournalEntry {
  id: string;
  text: string;
  mood: MoodType;
  detectedKeywords: string[];
  createdAt: Date;
}
