// components/admin/users/FileViewer.tsx
"use client";

import { ExternalLink, FileText, ImageIcon } from "lucide-react";

interface FileViewerProps {
  filePath: string | null | undefined;
  label: string;
}

export function FileViewer({ filePath, label }: FileViewerProps) {
  if (!filePath)
    return <span className="text-gray-500 italic">Not uploaded</span>;

  const getImageKitUrl = (filePath: string) => {
    const imageKitEndpoint = "https://ik.imagekit.io/bagazinchristine";
    const cleanPath = filePath.startsWith("/") ? filePath.slice(1) : filePath;
    return `${imageKitEndpoint}/${cleanPath}`;
  };

  const getFileIcon = (filePath: string) => {
    const extension = filePath.split(".").pop()?.toLowerCase();
    const isImage = ["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(
      extension || ""
    );
    return isImage ? (
      <ImageIcon className="h-3 w-3" />
    ) : (
      <FileText className="h-3 w-3" />
    );
  };

  const handleOpenFile = () => {
    const url = getImageKitUrl(filePath);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={handleOpenFile}
      className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors underline ml-auto"
    >
      {getFileIcon(filePath)}
      View {label}
      <ExternalLink className="h-3 w-3" />
    </button>
  );
}
