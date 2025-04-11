"use client";

import { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { interpretDatePatterns } from '@/ai/flows/interpret-date-patterns';
import { cn } from "@/lib/utils";
import { format, formatISO, getDay } from 'date-fns';

export default function Home() {
  const [dateDescription, setDateDescription] = useState('');
  const [dates, setDates] = useState<Date[]>([]);
  const [selected, setSelected] = useState<Date | undefined>();

  const handleGenerateDates = async () => {
    const result = await interpretDatePatterns({ dateDescription });
    if (result && result.dates) {
      setDates(result.dates.map(dateString => new Date(dateString)));
    } else {
      setDates([]);
    }
  };

  const handleClearAll = () => {
    setDateDescription('');
    setDates([]);
    setSelected(undefined);
  };



  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Card className="w-full max-w-md space-y-4">
        <CardHeader>
          <CardTitle className="text-2xl">DateWise</CardTitle>
          <CardDescription>
            Enter a natural language description of dates to generate a list and calendar view.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Input
              type="text"
              placeholder="e.g., every Wednesday in May"
              value={dateDescription}
              onChange={(e) => setDateDescription(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Button onClick={handleGenerateDates} className="w-full bg-accent text-background hover:bg-accent/80">
            Generate Dates
          </Button>
            <Button onClick={handleClearAll} variant="outline" className="w-full">Clear All</Button>
          </div>


          {dates.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Generated Dates:</h3>
              <ul className="list-disc pl-5">
                {dates.map((date) => (
                  <li key={date.toISOString()}>
                    {format(date, 'EEEE, MMMM d, yyyy')}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Calendar:</h3>
            <Calendar
              mode="single"
              selected={selected}
              onSelect={setSelected}
              defaultMonth={dates[0]}
              className={cn("border rounded-md")}
              disabled={(date) => {
                return dates.length > 0 && !dates.some(d => {
                  return d.getDate() === date.getDate() &&
                         d.getMonth() === date.getMonth() &&
                         d.getFullYear() === date.getFullYear();
                });
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
