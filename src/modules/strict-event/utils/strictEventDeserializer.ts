import { IStrictEvent } from '../model';

export const strictEventDeserializer = (
  filename: string,
  data: string
): IStrictEvent => {
  const strictEvents = JSON.parse(data);

  return strictEvents.map((e: any) => ({
    ...e,
    date: new Date(e.date),
  }));
};
