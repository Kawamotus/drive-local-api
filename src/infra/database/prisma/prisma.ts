import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@prisma/client";

const dbPath =
  process.env.NODE_ENV === "test"
    ? "file:./prisma/test.db"
    : "file:./prisma/dev.db";

const adapter = new PrismaBetterSqlite3({
  url: dbPath,
});

export const prisma = new PrismaClient({
  adapter,
});
