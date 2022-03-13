export const LOAD_LOCAL_DATA = `@localDataLoader/LOAD_LOCAL_DATA`;

type DLPayload = {
  path: string;
  filter?: RegExp | ((filename: string, idx: number) => void);
};

export const createDataLoaderAction = <T = string>(
  type: T,
  payload: DLPayload
) => {
  const meta = {
    type: LOAD_LOCAL_DATA,
  };

  return {
    type,
    payload,
    meta,
  };
};

export type DLAction = ReturnType<typeof createDataLoaderAction>;
