# GitHub Copilot Instructions for CYPData-Web

## Project Context

This is a Next.js 15 (App Router) project for CyP Data, a Barcelona-based tech company. The project emphasizes **performance, scalability, SEO, and reusable components** with centralized design tokens.

---

## Core Principles

### 1. **Component-Driven Development**
- Extract reusable components immediately
- Create in appropriate directory: `ui/`, `layout/`, `sections/`, `animations/`
- Use composition over configuration
- Keep components under 200 lines

### 2. **Centralized Design System**
- NEVER hardcode colors, spacing, or typography
- Always reference theme tokens from `lib/constants/theme.ts`
- Use CSS variables for runtime theme changes
- Use Tailwind utility classes with theme references

### 3. **Performance First**
- Use Server Components by default
- Add `'use client'` only when necessary (interactivity, hooks, browser APIs)
- Lazy load heavy components with `next/dynamic`
- Always use `next/image` for images with proper `sizes` attribute
- Implement code splitting for route-level components

### 4. **TypeScript Strict Mode**
- Define all prop interfaces/types
- No `any` types (use `unknown` if needed)
- Export types from component files
- Use discriminated unions for variants

### 5. **SEO Optimization**
- Generate metadata for every page
- Include structured data (JSON-LD) where applicable
- Use semantic HTML elements
- Implement proper heading hierarchy (h1 → h2 → h3)

---

## Code Style & Conventions

### Naming Conventions
```typescript
// Components: PascalCase
export function ButtonPrimary() {}

// Files: PascalCase for components, camelCase for utilities
// Button.tsx, theme.ts

// Props interfaces: ComponentNameProps
interface ButtonProps {}

// Hooks: use prefix
function useMediaQuery() {}

// Constants: SCREAMING_SNAKE_CASE
const MAX_RETRIES = 3;

// Functions: camelCase
function calculateTotal() {}
```

### Import Order
```typescript
// 1. React/Next imports
import { useState } from 'react';
import Image from 'next/image';

// 2. Third-party libraries
import { motion } from 'framer-motion';
import { z } from 'zod';

// 3. Internal components
import { Button } from '@/components/ui/Button';
import { Hero } from '@/components/sections/Hero';

// 4. Internal utilities
import { cn } from '@/lib/utils/cn';
import { theme } from '@/lib/constants/theme';

// 5. Types
import type { ButtonProps } from '@/types';

// 6. Styles (if any)
import styles from './Component.module.css';
```

---

## Component Templates

### Base UI Component
```typescript
import { cn } from '@/lib/utils/cn';
import type { ComponentPropsWithoutRef } from 'react';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-medium transition-all',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        'disabled:pointer-events-none disabled:opacity-50',
        {
          'bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90': variant === 'primary',
          'bg-gray-800 text-white hover:bg-gray-700': variant === 'secondary',
          'border border-gray-700 hover:border-primary': variant === 'outline',
        },
        {
          'px-3 py-1.5 text-sm': size === 'sm',
          'px-4 py-2 text-base': size === 'md',
          'px-6 py-3 text-lg': size === 'lg',
        },
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
}
```

### Section Component
```typescript
import { FadeInWhenVisible } from '@/components/animations/FadeInWhenVisible';
import { Container } from '@/components/layout/Container';

interface ServicesSectionProps {
  title: string;
  description: string;
  services: Service[];
}

export function ServicesSection({ title, description, services }: ServicesSectionProps) {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <FadeInWhenVisible>
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-6">
            {title}
          </h2>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
            {description}
          </p>
        </FadeInWhenVisible>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </Container>
    </section>
  );
}
```

### Page Template
```typescript
import type { Metadata } from 'next';
import { generateMetadata } from '@/lib/utils/seo';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { services } from '@/data/services';

export const metadata: Metadata = generateMetadata({
  title: 'Services',
  description: 'Our comprehensive digital services...',
  path: '/services',
});

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <ServicesSection
        title="Our Services"
        description="Comprehensive digital solutions..."
        services={services}
      />
    </main>
  );
}
```

---

## Responsive Design Pattern

```typescript
// Use Tailwind mobile-first approach
<div className="
  w-full p-4           // Mobile
  md:w-1/2 md:p-6     // Tablet
  lg:w-1/3 lg:p-8     // Desktop
">

// Or use custom hook for complex logic
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';

export function Component() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  return isMobile ? <MobileView /> : <DesktopView />;
}
```

---

## Animation Pattern

```typescript
// Use existing animation components
import { FadeInWhenVisible } from '@/components/animations/FadeInWhenVisible';
import { StaggerContainer, StaggerChild } from '@/components/animations/StaggerContainer';

export function AnimatedList({ items }) {
  return (
    <StaggerContainer>
      {items.map((item) => (
        <StaggerChild key={item.id}>
          <ItemCard item={item} />
        </StaggerChild>
      ))}
    </StaggerContainer>
  );
}

// For custom animations, use Framer Motion
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>
```

---

## Data Fetching Pattern

```typescript
// Static data from files
import { services } from '@/data/services';

// Server-side data fetching (use in Server Components)
async function getServices() {
  // Fetch from API or database
  const res = await fetch('https://api.example.com/services', {
    next: { revalidate: 3600 } // ISR: revalidate every hour
  });
  
  if (!res.ok) throw new Error('Failed to fetch');
  
  return res.json();
}

export default async function ServicesPage() {
  const services = await getServices();
  
  return <ServicesSection services={services} />;
}
```

---

## Form Handling Pattern

```typescript
'use client';

import { useState } from 'react';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
});

type FormData = z.infer<typeof formSchema>;

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '' });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate
    const result = formSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (!res.ok) throw new Error('Submission failed');
      
      // Handle success
      alert('Form submitted!');
    } catch (error) {
      console.error(error);
      alert('Error submitting form');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg"
        />
        {errors.name && <p className="text-error text-sm mt-1">{errors.name}</p>}
      </div>
      
      <Button type="submit" isLoading={isSubmitting}>
        Submit
      </Button>
    </form>
  );
}
```

---

## SEO Metadata Pattern

```typescript
// Static metadata
export const metadata: Metadata = {
  title: 'Services | CyP Data',
  description: 'Our services...',
};

// Dynamic metadata
export async function generateMetadata({ params }): Promise<Metadata> {
  const service = await getService(params.slug);
  
  return {
    title: `${service.title} | CyP Data`,
    description: service.description,
    openGraph: {
      title: service.title,
      description: service.description,
      images: [service.image],
    },
  };
}

// Add structured data
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      "name": service.title,
      "description": service.description,
    })
  }}
/>
```

---

## File Creation Guidelines

### DO Create:
- ✅ Component files (`components/**/*.tsx`)
- ✅ Type definition files (`lib/types/*.ts`)
- ✅ Utility functions (`lib/utils/*.ts`)
- ✅ Data files (`data/*.ts`)
- ✅ API routes (`app/api/**/route.ts`)
- ✅ Page files (`app/**/page.tsx`)

### DON'T Create:
- ❌ Markdown documentation files (unless explicitly requested)
- ❌ Duplicate components
- ❌ Inline styles files (use Tailwind)
- ❌ Test files (unless explicitly requested)

---

## Response Style

### DO:
- ✅ Implement features directly with code
- ✅ Use existing components and patterns
- ✅ Reference theme tokens and utilities
- ✅ Keep explanations concise and technical
- ✅ Focus on the task at hand

### DON'T:
- ❌ Create verbose summaries after completing tasks
- ❌ Repeat information unnecessarily
- ❌ Ask permission for standard operations
- ❌ Create markdown files unless explicitly requested
- ❌ Provide alternatives when a clear solution exists

---

## Common Patterns Reference

### Color Usage
```typescript
// ✅ GOOD - Use theme tokens
<div className="bg-primary text-white">
<div className="border-primary-light">
<div style={{ color: 'rgb(var(--color-primary))' }}>

// ❌ BAD - Hardcoded colors
<div className="bg-[#a476ff]">
<div style={{ color: '#a476ff' }}>
```

### Spacing Usage
```typescript
// ✅ GOOD - Use spacing scale
<div className="p-4 mb-6">
<div className="gap-md">

// ❌ BAD - Arbitrary values
<div className="p-[17px] mb-[23px]">
```

### Component Reusability
```typescript
// ✅ GOOD - Reusable component
<Button variant="primary" size="lg">Click</Button>

// ❌ BAD - Duplicate button styling everywhere
<button className="px-6 py-3 bg-gradient-to-r from-primary...">
```

---

## Performance Checklist

When creating new components/pages, ensure:

- [ ] Server Component by default (no `'use client'` unless needed)
- [ ] Images use `next/image` with proper `sizes`
- [ ] Heavy components are lazy loaded
- [ ] No unnecessary state or effects
- [ ] Proper TypeScript types
- [ ] Responsive design (mobile-first)
- [ ] Accessibility attributes (aria-label, etc.)
- [ ] SEO metadata (for pages)
- [ ] Error boundaries (for critical sections)

---

## Quick Reference Commands

```bash
# Development
npm run dev

# Build (production)
npm run build

# Type checking
npm run type-check

# Linting
npm run lint

# Bundle analysis
npm run analyze
```

---

## When in Doubt

1. Check existing patterns in the codebase
2. Reference ARCHITECTURE.md for structure
3. Use TypeScript for type safety
4. Keep it simple and maintainable
5. Performance and SEO are priorities
6. Reuse over reinvention
