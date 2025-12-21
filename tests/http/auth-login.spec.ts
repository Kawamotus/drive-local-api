import { describe, it, expect } from "vitest";
import { app } from "../../src/app.js";
import { HttpStatusCode } from "../../src/shared/httpStatusCode.js";

describe("POST /auth/login", () => {
  it("logs in successfully", async () => {
    await app.inject({
      method: "POST",
      url: "/auth/register",
      payload: {
        email: "login@mail.com",
        password: "123456",
      },
    });

    const response = await app.inject({
      method: "POST",
      url: "/auth/login",
      payload: {
        email: "login@mail.com",
        password: "123456",
      },
    });

    const body = response.json();

    expect(response.statusCode).toBe(HttpStatusCode.Ok);
    expect(body.data.token).toBeDefined();
  });

  it("returns 401 on invalid credentials", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/auth/login",
      payload: {
        email: "nope@mail.com",
        password: "wrong",
      },
    });

    const body = response.json();

    expect(response.statusCode).toBe(HttpStatusCode.Unauthorized);
    expect(body).toEqual({
      statusCode: HttpStatusCode.Unauthorized,
      data: null,
      message: "Invalid credentials",
      error: true,
    });
  });
});
