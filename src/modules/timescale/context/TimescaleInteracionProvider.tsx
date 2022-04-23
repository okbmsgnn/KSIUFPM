import React from 'react';
import { useSelector } from 'react-redux';
import { getTableById } from '../../prediction-table/predictionTableReducer';
import { useDrag } from '../hooks/useDrag';
import { useZoom } from '../hooks/useZoom';
import {
  getExtremeDates,
  getTimescaleSize,
} from '../timescaleReducer';
import TimescaleInteractionContext from './TimescaleInteractionContext';

interface TimescaleInteractionProviderProps {
  children: React.ReactNode;
  tableId: string;
}

export const TimescaleInteractionProvider = ({
  tableId,
  children,
}: TimescaleInteractionProviderProps) => {
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
      ySize: timescaleSize.height,
      tableId,
    },
    [extremeDates, timescaleSize.height, tableId]
  );

  const drag = useDrag({
    tableId,
    zoom,
  });

  const context = React.useMemo(
    () => ({
      drag,
      zoom,
      stepDelta,
    }),
    [drag, zoom, stepDelta]
  );

  return (
    <TimescaleInteractionContext.Provider value={context}>
      {children}
    </TimescaleInteractionContext.Provider>
  );
};
