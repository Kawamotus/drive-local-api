import { FastifyReply, FastifyRequest } from "fastify";
import { InMemoryUserRepository } from "../../../../tests/core/in-memory-user-repository";
import {
  LoginDTO,
  RegisterUserDTO,
} from "../../../core/usecases/user/user-dto";
import { RegisterUser } from "../../../core/usecases/user/register-user";
import { HttpStatusCode } from "../../../shared/httpStatusCode";
import { LoginUser } from "../../../core/usecases/user/login-user";
import { genericReply } from "../../../shared/reply";

const repo = new InMemoryUserRepository(); // alterar pro repo do banco

export class AuthController {
  async register(
    request: FastifyRequest<{ Body: RegisterUserDTO }>,
    reply: FastifyReply
  ) {
    const useCase = new RegisterUser(repo);
    const user = await useCase.execute(request.body);

    delete user.password;

    genericReply(reply, HttpStatusCode.Created, user, null);
  }

  async login(
    request: FastifyRequest<{ Body: LoginDTO }>,
    reply: FastifyReply
  ) {
    const useCase = new LoginUser(repo);
    const user = await useCase.execute(request.body);
    delete user.password;

    const token = request.server.jwt.sign(user);

    genericReply(reply, HttpStatusCode.Ok, user, null);
  }
}
