'use server';

import { generateObject } from 'ai';
import { z } from 'zod';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

const apiKey = process.env.API_KEY;

const systemMessage = `
  Your name is ContentAssist. 
  You are a chatbot that answers only about content creation. 
  If the user says "hey" or similar words, respond to that. 
  Always read the user input carefully and provide a perfect answer only related to content creation.
`;

const google = createGoogleGenerativeAI({
  apiKey: apiKey
});

export async function getNotifications(generation) {
  'use server';

  // Format the messages array according to expected structure
  const messages = [
    { role: 'system', content: systemMessage },
    { role: 'user', content: generation }
  ];

  const { object: notifications } = await generateObject({
    model: google('gemini-1.5-pro-latest'),
    messages: messages, // Properly structured messages array
    schema: z.object({
      notifications: z.array(
        z.object({
          name: z.string(),
          message: z.string(),
          minutesAgo: z.number(),
        })
      ),
    }),
  });

  return { notifications };
}
