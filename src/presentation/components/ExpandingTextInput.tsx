'use client';

import { useRef, useEffect } from 'react';

interface ExpandingTextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  id?: string;
  'aria-label'?: string;
}

export default function ExpandingTextInput({
  value,
  onChange,
  placeholder = 'Write how you feel…',
  id = 'journal-input',
  'aria-label': ariaLabel = 'Journal entry',
}: ExpandingTextInputProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  // Auto-expand height as content grows
  useEffect(() => {
    const ta = ref.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = `${ta.scrollHeight}px`;
  }, [value]);

  return (
    <textarea
      id={id}
      ref={ref}
      className="journal-textarea"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      aria-label={ariaLabel}
      rows={10}
      spellCheck={true}
    />
  );
}
