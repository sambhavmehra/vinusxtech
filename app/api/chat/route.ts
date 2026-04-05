import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const chatCompletion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful and professional customer support assistant for VinusXTech, a premier cybersecurity and software development company. You help users understand services like VAPT, SOC Monitoring, AI Solutions, and custom Software Development. Be concise, polite, and professional. IMPORTANT: Always end your response with exactly 3 short follow-up questions the user could ask next. Prefix the questions exactly with "___FAQ:" and separate them with "|" (e.g., "... your response text... ___FAQ: Question 1?|Question 2?|Question 3?"). Do not use line breaks or numbers for the FAQs.',
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
        } catch (err) {
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
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to connect to AI' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
