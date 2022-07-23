import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  ContextMenuItem,
  ContextMenu,
} from '../../components/context-menu';
import { useDrag } from '../../hooks/useDrag';
import { useTimescaleInteraction } from '../timescale/context';
import { getTimescaleSize } from '../timescale/timescaleReducer';
import { ITableObject } from './model';

interface TableObjectProps {
  contextMenu?: ContextMenuItem[];
  primaryColor: string;
  tableObject: ITableObject;
  onLocationChange: (location: { x: number; date: Date }) => void;
  children: React.ReactNode;
}

export const TableObject = ({
  contextMenu,
  tableObject,
  primaryColor,
  onLocationChange,
  children,
}: TableObjectProps) => {
  const windowSize = useSelector((state) =>
    getTimescaleSize(state, { tableId: tableObject.tableId })
  );

  const {
    zoom: { yScale },
  } = useTimescaleInteraction();

  const [staticLocation, setStaticLocation] = React.useState({
    x: windowSize.width * tableObject.x,
    y: tableObject.date,
  });

  const location = React.useMemo(
    () => ({
      x: staticLocation.x,
      y: yScale(staticLocation.y),
    }),
    [staticLocation, yScale]
  );

  const { container, handle } = useDrag(
    {
      initialLocation: {
        x: staticLocation.x,
        y: yScale(staticLocation.y),
      },
      onDragTick: (point) => {
        setStaticLocation({
          x: point.x,
          y: yScale.invert(point.y),
        });
      },
      onDragEnd: (point) => {
        setStaticLocation({
          x: point.x,
          y: yScale.invert(point.y),
        });

        onLocationChange?.call(null, {
          x: point.x / windowSize.width,
          date: yScale.invert(point.y),
        });
      },
    },
    [yScale, windowSize, onLocationChange]
  );

  React.useEffect(() => {
    setStaticLocation((prev) => ({
      ...prev,
      x: windowSize.width * tableObject.x,
    }));
  }, [windowSize]);

  return (
    <ContextMenu items={contextMenu ?? []}>
      {(ref, open) => (
        <TableObject.Container
          ref={(value) => (ref.current = container.current = value)}
          onMouseDown={(e) => e.button === 2 && open()}
          style={{
            top: location.y + 'px',
            left: location.x + 'px',
            width:
              tableObject.size.width * tableObject.sizeMultiplier,
            height:
              tableObject.size.height * tableObject.sizeMultiplier,
          }}
        >
          {children}

          <TableObject.Handle
            color={primaryColor}
            ref={(value) => (handle.current = value)}
          />
        </TableObject.Container>
      )}
    </ContextMenu>
  );
};

TableObject.Handle = styled.div<{ color: string }>`
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.3s;

  border-radius: 50%;
  width: 16px;
  height: 16px;
  background: ${({ color }) => color};
  border: 1px solid #000;
  cursor: move;

  z-index: 3;
`;

TableObject.Container = styled.div`
  position: absolute;

  > :first-child {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  :hover ${TableObject.Handle} {
    opacity: 0.5;
    transition: opacity 0.3s;
  }
`;
