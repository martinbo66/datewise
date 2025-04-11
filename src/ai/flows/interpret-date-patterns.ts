'use server';
/**
 * @fileOverview A flow that interprets natural language date descriptions.
 *
 * - interpretDatePatterns - A function that interprets natural language date descriptions.
 * - InterpretDatePatternsInput - The input type for the interpretDatePatterns function.
 * - InterpretDatePatternsOutput - The return type for the interpretDatePatterns function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';
import {generateDates, DateGenerationParams} from '@/services/date-generator';

const InterpretDatePatternsInputSchema = z.object({
  dateDescription: z.string().describe('A natural language description of dates (e.g., \'every Wednesday in May\').'),
});
export type InterpretDatePatternsInput = z.infer<typeof InterpretDatePatternsInputSchema>;

const InterpretDatePatternsOutputSchema = z.object({
  dates: z.array(z.string()).describe('A list of dates generated from the description, in ISO format.'),
});
export type InterpretDatePatternsOutput = z.infer<typeof InterpretDatePatternsOutputSchema>;

export async function interpretDatePatterns(input: InterpretDatePatternsInput): Promise<InterpretDatePatternsOutput> {
  return interpretDatePatternsFlow(input);
}

const interpretDatePatternsFlow = ai.defineFlow<
  typeof InterpretDatePatternsInputSchema,
  typeof InterpretDatePatternsOutputSchema
>({
  name: 'interpretDatePatternsFlow',
  inputSchema: InterpretDatePatternsInputSchema,
  outputSchema: InterpretDatePatternsOutputSchema,
},
async input => {
  const dateGenerationParams: DateGenerationParams = {
    description: input.dateDescription,
  };

  const dates = await generateDates(dateGenerationParams);
  const dateStrings = dates.map(date => date.toISOString());

  return {
    dates: dateStrings,
  };
});
