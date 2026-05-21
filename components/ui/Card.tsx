import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
}

export default function Card({ children, className = '', hoverable = false }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-lg border border-slate-200 overflow-hidden',
        hoverable && 'hover:shadow-lg hover:border-nordic-blue transition-all cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
}
