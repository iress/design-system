import * as fs from 'fs';

export const createGeneratedDir = async () => {
  if (!fs.existsSync('src/generated')) {
    await fs.promises.mkdir('src/generated', { recursive: true });
  }
};
