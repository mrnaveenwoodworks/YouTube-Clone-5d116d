import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchContainerRef = useRef(null);
  const navigate = useNavigate();

  // Mock suggestions data - in a real app, this would come from an API
  const mockSuggestions = [
    "react tutorial",
    "react hooks explained",
    "react project ideas",
    "react vs angular",
    "react native tutorial",
    "react router dom",
    "react context api",
    "react performance optimization"
  ];

  useEffect(() => {
    // Load search history from localStorage
    const history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    setSearchHistory(history);

    // Add click outside listener
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const getSuggestions = async () => {
      if (searchTerm.trim()) {
        setIsLoading(true);
        try {
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 300));
          
          // Filter mock suggestions based on search term
          const filtered = mockSuggestions.filter(suggestion =>
            suggestion.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setSuggestions(filtered);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
          setSuggestions([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSuggestions([]);
      }
    };

    const debounceTimer = setTimeout(getSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm, mockSuggestions]);

  const handleSearch = (term) => {
    if (!term.trim()) return;

    // Update search history
    const newHistory = [
      term,
      ...searchHistory.filter(item => item !== term)
    ].slice(0, 10);
    
    setSearchHistory(newHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
    
    // Navigate to search results
    navigate(`/search?q=${encodeURIComponent(term)}`);
    setShowSuggestions(false);
    setSearchTerm(term);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem("searchHistory");
  };

  const removeFromHistory = (term) => {
    const newHistory = searchHistory.filter(item => item !== term);
    setSearchHistory(newHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
  };

  return (
    <div ref={searchContainerRef} className="relative flex-1 max-w-2xl">
      <form onSubmit={handleSubmit} className="flex w-full">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={handleKeyDown}
            placeholder="Search"
            className="w-full px-4 py-2 pl-10 bg-gray-100 border border-gray-300 rounded-l-full focus:outline-none focus:border-blue-500 focus:bg-white"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><circle cx="112" cy="112" r="80" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><line x1="168.57" y1="168.57" x2="224" y2="224" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/></svg>
          </div>
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-full hover:bg-gray-200 focus:outline-none"
          aria-label="Search"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><circle cx="112" cy="112" r="80" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><line x1="168.57" y1="168.57" x2="224" y2="224" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/></svg>
        </button>
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && (searchTerm || searchHistory.length > 0) && (
        <div className="absolute w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">
              <div className="animate-spin inline-block w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full"></div>
            </div>
          ) : (
            <div className="py-2">
              {/* Search Suggestions */}
              {searchTerm && suggestions.map((suggestion, index) => (
                <button
                  key={`suggestion-${index}`}
                  onClick={() => handleSearch(suggestion)}
                  className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100"
                >
                  <span className="mr-3 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><circle cx="112" cy="112" r="80" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><line x1="168.57" y1="168.57" x2="224" y2="224" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/></svg>
                  </span>
                  <span>{suggestion}</span>
                </button>
              ))}

              {/* Search History */}
              {!searchTerm && searchHistory.length > 0 && (
                <div>
                  <div className="flex items-center justify-between px-4 py-2 text-sm text-gray-500">
                    <span>Recent searches</span>
                    <button
                      onClick={clearHistory}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Clear all
                    </button>
                  </div>
                  {searchHistory.map((term, index) => (
                    <div
                      key={`history-${index}`}
                      className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 group"
                    >
                      <button
                        onClick={() => handleSearch(term)}
                        className="flex items-center flex-1 text-left"
                      >
                        <span className="mr-3 text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><polyline points="176 104 128 128 128 72" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><path d="M160,224c3.67-13.8,16.6-24,32-24s28.33,10.2,32,24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><circle cx="192" cy="176" r="24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><path d="M116,223.26A96,96,0,1,1,223.26,116" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/></svg>
                        </span>
                        <span>{term}</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFromHistory(term);
                        }}
                        className="p-1 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100"
                        aria-label={`Remove ${term} from history`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><line x1="200" y1="56" x2="56" y2="200" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><line x1="200" y1="200" x2="56" y2="56" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/></svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* No Results */}
              {searchTerm && suggestions.length === 0 && !isLoading && (
                <div className="px-4 py-2 text-gray-500">
                  No suggestions found
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;