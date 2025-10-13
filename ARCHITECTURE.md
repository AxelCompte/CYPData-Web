# CYPData Web - Architecture Guide

## Project Overview

**Tech Stack:**
- **Framework:** Next.js 15.5.3 (App Router)
- **React:** 19.1.0
- **TypeScript:** 5.x
- **Styling:** Tailwind CSS 3.4.17 + CSS Variables
- **Animation:** Framer Motion 12.x
- **Forms:** Zod 4.x (validation)
- **Email:** Resend 6.x
- **Icons:** Lucide React, React Icons
- **Performance:** Web Vitals monitoring

---

## Architecture Principles

### 1. **Performance-First Architecture**

#### Page Loading Strategy
```
├── Static Generation (SSG) - Default for most pages
│   ├── Homepage (/)
│   ├── Services (/services)
│   ├── Case Studies (/case-studies)
│   └── Blog Posts (/blog/[slug])
│
├── Incremental Static Regeneration (ISR) - Dynamic content
│   ├── Blog index (/blog) - Revalidate: 3600s
│   └── Case studies detail - Revalidate: 7200s
│
└── Server Components - Interactive sections
    ├── Contact forms
    └── Search functionality
```

#### Code Splitting & Lazy Loading
- Use `next/dynamic` for heavy components
- Lazy load animations, videos, and non-critical UI
- Component-level code splitting for better performance

#### Image Optimization
- Use Next.js Image component exclusively
- WebP/AVIF formats with fallbacks
- Responsive images with proper `sizes` attribute
- Priority loading for above-the-fold images

---

### 2. **Folder Structure**

```
src/
├── app/                          # Next.js App Router
│   ├── (marketing)/              # Route group for public pages
│   │   ├── layout.tsx            # Marketing layout with nav/footer
│   │   ├── page.tsx              # Homepage
│   │   ├── services/
│   │   │   ├── page.tsx          # Services listing
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # Individual service pages
│   │   ├── case-studies/
│   │   │   ├── page.tsx          # Case studies grid
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # Individual case study
│   │   ├── blog/
│   │   │   ├── page.tsx          # Blog index
│   │   │   ├── [slug]/
│   │   │   │   └── page.tsx      # Blog post
│   │   │   └── category/
│   │   │       └── [category]/
│   │   │           └── page.tsx  # Category filter
│   │   ├── company/
│   │   │   ├── page.tsx          # About us
│   │   │   ├── team/
│   │   │   │   └── page.tsx      # Team page
│   │   │   └── careers/
│   │   │       └── page.tsx      # Careers
│   │   └── contact/
│   │       └── page.tsx          # Contact page
│   │
│   ├── api/                      # API routes
│   │   ├── contact/
│   │   │   └── route.ts          # Contact form submission
│   │   ├── newsletter/
│   │   │   └── route.ts          # Newsletter subscription
│   │   └── analytics/
│   │       └── route.ts          # Custom analytics
│   │
│   ├── globals.css               # Global styles & CSS variables
│   ├── layout.tsx                # Root layout
│   └── not-found.tsx             # 404 page
│
├── components/                   # Reusable components
│   ├── ui/                       # Base UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── Badge.tsx
│   │   └── index.ts              # Barrel export
│   │
│   ├── layout/                   # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Navigation.tsx
│   │   ├── MobileMenu.tsx
│   │   └── index.ts
│   │
│   ├── sections/                 # Page sections
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── CaseStudies.tsx
│   │   ├── Testimonials.tsx
│   │   ├── ContactForm.tsx
│   │   ├── ClientLogos.tsx
│   │   └── index.ts
│   │
│   ├── animations/               # Animation components
│   │   ├── FadeInWhenVisible.tsx
│   │   ├── StaggerContainer.tsx
│   │   ├── ParallaxSection.tsx
│   │   └── index.ts
│   │
│   ├── blog/                     # Blog-specific components
│   │   ├── BlogCard.tsx
│   │   ├── BlogGrid.tsx
│   │   ├── BlogPost.tsx
│   │   ├── AuthorBio.tsx
│   │   └── RelatedPosts.tsx
│   │
│   └── WebVitals.tsx             # Performance monitoring
│
├── lib/                          # Utilities & business logic
│   ├── constants/                # Constants & configuration
│   │   ├── theme.ts              # Theme colors & tokens
│   │   ├── seo.ts                # SEO defaults
│   │   └── routes.ts             # Route definitions
│   │
│   ├── utils/                    # Utility functions
│   │   ├── cn.ts                 # Class name merger
│   │   ├── formatters.ts         # Date, number formatters
│   │   ├── validators.ts         # Custom validators
│   │   └── seo.ts                # SEO helpers
│   │
│   ├── hooks/                    # Custom React hooks
│   │   ├── useIntersectionObserver.ts
│   │   ├── useMediaQuery.ts
│   │   ├── useScrollPosition.ts
│   │   └── useDebounce.ts
│   │
│   ├── services/                 # External services
│   │   ├── email.ts              # Email service (Resend)
│   │   ├── analytics.ts          # Analytics service
│   │   └── cms.ts                # CMS integration (future)
│   │
│   ├── types/                    # TypeScript types
│   │   ├── common.ts             # Shared types
│   │   ├── blog.ts               # Blog types
│   │   ├── caseStudy.ts          # Case study types
│   │   └── index.ts
│   │
│   └── validation.ts             # Zod schemas
│
├── data/                         # Static data & content
│   ├── services.ts               # Services data
│   ├── caseStudies.ts            # Case studies data
│   ├── team.ts                   # Team members
│   ├── testimonials.ts           # Client testimonials
│   └── translations.ts           # i18n translations
│
└── styles/                       # Additional styles
    └── animations.css            # Complex animations
```

---

### 3. **Design System - Centralized Tokens**

#### Theme Configuration (`lib/constants/theme.ts`)

```typescript
export const theme = {
  colors: {
    // Brand colors
    primary: {
      DEFAULT: '#a476ff',
      light: '#b58bff',
      dark: '#8c62f2',
      50: '#f5f0ff',
      100: '#ede5ff',
      500: '#a476ff',
      600: '#8c62f2',
      700: '#7c52ef',
      900: '#4a2c7a',
    },
    secondary: {
      DEFAULT: '#7c52ef',
      light: '#9368f5',
      dark: '#6b45d8',
    },
    // Gradient stops
    gradient: {
      from: '#a476ff',
      to: '#7c52ef',
    },
    // Semantic colors
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
    // Neutral colors
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
    },
  },
  
  spacing: {
    xs: '0.5rem',    // 8px
    sm: '1rem',      // 16px
    md: '1.5rem',    // 24px
    lg: '2rem',      // 32px
    xl: '3rem',      // 48px
    '2xl': '4rem',   // 64px
    '3xl': '6rem',   // 96px
    '4xl': '8rem',   // 128px
  },
  
  typography: {
    fontFamily: {
      sans: 'var(--font-inter)',
      mono: 'var(--font-jetbrains-mono)',
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
  },
  
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  
  animation: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    glow: '0 0 20px rgba(164, 118, 255, 0.3)',
  },
  
  borderRadius: {
    sm: '0.375rem',   // 6px
    DEFAULT: '0.5rem', // 8px
    md: '0.75rem',    // 12px
    lg: '1rem',       // 16px
    xl: '1.5rem',     // 24px
    '2xl': '2rem',    // 32px
    full: '9999px',
  },
} as const;

export type Theme = typeof theme;
```

#### CSS Variables (`app/globals.css`)

```css
:root {
  /* Colors */
  --color-primary: 164 118 255;
  --color-primary-light: 181 139 255;
  --color-primary-dark: 140 98 242;
  --color-secondary: 124 82 239;
  --color-secondary-light: 147 104 245;
  --color-secondary-dark: 107 69 216;
  
  /* Gradients */
  --gradient-start: #a476ff;
  --gradient-end: #7c52ef;
  
  /* Background */
  --background: 17 24 39;
  --foreground: 249 250 251;
  
  /* Spacing scale */
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2rem;
  --spacing-xl: 3rem;
  --spacing-2xl: 4rem;
  --spacing-3xl: 6rem;
  
  /* Typography */
  --font-sans: var(--font-inter), system-ui, sans-serif;
  --font-mono: var(--font-jetbrains-mono), monospace;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  --shadow-glow: 0 0 20px rgba(164, 118, 255, 0.3);
  
  /* Border radius */
  --radius-sm: 0.375rem;
  --radius-md: 0.75rem;
  --radius-lg: 1rem;
  --radius-xl: 1.5rem;
  
  /* Animation */
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
  --easing-default: cubic-bezier(0.4, 0, 0.2, 1);
}
```

#### Tailwind Config Integration

Update `tailwind.config.ts` to use centralized tokens:

```typescript
import { theme } from './src/lib/constants/theme';

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: theme.colors,
      spacing: theme.spacing,
      ...theme.typography,
      borderRadius: theme.borderRadius,
      boxShadow: theme.shadows,
      screens: theme.breakpoints,
    },
  },
};
```

---

### 4. **Component Architecture**

#### Component Hierarchy

```
Base UI Components (ui/)
    ↓
Layout Components (layout/)
    ↓
Section Components (sections/)
    ↓
Page Templates (app/)
```

#### Component Design Patterns

**1. Composition over Inheritance**
```typescript
// ✅ Good - Composable
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>

// ❌ Bad - Monolithic
<Card title="Title" content="Content" />
```

**2. Prop Drilling Prevention**
```typescript
// Use React Context for deep prop drilling
// Use component composition instead
```

**3. Type Safety**
```typescript
// Always define prop types
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}
```

---

### 5. **SEO Architecture**

#### Metadata Strategy

**Page-Level Metadata** (`app/[page]/page.tsx`)
```typescript
import { generateMetadata } from '@/lib/utils/seo';

export const metadata = generateMetadata({
  title: 'Services',
  description: 'Our comprehensive digital services...',
  keywords: ['service1', 'service2'],
  openGraph: {
    images: ['/og-services.jpg'],
  },
});
```

**Dynamic Metadata** (Blog posts, case studies)
```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getPost(params.slug);
  
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}
```

#### Structured Data (JSON-LD)

Create reusable structured data generators (`lib/utils/seo.ts`):

```typescript
export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "CyP Data",
  "url": "https://data.cypcore.com",
  "logo": "https://data.cypcore.com/logo.svg",
  "sameAs": [
    "https://linkedin.com/company/cypcore"
  ],
});

export const generateBlogPostSchema = (post: BlogPost) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": post.title,
  "image": post.coverImage,
  "author": {
    "@type": "Person",
    "name": post.author,
  },
  "publisher": {
    "@type": "Organization",
    "name": "CyP Data",
    "logo": {
      "@type": "ImageObject",
      "url": "https://data.cypcore.com/logo.svg",
    },
  },
  "datePublished": post.publishedAt,
  "dateModified": post.updatedAt,
});
```

#### Sitemap Generation

```typescript
// app/sitemap.ts
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllBlogPosts();
  const caseStudies = await getAllCaseStudies();
  
  return [
    {
      url: 'https://data.cypcore.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://data.cypcore.com/services',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...posts.map(post => ({
      url: `https://data.cypcore.com/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: 'weekly',
      priority: 0.7,
    })),
    ...caseStudies.map(study => ({
      url: `https://data.cypcore.com/case-studies/${study.slug}`,
      lastModified: study.updatedAt,
      changeFrequency: 'monthly',
      priority: 0.8,
    })),
  ];
}
```

---

### 6. **Performance Optimization**

#### Code Splitting Strategy

```typescript
// Heavy components - Lazy load
const HeavyChart = dynamic(() => import('@/components/HeavyChart'), {
  loading: () => <Skeleton />,
  ssr: false,
});

// Above-the-fold - No lazy loading
import Hero from '@/components/sections/Hero';

// Below-the-fold - Lazy load on viewport
const CaseStudies = dynamic(() => import('@/components/sections/CaseStudies'));
```

#### Image Optimization

```typescript
// Always use Next Image
import Image from 'next/image';

<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
  priority={isAboveFold}
  quality={85}
/>
```

#### Font Optimization

```typescript
// app/layout.tsx
import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
});
```

---

### 7. **Responsive Design**

#### Mobile-First Approach

```typescript
// Tailwind breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)

<div className="
  w-full           /* Mobile: full width */
  md:w-1/2         /* Tablet: half width */
  lg:w-1/3         /* Desktop: third width */
  p-4              /* Mobile: 16px padding */
  md:p-6           /* Tablet: 24px padding */
  lg:p-8           /* Desktop: 32px padding */
">
```

#### Responsive Component Pattern

```typescript
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';

export function ResponsiveComponent() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  return isMobile ? <MobileView /> : <DesktopView />;
}
```

---

### 8. **State Management**

#### Local State (useState)
- Component-specific state
- Form inputs
- UI toggles (modals, menus)

#### URL State (useSearchParams)
- Filters
- Pagination
- Search queries

#### Context (React Context)
- Theme preferences
- User session
- Language selection

#### Server State (React Query - Future)
- API data
- Cache management
- Background refetching

---

### 9. **Testing Strategy**

```
Unit Tests → Component Tests → Integration Tests → E2E Tests
```

#### Test Files Structure
```
src/
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   └── Button.test.tsx
│   └── sections/
│       ├── Hero.tsx
│       └── Hero.test.tsx
```

---

### 10. **Deployment & Build**

#### Environment Variables

```env
# .env.local
NEXT_PUBLIC_SITE_URL=https://data.cypcore.com
RESEND_API_KEY=re_xxxxx
CONTACT_EMAIL=alonso.molina@cypcore.com
ALLOWED_ORIGINS=https://data.cypcore.com,http://localhost:3000

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

#### Build Optimization

```json
// package.json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "analyze": "ANALYZE=true next build",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  }
}
```

---

## Migration Plan from Current Structure

### Phase 1: Setup (Week 1)
1. Create folder structure
2. Set up theme tokens in `lib/constants/theme.ts`
3. Update `tailwind.config.ts` and `globals.css`
4. Create base UI components

### Phase 2: Component Extraction (Week 2)
1. Extract existing components from `page.tsx`:
   - `EnhancedButton` → `components/ui/Button.tsx`
   - `FadeInWhenVisible` → `components/animations/FadeInWhenVisible.tsx`
   - `ExpandableServiceCard` → `components/sections/ServiceCard.tsx`
2. Create layout components (Header, Footer, Navigation)
3. Refactor page sections

### Phase 3: New Pages (Week 3-4)
1. Create Services page with dynamic routes
2. Create Case Studies page
3. Create Blog structure
4. Create Company/About page

### Phase 4: Optimization (Week 5)
1. Implement SEO metadata
2. Add structured data
3. Generate sitemap
4. Performance audit and fixes

---

## Best Practices Checklist

### Code Quality
- ✅ Use TypeScript for type safety
- ✅ Follow ESLint rules
- ✅ Use consistent naming conventions (camelCase, PascalCase)
- ✅ Keep components small (<200 lines)
- ✅ Extract reusable logic into hooks
- ✅ Document complex logic with comments

### Performance
- ✅ Lazy load non-critical components
- ✅ Use Next.js Image component
- ✅ Implement proper caching strategies
- ✅ Monitor Core Web Vitals
- ✅ Minimize client-side JavaScript
- ✅ Use Server Components where possible

### Accessibility
- ✅ Semantic HTML elements
- ✅ ARIA labels where needed
- ✅ Keyboard navigation support
- ✅ Focus management
- ✅ Sufficient color contrast
- ✅ Screen reader testing

### SEO
- ✅ Unique metadata per page
- ✅ Structured data (JSON-LD)
- ✅ Sitemap generation
- ✅ Robots.txt configuration
- ✅ Mobile-friendly design
- ✅ Fast page load times

### Security
- ✅ Environment variables for secrets
- ✅ Input validation with Zod
- ✅ Rate limiting on API routes
- ✅ CORS configuration
- ✅ Content Security Policy headers
- ✅ XSS protection

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion)
- [Web.dev Performance](https://web.dev/performance)
- [Schema.org Structured Data](https://schema.org)
