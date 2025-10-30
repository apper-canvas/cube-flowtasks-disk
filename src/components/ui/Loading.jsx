import React from "react";

const Loading = () => {
  return (
    <div className="space-y-4">
      {/* Header skeleton */}
      <div className="flex justify-between items-center mb-8">
        <div className="h-8 w-48 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-pulse"></div>
        <div className="h-10 w-32 bg-gradient-to-r from-indigo-200 via-indigo-100 to-indigo-200 rounded-lg animate-pulse"></div>
      </div>

      {/* Filter bar skeleton */}
      <div className="flex gap-4 mb-6">
        {[1, 2, 3].map((i) => (
          <div 
            key={i}
            className="h-10 w-24 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-pulse"
          />
        ))}
      </div>

      {/* Task cards skeleton */}
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div 
            key={i}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-pulse"
          >
            <div className="flex items-start gap-4">
              <div className="w-5 h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded"></div>
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="h-6 w-64 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded"></div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-200 via-purple-100 to-purple-200 rounded-full"></div>
                    <div className="h-6 w-20 bg-gradient-to-r from-blue-200 via-blue-100 to-blue-200 rounded-full"></div>
                  </div>
                </div>
                <div className="h-4 w-80 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded"></div>
                <div className="flex justify-between items-center">
                  <div className="h-5 w-16 bg-gradient-to-r from-pink-200 via-pink-100 to-pink-200 rounded-full"></div>
                  <div className="h-4 w-24 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;