import { describe, expect, it } from "bun:test";
import { app } from "../src/index";

describe("Elysia Backend API", () => {
  it("GET / should return 200 with Hello World message", async () => {
    const response = await app.handle(new Request("http://localhost:3000/"));
    expect(response.status).toBe(200);

    const body = (await response.json()) as {
      message: string;
      database: string;
      timestamp: string;
    };

    expect(body.message).toBe("Hello World from Elysia + Bun!");
    expect(body.database).toBeDefined();
  });

  it("POST /users should validate request body format", async () => {
    const response = await app.handle(
      new Request("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "", email: "not-an-email" }),
      })
    );
    expect(response.status).toBe(422);
  });
});
