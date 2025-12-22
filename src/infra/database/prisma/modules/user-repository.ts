import { User } from "../../../../core/entities/user.js";
import { UserRepository } from "../../../../core/repositories/user-repository.js";
import { RegisterUserDTO } from "../../../../core/usecases/user/user-dto.js";
import { prisma } from "../prisma.js";

export class PrismaUserRepository implements UserRepository {
  async create(data: RegisterUserDTO): Promise<User> {
    const user = await prisma.user.create({ data });
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findFirst({ where: { email } });
    return user;
  }
}
