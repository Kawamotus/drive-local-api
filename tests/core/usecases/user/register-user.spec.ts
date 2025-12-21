import { describe, it, expect } from "vitest";
import { RegisterUser } from "../../../../src/core/usecases/user/register-user.js";
import { InMemoryUserRepository } from "../../in-memory-user-repository.js";
import { app } from "../../../../src/app.js";

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

describe("Auth Register Validation", () => {
  it("returns 400 if password is too short", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/auth/register",
      payload: {
        email: "test@mail.com",
        password: "123",
      },
    });

    const body = response.json();

    expect(response.statusCode).toBe(400);
    expect(body).toMatchObject({
      statusCode: 400,
      error: true,
    });
  });
});
