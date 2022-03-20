import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useComponentSize } from '../../hooks/useComponentSize';
import { useTimescaleInteraction } from './hooks/useTimescaleInteraction';
import { setTimescaleSize } from './timescaleActions';

interface TimescaleProps {
  tableId: string;
}

export const Timescale = ({ tableId }: TimescaleProps) => {
  const dispatch = useDispatch();
  const interaction = useTimescaleInteraction({ tableId });
  const container = React.useRef<HTMLElement | null>(null);
  const timescaleSize = useComponentSize(container.current);

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

  return (
    <Timescale.Container
      onMouseDown={interaction.startDrag}
      ref={(value) => (container.current = value)}
    >
      {interaction.extremeDates?.min.toDateString()}
      <br />
      {interaction.extremeDates?.max.toDateString()}
    </Timescale.Container>
  );
};

Timescale.Container = styled.div`
  width: 100%;
  height: 100%;

  background: #121212;
  color: #fff;
`;
