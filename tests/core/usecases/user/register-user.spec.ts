import { describe, it, expect } from "vitest";
import { RegisterUser } from "../../../../src/core/usecases/user/register-user";
import { InMemoryUserRepository } from "../../in-memory-user-repository";

describe("register user", () => {
  it("register a user", async () => {
    const repo = new InMemoryUserRepository();
    const useCase = new RegisterUser(repo);

    const password = "strongPassword@1234";

    const user = await useCase.execute({
      email: "email@example.com",
      password,
    });

    expect(user.id).toBeDefined();
    expect(user.password).not.toBe(password);
  });
});
