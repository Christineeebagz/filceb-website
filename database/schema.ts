// import { uuid } from "drizzle-orm/gel-core";
import {
  uuid,
  integer,
  text,
  boolean,
  pgTable,
  varchar,
  pgEnum,
  date,
  timestamp,
} from "drizzle-orm/pg-core";

export const BUSINESS_ENUM = pgEnum("businessType", [
  "CORPORATION",
  "SOLE PROPRIETORSHIP",
  "PARTNERSHIP",
  "COOPERATIVE",
  "OTHERS",
]);
export const STATUS_ENUM = pgEnum("status", [
  "PENDING",
  "APPROVED",
  "REJECTED",
]);
export const ROLE_ENUM = pgEnum("role", ["USER", "ADMIN"]);

export const users = pgTable("users", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),

  firstName: varchar("first_name", { length: 100 }),
  lastName: varchar("last_name", { length: 100 }),
  phone: varchar("phone", { length: 11 }),
  barangayAddress: text("barangay_address"),
  province: varchar("province", { length: 100 }),
  city: varchar("city", { length: 100 }),
  businessName: varchar("business_name", { length: 200 }),
  businessType: BUSINESS_ENUM("businessType"),

  idUpload: text("id_upload"),
  businessDocuments: text("business_documents"),
  status: STATUS_ENUM("status").default("PENDING"),
  role: ROLE_ENUM("role").default("USER"),
  lastActivityDate: date("last_activity_date").notNull().defaultNow(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow(),
});
