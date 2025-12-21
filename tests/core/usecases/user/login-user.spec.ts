import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryUserRepository } from "../../in-memory-user-repository.js";
import { RegisterUser } from "../../../../src/core/usecases/user/register-user.js";
import { LoginUser } from "../../../../src/core/usecases/user/login-user.js";
import { InvalidCredentialsError } from "../../../../src/core/errors/invalid-credentials.js";

let repo: InMemoryUserRepository;
let register: RegisterUser;
let login: LoginUser;

beforeEach(() => {
  repo = new InMemoryUserRepository();
  register = new RegisterUser(repo);
  login = new LoginUser(repo);
});

describe("LoginUser", () => {
  it("logs in with valid credentials", async () => {
    await register.execute({
      email: "test@mail.com",
      password: "123456",
    });

    const user = await login.execute({
      email: "test@mail.com",
      password: "123456",
    });

    expect(user).toBeDefined();
  });

  it("throws InvalidCredentialsError for wrong password", async () => {
    await register.execute({
      email: "test@mail.com",
      password: "123456",
    });

    await expect(
      login.execute({
        email: "test@mail.com",
        password: "wrong",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
