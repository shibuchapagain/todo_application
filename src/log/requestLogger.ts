import { log } from "./index";

//
import { Request, Response, NextFunction } from "express";

export const requestLoggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  log.info(
    { URL: req.url, method: req.method },
    `Request: ${req.method} ${req.url}`
  );
  next();
};
