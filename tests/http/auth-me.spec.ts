import { describe, it, expect } from "vitest";
import { app } from "../../src/app.js";
import { HttpStatusCode } from "../../src/shared/httpStatusCode.js";

const name = "test user";

describe("GET /me", () => {
  it("returns 401 when token is missing", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/auth/me",
    });

    const body = response.json();

    expect(response.statusCode).toBe(HttpStatusCode.Unauthorized);
    expect(body).toEqual({
      statusCode: HttpStatusCode.Unauthorized,
      data: null,
      message: "Unauthorized",
      error: true,
    });
  });

  it("returns user data with valid token", async () => {
    await app.inject({
      method: "POST",
      url: "/auth/register",
      payload: {
        email: "me@mail.com",
        password: "123456",
        name,
      },
    });

    const loginResponse = await app.inject({
      method: "POST",
      url: "/auth/login",
      payload: {
        email: "me@mail.com",
        password: "123456",
      },
    });

    const token = loginResponse.json().data.token;

    const response = await app.inject({
      method: "GET",
      url: "/auth/me",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const body = response.json();

    expect(response.statusCode).toBe(HttpStatusCode.Ok);
    expect(body.data.email).toBe("me@mail.com");
  });
});
