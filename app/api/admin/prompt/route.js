import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
const dataFile = path.join(process.cwd(), 'data', 'prompt.json');
export async function GET() {
    try {
        if (!fs.existsSync(dataFile)) {
            return NextResponse.json({ systemPrompt: "Default Prompt" });
        }
        const data = fs.readFileSync(dataFile, 'utf-8');
        return NextResponse.json(JSON.parse(data));
    }
    catch (error) {
        return NextResponse.json({ error: 'Failed to read prompt' }, { status: 500 });
    }
}
export async function POST(req) {
    try {
        const body = await req.json();
        fs.writeFileSync(dataFile, JSON.stringify(body, null, 2));
        return NextResponse.json({ success: true });
    }
    catch (error) {
        return NextResponse.json({ error: 'Failed to save prompt' }, { status: 500 });
    }
}
