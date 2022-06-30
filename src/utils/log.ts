import { existsSync, mkdirSync } from 'fs';
import path from 'path';

import { createStream } from 'rotating-file-stream';

const logFolderPath = path.join(__dirname, '..', '..', 'logs');
const createLogFolder = () => {
  if (!existsSync(logFolderPath)) {
    console.log('Log path does not exists. Creating one now.');
    mkdirSync(logFolderPath, { recursive: true });
  }
};

const getWriteStream = (name: string) => {
  return createStream(`${name}.log`, {
    size: '10M',
    path: logFolderPath,
  });
};

export { createLogFolder, getWriteStream };
