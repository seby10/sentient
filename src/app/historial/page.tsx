'use client';

import SoftCard from '@/presentation/components/SoftCard';
import { GhostButton } from '@/presentation/components/Buttons';
import { MOOD_CONFIGS } from '@/domain/entities/MoodType';
import { MoodIcon } from '@/presentation/icons/MoodIcon';
import { useJournalStore } from '@/presentation/hooks/useJournalStore';
import { BookHeart, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function HistorialPage() {
  const { entries, deleteEntry } = useJournalStore();

  return (
    <div className="page-container page-container--default">
      {/* Encabezado */}
      <div className="section-header animate-fade-in">
        <p className="text-xs text-secondary" style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>
          Tu diario
        </p>
        <h1 className="section-title">Historial de entradas</h1>
        <p className="section-subtitle">
          {entries.length > 0
            ? `${entries.length} entrada${entries.length !== 1 ? 's' : ''} guardada${entries.length !== 1 ? 's' : ''}`
            : 'Aún no tienes entradas guardadas.'}
        </p>
      </div>

      {/* Estado vacío */}
      {entries.length === 0 && (
        <div className="empty-state animate-fade-in animate-fade-in-delay-1">
          <span className="empty-state__icon">
            <BookHeart size={56} strokeWidth={1.2} />
          </span>
          <p className="empty-state__title">Tu diario está vacío</p>
          <p className="empty-state__text">
            Escribe tu primera entrada para comenzar a registrar tu bienestar emocional.
          </p>
          <Link href="/" className="btn btn--primary" style={{ marginTop: 'var(--space-1)', textDecoration: 'none', gap: 8 }}>
            <BookHeart size={16} />
            Escribir ahora
          </Link>
        </div>
      )}

      {/* Lista de entradas */}
      <div className="stack stack--lg animate-fade-in animate-fade-in-delay-1">
        {entries.map((entry) => {
          const moodConfig = MOOD_CONFIGS[entry.mood];
          const date = new Date(entry.createdAt);
          const dateLabel = date.toLocaleDateString('es-ES', {
            weekday: 'long', day: 'numeric', month: 'long',
          });
          const timeLabel = date.toLocaleTimeString('es-ES', {
            hour: '2-digit', minute: '2-digit',
          });

          return (
            <SoftCard key={entry.id}>
              <div className="history-entry">
                {/* Header */}
                <div className="history-entry__header">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span className={`mood-badge mood-badge--${entry.mood}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                        <MoodIcon mood={entry.mood} size={11} strokeWidth={2} />
                        {moodConfig.label}
                      </span>
                    </div>
                    <span className="history-entry__date">
                      {dateLabel} · {timeLabel}
                    </span>
                  </div>
                  <button
                    className="history-entry__delete"
                    onClick={() => deleteEntry(entry.id)}
                    aria-label={`Eliminar entrada del ${dateLabel}`}
                    title="Eliminar entrada"
                  >
                    <Trash2 size={16} strokeWidth={1.8} />
                  </button>
                </div>

                {/* Texto de la entrada */}
                <p className="history-entry__text">{entry.text}</p>

                {/* Palabras clave detectadas */}
                {entry.detectedKeywords.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {entry.detectedKeywords.map(kw => (
                      <span key={kw} className="keyword-chip">{kw}</span>
                    ))}
                  </div>
                )}
              </div>
            </SoftCard>
          );
        })}
      </div>

      {/* Botón limpiar todo */}
      {entries.length > 1 && (
        <div style={{ marginTop: 'var(--space-3)' }}>
          <GhostButton
            fullWidth
            onClick={() => entries.forEach(e => deleteEntry(e.id))}
            style={{ gap: 8, color: '#C53030', borderColor: 'rgba(197,48,48,0.3)' }}
          >
            <Trash2 size={15} />
            Eliminar todo el historial
          </GhostButton>
        </div>
      )}
    </div>
  );
}
