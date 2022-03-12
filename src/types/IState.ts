import { store } from '../store';

export type IState = ReturnType<typeof store.getState>;
