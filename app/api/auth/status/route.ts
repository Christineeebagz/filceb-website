// // app/api/auth/status/route.ts
// import { auth } from "@/auth";
// import { db } from "@/database/drizzle";
// import { users } from "@/database/schema";
// import { eq } from "drizzle-orm";
// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     const session = await auth();

//     if (!session?.user?.email) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     // Get the latest user data from database
//     const user = await db
//       .select()
//       .from(users)
//       .where(eq(users.email, session.user.email))
//       .limit(1);

//     if (user.length === 0) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     return NextResponse.json({
//       status: user[0].status || "UNSUBMITTED",
//       email: user[0].email || "",
//     });
//   } catch (error) {
//     console.error("Status check error:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
