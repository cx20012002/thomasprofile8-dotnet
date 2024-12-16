import { ZodIssue } from "zod";

export type ActionResult<T> =
  | {
      status: "success";
      data: T;
    }
  | {
      status: "error";
      error: string | ZodIssue[];
    };
