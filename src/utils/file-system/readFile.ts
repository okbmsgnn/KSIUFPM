import fs from 'fs';

export const readFileAsync = (path: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: 'utf-8' }, (error, data) => {
      if (error) reject(error);
      else resolve(data);
    });
  });
};

export const readFilesAsync = (
  files: string[]
): Promise<string[]> => {
  return Promise.all(files.map((file) => readFileAsync(file)));
};
