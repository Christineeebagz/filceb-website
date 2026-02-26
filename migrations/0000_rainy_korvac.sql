CREATE TYPE "public"."businesstype" AS ENUM('CORPORATION', 'SOLE PROPRIETORSHIP', 'PARTNERSHIP', 'COOPERATIVE', 'OTHERS');--> statement-breakpoint
CREATE TYPE "public"."post_status" AS ENUM('DRAFT', 'PUBLISHED', 'ARCHIVED');--> statement-breakpoint
CREATE TYPE "public"."post_type" AS ENUM('TEXT', 'IMAGE', 'LINK', 'EMBED');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('USER', 'ADMIN');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('UNSUBMITTED', 'PENDING', 'PRE-APPROVED', 'APPROVED', 'REJECTED');--> statement-breakpoint
CREATE TABLE "posts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(200) NOT NULL,
	"content" text,
	"type" "post_type" DEFAULT 'TEXT' NOT NULL,
	"media_url" text,
	"embed_code" text,
	"status" "post_status" DEFAULT 'DRAFT' NOT NULL,
	"author_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	"published_at" timestamp with time zone,
	"order_index" integer DEFAULT 0,
	CONSTRAINT "posts_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"first_name" varchar(100),
	"last_name" varchar(100),
	"phone" varchar(11),
	"barangay_address" text,
	"province" varchar(100),
	"city" varchar(100),
	"business_name" varchar(200),
	"businesstype" "businesstype",
	"id_upload" text,
	"business_documents" text,
	"status" "status" DEFAULT 'UNSUBMITTED',
	"role" "role" DEFAULT 'USER',
	"last_activity_date" date DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"reference_num" text,
	CONSTRAINT "users_id_unique" UNIQUE("id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;