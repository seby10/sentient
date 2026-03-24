import type { Metadata, Viewport } from 'next';
import './globals.css';
import BottomNav from '@/presentation/components/BottomNav';
import AppHeader from '@/presentation/components/AppHeader';

export const metadata: Metadata = {
  title: 'Sentient — Comunidad de Salud Mental',
  description: 'Un espacio seguro y acogedor para el bienestar emocional y el apoyo.',
  manifest: '/manifest.json',
  appleWebApp: { capable: true, statusBarStyle: 'default', title: 'Sentient' },
};

export const viewport: Viewport = {
  themeColor: '#A7F3D0',
  width: 'device-width',
  initialScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <div className="app-shell">
            <AppHeader />
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              {children}
            </main>
            <BottomNav />
          </div>
      </body>
    </html>
  );
}
