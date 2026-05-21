// Consistent color theme for Hyde Media website
// Light blue/white gradient with subtle variations

export const colorTheme = {
  // Main background gradient (like homepage)
  mainGradient: 'linear-gradient(to bottom, rgb(224 242 254) 0%, rgb(240 249 255) 20%, rgb(248 250 252) 40%, rgb(240 249 255) 60%, rgb(248 250 252) 80%, rgb(255 255 255) 100%)',
  
  // Tailwind classes for consistent use
  mainGradientClasses: 'bg-gradient-to-b from-sky-100/60 via-blue-50/30 to-white',
  
  // Decorative elements
  decorativeBlue1: 'bg-blue-100/30',
  decorativeBlue2: 'bg-sky-100/25',
  decorativeSky: 'bg-sky-50/20',
  
  // Accent colors
  accentBlue: 'bg-blue-600',
  accentSky: 'bg-sky-500',
  
  // Text colors
  textPrimary: 'text-slate-900',
  textSecondary: 'text-slate-600',
  textMuted: 'text-slate-500',
};

// For copy-paste into components:
// className="bg-gradient-to-b from-sky-100/60 via-blue-50/30 to-white"
