import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
const OTP_FILE = path.join(process.cwd(), 'data', 'otp.json');
export async function POST(req) {
    try {
        const { username } = await req.json();
        if (username !== 'sambhav') {
            return NextResponse.json({ error: 'Invalid username' }, { status: 401 });
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const DATA_DIR = path.dirname(OTP_FILE);
        if (!fs.existsSync(DATA_DIR)) {
            fs.mkdirSync(DATA_DIR, { recursive: true });
        }
        fs.writeFileSync(OTP_FILE, JSON.stringify({ otp, expiresAt: Date.now() + 5 * 60 * 1000 }), 'utf8');
        const brevoApiKey = process.env.BREVO_API_KEY?.trim();
        if (!brevoApiKey) {
            console.warn('BREVO_API_KEY missing, check local file for OTP');
            // For fallback if no email API
            return NextResponse.json({ success: true, message: 'OTP stored locally because email API is missing.' });
        }
        const emailPayload = {
            sender: { name: 'VinusXTech Admin', email: process.env.BREVO_SENDER_EMAIL || 'vinusxtech@gmail.com' },
            to: [{ email: 'sambhavmehra712@gmail.com', name: 'Sambhav Mehra' }],
            subject: `Admin Login OTP: ${otp}`,
            htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 28px; background: #0a0a0f; color: #ffffff; border-radius: 14px; border: 1px solid #1e1e3a;">
          <h1 style="color: #00d4ff; text-align: center;">VinusXTech Admin</h1>
          <p style="text-align: center; font-size: 16px;">Your One-Time Password is:</p>
          <div style="text-align: center; margin: 20px 0;">
            <span style="font-size: 32px; font-weight: bold; padding: 10px 20px; background: #111827; border-radius: 8px; color: #a855f7; letter-spacing: 4px;">${otp}</span>
          </div>
          <p style="text-align: center; color: #888; font-size: 13px;">This OTP is valid for 5 minutes.</p>
        </div>
      `,
        };
        const res = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'api-key': brevoApiKey,
                'content-type': 'application/json',
            },
            body: JSON.stringify(emailPayload),
        });
        if (!res.ok) {
            console.error('Email send failed', await res.text());
            return NextResponse.json({ error: 'Failed to send OTP email' }, { status: 500 });
        }
        return NextResponse.json({ success: true, message: 'OTP sent successfully' });
    }
    catch (error) {
        console.error('OTP error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
