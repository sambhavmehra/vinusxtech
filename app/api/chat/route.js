import Groq from 'groq-sdk';
import fs from 'fs';
import path from 'path';
// groq client will be initialized inside the handler to prevent build-time crashes if env var is missing
const dataFile = path.join(process.cwd(), 'data', 'prompt.json');
export async function POST(req) {
    try {
        const { messages } = await req.json();
        let systemPrompt = 'You are a helpful assistant.';
        if (fs.existsSync(dataFile)) {
            const data = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
            if (data.systemPrompt)
                systemPrompt = data.systemPrompt;
        }
        
        const groq = new Groq({
            apiKey: process.env.GROQ_API_KEY || 'dummy_key',
        });

        const chatCompletion = await groq.chat.completions.create({
            model: 'llama-3.1-8b-instant',
            messages: [
                {
                    role: 'system',
                    content: systemPrompt,
                },
                ...messages,
            ],
            stream: true,
        });
        // Build a ReadableStream from the Groq SSE chunks
        const encoder = new TextEncoder();
        const stream = new ReadableStream({
            async start(controller) {
                try {
                    for await (const chunk of chatCompletion) {
                        const content = chunk.choices?.[0]?.delta?.content;
                        if (content) {
                            controller.enqueue(encoder.encode(content));
                        }
                    }
                    controller.close();
                }
                catch (err) {
                    controller.error(err);
                }
            },
        });
        return new Response(stream, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'Cache-Control': 'no-cache',
            },
        });
    }
    catch (error) {
        console.error('Chat API Error:', error);
        return new Response(JSON.stringify({ error: 'Failed to connect to AI' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}
