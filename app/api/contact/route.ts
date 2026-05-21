import { NextRequest, NextResponse } from 'next/server';
import * as nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { formType, name, email, company, phone, message } = body;

    // Create email transporter (configure with your SMTP settings)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Prepare email content based on form type
    const subject =
      formType === 'advertiser'
        ? `New Advertiser Inquiry from ${name}`
        : `New Partner Application from ${name}`;

    let emailBody = `
      <h2>${subject}</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Company:</strong> ${company || 'N/A'}</p>
      <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
    `;

    if (formType === 'advertiser') {
      emailBody += `
        <p><strong>Campaign Type:</strong> ${body.campaignType}</p>
        <p><strong>Budget:</strong> ${body.budget || 'Not specified'}</p>
      `;
    } else {
      emailBody += `
        <p><strong>Property Address:</strong> ${body.propertyAddress}</p>
        <p><strong>Property Type:</strong> ${body.propertyType}</p>
      `;
    }

    emailBody += `
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `;

    // Send email to Hyde Media
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL || 'hello@hydemedia.ch',
      subject,
      html: emailBody,
    });

    // Send confirmation email to user
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email,
      subject: 'Thank you for contacting Hyde Media',
      html: `
        <h2>Thank you for your inquiry!</h2>
        <p>Hi ${name},</p>
        <p>We've received your ${formType === 'advertiser' ? 'campaign inquiry' : 'partnership application'} and will get back to you within 24 hours.</p>
        <p>Best regards,<br/>Hyde Media Team</p>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
