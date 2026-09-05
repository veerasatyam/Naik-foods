import React from "react";
import { cn } from "@/lib/utils";

interface VegBadgeProps {
  isVeg: boolean;
  size?: "sm" | "md";
  showLabel?: boolean;
}

export function VegBadge({ isVeg, size = "sm", showLabel = false }: VegBadgeProps) {
  const isSm = size === "sm";

  return (
    <div className="inline-flex items-center gap-1.5" title={isVeg ? "100% Vegetarian" : "Contains Seafood / Non-Veg"}>
      <div
        className={cn(
          "border flex items-center justify-center rounded-sm bg-white shrink-0",
          isVeg ? "border-green-600" : "border-red-700",
          isSm ? "w-4 h-4 p-0.5" : "w-5 h-5 p-0.5"
        )}
      >
        <div
          className={cn(
            "rounded-full",
            isVeg ? "bg-green-600" : "bg-red-700",
            isSm ? "w-2 h-2" : "w-2.5 h-2.5"
          )}
        />
      </div>
      {showLabel && (
        <span className={cn("text-xs font-semibold", isVeg ? "text-green-700" : "text-red-700")}>
          {isVeg ? "100% Veg" : "Non-Veg (Seafood)"}
        </span>
      )}
    </div>
  );
}
