import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
const DATA_FILE = path.join(process.cwd(), 'data', 'reviews.json');
export async function GET(req) {
    const cookie = req.headers.get('cookie') || '';
    if (!cookie.includes('admin_session=admin_authenticated_true_sambhav')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        if (!fs.existsSync(DATA_FILE)) {
            return NextResponse.json([]);
        }
        const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
        // Return all reviews, sorted by newest
        return NextResponse.json(data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    }
    catch (error) {
        console.error('Error fetching reviews Admin:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
