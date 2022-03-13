import fs from 'fs';

export const removeAsync = (path: string) => {
  return new Promise<boolean>((resolve, reject) => {
    fs.rm(path, (error) => {
      if (error) reject(error);
      else resolve(true);
    });
  });
};
