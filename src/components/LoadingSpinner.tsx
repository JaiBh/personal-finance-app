"use client";

import { clsx } from "clsx";
export default function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div
        className={clsx(
          "border-[3px] border-t-[3px] border-[#f3f3f3] rounded-[50%] border-t-[#3498db] animate-spin size-12",
          className
        )}
      ></div>
    </div>
  );
}
