import { FastifyReply, FastifyRequest } from "fastify";
import { InMemoryUserRepository } from "../../../../tests/core/in-memory-user-repository.js";
import {
  LoginDTO,
  RegisterUserDTO,
} from "../../../core/usecases/user/user-dto.js";
import { RegisterUser } from "../../../core/usecases/user/register-user.js";
import { HttpStatusCode } from "../../../shared/httpStatusCode.js";
import { LoginUser } from "../../../core/usecases/user/login-user.js";
import { genericReply } from "../../../shared/reply.js";

const repo = new InMemoryUserRepository(); // alterar pro repo do banco

export class AuthController {
  async register(
    request: FastifyRequest<{ Body: RegisterUserDTO }>,
    reply: FastifyReply
  ) {
    const useCase = new RegisterUser(repo);
    const user = await useCase.execute(request.body);

    genericReply(
      reply,
      HttpStatusCode.Created,
      { ...user, password: null },
      null
    );
  }

  async login(
    request: FastifyRequest<{ Body: LoginDTO }>,
    reply: FastifyReply
  ) {
    const useCase = new LoginUser(repo);
    const user = await useCase.execute(request.body);

    const token = request.server.jwt.sign({ ...user, password: null });

    genericReply(reply, HttpStatusCode.Ok, token, null);
  }
}
