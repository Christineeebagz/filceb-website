"use client";

import { Badge } from "@/components/ui/badge";
import { users } from "@/database/schema";
import { X, ExternalLink, FileText, ImageIcon } from "lucide-react";

interface UserDetailsModalProps {
  user: users;
  isOpen: boolean;
  onClose: () => void;
}

export function UserDetailsModal({
  user,
  isOpen,
  onClose,
}: UserDetailsModalProps) {
  if (!isOpen) return null;

  // Function to generate ImageKit URL - UPDATE THIS WITH YOUR ACTUAL ENDPOINT
  const getImageKitUrl = (filePath: string | null) => {
    if (!filePath) return null;

    // REPLACE THIS WITH YOUR ACTUAL IMAGEKIT URL ENDPOINT
    // You can find this in your ImageKit dashboard or .env file
    const imageKitEndpoint = "https://ik.imagekit.io/bagazinchristine";

    // If the file path is already a full URL, return it
    if (filePath.startsWith("http")) {
      return filePath;
    }

    // For paths like "/filceb-docs/ID-sample_u7QxQ3D8k.jpg"
    // Remove the leading slash if present and construct the full URL
    const cleanPath = filePath.startsWith("/") ? filePath.slice(1) : filePath;
    return `${imageKitEndpoint}/${cleanPath}`;
  };

  // Function to handle opening file links
  const openFileLink = (fileUrl: string | null) => {
    if (fileUrl) {
      console.log("Opening file:", fileUrl); // Debug log
      window.open(fileUrl, "_blank", "noopener,noreferrer");
    } else {
      console.log("No file URL available");
    }
  };

  // Function to get file type and icon
  const getFileInfo = (filePath: string | null) => {
    if (!filePath)
      return { type: "unknown", icon: <FileText className="h-4 w-4" /> };

    const extension = filePath.split(".").pop()?.toLowerCase();
    const isImage = ["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(
      extension || ""
    );

    return {
      type: isImage ? "image" : "document",
      icon: isImage ? (
        <ImageIcon className="h-4 w-4" />
      ) : (
        <FileText className="h-4 w-4" />
      ),
    };
  };

  // Format date function
  const formatDate = (date: Date | string | null) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Debug: Check what file paths we have
  console.log("User file paths:", {
    idUpload: user.idUpload,
    businessDocuments: user.businessDocuments,
    idUploadUrl: getImageKitUrl(user.idUpload),
    businessDocumentsUrl: getImageKitUrl(user.businessDocuments),
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-50 w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-lg border-2 border-black">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-black">
          <h2 className="text-lg font-medium leading-6 text-gray-900">
            User Details
          </h2>
          <button
            onClick={onClose}
            className="rounded-sm p-2 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </div>

        {/* Content - Horizontal layout */}
        <div className="p-6">
          {/* Main user info in horizontal layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Column 1: Basic Info */}
            <div className="space-y-3 border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-muted-foreground">
                  Email:
                </span>
                <span className="text-sm">{user.email}</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-muted-foreground">
                  Name:
                </span>
                <span className="text-sm">
                  {user.firstName || "N/A"} {user.lastName || ""}
                </span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-muted-foreground">
                  Role:
                </span>
                <span className="text-sm capitalize">
                  {user.role?.toLowerCase() || "N/A"}
                </span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-muted-foreground">
                  Status:
                </span>
                <Badge variant={getStatusBadgeVariant(user.status)}>
                  {user.status}
                </Badge>
              </div>
            </div>

            {/* Column 2: Business Info */}
            <div className="space-y-3 border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-muted-foreground">
                  Business Name:
                </span>
                <span className="text-sm">{user.businessName || "N/A"}</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-muted-foreground">
                  Business Type:
                </span>
                <span className="text-sm">{user.businesstype || "N/A"}</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-muted-foreground">
                  Phone:
                </span>
                <span className="text-sm">{user.phone || "N/A"}</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-muted-foreground">
                  Registered:
                </span>
                <span className="text-sm">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
            </div>

            {/* Column 3: Location Info */}
            <div className="space-y-3 border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-muted-foreground">
                  Barangay Address:
                </span>
                <span className="text-sm text-right">
                  {user.barangayAddress || "N/A"}
                </span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-muted-foreground">
                  Location:
                </span>
                <span className="text-sm text-right">
                  {[user.city, user.province].filter(Boolean).join(", ") ||
                    "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* File Uploads Section */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">
              Uploaded Documents
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* ID Upload */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  ID Upload:
                </label>
                {user.idUpload ? (
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      {getFileInfo(user.idUpload).icon}
                      <button
                        onClick={() =>
                          openFileLink(getImageKitUrl(user.idUpload))
                        }
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors text-sm underline"
                      >
                        View ID Document
                        <ExternalLink className="h-3 w-3" />
                      </button>
                    </div>
                    {/* <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                      <strong>File path:</strong> {user.idUpload}
                      <br />
                      <strong>Full URL:</strong>{" "}
                      {getImageKitUrl(user.idUpload) ||
                        "Unable to construct URL"}
                    </div> */}
                  </div>
                ) : (
                  <span className="text-sm text-gray-500">No ID uploaded</span>
                )}
              </div>

              {/* Business Documents */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Business Documents:
                </label>
                {user.businessDocuments ? (
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      {getFileInfo(user.businessDocuments).icon}
                      <button
                        onClick={() =>
                          openFileLink(getImageKitUrl(user.businessDocuments))
                        }
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors text-sm underline"
                      >
                        View Business Documents
                        <ExternalLink className="h-3 w-3" />
                      </button>
                    </div>
                    {/* <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                      <strong>File path:</strong> {user.businessDocuments}
                      <br />
                      <strong>Full URL:</strong>{" "}
                      {getImageKitUrl(user.businessDocuments) ||
                        "Unable to construct URL"}
                    </div> */}
                  </div>
                ) : (
                  <span className="text-sm text-gray-500">
                    No business documents uploaded
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Additional Info Section */}
          <div className="mt-4 border border-gray-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">
              Additional Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Activity:</span>
                <span>{user.lastActivityDate || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Reference Number:</span>
                <span>{user.referenceNum || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Published At:</span>
                <span className="font-medium">
                  {user.status === "APPROVED" && user.published_at
                    ? formatDate(user.published_at)
                    : "Not published"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getStatusBadgeVariant(status: users["status"]) {
  switch (status) {
    case "APPROVED":
      return "default";
    case "PENDING":
    case "PRE-APPROVED":
      return "secondary";
    case "REJECTED":
      return "destructive";
    case "UNSUBMITTED":
      return "outline";
    default:
      return "outline";
  }
}
