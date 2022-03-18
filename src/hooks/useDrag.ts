import React from 'react';
import { IPoint } from '../types/IPoint';

interface DragProps {
  onDragStart?: () => void;
  onDragTick?: () => void;
  onDragEnd?: () => void;
  initialLocation?: IPoint;
}

type DragData = [
  React.MutableRefObject<HTMLElement | null>,
  React.MutableRefObject<HTMLElement | null>,
  IPoint
];

export const useDrag = (props: DragProps = {}, deps?: any[]) => {
  const { initialLocation, onDragEnd, onDragStart, onDragTick } =
    React.useMemo(() => props, deps);

  const [location, setLocation] = React.useState<IPoint>(
    initialLocation ?? {
      x: 0,
      y: 0,
    }
  );
  const [pivot, setPivot] = React.useState<IPoint | null>(null);
  const handle = React.useRef<HTMLElement | null>(null);
  const container = React.useRef<HTMLElement | null>(null);

  const startDrag = React.useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const draggable = container.current ?? handle.current;
      if (!draggable || target.dataset.ignoreDrag) return;

      onDragStart?.call(null);
      setPivot({
        x: e.pageX - draggable.offsetLeft,
        y: e.pageY - draggable.offsetTop,
      });
    },
    [onDragStart]
  );

  const tickDrag = React.useCallback(
    (e: MouseEvent) => {
      if (!pivot) return;
      onDragTick?.call(null);
      setLocation({ x: e.pageX - pivot.x, y: e.pageY - pivot.y });
    },
    [pivot]
  );

  const endDrag = React.useCallback(() => {
    onDragEnd?.call(null);
    setPivot(null);
  }, []);

  React.useEffect(
    () => setLocation(initialLocation ?? { x: 0, y: 0 }),
    [initialLocation]
  );

  React.useEffect(() => {
    if (!handle.current) return;

    handle.current.addEventListener('mousedown', startDrag);
    return () => {
      handle.current?.removeEventListener('mousedown', startDrag);
    };
  }, [startDrag, handle.current]);

  React.useEffect(() => {
    if (!pivot) return;
    document.addEventListener('mousemove', tickDrag);
    document.addEventListener('mouseup', endDrag);

    return () => {
      document.removeEventListener('mousemove', tickDrag);
      document.removeEventListener('mouseup', endDrag);
    };
  }, [pivot, endDrag, tickDrag]);

  return React.useMemo<DragData>(
    () => [handle, container, location],
    [handle, container, location]
  );
};
