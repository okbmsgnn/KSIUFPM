export const REMOVE_LOCAL_DATA = `@localDataLoader/REMOVE_LOCAL_DATA`;

type DRPayload = {
  path: string;
};

export const createDataRemoverAction = <
  P extends { [key: string]: any },
  T = string
>(
  type: T,
  payload: DRPayload & P
) => {
  const meta = {
    type: REMOVE_LOCAL_DATA,
  };

  return {
    type,
    payload,
    meta,
  };
};

export type DRAction = ReturnType<typeof createDataRemoverAction>;
