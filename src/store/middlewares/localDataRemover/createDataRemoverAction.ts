export const REMOVE_LOCAL_DATA = `@localDataLoader/REMOVE_LOCAL_DATA`;

type DRPayload = {
  path: string;
};

export const createDataRemoverAction = <T = string>(
  type: T,
  payload: DRPayload
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
