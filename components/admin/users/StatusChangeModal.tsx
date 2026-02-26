// components/admin/users/StatusChangeModal.tsx
"use client";

import { Button } from "@/components/ui/button";
import { STATUS_COLORS } from "./types";

interface StatusChangeModalProps {
  isOpen: boolean;
  userName: string;
  currentStatus: string;
  newStatus: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function StatusChangeModal({
  isOpen,
  userName,
  currentStatus,
  newStatus,
  onConfirm,
  onCancel,
}: StatusChangeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-bold text-[#1E1E1E] mb-4">
          Confirm Status Change
        </h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to change the status of{" "}
          <span className="font-semibold">{userName}</span> from{" "}
          <span
            className="font-semibold"
            style={{ color: STATUS_COLORS[currentStatus]?.text || "#1E1E1E" }}
          >
            {currentStatus}
          </span>{" "}
          to{" "}
          <span
            className="font-semibold"
            style={{ color: STATUS_COLORS[newStatus]?.text || "#1E1E1E" }}
          >
            {newStatus}
          </span>
          ?
        </p>
        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={onCancel}
            className="border-gray-300"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-[#F8EF26] text-[#1E1E1E] hover:bg-[#F8EF26]/90"
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}
