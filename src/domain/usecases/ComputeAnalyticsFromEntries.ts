import { JournalEntry } from '../entities/JournalEntry';
import { MoodType } from '../entities/MoodType';
import { EmotionalTrend, DayMood, MoodDistribution } from '../entities/EmotionalTrend';

/**
 * Use case: derive emotional analytics from real journal entries.
 * Pure function — no side effects, fully testable.
 */
export function computeAnalyticsFromEntries(entries: JournalEntry[]): EmotionalTrend {
  // --- Week calendar (last 7 days) ---
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const weekMoods: DayMood[] = [];
  for (let i = 6; i >= 0; i--) {
    const day = new Date(today);
    day.setDate(day.getDate() - i);
    const dateStr = day.toISOString().split('T')[0];

    const dayEntries = entries.filter(e => {
      const d = new Date(e.createdAt);
      return d.toISOString().split('T')[0] === dateStr;
    });

    // Use the last entry of the day; default to neutral if no entries
    const mood: MoodType = dayEntries.length > 0
      ? dayEntries[dayEntries.length - 1].mood
      : 'neutral';

    weekMoods.push({ date: dateStr, mood });
  }

  // --- Mood distribution ---
  const moodCounts: Record<MoodType, number> = {
    neutral: 0, sadness: 0, anxiety: 0, anger: 0,
  };
  entries.forEach(e => { moodCounts[e.mood]++; });
  const total = entries.length || 1;

  const distribution: MoodDistribution[] = (
    Object.keys(moodCounts) as MoodType[]
  ).map(mood => ({
    mood,
    count: moodCounts[mood],
    percentage: Math.round((moodCounts[mood] / total) * 100),
  }));

  // --- Top keywords by frequency ---
  const freq: Record<string, number> = {};
  entries.forEach(e =>
    e.detectedKeywords.forEach(kw => { freq[kw] = (freq[kw] ?? 0) + 1; })
  );
  const topKeywords = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([kw]) => kw);

  return { weekMoods, distribution, topKeywords };
}
