import { HttpStatusCode } from "../../shared/httpStatusCode.js";
import { AppError } from "./app-error.js";

export class UnauthorizedError extends AppError {
  constructor() {
    super("Unauthorized", HttpStatusCode.Unauthorized);
  }
}
