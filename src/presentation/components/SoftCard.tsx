import React from 'react';

interface CardProps {
  children: React.ReactNode;
  size?: 'default' | 'sm';
  className?: string;
  style?: React.CSSProperties;
}

export default function SoftCard({ children, size = 'default', className = '', style }: CardProps) {
  const classes = ['card', size === 'sm' ? 'card--sm' : '', className].filter(Boolean).join(' ');
  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
}
