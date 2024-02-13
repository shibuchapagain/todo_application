import type { Response } from "express";

//
import type { Codes, ErrorProps, SuccessProps } from "../types";

/**
 * Send Success Response
 */
export function sendSuccessResponse({
  data,
  message,
  res,
  pagination,
}: SuccessProps): Response {
  return res.status(200).json({
    success: true,
    message: message ?? "Api operation successfully executed",
    data,
    ...pagination,
  });
}

export function throwError(code: Codes, message?: string): never {
  const error: ErrorProps = {
    code,
    message,
    res: {} as Response,
  };
  throw error;
}
