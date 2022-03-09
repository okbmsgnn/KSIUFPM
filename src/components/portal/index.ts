import React from 'react';
import ReactDOM from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
}

export const Portal = ({ children }: PortalProps) => {
  const container = React.useMemo(() => {
    const element = document.createElement('div');
    element.style.width = element.style.height = '100%';
    element.id = 'portal';
    element.style.position = 'absolute';
    element.style.zIndex = '9999';
    element.style.top = element.style.left = '0';
    return element;
  }, []);

  React.useEffect(() => {
    document.body.appendChild(container);

    return () => {
      document.body.removeChild(container);
    };
  }, [container]);

  return ReactDOM.createPortal(children, container);
};
