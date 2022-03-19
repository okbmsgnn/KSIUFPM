import { timeMillisecond } from 'd3-time';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setExtremeDates } from '../../timescale/timescaleActions';
import { useZoom } from './useZoom';

interface DragProps {
  zoom: ReturnType<typeof useZoom>;
  tableId: string;
}

export const useDrag = ({ tableId, zoom }: DragProps) => {
  const dispatch = useDispatch();
  const [isDragging, setIsDragging] = React.useState(false);

  const startDrag = React.useCallback((e: any) => {
    setIsDragging(true);
  }, []);

  const drag = React.useCallback(
    (e: MouseEvent) => {
      if (!zoom.extremeDates) return;
      const newExtremeMin = zoom.yScale.invert(-e.movementY);

      dispatch(
        setExtremeDates({
          tableId,
          dates: {
            min: newExtremeMin,
            max: timeMillisecond.offset(newExtremeMin, zoom.delta),
          },
        })
      );
    },
    [tableId, zoom]
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

  return startDrag;
};
