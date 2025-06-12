import React, { useState, useEffect, useCallback, Component } from "react";
import { useParams, Link } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import Comments from "./Comments";
import VideoSuggestions from "./VideoSuggestions";
import { fetchVideoById } from "../utils/api"; // Assuming NotFoundError is exported or handled via err.name
import LoadingSkeleton from "./LoadingSkeleton";

const FALLBACK_VIDEO_URL = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
const FALLBACK_VIDEO_ID = "dQw4w9WgXcQ";

// ErrorBoundary Component for unexpected errors within video content rendering
class VideoContentErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error: error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("VideoContentErrorBoundary caught an error:", error, errorInfo);
    // Here you might log the error to an external service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center py-10 text-center p-6 text-gray-800 dark:text-white">
          <div className="mb-4 text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="60" height="60"><rect width="256" height="256" fill="none"/><line x1="200" y1="56" x2="200" y2="36" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="200" y1="56" x2="180.98" y2="49.82" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="200" y1="56" x2="188.24" y2="72.18" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="200" y1="56" x2="211.76" y2="72.18" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="200" y1="56" x2="219.02" y2="49.82" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="128" cy="120" r="40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M63.8,199.37a72,72,0,0,1,128.4,0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M222.67,112A95.92,95.92,0,1,1,144,33.33" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
          </div>
          <h2 className="text-xl font-semibold mb-2">Oops! Something Went Wrong</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            We encountered an issue displaying some parts of this video page. Please try refreshing.
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mb-4">
            Error: {this.state.error && this.state.error.toString()}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm"
          >
            Refresh Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}


const VideoDetail = () => {
  const { id: videoIdFromParams } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState(videoIdFromParams);

  useEffect(() => {
    setCurrentVideoId(videoIdFromParams);
  }, [videoIdFromParams]);

  const loadVideoDetails = useCallback(async () => {
    if (!currentVideoId) {
      console.warn("No video ID provided, playing fallback.");
      setVideo({
        id: FALLBACK_VIDEO_ID,
        title: "Content Not Available - Enjoy this classic!",
        videoUrl: FALLBACK_VIDEO_URL,
        channelTitle: "Fallback Channel",
        channelAvatar: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
        description: "The requested video could not be found or no ID was provided. Please enjoy this fallback content. #fallback #classic",
        viewCount: Math.floor(Math.random() * 1000),
        likeCount: Math.floor(Math.random() * 100),
        publishedAt: new Date(Date.now() - 86400000 * 30).toISOString(), // 30 days ago
        subscriberCount: Math.floor(Math.random() * 10000),
        channelId: "fallbackChannel123",
        commentCount: 0,
      });
      setError(null);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null); // Reset error before new fetch
      const videoData = await fetchVideoById(currentVideoId); // fetchVideoById is expected to throw NotFoundError or return data
      
      // If fetchVideoById resolves with data (even if it's null conceptually for "not found" but doesn't throw)
      if (videoData) {
         setVideo({
          ...videoData, // videoData should already contain formatted fields like viewCount, likeCount, etc. from api.js
          videoUrl: `https://www.youtube.com/watch?v=${videoData.id || currentVideoId}`
        });
      } else {
        // This else block might be redundant if fetchVideoById always throws NotFoundError for invalid IDs.
        // However, it's a safeguard.
        console.warn(`Video with ID "${currentVideoId}" resolved to null/undefined, playing fallback.`);
        setVideo({
            id: FALLBACK_VIDEO_ID,
            title: "Content Not Available - Enjoy this classic!",
            videoUrl: FALLBACK_VIDEO_URL,
            channelTitle: "Fallback Channel",
            channelAvatar: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
            description: "The requested video could not be found. Please enjoy this fallback content. #fallback #classic",
            viewCount: Math.floor(Math.random() * 1000),
            likeCount: Math.floor(Math.random() * 100),
            publishedAt: new Date(Date.now() - 86400000 * 30).toISOString(),
            subscriberCount: Math.floor(Math.random() * 10000),
            channelId: "fallbackChannel123",
            commentCount: 0,
        });
      }

    } catch (err) {
      // Check if the error is a "NotFoundError" (or similar, based on your api.js implementation)
      if (err.name === "NotFoundError" || (err.statusCode === 404)) {
        console.warn(`Video with ID "${currentVideoId}" not found, playing fallback. Error: ${err.message}`);
        setVideo({
          id: FALLBACK_VIDEO_ID,
          title: "Content Not Available - Enjoy this classic!",
          videoUrl: FALLBACK_VIDEO_URL,
          channelTitle: "Fallback Channel",
          channelAvatar: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
          description: "The requested video could not be found. Please enjoy this fallback content. #fallback #classic",
          viewCount: Math.floor(Math.random() * 1000),
          likeCount: Math.floor(Math.random() * 100),
          publishedAt: new Date(Date.now() - 86400000 * 30).toISOString(),
          subscriberCount: Math.floor(Math.random() * 10000),
          channelId: "fallbackChannel123",
          commentCount: 0,
        });
        setError(null); // Clear error state as we are providing a fallback
      } else {
        console.error("Error fetching video details:", err);
        setError(err.message || "Failed to load video details. Please try again.");
        setVideo(null); // Ensure video is null if there's a non-fallback error
      }
    } finally {
      setLoading(false);
    }
  }, [currentVideoId]);

  useEffect(() => {
    loadVideoDetails();
    window.scrollTo(0, 0); // Reset scroll position when video changes
  }, [loadVideoDetails]);

  const formatCount = (count) => {
    if (count === undefined || count === null) return "0";
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(0)}K`;
    }
    return count.toString();
  };

  const formatPublishedDate = (dateString) => {
    if (!dateString) return "Unknown date";
    try {
      const date = new Date(dateString);
      const options = { year: "numeric", month: "long", day: "numeric" };
      return date.toLocaleDateString("en-US", options);
    } catch (e) {
      console.error("Error formatting date:", e);
      return "Unknown date";
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-screen-2xl">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-2/3 xl:w-3/4 animate-pulse">
            <div className="relative pt-[56.25%] bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded mt-4 w-3/4"></div>
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mt-2 w-1/2"></div>
            <div className="flex items-center justify-between mt-4 pb-4 border-b border-gray-200 dark:border-gray-700">
              <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
              <div className="flex space-x-4">
                <div className="h-10 w-20 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                <div className="h-10 w-20 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                <div className="h-10 w-24 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
              </div>
            </div>
            <div className="py-4 mt-4 p-4 bg-gray-200 dark:bg-gray-700 rounded-xl space-y-2">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
            </div>
          </div>
          <div className="lg:w-1/3 xl:w-1/4">
            {[...Array(5)].map((_, i) => <LoadingSkeleton key={i} type="videoSuggestionItem" />)}
          </div>
        </div>
      </div>
    );
  }

  // Show general error message ONLY if there's an error AND no video (including fallback) is available
  if (error && !video) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-128px)] text-center p-6 text-gray-800 dark:text-white">
        <div className="mb-6 text-red-500">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="80" height="80"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="128" y1="224" x2="232" y2="224" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="128" cy="84" r="20"/><circle cx="128" cy="172" r="20"/><circle cx="172" cy="128" r="20"/><circle cx="84" cy="128" r="20"/></svg>
        </div>
        <h2 className="text-3xl font-bold mb-3">Video Playback Error</h2>
        <p className="text-gray-700 dark:text-gray-300 max-w-md mb-2">
          {error || "We couldn't load the video due to an unexpected issue."}
        </p>
        <Link
          to="/"
          className="mt-8 px-8 py-3 bg-youtube-red text-white font-semibold rounded-full hover:bg-red-700 transition-colors duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Back to Home
        </Link>
      </div>
    );
  }
  
  // If still loading OR if video is null after loading (and no error that should show the full error page)
  // This case should ideally not be hit if fallback logic is robust.
  if (!video) {
     return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-128px)] text-center p-6">
        <p>Preparing video...</p> {/* Simplified message if video is unexpectedly null without error */}
      </div>
     );
  }

  // If video is loaded (either actual or fallback), render the main content
  return (
    <VideoContentErrorBoundary>
      <div className="container mx-auto px-4 py-6 max-w-screen-2xl">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Video Player and Info Column */}
          <div className="lg:w-2/3 xl:w-3/4">
            {/* Video Player */}
            <div className="relative pt-[56.25%] bg-black rounded-xl overflow-hidden shadow-lg">
              {video.videoUrl && (video.videoUrl.includes("youtube.com") || video.videoUrl.includes("youtu.be")) ? (
                <ReactPlayer
                  url={video.videoUrl}
                  width="100%"
                  height="100%"
                  className="absolute top-0 left-0"
                  controls={true}
                  playing={true}
                  config={{
                    youtube: {
                      playerVars: { showinfo: 0, modestbranding: 1, rel: 0 }
                    }
                  }}
                />
              ) : (
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 text-white">
                  Invalid video URL.
                </div>
              )}
            </div>

            {/* Video Title */}
            <h1 className="text-xl md:text-2xl font-bold mt-4 text-gray-900 dark:text-white">{video.title || "Untitled Video"}</h1>

            {/* Video Info and Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mt-4 pb-4 border-b border-gray-200 dark:border-gray-700">
              {/* View Info */}
              <div className="text-gray-700 dark:text-gray-400 text-sm">
                <span>{formatCount(video.viewCount)} views</span>
                <span className="mx-2">•</span>
                <span>{formatPublishedDate(video.publishedAt)}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 sm:space-x-4 mt-4 md:mt-0">
                <button className="flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-full text-sm text-gray-700 dark:text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><path d="M32,104H80a0,0,0,0,1,0,0V208a0,0,0,0,1,0,0H32a8,8,0,0,1-8-8V112A8,8,0,0,1,32,104Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M80,104l40-80a32,32,0,0,1,32,32V80h64a16,16,0,0,1,15.87,18l-12,96A16,16,0,0,1,204,208H80" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                  <span>{formatCount(video.likeCount)}</span>
                </button>
                <button className="flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-full text-sm text-gray-700 dark:text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><path d="M32,48H80a0,0,0,0,1,0,0V152a0,0,0,0,1,0,0H32a8,8,0,0,1-8-8V56a8,8,0,0,1,8-8Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M80,152l40,80a32,32,0,0,0,32-32V176h64a16,16,0,0,0,15.87-18l-12-96A16,16,0,0,0,204,48H80" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                </button>
                <button className="flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-full text-sm text-gray-700 dark:text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polyline points="96 112 96 160 144 160" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="160" y1="96" x2="96" y2="160" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                  <span>Share</span>
                </button>
                <button className="flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-full text-sm text-gray-700 dark:text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><line x1="40" y1="64" x2="216" y2="64" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="40" y1="128" x2="156" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="40" y1="192" x2="108" y2="192" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="176" cy="192" r="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polyline points="200 192 200 112 240 124" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                  <span>Save</span>
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><path d="M40,156H76.69a8,8,0,0,1,5.65,2.34l19.32,19.32a8,8,0,0,0,5.65,2.34h41.38a8,8,0,0,0,5.65-2.34l19.32-19.32a8,8,0,0,1,5.65-2.34H216" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><rect x="40" y="40" width="176" height="176" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="128" y1="76" x2="128" y2="140" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polyline points="96 108 128 140 160 108" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                </button>
              </div>
            </div>

            {/* Channel Info and Subscribe */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <Link to={`/channel/${video.channelId}`} className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-3 bg-gray-200 dark:bg-gray-700">
                    <img src={video.channelAvatar || "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200"} alt={`${video.channelTitle || "Channel"} avatar`} className="w-full h-full object-cover" />
                  </div>
                </Link>
                <div className="flex-1">
                  <Link to={`/channel/${video.channelId}`}>
                    <h3 className="font-bold text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300">{video.channelTitle || "Unknown Channel"}</h3>
                  </Link>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{formatCount(video.subscriberCount)} subscribers</p>
                </div>
              </div>

              <button
                onClick={() => setIsSubscribed(!isSubscribed)}
                className={`mt-4 sm:mt-0 px-4 py-2 rounded-full font-medium transition-colors duration-200 ${isSubscribed
                    ? "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200"
                    : "bg-youtube-red hover:bg-red-700 text-white"
                  }`}
              >
                {isSubscribed ? "Subscribed" : "Subscribe"}
              </button>
            </div>

            {/* Video Description */}
            <div className="py-4 bg-gray-50 dark:bg-gray-800 rounded-xl mt-4 p-4 text-sm text-gray-800 dark:text-gray-200">
              <div className={`whitespace-pre-wrap ${!showFullDescription ? "line-clamp-3" : ""}`}>
                {video.description || "No description available."}
              </div>
              {(video.description && video.description.split("\n").length > 3) && (
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="mt-2 font-medium hover:text-black dark:hover:text-white text-gray-600 dark:text-gray-400"
                >
                  {showFullDescription ? "Show less" : "Show more"}
                </button>
              )}
            </div>

            {/* Comments Section */}
            <Comments videoId={video.id || FALLBACK_VIDEO_ID} />
          </div>

          {/* Suggested Videos Column */}
          <div className="lg:w-1/3 xl:w-1/4">
            <VideoSuggestions currentVideoId={video.id || FALLBACK_VIDEO_ID} />
          </div>
        </div>
      </div>
    </VideoContentErrorBoundary>
  );
};

export default VideoDetail;