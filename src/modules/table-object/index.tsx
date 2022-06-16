import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
  ContextMenuItem,
  ContextMenu,
} from '../../components/context-menu';
import { useDrag } from '../../hooks/useDrag';
import { useTimescaleInteraction } from '../timescale/context';
import { IStrictEvent, ITableObject } from './model';
import { updateStrictEvent } from './tableObjectActions';

interface TableObjectProps {
  tableObject: ITableObject;
  contextMenu: ContextMenuItem[];
  primaryColor: string;
  tableId: string;
}

const tableObjectStyle: Record<string, string> = {
  strictEvent: `
    background: #A1A1A1;
    border: 2px solid #565656;

    :after {
      content: '';
      width: 84%;
      height: 84%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #b0f4ff55;
      z-index: 2;
      transition: 0.4s;
    }

    :hover:after {
      background: #c1f5ffff;
      transition: 0.4s;
    }
  `,
};

export const TableObject = ({
  contextMenu,
  tableObject,
  primaryColor,
  tableId,
}: TableObjectProps) => {
  const dispatch = useDispatch();
  const {
    zoom: { yScale },
  } = useTimescaleInteraction();

  const [staticLocation, setStaticLocation] = React.useState({
    x: tableObject.x,
    y: tableObject.date,
  });

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

        const event = {
          ...tableObject,
          x: point.x,
          date: yScale.invert(point.y),
        } as IStrictEvent;

        dispatch(updateStrictEvent({ event, tableId }));
      },
    },
    [yScale, tableId]
  );

  const location = React.useMemo(
    () => ({
      x: staticLocation.x,
      y: yScale(staticLocation.y),
    }),
    [staticLocation, yScale]
  );

  return (
    <ContextMenu items={contextMenu}>
      {(ref, open) => (
        <TableObject.Container
          ref={(value) => (ref.current = container.current = value)}
          onMouseDown={(e) => e.button === 2 && open()}
          style={{
            top: location.y + 'px',
            left: location.x + 'px',
            width: 50 * tableObject.sizeMultiplier,
            height: 50 * tableObject.sizeMultiplier,
          }}
          styles={tableObjectStyle.strictEvent}
        >
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

TableObject.Container = styled.div<{ styles: string }>`
  position: absolute;

  :hover ${TableObject.Handle} {
    opacity: 0.5;
    transition: opacity 0.3s;
  }

  ${({ styles }) => styles};
`;
