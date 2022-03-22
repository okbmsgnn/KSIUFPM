import { utcDay, utcHour, utcMonth } from 'd3-time';
import { PredictionTable } from '../../prediction-table/model';

export const calculateExtremeDatesFor = (
  table: PredictionTable,
  stepsToShow = 10
) => {
  const startDate = table.startDate ?? new Date();
  let endDate: Date = startDate;

  if (table.step.type === 'days') {
    endDate = utcDay.offset(
      startDate,
      table.step.value * stepsToShow
    );
  } else if (table.step.type === 'hours') {
    endDate = utcHour.offset(
      startDate,
      table.step.value * stepsToShow
    );
  } else if (table.step.type === 'month') {
    endDate = utcMonth.offset(
      startDate,
      table.step.value * stepsToShow
    );
  }

  return {
    max: endDate,
    min: startDate,
  };
};
