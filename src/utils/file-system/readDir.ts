import fs from 'fs';

export const readDirAsync = (path: string) => {
  return new Promise<string[]>((resolve, reject) => {
    fs.readdir(path, (error, files) => {
      if (error) reject(error);
      else resolve(files);
    });
  });
};
