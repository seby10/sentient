/** Emotional mood states detected from journal text */
export type MoodType = 'neutral' | 'sadness' | 'anxiety' | 'anger';

export interface MoodConfig {
  label: string;
  color: string;
  keywords: string[];
}

export const MOOD_CONFIGS: Record<MoodType, MoodConfig> = {
  neutral: {
    label: 'Calma',
    color: '#E6F4EA',
    keywords: ['calm', 'peaceful', 'okay', 'fine', 'good', 'tired', 'exhausted', 'sleepy'],
  },
  sadness: {
    label: 'Melancolía',
    color: '#EBF4FA',
    keywords: ['sad', 'lonely', 'empty', 'down', 'lost', 'hopeless', 'cry', 'miss', 'grief', 'depressed'],
  },
  anxiety: {
    label: 'Ansioso',
    color: '#FFF8E1',
    keywords: ['anxious', 'anxiety', 'worried', 'worry', 'stressed', 'stress', 'nervous', 'panic', 'overwhelmed', 'fear', 'scared'],
  },
  anger: {
    label: 'Frustrado',
    color: '#FFECE8',
    keywords: ['angry', 'anger', 'frustrated', 'frustration', 'mad', 'furious', 'annoyed', 'rage', 'irritated'],
  },
};
