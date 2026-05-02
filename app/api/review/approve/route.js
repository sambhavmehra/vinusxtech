import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
// Define path to our local JSON database
const DATA_FILE = path.join(process.cwd(), 'data', 'reviews.json');
function getReviewsData() {
    try {
        if (!fs.existsSync(DATA_FILE))
            return [];
        return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    }
    catch (err) {
        console.error('Error reading reviews.json:', err);
        return [];
    }
}
export async function GET(req) {
    try {
        const url = new URL(req.url);
        const id = url.searchParams.get('id');
        if (!id) {
            return new NextResponse('Missing review ID.', { status: 400 });
        }
        const reviews = getReviewsData();
        const index = reviews.findIndex((r) => r.id === id);
        if (index === -1) {
            return new NextResponse('Review not found. It may have been deleted or the ID is invalid.', { status: 404 });
        }
        if (reviews[index].approved) {
            return new NextResponse('Review is already approved and live on the site!', { status: 200 });
        }
        // Approve it
        reviews[index].approved = true;
        fs.writeFileSync(DATA_FILE, JSON.stringify(reviews, null, 2), 'utf8');
        // Return a beautiful HTML success message
        const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Review Approved!</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body { font-family: sans-serif; background: #050508; color: white; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
          .card { background: #111; padding: 40px; border-radius: 20px; border: 1px solid #1e1e3a; text-align: center; max-width: 400px; }
          h2 { color: #00ff88; margin-top: 0; }
          p { color: #aaa; line-height: 1.6; }
          a { display: inline-block; margin-top: 20px; padding: 12px 24px; background: #00ff88; color: black; font-weight: bold; text-decoration: none; border-radius: 30px; }
        </style>
      </head>
      <body>
        <div class="card">
          <h2>✅ Approved!</h2>
          <p>The review from <b>${reviews[index].name}</b> is now visible on the live website.</p>
          <a href="/">Go to Homepage</a>
        </div>
      </body>
      </html>
    `;
        return new NextResponse(html, { headers: { 'Content-Type': 'text/html' } });
    }
    catch (err) {
        console.error('Approve Error:', err);
        return new NextResponse('Internal Server Error.', { status: 500 });
    }
}
