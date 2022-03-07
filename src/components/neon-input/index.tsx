import React from 'react';
import styled from 'styled-components';

interface NeonInputProps {
  border?: {
    activeColor: string;
    defaultColor: string;
  };
  glowColor?: string;
  backdropColor?: string;
  placeholder?: string;
  width?: number;
}

const NeonInput = ({
  border = { activeColor: '#fff', defaultColor: '#444' },
  backdropColor = '#fff',
  glowColor = '#fff',
  placeholder = '',
  width,
  ...props
}: NeonInputProps) => {
  const [isActive, setIsActive] = React.useState(false);

  const inputRef = React.useRef<HTMLInputElement | null>(null);

  return (
    <NeonInput.Container {...props}>
      <NeonInput.Glow color={glowColor} isActive={isActive} />
      <NeonInput.Backdrop color={backdropColor} isActive={isActive} />
      <NeonInput.Input
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        ref={inputRef}
        borderColor={
          isActive ? border.activeColor : border.defaultColor
        }
        placeholder={placeholder}
        width={width}
      />
    </NeonInput.Container>
  );
};

interface InputProps {
  borderColor: string;
}

NeonInput.Container = styled.div`
  position: relative;
  display: inline-block;
`;

NeonInput.Input = styled.input<InputProps>`
  background: transparent;
  position: relative;
  display: block;
  outline: none;
  border: 0;
  z-index: 2;
  width: ${({ width }) => width}px;

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
