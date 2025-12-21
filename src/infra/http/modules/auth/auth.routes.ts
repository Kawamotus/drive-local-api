import { FastifyInstance } from "fastify";
import { AuthController } from "./auth.controller.js";
import { validateBody } from "../../validators/zod.js";
import { loginSchema, registerSchema } from "../../schemas/auth.schemas.js";

const controller = new AuthController();

export async function authRoutes(app: FastifyInstance) {
  app.post(
    "/register",
    { preHandler: validateBody(registerSchema) },
    controller.register
  );
  app.post(
    "/login",
    { preHandler: validateBody(loginSchema) },
    controller.login
  );
}
