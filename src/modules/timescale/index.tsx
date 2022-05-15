import { utcMillisecond } from 'd3-time';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useComponentSize } from '../../hooks/useComponentSize';
import { overrideHSL } from '../../utils/color';
import { getTableById } from '../prediction-table/predictionTableReducer';
import { setTimescaleSize } from './timescaleActions';
import convert from 'color-convert';
import { utcFormat } from 'd3-time-format';
import { getActiveWindow } from '../workspace/workspaceReducer';
import { useShortcut } from '../../hooks/useShortcut';
import { useWheelEvent } from '../../hooks/useWheelEvent';
import TableObjectsLayer from '../table-objects-layer';
import NowIndicator from './components/NowIndicator';
import { useTimescaleInteraction } from './context';

interface TimescaleProps {
  tableId: string;
}

export const Timescale = ({ tableId }: TimescaleProps) => {
  const dispatch = useDispatch();
  const interaction = useTimescaleInteraction();
  const container = React.useRef<HTMLElement | null>(null);
  const timescaleSize = useComponentSize(container.current);
  const activeWindow = useSelector(getActiveWindow);
  const table = useSelector((state) =>
    getTableById(state, { tableId })
  );

  const zoneHeight = React.useMemo(
    () =>
      interaction.zoom.yScale(
        utcMillisecond.offset(
          interaction.zoom.extremeDates.min,
          interaction.stepDelta
        )
      ),
    [interaction.stepDelta, interaction.zoom]
  );

  const zones = React.useMemo(() => {
    const {
      stepDelta,
      zoom: { extremeDates },
    } = interaction;

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
    callback: interaction.zoom.resetZoom,
    event: 'keydown',
    ignore: !activeWindow || activeWindow.id !== tableId,
  });

  useWheelEvent(
    {
      onWheel: (e) => {
        if (activeWindow?.id !== tableId) return;

        interaction.drag.moveBy(
          interaction.zoom.yScale.convert(e.deltaY / 4)
        );
      },
      onCtrlWheel: (e) => {
        if (!activeWindow || activeWindow.id !== tableId) return;

        if (e.deltaY >= 0) interaction.zoom.zoomOut();
        else interaction.zoom.zoomIn();
      },
    },
    [activeWindow?.id, tableId, interaction.drag, interaction.zoom]
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
    <Timescale.Container ref={(value) => (container.current = value)}>
      <svg
        width="100%"
        height="100%"
        onMouseDown={interaction.drag.startDrag}
        style={{
          cursor: interaction.drag.isDragging ? 'grabbing' : 'grab',
        }}
      >
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
                y1={interaction.zoom.yScale(zone.start)}
                y2={interaction.zoom.yScale(zone.start)}
                strokeWidth="1"
                stroke="#000000"
              />
              <rect
                width="100%"
                height={zoneHeight}
                x="0"
                y={interaction.zoom.yScale(zone.start)}
                style={{
                  fill: getRowColor(zone.start),
                }}
              />

              {zoneHeight > 12 && (
                <text
                  fill="#000000"
                  fontSize="14"
                  fontFamily="Franklin Gothic"
                  x="10"
                  y={interaction.zoom.yScale(zone.start) + 14}
                >
                  {utcFormat('%m/%d/%Y %H:%M:%S')(zone.start)}
                </text>
              )}
            </>
          ))
        )}

        <NowIndicator yScale={interaction.zoom.yScale} />
      </svg>

      <TableObjectsLayer tableId={tableId} />
    </Timescale.Container>
  );
};

Timescale.Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  background: #121212;
  color: #fff;

  overflow: hidden;

  &:active rect {
    pointer-events: none;
  }
`;

Timescale.Step = styled.div`
  padding-top: 2px;
  padding-left: 2px;
`;
