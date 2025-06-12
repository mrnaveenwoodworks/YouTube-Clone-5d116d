import React, { useState } from "react";
import { format, formatDistanceToNowStrict } from "date-fns";
import { Link } from "react-router-dom";
import LoadingSkeleton from "./LoadingSkeleton"; // Import the LoadingSkeleton

const VideoCard = ({ video, isLoading }) => {
  const [isThumbnailError, setIsThumbnailError] = useState(false);
  const [isAvatarError, setIsAvatarError] = useState(false);

  // If isLoading is true, render the skeleton
  if (isLoading) {
    return <LoadingSkeleton type="videoCard" />;
  }

  // If not loading and no video data, render null or a fallback
  if (!video) {
    return null; // Or some fallback UI like <p>Video data not available.</p>
  }

  const {
    id,
    thumbnail,
    title,
    channelTitle,
    channelAvatar,
    views,
    publishedAt,
    duration
  } = video;

  const defaultThumbnail = "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200";
  const defaultAvatar = "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200";

  return (
    <Link to={`/video/${id}`} className="flex flex-col w-full group">
      {/* Thumbnail Container */}
      <div className="relative w-full overflow-hidden rounded-xl shadow-sm group-hover:shadow-md transition-shadow duration-200">
        <div className="aspect-w-16 aspect-h-9">
          <img
            src={isThumbnailError ? defaultThumbnail : (thumbnail || defaultThumbnail)}
            alt={title || "Video thumbnail"}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setIsThumbnailError(true)}
          />
        </div>
        {/* Duration Badge */}
        {duration && (
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
            {duration}
          </div>
        )}
      </div>

      {/* Video Info Container */}
      <div className="flex mt-3 space-x-3">
        {/* Channel Avatar */}
        <div className="flex-shrink-0">
          <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200">
            <img
              src={isAvatarError ? defaultAvatar : (channelAvatar || defaultAvatar)}
              alt={channelTitle || "Channel avatar"}
              className="w-full h-full object-cover"
              onError={() => setIsAvatarError(true)}
            />
          </div>
        </div>

        {/* Title and Metadata */}
        <div className="flex-1 min-w-0"> {/* Added min-w-0 for proper truncation */}
          <h3 className="text-sm sm:text-base font-medium line-clamp-2 text-gray-800 dark:text-white group-hover:text-youtube-red transition-colors duration-200">
            {title || "Untitled Video"}
          </h3>
          
          <div className="mt-1 flex flex-col text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            <span className="hover:text-black dark:hover:text-white transition-colors duration-200 truncate"> {/* Added truncate */}
              {channelTitle || "Unknown Channel"}
            </span>
            <div className="flex items-center flex-wrap"> {/* Added flex-wrap */}
              <span>{formatViews(views)}</span>
              <span className="mx-1">•</span>
              <span>{formatDateAgo(publishedAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

// Helper functions
const formatViews = (views) => {
  if (views === undefined || views === null) return "0 views";
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M views`;
  } else if (views >= 1000) {
    return `${(views / 1000).toFixed(0)}K views`; // Use toFixed(0) for K views for cleaner look
  }
  return `${views} views`;
};

const formatDateAgo = (dateString) => {
  if (!dateString) return "some time ago";
  try {
    return `${formatDistanceToNowStrict(new Date(dateString))} ago`;
  } catch (error) {
    console.error("Error formatting date:", dateString, error);
    // Fallback to a simpler format if formatDistanceToNowStrict fails
    try {
        return format(new Date(dateString), "MMM d, yyyy");
    } catch (innerError) {
        return "unknown date";
    }
  }
};

export default VideoCard;