"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { STATUS_OPTIONS } from "../components/types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedStatuses: string[];
  onToggle: (status: string) => void;
  onClear: () => void;
}

export function StatusFilterModal({
  isOpen,
  onClose,
  selectedStatuses,
  onToggle,
  onClear,
}: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filter by Status</DialogTitle>
        </DialogHeader>

        <div className="space-y-3 mt-4">
          {STATUS_OPTIONS.map((status) => (
            <label key={status} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedStatuses.includes(status)}
                onChange={() => onToggle(status)}
              />
              <span>{status}</span>
            </label>
          ))}
        </div>

        <div className="flex justify-between mt-6">
          <Button variant="ghost" onClick={onClear}>
            Clear
          </Button>

          <Button onClick={onClose} className="bg-[#F8EF26] text-black">
            Apply
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
