# 📧 Email Integration Setup Guide

## 🚀 Quick Setup (5 minutes)

### 1. **Get Resend API Key**
1. Go to [resend.com](https://resend.com) and create a free account
2. Navigate to API Keys section
3. Create a new API key
4. Copy the key (starts with `re_`)

### 2. **Update Environment Variables**
Open `.env.local` and replace the placeholder:
```env
RESEND_API_KEY=re_your_actual_api_key_here
CONTACT_EMAIL=alonso.molina@cypcore.com
ALLOWED_ORIGINS=https://data.cypcore.com,http://localhost:3000
```

### 3. **Verify Domain with Resend**
1. In Resend dashboard, go to "Domains"
2. Add `data.cypcore.com` 
3. Follow DNS setup instructions
4. Wait for verification (usually 5-10 minutes)

### 4. **Test the Integration**
```bash
npm run dev
```
- Navigate to your contact form
- Fill out and submit the form
- Check for emails in both:
  - Your inbox (user confirmation)
  - Recipient's inbox (team notification)

## 🔧 **Features Implemented**

### ✅ **Security**
- **Rate Limiting**: 5 emails per hour per IP address
- **Input Validation**: Zod schema validation
- **Spam Detection**: Basic keyword filtering
- **CORS Protection**: Only allowed origins can submit

### ✅ **User Experience**
- **Dual Email System**: 
  - User gets confirmation email
  - Team gets notification email
- **Enhanced Form**: Name, email, company, phone, message
- **Real-time Feedback**: Success/error messages with animations
- **Mobile Responsive**: Works on all devices

### ✅ **Professional Email Templates**
- **Branded Design**: Matches your company colors
- **Contact Information**: Includes all business details
- **Professional Layout**: Clean, readable format

## 🛡️ **Security Features**

### Rate Limiting
- Prevents spam by limiting submissions per IP
- Automatic cleanup of old entries
- Configurable limits and time windows

### Input Validation
- Name: 2-100 characters, letters only
- Email: Valid email format
- Phone: International format support
- Message: 10-2000 characters
- Company: Optional, up to 100 characters

### Spam Protection
- Keyword detection for common spam terms
- Silent rejection (spammers think it worked)
- IP logging for suspicious activity

## 🎨 **Email Templates**

### User Confirmation Email
- Personalized greeting
- Message echo for confirmation
- Complete contact information
- Professional branding

### Team Notification Email
- Structured contact information
- Clear message display
- Timestamp and metadata
- Easy-to-read format

## 📊 **Monitoring & Analytics**

The system logs:
- Successful submissions (with partial email hiding)
- Spam attempts
- Rate limit violations
- Email delivery status

## 🔄 **Alternative Email Services**

If you prefer a different service, here's how to switch:

### SendGrid
```bash
npm install @sendgrid/mail
```

### Nodemailer (SMTP)
```bash
npm install nodemailer
```

### AWS SES
```bash
npm install @aws-sdk/client-ses
```

The API route is designed to be easily adaptable to any email service.

## 🚨 **Troubleshooting**

### Common Issues:

1. **Emails not sending**: Check API key and domain verification
2. **Rate limit errors**: Wait 1 hour or check IP blocking
3. **Validation errors**: Check form field requirements
4. **CORS errors**: Verify allowed origins in environment variables

### Debug Mode:
Check browser console and server logs for detailed error messages.

## 📈 **Production Checklist**

- [ ] Domain verified with Resend
- [ ] Environment variables set
- [ ] Rate limiting configured appropriately
- [ ] Contact email addresses confirmed
- [ ] Email templates tested
- [ ] Mobile responsiveness verified
- [ ] CORS origins updated for production domain