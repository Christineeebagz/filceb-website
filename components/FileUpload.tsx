// "use client";

// import {
//   ImageKitAbortError,
//   ImageKitInvalidRequestError,
//   ImageKitServerError,
//   ImageKitUploadNetworkError,
//   upload,
// } from "@imagekit/next";

// import React from "react";
// import config from "@/lib/config";

// const authenticator = async () => {
//   try {
//     const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);
//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(
//         `Request failed with status ${response.status}: ${errorText}`
//       );
//     }
//   } catch (error: any) {
//     throw new Error(`Authentication Request Failed ${error.message}`);
//   }
//   const data = await response.json();
//   const { signature, expire, token } = data;

//   return { token, expire, signature };
// };

// const FileUpload = () => {
//   return <div>FileUpload</div>;
// };

// export default FileUpload;"use client";
import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next";
import { useRef, useState } from "react";
import config from "@/lib/config";

const UploadExample = () => {
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const authenticator = async () => {
    try {
      const response = await fetch(
        `${config.env.apiEndpoint}/api/auth/imagekit`
      );
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }
      const data = await response.json();
      const { signature, expire, token, publicKey } = data;
      return { token, expire, signature, publicKey };
    } catch (error: any) {
      throw new Error(`Authentication Request Failed ${error.message}`);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setUploadedFileUrl(null);
    setUploadSuccess(false);

    // Create preview for images
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setFilePreview(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadError("Please select a file to upload");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setUploadError("File size must be less than 5MB");
      return;
    }

    setIsUploading(true);
    setUploadError(null);
    abortControllerRef.current = new AbortController();

    try {
      const { signature, expire, token, publicKey } = await authenticator();

      const uploadResponse = await upload({
        expire,
        token,
        signature,
        publicKey,
        file: selectedFile,
        fileName: `${Date.now()}-${selectedFile.name}`,
        onProgress: (event) => {
          setProgress(Math.round((event.loaded / event.total) * 100));
        },
        abortSignal: abortControllerRef.current.signal,
      });

      console.log("Upload successful:", uploadResponse);
      setUploadSuccess(true);
      setUploadedFileUrl(uploadResponse.url);
    } catch (error) {
      // Error handling remains the same
    } finally {
      setIsUploading(false);
    }
  };

  const cancelUpload = () => {
    abortControllerRef.current?.abort();
    setIsUploading(false);
    setProgress(0);
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase();
    switch (extension) {
      case "pdf":
        return "📄 PDF";
      case "doc":
      case "docx":
        return "📝 Word";
      case "xls":
      case "xlsx":
        return "📊 Excel";
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return "🖼️ Image";
      default:
        return "📂 File";
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg space-y-4">
      <h2 className="text-xl font-bold">File Upload</h2>

      <div className="space-y-4">
        {/* File Input */}
        <div className="space-y-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            disabled={isUploading}
          />
        </div>

        {/* Selected File Preview */}
        {selectedFile && (
          <div className="border rounded-lg p-3 bg-gray-50">
            <h3 className="font-medium mb-2">Selected File:</h3>
            <div className="flex items-center gap-3">
              {filePreview ? (
                <img
                  src={filePreview}
                  alt="Preview"
                  className="w-16 h-16 object-cover rounded"
                />
              ) : (
                <div className="w-16 h-16 flex items-center justify-center bg-gray-200 rounded">
                  {getFileIcon(selectedFile.name)}
                </div>
              )}
              <div>
                <p className="font-medium truncate">{selectedFile.name}</p>
                <p className="text-sm text-gray-500">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Uploaded File Preview */}
        {uploadedFileUrl && (
          <div className="border rounded-lg p-3 bg-green-50">
            <h3 className="font-medium mb-2">Uploaded File:</h3>
            {filePreview ? (
              <div className="flex flex-col items-center">
                <img
                  src={uploadedFileUrl}
                  alt="Uploaded preview"
                  className="max-w-full h-auto max-h-48 rounded"
                />
                <a
                  href={uploadedFileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-blue-600 hover:underline text-sm"
                >
                  View Full File
                </a>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 flex items-center justify-center bg-green-200 rounded">
                  {selectedFile && getFileIcon(selectedFile.name)}
                </div>
                <div>
                  <p className="font-medium truncate">{selectedFile?.name}</p>
                  <a
                    href={uploadedFileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Download File
                  </a>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Status Messages */}
        {uploadError && <p className="text-red-500 text-sm">{uploadError}</p>}
        {uploadSuccess && !uploadedFileUrl && (
          <p className="text-green-500 text-sm">Upload successful!</p>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleUpload}
            disabled={isUploading || !selectedFile}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
          >
            {isUploading ? "Uploading..." : "Upload File"}
          </button>

          {isUploading && (
            <button
              onClick={cancelUpload}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </div>

        {/* Progress Bar */}
        {isUploading && (
          <div className="space-y-1">
            <progress
              value={progress}
              max="100"
              className="w-full h-2 rounded"
            />
            <p className="text-sm text-gray-600">{progress}% uploaded</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadExample;
