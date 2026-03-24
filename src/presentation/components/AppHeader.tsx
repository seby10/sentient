import { Sparkles } from 'lucide-react';

/**
 * Global app header with Sentient branding.
 * Server Component — no client state needed.
 */
export default function AppHeader() {
  return (
    <header className="app-header" aria-label="Sentient">
      <span className="app-header__icon" aria-hidden="true">
        <Sparkles size={18} strokeWidth={1.8} />
      </span>
      <span className="app-header__wordmark">Sentient</span>
    </header>
  );
}
