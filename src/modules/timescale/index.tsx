import { utcMillisecond } from 'd3-time';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useComponentSize } from '../../hooks/useComponentSize';
import { overrideHSL } from '../../utils/color';
import { getTableById } from '../prediction-table/predictionTableReducer';
import { useTimescaleInteraction } from './hooks/useTimescaleInteraction';
import { setTimescaleSize } from './timescaleActions';
import convert from 'color-convert';
import { timeFormat } from 'd3-time-format';
import { getActiveWindow } from '../workspace/workspaceReducer';

interface TimescaleProps {
  tableId: string;
}

export const Timescale = ({ tableId }: TimescaleProps) => {
  const dispatch = useDispatch();
  const interaction = useTimescaleInteraction({ tableId });
  const container = React.useRef<HTMLElement | null>(null);
  const timescaleSize = useComponentSize(container.current);
  const activeWindow = useSelector(getActiveWindow);

  const table = useSelector((state) =>
    getTableById(state, { tableId })
  );

  const zoneHeight = React.useMemo(
    () =>
      interaction.yScale(
        utcMillisecond.offset(
          interaction.extremeDates.min,
          interaction.stepDelta
        )
      ),
    [
      interaction.stepDelta,
      interaction.extremeDates,
      interaction.yScale,
    ]
  );

  const zones = React.useMemo(() => {
    const { delta, stepDelta, extremeDates } = interaction;

    const missingTime = extremeDates.min.getTime() % stepDelta;

    return Array.from(
      {
        length: Math.ceil((delta + missingTime) / stepDelta),
      },
      (_, idx) => {
        const start = utcMillisecond.offset(
          extremeDates.min,
          stepDelta * idx - missingTime
        );
        const end = utcMillisecond.offset(
          start,
          stepDelta * (idx + 1)
        );

        return {
          start,
          end:
            end.getTime() >= extremeDates.max.getTime()
              ? extremeDates.max
              : end,
        };
      }
    );
  }, [interaction, table]);

  React.useEffect(() => {
    if (!timescaleSize) return;

    dispatch(
      setTimescaleSize({
        size: {
          height: timescaleSize.height,
          width: timescaleSize.width,
        },
        tableId,
      })
    );
  }, [tableId, timescaleSize]);

  React.useEffect(() => {
    if (!activeWindow || activeWindow.id !== tableId) return;
    const handler = (e: any) => {
      if (e.code === 'KeyQ') {
        interaction.zoomIn();
      } else if (e.code === 'KeyW') {
        interaction.zoomOut();
      } else if (e.code === 'KeyE') {
        interaction.resetZoom();
      }
    };

    document.addEventListener('keydown', handler);
    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, [
    tableId,
    activeWindow,
    interaction.zoomIn,
    interaction.zoomOut,
    interaction.resetZoom,
  ]);

  const getRowColor = React.useCallback(
    (z: { start: Date; end: Date }) => {
      const index =
        Math.floor(z.start.getTime() / interaction.stepDelta) % 2;
      const hex = table.colorPalette[index];
      const hsl = convert.hex.hsl(hex);

      const overriden = overrideHSL(hsl, [, 50, 80]);

      return `hsl(${overriden[0]}, ${overriden[1]}%, ${overriden[2]}%)`;
    },
    [table, interaction.stepDelta]
  );

  return (
    <Timescale.Container
      cursor={interaction.isDragging ? 'grabbing' : 'grab'}
      onMouseDown={interaction.startDrag}
      ref={(value) => (container.current = value)}
    >
      {zones.map((z) => (
        <Timescale.Step
          key={z.start.toISOString()}
          style={{
            position: 'absolute',
            top: interaction.yScale(z.start),
            left: 0,
            height: zoneHeight,
            width: '100%',
            background: getRowColor(z),
            borderTop: '1px solid #ffffff80',
            boxSizing: 'border-box',
            color: '#00000060',
            fontFamily: 'Franklin Gothic',
            fontSize: 14,
          }}
        >
          {timeFormat('%m/%d/%Y %H:%M:%S')(z.start)}
        </Timescale.Step>
      ))}
    </Timescale.Container>
  );
};

Timescale.Container = styled.div<{ cursor: 'grab' | 'grabbing' }>`
  position: relative;
  width: 100%;
  height: 100%;

  background: #121212;
  color: #fff;

  cursor: ${({ cursor }) => cursor};

  overflow: hidden;
`;

Timescale.Step = styled.div`
  padding-top: 2px;
  padding-left: 2px;
`;
