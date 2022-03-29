import React from 'react';

export type Key =
  | 'Q'
  | 'W'
  | 'E'
  | 'R'
  | 'T'
  | 'Y'
  | 'U'
  | 'I'
  | 'O'
  | 'P'
  | 'A'
  | 'S'
  | 'D'
  | 'F'
  | 'G'
  | 'H'
  | 'J'
  | 'K'
  | 'L'
  | 'Z'
  | 'X'
  | 'C'
  | 'V'
  | 'B'
  | 'N';

export type Modifier = 'alt' | 'shift' | 'ctrl';

interface ShortcutProps {
  key: Key;
  callback: (e: KeyboardEvent) => void;
  modifier?: Modifier[];
  event?: 'keyup' | 'keydown' | 'keypress';
  ignore?: boolean;
}

export const useShortcut = (
  {
    callback,
    key,
    modifier,
    event = 'keyup',
    ignore = false,
  }: ShortcutProps,
  deps: any[] = []
) => {
  const handler = React.useCallback(
    (e: KeyboardEvent) => {
      if (ignore) return;
      if (
        e.code === `Key${key}` &&
        (!modifier || modifier.every((m) => e[`${m}Key`]))
      )
        callback(e);
    },
    [callback, key, modifier, ignore]
  );

  React.useEffect(() => {
    document.addEventListener(event, handler);

    return () => {
      document.removeEventListener(event, handler);
    };
  }, [event, handler, ...deps]);
};
