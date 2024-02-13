import { z } from "zod";

/**
 * Todo param
 */
export const TodoParamDto = z.object({
  todoId: z.preprocess(
    (val) => String(val),
    z.string({
      required_error: "Todo ID is required",
      invalid_type_error: "Todo ID must be a String",
    })
  ),
});

//
export type TPostParamDto = z.infer<typeof TodoParamDto>;
