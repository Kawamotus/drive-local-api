import { describe, it, expect, beforeEach } from "vitest";
import { RegisterUser } from "../../../../src/core/usecases/user/register-user.js";
import { InMemoryUserRepository } from "../../in-memory-user-repository.js";
import { app } from "../../../../src/app.js";
import { ResourceAlreadyExistsError } from "../../../../src/core/errors/resource-already-exists.js";

let repo: InMemoryUserRepository;
let useCase: RegisterUser;
const password = "strongPassword@1234";
const name = "name test";

beforeEach(() => {
  repo = new InMemoryUserRepository();
  useCase = new RegisterUser(repo);
});

describe("register user", () => {
  it("register a user successfully", async () => {
    const user = await useCase.execute({
      email: "email@example.com",
      password,
      name,
    });

    expect(user.id).toBeDefined();
    expect(user.password).not.toBe(password);
  });

  it("fail to register a user, conflict with email", async () => {
    await useCase.execute({
      email: "email@example.com",
      password,
      name,
    });

    await expect(
      useCase.execute({
        email: "email@example.com",
        password,
        name,
      })
    ).rejects.toBeInstanceOf(ResourceAlreadyExistsError);
  });
});
