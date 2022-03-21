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

  const stepDelta = React.useMemo(() => {
    const milliseconds =
      table.step.type === 'days'
        ? 24 * 3600 * 1000
        : table.step.type === 'hours'
        ? 3600 * 1000
        : 30 * 24 * 3600 * 1000;

    return table.step.value * milliseconds;
  }, [table]);

  const zoom = useZoom(
    {
      extremeDates: extremeDates ?? {
        min: new Date(),
        max: new Date(),
      },
      ySize: 1080,
      tableId,
    },
    [extremeDates, timescaleSize.height, tableId]
  );

  const drag = useDrag({
    tableId,
    zoom,
  });

  return React.useMemo(
    () => ({
      ...drag,
      ...zoom,
      stepDelta,
    }),
    [drag, zoom, stepDelta]
  );
};
