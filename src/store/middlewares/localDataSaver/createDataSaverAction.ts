export const SAVE_LOCAL_DATA = `@localDataLoader/SAVE_LOCAL_DATA`;

type DSPayload<P> = {
  path: string;
  data: P;
};

export const createDataSaverAction = <T = string, P = any>(
  type: T,
  payload: DSPayload<P>
) => {
  const meta = {
    type: SAVE_LOCAL_DATA,
  };

  return {
    type,
    payload,
    meta,
  };
};

export type DSAction = ReturnType<typeof createDataSaverAction>;
