import Link from 'next/link';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  target?: '_blank' | '_self';
  rel?: string;
}

export default function Button({
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  disabled = false,
  type = 'button',
  target,
  rel,
}: ButtonProps) {
  const baseStyles = 'font-semibold rounded-lg transition-all duration-200 inline-flex items-center justify-center gap-2 cursor-pointer';

  const variantStyles = {
    primary: 'bg-nordic-blue text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed',
    secondary: 'border-2 border-nordic-blue text-nordic-blue hover:bg-nordic-blue hover:text-white disabled:opacity-50 disabled:cursor-not-allowed',
    outline: 'border border-slate-300 text-slate-900 hover:border-nordic-blue disabled:opacity-50 disabled:cursor-not-allowed',
  };

  const sizeStyles = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const combinedStyles = cn(baseStyles, variantStyles[variant], sizeStyles[size], className);

  if (href && !disabled) {
    return (
      <Link href={href} className={combinedStyles} target={target} rel={rel}>
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={combinedStyles}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}
