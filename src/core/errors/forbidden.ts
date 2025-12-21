import { HttpStatusCode } from "../../shared/httpStatusCode.js";
import { AppError } from "./app-error.js";

export class ForbiddenError extends AppError {
  constructor() {
    super("Forbidden", HttpStatusCode.Forbidden);
  }
}
