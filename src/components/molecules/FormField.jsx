import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";
import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";

const FormField = forwardRef(({ 
  label,
  error,
  helperText,
  required = false,
  className,
  children,
  ...props 
}, ref) => {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label htmlFor={props.id}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      
      {children || <Input ref={ref} error={!!error} {...props} />}
      
      {error && (
        <p className="text-sm text-red-600 font-medium">
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p className="text-sm text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  );
});

FormField.displayName = "FormField";

export default FormField;