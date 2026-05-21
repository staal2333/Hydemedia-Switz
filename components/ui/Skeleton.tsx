import { HTMLAttributes } from 'react';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

export default function Skeleton({
  variant = 'text',
  width,
  height,
  animation = 'pulse',
  className = '',
  ...props
}: SkeletonProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'circular':
        return 'rounded-full';
      case 'rectangular':
        return 'rounded-none';
      case 'rounded':
        return 'rounded-xl';
      case 'text':
      default:
        return 'rounded';
    }
  };

  const getAnimationClasses = () => {
    switch (animation) {
      case 'wave':
        return 'animate-shimmer bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 bg-[length:200%_100%]';
      case 'pulse':
        return 'animate-pulse bg-slate-200';
      case 'none':
      default:
        return 'bg-slate-200';
    }
  };

  const style = {
    width: width || (variant === 'text' ? '100%' : undefined),
    height: height || (variant === 'text' ? '1em' : '100%'),
  };

  return (
    <div
      className={`${getVariantClasses()} ${getAnimationClasses()} ${className}`}
      style={style}
      {...props}
    />
  );
}

// Pre-built skeleton patterns
export function SkeletonText({ lines = 3, className = '' }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          width={i === lines - 1 ? '80%' : '100%'}
          height="1rem"
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-white rounded-xl p-6 shadow-lg ${className}`}>
      <Skeleton variant="rectangular" width="100%" height="200px" className="mb-4" />
      <Skeleton variant="text" width="60%" height="1.5rem" className="mb-2" />
      <SkeletonText lines={2} />
      <div className="flex gap-2 mt-4">
        <Skeleton variant="rounded" width="100px" height="2.5rem" />
        <Skeleton variant="rounded" width="100px" height="2.5rem" />
      </div>
    </div>
  );
}

export function SkeletonAvatar({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <Skeleton
      variant="circular"
      className={`${sizeClasses[size]} ${className}`}
    />
  );
}

export function SkeletonBlogCard({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-white rounded-2xl overflow-hidden shadow-lg ${className}`}>
      <Skeleton variant="rectangular" width="100%" height="250px" />
      <div className="p-6">
        <div className="flex gap-2 mb-3">
          <Skeleton variant="rounded" width="80px" height="1.5rem" />
          <Skeleton variant="rounded" width="80px" height="1.5rem" />
        </div>
        <Skeleton variant="text" width="90%" height="1.75rem" className="mb-3" />
        <SkeletonText lines={3} className="mb-4" />
        <div className="flex items-center gap-3">
          <SkeletonAvatar size="sm" />
          <div className="flex-1">
            <Skeleton variant="text" width="120px" height="1rem" className="mb-1" />
            <Skeleton variant="text" width="80px" height="0.875rem" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonCaseStudy({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-white rounded-2xl overflow-hidden shadow-lg ${className}`}>
      <div className="aspect-[4/3] relative">
        <Skeleton variant="rectangular" width="100%" height="100%" />
      </div>
      <div className="p-6">
        <div className="flex gap-2 mb-4">
          <Skeleton variant="rounded" width="70px" height="1.5rem" />
          <Skeleton variant="rounded" width="90px" height="1.5rem" />
        </div>
        <Skeleton variant="text" width="85%" height="1.5rem" className="mb-3" />
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2">
            <Skeleton variant="circular" width="1rem" height="1rem" />
            <Skeleton variant="text" width="150px" height="0.875rem" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton variant="circular" width="1rem" height="1rem" />
            <Skeleton variant="text" width="100px" height="0.875rem" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton variant="circular" width="1rem" height="1rem" />
            <Skeleton variant="text" width="120px" height="0.875rem" />
          </div>
        </div>
        <SkeletonText lines={2} className="mb-4" />
        <Skeleton variant="text" width="130px" height="1rem" />
      </div>
    </div>
  );
}

export function SkeletonTable({ rows = 5, columns = 4, className = '' }: { rows?: number; columns?: number; className?: string }) {
  return (
    <div className={`bg-white rounded-xl overflow-hidden shadow-lg ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              {Array.from({ length: columns }).map((_, i) => (
                <th key={i} className="px-6 py-4">
                  <Skeleton variant="text" height="1rem" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <td key={colIndex} className="px-6 py-4">
                    <Skeleton variant="text" height="1rem" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function SkeletonForm({ fields = 4, className = '' }: { fields?: number; className?: string }) {
  return (
    <div className={`space-y-6 ${className}`}>
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton variant="text" width="120px" height="1rem" />
          <Skeleton variant="rounded" width="100%" height="3rem" />
        </div>
      ))}
      <Skeleton variant="rounded" width="150px" height="3rem" />
    </div>
  );
}
