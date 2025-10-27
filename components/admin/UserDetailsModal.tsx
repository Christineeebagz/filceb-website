"use client";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogPortal, // ✅ make sure to import
  DialogOverlay, // ✅ overlay for modal
} from "@/components/ui/dialog";
import { users } from "@/database/schema";

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
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <DialogContent className="fixed left-1/2 top-1/2 max-w-2xl max-h-[90vh] w-full -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white shadow-lg ">
          <DialogHeader>
            <DialogTitle className="text-lg font-medium leading-6 text-gray-900">
              User Details
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            {/* Left column */}
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Email
                </label>
                <p className="text-sm mt-1">{user.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  First Name
                </label>
                <p className="text-sm mt-1">{user.firstName || "N/A"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Last Name
                </label>
                <p className="text-sm mt-1">{user.lastName || "N/A"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Role
                </label>
                <p className="text-sm mt-1 capitalize">
                  {user.role.toLowerCase()}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Status
                </label>
                <div className="mt-1">
                  <Badge variant={getStatusBadgeVariant(user.status)}>
                    {user.status}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Business Name
                </label>
                <p className="text-sm mt-1">{user.businessName || "N/A"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Business Type
                </label>
                <p className="text-sm mt-1">{user.businesstype || "N/A"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Phone
                </label>
                <p className="text-sm mt-1">{user.phone || "N/A"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Barangay Address
                </label>
                <p className="text-sm mt-1">{user.barangayAddress || "N/A"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Location
                </label>
                <p className="text-sm mt-1">
                  {[user.city, user.province].filter(Boolean).join(", ") ||
                    "N/A"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Registered Date
                </label>
                <p className="text-sm mt-1">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
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
