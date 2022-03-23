import { utcDay, utcMillisecond } from 'd3-time';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRange } from '../../../types/IRange';
import { getTableById } from '../../prediction-table/predictionTableReducer';
import { setExtremeDates } from '../../timescale/timescaleActions';
import { useZoom } from './useZoom';

interface DragProps {
  zoom: ReturnType<typeof useZoom>;
  tableId: string;
}

export const useDrag = ({ tableId, zoom }: DragProps) => {
  const dispatch = useDispatch();
  const [isDragging, setIsDragging] = React.useState(false);

  const table = useSelector((state) =>
    getTableById(state, { tableId })
  );

  const calculateNewExtremeDates = React.useCallback(
    (newExtremeMin: Date) => {
      if (!zoom.extremeDates) return null;

      const newExtremeMax = utcMillisecond.offset(
        newExtremeMin,
        zoom.msDelta
      );

      const isValidMin =
        !table.startDate ||
        table.startDate.getTime() <= newExtremeMin.getTime();
      const isValidMax =
        !table.endDate ||
        utcDay.offset(table.endDate, 1).getTime() >=
          newExtremeMax.getTime();

      let dates: IRange<Date> | null = null;

      if (isValidMin && isValidMax) {
        dates = { min: newExtremeMin, max: newExtremeMax };
      } else if (isValidMin && table.endDate) {
        const end = utcDay.offset(table.endDate, 1);
        dates = {
          min: utcMillisecond.offset(end, -zoom.msDelta),
          max: end,
        };
      } else if (isValidMax && table.startDate) {
        dates = {
          min: table.startDate,
          max: utcMillisecond.offset(table.startDate, zoom.msDelta),
        };
      }

      return dates;
    },
    [zoom, table]
  );

  const startDrag = React.useCallback((e: any) => {
    setIsDragging(true);
  }, []);

  const moveBy = React.useCallback(
    (ms: number) => {
      const newExtremeMin = utcMillisecond.offset(
        zoom.extremeDates.min,
        ms
      );

      const dates = calculateNewExtremeDates(newExtremeMin);
      if (!dates) return;

      dispatch(
        setExtremeDates({
          tableId,
          dates,
        })
      );
    },
    [zoom.extremeDates, tableId, calculateNewExtremeDates]
  );

  const drag = React.useCallback(
    (e: MouseEvent) => {
      const newExtremeMin = zoom.yScale.invert(-e.movementY);
      const dates = calculateNewExtremeDates(newExtremeMin);
      if (!dates) return;

      dispatch(
        setExtremeDates({
          tableId,
          dates,
        })
      );
    },
    [tableId, calculateNewExtremeDates]
  );

  const endDrag = React.useCallback((e: MouseEvent) => {
    setIsDragging(false);
  }, []);

  React.useEffect(() => {
    if (!isDragging) return;

    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', endDrag);

    return () => {
      document.removeEventListener('mousemove', drag);
      document.removeEventListener('mouseup', endDrag);
    };
  }, [isDragging, drag, endDrag]);

  return React.useMemo(
    () => ({
      isDragging,
      startDrag,
      moveBy,
    }),
    [isDragging, startDrag, moveBy]
  );
};
