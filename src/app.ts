import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";

//
import type { NextFunction, Request, Response } from "express";

//
require("./config/database");

//
import appRouter from "./router";
import { app, httpServer } from "./server";

//
import { log } from "./log";
import { requestLoggerMiddleware } from "./log/requestLogger";

//
import { CustomError } from "./utils/types";

//
dotenv.config();

// LOG Middleware
app.use(requestLoggerMiddleware);

// Other middleware and configurations
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.options("*", cors());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.use("/api", appRouter);

// Error Handler
app.use(
  (error: CustomError, _req: Request, res: Response, _next: NextFunction) => {
    const errorStatus = error?.code ?? 500;
    const errorObject = error?.errors ?? undefined;

    //
    log.error(error);

    //
    return res.status(errorStatus).json({
      success: false,
      message: error.message ?? "Internal server error.",
      ...(errorObject ? { errors: errorObject } : {}),
    });
  }
);

//
const PORT = process.env.PORT ?? 3000;

//
httpServer.listen(PORT, async () => {
  log.info(`Server is running on port: ${PORT}`);
  console.log(`Server running at http://localhost:`, PORT);
});
