import React from 'react';
import styled from 'styled-components';
import { IRange } from '../../types/IRange';
import { useTimescaleInteraction } from './hooks/useTimescaleInteraction';

interface TimescaleProps {
  interval: IRange<Date> | Date;
}

export const Timescale = ({ interval }: TimescaleProps) => {
  const interaction = useTimescaleInteraction();

  return (
    <Timescale.Container onMouseDown={interaction.startDrag}>
      {interaction.extremeDates?.min.toDateString()}
      <br />
      {interaction.extremeDates?.max.toDateString()}
    </Timescale.Container>
  );
};

Timescale.Container = styled.div`
  width: 100%;
  height: 100%;

  background: #0af;
`;
