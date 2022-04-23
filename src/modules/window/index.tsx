import React from 'react';
import styled from 'styled-components';
import { useDrag } from '../../hooks/useDrag';
import { IPoint } from '../../types/IPoint';
import { PredictionTable } from '../prediction-table/model';
import { Timescale } from '../timescale';
import { TimescaleInteractionProvider } from '../timescale/context';
import { useWindow } from '../workspace/hooks/useWindow';
import { WindowState, WorkspaceWindow } from '../workspace/model';

interface WindowProps {
  table: PredictionTable;
  window: WorkspaceWindow;
  setGhostAreaColor: (hex: string) => void;
  toggleGhostAreaVisibility: (value: boolean) => void;
}

const globalWindow = window;

const calculateInitialLocation = (
  location: IPoint,
  maximized: boolean
) => {
  if (maximized) return { x: 0, y: 0 };

  return location;
};

export const Window = ({
  window,
  table,
  setGhostAreaColor,
  toggleGhostAreaVisibility,
}: WindowProps) => {
  const { activate, close, locate, maximize, minimize, normalize } =
    useWindow(window.id);

  const maximized = React.useMemo(
    () => window.state === WindowState.Maximized,
    [window.state]
  );
  const [mounted, setMounted] = React.useState(false);
  const [isMaximizing, setIsMaximizing] = React.useState(false);

  const {
    handle: handleRef,
    container: containerRef,
    location: windowLocation,
    setLocation,
  } = useDrag(
    {
      onDragStarted: ({ pivot }) => {
        if (!maximized || !handleRef.current) return;

        const newPivot = {
          x:
            (window.size.width * pivot.x) /
            handleRef.current.offsetWidth,
          y: pivot.y,
        };

        if (newPivot.x < 20) newPivot.x = 20;
        else if (newPivot.x > window.size.width - 90)
          newPivot.x = window.size.width - 90;

        normalize();

        return newPivot;
      },
      onDragEnd: (location) => {
        if (isMaximizing) {
          maximize();
          setIsMaximizing(false);
          return;
        }

        locate(location);
      },
      onDragTick: (location) => {
        if (!containerRef.current) return;
        const newLocation = { ...location };
        if (location.x < 2) newLocation.x = 2;
        if (location.y < 2) newLocation.y = 2;
        if (
          location.x >
          globalWindow.innerWidth -
            40 -
            containerRef.current.offsetWidth -
            2
        )
          newLocation.x =
            globalWindow.innerWidth -
            40 -
            containerRef.current.offsetWidth -
            2;
        if (
          location.y >
          globalWindow.innerHeight -
            40 -
            containerRef.current.offsetHeight -
            2
        )
          newLocation.y =
            globalWindow.innerHeight -
            40 -
            containerRef.current.offsetHeight -
            2;

        setIsMaximizing(newLocation.y <= 20);
        return newLocation;
      },
    },
    [maximized, isMaximizing, window.size]
  );

  const onActivate = React.useCallback(
    (e: React.MouseEvent) => {
      if ((e.target as HTMLElement).dataset.ignoreDrag) return;
      activate();
    },
    [activate]
  );

  const onMaximize = React.useCallback(
    (e: React.MouseEvent) => {
      if ((e.target as HTMLElement).dataset.ignoreDrag) return;
      if (maximized) normalize();
      else maximize();
    },
    [maximize, normalize, maximized]
  );

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    if (isMaximizing) setGhostAreaColor(table.colorPalette[0]);
    toggleGhostAreaVisibility(isMaximizing);
  }, [isMaximizing]);

  React.useEffect(() => {
    setLocation(calculateInitialLocation(window.location, maximized));
  }, [window.location, maximized]);

  return (
    <Window.Container
      ref={(value) => (containerRef.current = value)}
      size={{
        width: maximized ? '100%' : `${window.size.width}px`,
        height: maximized ? '100%' : `${window.size.height}px`,
      }}
      mounted={mounted}
      style={{
        top: windowLocation.y,
        left: windowLocation.x,
        zIndex: maximized ? 0 : window.index,
      }}
      onMouseDown={onActivate}
    >
      <Window.TitleBar
        ref={(value) => (handleRef.current = value)}
        onDoubleClick={onMaximize}
      >
        <Window.Name>{table.name}</Window.Name>

        <Window.Controls>
          <Window.ControlButton data-ignore-drag onClick={minimize}>
            –
          </Window.ControlButton>
          <Window.ControlButton
            data-ignore-drag
            onClick={maximized ? normalize : maximize}
          >
            ▢
          </Window.ControlButton>
          <Window.ControlButton data-ignore-drag onClick={close}>
            ✕
          </Window.ControlButton>
        </Window.Controls>
      </Window.TitleBar>

      <Window.Content>
        <TimescaleInteractionProvider tableId={table.id}>
          <Timescale tableId={table.id} />
        </TimescaleInteractionProvider>
      </Window.Content>
    </Window.Container>
  );
};

Window.Container = styled.div<{
  size: { width: string; height: string };
  mounted: boolean;
}>`
  position: absolute;

  width: ${({ mounted, size }) => (mounted ? size.width : 0)};
  height: ${({ mounted, size }) => (mounted ? size.height : 0)};

  background: #fff;
  color: #000;

  display: grid;
  grid-template: auto 1fr / 1fr;
  justify-content: flex-start;
  overflow: hidden;

  outline: 2.5px solid #232323;

  opacity: ${({ mounted }) => (mounted ? 1 : 0)};
  transition: opacity 0.2s ease-in, width 0.4s, height 0.4s;
`;

Window.TitleBar = styled.div`
  background: #232323;
  padding: 4px 0 4px 8px;
  display: flex;
  justify-content: space-between;
`;

Window.Content = styled.div`
  word-break: break-word;
  position: relative;
`;

Window.Name = styled.div`
  color: #fff;
`;

Window.Controls = styled.div`
  display: flex;
`;

Window.ControlButton = styled.div`
  width: 25px;
  color: #aaa;
  transition: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;

  :hover {
    color: #fff;
    transition: 0.3s;
  }
`;
