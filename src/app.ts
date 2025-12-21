import fastify from "fastify";
import jwt from "@fastify/jwt";
import multipart from "@fastify/multipart";
import { env } from "./config/env.js";
import { authRoutes } from "./infra/http/auth/auth.routes.js";

const app = fastify({ logger: true });

app.register(jwt, { secret: env.JWT_SECRET });
app.register(multipart);

app.register(authRoutes, { prefix: "/auth" });

export { app };
