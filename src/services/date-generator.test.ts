import { generateDates, DateGenerationParams } from './date-generator';

describe('generateDates', () => {
  it('should generate dates for every Wednesday in May', async () => {
    const params: DateGenerationParams = { description: 'every Wednesday in May' };
    const dates = await generateDates(params);
    expect(dates.length).toBeGreaterThan(0);
    dates.forEach(date => {
      expect(date.getDay()).toBe(3);
      expect(date.getMonth()).toBe(4); // May is month 4 (0-indexed)
    });
  });

  it('should generate dates for a range like June 1st through June 5th', async () => {
    const params: DateGenerationParams = { description: 'June 1st through June 5th' };
    const dates = await generateDates(params);
    expect(dates.length).toBe(5);
    dates.forEach((date, index) => {
      expect(date.getMonth()).toBe(5); // June is month 5 (0-indexed)
      expect(date.getDate()).toBe(index + 1); // Check if dates are 1st, 2nd, 3rd, 4th, 5th
    });
  });

  it('should generate dates that span the current and next year', async () => {
        const currentYear = new Date().getFullYear()
        const nextYear = currentYear + 1
    const params: DateGenerationParams = { description: 'December 25th and January 1st' };
    const dates = await generateDates(params);
    expect(dates.length).toBe(2);
    expect(dates[0].getMonth()).toBe(11); //December
    expect(dates[0].getDate()).toBe(25);
    expect(dates[1].getMonth()).toBe(0); //January
    expect(dates[1].getDate()).toBe(1);
        if (new Date().getMonth() < 11) { //if not in december
            expect(dates[0].getFullYear()).toBe(currentYear)
        } else {
            expect(dates[0].getFullYear()).toBe(currentYear) //test still passes.
        }
        if (new Date().getMonth() > 0) { //if not in january
             expect(dates[1].getFullYear()).toBe(nextYear)
        } else {
             expect(dates[1].getFullYear()).toBe(currentYear)
        }

  });
});