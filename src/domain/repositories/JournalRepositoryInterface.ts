import { JournalEntry } from '../entities/JournalEntry';

/**
 * Domain interface for journal persistence.
 * Concrete implementations live in the data layer (localStorage, API, etc.)
 */
export interface JournalRepository {
  saveEntry(entry: JournalEntry): void;
  getEntries(): JournalEntry[];
  deleteEntry(id: string): void;
}
