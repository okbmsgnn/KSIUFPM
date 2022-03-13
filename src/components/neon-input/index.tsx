import React from 'react';
import styled from 'styled-components';

type NeonInputProps = JSX.IntrinsicElements['input'] & {
  border?: {
    activeColor: string;
    defaultColor: string;
  };
  glowColor?: string;
  backdropColor?: string;
  width?: number;
  onContainerClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  initialValue?: string;
  ref?: any;
};

const NeonInput = ({
  border = { activeColor: '#fff', defaultColor: '#444' },
  backdropColor = '#fff',
  glowColor = '#fff',
  width,
  onContainerClick,
  initialValue = '',
  ...props
}: NeonInputProps) => {
  const [isActive, setIsActive] = React.useState(false);

  return (
    <NeonInput.Container width={width} onClick={onContainerClick}>
      <NeonInput.Glow color={glowColor} isActive={isActive} />

      <NeonInput.Backdrop color={backdropColor} isActive={isActive} />

      <NeonInput.Input
        {...props}
        onFocus={(e) => {
          setIsActive(true);
          props.onFocus?.call(null, e);
        }}
        onBlur={(e) => {
          setIsActive(false);
          props.onBlur?.call(null, e);
        }}
        borderColor={
          isActive ? border.activeColor : border.defaultColor
        }
      />
    </NeonInput.Container>
  );
};

NeonInput.Container = styled.div<{
  width?: number;
}>`
  position: relative;
  > * {
    width: ${({ width }) =>
      width ? `${width}px` : '100%'} !important;
  }
`;

NeonInput.Input = styled.input<{ borderColor: string }>`
  background: transparent;
  position: relative;
  display: block;
  outline: none;
  border: 0;
  z-index: 2;

  border-bottom: 2px solid ${({ borderColor }) => borderColor};
  color: #ffffff;
  padding: 4px 0px;
  transition: border-bottom-color 0.5s;
`;

NeonInput.Backdrop = styled.div<{ color: string; isActive: boolean }>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;

  background: radial-gradient(
    ellipse at 0% 100%,
    ${({ color }) => color},
    transparent 70%
  );
  opacity: ${({ isActive }) => (isActive ? 0.7 : 0)};

  transition: opacity 0.5s;
`;

NeonInput.Glow = styled.div<{ color: string; isActive: boolean }>`
  width: 100%;
  height: 10px;
  position: absolute;
  bottom: -1.5px;
  left: 0;
  z-index: 0;

  transform: translateY(100%);

  background: linear-gradient(
    to bottom,
    ${({ color }) => color},
    transparent 30%
  );
  opacity: ${({ isActive }) => (isActive ? 1 : 0)};

  transition: opacity 0.5s;
`;

export { NeonInput };
