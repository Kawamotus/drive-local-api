import { HttpStatusCode } from "../../shared/httpStatusCode.js";
import { AppError } from "./app-error.js";

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, HttpStatusCode.BadRequest);
  }
}
