import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: ReactNode;
  variant?: 'blue' | 'green' | 'yellow' | 'red' | 'gray';
  className?: string;
}

export default function Badge({ children, variant = 'blue', className = '' }: BadgeProps) {
  const variantStyles = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    red: 'bg-red-100 text-red-800',
    gray: 'bg-gray-100 text-gray-800',
  };

  return (
    <span className={cn('inline-block px-3 py-1 text-xs font-semibold rounded-full', variantStyles[variant], className)}>
      {children}
    </span>
  );
}
