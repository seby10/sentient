/**
 * Presentation-layer icon mapping for mood types.
 * Uses Lucide React icons — kept separate from the domain entity.
 */
import {
  Leaf,
  CloudRain,
  Wind,
  Flame,
  type LucideIcon,
} from 'lucide-react';
import { MoodType } from '@/domain/entities/MoodType';

export const MOOD_ICONS: Record<MoodType, LucideIcon> = {
  neutral: Leaf,
  sadness: CloudRain,
  anxiety: Wind,
  anger:   Flame,
};

interface MoodIconProps {
  mood: MoodType;
  size?: number;
  className?: string;
  strokeWidth?: number;
}

export function MoodIcon({ mood, size = 18, className, strokeWidth = 2 }: MoodIconProps) {
  const Icon = MOOD_ICONS[mood];
  return <Icon size={size} className={className} strokeWidth={strokeWidth} />;
}
