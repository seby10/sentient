'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookHeart, BarChart3, HeartHandshake, Clock } from 'lucide-react';
import { type LucideIcon } from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  Icon: LucideIcon;
}

const NAV_ITEMS: NavItem[] = [
  { href: '/',           label: 'Diario',    Icon: BookHeart      },
  { href: '/analytics',  label: 'Mi Estado', Icon: BarChart3      },
  { href: '/historial',  label: 'Historial', Icon: Clock          },
  { href: '/dashboard',  label: 'Apoyo',     Icon: HeartHandshake },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      {NAV_ITEMS.map(({ href, label, Icon }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`bottom-nav__item${isActive ? ' active' : ''}`}
            aria-current={isActive ? 'page' : undefined}
          >
            <span className="bottom-nav__icon" aria-hidden="true">
              <Icon size={20} strokeWidth={isActive ? 2.2 : 1.8} />
            </span>
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
