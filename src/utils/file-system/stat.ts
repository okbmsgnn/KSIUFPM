import fs from 'fs';

export const stat = (path: string) => {
  return new Promise<fs.Stats>((resolve, reject) => {
    fs.stat(path, (error, stats) => {
      if (error) reject(error);
      else resolve(stats);
    });
  });
};
