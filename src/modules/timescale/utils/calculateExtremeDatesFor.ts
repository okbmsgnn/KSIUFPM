import { CountableTimeInterval } from 'd3-time';
import { PredictionTable } from '../../prediction-table/model';

export const calculateExtremeDatesFor = (
  table: PredictionTable,
  timeInterval: CountableTimeInterval,
  stepsToShow = 10
) => {
  const min = table.startDate ?? new Date();
  const max = timeInterval.offset(
    min,
    table.step.value * stepsToShow
  );

  if (!table.endDate) {
    return {
      min,
      max,
    };
  }

  return {
    min,
    max:
      max.getTime() > table.endDate.getTime() ? table.endDate : max,
  };
};
