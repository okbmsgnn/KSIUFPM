import React from 'react';
import styled from 'styled-components';
import { useDrag } from '../../hooks/useDrag';
import { IStrictEvent } from './model';

interface SettingsModalProps {
  event: IStrictEvent;
  close: () => void;
}

export const SettingsModal = ({
  close,
  event,
}: SettingsModalProps) => {
  const { location, handle, container, setLocation } = useDrag();

  React.useEffect(() => {
    console.log('mount');
    setLocation({ x: 100, y: 100 });

    return () => console.log('destroy');
  }, []);

  return (
    <SettingsModal.Container
      onDoubleClick={close}
      ref={(value) => (container.current = handle.current = value)}
      style={{ top: location.y, left: location.x }}
    >
      <SettingsModal.Scroller>
        <div
          style={{
            height: '2000px',
            background:
              'linear-gradient(to bottom, #ff00aa, #00aaff)',
          }}
        >
          asdasd
        </div>
      </SettingsModal.Scroller>
    </SettingsModal.Container>
  );
};

SettingsModal.Container = styled.div`
  position: absolute;
  width: 400px;
  height: 500px;
  background: rgba(0, 121, 255, 0.5);
  backdrop-filter: blur(10px);

  color: #ffffff;

  overflow: hidden;
  padding: 10px;
  box-sizing: border-box;
`;

SettingsModal.Scroller = styled.div`
  overflow-y: auto;
  height: 100%;
`;
