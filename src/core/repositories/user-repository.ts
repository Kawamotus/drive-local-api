import { User } from "../entities/user.js";
import { RegisterUserDTO } from "../usecases/user/user-dto.js";

export interface UserRepository {
  create(user: RegisterUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}
