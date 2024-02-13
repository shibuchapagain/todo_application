import { z } from "zod";

//
import { paginationDto } from "../../../utils/pagination.dto";

//
const filterFields = ["done", "upcoming"] as const;

//
export const todoListDto = paginationDto
  .extend({
    status: z
      .enum(filterFields, {
        errorMap: () => ({
          message: `Must be one of '${filterFields.join("', '")}'`,
        }),
      })
      .optional(),
  })
  .strip();

//
export type TTodoListDto = z.infer<typeof todoListDto>;
