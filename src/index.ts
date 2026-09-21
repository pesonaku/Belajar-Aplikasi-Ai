import { Elysia, t } from "elysia";
import { db, checkDatabaseConnection } from "./db";
import { users } from "./db/schema";

const port = Number(process.env.PORT) || 3000;

export const app = new Elysia()
  .get("/", async () => {
    const isDbConnected = await checkDatabaseConnection();
    return {
      message: "Hello World from Elysia + Bun!",
      database: isDbConnected ? "Connected" : "Disconnected",
      timestamp: new Date().toISOString(),
    };
  })
  .group("/users", (group) =>
    group
      .get("/", async ({ set }) => {
        try {
          const allUsers = await db.select().from(users);
          return {
            success: true,
            data: allUsers,
          };
        } catch (error: any) {
          set.status = 500;
          return {
            success: false,
            message: "Failed to retrieve users from database",
            error: error.message,
          };
        }
      })
      .post(
        "/",
        async ({ body, set }) => {
          try {
            await db.insert(users).values({
              name: body.name,
              email: body.email,
            });

            set.status = 201;
            return {
              success: true,
              message: "User created successfully",
            };
          } catch (error: any) {
            set.status = 500;
            return {
              success: false,
              message: "Failed to create user",
              error: error.message,
            };
          }
        },
        {
          body: t.Object({
            name: t.String({ minLength: 1 }),
            email: t.String({ format: "email" }),
          }),
        }
      )
  )
  .listen(port);

console.log(
  `🚀 Server is running at http://${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app;
