import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="text-center space-y-6 max-w-md mx-auto">
        <div className="w-20 h-20 mx-auto bg-gradient-danger rounded-full flex items-center justify-center">
          <ApperIcon name="AlertTriangle" size={32} className="text-white" />
        </div>
        
        <div className="space-y-3">
          <h3 className="text-2xl font-bold text-gray-900">
            Oops! Something went wrong
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {message}
          </p>
        </div>

        {onRetry && (
          <button
            onClick={onRetry}
            className="button-primary inline-flex items-center gap-2 mx-auto"
          >
            <ApperIcon name="RefreshCw" size={16} />
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default Error;