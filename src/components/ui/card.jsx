import { forwardRef } from "react";
import { cn } from "../../lib/utils";

export const Card = forwardRef(function Card({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-3xl border border-white/70 bg-white/90 text-slate-900 shadow-[0_28px_80px_-40px_rgba(39,68,114,0.35)] backdrop-blur",
        className
      )}
      {...props}
    />
  );
});

export const CardHeader = forwardRef(function CardHeader({ className, ...props }, ref) {
  return <div ref={ref} className={cn("flex flex-col gap-3 p-6", className)} {...props} />;
});

export const CardTitle = forwardRef(function CardTitle({ className, ...props }, ref) {
  return <h3 ref={ref} className={cn("font-display text-xl font-semibold tracking-[-0.03em] text-[#274472]", className)} {...props} />;
});

export const CardDescription = forwardRef(function CardDescription({ className, ...props }, ref) {
  return <p ref={ref} className={cn("text-sm leading-6 text-slate-600", className)} {...props} />;
});

export const CardContent = forwardRef(function CardContent({ className, ...props }, ref) {
  return <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />;
});

export const CardFooter = forwardRef(function CardFooter({ className, ...props }, ref) {
  return <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />;
});
