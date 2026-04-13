import { forwardRef } from "react";
import { cn } from "../../lib/utils";

const VARIANTS = {
  default: "bg-[#274472] text-white hover:bg-[#1f385e] shadow-[0_18px_45px_-24px_rgba(39,68,114,0.75)]",
  secondary: "bg-white text-[#274472] ring-1 ring-[#d8e4ef] hover:bg-[#f7fafc]",
  outline: "bg-transparent text-[#274472] ring-1 ring-[#9cc2ec] hover:bg-[#eef5fc]",
  accent: "bg-[#f5a623] text-[#16324f] hover:bg-[#ec9d1d] shadow-[0_18px_45px_-24px_rgba(245,166,35,0.85)]",
  ghost: "bg-transparent text-[#274472] hover:bg-[#edf4fb]",
};

const SIZES = {
  default: "h-11 px-5 text-sm",
  sm: "h-9 px-4 text-sm",
  lg: "h-12 px-6 text-sm md:h-14 md:px-7 md:text-base",
};

export const Button = forwardRef(function Button(
  { className, variant = "default", size = "default", href, children, ...props },
  ref
) {
  const Component = href ? "a" : "button";

  return (
    <Component
      ref={ref}
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4a90e2] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        VARIANTS[variant],
        SIZES[size],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
});
