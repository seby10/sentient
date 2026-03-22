import { EmotionalTrend } from '../../domain/entities/EmotionalTrend';
import { AnalyticsRepository } from '../../domain/repositories/RepositoryInterfaces';

export class MockAnalyticsRepository implements AnalyticsRepository {
  getEmotionalTrend(): EmotionalTrend {
    return {
      weekMoods: [
        { date: '2026-03-14', mood: 'neutral' },
        { date: '2026-03-15', mood: 'sadness' },
        { date: '2026-03-16', mood: 'anxiety' },
        { date: '2026-03-17', mood: 'anxiety' },
        { date: '2026-03-18', mood: 'neutral' },
        { date: '2026-03-19', mood: 'sadness' },
        { date: '2026-03-20', mood: 'neutral' },
      ],
      distribution: [
        { mood: 'neutral', percentage: 43, count: 3 },
        { mood: 'anxiety', percentage: 29, count: 2 },
        { mood: 'sadness', percentage: 28, count: 2 },
        { mood: 'anger', percentage: 0, count: 0 },
      ],
      topKeywords: ['stressed', 'tired', 'lonely', 'worried', 'calm', 'okay'],
    };
  }
}
