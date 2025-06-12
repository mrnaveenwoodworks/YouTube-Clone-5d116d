import React from "react";

const LoadingSkeleton = ({ type = "videoCard" }) => {
  if (type === "videoCard") {
    return (
      <div className="flex flex-col w-full animate-pulse">
        {/* Thumbnail Container */}
        <div className="relative w-full">
          <div className="aspect-w-16 aspect-h-9 rounded-xl bg-gray-300 dark:bg-gray-700"></div>
          {/* Duration Badge */}
          <div className="absolute bottom-2 right-2 bg-gray-400 dark:bg-gray-600 h-5 w-12 rounded"></div>
        </div>

        {/* Video Info Container */}
        <div className="flex mt-3 space-x-3">
          {/* Channel Avatar */}
          <div className="flex-shrink-0">
            <div className="w-9 h-9 rounded-full bg-gray-300 dark:bg-gray-700"></div>
          </div>

          {/* Title and Metadata */}
          <div className="flex-1 space-y-2 py-1">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
            <div className="flex items-center space-x-2 pt-1">
              <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
              <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "searchResultItem") {
    return (
      <div className="flex flex-col sm:flex-row gap-4 p-2 animate-pulse">
        <div className="w-full sm:w-60 md:w-72 lg:w-80 flex-shrink-0">
          <div className="aspect-w-16 aspect-h-9 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
        </div>
        <div className="flex-grow pt-2 sm:pt-0 space-y-3">
          <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="flex items-center space-x-2 pt-1">
            <div className="w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-700"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
          </div>
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (type === "videoSuggestionItem") {
    return (
      <div className="flex space-x-2 p-2 animate-pulse">
        <div className="flex-shrink-0 w-40 h-20 rounded-lg bg-gray-300 dark:bg-gray-700"></div>
        <div className="flex-1 space-y-2 py-1">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
        </div>
      </div>
    );
  }
  
  if (type === "commentItem") {
    return (
      <div className="flex space-x-4 py-2 animate-pulse">
        <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 flex-shrink-0"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
        </div>
      </div>
    );
  }


  // Default simple skeleton
  return (
    <div className="p-4 w-full mx-auto animate-pulse">
      <div className="h-2.5 bg-gray-300 dark:bg-gray-700 rounded-full w-48 mb-4"></div>
      <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded-full max-w-[360px] mb-2.5"></div>
      <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded-full mb-2.5"></div>
      <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded-full max-w-[330px] mb-2.5"></div>
      <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded-full max-w-[300px] mb-2.5"></div>
      <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded-full max-w-[360px]"></div>
    </div>
  );
};

export default LoadingSkeleton;