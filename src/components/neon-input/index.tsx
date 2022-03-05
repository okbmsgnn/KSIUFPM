import React from 'react'
import styled from 'styled-components';

interface NeonInputProps {
  border?: {
    activeColor: string;
    defaultColor: string;
  };
  glowColor?: string;
  backdropColor?: string;
}

const NeonInput = ({
  border = {activeColor: '#fff', defaultColor: '#444'},
  backdropColor = '#fff',
  glowColor = '#fff',
  ...props
}: NeonInputProps) => {
  const [isActive, setIsActive] = React.useState(false)

  const inputRef = React.useRef<HTMLInputElement | null>(null)

  return <NeonInput.Container {...props}>
    <NeonInput.Input 
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
      ref={inputRef}
      borderColor={isActive ? border.activeColor : border.defaultColor}
    />

    <NeonInput.Glow color={glowColor} isActive={isActive} />
    <NeonInput.Backdrop color={backdropColor} isActive={isActive}/>
  </NeonInput.Container>
}

interface InputProps {
  borderColor: string;
}

NeonInput.Container = styled.div`
  position: relative;
  display: inline-block;
`

NeonInput.Input = styled.input<InputProps>`
  background: transparent;
  display: block;
  outline: none;
  border: 0;

  border-bottom: 2px solid ${({borderColor}) => borderColor};
  color: #ffffff;
  padding: 4px 2px;
  transition: border-bottom-color 0.5s;
`

NeonInput.Backdrop = styled.div<{color: string; isActive: boolean;}>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;

  background: radial-gradient(ellipse at 0% 100%, ${({color}) => color}, transparent 70%);;
  opacity: ${({isActive}) => isActive ? 1 : 0};

  transition: opacity 0.5s;
`

NeonInput.Glow = styled.div<{color: string; isActive: boolean;}>`
  width: 100%;
  height: 10px;
  position: absolute;
  bottom: -1.5px;
  left: 0;
  z-index: -1;

  transform: translateY(100%);

  background: linear-gradient(to bottom, ${({color}) => color}, transparent 30%);
  opacity: ${({isActive}) => isActive ? 1 : 0};

  transition: opacity 0.5s;
`

export { NeonInput }