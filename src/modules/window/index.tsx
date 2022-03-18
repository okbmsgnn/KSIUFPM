import React from 'react';
import styled from 'styled-components';
import { useDrag } from '../../hooks/useDrag';
import { ISize } from '../../types/ISize';
import { PredictionTable } from '../prediction-table/model';
import { WorkspaceWindow } from '../workspace/model';

interface WindowProps {
  table: PredictionTable;
  window: WorkspaceWindow;
  maximize: () => void;
  minimize: () => void;
  normalize: () => void;
  activate: () => void;
  close: () => void;
}

const globalWindow = window;

export const Window = ({
  window,
  table,
  activate,
  maximize,
  minimize,
  normalize,
  close,
}: WindowProps) => {
  const [mounted, setMounted] = React.useState(false);
  const [handleRef, containerRef, windowLocation] = useDrag(
    {
      initialLocation: { x: globalWindow.innerWidth / 4, y: 30 },
    },
    []
  );

  const onActivate = React.useCallback(
    (e: React.MouseEvent) => {
      if ((e.target as HTMLElement).dataset.ignoreActivate) return;
      activate();
    },
    [activate]
  );

  React.useEffect(() => setMounted(true), []);

  return (
    <Window.Container
      ref={(value) => (containerRef.current = value)}
      size={window.size}
      order={window.order}
      mounted={mounted}
      style={{
        top: windowLocation.y,
        left: windowLocation.x,
        zIndex: window.index,
      }}
      onMouseDown={onActivate}
    >
      <Window.TitleBar ref={(value) => (handleRef.current = value)}>
        <Window.Name>{table.name}</Window.Name>

        <Window.Controls>
          <Window.ControlButton
            data-ignore-drag
            data-ignore-activate
            onClick={minimize}
          >
            –
          </Window.ControlButton>
          <Window.ControlButton
            data-ignore-drag
            data-ignore-activate
            onClick={maximize}
          >
            ▢
          </Window.ControlButton>
          <Window.ControlButton
            data-ignore-drag
            data-ignore-activate
            onClick={close}
          >
            ✕
          </Window.ControlButton>
        </Window.Controls>
      </Window.TitleBar>

      <Window.Content>
        {JSON.stringify(table, null, 0)}
      </Window.Content>
    </Window.Container>
  );
};

Window.Container = styled.div<{
  size: ISize;
  order: number;
  mounted: boolean;
}>`
  position: absolute;

  width: ${({ mounted, size }) => (mounted ? size.width : 0)}px;
  height: ${({ mounted, size }) => (mounted ? size.height : 0)}px;

  background: #fff;
  color: #000;

  display: grid;
  grid-template: auto 1fr / 1fr;
  justify-content: flex-start;
  overflow: hidden;

  border: 2px solid #232323;
  box-sizing: border-box;

  opacity: ${({ mounted }) => (mounted ? 1 : 0)};
  transition: opacity 0.2s ease-in, width 0.4s, height 0.4s;
`;

Window.TitleBar = styled.div`
  background: #232323;
  padding: 4px 8px;
  display: flex;
  justify-content: space-between;
`;

Window.Content = styled.div`
  word-break: break-word;
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

  :hover {
    color: #fff;
    transition: 0.3s;
  }
`;
