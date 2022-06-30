import { Request, Response } from 'express';
import morgan, { FormatFn, TokenIndexer } from 'morgan';
import { RotatingFileStream } from 'rotating-file-stream';

const ytdlLogger = (stream: RotatingFileStream) => {
  const formatFn = (tokens: TokenIndexer, req: Request, res: Response) => {
    return [
      tokens['date'](req, res, 'iso'),
      tokens['remote-addr'](req, res),
      tokens.status(req, res),
      tokens['response-time'](req, res) + ' ms',
      `HTTP/${tokens['http-version'](req, res)}`,
      tokens['user-agent'](req, res),
      req.body.url,
    ].join(' - ');
  };

  return morgan(formatFn as FormatFn, {
    stream,
    skip: (req: Request) => {
      return req.url !== '/dl';
    },
  });
};

const generalLogger = (stream: RotatingFileStream) => {
  const formatFn = (tokens: TokenIndexer, req: Request, res: Response) => {
    return [
      tokens['date'](req, res, 'iso'),
      tokens['remote-addr'](req, res),
      tokens.status(req, res),
      tokens['response-time'](req, res) + ' ms',
      `HTTP/${tokens['http-version'](req, res)}`,
      tokens['url'](req, res),
      tokens['user-agent'](req, res),
    ].join(' - ');
  };

  return morgan(formatFn as FormatFn, { stream });
};

export { ytdlLogger, generalLogger };
