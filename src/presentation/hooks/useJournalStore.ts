'use client';

import { useState, useEffect, useCallback } from 'react';
import { JournalEntry } from '@/domain/entities/JournalEntry';
import { LocalStorageJournalRepository } from '@/data/repositories/LocalStorageJournalRepository';

const repo = new LocalStorageJournalRepository();

/**
 * Presentation-layer hook that wraps the journal repository.
 * Provides reactive access to persisted entries.
 */
export function useJournalStore() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  useEffect(() => {
    setEntries(repo.getEntries());
  }, []);

  const saveEntry = useCallback((entry: JournalEntry) => {
    repo.saveEntry(entry);
    setEntries(repo.getEntries());
  }, []);

  const deleteEntry = useCallback((id: string) => {
    repo.deleteEntry(id);
    setEntries(repo.getEntries());
  }, []);

  return { entries, saveEntry, deleteEntry };
}
