
import { cn } from "@/lib/utils";

type SpinnerProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
};

export function Spinner({ className, size = "md" }: SpinnerProps) {
  const sizeClass = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-2",
    lg: "h-8 w-8 border-3",
  };

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-t-transparent border-primary",
        sizeClass[size],
        className
      )}
    />
  );
}
