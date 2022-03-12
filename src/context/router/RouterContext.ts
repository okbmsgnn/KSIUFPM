import React from 'react';

export interface RouterContextProps {
  location: string;
  redirectTo: (location: string) => void;
}

export const RouterContext = React.createContext<
  RouterContextProps | undefined
>(undefined);
