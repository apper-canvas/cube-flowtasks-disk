import React from "react";
import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md mx-auto text-center space-y-8">
        <div className="relative">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
            <ApperIcon name="FileQuestion" size={48} className="text-indigo-500" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-danger rounded-full flex items-center justify-center">
            <ApperIcon name="AlertTriangle" size={16} className="text-white" />
          </div>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-gradient">404</h1>
          <h2 className="text-2xl font-bold text-gray-900">Page Not Found</h2>
          <p className="text-gray-600 leading-relaxed">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back to organizing your tasks!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2"
          >
            <ApperIcon name="Home" size={16} />
            Go to Dashboard
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2"
          >
            <ApperIcon name="ArrowLeft" size={16} />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;