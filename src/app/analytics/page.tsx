'use client';

import SoftCard from '@/presentation/components/SoftCard';
import { MOOD_CONFIGS, MoodType } from '@/domain/entities/MoodType';
import { MoodIcon } from '@/presentation/icons/MoodIcon';
import { MessageCircle, HandHeart } from 'lucide-react';
import Link from 'next/link';
import { useJournalStore } from '@/presentation/hooks/useJournalStore';
import { computeAnalyticsFromEntries } from '@/domain/usecases/ComputeAnalyticsFromEntries';
import { MockAnalyticsRepository } from '@/data/repositories/MockAnalyticsRepository';

const MOOD_COLORS: Record<MoodType, string> = {
  neutral: '#52B788',
  sadness: '#5B9ABF',
  anxiety: '#D4A017',
  anger:   '#D4785A',
};

const DAY_LABELS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

function DonutChart({ distribution }: { distribution: { mood: MoodType; percentage: number }[] }) {
  const radius = 60;
  const cx = 80;
  const cy = 80;
  const circumference = 2 * Math.PI * radius;

  let offset = 0;
  const slices = distribution.filter(d => d.percentage > 0).map(d => {
    const dash = (d.percentage / 100) * circumference;
    const gap = circumference - dash;
    const slice = { ...d, dash, gap, offset };
    offset += dash;
    return slice;
  });

  const dominant = distribution.find(d => d.percentage > 0);

  return (
    <div className="donut-chart" style={{ width: 160, height: 160 }}>
      <svg viewBox="0 0 160 160" className="donut-chart__svg">
        <circle cx={cx} cy={cy} r={radius} fill="none" stroke="#F0F0EE" strokeWidth="22" />
        {slices.map((s) => (
          <circle
            key={s.mood}
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke={MOOD_COLORS[s.mood]}
            strokeWidth="22"
            strokeDasharray={`${s.dash} ${s.gap}`}
            strokeDashoffset={-s.offset}
            strokeLinecap="round"
          />
        ))}
      </svg>
      <div className="donut-chart__center">
        {dominant && (
          <span style={{ color: MOOD_COLORS[dominant.mood], display: 'flex' }}>
            <MoodIcon mood={dominant.mood} size={28} strokeWidth={1.5} />
          </span>
        )}
        <span className="donut-chart__center-label">
          {dominant ? MOOD_CONFIGS[dominant.mood].label : 'Calma'}
        </span>
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  const { entries } = useJournalStore();

  // Use real data when entries exist, fall back to mock for demo
  const trend = entries.length > 0
    ? computeAnalyticsFromEntries(entries)
    : new MockAnalyticsRepository().getEmotionalTrend();

  const usingRealData = entries.length > 0;

  return (
    <div className="page-container page-container--default">
      {/* Encabezado */}
      <div className="section-header animate-fade-in">
        <h1 className="section-title">Tu semana de un vistazo</h1>
        <p className="section-subtitle">
          {usingRealData
            ? `Basado en ${entries.length} entrada${entries.length !== 1 ? 's' : ''} guardada${entries.length !== 1 ? 's' : ''}.`
            : 'Una mirada suave a tus patrones emocionales.'}
        </p>
      </div>

      {/* Calendario de estados */}
      <SoftCard className="animate-fade-in animate-fade-in-delay-1">
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 'var(--space-2)' }}>
          Esta semana
        </h2>
        <div className="mood-calendar">
          {trend.weekMoods.map((day, i) => {
            const date = new Date(day.date + 'T00:00:00');
            const todayStr = new Date().toISOString().split('T')[0];
            const isToday = day.date === todayStr;
            const config = MOOD_CONFIGS[day.mood];
            return (
              <div key={day.date}>
                <div className="mood-calendar__day-label">{DAY_LABELS[i]}</div>
                <div
                  className={`mood-calendar__dot mood-calendar__dot--${day.mood}${isToday ? ' mood-calendar__dot--today' : ''}`}
                  title={`${date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}: ${config.label}`}
                  role="img"
                  aria-label={`${date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}: ${config.label}`}
                >
                  <MoodIcon mood={day.mood} size={16} strokeWidth={1.8} />
                </div>
              </div>
            );
          })}
        </div>
      </SoftCard>

      {/* Distribución emocional */}
      <SoftCard className="mt-2 animate-fade-in animate-fade-in-delay-2">
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 'var(--space-3)' }}>
          Distribución emocional
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
          <DonutChart distribution={trend.distribution} />
          <div className="legend" style={{ flex: 1, minWidth: 120 }}>
            {trend.distribution.filter(d => d.percentage > 0).map(d => (
              <div key={d.mood} className="legend__item">
                <span className="legend__label">
                  <span className="legend__dot" style={{ background: MOOD_COLORS[d.mood] }} />
                  <span>{MOOD_CONFIGS[d.mood].label}</span>
                </span>
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '0.875rem' }}>
                  {d.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="legend mt-2">
          {trend.distribution.filter(d => d.percentage > 0).map(d => (
            <div key={d.mood}>
              <div className="legend__bar-track">
                <div className="legend__bar-fill" style={{ width: `${d.percentage}%`, background: MOOD_COLORS[d.mood] }} />
              </div>
            </div>
          ))}
        </div>
      </SoftCard>

      {/* Palabras más usadas */}
      {trend.topKeywords.length > 0 && (
        <SoftCard className="mt-2 animate-fade-in animate-fade-in-delay-2">
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 'var(--space-2)' }}>
            Palabras que más has usado
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {trend.topKeywords.map(kw => (
              <span key={kw} className="keyword-chip">{kw}</span>
            ))}
          </div>
        </SoftCard>
      )}

      {/* Tarjeta CTA */}
      <SoftCard
        className="mt-2 animate-fade-in animate-fade-in-delay-3"
        style={{ background: 'linear-gradient(135deg, #E6F4EA 0%, #EBF4FA 100%)', borderRadius: 'var(--radius-lg)' }}
      >
        <div style={{ marginBottom: 'var(--space-1)', color: '#22543D' }}>
          <HandHeart size={32} strokeWidth={1.5} />
        </div>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 8 }}>
          No estás solo/a.
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: 'var(--space-2)' }}>
          Conéctate de forma anónima con un profesional que puede ofrecerte orientación amable — a tu propio ritmo, sin presión.
        </p>
        <Link
          href="/dashboard"
          className="btn btn--primary btn--full"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, textDecoration: 'none' }}
        >
          <MessageCircle size={16} />
          Hablar con alguien
        </Link>
      </SoftCard>
    </div>
  );
}
