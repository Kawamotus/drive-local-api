import { ZodTypeAny } from "zod";
import { ValidationError } from "../../../core/errors/validation.js";

export function validateBody(schema: ZodTypeAny) {
  return async (req: any) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const message = result.error.issues
        .map((issue) => issue.message)
        .join(", ");

      throw new ValidationError(message);
    }

    req.body = result.data;
  };
}
