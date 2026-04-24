// components/ui/label.tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      variant: {
        default: "text-gray-700",
        required: "text-gray-700 after:content-['*'] after:ml-0.5 after:text-red-500",
        optional: "text-gray-500",
        error: "text-red-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {
  required?: boolean;
  optional?: boolean;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, variant, required, optional, children, ...props }, ref) => {
    let finalVariant = variant;
    
    if (required) {
      finalVariant = "required";
    } else if (optional) {
      finalVariant = "optional";
    }
    
    return (
      <label
        ref={ref}
        className={cn(labelVariants({ variant: finalVariant, className }))}
        {...props}
      >
        {children}
      </label>
    );
  }
);
Label.displayName = "Label";

export { Label };