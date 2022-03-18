import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeWindow,
  maximizeWindow,
  minimizeWindow,
  normalizeWindow,
  openWindow,
  setActiveWindow,
} from '../workspaceActions';
import { getActiveWindow } from '../workspaceReducer';

export const useWindow = () => {
  const dispatch = useDispatch();
  const activeWindow = useSelector(getActiveWindow);

  const open = React.useCallback((id: string) => {
    dispatch(openWindow(id));
  }, []);

  const close = React.useCallback((id: string) => {
    dispatch(closeWindow(id));
  }, []);

  const maximize = React.useCallback((id: string) => {
    dispatch(maximizeWindow(id));
  }, []);

  const minimize = React.useCallback((id: string) => {
    dispatch(minimizeWindow(id));
  }, []);

  const normalize = React.useCallback((id: string) => {
    dispatch(normalizeWindow(id));
  }, []);

  const activate = React.useCallback(
    (id: string) => {
      if (activeWindow?.id === id) return;
      dispatch(setActiveWindow(id));
    },
    [activeWindow]
  );

  return React.useMemo(
    () => ({
      open,
      close,
      maximize,
      minimize,
      normalize,
      activate,
    }),
    [open, close, maximize, minimize, normalize, activate]
  );
};
