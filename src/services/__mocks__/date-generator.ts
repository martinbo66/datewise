import { DateGenerationParams } from '../date-generator';

// Mock implementation of generateDates
export async function generateDates(params: DateGenerationParams): Promise<Date[]> {
  const { description } = params;
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  
  // Mock responses based on the test descriptions
  if (description === 'every Wednesday in May') {
    // Return all Wednesdays in May for the current year
    const dates: Date[] = [];
    const year = currentMonth <= 4 ? currentYear : currentYear + 1;
    
    // Create a date for May 1st of the appropriate year
    const startDate = new Date(year, 4, 1);
    
    // Find the first Wednesday (day 3) in May
    let day = startDate.getDate();
    while (startDate.getDay() !== 3) {
      startDate.setDate(++day);
    }
    
    // Add all Wednesdays in May
    while (startDate.getMonth() === 4) {
      dates.push(new Date(startDate));
      startDate.setDate(startDate.getDate() + 7);
    }
    
    return dates;
  } 
  else if (description === 'June 1st through June 5th') {
    // Return dates for June 1-5
    const dates: Date[] = [];
    const year = currentMonth <= 5 ? currentYear : currentYear + 1;
    
    for (let i = 1; i <= 5; i++) {
      dates.push(new Date(year, 5, i));
    }
    
    return dates;
  } 
  else if (description === 'December 25th and January 1st') {
    // Return Christmas and New Year's Day
    const dates: Date[] = [];
    const decYear = currentMonth <= 11 ? currentYear : currentYear + 1;
    const janYear = currentMonth > 0 ? currentYear + 1 : currentYear;
    
    dates.push(new Date(decYear, 11, 25)); // December 25th
    dates.push(new Date(janYear, 0, 1));   // January 1st
    
    return dates;
  }
  
  // Default fallback
  return [new Date()];
}
