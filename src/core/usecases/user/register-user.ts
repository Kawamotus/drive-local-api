import { generateHashPassword } from "../../../shared/bcrypt.js";
import { User } from "../../entities/user.js";
import { UserRepository } from "../../repositories/user-repository.js";
import { RegisterUserDTO } from "./user-dto.js";

export class RegisterUser {
  constructor(private repo: UserRepository) {}

  async execute({ email, password }: RegisterUserDTO): Promise<User> {
    const exists = await this.repo.findByEmail(email);
    if (exists) throw new Error("user already exists");
    const user: User = {
      email,
      password: await generateHashPassword(password),
      id: crypto.randomUUID(),
    };

    return this.repo.create(user);
  }
}
