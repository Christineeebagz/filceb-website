// lib/imageLoader.ts
"use client";

export default function imageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  // If it's already an ImageKit URL, return as is
  if (src.includes('ik.imagekit.io')) {
    return src;
  }
  
  // For local images during development, just return the src
  return src;
}
