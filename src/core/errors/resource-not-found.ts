import { HttpStatusCode } from "../../shared/httpStatusCode.js";
import { AppError } from "./app-error.js";

export class ResourceNotFoundError extends AppError {
  constructor(resource = "Resource") {
    super(`${resource} not found`, HttpStatusCode.NotFound);
  }
}
