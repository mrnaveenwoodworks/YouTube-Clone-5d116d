import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import VideoCard from "./VideoCard";
import { searchVideos } from "../utils/api"; // Correctly imports searchVideos
import { format } from "date-fns";

// Helper function for formatting views
const formatViewsHelper = (views) => {
  if (views === undefined || views === null) return "0";
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`;
  } else if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`;
  }
  return views.toString();
};

// Helper function for formatting dates
const formatDateHelper = (dateString) => {
  if (!dateString) return "";
  try {
    return format(new Date(dateString), "MMM d, yyyy");
  } catch (error) {
    console.error("Error formatting date:", dateString, error);
    return "Invalid date";
  }
};

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const query = searchParams.get("q");

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setVideos([]);
        setLoading(false);
        setError(null); // Clear any previous errors
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const results = await searchVideos(query);
        setVideos(results);
      } catch (err) {
        console.error("Failed to fetch search results:", err);
        setError(err.message || "Failed to load search results. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-128px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-youtube-red"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-128px)]">
        <div className="text-center p-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="48" height="48" className="mx-auto mb-2"><rect width="256" height="256" fill="none"/><path d="M142.41,40.22l87.46,151.87C236,202.79,228.08,216,215.46,216H40.54C27.92,216,20,202.79,26.13,192.09L113.59,40.22C119.89,29.26,136.11,29.26,142.41,40.22Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><line x1="128" y1="136" x2="128" y2="104" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><circle cx="128" cy="176" r="16"/></svg>
          <p className="text-gray-700 mt-4 text-lg">Oops! Something went wrong.</p>
          <p className="text-gray-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (!query && videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-128px)] text-gray-600 px-4 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="64" height="64" className="mb-4 text-gray-400"><rect width="256" height="256" fill="none"/><circle cx="112" cy="112" r="80" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><line x1="168.57" y1="168.57" x2="224" y2="224" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/></svg>
        <h2 className="text-xl font-medium">Search YouTube</h2>
        <p className="mt-2">Find your favorite videos by typing in the search bar above.</p>
      </div>
    );
  }
  
  if (videos.length === 0 && query) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-128px)] px-4 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="64" height="64" className="mb-4 text-gray-400"><rect width="256" height="256" fill="none"/><rect x="48" y="120" width="88" height="88" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><path d="M208,188v12a8,8,0,0,1-8,8H180" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><line x1="208" y1="116" x2="208" y2="140" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><path d="M184,48h16a8,8,0,0,1,8,8V72" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><line x1="116" y1="48" x2="140" y2="48" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><path d="M48,76V56a8,8,0,0,1,8-8H68" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/></svg>
        <h2 className="text-xl font-medium mt-4">No results found for "{query}"</h2>
        <p className="text-gray-600 mt-2">Try different keywords or check your spelling.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-xl font-medium">Search results for "{query}"</h1>
        <p className="text-gray-600 mt-1">{videos.length} results</p>
      </div>

      <div className="grid gap-x-4 gap-y-6">
        {/* Filters Section */}
        <div className="col-span-full mb-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {["All", "Videos", "Channels", "Playlists", "Live"].map((filter) => (
              <button
                key={filter}
                className="px-4 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-sm whitespace-nowrap"
                // onClick={() => {/* Handle filter logic */}}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Search Results List - Using a list-style view */}
        <div className="space-y-4">
          {videos.map((video) => (
            <div key={video.id} className="flex flex-col sm:flex-row gap-4 hover:bg-gray-50 p-2 rounded-lg transition-colors">
              <div className="w-full sm:w-60 md:w-72 lg:w-80 flex-shrink-0">
                <VideoCard video={video} /> {/* VideoCard handles its own image placeholders */}
              </div>
              <div className="flex-grow pt-2 sm:pt-0">
                <h3 className="text-lg font-medium line-clamp-2">{video.title}</h3>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <span>{formatViewsHelper(video.views)} views</span>
                  <span className="mx-1">•</span>
                  <span>{formatDateHelper(video.publishedAt)}</span>
                </div>
                <div className="flex items-center mt-3">
                  <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
                    <img 
                      src={video.channelAvatar || "https://images.unsplash.com/photo-1717518211688-b74f08acc8c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDk3MjI5MDF8&ixlib=rb-4.1.0&q=80&w=1080"}
                      alt={`${video.channelTitle || "Channel"} avatar`}
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <span className="ml-2 text-sm text-gray-700 hover:text-black">{video.channelTitle}</span>
                </div>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2 sm:line-clamp-3">{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;