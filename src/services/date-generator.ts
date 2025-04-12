'use server';
/**
 * @fileOverview Date generation service using GenAI.
 *
 * - generateDates - A function that generates a list of dates based on a natural language description.
 * - DateGenerationParams - The input type for the generateDates function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

export interface DateGenerationParams {
  /**
   * A natural language description of the dates to generate.
   * For example, "every Wednesday in May".
   */
  description: string;
}

const DatePatternSchema = z.object({
  dates: z.array(z.string()).describe('A list of dates that match the description, in ISO format.'),
});

/**
 * Asynchronously generates a list of dates based on the provided description.
 *
 * @param params An object containing the natural language description.
 * @returns A promise that resolves to an array of dates.
 */
export async function generateDates(params: DateGenerationParams): Promise<Date[]> {
  const result = await generateDatesFlow(params);
  return result.dates.map(dateString => new Date(dateString));
}

const generateDatesFlow = ai.defineFlow(
  {
    name: 'generateDatesFlow',
    inputSchema: z.object({
      description: z.string().describe('A natural language description of dates (e.g., \'every Wednesday in May\').'),
    }),
    outputSchema: z.object({
      dates: z.array(z.string()).describe('A list of dates that match the description, in ISO format.'),
    }),
  },
  async input => {
    const {output} = await generateDatesPrompt(input);
    return output!;
  }
);

const generateDatesPrompt = ai.definePrompt({
  name: 'generateDatesPrompt',
  input: {
    schema: z.object({
      description: z.string().describe('A natural language description of dates (e.g., \'every Wednesday in May\').'),
    }),
  },
  output: {
    schema: z.object({
      dates: z.array(z.string()).describe('A list of dates that match the description, in ISO format.'),
    }),
  },
  prompt: `You are a date generator.
Generate a list of dates in ISO format that match the following description:

Description: {{{description}}}

Today's date is ${new Date().toLocaleDateString()}.  Please use the current year unless the months mentioned are prior to the current month, in which case, use the next year.

Make sure all the generated dates are valid dates. Be extremely precise about the day of the week. For example, if the user asks for 'every Wednesday in April', ensure that each date you return is actually a Wednesday. Double-check each date using a calendar to confirm it matches the requested day of the week before including it in your response.

Return dates in ISO format (YYYY-MM-DD) without time components to avoid timezone issues.`,
});
