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
import { utcFormat } from 'd3-time-format';
import { getActiveWindow } from '../workspace/workspaceReducer';
import { useShortcut } from '../../hooks/useShortcut';
import { useWheelEvent } from '../../hooks/useWheelEvent';
import { TableObjectsLayer } from '../table-objects-layer';
import NowIndicator from './components/NowIndicator';

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
    const { stepDelta, extremeDates } = interaction;

    const missingTime = extremeDates.min.getTime() % stepDelta;

    const intervals = utcMillisecond
      .range(
        extremeDates.min,
        utcMillisecond.offset(extremeDates.max, stepDelta),
        stepDelta
      )
      .map((d) => utcMillisecond.offset(d, -missingTime));

    return intervals.reduce<{ start: Date; end: Date }[]>(
      (acc, e, idx) => {
        acc.push({
          start: e,
          end: intervals[idx + 1] ?? extremeDates.max,
        });
        return acc;
      },
      []
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

  useShortcut({
    key: 'E',
    callback: interaction.resetZoom,
    event: 'keydown',
    ignore: !activeWindow || activeWindow.id !== tableId,
  });

  useWheelEvent(
    {
      onWheel: (e) => {
        if (activeWindow?.id !== tableId) return;

        interaction.moveBy(interaction.yScale.convert(e.deltaY / 4));
      },
      onCtrlWheel: (e) => {
        if (!activeWindow || activeWindow.id !== tableId) return;

        if (e.deltaY >= 0) interaction.zoomOut();
        else interaction.zoomIn();
      },
    },
    [
      activeWindow?.id,
      tableId,
      interaction.moveBy,
      interaction.zoomOut,
      interaction.zoomIn,
      interaction.yScale,
    ]
  );

  const getRowColor = React.useCallback(
    (startDate?: Date, idx = 0) => {
      const index = startDate
        ? Math.floor(startDate.getTime() / interaction.stepDelta) % 2
        : idx;
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
      <svg width="100%" height="100%">
        <defs>
          <linearGradient
            id={`gradient_${table.id}`}
            x1="50%"
            y1="0%"
            x2="50%"
            y2="100%"
          >
            <stop
              offset="0%"
              style={{
                stopColor: getRowColor(undefined, 0),
              }}
            />
            <stop
              offset="100%"
              style={{
                stopColor: getRowColor(undefined, 1),
              }}
            />
          </linearGradient>
        </defs>

        {zoneHeight <= 5 ? (
          <rect
            width="100%"
            height="100%"
            x="0"
            y="0"
            style={{
              fill: `url(#gradient_${table.id})`,
            }}
          />
        ) : (
          zones.map((zone) => (
            <>
              <line
                x1="0"
                x2="100%"
                y1={interaction.yScale(zone.start)}
                y2={interaction.yScale(zone.start)}
                strokeWidth="1"
                stroke="#000000"
              />
              <rect
                width="100%"
                height={zoneHeight}
                x="0"
                y={interaction.yScale(zone.start)}
                style={{
                  fill: getRowColor(zone.start),
                }}
              />

              {zoneHeight > 12 && (
                <text
                  fill="#000000"
                  font-size="14"
                  font-family="Franklin Gothic"
                  x="10"
                  y={interaction.yScale(zone.start) + 14}
                >
                  {utcFormat('%m/%d/%Y %H:%M:%S')(zone.start)}
                </text>
              )}
            </>
          ))
        )}

        <NowIndicator yScale={interaction.yScale} />
      </svg>

      <TableObjectsLayer tableId={tableId} />
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
