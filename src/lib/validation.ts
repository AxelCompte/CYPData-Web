import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s'-]+$/, 'Name contains invalid characters'),
  
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),
  
  company: z
    .string()
    .max(100, 'Company name must be less than 100 characters')
    .optional(),
  
  phone: z
    .string()
    .regex(/^[+]?[\d\s\-\(\)]{8,20}$/, 'Please enter a valid phone number')
    .optional()
    .or(z.literal('')),
  
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Rate limiting helper
export interface RateLimitData {
  ip: string;
  timestamp: number;
  count: number;
}

const rateLimitMap = new Map<string, RateLimitData>();

export function checkRateLimit(ip: string): { allowed: boolean; resetTime?: number } {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxRequests = 5; // Max 5 emails per hour per IP
  
  const existing = rateLimitMap.get(ip);
  
  if (!existing || now - existing.timestamp > windowMs) {
    // Reset or create new entry
    rateLimitMap.set(ip, { ip, timestamp: now, count: 1 });
    return { allowed: true };
  }
  
  if (existing.count >= maxRequests) {
    return { 
      allowed: false, 
      resetTime: existing.timestamp + windowMs 
    };
  }
  
  // Increment count
  existing.count++;
  rateLimitMap.set(ip, existing);
  
  return { allowed: true };
}

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000;
  
  for (const [ip, data] of rateLimitMap.entries()) {
    if (now - data.timestamp > windowMs) {
      rateLimitMap.delete(ip);
    }
  }
}, 5 * 60 * 1000); // Clean every 5 minutes