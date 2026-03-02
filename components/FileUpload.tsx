"use client";

import { ImageKitProvider, IKUpload } from "imagekitio-next";
import config from "@/lib/config";
import { useRef, useState, useEffect } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Upload } from "lucide-react";

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { token, expire, signature };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

interface Props {
  type: "image" | "file";
  accept: string;
  placeholder: string;
  folder: string;
  variant: "dark" | "light";
  onFileChange: (filePath: string | null) => void;
  value?: string;
  isInvalid?: boolean;
}

const FileUpload = ({
  type,
  accept,
  placeholder,
  folder,
  variant,
  onFileChange,
  value,
  isInvalid = false,
}: Props) => {
  const ikUploadRef = useRef(null);
  const [filePath, setFilePath] = useState<string | null>(value ?? null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (value !== filePath) {
      setFilePath(value ?? null);
    }
  }, [value]);

  const onError = () => {
    onFileChange(null);
    toast.error(`${type} upload failed. Please try again.`);
  };

  const onSuccess = (res: any) => {
    setFilePath(res.filePath);
    onFileChange(res.filePath);
    toast.success(`${type} uploaded successfully`);
  };

  const onValidate = (file: File) => {
    const maxSize = type === "image" ? 20 * 1024 * 1024 : 30 * 1024 * 1024;
    const allowedTypes = accept.split(",").map((t) => t.trim());

    if (file.size > maxSize) {
      onFileChange(null);
      toast.error(`File too large. Max size: ${maxSize / (1024 * 1024)}MB`);
      return false;
    }

    const fileExt = `.${file.name.split(".").pop()?.toLowerCase()}`;
    if (!allowedTypes.some((type) => type.includes(fileExt))) {
      onFileChange(null);
      toast.error("File type not supported");
      return false;
    }

    return true;
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // @ts-ignore
    ikUploadRef.current?.click();
  };

  const hasSuccess = filePath && !isInvalid;

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <div className="space-y-2">
        <IKUpload
          ref={ikUploadRef}
          onError={onError}
          onSuccess={onSuccess}
          useUniqueFileName={true}
          validateFile={onValidate}
          onUploadStart={() => setProgress(0)}
          onUploadProgress={({ loaded, total }) => {
            const percent = Math.round((loaded / total) * 100);
            setProgress(percent);
          }}
          folder={folder}
          accept={accept}
          className="hidden"
        />

        <button
          type="button"
          onClick={handleButtonClick}
          className={cn(
            "w-full py-4 px-4 rounded-md flex items-center justify-center gap-2 transition-colors border-2",
            hasSuccess && "bg-green-50 border-green-400 hover:bg-green-100",
            isInvalid && "bg-red-50 border-red-500 hover:bg-red-100",
            !filePath &&
              !isInvalid &&
              "bg-white border-gray-300 hover:bg-gray-50"
          )}
        >
          <Upload
            className={cn(
              "w-5 h-5",
              hasSuccess && "text-green-600",
              isInvalid && "text-red-500",
              !filePath && !isInvalid && "text-gray-500"
            )}
          />
          <p
            className={cn(
              "text-base",
              hasSuccess && "text-green-700 font-medium",
              isInvalid && "text-red-600 font-medium",
              !filePath && !isInvalid && "text-gray-600"
            )}
          >
            {filePath ? "✓ " + filePath.split("/").pop() : placeholder}
          </p>
        </button>

        {progress > 0 && progress < 100 && (
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-[#F8EF30] h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
            <p className="text-xs text-center mt-1 text-gray-600">
              {progress}% uploaded
            </p>
          </div>
        )}
      </div>
    </ImageKitProvider>
  );
};

export default FileUpload;
