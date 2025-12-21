import { FastifyRequest } from "fastify";
import { UnauthorizedError } from "../../../core/errors/unauthorized.js";

export async function authenticate(req: FastifyRequest) {
  try {
    await req.jwtVerify();
  } catch {
    throw new UnauthorizedError();
  }
}
