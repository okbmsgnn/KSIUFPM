export const LOAD_LOCAL_DATA = `@localDataLoader/LOAD_LOCAL_DATA`;

type LDPayload = {
  path: string;
  filter?: RegExp | ((filename: string, idx: number) => void);
};

export const createLDAction = <T = string>(
  type: T,
  payload: LDPayload
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

export type LDAction = ReturnType<typeof createLDAction>;
