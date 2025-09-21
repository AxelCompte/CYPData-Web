import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema, checkRateLimit } from '@/lib/validation';
import { sendContactEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIP = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    '127.0.0.1';

    // Check rate limit
    const rateLimitResult = checkRateLimit(clientIP);
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { 
          error: 'Too many requests. Please try again later.',
          resetTime: rateLimitResult.resetTime
        },
        { status: 429 }
      );
    }

    // Parse and validate the request body
    const body = await request.json();
    
    // Validate with Zod schema
    const validationResult = contactFormSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: validationResult.error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }

    const { name, email, message, company, phone } = validationResult.data;

    // Basic spam detection
    const spamKeywords = ['viagra', 'casino', 'lottery', 'winner', 'urgent', 'crypto', 'bitcoin'];
    const messageText = `${name} ${email} ${message}`.toLowerCase();
    const hasSpam = spamKeywords.some(keyword => messageText.includes(keyword));
    
    if (hasSpam) {
      // Log suspicious submission but don't tell the user
      console.warn('Potential spam submission:', { name, email, clientIP });
      return NextResponse.json(
        { success: true, message: 'Thank you for your message!' },
        { status: 200 }
      );
    }

    // Send email
    const emailResult = await sendContactEmail({
      name,
      email, 
      message,
      company,
      phone
    });

    // Log successful submission
    console.log('Contact form submission successful:', {
      name,
      email: email.replace(/(.{2}).*(@.*)/, '$1***$2'), // Partially hide email in logs
      timestamp: new Date().toISOString(),
      clientIP,
      emailIds: {
        team: emailResult.teamEmailId,
        user: emailResult.userEmailId
      }
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your message! We\'ll get back to you within 24 hours.' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    
    // Don't expose internal errors to the client
    return NextResponse.json(
      { error: 'Sorry, there was an issue sending your message. Please try again or contact us directly.' },
      { status: 500 }
    );
  }
}