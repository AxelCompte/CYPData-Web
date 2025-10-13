import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactEmailData {
  name: string;
  email: string;
  message: string;
  company?: string;
  phone?: string;
}

export async function sendContactEmail(data: ContactEmailData) {
  try {
    // Send notification to your team
    const teamNotification = await resend.emails.send({
      from: 'Contact Form <contact@data.cypcore.com>', // You'll need to verify this domain with Resend
      to: [process.env.CONTACT_EMAIL || 'alonso.molina@cypcore.com'],
      subject: `New Contact Form Submission from ${data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #a476ff;">New Contact Form Submission</h2>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
            ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
          </div>
          
          <div style="background: #ffffff; padding: 20px; border-radius: 8px; border-left: 4px solid #a476ff;">
            <h3 style="margin-top: 0;">Message</h3>
            <p style="white-space: pre-wrap;">${data.message}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background: #e3f2fd; border-radius: 8px;">
            <p style="margin: 0; font-size: 14px; color: #666;">
              <strong>Sent from:</strong> CyP Data Contact Form<br>
              <strong>Time:</strong> ${new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })}
            </p>
          </div>
        </div>
      `,
    });

    // Send confirmation to the user
    const userConfirmation = await resend.emails.send({
      from: 'CyP Data <contact@data.cypcore.com>',
      to: [data.email],
      subject: 'Thank you for contacting CyP Data',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #a476ff;">CyP Data</h1>
            <p style="color: #666;">Digital Solutions & Business Intelligence</p>
          </div>
          
          <h2>Thank you for your message, ${data.name}!</h2>
          
          <p>We've received your message and will get back to you within 24 hours.</p>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Your Message</h3>
            <p style="white-space: pre-wrap; font-style: italic;">"${data.message}"</p>
          </div>
          
          <div style="margin-top: 30px; padding: 20px; background: linear-gradient(135deg, #a476ff, #7c52ef); border-radius: 8px; color: white;">
            <h3 style="margin-top: 0; color: white;">Contact Information</h3>
            <p style="margin: 5px 0;">📧 alonso.molina@cypcore.com</p>
            <p style="margin: 5px 0;">📱 +34 659 160 145</p>
            <p style="margin: 5px 0;">🏢 Ctra. Piera, 7A, Martorell, Barcelona</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="font-size: 14px; color: #666;">
              CyP Data - Leading tech company in Barcelona<br>
              Specializing in AI, Mobile Apps, Web Development & Business Intelligence
            </p>
          </div>
        </div>
      `,
    });

    return {
      success: true,
      teamEmailId: teamNotification.data?.id,
      userEmailId: userConfirmation.data?.id,
    };
  } catch (error) {
    console.error('Email sending failed:', error);
    throw new Error('Failed to send email');
  }
}