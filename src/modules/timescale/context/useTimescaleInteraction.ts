import React from 'react';
import TimescaleInteractionContext from './TimescaleInteractionContext';

export const useTimescaleInteraction = () => {
  const context = React.useContext(TimescaleInteractionContext);

  if (!context)
    throw new Error(
      'TimescaleInteractionContext should be used within provider!'
    );

  return context;
};
