import React from "react";
import { cn } from "@/utils/cn";

const FilterTabs = ({ 
  activeFilter, 
  onFilterChange, 
  taskStats, 
  className 
}) => {
  const tabs = [
    { 
      id: "all", 
      label: "All Tasks", 
      count: taskStats.total,
      color: "text-gray-700"
    },
    { 
      id: "active", 
      label: "Active", 
      count: taskStats.active,
      color: "text-indigo-700"
    },
    { 
      id: "completed", 
      label: "Completed", 
      count: taskStats.completed,
      color: "text-green-700"
    }
  ];

  return (
    <div className={cn("flex gap-1 bg-gray-100 p-1 rounded-lg", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onFilterChange("status", tab.id)}
          className={cn(
            "flex-1 px-4 py-2.5 rounded-md font-medium text-sm transition-all duration-200",
            activeFilter === tab.id
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
          )}
        >
          <span className="flex items-center justify-center gap-2">
            {tab.label}
            <span className={cn(
              "inline-flex items-center justify-center w-5 h-5 text-xs font-bold rounded-full",
              activeFilter === tab.id 
                ? "bg-indigo-100 text-indigo-600" 
                : "bg-gray-200 text-gray-600"
            )}>
              {tab.count}
            </span>
          </span>
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;