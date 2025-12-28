import { describe, it, expect, beforeEach } from "vitest";
import { app } from "../../src/app.js";
import { HttpStatusCode } from "../../src/shared/httpStatusCode.js";
import { prisma } from "../../src/infra/database/prisma/prisma.js";

const name = "test user";

beforeEach(async () => {
  await prisma.user.deleteMany({});
});

describe("Auth Register", () => {
  it("returns 201 when create user successfully", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/auth/register",
      payload: {
        email: "new_user@mail.com",
        password: "123456",
        name,
      },
    });

    const body = response.json();

    expect(response.statusCode).toBe(HttpStatusCode.Created);
    expect(body.message).toBe(null);
    expect(body.message).not.toBe("User already exists");
  });

  it("returns 400 if password is too short", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/auth/register",
      payload: {
        email: "test@mail.com",
        password: "123",
        name,
      },
    });

    const body = response.json();

    expect(response.statusCode).toBe(HttpStatusCode.BadRequest);
    expect(body).toMatchObject({
      statusCode: 400,
      error: true,
    });
  });

  it("returns 400 for invalid email", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/auth/register",
      payload: {
        email: "invalid",
        password: "123456",
        name,
      },
    });

    const body = response.json();

    expect(response.statusCode).toBe(HttpStatusCode.BadRequest);
    expect(body).toMatchObject({
      statusCode: 400,
      error: true,
    });
  });

  it("returns 409 when user already exists", async () => {
    await app.inject({
      method: "POST",
      url: "/auth/register",
      payload: {
        email: "test@mail.com",
        password: "123456",
        name,
      },
    });

    const response = await app.inject({
      method: "POST",
      url: "/auth/register",
      payload: {
        email: "test@mail.com",
        password: "123456",
        name,
      },
    });

    const body = response.json();

    expect(response.statusCode).toBe(HttpStatusCode.Conflict);
    expect(body.message).toBe("User already exists");
  });

  it("returns 500 with standard body on unexpected error", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/auth/login",
      payload: {},
    });

    const body = response.json();

    expect(body).toHaveProperty("statusCode");
    expect(body).toHaveProperty("error", true);
  });
});
