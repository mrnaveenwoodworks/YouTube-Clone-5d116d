import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import VideoDetail from "./components/VideoDetail";
import SearchResults from "./components/SearchResults";
import { useApp } from "./context/AppContext";

const App = () => {
  const { state } = useApp(); // Access global state, e.g., for theme or sidebar status

  return (
    <Router>
      <div className={`flex flex-col min-h-screen ${state.theme === "dark" ? "bg-youtube-black text-white" : "bg-gray-100 text-gray-900"}`}>
        <Navbar />
        
        <div className="flex flex-1 pt-16"> {/* pt-16 for fixed Navbar height */}
          {/* Sidebar - Conditionally rendered based on global state if needed or always visible on desktop */}
          {state.sidebar.isOpen && (
             <aside className="hidden md:block fixed top-16 left-0 bottom-0 overflow-y-auto bg-white dark:bg-youtube-black border-r border-gray-200 dark:border-gray-700 transition-all duration-300" style={{ width: `${state.sidebar.width}px` }}>
              <Sidebar />
            </aside>
          )}

          {/* Main Content Area */}
          {/* Adjust margin-left based on sidebar state and visibility */}
          <main 
            className={`flex-1 transition-all duration-300 ${state.sidebar.isOpen && !state.ui.isMobileMenuOpen ? "md:ml-64" : "md:ml-0" }`} 
            style={{ marginLeft: state.sidebar.isOpen && !state.ui.isMobileMenuOpen && window.innerWidth >= 768 ? `${state.sidebar.width}px` : "0px" }}
            >
            {/* Container for route content with padding */}
            <div className="container mx-auto px-4 py-0"> {/* Reduced py for direct content display */}
              <Routes>
                <Route path="/" element={<Feed />} />
                <Route path="/video/:id" element={<VideoDetail />} />
                <Route path="/search" element={<SearchResults />} />
                {/* Add more routes for other pages like Shorts, Subscriptions, etc. */}
                <Route path="/shorts" element={<GenericPage title="Shorts" />} />
                <Route path="/subscriptions" element={<GenericPage title="Subscriptions" />} />
                <Route path="/library" element={<GenericPage title="Library" />} />
                <Route path="/history" element={<GenericPage title="History" />} />
                <Route path="/trending" element={<GenericPage title="Trending" />} />
                <Route path="/music" element={<GenericPage title="Music" />} />
                <Route path="/gaming" element={<GenericPage title="Gaming" />} />
                <Route path="/news" element={<GenericPage title="News" />} />
                <Route path="/sports" element={<GenericPage title="Sports" />} />
                <Route path="/learning" element={<GenericPage title="Learning" />} />
                <Route path="/fashion" element={<GenericPage title="Fashion & Beauty" />} /> {/* Combined for simplicity */}
                <Route path="/podcasts" element={<GenericPage title="Podcasts" />} />

                {/* Fallback for unknown routes */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
};

// Placeholder for generic pages
const GenericPage = ({ title }) => (
  <div className="flex flex-col items-center justify-center min-h-[calc(100vh-128px)] text-center p-6"> {/* 128px = Navbar (64px) + some breathing room */}
    <div className="mb-6">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="80" height="80" className="text-gray-400 dark:text-gray-500"><rect width="256" height="256" fill="none"/><path d="M24,128c0,29.91,3.07,47.45,5.41,56.47A16,16,0,0,0,39,195.42C72.52,208.35,128,208,128,208s55.48.35,89-12.58a16,16,0,0,0,9.63-10.95c2.34-9,5.41-26.56,5.41-56.47s-3.07-47.45-5.41-56.47a16,16,0,0,0-9.63-11C183.48,47.65,128,48,128,48s-55.48-.35-89,12.58a16,16,0,0,0-9.63,11C27.07,80.54,24,98.09,24,128Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/><polygon points="164 128 108 92 108 164 164 128" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/></svg>
    </div>
    <h1 className="text-3xl font-semibold mb-3">{title}</h1>
    <p className="text-gray-600 dark:text-gray-400 max-w-md">
      The "{title}" page is currently under construction. Check back soon for exciting updates!
    </p>
    <Link 
        to="/" 
        className="mt-8 px-6 py-2 bg-youtube-red text-white font-medium rounded-full hover:bg-red-700 transition-colors duration-200"
    >
        Go to Homepage
    </Link>
  </div>
);

// Placeholder for 404 Page
const NotFoundPage = () => (
  <div className="flex flex-col items-center justify-center min-h-[calc(100vh-128px)] text-center p-6">
     <div className="mb-6">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="80" height="80" className="text-red-500"><rect width="256" height="256" fill="none"/><path d="M142.41,40.22l87.46,151.87C236,202.79,228.08,216,215.46,216H40.54C27.92,216,20,202.79,26.13,192.09L113.59,40.22C119.89,29.26,136.11,29.26,142.41,40.22Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/><line x1="128" y1="136" x2="128" y2="104" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/><circle cx="128" cy="176" r="12"/></svg>
    </div>
    <h1 className="text-4xl font-bold mb-3">404 - Page Not Found</h1>
    <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8">
      Oops! The page you are looking for does not exist, might have been removed, or is temporarily unavailable.
    </p>
    <Link 
        to="/" 
        className="px-6 py-2 bg-youtube-red text-white font-medium rounded-full hover:bg-red-700 transition-colors duration-200"
    >
        Return to Homepage
    </Link>
  </div>
);


export default App;