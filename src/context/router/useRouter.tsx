import React from 'react';
import { RouterContext } from './RouterContext';

export const useRouter = () => {
  const router = React.useContext(RouterContext);

  if (router === undefined)
    throw new Error(
      'RouterContext should be used within a RouterContextProvider!'
    );

  return router;
};
