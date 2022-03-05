import { TimeInterval, utcDay, utcMonth, utcYear } from 'd3-time';

export const generateDays = (month: Date) => {
  return (utcDay.every(1) as TimeInterval).range(
    utcMonth.floor(month),
    utcMonth.ceil(month)
  );
};

export const generateMonths = (month: Date, count: number) => {
  return (utcMonth.every(1) as TimeInterval).range(
    utcMonth.floor(month),
    utcMonth.offset(month, count)
  );
};

export const generateYears = (date: Date, count: number) => {
  return (utcDay.every(1) as TimeInterval).range(
    utcYear.floor(date),
    utcYear.offset(date, count)
  );
};
