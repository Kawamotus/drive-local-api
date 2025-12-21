import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "../../../core/errors/app-error.js";
import { genericReply } from "../../../shared/reply.js";

export function errorHandler(
  error: FastifyError | Error,
  request: FastifyRequest,
  reply: FastifyReply
) {
  if (error instanceof AppError) {
    return genericReply(reply, error.statusCode, null, error.message, true);
  }

  if ((error as FastifyError).statusCode) {
    return genericReply(
      reply,
      (error as FastifyError).statusCode!,
      null,
      error.message,
      true
    );
  }

  request.log.error(error);

  return genericReply(reply, 500, null, "Internal server error", true);
}
