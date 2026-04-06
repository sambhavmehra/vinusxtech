import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

// Define path to our local JSON database
const DATA_FILE = path.join(process.cwd(), 'data', 'reviews.json');

// Helper to read data safely
function getReviewsData() {
  try {
    const DATA_DIR = path.dirname(DATA_FILE);
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, '[]', 'utf8');
      return [];
    }
    const fileContent = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(fileContent);
  } catch (err) {
    console.error('Error reading reviews.json:', err);
    return [];
  }
}

// GET: Fetch all approved reviews
export async function GET() {
  const reviews = getReviewsData();
  const approved = reviews.filter((r: any) => r.approved === true);
  // Sort by newest first
  approved.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return NextResponse.json(approved, {
    // Prevent caching so new reviews show up immediately
    headers: { 'Cache-Control': 'no-store, max-age=0' }
  });
}

// POST: Submit a new review
export async function POST(req: Request) {
  try {
    const { name, email, company, role, rating, message } = await req.json();

    // Validate required fields
    if (!name || !email || !message || !rating) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Generate unique ID & add to db as unapproved
    const reviewId = crypto.randomUUID();
    const newReview = {
      id: reviewId,
      name,
      email,
      company: company || '',
      role: role || '',
      rating: Number(rating),
      message,
      date: new Date().toISOString(),
      approved: false, // Hidden until admin approves
      image: `https://i.pravatar.cc/150?u=${encodeURIComponent(email)}` // Using email for gravatar seeding
    };

    const allReviews = getReviewsData();
    allReviews.push(newReview);
    
    // Ensure the directory exists before saving on POST
    const DATA_DIR = path.dirname(DATA_FILE);
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(allReviews, null, 2), 'utf8');

    // 2. Generate Approval Link
    const host = req.headers.get('host') || 'localhost:3000';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const approveLink = `${protocol}://${host}/api/review/approve?id=${reviewId}`;

    // 3. Send email to Admin
    const brevoApiKey   = process.env.BREVO_API_KEY?.trim();
    const senderEmail   = process.env.BREVO_SENDER_EMAIL?.trim() || 'vinusxtech@gmail.com';
    const senderName    = process.env.BREVO_SENDER_NAME?.trim()  || 'Real Client Reviews';

    if (!brevoApiKey) {
      console.error('[Review Info] BREVO_API_KEY is missing, saving locally only.');
      // Return success anyway so frontend doesn't break for user
      return NextResponse.json({ success: true, message: 'Saved locally, but missing Brevo API key for email.' });
    }

    const emailPayload = {
      sender: { name: senderName, email: senderEmail },
      to: [ { email: 'sambhavmehra712@gmail.com', name: 'Sambhav Mehra' } ],
      replyTo: { email: email, name: name },
      subject: `[VinusXTech] ⭐ Approve Client Review from ${name}`,
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 28px; background: #0a0a0f; color: #ffffff; border-radius: 14px; border: 1px solid #1e1e3a;">

          <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #1e1e3a;">
            <h1 style="margin: 0; font-size: 26px; color: #ffb347; letter-spacing: 2px;">VinusXTech</h1>
            <p style="margin: 6px 0 0; color: #666; font-size: 13px;">New Client Review Submitted</p>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr><td style="padding: 10px 0; color: #888; width: 130px; font-size: 13px;">Name</td>
                <td style="padding: 10px 0; color: #fff; font-weight: 600;">${name}</td></tr>
            <tr><td style="padding: 10px 0; color: #888; font-size: 13px;">Email</td>
                <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #ffb347; text-decoration: none;">${email}</a></td></tr>
            <tr><td style="padding: 10px 0; color: #888; font-size: 13px;">Company</td>
                <td style="padding: 10px 0; color: #ccc;">${company || '—'}</td></tr>
            <tr><td style="padding: 10px 0; color: #888; font-size: 13px;">Role</td>
                <td style="padding: 10px 0; color: #ccc;">${role || '—'}</td></tr>
            <tr><td style="padding: 10px 0; color: #888; font-size: 13px;">Rating</td>
                <td style="padding: 10px 0;"><span style="color: #ffb347; background: #ffb34715; padding: 3px 10px; border-radius: 20px; font-size: 16px; font-weight: bold;">${rating} / 5</span></td></tr>
          </table>

          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #1e1e3a;">
            <p style="margin: 0 0 10px; color: #ffb347; font-size: 13px; font-weight: 600;">Review Text</p>
            <div style="white-space: pre-wrap; color: #ccc; background: #111827; padding: 16px; border-radius: 8px; border-left: 3px solid #ffb347; font-size: 14px; line-height: 1.6;">${message}</div>
          </div>

          <!-- APPROVAL BUTTON -->
          <div style="margin-top: 30px; text-align: center;">
            <p style="color:#aaa; font-size: 13px; margin-bottom: 12px;">This review is currently hidden. Click below to display it on the website.</p>
            <a href="${approveLink}" style="display: inline-block; padding: 14px 30px; background-color: #00ff88; color: #000; font-weight: bold; text-decoration: none; border-radius: 30px; font-size: 16px;">Approve & Publish Review</a>
          </div>

        </div>
      `,
    };

    await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept':       'application/json',
        'api-key':      brevoApiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify(emailPayload),
    });

    return NextResponse.json({ success: true, message: 'Review sent successfully!' });

  } catch (err) {
    console.error('[Review Info] Unhandled error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
