import React from 'react';
import convert from 'color-convert';
import styled from 'styled-components';
import { overrideHSL } from '../../../utils/color';
import { Transition, TransitionStatus } from 'react-transition-group';

interface GhostAreaProps {
  override: [
    number | undefined,
    number | undefined,
    number | undefined
  ];
}

const Area = ({ color, show }: { color: string; show: boolean }) => {
  const transitionStyles = React.useMemo<{
    [key in TransitionStatus]?: React.CSSProperties;
  }>(
    () => ({
      entered: { opacity: 1 },
      exited: { opacity: 0 },
    }),
    []
  );

  return (
    <Transition in={show} timeout={0}>
      {(state) => (
        <Area.Container
          color={color}
          style={transitionStyles[state]}
        />
      )}
    </Transition>
  );
};

Area.Container = styled.div<{ color: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  opacity: 0;
  transition: opacity 0.3s;

  background: linear-gradient(
    to bottom,
    ${({ color }) => color},
    transparent
  );

  pointer-events: none;

  z-index: 2;
`;

export const useGhostArea = ({ override }: GhostAreaProps) => {
  const [color, setColorLocally] = React.useState('');
  const [show, setShow] = React.useState(false);

  const setColor = React.useCallback((hex: string) => {
    const parsed = convert.hex.hsl(hex);
    const color = overrideHSL(parsed, override);
    const rgb = convert.hsl.rgb(color);

    setColorLocally(`rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.5)`);
  }, []);

  const AreaMemoized = React.useMemo(
    () => <Area color={color} show={show} />,
    [color, show]
  );

  return React.useMemo(
    () => ({
      GhostArea: AreaMemoized,
      toggleGhostAreaVisibility: (value: boolean) => setShow(value),
      setGhostAreaColor: setColor,
    }),
    [color, show]
  );
};
