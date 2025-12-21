import { HttpStatusCode } from "../../shared/httpStatusCode.js";
import { AppError } from "./app-error.js";

export class ResourceAlreadyExistsError extends AppError {
  constructor(resource = "Resource") {
    super(`${resource} already exists`, HttpStatusCode.Conflict);
  }
}
