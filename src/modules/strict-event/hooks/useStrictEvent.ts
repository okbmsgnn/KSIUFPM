import React from 'react';
import * as R from 'ramda';
import { useDispatch } from 'react-redux';
import { IStrictEvent } from '../model';
import {
  createStrictEvent,
  removeStrictEvent,
  updateStrictEvent,
} from '../strictEventActions';
import { createStrictEventFrom } from '../utils/createStrictEventFrom';
import { ContextMenuItem } from '../../../components/context-menu';

interface UseStrictEventProps {
  tableId: string;
}

export const useStrictEvent = ({ tableId }: UseStrictEventProps) => {
  const [editingIds, setEditingIds] = React.useState<
    Record<string, boolean>
  >({});
  const dispatch = useDispatch();

  const create = React.useCallback(
    (partial: Omit<Partial<IStrictEvent>, 'tableId'>) => {
      const created = createStrictEventFrom(tableId, partial);

      dispatch(createStrictEvent({ tableId, event: created }));
    },
    [tableId]
  );

  const update = React.useCallback(
    (event: IStrictEvent, partial: Partial<IStrictEvent>) => {
      const merged = R.mergeDeepRight(event, partial);

      dispatch(updateStrictEvent({ tableId, event: merged }));
    },
    [tableId]
  );

  const remove = React.useCallback(
    (id: string) => {
      dispatch(removeStrictEvent({ tableId, eventId: id }));
    },
    [tableId]
  );

  const createContextMenu = React.useCallback(
    (event: IStrictEvent): ContextMenuItem[] => {
      return [
        {
          displayName: 'Settings',
          action: () =>
            setEditingIds((prev) => ({ ...prev, [event.id]: true })),
        },
      ];
    },
    []
  );

  const stopEditing = React.useCallback((id: string) => {
    setEditingIds((prev) => ({ ...prev, [id]: false }));
  }, []);

  const isEditing = React.useCallback(
    (id: string) => {
      return editingIds[id] === true;
    },
    [editingIds]
  );

  return React.useMemo(
    () => ({
      create,
      createContextMenu,
      isEditing,
      remove,
      stopEditing,
      update,
    }),
    [
      create,
      createContextMenu,
      isEditing,
      remove,
      stopEditing,
      update,
    ]
  );
};
