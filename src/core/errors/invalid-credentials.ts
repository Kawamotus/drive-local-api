import { HttpStatusCode } from "../../shared/httpStatusCode.js";
import { AppError } from "./app-error.js";

export class InvalidCredentialsError extends AppError {
  constructor() {
    super("Invalid credentials", HttpStatusCode.Unauthorized);
  }
}
