import React from 'react';
import styled from 'styled-components';

type ColorPickerProps = JSX.IntrinsicElements['input'] & {
  size?: number;
  value?: string;
};

export const ColorPicker = ({
  size = 40,
  ...props
}: ColorPickerProps) => {
  const [color, setColor] = React.useState(props.value ?? '#ffffff');

  React.useEffect(
    () => setColor(props.value ?? '#ffffff'),
    [props.value]
  );

  return (
    <ColorPicker.Container
      style={{
        background: color,
      }}
      size={size}
    >
      <input
        {...props}
        type="color"
        onChange={(e) => {
          setColor(e.target.value);
          props.onChange?.call(null, e);
        }}
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
