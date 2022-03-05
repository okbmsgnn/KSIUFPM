type InferPropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never;
type InferActionCreatorsTypes<
  T extends { [key: string]: (...args: any[]) => any }
> = ReturnType<InferPropertiesTypes<T>>;

export type { InferActionCreatorsTypes };
