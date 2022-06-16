import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Portal } from '../../components/portal';
import { getTableById } from '../prediction-table/predictionTableReducer';
import { TableObject } from '../table-object';
import { IStrictEvent } from '../table-object/model';
import { removeStrictEvent } from '../table-object/tableObjectActions';
import { getStrictEvents } from '../table-object/tableObjectReducer';

interface TableObjectsLayerProps {
  tableId: string;
}

interface TableObjectEditMode {
  sizeMultiplier: { objectId: string } | null;
}

const TableObjectsLayer = ({ tableId }: TableObjectsLayerProps) => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = React.useState<TableObjectEditMode>(
    { sizeMultiplier: null }
  );
  const table = useSelector((state) =>
    getTableById(state, { tableId })
  );

  const startEditing = React.useCallback(
    (objectId: string, prop: keyof TableObjectEditMode) => {
      switch (prop) {
        case 'sizeMultiplier': {
          setEditMode((prev) => ({
            ...prev,
            sizeMultiplier: { objectId },
          }));
          break;
        }
        default:
          break;
      }
    },
    []
  );

  const stopEditing = React.useCallback(
    (prop: keyof TableObjectEditMode) => {
      setEditMode((prev) => ({ ...prev, [prop]: null }));
    },
    []
  );

  const loadedStrictEvents = useSelector((state) =>
    getStrictEvents(state, { tableId })
  );

  const [strictEvents, setStrictEvents] = React.useState<
    IStrictEvent[]
  >(loadedStrictEvents);

  React.useEffect(() => {
    setStrictEvents(loadedStrictEvents);
  }, [loadedStrictEvents]);

  return (
    <TableObjectsLayer.Container>
      {strictEvents.map((o) => (
        <TableObject
          contextMenu={[
            {
              action: () => alert(o.date.toISOString()),
              displayName: 'Show Details',
            },
            {
              action: () => {
                startEditing(o.id, 'sizeMultiplier');
              },
              displayName: 'Set Size Miltiplier',
            },
            {
              action: () =>
                dispatch(
                  removeStrictEvent({ tableId, eventId: o.id })
                ),
              displayName: 'Delete',
            },
          ]}
          primaryColor={table.colorPalette[2]}
          tableObject={o}
          key={o.id}
          tableId={tableId}
        />
      ))}

      {editMode.sizeMultiplier && (
        <Portal>
          <div
            style={{ background: '#fff', border: '2px solid black' }}
          >
            <div style={{ marginBottom: '10px' }}>
              Change Size Multiplier
            </div>

            <input
              id="size-multiplier-input"
              type="range"
              step="1"
              min="50"
              max="200"
            />
            <br />
            <button
              onClick={() => {
                const input = document.querySelector(
                  '#size-multiplier-input'
                ) as HTMLInputElement;

                const value = parseInt(input.value) / 100;

                if (Number.isNaN(value)) return;

                setStrictEvents((prev) =>
                  prev.map((o) =>
                    o.id === editMode.sizeMultiplier?.objectId
                      ? { ...o, sizeMultiplier: value }
                      : o
                  )
                );

                stopEditing('sizeMultiplier');
              }}
            >
              Submit
            </button>

            <button onClick={() => stopEditing('sizeMultiplier')}>
              Cancel
            </button>
          </div>
        </Portal>
      )}
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
