import { EmotionalTrend } from '../entities/EmotionalTrend';
import { AnonymousRequest } from '../entities/AnonymousRequest';

export interface AnalyticsRepository {
  getEmotionalTrend(): EmotionalTrend;
}

export interface PsychologistRepository {
  getAnonymousRequests(): AnonymousRequest[];
}
