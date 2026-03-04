// components/admin/users/Legend.tsx
"use client";

export function Legend() {
  return (
    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 pt-3 border-t border-gray-200">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-[#F8EF30]/10 border border-[#F8EF30] rounded"></div>
        <span>Complete section (all fields filled)</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-gray-100 border border-gray-300 rounded"></div>
        <span>Incomplete section</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-[#F8EF30]/20 rounded"></div>
        <span>Individual field has value</span>
      </div>
    </div>
  );
}
