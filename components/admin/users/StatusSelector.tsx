// components/admin/users/StatusSelector.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface StatusSelectorProps {
  currentStatus: string;
  onStatusChange: (newStatus: string) => Promise<void>;
  disabled?: boolean;
}

// Status color mapping
const STATUS_COLORS: Record<string, { text: string; bg: string }> = {
  UNSUBMITTED: { text: "#8C52FF", bg: "rgba(140, 82, 255, 0.2)" },
  PENDING: { text: "#FF751F", bg: "rgba(255, 117, 31, 0.2)" },
  "PRE-APPROVED": { text: "#D7AC00", bg: "rgba(215, 172, 0, 0.2)" },
  APPROVED: { text: "#1F9254", bg: "rgba(31, 146, 84, 0.2)" },
  REJECTED: { text: "#FF3130", bg: "rgba(255, 49, 48, 0.2)" },
};

const STATUS_OPTIONS = [
  "UNSUBMITTED",
  "PENDING",
  "PRE-APPROVED",
  "APPROVED",
  "REJECTED",
] as const;

export function StatusSelector({
  currentStatus,
  onStatusChange,
  disabled,
}: StatusSelectorProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
    setSelectedStatus("");
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedStatus("");
    setShowConfirm(false);
  };

  const handleStatusSelect = (status: string) => {
    setSelectedStatus(status);
    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    if (!selectedStatus) return;

    setIsUpdating(true);
    try {
      await onStatusChange(selectedStatus);
      handleCloseModal();
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    setShowConfirm(false);
    setSelectedStatus("");
  };

  return (
    <>
      {/* Change Button */}
      <Button
        onClick={handleOpenModal}
        disabled={disabled}
        variant="outline"
        className="border-[#F8EF30] text-[#1E1E1E] hover:bg-[#F8EF30]/20"
      >
        Change Status
      </Button>

      {/* Status Selection Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={handleCloseModal}
          />
          <div className="relative bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#1E1E1E]">
                Select New Status
              </h3>
              <button
                onClick={handleCloseModal}
                className="rounded-sm p-1 opacity-70 hover:opacity-100 transition-opacity"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-2">
              {STATUS_OPTIONS.map((status) => {
                const colors = STATUS_COLORS[status];
                return (
                  <button
                    key={status}
                    onClick={() => handleStatusSelect(status)}
                    className="w-full text-left px-4 py-3 rounded-lg transition-colors hover:bg-gray-50 flex items-center justify-between"
                  >
                    <span
                      className="font-medium"
                      style={{ color: colors.text }}
                    >
                      {status}
                    </span>
                    {currentStatus === status && (
                      <span className="text-xs text-gray-500">(Current)</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={handleCancel}
          />
          <div className="relative bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <h3 className="text-lg font-bold text-[#1E1E1E] mb-4">
              Confirm Status Change
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to change the status from{" "}
              <span
                className="font-semibold"
                style={{ color: STATUS_COLORS[currentStatus]?.text }}
              >
                {currentStatus}
              </span>{" "}
              to{" "}
              <span
                className="font-semibold"
                style={{ color: STATUS_COLORS[selectedStatus]?.text }}
              >
                {selectedStatus}
              </span>
              ?
            </p>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="border-gray-300"
                disabled={isUpdating}
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirm}
                className="bg-[#F8EF30] text-[#1E1E1E] hover:bg-[#F8EF30]/90"
                disabled={isUpdating}
              >
                {isUpdating ? "Updating..." : "Confirm"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
