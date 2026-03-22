'use client';

import { useState, useCallback } from 'react';
import ExpandingTextInput from '@/presentation/components/ExpandingTextInput';
import { PrimaryButton, GhostButton } from '@/presentation/components/Buttons';
import { detectMoodFromText } from '@/domain/usecases/DetectMoodFromText';
import { MOOD_CONFIGS, MoodType } from '@/domain/entities/MoodType';
import { MoodIcon } from '@/presentation/icons/MoodIcon';
import { Save, RotateCcw, CheckCircle2 } from 'lucide-react';

export default function JournalPage() {
  const [text, setText] = useState('');
  const [saved, setSaved] = useState(false);
  const [savedMood, setSavedMood] = useState<MoodType>('neutral');

  const { mood, detectedKeywords } = detectMoodFromText(text);
  const moodConfig = MOOD_CONFIGS[mood];

  const handleSave = useCallback(() => {
    if (!text.trim()) return;
    setSavedMood(mood);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }, [text, mood]);

  const handleClear = useCallback(() => {
    setText('');
    setSaved(false);
  }, []);

  const today = new Date().toLocaleDateString('es-ES', {
    weekday: 'long', month: 'long', day: 'numeric',
  });
  // Capitalise first letter
  const dateLabel = today.charAt(0).toUpperCase() + today.slice(1);

  return (
    <div className={`page-container page-container--${mood}`}>
      {/* Encabezado */}
      <div className="section-header animate-fade-in">
        <p className="text-xs text-secondary" style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>
          {dateLabel}
        </p>
        <h1 className="section-title">¿Cómo te sientes hoy?</h1>
      </div>

      {/* Indicador de estado emocional */}
      <div className="animate-fade-in animate-fade-in-delay-1" style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 'var(--space-2)', minHeight: 32 }}>
        {text.trim().length > 0 && (
          <>
            <span style={{ display: 'flex', alignItems: 'center', color: 'var(--color-text-secondary)' }}>
              <MoodIcon mood={mood} size={17} />
            </span>
            <span
              className={`mood-badge mood-badge--${mood}`}
              style={{ transition: 'all 0.4s ease' }}
            >
              {moodConfig.label}
            </span>
            {detectedKeywords.length > 0 && (
              <span className="text-xs text-secondary">detectado: {detectedKeywords.slice(0, 3).join(', ')}</span>
            )}
          </>
        )}
        {text.trim().length === 0 && (
          <span className="text-xs text-secondary" style={{ fontStyle: 'italic' }}>
            Comienza a escribir para ver cómo te sientes…
          </span>
        )}
      </div>

      {/* Área de texto del diario */}
      <div className="animate-fade-in animate-fade-in-delay-2">
        <label htmlFor="journal-input" className="text-xs text-secondary" style={{ display: 'block', marginBottom: 8, fontFamily: 'var(--font-heading)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          Tu entrada del diario
        </label>
        <ExpandingTextInput
          value={text}
          onChange={setText}
          placeholder="Escribe cómo te sientes…"
          aria-label="Texto del diario"
        />
        <p className="text-xs text-secondary" style={{ textAlign: 'right', marginTop: 6 }}>
          {text.length} caracteres
        </p>
      </div>

      {/* Confirmación de guardado */}
      {saved && (
        <div
          className="animate-fade-in"
          style={{
            marginTop: 'var(--space-2)',
            padding: '12px 16px',
            background: 'var(--color-btn-primary-bg)',
            borderRadius: 'var(--radius-md)',
            fontFamily: 'var(--font-heading)',
            fontWeight: 600,
            color: 'var(--color-btn-primary-text)',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            justifyContent: 'center',
          }}
        >
          <CheckCircle2 size={16} />
          Entrada guardada — te sientes {MOOD_CONFIGS[savedMood].label.toLowerCase()}
        </div>
      )}

      {/* Acciones */}
      <div className="stack mt-3 animate-fade-in animate-fade-in-delay-3">
        <PrimaryButton
          fullWidth
          onClick={handleSave}
          disabled={!text.trim()}
          style={{ opacity: text.trim() ? 1 : 0.5, cursor: text.trim() ? 'pointer' : 'not-allowed', gap: 8 }}
        >
          <Save size={16} />
          Guardar entrada
        </PrimaryButton>
        {text.trim().length > 0 && (
          <GhostButton fullWidth onClick={handleClear} style={{ gap: 8 }}>
            <RotateCcw size={15} />
            Borrar y empezar de nuevo
          </GhostButton>
        )}
      </div>

      {/* Texto de apoyo */}
      <p
        className="text-sm text-secondary"
        style={{ textAlign: 'center', marginTop: 'var(--space-3)', fontStyle: 'italic', lineHeight: 1.6 }}
      >
        Tus pensamientos son privados. Escribir puede ayudarte a entender tus emociones.
      </p>
    </div>
  );
}
