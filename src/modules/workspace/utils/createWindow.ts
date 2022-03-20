import { IPoint } from '../../../types/IPoint';
import { ISize } from '../../../types/ISize';
import { WindowState, WorkspaceWindow } from '../model';

export const createWindow = (options: {
  id: string;
  size?: ISize;
  location?: IPoint;
  state?: WindowState;
}): WorkspaceWindow => {
  return {
    id: options.id,
    order: -1,
    index: -1,
    state: options.state ?? WindowState.Normal,
    location: options.location ?? { x: 0, y: 0 },
    size: options.size ?? { width: 300, height: 300 },
  };
};
