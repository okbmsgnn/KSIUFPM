import React from 'react';

export interface ComponentSize {
  width: number;
  height: number;
  x: number;
  y: number;
}

export const useComponentSize = (element: HTMLElement | null) => {
  const ref = React.useRef<HTMLElement | null>(element);
  const [size, setSize] = React.useState<ComponentSize | null>(null);

  const onResize = React.useCallback<ResizeObserverCallback>(
    (resize) => {
      const size = resize[0];
      const borderSize = size?.borderBoxSize[0];
      if (!borderSize) return;

      setSize({
        width: borderSize.inlineSize,
        height: borderSize.blockSize,
        x: size.contentRect.x,
        y: size.contentRect.y,
      });
    },
    []
  );

  const resizeObserver = React.useMemo(
    () => new ResizeObserver(onResize),
    []
  );

  React.useEffect(() => {
    ref.current = element;
    if (!element) return;
    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, [element]);

  return size;
};
