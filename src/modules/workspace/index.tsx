import React from 'react';
import { toast } from 'react-toastify';
import { useRouter } from '../../context/router';

export const Workspace = () => {
  const router = useRouter();

  React.useEffect(() => {
    toast.success(router.location);
  }, []);

  return (
    <div onClick={() => router.redirectTo('/new-project')}>HELLO</div>
  );
};
