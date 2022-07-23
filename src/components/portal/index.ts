import React from 'react';
import ReactDOM from 'react-dom';
import { v4 as uuid } from 'uuid';

interface PortalProps {
  children: React.ReactNode;
  blocking?: boolean;
  prevent?: (keyof HTMLElementEventMap)[];
}

export const Portal = ({
  blocking = false,
  children,
  prevent = [],
}: PortalProps) => {
  const container = React.useMemo(() => {
    const element = document.createElement('div');
    if (blocking) element.style.width = element.style.height = '100%';
    element.id = 'portal_' + uuid();
    element.style.position = 'absolute';
    element.style.zIndex = '9999';
    element.style.top = element.style.left = '0';

    prevent.forEach((p) => {
      element.addEventListener(p, (event) =>
        event.stopImmediatePropagation()
      );
    });

    return element;
  }, [blocking, prevent]);

  React.useEffect(() => {
    document.body.appendChild(container);

    return () => {
      document.body.removeChild(container);
    };
  }, [container]);

  return ReactDOM.createPortal(children, container);
};
