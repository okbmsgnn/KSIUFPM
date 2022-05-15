import React from 'react';
import styled from 'styled-components';
import { useClickOutside } from '../../hooks/useClickOutside';
import { IPoint } from '../../types/IPoint';
import { Portal } from '../portal';
import { ContextMenuItem } from './model';

interface ContextMenuProps {
  items: ContextMenuItem[];
  location?: IPoint;
  children: (
    ref: React.MutableRefObject<HTMLElement | null>,
    open: () => void,
    close: () => void
  ) => React.ReactNode;
}

export const ContextMenu = ({
  items,
  location,
  children,
}: ContextMenuProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLElement | null>(null);
  const contextRef = React.useRef<HTMLElement | null>(null);

  const onOpen = React.useCallback(() => {
    setIsOpen(true);
  }, []);

  const menuLocation = React.useMemo(() => {
    if (location) return location;
    if (containerRef.current) {
      const boundingRect =
        containerRef.current.getBoundingClientRect();
      return {
        x: boundingRect.left + boundingRect.width / 2,
        y: boundingRect.top + boundingRect.height / 2,
      };
    }

    return { x: 0, y: 0 };
  }, [isOpen]);

  useClickOutside(contextRef, () => setIsOpen(false));

  return (
    <>
      {children(containerRef, onOpen, () => setIsOpen(false))}

      {isOpen && (
        <Portal>
          <ContextMenu.Container
            location={menuLocation}
            ref={(value) => (contextRef.current = value)}
          >
            {items.map((item) => (
              <div
                onClick={() => {
                  setIsOpen(false);
                  item.action();
                }}
              >
                {item.displayName}
              </div>
            ))}
          </ContextMenu.Container>
        </Portal>
      )}
    </>
  );
};

ContextMenu.Container = styled.div<{ location: IPoint }>`
  padding: 20px;
  position: absolute;
  top: ${({ location }) => location.y}px;
  left: ${({ location }) => location.x}px;

  background: black;
  color: #fff;
`;
