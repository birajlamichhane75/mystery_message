import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai('gpt-3.5-turbo'),
    messages,
  });

  return result.toAIStreamResponse();
}
// const prompt = 'create a list of three open-ended questions and engaging questions formatted as a single string. Each question should be seperated by "||". These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics , focusing instead on universal themes that encourage friendly encourage interaction, Ensure the question are intriguing, foster, curosity and contribution to a positive and welcoming conversational environment';