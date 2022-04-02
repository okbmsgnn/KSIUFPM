import React from 'react';

interface WheelEventProps {
  onWheel?: (e: WheelEvent) => void;
  onCtrlWheel?: (e: WheelEvent) => void;
}

export const useWheelEvent = (
  { onCtrlWheel, onWheel }: WheelEventProps,
  deps: any[] = []
) => {
  const [isCtrlPressed, setIsCtrlPressed] = React.useState(false);

  const onKeyDown = React.useCallback((e: KeyboardEvent) => {
    setIsCtrlPressed(e.ctrlKey);
  }, []);

  const onKeyUp = React.useCallback((e: KeyboardEvent) => {
    setIsCtrlPressed(false);
  }, []);

  React.useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
    };
  }, [onKeyDown, onKeyUp]);

  React.useEffect(() => {
    const listener = isCtrlPressed ? onCtrlWheel : onWheel;
    if (!listener) return;
    document.addEventListener('wheel', listener);

    return () => {
      document.removeEventListener('wheel', listener);
    };
  }, [onWheel, onCtrlWheel, ...deps]);
};
