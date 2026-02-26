import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export const getInitials = (name: string): string => name.split(" ")string[]
// .map((part) =? part[0])
// .join("")string
// .toUpperCase()

export const getInitials = (
  firstName: string | null | undefined,
  lastName: string | null | undefined
): string => {
  // Handle case where both names are missing
  if (!firstName && !lastName) return "NEW";

  // Get first letter of each name (if they exist)
  const firstInitial = firstName?.[0]?.toUpperCase() || "";
  const lastInitial = lastName?.[0]?.toUpperCase() || "";

  // Combine the initials
  return `${firstInitial}${lastInitial}`;
};

// export const getInitials = (name: string): string =>
//   name
//     .split(" ")
//     .map((part) => part[0])
//     .join("")
//     .toUpperCase()
//     .slice(0, 2);
