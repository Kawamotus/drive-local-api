import { FastifyInstance } from "fastify";
import { AuthController } from "./auth.controller";

const controller = new AuthController();

export async function routes(app: FastifyInstance) {
  app.post("/register", controller.register);
  app.post("/login", controller.login);
}
