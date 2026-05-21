// Performance optimization utilities

// Debounce function for scroll/resize handlers
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for high-frequency events
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Lazy load images with intersection observer
export function lazyLoadImage(
  img: HTMLImageElement,
  options?: IntersectionObserverInit
) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target as HTMLImageElement;
        const src = target.dataset.src;
        
        if (src) {
          target.src = src;
          target.removeAttribute('data-src');
          observer.unobserve(target);
        }
      }
    });
  }, options || { rootMargin: '50px' });

  observer.observe(img);
  return observer;
}

// Preload critical images
export function preloadImages(urls: string[]) {
  urls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
}

// Check if user prefers reduced motion
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Get optimal image size based on viewport
export function getOptimalImageSize(): {
  width: number;
  quality: number;
} {
  if (typeof window === 'undefined') {
    return { width: 1920, quality: 85 };
  }

  const width = window.innerWidth;
  
  if (width <= 640) {
    return { width: 640, quality: 75 };
  } else if (width <= 1024) {
    return { width: 1024, quality: 80 };
  } else if (width <= 1920) {
    return { width: 1920, quality: 85 };
  } else {
    return { width: 2560, quality: 90 };
  }
}

// Measure performance
export function measurePerformance(label: string, fn: () => void) {
  if (typeof window === 'undefined' || !window.performance) {
    fn();
    return;
  }

  const start = performance.now();
  fn();
  const end = performance.now();
  
  console.log(`[Performance] ${label}: ${(end - start).toFixed(2)}ms`);
}

// Request idle callback fallback
export const requestIdleCallback =
  typeof window !== 'undefined' && 'requestIdleCallback' in window
    ? window.requestIdleCallback
    : (cb: IdleRequestCallback) => setTimeout(cb, 1);

export const cancelIdleCallback =
  typeof window !== 'undefined' && 'cancelIdleCallback' in window
    ? window.cancelIdleCallback
    : (id: number) => clearTimeout(id);
