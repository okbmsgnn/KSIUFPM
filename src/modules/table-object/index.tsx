import React from 'react';
import styled from 'styled-components';
import {
  ContextMenuItem,
  ContextMenu,
} from '../../components/context-menu';
import { IPoint } from '../../types/IPoint';

interface TableObjectProps {
  tableObject: any;
  y: number;
  contextMenu: ContextMenuItem[];
}

export const TableObject = ({
  contextMenu,
  y,
  tableObject,
}: TableObjectProps) => {
  return (
    <ContextMenu items={contextMenu}>
      {(ref, open) => (
        <TableObject.Container
          ref={(value) => (ref.current = value)}
          onMouseDown={(e) => e.button === 2 && open()}
          location={{ x: 50, y: y - 25 }}
        />
      )}
    </ContextMenu>
  );
};

TableObject.Container = styled.div<{ location: IPoint }>`
  position: absolute;
  top: ${({ location }) => location.y}px;
  left: ${({ location }) => location.x}px;

  width: 50px;
  height: 50px;
  background: black;
`;
