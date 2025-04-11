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

Assume the current year, or the following year if the current date is past the month specified in the description.

Make sure all the generated dates are valid dates.`,
});
