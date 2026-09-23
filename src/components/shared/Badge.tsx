import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-destructive text-destructive-foreground",
        outline: "text-foreground border border-slate-200",
        rx: "border-orange-200 bg-orange-50 text-orange-700 font-bold",
        discount: "border-green-200 bg-green-50 text-green-700 font-bold",
        hot: "border-red-200 bg-red-500 text-white font-black uppercase tracking-wider",
        success: "border-transparent bg-green-600 text-white font-bold",
      },
      size: {
        sm: "text-[10px] px-1.5 py-0.2",
        md: "text-xs px-2.5 py-0.5",
        lg: "text-sm px-3 py-1",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
