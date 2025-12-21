import { FastifyInstance } from "fastify";
import { AuthController } from "./auth.controller.js";

const controller = new AuthController();

export async function authRoutes(app: FastifyInstance) {
  app.post("/register", controller.register);
  app.post("/login", controller.login);
}
