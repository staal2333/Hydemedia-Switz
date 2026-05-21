import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // TODO: Integrate with your email service provider
    // Options: Mailchimp, ConvertKit, Brevo, Mailerlite, etc.
    
    // Example integration with Brevo (formerly Sendinblue) - FREE tier available
    if (process.env.BREVO_API_KEY) {
      const response = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'api-key': process.env.BREVO_API_KEY,
        },
        body: JSON.stringify({
          email,
          listIds: [parseInt(process.env.BREVO_LIST_ID || '1')],
          updateEnabled: true,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Brevo error:', error);
        
        // If contact already exists, consider it a success
        if (error.code === 'duplicate_parameter') {
          return NextResponse.json(
            { message: 'Already subscribed!' },
            { status: 200 }
          );
        }
        
        throw new Error('Failed to subscribe');
      }
    }
    
    // Example integration with Mailchimp
    else if (process.env.MAILCHIMP_API_KEY && process.env.MAILCHIMP_LIST_ID) {
      const datacenter = process.env.MAILCHIMP_API_KEY?.split('-')[1];
      const response = await fetch(
        `https://${datacenter}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.MAILCHIMP_API_KEY}`,
          },
          body: JSON.stringify({
            email_address: email,
            status: 'subscribed',
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.error('Mailchimp error:', error);
        
        // If contact already exists
        if (error.title === 'Member Exists') {
          return NextResponse.json(
            { message: 'Already subscribed!' },
            { status: 200 }
          );
        }
        
        throw new Error('Failed to subscribe');
      }
    }
    
    // Example integration with ConvertKit
    else if (process.env.CONVERTKIT_API_KEY && process.env.CONVERTKIT_FORM_ID) {
      const response = await fetch(
        `https://api.convertkit.com/v3/forms/${process.env.CONVERTKIT_FORM_ID}/subscribe`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            api_key: process.env.CONVERTKIT_API_KEY,
            email,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to subscribe');
      }
    }
    
    // If no email service is configured, just log it (for testing)
    else {
      console.log('Newsletter signup (no service configured):', email);
      console.log('⚠️  Add BREVO_API_KEY, MAILCHIMP_API_KEY, or CONVERTKIT_API_KEY to .env.local');
    }

    return NextResponse.json(
      { message: 'Successfully subscribed!' },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Newsletter error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    );
  }
}
