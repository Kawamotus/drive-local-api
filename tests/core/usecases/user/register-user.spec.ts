import { describe, it, expect, beforeEach } from "vitest";
import { RegisterUser } from "../../../../src/core/usecases/user/register-user.js";
import { InMemoryUserRepository } from "../../in-memory-user-repository.js";
import { app } from "../../../../src/app.js";
import { ResourceAlreadyExistsError } from "../../../../src/core/errors/resource-already-exists.js";

let repo: InMemoryUserRepository;
let useCase: RegisterUser;
const password = "strongPassword@1234";

beforeEach(() => {
  repo = new InMemoryUserRepository();
  useCase = new RegisterUser(repo);
});

describe("register user", () => {
  it("register a user successfully", async () => {
    const user = await useCase.execute({
      email: "email@example.com",
      password,
    });

    expect(user.id).toBeDefined();
    expect(user.password).not.toBe(password);
  });

  it("fail to register a user, conflict with email", async () => {
    await useCase.execute({
      email: "email@example.com",
      password,
    });

    await expect(
      useCase.execute({
        email: "email@example.com",
        password,
      })
    ).rejects.toBeInstanceOf(ResourceAlreadyExistsError);
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
