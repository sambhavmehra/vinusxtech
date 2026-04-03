import { streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

export const runtime = 'edge';

const groq = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = await streamText({
      model: groq('llama-3.1-8b-instant') as any,
      system: 'You are a helpful and professional customer support assistant for VinusXTech, a premier cybersecurity and software development company. You help users understand services like VAPT, SOC Monitoring, AI Solutions, and custom Software Development. Be concise, polite, and professional.',
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to connect to AI' }), { status: 500 });
  }
}
