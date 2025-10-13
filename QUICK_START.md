# Quick Start Guide - New Architecture

## 🚀 Getting Started

Your project now has a scalable, performance-optimized architecture ready for growth. Here's how to start building new pages and features.

---

## 1. Creating a New Page

### Example: Services Page

```bash
# Create the page directory
mkdir -p src/app/\(marketing\)/services
```

```typescript
// src/app/(marketing)/services/page.tsx
import type { Metadata } from 'next';
import { generateMetadata } from '@/lib/utils/seo';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { services } from '@/data/services';

export const metadata: Metadata = generateMetadata({
  title: 'Services',
  description: 'Explore our comprehensive digital services including mobile development, web applications, and business intelligence solutions.',
  path: '/services',
  keywords: ['mobile development', 'web development', 'business intelligence', 'big data', 'AI solutions'],
});

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-gray-900">
      <ServicesSection services={services} />
    </main>
  );
}
```

---

## 2. Creating a Reusable Component

### Example: Button Component

```typescript
// src/components/ui/Button.tsx
import { cn } from '@/lib/utils/cn';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'md', 
    isLoading, 
    className, 
    children, 
    disabled,
    ...props 
  }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center',
          'font-medium rounded-lg transition-all',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
          'disabled:pointer-events-none disabled:opacity-50',
          
          // Variant styles
          {
            'bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90': variant === 'primary',
            'bg-gray-800 text-white hover:bg-gray-700': variant === 'secondary',
            'border border-gray-700 hover:border-primary text-white': variant === 'outline',
            'hover:bg-gray-800 text-white': variant === 'ghost',
          },
          
          // Size styles
          {
            'px-3 py-1.5 text-sm': size === 'sm',
            'px-4 py-2 text-base': size === 'md',
            'px-6 py-3 text-lg': size === 'lg',
          },
          
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Loading...
          </span>
        ) : children}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

### Usage:
```typescript
import { Button } from '@/components/ui/Button';

<Button variant="primary" size="lg" onClick={handleClick}>
  Get Started
</Button>
```

---

## 3. Using Centralized Theme Tokens

### In Tailwind Classes:
```typescript
// ✅ GOOD - Use theme tokens
<div className="bg-primary text-white border-primary-light rounded-lg p-md">
  Content
</div>

// ❌ BAD - Hardcoded values
<div className="bg-[#a476ff] text-white border-[#b58bff] rounded-lg p-6">
  Content
</div>
```

### In Inline Styles:
```typescript
import { theme } from '@/lib/constants/theme';

<div style={{ 
  backgroundColor: theme.colors.primary.DEFAULT,
  padding: theme.spacing.md,
  borderRadius: theme.borderRadius.lg,
}}>
  Content
</div>
```

### Custom Gradient:
```typescript
import { getGradient } from '@/lib/constants/theme';

<div className="relative">
  <div style={{ background: getGradient('to-br') }}>
    Gradient Background
  </div>
</div>
```

---

## 4. Adding SEO to Pages

### Static Metadata:
```typescript
import { generateMetadata } from '@/lib/utils/seo';

export const metadata = generateMetadata({
  title: 'About Us',
  description: 'Learn about CyP Data and our mission...',
  path: '/company/about',
  keywords: ['about cypdata', 'tech company barcelona'],
});
```

### Dynamic Metadata:
```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getBlogPost(params.slug);
  
  return generateMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${params.slug}`,
    keywords: post.tags,
    image: post.coverImage,
    type: 'article',
    publishedTime: post.publishedAt,
    author: post.author,
  });
}
```

### Adding Structured Data:
```typescript
import { generateArticleSchema } from '@/lib/utils/seo';

export default function BlogPost({ post }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateArticleSchema({
            title: post.title,
            description: post.excerpt,
            image: post.coverImage,
            author: post.author,
            publishedAt: post.publishedAt,
            updatedAt: post.updatedAt,
            url: `https://data.cypcore.com/blog/${post.slug}`,
          }))
        }}
      />
      <article>
        {/* Post content */}
      </article>
    </>
  );
}
```

---

## 5. Creating Data Files

### Example: Services Data
```typescript
// src/data/services.ts
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  technologies: string[];
  image?: string;
}

export const services: Service[] = [
  {
    id: 'mobile-apps',
    title: 'Native Mobile Apps',
    description: 'Custom Android and iOS applications built with cutting-edge technology.',
    icon: '📱',
    features: [
      'Native iOS and Android development',
      'Cross-platform with Flutter',
      'App Store optimization',
      'Maintenance and updates',
    ],
    technologies: ['Swift', 'Kotlin', 'Flutter', 'React Native'],
    image: '/services/mobile.jpg',
  },
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'Modern web applications and websites with responsive design.',
    icon: '🌐',
    features: [
      'Responsive web design',
      'Progressive Web Apps',
      'E-commerce solutions',
      'CMS integration',
    ],
    technologies: ['Next.js', 'React', 'Vue.js', 'Node.js'],
    image: '/services/web.jpg',
  },
  // ... more services
];
```

---

## 6. Responsive Design Patterns

### Mobile-First Approach:
```typescript
<div className="
  // Mobile (default)
  w-full p-4 text-base
  
  // Tablet (md: 768px)
  md:w-1/2 md:p-6 md:text-lg
  
  // Desktop (lg: 1024px)
  lg:w-1/3 lg:p-8 lg:text-xl
  
  // Large Desktop (xl: 1280px)
  xl:w-1/4
">
  Content
</div>
```

### Using Media Query Hook:
```typescript
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';

export function ResponsiveComponent() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  
  return (
    <>
      {isMobile && <MobileView />}
      {isDesktop && <DesktopView />}
    </>
  );
}
```

---

## 7. Animations

### Using Existing Animation Components:
```typescript
import { FadeInWhenVisible } from '@/components/animations/FadeInWhenVisible';
import { StaggerContainer, StaggerChild } from '@/components/animations/StaggerContainer';

export function AnimatedSection({ items }) {
  return (
    <FadeInWhenVisible>
      <h2>Our Services</h2>
      <StaggerContainer>
        {items.map((item) => (
          <StaggerChild key={item.id}>
            <ServiceCard service={item} />
          </StaggerChild>
        ))}
      </StaggerContainer>
    </FadeInWhenVisible>
  );
}
```

### Custom Framer Motion Animation:
```typescript
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ 
    duration: 0.5,
    ease: 'easeOut'
  }}
>
  Content
</motion.div>
```

---

## 8. Forms with Validation

```typescript
'use client';

import { useState } from 'react';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    // Validate
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
        message: fieldErrors.message?.[0],
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
      
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      alert('Error sending message');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary"
        />
        {errors.name && <p className="text-error text-sm mt-1">{errors.name}</p>}
      </div>
      
      <Button type="submit" isLoading={isSubmitting}>
        Send Message
      </Button>
    </form>
  );
}
```

---

## 9. Performance Optimization

### Lazy Loading Components:
```typescript
import dynamic from 'next/dynamic';

// Heavy component - load only when needed
const HeavyChart = dynamic(
  () => import('@/components/HeavyChart'),
  {
    loading: () => <div>Loading chart...</div>,
    ssr: false, // Disable SSR for client-only components
  }
);

// Below the fold - load when in viewport
const Footer = dynamic(() => import('@/components/layout/Footer'));
```

### Image Optimization:
```typescript
import Image from 'next/image';

<Image
  src="/services/mobile.jpg"
  alt="Mobile App Development"
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
  priority={false} // Set true for above-the-fold images
  quality={85}
  className="rounded-lg"
/>
```

---

## 10. Common Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Type check
npm run type-check

# Lint code
npm run lint

# Analyze bundle
npm run analyze
```

---

## 📚 Reference Files

- **ARCHITECTURE.md** - Full architecture guide
- **.github/copilot-instructions.md** - Coding standards
- **SETUP_COMPLETE.md** - Setup summary
- **src/lib/constants/theme.ts** - Design tokens
- **src/lib/constants/seo.ts** - SEO configuration
- **src/lib/utils/seo.ts** - SEO utilities
- **src/lib/utils/cn.ts** - Class name utilities

---

## ✅ Checklist for New Pages

- [ ] Create page file in appropriate directory
- [ ] Add metadata using `generateMetadata()`
- [ ] Use centralized theme tokens (no hardcoded colors/spacing)
- [ ] Implement responsive design (mobile-first)
- [ ] Add structured data (JSON-LD) if applicable
- [ ] Use Next.js Image for all images
- [ ] Lazy load heavy components
- [ ] Add proper TypeScript types
- [ ] Test on mobile and desktop
- [ ] Check Lighthouse score

---

## 🎯 Next Steps

1. Start extracting components from `page.tsx`
2. Create the services page
3. Set up the case studies page
4. Build the blog structure
5. Optimize performance

Happy coding! 🚀
