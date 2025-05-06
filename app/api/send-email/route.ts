import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    // Parse the request body
    const body = await req.json();
    const { to, subject, text } = body;

    if (!to || !to.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email address is required' },
        { status: 400 }
      );
    }

    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        // Using environment variables for security
        user: process.env.EMAIL_USER || 'abdul.portfolio.bot@gmail.com', // Fallback for demo
        pass: process.env.EMAIL_PASS,
      },
      // For local development without real credentials
      ...(process.env.NODE_ENV === 'development' && !process.env.EMAIL_PASS
        ? { 
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
              user: 'demo@ethereal.email',
              pass: 'demopass',
            },
          }
        : {}),
    });

    // Email options
    const mailOptions = {
      from: 'Abdul\'s AI Clone <abdul.portfolio.bot@gmail.com>',
      to,
      subject: subject || 'Your Conversation with Abdul\'s AI',
      text: `${text}\n\n--\nSent from Abdul's Portfolio Chatbot`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #000; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0;">Your Conversation with Abdul's AI</h2>
          </div>
          <div style="padding: 20px; border: 1px solid #eee; border-radius: 0 0 8px 8px; background-color: #f9f9f9;">
            <div style="white-space: pre-wrap; font-family: monospace; background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #000;">
              ${text.replace(/\n/g, '<br>')}
            </div>
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
              <p>Sent from <a href="https://abdul-portfolio.vercel.app" style="color: #000; text-decoration: none; font-weight: bold;">Abdul's Portfolio</a></p>
            </div>
          </div>
        </div>
      `,
    };

    // For development without actual credentials
    if (process.env.NODE_ENV === 'development' && !process.env.EMAIL_PASS) {
      console.log('Development mode: Email would be sent to', to);
      console.log('Subject:', subject);
      console.log('Content:', text);
      
      return NextResponse.json({ success: true, message: 'Email sent (development mode)' });
    }

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
