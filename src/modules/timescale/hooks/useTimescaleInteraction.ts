import React from 'react';
import { useSelector } from 'react-redux';
import { getTableById } from '../../prediction-table/predictionTableReducer';
import {
  getExtremeDates,
  getTimescaleSize,
} from '../timescaleReducer';
import { useDrag } from './useDrag';
import { useZoom } from './useZoom';

interface TimescaleInteractionProps {
  tableId: string;
}

export const useTimescaleInteraction = ({
  tableId,
}: TimescaleInteractionProps) => {
  const timescaleSize = useSelector((state) =>
    getTimescaleSize(state, { tableId })
  );
  const extremeDates = useSelector((state) =>
    getExtremeDates(state, { tableId })
  );
  const table = useSelector((state) =>
    getTableById(state, { tableId })
  );

  const zoom = useZoom(
    {
      extremeDates: extremeDates ?? {
        min: new Date(),
        max: new Date(),
      },
      ySize: 1080,
    },
    [extremeDates, timescaleSize.height, table]
  );

  const startDrag = useDrag({
    tableId,
    zoom,
  });

  return React.useMemo(
    () => ({
      extremeDates,
      startDrag,
    }),
    [extremeDates]
  );
};
