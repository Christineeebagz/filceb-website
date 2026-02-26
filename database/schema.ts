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

export const BUSINESS_ENUM = pgEnum("businesstype", [
  "CORPORATION",
  "SOLE PROPRIETORSHIP",
  "PARTNERSHIP",
  "COOPERATIVE",
  "OTHERS",
]);
export const STATUS_ENUM = pgEnum("status", [
  "UNSUBMITTED",
  "PENDING",
  "PRE-APPROVED",
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
  businesstype: BUSINESS_ENUM("businesstype"),

  idUpload: text("id_upload"),
  businessDocuments: text("business_documents"),
  status: STATUS_ENUM("status").default("UNSUBMITTED"),
  role: ROLE_ENUM("role").default("USER"),
  lastActivityDate: date("last_activity_date").notNull().defaultNow(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow(),
  referenceNum: text("reference_num"),
});

export const POST_TYPE_ENUM = pgEnum("post_type", [
  "TEXT",
  "IMAGE",
  "LINK",
  "EMBED",
]);

export const POST_STATUS_ENUM = pgEnum("post_status", [
  "DRAFT",
  "PUBLISHED",
  "ARCHIVED",
]);

export const posts = pgTable("posts", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  title: varchar("title", { length: 200 }).notNull(),
  content: text("content"),
  type: POST_TYPE_ENUM("type").notNull().default("TEXT"),
  mediaUrl: text("media_url"),
  embedCode: text("embed_code"),
  status: POST_STATUS_ENUM("status").notNull().default("DRAFT"),
  authorId: uuid("author_id")
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  orderIndex: integer("order_index").default(0),
});
