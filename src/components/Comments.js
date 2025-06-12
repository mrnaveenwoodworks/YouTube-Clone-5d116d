import React, { useState, useEffect, useCallback } from "react";
import { fetchComments, postComment } from "../utils/api";
import LoadingSkeleton from "./LoadingSkeleton";

const Comments = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("newest"); // "newest" or "popular"
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const loadComments = useCallback(async () => {
    if (!videoId) return;
    try {
      setIsLoading(true);
      setError(null);
      const fetchedComments = await fetchComments(videoId);
      // Sort comments based on sortBy (example: newest first by timestamp)
      const sortedComments = fetchedComments.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setComments(sortedComments);
    } catch (err) {
      console.error("Error fetching comments:", err);
      setError(err.message || "Failed to load comments. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [videoId]); // sortBy could be added here if API supports sorting

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // In a real app, the user object would come from context or auth
      const currentUser = {
        name: "Demo User",
        avatar: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
        isVerified: false,
      };
      const submittedComment = await postComment(videoId, newComment, currentUser);
      
      // Prepend the new comment optimistically or after confirmation
      setComments(prevComments => [submittedComment, ...prevComments]);
      setNewComment("");
    } catch (err) {
      console.error("Error posting comment:", err);
      setSubmitError(err.message || "Failed to post comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "just now";
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffSeconds = Math.floor(diffTime / 1000);
    
    if (diffSeconds < 60) return `${diffSeconds}s ago`;
    const diffMinutes = Math.floor(diffSeconds / 60);
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays}d ago`;
    const diffWeeks = Math.floor(diffDays / 7);
    if (diffWeeks < 4) return `${diffWeeks}w ago`;
    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths < 12) return `${diffMonths}mo ago`;
    return `${Math.floor(diffDays / 365)}y ago`;
  };

  const formatNumber = (num) => {
    if (num === undefined || num === null) return "0";
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`; // No decimal for K
    return num.toString();
  };
  
  const handleSortChange = (e) => {
    const newSortBy = e.target.value;
    setSortBy(newSortBy);
    // Re-sort existing comments or re-fetch if API supports sorting
    if (newSortBy === "newest") {
      setComments(prev => [...prev].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
    } else if (newSortBy === "popular") {
      setComments(prev => [...prev].sort((a, b) => (b.likes || 0) - (a.likes || 0)));
    }
  };


  return (
    <div className="mt-6">
      {/* Comments Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
          {isLoading || error ? "Comments" : `${formatNumber(comments.length)} Comments`}
        </h3>
        <div className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20" className="text-gray-600 dark:text-gray-400"><rect width="256" height="256" fill="none"/><line x1="48" y1="128" x2="116" y2="128" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><line x1="48" y1="64" x2="180" y2="64" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><line x1="48" y1="192" x2="100" y2="192" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><polyline points="144 168 184 208 224 168" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><line x1="184" y1="208" x2="184" y2="112" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/></svg>
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="bg-transparent text-sm font-medium text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-0 border-none"
          >
            <option value="newest">Newest first</option>
            <option value="popular">Top comments</option>
          </select>
        </div>
      </div>

      {/* Comment Form */}
      <div className="flex space-x-4 mb-8">
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-200 dark:bg-gray-700">
          <img src="https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200" alt="current user avatar" className="w-full h-full object-cover"/>
        </div>
        <form onSubmit={handleSubmitComment} className="flex-1">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full px-0 py-2 border-b border-gray-300 dark:border-gray-600 bg-transparent focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white"
          />
          {submitError && <p className="text-red-500 text-xs mt-1">{submitError}</p>}
          <div className="flex justify-end space-x-4 mt-2">
            <button
              type="button"
              onClick={() => { setNewComment(""); setSubmitError(null); }}
              className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!newComment.trim() || isSubmitting}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                newComment.trim() && !isSubmitting
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              }`}
            >
              {isSubmitting ? "Commenting..." : "Comment"}
            </button>
          </div>
        </form>
      </div>

      {/* Comments List or Skeletons or Error */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((n) => <LoadingSkeleton key={n} type="commentItem" />)}
        </div>
      ) : error ? (
        <div className="text-center py-8 text-gray-600 dark:text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="48" height="48" className="mx-auto mb-2 fill-current text-red-500"><rect width="256" height="256" fill="none"/><path d="M142.41,40.22l87.46,151.87C236,202.79,228.08,216,215.46,216H40.54C27.92,216,20,202.79,26.13,192.09L113.59,40.22C119.89,29.26,136.11,29.26,142.41,40.22Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/><line x1="128" y1="136" x2="128" y2="104" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/><circle cx="128" cy="176" r="12"/></svg>
          <p className="text-lg font-medium">Oops! Something went wrong.</p>
          <p className="text-sm">{error}</p>
          <button
            onClick={loadComments}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors text-sm"
          >
            Try Again
          </button>
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="48" height="48" className="mx-auto mb-3 fill-current"><rect width="256" height="256" fill="none"/><circle cx="104" cy="120" r="12"/><circle cx="152" cy="120" r="12"/><path d="M105.07,192l16,28a8,8,0,0,0,13.9,0l16-28H216a8,8,0,0,0,8-8V56a8,8,0,0,0-8-8H40a8,8,0,0,0-8,8V184a8,8,0,0,0,8,8Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/></svg>
          <p className="font-medium">No comments yet.</p>
          <p className="text-sm">Be the first to comment!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="flex space-x-4">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-200 dark:bg-gray-700">
                <img src={comment.user.avatar || "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200"} alt={`${comment.user.name} profile`} className="w-full h-full object-cover"/>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h4 className="font-medium text-sm text-gray-900 dark:text-white">{comment.user.name}</h4>
                  {comment.user.isVerified && (
                    <span className="text-blue-500 dark:text-blue-400">
                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="14" height="14" className="fill-current"><rect width="256" height="256" fill="none"/><path d="M225,102.85l-20.33,14.59a8,8,0,0,0-3.07,8.36l6.43,23.22a8,8,0,0,1-11.32,8.63L174.2,147.2a8.08,8.08,0,0,0-8.4,0l-22.51,10.45a8,8,0,0,1-11.32-8.63l6.43-23.22a8,8,0,0,0-3.07-8.36L115,102.85a8,8,0,0,1,4.12-13.48L143,85.13a8,8,0,0,0,7-4.31l8.79-22.39a8,8,0,0,1,14.38,0l8.79,22.39a8,8,0,0,0,7,4.31l23.84,4.24A8,8,0,0,1,225,102.85Z" opacity="0.2"/><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm51.46,94.36-23.84-4.24a16.09,16.09,0,0,0-14.05,8.62l-8.79,22.39a16,16,0,0,0-28.76,0l-8.79-22.39a16.09,16.09,0,0,0-14.05-8.62l-23.84,4.24A16.07,16.07,0,0,0,48,131.15l20.33-14.59a16,16,0,0,0,6.14-16.72l-6.43-23.22a16,16,0,0,0,22.64-17.26l22.51-10.45a16.07,16.07,0,0,0,16.8,0l22.51,10.45a16,16,0,0,0,22.64,17.26l-6.43,23.22a16,16,0,0,0,6.14,16.72L208,131.15A16.07,16.07,0,0,0,179.46,118.36Z"/><polyline points="104 128 120 144 152 112" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/></svg>
                    </span>
                  )}
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatTimestamp(comment.timestamp)}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{comment.text}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <button className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-xs">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16" className="fill-current"><rect width="256" height="256" fill="none"/><path d="M32,104H80a0,0,0,0,1,0,0V208a0,0,0,0,1,0,0H32a8,8,0,0,1-8-8V112A8,8,0,0,1,32,104Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/><path d="M80,104l40-80a32,32,0,0,1,32,32V80h64a16,16,0,0,1,15.87,18l-12,96A16,16,0,0,1,204,208H80" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/></svg>
                    <span>{formatNumber(comment.likes)}</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-xs">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16" className="fill-current transform scale-y-[-1]"><rect width="256" height="256" fill="none"/><path d="M32,104H80a0,0,0,0,1,0,0V208a0,0,0,0,1,0,0H32a8,8,0,0,1-8-8V112A8,8,0,0,1,32,104Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/><path d="M80,104l40-80a32,32,0,0,1,32,32V80h64a16,16,0,0,1,15.87,18l-12,96A16,16,0,0,1,204,208H80" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/></svg>
                  </button>
                  <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-xs font-medium">
                    Reply
                  </button>
                  {comment.replies > 0 && (
                    <button className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500 text-xs font-medium">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16" className="fill-current"><rect width="256" height="256" fill="none"/><path d="M40,176V56a8,8,0,0,1,8-8H208a8,8,0,0,1,8,8V176a8,8,0,0,1-8,8H172.69l-18.17,27.25a8,8,0,0,1-13.04,0L123.31,184H48A8,8,0,0,1,40,176Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/><circle cx="104" cy="124" r="12"/><circle cx="152" cy="124" r="12"/></svg>
                      <span>{formatNumber(comment.replies)} replies</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
           {/* Load More Button - Only if API supports pagination */}
            {/* 
            {comments.length > 0 && hasMoreComments && ( 
              <button 
                onClick={loadMoreComments} 
                disabled={isLoadingMore}
                className="mt-6 w-full text-center py-2 px-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-blue-600 dark:text-blue-400 font-medium rounded-lg transition-colors"
              >
                {isLoadingMore ? "Loading..." : "Show more comments"}
              </button>
            )}
            */}
        </div>
      )}
    </div>
  );
};

export default Comments;