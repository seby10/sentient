'use client';

import { useState } from 'react';
import SoftCard from '@/presentation/components/SoftCard';
import { PrimaryButton, GhostButton } from '@/presentation/components/Buttons';
import { MockPsychologistRepository } from '@/data/repositories/MockPsychologistRepository';
import { MOOD_CONFIGS, MoodType } from '@/domain/entities/MoodType';
import { MoodIcon } from '@/presentation/icons/MoodIcon';
import { AnonymousRequest } from '@/domain/entities/AnonymousRequest';
import { CheckCircle2, Clock, Quote, ShieldCheck } from 'lucide-react';

const MOOD_COLORS: Record<MoodType, string> = {
  neutral: '#52B788',
  sadness: '#5B9ABF',
  anxiety: '#D4A017',
  anger:   '#D4785A',
};

function timeAgo(date: Date): string {
  const mins = Math.floor((Date.now() - date.getTime()) / 60000);
  if (mins < 60) return `hace ${mins} min`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `hace ${hrs} h`;
  return `hace ${Math.floor(hrs / 24)} d`;
}

function RequestCard({ request }: { request: AnonymousRequest }) {
  const [accepted, setAccepted] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  if (accepted) {
    return (
      <SoftCard>
        <div style={{ textAlign: 'center', padding: 'var(--space-2) 0' }}>
          <CheckCircle2 size={40} strokeWidth={1.5} style={{ color: 'var(--color-btn-primary-text)', margin: '0 auto 10px' }} />
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, color: 'var(--color-btn-primary-text)' }}>
            Sesión aceptada con {request.anonymousId}
          </p>
          <p className="text-sm text-secondary mt-1">Serán notificados en breve.</p>
        </div>
      </SoftCard>
    );
  }

  return (
    <SoftCard>
      {/* Encabezado de la solicitud */}
      <div className="request-card__header">
        <div>
          <span className="request-card__anon-id">{request.anonymousId}</span>
          <p className="text-xs text-secondary mt-1" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Clock size={11} strokeWidth={2} />
            {request.sessionCount} sesión{request.sessionCount !== 1 ? 'es' : ''} · Solicitado {timeAgo(request.requestedAt)}
          </p>
        </div>
        <span style={{ color: MOOD_COLORS[request.topMoods[0].mood], display: 'flex' }}>
          <MoodIcon mood={request.topMoods[0].mood} size={26} strokeWidth={1.5} />
        </span>
      </div>

      {/* Estados emocionales principales */}
      <div className="request-card__moods">
        {request.topMoods.filter(m => m.percentage > 0).map(m => (
          <span key={m.mood} className={`mood-badge mood-badge--${m.mood}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            <MoodIcon mood={m.mood} size={11} strokeWidth={2} />
            {MOOD_CONFIGS[m.mood].label} {m.percentage}%
          </span>
        ))}
      </div>

      {/* Barra proporcional de estados */}
      <div style={{ display: 'flex', height: 6, borderRadius: 999, overflow: 'hidden', marginBottom: 'var(--space-2)', gap: 2 }}>
        {request.topMoods.filter(m => m.percentage > 0).map(m => (
          <div
            key={m.mood}
            style={{ flex: m.percentage, background: MOOD_COLORS[m.mood], borderRadius: 999 }}
          />
        ))}
      </div>

      {/* Palabras clave */}
      <div className="request-card__keywords">
        <span className="text-xs text-secondary" style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', alignSelf: 'center' }}>
          Palabras clave:
        </span>
        {request.recentKeywords.map(kw => (
          <span key={kw} className="keyword-chip">{kw}</span>
        ))}
      </div>

      {/* Nota del terapeuta */}
      {request.note && (
        <div className="request-card__note" style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
          <Quote size={14} strokeWidth={1.8} style={{ flexShrink: 0, marginTop: 2, opacity: 0.5 }} />
          {request.note}
        </div>
      )}

      {/* Acciones */}
      <div className="request-card__actions">
        <PrimaryButton size="sm" onClick={() => setAccepted(true)}>
          Aceptar sesión
        </PrimaryButton>
        <GhostButton size="sm" onClick={() => setDismissed(true)}>
          Ver después
        </GhostButton>
      </div>
    </SoftCard>
  );
}

export default function DashboardPage() {
  const repo = new MockPsychologistRepository();
  const requests = repo.getAnonymousRequests();

  return (
    <div className="page-container page-container--default">
      {/* Encabezado */}
      <div className="section-header animate-fade-in">
        <p className="text-xs text-secondary" style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>
          Panel de apoyo
        </p>
        <h1 className="section-title">Solicitudes entrantes</h1>
        <p className="section-subtitle">
          {requests.length} personas buscan apoyo hoy.
        </p>
      </div>

      {/* Resumen por estado emocional */}
      <div className="animate-fade-in animate-fade-in-delay-1" style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 'var(--space-3)' }}>
        {(['anxiety', 'sadness', 'anger', 'neutral'] as MoodType[]).map(mood => {
          const count = requests.filter(r => r.topMoods[0].mood === mood).length;
          if (count === 0) return null;
          return (
            <span key={mood} className={`mood-badge mood-badge--${mood}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
              <MoodIcon mood={mood} size={12} strokeWidth={2} />
              {count} {MOOD_CONFIGS[mood].label}
            </span>
          );
        })}
      </div>

      {/* Tarjetas de solicitud */}
      <div className="stack stack--lg animate-fade-in animate-fade-in-delay-2">
        {requests.map(r => (
          <RequestCard key={r.id} request={r} />
        ))}
      </div>

      {/* Nota de privacidad */}
      <p
        className="text-sm text-secondary"
        style={{ textAlign: 'center', marginTop: 'var(--space-4)', fontStyle: 'italic', lineHeight: 1.6, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
      >
        <ShieldCheck size={14} strokeWidth={1.8} style={{ color: 'var(--color-btn-primary-text)' }} />
        Todas las interacciones son completamente anónimas.
      </p>
    </div>
  );
}
