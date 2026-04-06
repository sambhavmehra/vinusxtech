import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'reviews.json');

export async function POST(req: Request) {
  const cookie = req.headers.get('cookie') || '';
  if (!cookie.includes('admin_session=admin_authenticated_true_sambhav')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, action } = await req.json();

    if (!fs.existsSync(DATA_FILE)) {
      return NextResponse.json({ error: 'Reviews not found' }, { status: 404 });
    }

    const reviews = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    const index = reviews.findIndex((r: any) => r.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    if (action === 'delete') {
      reviews.splice(index, 1);
    } else if (action === 'approve') {
      reviews[index].approved = true;
    } else if (action === 'unapprove') {
      reviews[index].approved = false;
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    fs.writeFileSync(DATA_FILE, JSON.stringify(reviews, null, 2), 'utf8');

    return NextResponse.json({ success: true, message: `Review ${action}d successfully` });
  } catch (error) {
    console.error('Action error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
