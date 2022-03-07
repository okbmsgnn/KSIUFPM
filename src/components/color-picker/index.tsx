import React from 'react';
import styled from 'styled-components';

interface ColorPickerProps {
  defaultColor?: string;
  size?: number;
}

export const ColorPicker = ({
  defaultColor,
  size = 40,
}: ColorPickerProps) => {
  const [color, setColor] = React.useState(defaultColor ?? '#ffffff');

  React.useEffect(
    () => setColor(defaultColor ?? '#ffffff'),
    [defaultColor]
  );

  return (
    <ColorPicker.Container
      htmlFor="color-picker"
      color={color}
      style={{
        background: color,
      }}
      size={size}
    >
      <input
        type="color"
        id="color-picker"
        onChange={(e) => setColor(e.target.value)}
        value={color}
      />
    </ColorPicker.Container>
  );
};

ColorPicker.Container = styled.label<{ size: number }>`
  position: relative;
  display: block;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
  border: 2px solid #ffffff;

  input {
    visibility: hidden;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 1px;
    height: 1px;
    z-index: -1;
  }
`;
