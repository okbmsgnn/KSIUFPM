import { utcMinute } from 'd3-time';
import React from 'react';
import styled from 'styled-components';
import { DSTify } from '../../utils/date';
import { TableObject } from '../table-object';
import { useTimescaleInteraction } from '../timescale/hooks/useTimescaleInteraction';

interface TableObjectsLayerProps {
  tableId: string;
}

export const TableObjectsLayer = ({
  tableId,
}: TableObjectsLayerProps) => {
  const interaction = useTimescaleInteraction({ tableId });

  return (
    <TableObjectsLayer.Container>
      <TableObject
        contextMenu={[
          { action: () => alert('HELLO'), displayName: 'HELLO' },
        ]}
        y={interaction.yScale(
          DSTify(new Date('2022-03-28T03:00:00Z'))
        )}
      />
    </TableObjectsLayer.Container>
  );
};

TableObjectsLayer.Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 0;
  height: 0;

  z-index: 2;
`;
