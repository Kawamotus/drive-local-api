import fastify from "fastify";
import jwt from "@fastify/jwt";
import multipart from "@fastify/multipart";
import { env } from "./config/env.js";
import { authRoutes } from "./infra/http/modules/auth/auth.routes.js";
import { errorHandler } from "./infra/http/errors/error-handler.js";

const app = fastify({ logger: true });

app.register(jwt, { secret: env.JWT_SECRET });
app.register(multipart);
app.setErrorHandler(errorHandler);

app.register(authRoutes, { prefix: "/auth" });

export { app };
