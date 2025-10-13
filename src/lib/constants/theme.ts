/**
 * Centralized Theme Configuration
 * 
 * This file contains all design tokens (colors, spacing, typography, etc.)
 * Update values here to apply changes across the entire application.
 */

export const theme = {
  /**
   * Color Palette
   * All colors should be referenced from here, never hardcoded in components
   */
  colors: {
    // Brand Colors
    primary: {
      DEFAULT: '#a476ff',
      light: '#b58bff',
      dark: '#8c62f2',
      50: '#f5f0ff',
      100: '#ede5ff',
      200: '#ddd0ff',
      300: '#c8b0ff',
      400: '#b58bff',
      500: '#a476ff',
      600: '#8c62f2',
      700: '#7c52ef',
      800: '#6b45d8',
      900: '#4a2c7a',
    },
    
    secondary: {
      DEFAULT: '#7c52ef',
      light: '#9368f5',
      dark: '#6b45d8',
      50: '#f3f0ff',
      100: '#e8e1ff',
      200: '#d4c7ff',
      300: '#b8a3ff',
      400: '#9e7dff',
      500: '#7c52ef',
      600: '#6b45d8',
      700: '#5a39c1',
      800: '#4a2eaa',
      900: '#3a2393',
    },
    
    // Gradient Colors
    gradient: {
      from: '#a476ff',
      to: '#7c52ef',
      stops: {
        0: '#a476ff',
        50: '#9064f7',
        100: '#7c52ef',
      },
    },
    
    // Semantic Colors
    success: {
      DEFAULT: '#10b981',
      light: '#34d399',
      dark: '#059669',
    },
    warning: {
      DEFAULT: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706',
    },
    error: {
      DEFAULT: '#ef4444',
      light: '#f87171',
      dark: '#dc2626',
    },
    info: {
      DEFAULT: '#3b82f6',
      light: '#60a5fa',
      dark: '#2563eb',
    },
    
    // Neutral/Gray Scale
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
      950: '#030712',
    },
    
    // Background & Foreground
    background: {
      DEFAULT: '#111827',
      light: '#1f2937',
      dark: '#030712',
    },
    foreground: {
      DEFAULT: '#f9fafb',
      muted: '#d1d5db',
      subtle: '#9ca3af',
    },
  },
  
  /**
   * Spacing Scale
   * Consistent spacing throughout the application
   */
  spacing: {
    xs: '0.5rem',    // 8px
    sm: '1rem',      // 16px
    md: '1.5rem',    // 24px
    lg: '2rem',      // 32px
    xl: '3rem',      // 48px
    '2xl': '4rem',   // 64px
    '3xl': '6rem',   // 96px
    '4xl': '8rem',   // 128px
    '5xl': '12rem',  // 192px
  },
  
  /**
   * Typography System
   */
  typography: {
    fontFamily: {
      sans: 'var(--font-inter), system-ui, -apple-system, sans-serif',
      mono: 'var(--font-jetbrains-mono), "Courier New", monospace',
    },
    
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.025em' }],
      sm: ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0' }],
      base: ['1rem', { lineHeight: '1.5rem', letterSpacing: '0' }],
      lg: ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '-0.01em' }],
      xl: ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '-0.01em' }],
      '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.02em' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.02em' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.02em' }],
      '5xl': ['3rem', { lineHeight: '1', letterSpacing: '-0.025em' }],
      '6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.025em' }],
      '7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.025em' }],
    },
    
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
  },
  
  /**
   * Responsive Breakpoints
   */
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  
  /**
   * Animation Tokens
   */
  animation: {
    duration: {
      instant: '0ms',
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
      slower: '700ms',
      slowest: '1000ms',
    },
    
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      linear: 'linear',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
  
  /**
   * Box Shadows
   */
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    // Custom shadows
    glow: '0 0 20px rgba(164, 118, 255, 0.3)',
    glowLg: '0 0 40px rgba(164, 118, 255, 0.4)',
  },
  
  /**
   * Border Radius
   */
  borderRadius: {
    none: '0',
    sm: '0.375rem',   // 6px
    DEFAULT: '0.5rem', // 8px
    md: '0.75rem',    // 12px
    lg: '1rem',       // 16px
    xl: '1.5rem',     // 24px
    '2xl': '2rem',    // 32px
    '3xl': '3rem',    // 48px
    full: '9999px',
  },
  
  /**
   * Z-Index Scale
   */
  zIndex: {
    auto: 'auto',
    0: '0',
    10: '10',
    20: '20',
    30: '30',
    40: '40',
    50: '50',
    // Specific use cases
    dropdown: '1000',
    sticky: '1020',
    fixed: '1030',
    modalBackdrop: '1040',
    modal: '1050',
    popover: '1060',
    tooltip: '1070',
  },
  
  /**
   * Container Widths
   */
  container: {
    xs: '20rem',      // 320px
    sm: '24rem',      // 384px
    md: '28rem',      // 448px
    lg: '32rem',      // 512px
    xl: '36rem',      // 576px
    '2xl': '42rem',   // 672px
    '3xl': '48rem',   // 768px
    '4xl': '56rem',   // 896px
    '5xl': '64rem',   // 1024px
    '6xl': '72rem',   // 1152px
    '7xl': '80rem',   // 1280px
    full: '100%',
  },
} as const;

/**
 * Export TypeScript type for theme
 */
export type Theme = typeof theme;

/**
 * Helper function to get nested theme values
 * Usage: getThemeValue(theme.colors.primary, 'light') => '#b58bff'
 */
export function getThemeValue<T extends Record<string, any>>(
  obj: T,
  key: keyof T
): T[keyof T] {
  return obj[key];
}

/**
 * Generate gradient CSS string from theme
 */
export function getGradient(
  direction: 'to-r' | 'to-l' | 'to-t' | 'to-b' | 'to-br' | 'to-tr' = 'to-r'
): string {
  const directionMap = {
    'to-r': 'to right',
    'to-l': 'to left',
    'to-t': 'to top',
    'to-b': 'to bottom',
    'to-br': 'to bottom right',
    'to-tr': 'to top right',
  };
  
  return `linear-gradient(${directionMap[direction]}, ${theme.colors.gradient.from}, ${theme.colors.gradient.to})`;
}

/**
 * Get responsive value based on breakpoint
 */
export function getResponsiveValue<T>(
  values: Partial<Record<keyof typeof theme.breakpoints | 'base', T>>
): T | undefined {
  // This is a helper type, actual implementation should be done in components
  return values.base;
}
