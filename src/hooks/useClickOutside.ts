import React, { MutableRefObject } from 'react';

export const useClickOutside = (
  ref: MutableRefObject<HTMLElement | null>,
  callback: (e: MouseEvent) => any,
  event: 'click' | 'mousedown' | 'mouseup' = 'click'
) => {
  const clickHandler = React.useCallback(
    (e) => {
      if (
        !ref.current ||
        e.path.some((target: HTMLElement) => target === ref.current)
      )
        return;

      callback(e);
    },
    [callback]
  );

  React.useEffect(() => {
    document.addEventListener(event, clickHandler);

    return () => {
      document.removeEventListener(event, clickHandler);
    };
  }, [clickHandler, event]);
};
