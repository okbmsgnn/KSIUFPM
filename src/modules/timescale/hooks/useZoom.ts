import {
  TimeInterval,
  utcDay,
  utcHour,
  utcMillisecond,
  utcMinute,
  utcMonth,
  utcWeek,
  utcYear,
} from 'd3-time';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRange } from '../../../types/IRange';
import { getTableById } from '../../prediction-table/predictionTableReducer';
import { setExtremeDates } from '../timescaleActions';

type ZoomLevel = {
  minRange: number;
  interval: TimeInterval;
};

const ZOOM_LEVELS: ZoomLevel[] = [
  {
    minRange: 365 * 2,
    interval: utcYear.every(1) as TimeInterval,
  },
  {
    minRange: 365,
    interval: utcMonth.every(2) as TimeInterval,
  },
  {
    minRange: 30 * 6,
    interval: utcMonth.every(1) as TimeInterval,
  },
  {
    minRange: 30 * 3,
    interval: utcWeek.every(1) as TimeInterval,
  },
  {
    minRange: 30,
    interval: utcDay.every(1) as TimeInterval,
  },
  {
    minRange: 1,
    interval: utcHour.every(1) as TimeInterval,
  },
];

interface ZoomProps {
  extremeDates: IRange<Date>;
  tableId: string;
  ySize: number;
}

export const useZoom = (
  { extremeDates, ySize, tableId }: ZoomProps,
  deps: any[] = []
) => {
  const dispatch = useDispatch();
  const table = useSelector((state) =>
    getTableById(state, { tableId })
  );
  const delta = React.useMemo(
    () => utcMillisecond.count(extremeDates.min, extremeDates.max),
    [extremeDates]
  );

  const zoomLevel = React.useMemo(() => {
    const daysDelta = delta / 1000 / 3600 / 24;
    const level = ZOOM_LEVELS.find(
      (level) => level.minRange < daysDelta
    );
    return level ?? ZOOM_LEVELS[ZOOM_LEVELS.length - 1];
  }, [delta]);

  const yScale = React.useMemo(() => {
    const scale = (date: Date) => {
      const delta2 = utcMillisecond.count(extremeDates.min, date);
      return (delta2 * ySize) / delta;
    };

    scale.invert = (y: number) => {
      const time = (delta / ySize) * y;
      return new Date(extremeDates.min.getTime() + time);
    };

    return scale;
  }, [delta, extremeDates, ySize]);

  const zoomIn = React.useCallback(() => {
    const startDate = extremeDates.min;
    const endDate = extremeDates.max;

    const dates = {
      max: endDate,
      min: startDate,
    };

    if (table.step.type === 'days') {
      const value = table.step.value * 2;
      dates.max = utcMinute.offset(endDate, -30);
      dates.min = utcMinute.offset(startDate, 30);
    } else if (table.step.type === 'hours') {
      const value = table.step.value * 2;
      dates.max = utcHour.offset(endDate, -value);
      dates.min = utcHour.offset(startDate, value);
    }

    dispatch(
      setExtremeDates({
        tableId: table.id,
        dates,
      })
    );
  }, [table, extremeDates]);

  const zoomOut = React.useCallback(() => {
    const startDate = extremeDates.min;
    const endDate = extremeDates.max;

    const dates = {
      max: endDate,
      min: startDate,
    };

    if (table.step.type === 'days') {
      const value = table.step.value * 2;
      dates.max = utcDay.offset(endDate, value);
      dates.min = utcDay.offset(startDate, -value);
    } else if (table.step.type === 'hours') {
      const value = table.step.value * 2;
      dates.max = utcHour.offset(endDate, value);
      dates.min = utcHour.offset(startDate, -value);
    }

    dispatch(
      setExtremeDates({
        tableId: table.id,
        dates,
      })
    );
  }, [table, extremeDates]);

  const resetZoom = React.useCallback(() => {
    const startDate = table.startDate ?? new Date();
    let endDate: Date = startDate;

    if (table.step.type === 'days') {
      const value = table.step.value < 3 ? 30 : table.step.value * 2;
      endDate = utcDay.offset(startDate, value);
    } else if (table.step.type === 'hours') {
      const value =
        table.step.value < 48 ? 7 * 24 : table.step.value * 2;
      endDate = utcHour.offset(startDate, value);
    } else if (table.step.type === 'month') {
      const value = table.step.value < 3 ? 6 : table.step.value * 2;
      endDate = utcMonth.offset(startDate, value);
    }

    dispatch(
      setExtremeDates({
        tableId: table.id,
        dates: {
          max: endDate,
          min: startDate,
        },
      })
    );
  }, [table, extremeDates]);

  return React.useMemo(
    () => ({
      delta,
      zoomLevel,
      yScale,
      ySize,
      extremeDates,
      resetZoom,
      zoomIn,
      zoomOut,
    }),
    [
      zoomLevel,
      yScale,
      delta,
      extremeDates,
      ySize,
      resetZoom,
      zoomIn,
      zoomOut,
      ...deps,
    ]
  );
};
