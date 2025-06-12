/**
 * API utility functions for YouTube clone app
 * Handles data fetching, formatting, and caching
 */

// Custom Error Classes
class APIError extends Error {
  constructor(message, statusCode, type = "GenericAPIError") {
    super(message);
    this.name = "APIError";
    this.statusCode = statusCode; // e.g., 500, 400
    this.type = type; // e.g., "NetworkError", "NotFoundError", "InvalidRequestError"
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, APIError);
    }
  }
}

class NotFoundError extends APIError {
  constructor(message = "Resource not found.") {
    super(message, 404, "NotFoundError");
    this.name = "NotFoundError";
  }
}

class InvalidRequestError extends APIError {
  constructor(message = "Invalid request.") {
    super(message, 400, "InvalidRequestError");
    this.name = "InvalidRequestError";
  }
}

// Base YouTube-like API URL - in a real app, use actual YouTube API or alternative
const API_BASE_URL = "https://api.example.com/v1";

// Mock API key - in a real app, this would be stored securely
const API_KEY = "YOUR_API_KEY";

// Default fallback video URL
export const DEFAULT_VIDEO_URL = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
const DEFAULT_VIDEO_ID = "dQw4w9WgXcQ"; // Extracted from DEFAULT_VIDEO_URL

/**
 * Simulates network delay for mock data.
 * @param {number} ms - Milliseconds to delay.
 * @returns {Promise<void>} - Promise that resolves after delay.
 */
const simulateNetworkDelay = (ms = 600) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// --- MOCK DATA ---
const MOCK_VIDEO_DATABASE = [
  {
    id: "video1",
    title: "React Hooks Complete Tutorial",
    description: "Learn all about React Hooks in this comprehensive guide. This video covers useState, useEffect, useContext, useReducer, useCallback, useMemo, useRef, and custom hooks. Perfect for beginners and intermediate developers looking to deepen their understanding of React.",
    thumbnail: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
    channelTitle: "CodeMastery",
    channelId: "channel1",
    channelAvatar: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
    views: 1250000,
    likeCount: 45000,
    publishedAt: "2023-04-15T14:30:00Z",
    duration: "PT27M35S", // ISO 8601 duration
    category: "coding",
    videoUrl: "https://www.youtube.com/watch?v=video1"
  },
  {
    id: "video2",
    title: "Beautiful Places to Visit in Japan",
    description: "Discover the most scenic locations across Japan. From the bustling streets of Tokyo to the serene temples of Kyoto, and the natural beauty of Hokkaido. This travel guide showcases must-see destinations.",
    thumbnail: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
    channelTitle: "Travel Essence",
    channelId: "channel2",
    channelAvatar: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
    views: 2450000,
    likeCount: 187000,
    publishedAt: "2023-05-22T10:15:00Z",
    duration: "PT15M42S",
    category: "travel",
    videoUrl: "https://www.youtube.com/watch?v=video2"
  },
  {
    id: "video3",
    title: "Modern JavaScript ES6+ Features",
    description: "Deep dive into the most useful ES6+ features every developer should know. Covers arrow functions, destructuring, template literals, promises, async/await, modules, and more.",
    thumbnail: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
    channelTitle: "JS Wizards",
    channelId: "channel3",
    channelAvatar: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
    views: 890000,
    likeCount: 62000,
    publishedAt: "2023-06-10T08:45:00Z",
    duration: "PT19M15S",
    category: "coding",
    videoUrl: "https://www.youtube.com/watch?v=video3"
  },
  {
    id: "video4",
    title: "Easy 30-Minute Dinner Recipes",
    description: "Quick and delicious meals you can prepare in under 30 minutes. Perfect for busy weeknights. Includes recipes for pasta, chicken, and vegetarian options.",
    thumbnail: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
    channelTitle: "Tasty Bites",
    channelId: "channel4",
    channelAvatar: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
    views: 1750000,
    likeCount: 120000,
    publishedAt: "2023-07-05T16:20:00Z",
    duration: "PT12M50S",
    category: "cooking",
    videoUrl: "https://www.youtube.com/watch?v=video4"
  },
  {
    id: "video5",
    title: "Building a YouTube Clone with React",
    description: "Step-by-step guide to build a YouTube clone using React and modern web technologies. Covers component structure, API integration, state management, and styling with Tailwind CSS.",
    thumbnail: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
    channelTitle: "Web Dev Simplified",
    channelId: "channel5",
    channelAvatar: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
    views: 980000,
    likeCount: 85000,
    publishedAt: "2023-08-01T12:30:00Z",
    duration: "PT45M20S",
    category: "coding",
    videoUrl: "https://www.youtube.com/watch?v=video5"
  },
  {
    id: "video6",
    title: "Advanced CSS Grid Layout Techniques",
    description: "Explore complex layouts and advanced features of CSS Grid. Learn about fr units, minmax(), auto-fit, auto-fill, and responsive design with Grid.",
    thumbnail: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
    channelTitle: "CSS Masters",
    channelId: "channel6",
    channelAvatar: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
    views: 650000,
    likeCount: 32000,
    publishedAt: "2023-09-10T11:00:00Z",
    duration: "PT22M10S",
    category: "coding",
    videoUrl: "https://www.youtube.com/watch?v=video6"
  },
  {
    id: "video7",
    title: "Exploring the Wonders of Patagonia",
    description: "A breathtaking journey through the landscapes of Patagonia. Glaciers, mountains, and unique wildlife in one of the world's most remote regions.",
    thumbnail: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
    channelTitle: "Adventure Vistas",
    channelId: "channel7",
    channelAvatar: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
    views: 1100000,
    likeCount: 95000,
    publishedAt: "2023-10-02T18:30:00Z",
    duration: "PT18M05S",
    category: "travel",
    videoUrl: "https://www.youtube.com/watch?v=video7"
  }
];

const getDefaultVideoData = () => {
    return {
      id: DEFAULT_VIDEO_ID,
      title: "Content Not Available - Enjoy this classic!",
      videoUrl: DEFAULT_VIDEO_URL,
      thumbnail: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
      channelTitle: "Fallback Channel",
      channelAvatar: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
      description: "The requested video could not be found. Please enjoy this fallback content while we figure things out! #fallback #classic #notfound",
      viewCount: Math.floor(Math.random() * 1000) + 500, // Add some base views
      likeCount: Math.floor(Math.random() * 100) + 50,
      publishedAt: new Date(Date.now() - 86400000 * Math.floor(Math.random() * 90 + 30)).toISOString(), // Random date in last 30-120 days
      subscriberCount: Math.floor(Math.random() * 10000) + 1000,
      channelId: "fallbackChannel123",
      commentCount: Math.floor(Math.random() * 20),
      duration: formatDuration("PT3M32S"), // Assuming a fixed duration for the fallback, e.g., 3:32
      category: "music", // Fallback category
    };
};


export const fetchVideos = async ({ query = "", category = "all", maxResults = 20 } = {}) => {
  try {
    await simulateNetworkDelay();
    
    let filteredVideos = [...MOCK_VIDEO_DATABASE];
    
    if (query) {
      const lowerQuery = query.toLowerCase();
      filteredVideos = filteredVideos.filter(
        video => 
          video.title.toLowerCase().includes(lowerQuery) ||
          (video.description && video.description.toLowerCase().includes(lowerQuery)) ||
          video.channelTitle.toLowerCase().includes(lowerQuery)
      );
    }
    
    if (category && category !== "all") {
      filteredVideos = filteredVideos.filter(
        video => video.category === category
      );
    }
    
    return shuffleArray(filteredVideos).slice(0, maxResults).map(v => ({...v, duration: formatDuration(v.duration)}));

  } catch (error) {
    console.error("Error fetching videos:", error);
    if (error instanceof APIError) {
        throw error;
    }
    throw new APIError(`Failed to fetch videos. ${error.message}`, 500, "FetchListError");
  }
};

export const searchVideos = async (query, { maxResults = 20, category = "all" } = {}) => {
  try {
    // searchVideos primarily relies on fetchVideos for its mock implementation
    return await fetchVideos({ query, category, maxResults });
  } catch (error) {
    console.error(`Error searching videos for query "${query}":`, error);
    // If fetchVideos throws a custom error, re-throw it. Otherwise, wrap.
    if (error instanceof APIError) {
        throw error;
    }
    throw new APIError(`Search failed for query "${query}". ${error.message}`, 500, "SearchError");
  }
};

export const fetchVideoById = async (videoId) => {
  if (!videoId) {
    console.warn("Video ID is required, returning default video data.");
    return getDefaultVideoData();
  }
  try {
    await simulateNetworkDelay();
    const video = MOCK_VIDEO_DATABASE.find(v => v.id === videoId);
    
    if (!video) {
      console.warn(`Video with ID "${videoId}" not found, returning default video data.`);
      return getDefaultVideoData();
    }
    
    // Ensure all necessary fields are present and formatted, similar to getDefaultVideoData structure
    return {
      id: video.id,
      title: video.title,
      description: video.description || "No description available.",
      thumbnail: video.thumbnail || "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
      channelTitle: video.channelTitle,
      channelId: video.channelId,
      channelAvatar: video.channelAvatar || "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
      views: video.views, // ensure 'views' is the field name if that's what VideoDetail expects, or map from viewCount
      viewCount: video.views, // keeping both for safety if different components use different names
      likeCount: video.likeCount,
      publishedAt: video.publishedAt,
      duration: formatDuration(video.duration),
      category: video.category,
      videoUrl: video.videoUrl || `https://www.youtube.com/watch?v=${video.id}`,
      commentCount: Math.floor((video.views || 0) * 0.0025) + Math.floor(Math.random() * 100),
      subscriberCount: Math.floor(Math.random() * 1500000) + 200000,
    };

  } catch (error) { // Catching non-NotFoundError or other unexpected errors
    console.error(`Error fetching video ${videoId}:`, error);
    if (error instanceof APIError) { // Re-throw other API errors
      throw error;
    }
    // For truly unexpected errors, wrap it or return default to prevent app crash
    console.warn(`Unexpected error fetching video ${videoId}, returning default. Error: ${error.message}`);
    return getDefaultVideoData();
  }
};

export const fetchComments = async (videoId, maxResults = 20) => {
  if (!videoId) {
    const errMsg = "Video ID is required for fetching comments.";
    console.error(errMsg);
    throw new InvalidRequestError(errMsg);
  }
  try {
    await simulateNetworkDelay(800);
    // Example of simulating a specific failure for a videoId
    if (videoId === "non_existent_video_for_comments") {
        throw new NotFoundError(`Comments not found; video ID "${videoId}" may be invalid or have no comments.`);
    }
    return getMockComments(videoId, maxResults);
  } catch (error) {
    console.error(`Error fetching comments for video ${videoId}:`, error);
    if (error instanceof APIError || error instanceof NotFoundError) throw error;
    throw new APIError(`Failed to fetch comments for video ${videoId}. ${error.message}`, 500, "FetchCommentsError");
  }
};

export const fetchChannelDetails = async (channelId) => {
  if (!channelId) {
    const errMsg = "Channel ID is required.";
    console.error(errMsg);
    throw new InvalidRequestError(errMsg);
  }
  try {
    await simulateNetworkDelay();
    const channel = getMockChannelDetails(channelId); // Assume this can return null/undefined if not found
    if (!channel) {
        throw new NotFoundError(`Channel with ID "${channelId}" not found.`);
    }
    return channel;
  } catch (error) {
    console.error(`Error fetching channel ${channelId}:`, error);
    if (error instanceof NotFoundError || error instanceof APIError) throw error;
    throw new APIError(`Failed to fetch channel details for ID ${channelId}. ${error.message}`, 500, "FetchChannelError");
  }
};

export const fetchRelatedVideos = async (videoId, maxResults = 10) => {
  if (!videoId) {
    const errMsg = "Video ID is required for fetching related videos.";
    console.error(errMsg);
    throw new InvalidRequestError(errMsg);
  }
  try {
    await simulateNetworkDelay(700);
    // Check if the source video exists, otherwise related videos make less sense or might indicate an issue
    const sourceVideoExists = MOCK_VIDEO_DATABASE.some(v => v.id === videoId);
    if (!sourceVideoExists && videoId !== DEFAULT_VIDEO_ID) { // Allow fallback video to have related videos
        throw new NotFoundError(`Cannot fetch related videos: Source video with ID "${videoId}" not found.`);
    }
    return getMockRelatedVideos(videoId, maxResults);
  } catch (error) {
    console.error(`Error fetching related videos for ${videoId}:`, error);
    if (error instanceof APIError || error instanceof NotFoundError) throw error;
    throw new APIError(`Failed to fetch related videos for ${videoId}. ${error.message}`, 500, "FetchRelatedError");
  }
};

export const postComment = async (videoId, text, user) => {
  if (!videoId || !text || !user) {
    const errMsg = "Video ID, comment text, and user info are required.";
    console.error(errMsg);
    throw new InvalidRequestError(errMsg);
  }
  try {
    await simulateNetworkDelay(500);
    // Example: Simulate failure if video doesn't exist for commenting
    const videoExists = MOCK_VIDEO_DATABASE.some(v => v.id === videoId) || videoId === DEFAULT_VIDEO_ID;
    if (!videoExists) {
        throw new NotFoundError(`Cannot post comment: Video with ID "${videoId}" not found.`);
    }
    // Example: Simulate a server-side validation error for comment content
    if (text.toLowerCase().includes("forbidden_word")) {
        throw new APIError("Comment contains forbidden words.", 400, "InvalidCommentContent");
    }
    return createMockComment(videoId, text, user);
  } catch (error) {
    console.error(`Error posting comment to video ${videoId}:`, error);
    if (error instanceof APIError || error instanceof NotFoundError) throw error;
    throw new APIError(`Failed to post comment. ${error.message}`, 500, "PostCommentError");
  }
};

export const fetchSearchSuggestions = async (query, maxResults = 10) => {
  if (!query) {
    return []; // No query means no suggestions, not an error.
  }
  try {
    await simulateNetworkDelay(300);
    return getMockSearchSuggestions(query, maxResults);
  } catch (error) {
    console.error("Error fetching search suggestions:", error);
    // This is less critical, so maybe a softer error or just return empty array
    throw new APIError(`Failed to fetch search suggestions. ${error.message}`, 500, "FetchSuggestionsError");
  }
};


// Helper functions for formatting
export const formatViewCount = (count) => {
  if (count === undefined || count === null) return "No views";
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M views`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K views`;
  return `${count} views`;
};

export const formatPublishedDate = (dateString) => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    const now = new Date();
    const differenceInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (differenceInSeconds < 60) return "just now";
    const differenceInMinutes = Math.floor(differenceInSeconds / 60);
    if (differenceInMinutes < 60) return `${differenceInMinutes} ${differenceInMinutes === 1 ? "minute" : "minutes"} ago`;
    const differenceInHours = Math.floor(differenceInMinutes / 60);
    if (differenceInHours < 24) return `${differenceInHours} ${differenceInHours === 1 ? "hour" : "hours"} ago`;
    const differenceInDays = Math.floor(differenceInHours / 24);
    if (differenceInDays < 7) return `${differenceInDays} ${differenceInDays === 1 ? "day" : "days"} ago`;
    const differenceInWeeks = Math.floor(differenceInDays / 7);
    if (differenceInWeeks < 4) return `${differenceInWeeks} ${differenceInWeeks === 1 ? "week" : "weeks"} ago`;
    const differenceInMonths = Math.floor(differenceInDays / 30);
    if (differenceInMonths < 12) return `${differenceInMonths} ${differenceInMonths === 1 ? "month" : "months"} ago`;
    const differenceInYears = Math.floor(differenceInDays / 365);
    return `${differenceInYears} ${differenceInYears === 1 ? "year" : "years"} ago`;
  } catch (e) {
    return "unknown date";
  }
};

export const formatDuration = (durationInput) => {
  if (!durationInput) return "0:00";
  if (/^(\d+:)?\d{1,2}:\d{2}$/.test(durationInput)) return durationInput; // Already formatted
  const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
  const matches = durationInput.match(regex);
  if (!matches) return "0:00"; // Invalid ISO 8601 duration format
  const hours = parseInt(matches[1] || 0);
  const minutes = parseInt(matches[2] || 0);
  const seconds = parseInt(matches[3] || 0);
  if (hours > 0) return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export const truncateText = (text, maxLength = 100) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength).trim()}...`;
};

// --- MOCK DATA GENERATION HELPERS (Internal) ---
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const getRandomPastDateISO = (maxDays = 365) => {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * maxDays) + 1;
  const pastDate = new Date(now.setDate(now.getDate() - daysAgo));
  return pastDate.toISOString();
};


const getMockComments = (videoId, maxResults = 20) => {
  const baseComments = [
    { idPrefix: "c1", text: "This was incredibly insightful! Thank you for breaking it down so clearly.", user: { name: "Alex Johnson", avatar: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200", isVerified: false }, likes: 152, replies: 2 },
    { idPrefix: "c2", text: "Fantastic content as always! I've learned so much from your channel.", user: { name: "Sarah Williams", avatar: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200", isVerified: true }, likes: 89, replies: 1 },
    { idPrefix: "c3", text: "Your explanations are top-notch. Made a complex topic seem easy. Subscribed!", user: { name: "Michael Chen", avatar: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200", isVerified: false }, likes: 234, replies: 4 },
    { idPrefix: "c4", text: "I've been searching for a clear tutorial on this. This is exactly what I needed. Thank you!", user: { name: "Emma Rodriguez", avatar: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200", isVerified: false }, likes: 75, replies: 0 },
    { idPrefix: "c5", text: "Interesting perspective around the 12:35 mark, though I see it a bit differently. Overall, very informative.", user: { name: "David Thompson", avatar: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200", isVerified: true }, likes: 42, replies: 3 },
    { idPrefix: "c6", text: "Would love a follow-up video on the more advanced aspects of this topic!", user: { name: "Olivia Lee", avatar: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200", isVerified: false }, likes: 102, replies: 0 }
  ];
  
  const generatedComments = [];
  for (let i = 0; i < maxResults; i++) {
    const base = baseComments[i % baseComments.length];
    generatedComments.push({
      id: `${base.idPrefix}_${videoId}_${i}`,
      text: base.text,
      user: {...base.user},
      likes: Math.floor(base.likes * (Math.random() * 0.3 + 0.85)),
      replies: Math.floor(base.replies * (Math.random() * 0.5 + 0.5)),
      timestamp: getRandomPastDateISO(30 + i*5)
    });
  }
  return shuffleArray(generatedComments);
};

const MOCK_CHANNEL_DATABASE = [
    { id: "channel1", title: "CodeMastery", description: "High-quality programming tutorials.", avatar: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200", banner: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200", subscriberCount: 1250000, videoCount: 342, joinDate: "2018-03-15T00:00:00Z", isVerified: true, country: "United States" },
    { id: "channel2", title: "Travel Essence", description: "Exploring the world's beauty.", avatar: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200", banner: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200", subscriberCount: 2450000, videoCount: 180, joinDate: "2017-07-20T00:00:00Z", isVerified: true, country: "Canada" },
    { id: "channel3", title: "JS Wizards", description: "JavaScript tips and tricks.", avatar: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200", banner: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200", subscriberCount: 890000, videoCount: 210, joinDate: "2019-01-10T00:00:00Z", isVerified: false, country: "United Kingdom" },
];

const getMockChannelDetails = (channelId) => {
  // Returns the channel object or undefined if not found
  return MOCK_CHANNEL_DATABASE.find(c => c.id === channelId);
};

const getMockRelatedVideos = (videoId, maxResults = 10) => {
  const currentVideo = MOCK_VIDEO_DATABASE.find(v => v.id === videoId);
  let related = MOCK_VIDEO_DATABASE.filter(video => {
    if (video.id === videoId) return false; // Exclude the current video itself
    if (videoId === DEFAULT_VIDEO_ID) { // For fallback video, show somewhat random videos
        return Math.random() < 0.5;
    }
    if (currentVideo && video.category === currentVideo.category) return true; // Prioritize same category
    return Math.random() < 0.3; // Otherwise, some randomness
  });
  
  return shuffleArray(related).slice(0, maxResults).map(v => ({...v, duration: formatDuration(v.duration)}));
};

const getMockSearchSuggestions = (query, maxResults = 10) => {
  const baseSuggestions = [
    "react tutorial", "javascript for beginners", "tailwind css crash course",
    "best cooking recipes", "travel vlog japan", "how to learn coding",
    "css grid vs flexbox", "python data analysis", "game development basics",
    "AI for programmers", "web design trends 2024", "building a startup"
  ];
  const lowerQuery = query.toLowerCase();
  let matched = baseSuggestions.filter(s => s.toLowerCase().includes(lowerQuery));
  
  // Add some dynamic suggestions based on query
  if (query.length > 2) {
      if (!matched.some(s => s.startsWith(`${query} tutorial`))) matched.push(`${query} tutorial`);
      if (!matched.some(s => s.startsWith(`learn ${query}`))) matched.push(`learn ${query}`);
      if (!matched.some(s => s.startsWith(`best ${query}`))) matched.push(`best ${query} of 2024`);
  }

  matched = [...new Set(matched)]; // Remove duplicates
  return shuffleArray(matched).slice(0, maxResults);
};

const createMockComment = (videoId, text, user) => {
  return {
    id: `comment_new_${Date.now()}_${videoId}`,
    text,
    user: {
      name: user.name || "CurrentUser",
      avatar: user.avatar || "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
      isVerified: user.isVerified || false 
    },
    likes: 0,
    replies: 0,
    timestamp: new Date().toISOString()
  };
};