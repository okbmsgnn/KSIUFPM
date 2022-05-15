export const LOAD_LOCAL_DATA = `@localDataLoader/LOAD_LOCAL_DATA`;

type DLPayload = {
  path: string;
  filter?: RegExp | ((filename: string, idx: number) => void);
  deserialize?: (filename: string, data: string) => any;
};

export const createDataLoaderAction = <T = string>(
  type: T,
  payload: DLPayload,
  metaPayload?: any
) => {
  const meta = {
    type: LOAD_LOCAL_DATA,
    payload: metaPayload,
  };

  return {
    type,
    payload,
    meta,
  };
};

export type DLAction = ReturnType<typeof createDataLoaderAction>;
