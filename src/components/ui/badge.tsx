
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-red-900/30 text-red-500 border border-red-800/50 hover:bg-red-900/40",
        outline: "text-foreground",
        success: 
          "border-transparent bg-green-900/30 text-green-500 border border-green-800/50 hover:bg-green-900/40",
        warning:
          "border-transparent bg-yellow-900/30 text-yellow-500 border border-yellow-800/50 hover:bg-yellow-900/40",
        info:
          "border-transparent bg-blue-900/30 text-blue-500 border border-blue-800/50 hover:bg-blue-900/40",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
