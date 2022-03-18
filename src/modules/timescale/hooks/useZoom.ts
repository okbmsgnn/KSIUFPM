import {
  TimeInterval,
  utcDay,
  utcHour,
  utcMillisecond,
  utcMonth,
  utcWeek,
  utcYear,
} from 'd3-time';
import React from 'react';
import { IRange } from '../../../types/IRange';

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
  ySize: number;
}

export const useZoom = (
  { extremeDates, ySize }: ZoomProps,
  deps: any[] = []
) => {
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

  return React.useMemo(
    () => ({
      delta,
      zoomLevel,
      yScale,
    }),
    [zoomLevel, yScale, delta, ...deps]
  );
};
