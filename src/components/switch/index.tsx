import React from 'react';
import styled from 'styled-components';

interface SwitchProps {
  defaultState?: boolean;
  disabled?: boolean;
  size?: number;
  onChange?: (state: boolean) => void;
  type?: 'rounded' | 'squared';
}

export const Switch = ({
  defaultState = false,
  disabled = false,
  size = 30,
  onChange,
  type = 'rounded',
}: SwitchProps) => {
  const [state, setState] = React.useState(defaultState);
  const color = React.useMemo(() => {
    return `hsl(${state ? 113 : 0}, ${disabled ? 5 : 65}%, 50%)`;
  }, [disabled, state]);

  React.useEffect(() => {
    setState(defaultState);
  }, [defaultState]);

  React.useEffect(() => onChange?.call(null, state), [state]);

  return (
    <Switch.Container
      width={size}
      height={size / 2}
      padding={4}
      borderRadius={type === 'rounded' ? size / 2 : size / 8}
      on={state}
      onClick={() => !disabled && setState((prev) => !prev)}
      color={color}
    ></Switch.Container>
  );
};

Switch.Container = styled.div<{
  height: number;
  width: number;
  on: boolean;
  padding: number;
  color: string;
  borderRadius: number;
}>`
  position: relative;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  box-shadow: inset ${({ padding }) => `${padding}px ${padding}px`} 0
      0 rgba(0, 0, 0, 0.35),
    inset 0 0 ${({ height }) => `${height / 10}px ${height / 10}px`}
      rgba(0, 0, 0, 0.35);
  background: rgba(0, 0, 0, 0.3);

  border-radius: ${({ borderRadius }) => borderRadius}px;
  border: 1px solid ${({ color }) => color};
  cursor: pointer;

  transition: border-color 0.3s;

  :after {
    content: '';
    display: block;

    position: absolute;
    top: 50%;
    left: ${({ on, height, padding }) =>
      on ? height + padding : padding}px;
    transform: translateY(-50%);

    width: ${({ height, padding }) => height - padding * 2}px;
    height: ${({ height, padding }) => height - padding * 2}px;

    border-radius: ${({ borderRadius }) => borderRadius}px;
    box-shadow: inset 0 0 3px 2px rgba(0, 0, 0, 0.5);
    background: ${({ color }) => color};
    transition: left 0.3s, background 0.3s;
  }
`;
