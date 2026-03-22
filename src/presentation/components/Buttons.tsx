import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  fullWidth?: boolean;
  size?: 'default' | 'sm';
}

export function PrimaryButton({ children, fullWidth, size = 'default', className = '', ...props }: ButtonProps) {
  const classes = [
    'btn',
    'btn--primary',
    fullWidth ? 'btn--full' : '',
    size === 'sm' ? 'btn--sm' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

export function GhostButton({ children, fullWidth, size = 'default', className = '', ...props }: ButtonProps) {
  const classes = [
    'btn',
    'btn--ghost',
    fullWidth ? 'btn--full' : '',
    size === 'sm' ? 'btn--sm' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
