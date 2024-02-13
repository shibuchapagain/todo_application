import type { Response } from "express";

//
export type Codes = 400 | 401 | 403 | 404 | 500;

/**
 * Pagination types
 */
export interface Pagination {
  count: number;
  total?: number;
  page: number;
}

/**
 * Error props types
 */
export type ErrorProps = {
  code: Codes;
  res: Response;
  message?: string;
};

/**
 * Success props types
 */
export type SuccessProps = {
  data: {} | any[];
  message: string;
  res: Response;
  pagination?: Pagination;
};

/**
 * Interface for Custom Error
 */
export interface CustomError extends Error {
  code: number;
  errors: string | { [key: string]: string };
}
