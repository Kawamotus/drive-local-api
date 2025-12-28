import { execSync } from "node:child_process";

process.env.DATABASE_URL = "file:./prisma/test.db";

console.log("TEST DATABASE_URL =", process.env.DATABASE_URL);

execSync("npx prisma db push", {
  stdio: "inherit",
});
