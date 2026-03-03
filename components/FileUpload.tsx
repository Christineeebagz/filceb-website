"use client";

import { cn } from "@/lib/utils";
import { useRef } from "react";

interface Props {
  type?: "file";
  accept?: string;
  placeholder?: string;
  folder: string;
  variant?: "light" | "dark";
  onFileChange: (filePath: string | null) => void;
  value?: string;
  isInvalid?: boolean;
}

const FileUpload = ({
  accept,
  placeholder,
  folder,
  variant = "light",
  onFileChange,
  value,
  isInvalid,
}: Props) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      onFileChange(null);
      return;
    }

    try {
      // Replace this with your real upload logic
      // Example placeholder upload simulation:
      const fakeUploadedPath = `${folder}/${file.name}`;

      onFileChange(fakeUploadedPath);
    } catch (error) {
      console.error("Upload failed:", error);
      onFileChange(null);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className={cn(
          "w-full rounded-md border p-3 cursor-pointer",
          variant === "dark" ? "bg-white text-black" : "bg-gray-100 text-black",
          isInvalid ? "border-red-500 bg-red-50" : "border-gray-300"
        )}
      />

      {value && <p className="text-xs text-green-400">Uploaded: {value}</p>}

      {!value && placeholder && (
        <p className="text-xs text-gray-400">{placeholder}</p>
      )}
    </div>
  );
};

export default FileUpload;
