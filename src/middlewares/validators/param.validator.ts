import { ZodError } from "zod";

//
import type { ZodTypeAny } from "zod";

//
import type { Request, Response, NextFunction } from "express";

/**
 * Validate request params against the provided schema in the
 */
const paramValidator =
  (schema: ZodTypeAny) =>
  (
    req: Request<unknown, unknown, unknown, unknown>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = schema.parse(req.params);
      req.params = data;

      next();
      return;
    } catch (error) {
      const errorObj =
        error instanceof ZodError ? error.flatten().fieldErrors : {};

      res.status(422).json({
        success: false,
        message: "Validation error!",
        errors: errorObj,
      });
      return;
    }
  };

export default paramValidator;
