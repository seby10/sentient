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
    keywords: ['calma', 'tranquilo', 'bien', 'cansado', 'agotado', 'dormido'],
  },
  sadness: {
    label: 'Melancolía',
    color: '#EBF4FA',
    keywords: ['triste', 'solitario', 'vacío', 'abajo', 'perdido', 'sin esperanza', 'llorar', 'extrañar', 'dolor', 'deprimido'],
  },
  anxiety: {
    label: 'Ansioso',
    color: '#FFF8E1',
    keywords: ['ansioso', 'ansiedad', 'preocupado', 'preocupación', 'estresado', 'estrés', 'nervioso', 'pánico', 'abrumado', 'miedo', 'asustado'],
  },
  anger: {
    label: 'Frustrado',
    color: '#FFECE8',
    keywords: ['enojado', 'enojo', 'frustrado', 'frustración', 'enojado', 'furioso', 'molesto', 'rabia', 'irritado'],
  },
};
