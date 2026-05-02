export async function POST(req) {
  try {
    const { name, email, phone, company, chatHistory } = await req.json();

    // Validate required fields
    if (!name || !email || !phone) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const brevoApiKey = process.env.BREVO_API_KEY;
    const senderEmail = process.env.BREVO_SENDER_EMAIL || 'vinusxtech@gmail.com';
    const senderName = process.env.BREVO_SENDER_NAME || 'VinusXTech';

    if (!brevoApiKey) {
      console.error('BREVO_API_KEY is not set');
      return new Response(JSON.stringify({ error: 'Email service not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Format chat history for the email
    let chatSummary = 'No chat history available.';
    if (chatHistory && chatHistory.length > 0) {
      chatSummary = chatHistory
        .map((m) => `<strong>${m.role === 'user' ? '👤 User' : '🤖 Nextbot'}:</strong> ${m.content}`)
        .join('<br/><br/>');
    }

    const emailHtml = `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a12; color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #00ff88, #00d4ff); padding: 30px 24px; text-align: center;">
          <h1 style="margin: 0; font-size: 22px; font-weight: 800; color: #000;">🚀 New Lead from VinusXTech</h1>
          <p style="margin: 8px 0 0; font-size: 13px; color: rgba(0,0,0,0.6);">Captured via Nextbot AI Chatbot</p>
        </div>

        <!-- Lead Details -->
        <div style="padding: 24px;">
          <h2 style="font-size: 14px; color: #00d4ff; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 16px;">Contact Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #888; font-size: 13px; width: 120px;">Name</td>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #fff; font-size: 14px; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #888; font-size: 13px;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #fff; font-size: 14px; font-weight: 600;"><a href="mailto:${email}" style="color: #00ff88; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #888; font-size: 13px;">Phone</td>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #fff; font-size: 14px; font-weight: 600;"><a href="tel:${phone}" style="color: #00ff88; text-decoration: none;">${phone}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #888; font-size: 13px;">Company</td>
              <td style="padding: 10px 0; color: #fff; font-size: 14px; font-weight: 600;">${company || 'Not provided'}</td>
            </tr>
          </table>
        </div>

        <!-- Chat History -->
        <div style="padding: 0 24px 24px;">
          <h2 style="font-size: 14px; color: #00d4ff; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 16px;">Chat History</h2>
          <div style="background: rgba(255,255,255,0.03); border-radius: 12px; padding: 16px; border: 1px solid rgba(255,255,255,0.06); font-size: 13px; line-height: 1.8; color: #ccc;">
            ${chatSummary}
          </div>
        </div>

        <!-- Footer -->
        <div style="padding: 16px 24px; background: rgba(255,255,255,0.02); text-align: center; border-top: 1px solid rgba(255,255,255,0.06);">
          <p style="margin: 0; font-size: 11px; color: #555;">VinusXTech Lead Generation • Powered by Nextbot AI</p>
        </div>
      </div>
    `;

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': brevoApiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: { name: senderName, email: senderEmail },
        to: [
          { email: 'sambhamehra712@gmail.com', name: 'Sambhav Mehra' },
          { email: 'ujjwalkr7449@gmail.com', name: 'Ujjwal' }
        ],
        subject: `🚀 New Lead: ${name} — ${company || 'Individual'}`,
        htmlContent: emailHtml,
        replyTo: { email: email, name: name },
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Brevo API error:', errorData);
      return new Response(JSON.stringify({ error: 'Failed to send email' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Send Auto-Reply to the User
    const autoReplyHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 28px; background: #0a0a0f; color: #ffffff; border-radius: 14px; border: 1px solid #1e1e3a;">
        <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #1e1e3a;">
          <h1 style="margin: 0; font-size: 26px; color: #00d4ff; letter-spacing: 2px;">VinusXTech</h1>
          <p style="margin: 6px 0 0; color: #666; font-size: 13px;">Thank You For Reaching Out!</p>
        </div>
        <div style="margin-top: 24px; color: #ccc; font-size: 15px; line-height: 1.6;">
          <p>Hi ${name},</p>
          <p>Thank you for choosing VinusXTech. We have successfully received your message and our team is already reviewing it.</p>
          <p>We will get back to you as soon as possible with a tailored response to your inquiry. In the meantime, sit back and relax.</p>
          <p>If you have any additional details to share, feel free to reply directly to this email.</p>
          <p style="margin-top: 30px;">Best regards,<br/><span style="color: #00ff88; font-weight: bold;">The VinusXTech Team</span></p>
        </div>
      </div>
    `;

    const autoReplyPayload = {
      sender: { name: senderName, email: senderEmail },
      to: [{ email: email, name: name }],
      subject: "Thank you for contacting VinusXTech! 🚀",
      htmlContent: autoReplyHtml,
    };

    try {
      await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'api-key': brevoApiKey,
          'content-type': 'application/json',
        },
        body: JSON.stringify(autoReplyPayload),
      });
      console.log('[Lead] Auto-reply sent to:', email);
    } catch (autoReplyErr) {
      console.error('[Lead] Failed to send auto-reply:', autoReplyErr);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Lead API Error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
