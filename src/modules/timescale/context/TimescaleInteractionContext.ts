import React from 'react';
import { useDrag } from '../hooks/useDrag';
import { useZoom } from '../hooks/useZoom';

type TimescaleInteractionContextData = {
  zoom: ReturnType<typeof useZoom>;
  drag: ReturnType<typeof useDrag>;
  stepDelta: number;
};

const TimescaleInteractionContext = React.createContext<
  TimescaleInteractionContextData | undefined
>(undefined);

export default TimescaleInteractionContext;
