import React, { useState, useEffect, useMemo } from "react";
import VideoCard from "./VideoCard";
import CategoryBar from "./CategoryBar";

// Define mockVideos outside the component for stability, or useMemo if it needs to be dynamic based on props/state not affecting fetch
const MOCK_VIDEOS_DATA = [
  {
    id: "1",
    title: "Building a Modern React Application from Scratch",
    thumbnail: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
    channelTitle: "Code Masters",
    channelAvatar: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
    views: 250000,
    publishedAt: "2023-08-15T14:30:00Z",
    duration: "15:30"
  },
  {
    id: "2",
    title: "Amazing Travel Destinations You Must Visit in 2024",
    thumbnail: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
    channelTitle: "Travel Explorers",
    channelAvatar: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
    views: 750000,
    publishedAt: "2023-08-14T10:00:00Z",
    duration: "21:45"
  },
  {
    id: "3",
    title: "Quick and Easy Healthy Breakfast Ideas",
    thumbnail: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
    channelTitle: "Healthy Cooking",
    channelAvatar: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
    views: 425000,
    publishedAt: "2023-08-13T08:15:00Z",
    duration: "12:20"
  },
  {
    id: "4",
    title: "Advanced Guitar Techniques for Beginners",
    thumbnail: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
    channelTitle: "Music Masters",
    channelAvatar: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
    views: 180000,
    publishedAt: "2023-08-12T16:45:00Z",
    duration: "18:15"
  },
  {
    id: "5",
    title: "Latest Tech Gadgets Review 2024",
    thumbnail: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
    channelTitle: "Tech Review Pro",
    channelAvatar: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
    views: 890000,
    publishedAt: "2023-08-11T13:20:00Z",
    duration: "25:10"
  },
  {
    id: "6",
    title: "Home Workout: Full Body in 30 Minutes",
    thumbnail: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
    channelTitle: "Fitness Zone",
    channelAvatar: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
    views: 620000,
    publishedAt: "2023-08-10T09:30:00Z",
    duration: "31:45"
  },
  {
    id: "7",
    title: "Exploring the Deep Sea: Mysteries Unveiled",
    thumbnail: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
    channelTitle: "Ocean Wonders",
    channelAvatar: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
    views: 1200000,
    publishedAt: "2023-09-01T11:00:00Z",
    duration: "22:18"
  },
  {
    id: "8",
    title: "The Art of Digital Painting: Beginner to Pro",
    thumbnail: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
    channelTitle: "Artistic Creations",
    channelAvatar: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
    views: 350000,
    publishedAt: "2023-09-05T18:00:00Z",
    duration: "35:50"
  }
];

const VideoCardSkeleton = () => (
  <div className="flex flex-col w-full animate-pulse">
    {/* Thumbnail Container */}
    <div className="relative w-full">
      <div className="aspect-w-16 aspect-h-9 rounded-xl bg-gray-300"></div>
      {/* Duration Badge */}
      <div className="absolute bottom-2 right-2 bg-gray-400 text-transparent text-xs px-2 py-1 rounded w-12 h-5"></div>
    </div>

    {/* Video Info Container */}
    <div className="flex mt-3 space-x-3">
      {/* Channel Avatar */}
      <div className="flex-shrink-0">
        <div className="w-9 h-9 rounded-full bg-gray-300"></div>
      </div>

      {/* Title and Metadata */}
      <div className="flex-1 space-y-2 py-1">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="flex items-center space-x-2 pt-1">
          <div className="h-3 bg-gray-300 rounded w-1/4"></div>
          <div className="h-3 bg-gray-300 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  </div>
);

const Feed = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Memoize mockVideos to ensure stability if it were dynamic or props-based
  // For truly static data, defining outside the component is sufficient
  const mockVideos = useMemo(() => MOCK_VIDEOS_DATA, []);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        setError(null); // Reset error state on new fetch
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // In a real app, you would filter based on selectedCategory here
        // For this mock, we'll just use the full list or simulate filtering
        if (selectedCategory === "all") {
          setVideos(mockVideos);
        } else {
          // Simulate filtering - replace with actual API call logic
          const filteredVideos = mockVideos.filter(video => 
            video.title.toLowerCase().includes(selectedCategory.toLowerCase()) || 
            video.channelTitle.toLowerCase().includes(selectedCategory.toLowerCase())
          );
          setVideos(filteredVideos.length > 0 ? filteredVideos : mockVideos.slice(0,4)); // Show some if filter yields empty
        }

      } catch (err) {
        console.error("Failed to load videos:", err);
        setError("Failed to load videos. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [selectedCategory, mockVideos]); // mockVideos is stable due to useMemo or being outside


  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <CategoryBar 
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />
        <div className="flex flex-col items-center justify-center flex-grow text-center px-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="48" height="48" className="text-red-500 mb-4"><rect width="256" height="256" fill="none"/><path d="M142.41,40.22l87.46,151.87C236,202.79,228.08,216,215.46,216H40.54C27.92,216,20,202.79,26.13,192.09L113.59,40.22C119.89,29.26,136.11,29.26,142.41,40.22Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><line x1="128" y1="136" x2="128" y2="104" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><circle cx="128" cy="176" r="16"/></svg>
            <p className="text-gray-700 text-lg font-medium">Oops! Something went wrong.</p>
            <p className="text-gray-600 mt-1">{error}</p>
            <button 
              onClick={() => setSelectedCategory(prev => prev)} // Re-trigger fetch
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
            >
              Try Again
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Category Filter Bar */}
      <CategoryBar 
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />

      {/* Videos Grid or Skeletons */}
      <div className="container mx-auto px-4 py-6">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <VideoCardSkeleton key={index} />
            ))}
          </div>
        ) : videos.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-gray-600">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="64" height="64" className="mb-4 text-gray-400"><rect width="256" height="256" fill="none"/><rect x="48" y="120" width="88" height="88" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><path d="M208,188v12a8,8,0,0,1-8,8H180" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><line x1="208" y1="116" x2="208" y2="140" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><path d="M184,48h16a8,8,0,0,1,8,8V72" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><line x1="116" y1="48" x2="140" y2="48" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><path d="M48,76V56a8,8,0,0,1,8-8H68" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/></svg>
            <h2 className="text-xl font-medium">No videos found</h2>
            <p className="mt-2">Try selecting a different category or check back later.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {videos.map(video => (
                <div key={video.id} className="flex flex-col">
                  <VideoCard video={video} />
                </div>
              ))}
            </div>
            {/* Load More Button (Placeholder) */}
            {videos.length > 0 && ( /* Only show if there are videos */
                <div className="flex justify-center mt-8">
                <button 
                    className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full font-medium transition-colors duration-200"
                    onClick={() => {/* Handle load more */}}
                >
                    Load more
                </button>
                </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Feed;