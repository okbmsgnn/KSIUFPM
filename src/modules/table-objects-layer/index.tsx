import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import StrictEvent from '../strict-event';
import { useStrictEvent } from '../strict-event/hooks/useStrictEvent';
import { getStrictEvents } from '../strict-event/strictEventReducer';
import { TableObject } from '../table-object';

interface TableObjectsLayerProps {
  tableId: string;
}

const TableObjectsLayer = ({ tableId }: TableObjectsLayerProps) => {
  const strictEvent = useStrictEvent({ tableId });

  const strictEvents = useSelector((state) =>
    getStrictEvents(state, { tableId })
  );

  return (
    <TableObjectsLayer.Container>
      {strictEvents.map((event) => (
        <TableObject
          key={event.id}
          onLocationChange={(location) =>
            strictEvent.update(event, location)
          }
          primaryColor="#ff0000"
          tableObject={event}
          contextMenu={strictEvent.createContextMenu(event)}
        >
          <StrictEvent event={event} />
        </TableObject>
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
