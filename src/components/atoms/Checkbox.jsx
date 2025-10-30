import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Checkbox = forwardRef(({ 
  className,
  checked = false,
  onChange,
  id,
  ...props 
}, ref) => {
  return (
    <div className="relative">
      <input
        type="checkbox"
        id={id}
        ref={ref}
        checked={checked}
        onChange={onChange}
        className={cn(
          "checkbox-custom",
          className
        )}
        {...props}
      />
    </div>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;