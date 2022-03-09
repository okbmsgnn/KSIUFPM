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
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  initialValue?: string;
  textAlign?: 'left' | 'center' | 'right';
}

const NeonInput = ({
  border = { activeColor: '#fff', defaultColor: '#444' },
  backdropColor = '#fff',
  glowColor = '#fff',
  placeholder = '',
  width,
  onClick,
  initialValue = '',
  textAlign = 'left',
  ...props
}: NeonInputProps) => {
  const [isActive, setIsActive] = React.useState(false);
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => setValue(initialValue), [initialValue]);

  return (
    <NeonInput.Container
      {...props}
      width={width}
      onClick={onClick}
      textAlign={textAlign}
    >
      <NeonInput.Glow color={glowColor} isActive={isActive} />
      <NeonInput.Backdrop color={backdropColor} isActive={isActive} />
      <NeonInput.Input
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        borderColor={
          isActive ? border.activeColor : border.defaultColor
        }
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </NeonInput.Container>
  );
};

interface InputProps {
  borderColor: string;
}

NeonInput.Container = styled.div<{
  width?: number;
  textAlign: string;
}>`
  position: relative;
  > * {
    width: ${({ width }) =>
      width ? `${width}px` : '100%'} !important;
  }

  input {
    text-align: ${({ textAlign }) => textAlign};
  }
`;

NeonInput.Input = styled.input<InputProps>`
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
