import { z } from "zod";

const isDateValid = (value: string): boolean => {
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  return regex.test(value);
};

const isTimeValid = (value: string): boolean => {
  const regex = /^(0[1-9]|1[0-2]):[0-5][0-9]:[APMapm]{2}$/;
  return regex.test(value);
};

export const CreateTodoDto = z
  .object({
    name: z.string({
      invalid_type_error: "Title must be a string",
      required_error: "Title is required",
    }),
    description: z.string({
      invalid_type_error: "Description must be a string",
      required_error: "Description is required",
    }),
    date: z
      .string({
        invalid_type_error: "Date must be a string",
        required_error: "Date is required",
      })
      .refine(isDateValid, {
        message: "Invalid date format. Please use dd/mm/yyyy.",
      }),
    time: z
      .string({
        invalid_type_error: "Time must be a string",
        required_error: "Time is required",
      })
      .refine(isTimeValid, {
        message: "Invalid time format. Please use hh:mm:AM/PM.",
      }),
  })
  .strip();

export type TCreateTodoDto = z.infer<typeof CreateTodoDto>;
