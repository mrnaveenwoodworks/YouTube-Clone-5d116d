import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const VideoSuggestions = ({ currentVideoId }) => {
  const [suggestedVideos, setSuggestedVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for suggested videos
  const mockSuggestedVideos = [
    {
      id: "s1",
      title: "10 JavaScript Features You Might Not Know About",
      thumbnail: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
      channelTitle: "Code Masters",
      channelAvatar: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
      views: 420000,
      publishedAt: "2023-07-15T14:30:00Z"
    },
    {
      id: "s2",
      title: "How to Build a Full Stack App with React and Node.js",
      thumbnail: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
      channelTitle: "Web Dev Simplified",
      channelAvatar: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
      views: 890000,
      publishedAt: "2023-06-22T09:15:00Z"
    },
    {
      id: "s3",
      title: "Learn Tailwind CSS in 20 Minutes",
      thumbnail: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
      channelTitle: "CSS Wizards",
      channelAvatar: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
      views: 350000,
      publishedAt: "2023-08-05T11:45:00Z"
    },
    {
      id: "s4",
      title: "React Performance Optimization Tips",
      thumbnail: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
      channelTitle: "React Masters",
      channelAvatar: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
      views: 520000,
      publishedAt: "2023-07-28T16:20:00Z"
    },
    {
      id: "s5",
      title: "Building Responsive UIs with Flexbox and Grid",
      thumbnail: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
      channelTitle: "Frontend Focus",
      channelAvatar: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
      views: 275000,
      publishedAt: "2023-08-10T13:10:00Z"
    },
    {
      id: "s6",
      title: "TypeScript for JavaScript Developers",
      thumbnail: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
      channelTitle: "TS Tutorials",
      channelAvatar: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
      views: 680000,
      publishedAt: "2023-07-02T10:30:00Z"
    },
    {
      id: "s7",
      title: "State Management in React: Context API vs Redux",
      thumbnail: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
      channelTitle: "React Experts",
      channelAvatar: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
      views: 430000,
      publishedAt: "2023-08-18T15:45:00Z"
    },
    {
      id: "s8",
      title: "Building a YouTube Clone with React - Full Tutorial",
      thumbnail: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
      channelTitle: "Coding Tutorials",
      channelAvatar: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
      views: 920000,
      publishedAt: "2023-06-14T09:00:00Z"
    }
  ];

  useEffect(() => {
    // Simulate API call to fetch suggested videos
    const fetchSuggestedVideos = async () => {
      try {
        setLoading(true);
        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Filter out current video if it's in the suggested list
        const filteredVideos = mockSuggestedVideos.filter(
          video => video.id !== currentVideoId
        );
        
        setSuggestedVideos(filteredVideos);
      } catch (error) {
        console.error("Error fetching suggested videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestedVideos();
  }, [currentVideoId]);

  // Format view counts to K, M format
  const formatViews = (views) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views;
  };

  // Format publish date to relative time
  const formatPublishDate = (dateString) => {
    const now = new Date();
    const publishDate = new Date(dateString);
    const diffTime = Math.abs(now - publishDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 1) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  if (loading) {
    return (
      <div className="flex flex-col space-y-4 p-2">
        {[1, 2, 3, 4].map((index) => (
          <div key={index} className="flex space-x-2 animate-pulse">
            <div className="bg-gray-200 rounded-md w-40 h-20"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-3">
      <h3 className="font-medium text-lg pl-2">Suggested videos</h3>
      
      {suggestedVideos.map((video) => (
        <Link 
          key={video.id} 
          to={`/video/${video.id}`}
          className="flex space-x-2 hover:bg-gray-100 rounded-lg p-2 transition-colors duration-200"
        >
          {/* Thumbnail */}
          <div className="flex-shrink-0 w-40 h-20 relative rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200"
              alt={video.title} 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Video Info */}
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm line-clamp-2">{video.title}</h4>
            <p className="text-xs text-gray-600 mt-1">{video.channelTitle}</p>
            <div className="text-xs text-gray-600 flex items-center">
              <span>{formatViews(video.views)} views</span>
              <span className="mx-1">•</span>
              <span>{formatPublishDate(video.publishedAt)}</span>
            </div>
          </div>
        </Link>
      ))}

      {/* More from this channel section */}
      <div className="pt-4 border-t border-gray-200 mt-2">
        <h3 className="font-medium mb-3 pl-2">More from this channel</h3>
        {suggestedVideos.slice(0, 3).map((video) => (
          <Link 
            key={`channel-${video.id}`} 
            to={`/video/${video.id}`}
            className="flex space-x-2 hover:bg-gray-100 rounded-lg p-2 transition-colors duration-200"
          >
            {/* Thumbnail */}
            <div className="flex-shrink-0 w-40 h-20 relative rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200"
                alt={video.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Video Info */}
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm line-clamp-2">{video.title}</h4>
              <div className="text-xs text-gray-600 flex items-center">
                <span>{formatViews(video.views)} views</span>
                <span className="mx-1">•</span>
                <span>{formatPublishDate(video.publishedAt)}</span>
              </div>
            </div>
          </Link>
        ))}

        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium mt-2 pl-2">
          Show more
        </button>
      </div>
    </div>
  );
};

export default VideoSuggestions;