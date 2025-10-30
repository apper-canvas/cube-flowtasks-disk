import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No tasks yet", 
  description = "Get started by adding your first task!", 
  onAction,
  actionLabel = "Add Task",
  icon = "CheckSquare"
}) => {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="text-center space-y-8 max-w-md mx-auto">
        <div className="relative">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
            <ApperIcon name={icon} size={48} className="text-indigo-500" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
            <ApperIcon name="Plus" size={16} className="text-white" />
          </div>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-3xl font-bold text-gradient">
            {title}
          </h3>
          <p className="text-gray-600 text-lg leading-relaxed">
            {description}
          </p>
        </div>

        {onAction && (
          <button
            onClick={onAction}
            className="button-primary inline-flex items-center gap-3 text-lg px-8 py-4 mx-auto"
          >
            <ApperIcon name="Plus" size={20} />
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default Empty;