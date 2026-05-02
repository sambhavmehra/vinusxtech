import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
const OTP_FILE = path.join(process.cwd(), 'data', 'otp.json');
export async function POST(req) {
    try {
        const { username, otp } = await req.json();
        if (username !== 'sambhav') {
            return NextResponse.json({ error: 'Invalid username' }, { status: 401 });
        }
        if (!fs.existsSync(OTP_FILE)) {
            return NextResponse.json({ error: 'No OTP found, please request one' }, { status: 400 });
        }
        const data = JSON.parse(fs.readFileSync(OTP_FILE, 'utf8'));
        if (Date.now() > data.expiresAt) {
            return NextResponse.json({ error: 'OTP expired' }, { status: 400 });
        }
        if (data.otp !== otp) {
            return NextResponse.json({ error: 'Invalid OTP' }, { status: 401 });
        }
        // Success! Clear OTP
        fs.unlinkSync(OTP_FILE);
        // Set cookie
        const response = NextResponse.json({ success: true, message: 'Authenticated successfully' });
        response.cookies.set('admin_session', 'admin_authenticated_true_sambhav', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24,
            path: '/'
        });
        return response;
    }
    catch (error) {
        console.error('Verify OTP error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
