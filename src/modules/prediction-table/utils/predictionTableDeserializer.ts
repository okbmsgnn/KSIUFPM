import { PredictionTable } from '../model';

export const predictionTableDeserializer = (
  filename: string,
  data: string
): PredictionTable => {
  const table = JSON.parse(data);

  return {
    ...table,
    localName: filename,
    startDate: table.startDate ? new Date(table.startDate) : null,
    endDate: table.endDate ? new Date(table.endDate) : null,
    createdAt: new Date(table.createdAt),
  };
};
