import fs from "fs";
import path from "path";
import bunyan from "bunyan";

//
import type { Request } from "express";

const logPath = path.join(__dirname, "/../../logger");
if (!fs.existsSync(logPath)) {
  fs.mkdirSync(logPath);
}

const getLoggerConfig = (env: string): any => {
  return {
    name: "Todo-Application",
    streams: [
      { level: "trace", stream: process.stdout },
      {
        level: "error",
        path: path.join(logPath, `Todo-Application-${env}.error.log`),
      },
      {
        level: "info",
        path: path.join(logPath, "info.log"),
      },
    ],
    serializers: bunyan.stdSerializers,
    src: true,
    msg: `Route: {req.url} - {msg}`,
  };
};

const createLogger = (env: string) => {
  return bunyan.createLogger(getLoggerConfig(env));
};

const log = createLogger("development");
const logError = (req: Request, error: Error) => {
  const routePath = req?.path;
  log.error({ req, routePath }, error);
};

export { log, logError };
