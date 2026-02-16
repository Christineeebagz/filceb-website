// app/api/members/images/route.ts
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    // In production, you might want to store this list in a database or CMS
    const membersDirectory = path.join(
      process.cwd(),
      "public/images/home/members"
    );

    // Check if directory exists
    if (!fs.existsSync(membersDirectory)) {
      return NextResponse.json({ images: [] });
    }

    const filenames = fs.readdirSync(membersDirectory);

    // Filter for image files and map to URLs
    const imageFiles = filenames
      .filter((file) => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file))
      .sort()
      .map((file) => `/images/home/members/${file}`);

    return NextResponse.json({ images: imageFiles });
  } catch (error) {
    console.error("Error reading members directory:", error);
    return NextResponse.json({ images: [] });
  }
}
