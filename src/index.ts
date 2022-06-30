import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import path from 'path';

import cors from './middlewares/cors';
import router from './routes';
import { createLogFolder, getWriteStream } from './utils/log';
import { generalLogger, ytdlLogger } from './middlewares/logger';

dotenv.config({
  path: path.join(__dirname, '..', '.env'),
});

const PORT = process.env.PORT || 3000;
const app: Express = express();

createLogFolder();
const serverLogStream = getWriteStream('server');
const ytdlLogStream = getWriteStream('ytdl');

app.use(generalLogger(serverLogStream));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(express.json());

app.use('/api', ytdlLogger(ytdlLogStream), cors, router);
app.get('/healthcheck', (req: Request, res: Response) => {
  res.status(200).send('OK');
});

app.listen(PORT, () => {
  console.log(
    `Server is running on 'http://127.0.0.1:${PORT}' (or 'http://localhost:${PORT}')`
  );
});
