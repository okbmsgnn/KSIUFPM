import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IPoint } from '../../../types/IPoint';
import {
  closeWindow,
  locateWindow,
  maximizeWindow,
  minimizeWindow,
  normalizeWindow,
  setActiveWindow,
} from '../workspaceActions';
import { getActiveWindow } from '../workspaceReducer';

export const useWindow = (id: string) => {
  const dispatch = useDispatch();
  const activeWindow = useSelector(getActiveWindow);

  const close = React.useCallback(() => {
    dispatch(closeWindow(id));
  }, [id]);

  const maximize = React.useCallback(() => {
    dispatch(maximizeWindow(id));
  }, [id]);

  const minimize = React.useCallback(() => {
    dispatch(minimizeWindow(id));
  }, [id]);

  const normalize = React.useCallback(() => {
    dispatch(normalizeWindow(id));
  }, [id]);

  const activate = React.useCallback(() => {
    if (activeWindow?.id === id) return;
    dispatch(setActiveWindow(id));
  }, [activeWindow, id]);

  const locate = React.useCallback(
    (location: IPoint) => {
      dispatch(
        locateWindow({
          id,
          location,
        })
      );
    },
    [id]
  );

  return React.useMemo(
    () => ({
      close,
      maximize,
      minimize,
      normalize,
      activate,
      locate,
    }),
    [close, maximize, minimize, normalize, activate, locate]
  );
};
