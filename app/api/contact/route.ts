import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const { name, email, company, service, message } = await req.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Read from environment variables
    const brevoApiKey   = process.env.BREVO_API_KEY?.trim();
    const senderEmail   = process.env.BREVO_SENDER_EMAIL?.trim() || 'vinusxtech@gmail.com';
    const senderName    = process.env.BREVO_SENDER_NAME?.trim()  || 'VinusXTech';

    if (!brevoApiKey) {
      console.error('[Contact] BREVO_API_KEY is missing');
      return NextResponse.json({ error: 'Server configuration error: missing API key' }, { status: 500 });
    }

    console.log('[Contact] API key prefix:', brevoApiKey.substring(0, 14));
    console.log('[Contact] Sender:', senderEmail);

    const emailPayload = {
      sender: {
        name: senderName,
        email: senderEmail,
      },
      to: [
        { email: 'sambhavmehra712@gmail.com', name: 'Sambhav Mehra'  },
      ],
      replyTo: {
        email: email,
        name: name,
      },
      subject: `🔔 New Lead: ${name} — ${company || 'Individual'}`,
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 28px; background: #0a0a0f; color: #ffffff; border-radius: 14px; border: 1px solid #1e1e3a;">

          <!-- Header -->
          <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #1e1e3a;">
            <h1 style="margin: 0; font-size: 26px; color: #00d4ff; letter-spacing: 2px;">VinusXTech</h1>
            <p style="margin: 6px 0 0; color: #666; font-size: 13px;">New Contact Form Submission</p>
          </div>

          <!-- Details table -->
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px 0; color: #888; width: 130px; font-size: 13px; vertical-align: top;">Name</td>
              <td style="padding: 10px 0; color: #fff; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #888; font-size: 13px; vertical-align: top;">Email</td>
              <td style="padding: 10px 0;">
                <a href="mailto:${email}" style="color: #00d4ff; text-decoration: none;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #888; font-size: 13px; vertical-align: top;">Company</td>
              <td style="padding: 10px 0; color: #ccc;">${company || '—'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #888; font-size: 13px; vertical-align: top;">Service</td>
              <td style="padding: 10px 0;">
                <span style="color: #00ff88; background: #00ff8815; padding: 3px 10px; border-radius: 20px; font-size: 13px;">${service || 'Not specified'}</span>
              </td>
            </tr>
          </table>

          <!-- Message -->
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #1e1e3a;">
            <p style="margin: 0 0 10px; color: #a855f7; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Message</p>
            <div style="white-space: pre-wrap; color: #ccc; background: #111827; padding: 16px; border-radius: 8px; border-left: 3px solid #a855f7; font-size: 14px; line-height: 1.6;">
              ${message}
            </div>
          </div>

          <!-- Footer -->
          <p style="margin-top: 24px; color: #444; font-size: 11px; text-align: center;">
            Sent from the contact form at <a href="https://vinusxtech.me" style="color: #555; text-decoration: none;">vinusxtech.me</a>
          </p>
        </div>
      `,
    };

    console.log('[Contact] Sending to:', emailPayload.to.map(t => t.email).join(', '));

    const brevoResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept':       'application/json',
        'api-key':      brevoApiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify(emailPayload),
    });

    const responseText = await brevoResponse.text();
    console.log('[Contact] Brevo status:', brevoResponse.status);
    console.log('[Contact] Brevo body:',   responseText);

    if (!brevoResponse.ok) {
      let errorData;
      try { errorData = JSON.parse(responseText); } catch { errorData = responseText; }
      console.error('[Contact] Brevo error:', errorData);
      return NextResponse.json(
        { error: 'Failed to send email', details: errorData },
        { status: brevoResponse.status }
      );
    }

    try {
      const messagesPath = path.join(process.cwd(), 'data', 'messages.json');
      const fileData = fs.readFileSync(messagesPath, 'utf8');
      const messagesDb = JSON.parse(fileData);
      messagesDb.push({
        id: crypto.randomUUID(),
        name,
        email,
        company,
        service,
        message,
        timestamp: new Date().toISOString()
      });
      fs.writeFileSync(messagesPath, JSON.stringify(messagesDb, null, 2));
    } catch (dbError) {
      console.error('[Contact] Failed to save message to db:', dbError);
    }

    return NextResponse.json({ success: true, message: 'Email sent successfully!' });

  } catch (err) {
    console.error('[Contact] Unhandled error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
