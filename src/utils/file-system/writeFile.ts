import fs from 'fs';

export const writeFileAsync = async (
  path: string,
  data: string
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, {}, (error) => {
      if (error) reject(error);
      else resolve(true);
    });
  });
};
