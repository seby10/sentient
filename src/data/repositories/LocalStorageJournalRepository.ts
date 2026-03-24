import { JournalEntry } from '../../domain/entities/JournalEntry';
import { JournalRepository } from '../../domain/repositories/JournalRepositoryInterface';

const STORAGE_KEY = 'sentient_journal_entries';

/**
 * Data-layer implementation of JournalRepository using browser localStorage.
 * Date objects are serialized as ISO strings and rehydrated on read.
 * Gracefully returns [] during SSR (no window object).
 */
export class LocalStorageJournalRepository implements JournalRepository {
  private isClient(): boolean {
    return typeof window !== 'undefined';
  }

  saveEntry(entry: JournalEntry): void {
    if (!this.isClient()) return;
    const existing = this.getEntries();
    // Replace if same id, otherwise prepend (newest first)
    const updated = [
      entry,
      ...existing.filter(e => e.id !== entry.id),
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  getEntries(): JournalEntry[] {
    if (!this.isClient()) return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed: Array<JournalEntry & { createdAt: string }> = JSON.parse(raw);
      return parsed.map(e => ({
        ...e,
        createdAt: new Date(e.createdAt),
      }));
    } catch {
      return [];
    }
  }

  deleteEntry(id: string): void {
    if (!this.isClient()) return;
    const updated = this.getEntries().filter(e => e.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
}
