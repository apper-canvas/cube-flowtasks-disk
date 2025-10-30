import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Select = forwardRef(({ 
  className, 
  children,
  error = false,
  ...props 
}, ref) => {
  return (
    <div className="relative">
      <select
        className={cn(
          "flex h-11 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 appearance-none",
          error && "border-red-300 focus:ring-red-500",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <ApperIcon name="ChevronDown" size={16} className="text-gray-400" />
      </div>
    </div>
  );
});

Select.displayName = "Select";

export default Select;