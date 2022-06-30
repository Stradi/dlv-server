import { NextFunction, Request, Response } from "express";

const cors = (req: Request, res: Response, next: NextFunction) => {
  const whitelist = [
    `https://${process.env.HOSTNAME}`,
    `https://www.${process.env.HOSTNAME}`,
  ];

  if (!req.headers.origin || whitelist.indexOf(req.headers.origin) === -1) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.status(403).send("Stay away from my API stranger!");
  } else {
    next();
  }
};

export default cors;
