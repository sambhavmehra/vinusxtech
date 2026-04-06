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
      try {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      } catch (fsErr) {
        console.warn('[fs] Could not create DATA_DIR', fsErr);
      }
    }
    if (!fs.existsSync(DATA_FILE)) {
      try {
        fs.writeFileSync(DATA_FILE, '[]', 'utf8');
      } catch (fsErr) {
        console.warn('[fs] Could not create DATA_FILE', fsErr);
      }
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
      image: '' // Removed auto image generation
    };

    const allReviews = getReviewsData();
    allReviews.push(newReview);
    
    // Ensure the directory exists before saving on POST
    try {
      const DATA_DIR = path.dirname(DATA_FILE);
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE, JSON.stringify(allReviews, null, 2), 'utf8');
    } catch (fsErr) {
      console.warn('[Review Info] Could not save to filesystem (expected on Serverless/Vercel):', fsErr);
    }

    return NextResponse.json({ success: true, message: 'Review submitted and is pending approval.' });

  } catch (err) {
    console.error('[Review Info] Unhandled error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
