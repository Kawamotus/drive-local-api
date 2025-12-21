import { InvalidCredentialsError } from "../../errors/invalid-credentials.js";
import { ResourceNotFoundError } from "../../errors/resource-not-found.js";
import { UserRepository } from "../../repositories/user-repository.js";
import { LoginDTO } from "./user-dto.js";
import * as bcrypt from "bcrypt";

export class LoginUser {
  constructor(private repo: UserRepository) {}

  async execute({ email, password }: LoginDTO) {
    const user = await this.repo.findByEmail(email);
    if (!user) throw new InvalidCredentialsError();
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new InvalidCredentialsError();

    return user;
  }
}
