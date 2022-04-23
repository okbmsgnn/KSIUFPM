import React from 'react';
import styled from 'styled-components';
import {
  ContextMenuItem,
  ContextMenu,
} from '../../components/context-menu';
import { useDrag } from '../../hooks/useDrag';
import { useTimescaleInteraction } from '../timescale/context';

interface TableObjectProps {
  tableObject: { location: { x: number; y: Date } };
  contextMenu: ContextMenuItem[];
  primaryColor: string;
}

export const TableObject = ({
  contextMenu,
  tableObject,
  primaryColor,
}: TableObjectProps) => {
  const {
    zoom: { yScale },
  } = useTimescaleInteraction();

  const [staticLocation, setStaticLocation] = React.useState({
    x: tableObject.location.x,
    y: tableObject.location.y,
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
      },
    },
    [yScale]
  );

  return (
    <ContextMenu items={contextMenu}>
      {(ref, open) => (
        <TableObject.Container
          id="ebal"
          ref={(value) => (ref.current = container.current = value)}
          onMouseDown={(e) => e.button === 2 && open()}
          style={{
            top: yScale(staticLocation.y) + 'px',
            left: staticLocation.x + 'px',
          }}
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
`;

TableObject.Container = styled.div`
  position: absolute;

  width: 50px;
  height: 50px;
  background: black;

  :hover ${TableObject.Handle} {
    opacity: 0.5;
    transition: opacity 0.3s;
  }
`;
