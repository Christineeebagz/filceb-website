// import config from "@/lib/config";
// import { neon } from "@neondatabase/serverless";
// import { drizzle } from "drizzle-orm/neon-http";

// const sql = neon(config.env.databaseUrl);

// export const db = drizzle({ client: sql });
// database/drizzle.ts
import config from "@/lib/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

// Add proper validation for database URL
const databaseUrl = config.env.databaseUrl;
if (!databaseUrl) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const sql = neon(databaseUrl);
export const db = drizzle(sql);
