import React from 'react';
import styled from 'styled-components';
import { Portal } from '../../components/portal';
import { useStrictEvent } from './hooks/useStrictEvent';
import { IStrictEvent } from './model';
import { SettingsModal } from './SettingsModal';

interface StrictEventProps {
  event: IStrictEvent;
}

const StrictEvent = ({ event }: StrictEventProps) => {
  const strictEvent = useStrictEvent({ tableId: event.tableId });
  const isEditing = React.useMemo(
    () => strictEvent.isEditing(event.id),
    [event.id, strictEvent.isEditing]
  );

  return (
    <StrictEvent.Container>
      {isEditing && (
        <Portal prevent={['mousedown', 'wheel']}>
          <SettingsModal
            close={() => strictEvent.stopEditing(event.id)}
            event={event}
          />
        </Portal>
      )}
    </StrictEvent.Container>
  );
};

StrictEvent.Container = styled.div`
  background: #a1a1a1;
  border: 2px solid #565656;

  :after {
    content: '';
    width: 84%;
    height: 84%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #b0f4ff55;
    z-index: 2;
    transition: 0.4s;
  }

  :hover:after {
    background: #c1f5ffff;
    transition: 0.4s;
  }
`;

export default React.memo(StrictEvent);
