import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { cookies } from 'next/headers';
export async function POST(req) {
    const cookieStore = cookies();
    const token = cookieStore.get('adminToken');
    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        const { id, action } = await req.json();
        if (!id || action !== 'delete') {
            return NextResponse.json({ error: 'Invalid operation' }, { status: 400 });
        }
        const messagesPath = path.join(process.cwd(), 'data', 'messages.json');
        let messagesDb = [];
        if (fs.existsSync(messagesPath)) {
            const fileData = fs.readFileSync(messagesPath, 'utf8');
            messagesDb = JSON.parse(fileData);
        }
        messagesDb = messagesDb.filter(m => m.id !== id);
        fs.writeFileSync(messagesPath, JSON.stringify(messagesDb, null, 2));
        return NextResponse.json({ success: true, message: 'Message deleted' });
    }
    catch (error) {
        console.error('Error modifying message:', error);
        return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 });
    }
}
