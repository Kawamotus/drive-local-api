import "@fastify/jwt";
import { User } from "../core/entities/user.ts";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: User;
  }
}
