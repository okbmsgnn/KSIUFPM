import { utcHour } from 'd3-time';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getTableById } from '../prediction-table/predictionTableReducer';
import { TableObject } from '../table-object';

interface TableObjectsLayerProps {
  tableId: string;
}

const TableObjectsLayer = ({ tableId }: TableObjectsLayerProps) => {
  const table = useSelector((state) =>
    getTableById(state, { tableId })
  );

  const objects = React.useMemo(() => {
    const pivot = new Date('2022-03-28T03:00:00Z');

    const rand = (n: number) => Math.random() * n;
    const randY = (n: number) => utcHour.offset(pivot, rand(n));
    const date = Date.now();
    return Array.from({ length: 200 }, (_, idx) => ({
      location: { x: rand(1500), y: randY(1000) },
      id: `${date}-${idx + 1}`,
    }));
  }, []);

  return (
    <TableObjectsLayer.Container>
      {objects.map((o) => (
        <TableObject
          contextMenu={[
            {
              action: () => alert(o.id),
              displayName: 'Show Details',
            },
          ]}
          primaryColor={table.colorPalette[2]}
          tableObject={o}
          key={o.id}
        />
      ))}
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

export default React.memo(TableObjectsLayer);
