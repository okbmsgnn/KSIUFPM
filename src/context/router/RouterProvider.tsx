import React from 'react';
import { RouterContext, RouterContextProps } from './RouterContext';

interface RouterProviderProps {
  children: React.ReactNode;
  initialLocation?: string;
}

export const RouterProvider = ({
  children,
  initialLocation = '/',
}: RouterProviderProps) => {
  const [location, setLocation] = React.useState('');

  const redirectTo = React.useCallback((location: string) => {
    const subPaths = location.split('/').filter((sp) => !!sp.trim());
    const path = '/' + subPaths.join('/');

    setLocation(path);
  }, []);

  React.useEffect(() => redirectTo(initialLocation), []);

  const context = React.useMemo<RouterContextProps>(
    () => ({
      location,
      redirectTo,
    }),
    [location, redirectTo]
  );

  return (
    <RouterContext.Provider value={context}>
      {children}
    </RouterContext.Provider>
  );
};
