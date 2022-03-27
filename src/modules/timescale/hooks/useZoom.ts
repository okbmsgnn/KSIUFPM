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
import { useDispatch, useSelector } from 'react-redux';
import { IRange } from '../../../types/IRange';
import { getTableById } from '../../prediction-table/predictionTableReducer';
import { resetZoom, zoomIn, zoomOut } from '../timescaleActions';
import { getMsDelta } from '../timescaleReducer';
import { getTimeIntervalFor } from '../utils/getTimeIntervalFor';

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

  const timeInterval = React.useMemo(
    () => getTimeIntervalFor(table),
    [table]
  );

  const msDelta = useSelector((state) =>
    getMsDelta(state, { tableId })
  );

  const zoomLevel = React.useMemo(() => {
    const daysDelta = msDelta / 1000 / 3600 / 24;
    const level = ZOOM_LEVELS.find(
      (level) => level.minRange < daysDelta
    );
    return level ?? ZOOM_LEVELS[ZOOM_LEVELS.length - 1];
  }, [msDelta]);

  const yScale = React.useMemo(() => {
    const scale = (date: Date) => {
      const time = utcMillisecond.count(extremeDates.min, date);
      return (time * ySize) / msDelta;
    };

    scale.invert = (y: number) => {
      const time = (msDelta / ySize) * y;
      return new Date(extremeDates.min.getTime() + time);
    };

    scale.convert = (y: number) => {
      return (msDelta / ySize) * y;
    };

    return scale;
  }, [msDelta, extremeDates, ySize]);

  return React.useMemo(
    () => ({
      msDelta,
      zoomLevel,
      yScale,
      ySize,
      extremeDates,
      resetZoom: () => dispatch(resetZoom(tableId)),
      zoomIn: () => dispatch(zoomIn(tableId)),
      zoomOut: () => dispatch(zoomOut(tableId)),
      timeInterval,
    }),
    [
      zoomLevel,
      yScale,
      msDelta,
      extremeDates,
      ySize,
      timeInterval,
      ...deps,
    ]
  );
};
