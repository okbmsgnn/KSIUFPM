import { utcDay, utcHour, utcMillisecond, utcMonth } from 'd3-time';
import { PredictionTable } from '../../prediction-table/model';

export const getTimeIntervalFor = (table: PredictionTable) => {
  if (table.step.type === 'days') {
    return utcDay;
  } else if (table.step.type === 'hours') {
    return utcHour;
  } else if (table.step.type === 'month') {
    return utcMonth;
  }

  return utcMillisecond;
};
