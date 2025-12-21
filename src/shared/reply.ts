import { FastifyReply } from "fastify";

export const genericReply = <T>(
  reply: FastifyReply,
  statusCode: number,
  data: T,
  message: string | null,
  error: string | null = null
) => {
  return reply.code(statusCode).send({ statusCode, data, message, error });
};
