import { timeMillisecond, utcDay } from 'd3-time';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setExtremeDates } from '../../ui/uiActions';
import {
  getExtremeDates,
  getTimescaleSize,
} from '../../ui/uiReducer';
import { useZoom } from './useZoom';

interface TimescaleInteractionProps {}

export const useTimescaleInteraction =
  ({}: TimescaleInteractionProps = {}) => {
    const dispatch = useDispatch();
    const [isDragging, setIsDragging] = React.useState(false);

    const timescaleSize = useSelector(getTimescaleSize);
    const extremeDates = useSelector(getExtremeDates);

    const zoom = useZoom(
      {
        extremeDates: extremeDates ?? {
          min: utcDay.offset(new Date(), 0),
          max: utcDay.offset(new Date(), 30),
        },
        ySize: 1080,
      },
      [extremeDates, timescaleSize.height]
    );

    const startDrag = React.useCallback((e: any) => {
      setIsDragging(true);
    }, []);

    const drag = React.useCallback(
      (e: MouseEvent) => {
        if (!extremeDates) return;
        const newExtremeMin = zoom.yScale.invert(-e.movementY);

        dispatch(
          setExtremeDates({
            min: newExtremeMin,
            max: timeMillisecond.offset(newExtremeMin, zoom.delta),
          })
        );
      },
      [extremeDates, zoom.delta, zoom.yScale]
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
        extremeDates,
        startDrag,
      }),
      [extremeDates]
    );
  };
