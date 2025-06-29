import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export const getInitials = (name: string): string => name.split(" ")string[]
// .map((part) =? part[0])
// .join("")string
// .toUpperCase()

export const getInitials = (name: string): string =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
// export const getInitials = (email: string): string => {
//   // Extract the name part before the @ symbol
//   const namePart = email.split("@")[0];

//   // Handle cases where name might be separated by dots or underscores
//   const parts = namePart.split(/[._]/);

//   // Get first letter of each part (max 2 initials)
//   return parts
//     .filter((part) => part.length > 0) // Filter out empty strings
//     .slice(0, 2) // Take max 2 parts
//     .map((part) => part[0].toUpperCase())
//     .join("");
// };
