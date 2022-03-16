import { WorkspaceWindow } from '../model';

export const indexWindows = (windows: {
  [key: string]: WorkspaceWindow;
}) =>
  Object.values(windows)
    .sort((a, b) => a.order - b.order)
    .reduce<{
      [key: string]: WorkspaceWindow;
    }>((acc, n, idx) => {
      acc[n.id] = { ...n, order: idx };
      return acc;
    }, {});
