import { z } from "zod";

//
export const paginationDto = z.object({
  page: z
    .preprocess(
      (val) => Number(val),
      z.number({ invalid_type_error: "Page must be a number" }).min(0)
    )
    .optional(),
  pageSize: z
    .preprocess(
      (val) => Number(val),
      z
        .number({ invalid_type_error: "Page Size (limit) must be a number" })
        .min(0, "Can't fetch nothing")
        .max(50, "Let's not fetch more than 100")
    )
    .optional(),
});
