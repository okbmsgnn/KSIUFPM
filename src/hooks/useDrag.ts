import React from 'react';
import { IPoint } from '../types/IPoint';

interface DragProps {
  onDragStart?: () => void;
  onDragStarted?: (event: { pivot: IPoint }) => void | IPoint;
  onDragTick?: (location: IPoint) => void | IPoint;
  onDragEnd?: (location: IPoint) => void;
  initialLocation?: IPoint;
}

type DragData = {
  handle: React.MutableRefObject<HTMLElement | null>;
  container: React.MutableRefObject<HTMLElement | null>;
  location: IPoint;
  setLocation: (location: IPoint) => void;
  isDragging: boolean;
};

export const useDrag = (props: DragProps = {}, deps?: any[]) => {
  const [pivot, setPivot] = React.useState<IPoint | null>(null);
  const [localProps, setLocalProps] = React.useState(props);

  React.useEffect(() => {
    if (!pivot) return;

    setLocalProps(props);
  }, [!!pivot, ...(deps ?? [])]);

  const {
    initialLocation,
    onDragEnd,
    onDragStart,
    onDragStarted,
    onDragTick,
  } = localProps;

  const [location, setLocation] = React.useState<IPoint>(
    initialLocation ?? {
      x: 0,
      y: 0,
    }
  );
  const wasDragged = React.useRef(false);
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

      const newLocation = {
        x: e.pageX - pivot.x,
        y: e.pageY - pivot.y,
      };

      if (!wasDragged.current) {
        wasDragged.current = true;
        const newPivot = onDragStarted?.call(null, {
          pivot,
        });
        if (newPivot) {
          setPivot(newPivot);
          setLocation({
            x: e.pageX - newPivot.x,
            y: e.pageY - newPivot.y,
          });

          return;
        }
      }

      const modifiedLocation = onDragTick?.call(null, newLocation);
      setLocation(modifiedLocation ?? newLocation);
    },
    [pivot, location]
  );

  const endDrag = React.useCallback(() => {
    if (wasDragged.current) onDragEnd?.call(null, location);
    wasDragged.current = false;
    setPivot(null);
  }, [location]);

  React.useEffect(() => {
    setLocation(initialLocation ?? { x: 0, y: 0 });
  }, [initialLocation]);

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
    () => ({
      handle,
      container,
      location,
      setLocation,
      isDragging: !!pivot,
    }),
    [handle, container, location, pivot]
  );
};
