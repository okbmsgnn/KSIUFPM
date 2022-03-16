import React from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useRouter } from '../../context/router';
import { getPredictionTables } from '../prediction-table/predictionTableReducer';

export const Workspace = () => {
  const router = useRouter();
  const tables = useSelector(getPredictionTables);

  const openTables = [
    '3cf14dd2-34b3-46fc-a8fd-68e4130fccc4',
    'd7587a71-4ac4-41a7-b4bb-9e821cd1592d',
  ].map((id) => tables.find((table) => table.id === id));

  React.useEffect(() => {
    toast.success(router.location);
  }, []);

  return (
    <pre onClick={() => router.redirectTo('/new-project')}>
      {openTables.map((t) => (
        <div>{JSON.stringify(t, null, 4)}</div>
      ))}
    </pre>
  );
};
