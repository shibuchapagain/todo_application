import { ZodError } from "zod";

//
import type { ZodTypeAny } from "zod";

//
import type { Request, Response, NextFunction } from "express";

/**
 * Validate request body against the provided schema in the
 */
const bodyValidator =
  (schema: ZodTypeAny) =>
  (
    req: Request<unknown, unknown, unknown, unknown>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = schema.parse(req.body);
      req.body = data;

      //
      next();
      return;
    } catch (error) {
      const errorObj =
        error instanceof ZodError ? error.flatten().fieldErrors : {};

      //
      res.status(422).json({
        success: false,
        message: "Validation error!",
        errors: errorObj,
      });
      return;
    }
  };

export default bodyValidator;
