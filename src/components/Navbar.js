import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".user-dropdown") && !event.target.closest(".user-avatar")) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header className={`fixed top-0 left-0 right-0 bg-white z-20 ${isScrolled ? "shadow-md" : ""}`}>
      <div className="max-w-screen-2xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left Section - Logo and Menu Toggle */}
        <div className="flex items-center space-x-4">
          {/* Menu Toggle Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-full hover:bg-gray-200"
            aria-label="Toggle mobile menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><polyline points="24 180 68 164 108 180 148 164 188 180 232 164" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><line x1="24" y1="128" x2="232" y2="128" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><path d="M208,172.73V184a32,32,0,0,1-32,32H80a32,32,0,0,1-32-32V171.27" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><path d="M48.2,92a8,8,0,0,1-7.83-10.29C49.49,53.24,85.26,32,128,32s78.52,21.25,87.63,49.73A8,8,0,0,1,207.8,92Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/></svg>
          </button>
          
          {/* YouTube Logo */}
          <Link to="/" className="flex items-center" aria-label="YouTube Home">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="90" height="20"><rect width="256" height="256" fill="none"/><polygon points="164 128 108 92 108 164 164 128" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><path d="M24,128c0,29.91,3.07,47.45,5.41,56.47A16,16,0,0,0,39,195.42C72.52,208.35,128,208,128,208s55.48.35,89-12.58a16,16,0,0,0,9.63-10.95c2.34-9,5.41-26.56,5.41-56.47s-3.07-47.45-5.41-56.47a16,16,0,0,0-9.63-11C183.48,47.65,128,48,128,48s-55.48-.35-89,12.58a16,16,0,0,0-9.63,11C27.07,80.54,24,98.09,24,128Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/></svg>
          </Link>
        </div>
        
        {/* Middle Section - Search */}
        <SearchBar />
        
        {/* Right Section - Icons and User */}
        <div className="flex items-center space-x-2">
          {/* Upload Video */}
          <button className="p-2 rounded-full hover:bg-gray-200 hidden sm:block" aria-label="Upload video">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><polyline points="148 32 148 92 208 92" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><path d="M196,224h4a8,8,0,0,0,8-8V88L152,32H56a8,8,0,0,0-8,8v68" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><rect x="40" y="152" width="76" height="64" rx="8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><polyline points="116 172 152 152 152 216 116 196" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/></svg>
          </button>
          
          {/* Notifications */}
          <button className="p-2 rounded-full hover:bg-gray-200 hidden sm:block relative" aria-label="Notifications">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><line x1="96" y1="228" x2="160" y2="228" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><path d="M184,24a102.71,102.71,0,0,1,36.29,40" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><path d="M35.71,64A102.71,102.71,0,0,1,72,24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><path d="M52,188a8,8,0,0,1-6.38-12.81C53.85,164.49,63.84,144.6,64,112a64,64,0,0,1,128,0c.16,32.6,10.15,52.49,18.35,63.19A8,8,0,0,1,204,188Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/></svg>
            <span className="absolute top-1 right-1 bg-youtube-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              5
            </span>
          </button>
          
          {/* User Profile */}
          <div className="relative">
            <button 
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="user-avatar w-8 h-8 rounded-full overflow-hidden border border-gray-200 hover:border-gray-300"
              aria-label="User menu"
              aria-expanded={showUserDropdown}
              aria-haspopup="true"
            >
              <img src="https://images.unsplash.com/photo-1681802992384-3df9b2b52eab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDk3MjMyMjd8&ixlib=rb-4.1.0&q=80&w=1080" alt="professional headshot profile" className="w-full h-full object-cover"/>
            </button>
            
            {/* User Dropdown */}
            {showUserDropdown && (
              <div className="user-dropdown absolute right-0 top-full mt-2 w-72 bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 z-30">
                <div className="p-4 border-b border-gray-200 flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1743094039376-ed088679db40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDk3MjMyMjd8&ixlib=rb-4.1.0&q=80&w=1080" alt="professional headshot close-up" className="w-full h-full object-cover"/>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">John Developer</h3>
                    <p className="text-gray-500 text-xs">johndeveloper@example.com</p>
                    <Link to="/account/manage" className="text-blue-600 text-xs hover:text-blue-800">Manage your Google Account</Link>
                  </div>
                </div>
                
                <div className="py-2">
                  {[
                    { icon: "user", text: "Your channel", link: "/channel/me" },
                    { icon: "video", text: "Your videos", link: "/my-videos" },
                    { icon: "cog", text: "Settings", link: "/settings" },
                    { icon: "help", text: "Help & feedback", link: "/help" },
                    { icon: "appearance", text: "Appearance", action: () => { /* Implement appearance change */ } },
                    { icon: "logout", text: "Sign out", action: () => { /* Implement sign out */ } }
                  ].map((item, index) => (
                    item.link ? (
                      <Link
                        key={index}
                        to={item.link}
                        className="flex items-center px-4 py-2 w-full hover:bg-gray-100 text-sm"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><polygon points="76 48 24 84 76 120 128 84 76 48" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><polygon points="180 48 128 84 180 120 232 84 180 48" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><polygon points="76 120 24 156 76 192 128 156 76 120" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><polygon points="180 120 128 156 180 192 232 156 180 120" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><polyline points="111.14 216.32 128 228 144.86 216.32" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/></svg>
                        <span className="ml-3">{item.text}</span>
                      </Link>
                    ) : (
                      <button 
                        key={index}
                        onClick={item.action}
                        className="flex items-center px-4 py-2 w-full hover:bg-gray-100 text-sm text-left"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><polygon points="76 48 24 84 76 120 128 84 76 48" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><polygon points="180 48 128 84 180 120 232 84 180 48" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><polygon points="76 120 24 156 76 192 128 156 76 120" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><polygon points="180 120 128 156 180 192 232 156 180 120" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><polyline points="111.14 216.32 128 228 144.86 216.32" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/></svg>
                        <span className="ml-3">{item.text}</span>
                      </button>
                    )
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile Menu (Slide In) */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-white z-30 shadow-lg transform transition-transform duration-300 ${
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="p-4 flex items-center space-x-6 border-b border-gray-200">
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 rounded-full hover:bg-gray-200"
            aria-label="Close mobile menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><rect x="88" y="88" width="80" height="80" rx="12"/></svg>
          </button>
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} aria-label="YouTube Home">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="90" height="20"><rect width="256" height="256" fill="none"/><polygon points="164 128 108 92 108 164 164 128" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><path d="M24,128c0,29.91,3.07,47.45,5.41,56.47A16,16,0,0,0,39,195.42C72.52,208.35,128,208,128,208s55.48.35,89-12.58a16,16,0,0,0,9.63-10.95c2.34-9,5.41-26.56,5.41-56.47s-3.07-47.45-5.41-56.47a16,16,0,0,0-9.63-11C183.48,47.65,128,48,128,48s-55.48-.35-89,12.58a16,16,0,0,0-9.63,11C27.07,80.54,24,98.09,24,128Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/></svg>
          </Link>
        </div>
        
        <nav className="py-2">
          {[
            { icon: "home", text: "Home", link: "/" },
            { icon: "explore", text: "Explore", link: "/explore" },
            { icon: "subscriptions", text: "Subscriptions", link: "/subscriptions" },
            { icon: "library", text: "Library", link: "/library" },
            { icon: "history", text: "History", link: "/history" }
          ].map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="flex items-center px-6 py-3 hover:bg-gray-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><polygon points="76 48 24 84 76 120 128 84 76 48" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><polygon points="180 48 128 84 180 120 232 84 180 48" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><polygon points="76 120 24 156 76 192 128 156 76 120" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><polygon points="180 120 128 156 180 192 232 156 180 120" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><polyline points="111.14 216.32 128 228 144.86 216.32" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/></svg>
              <span className="ml-6 text-sm">{item.text}</span>
            </Link>
          ))}
        </nav>
        
        <div className="border-t border-gray-200 py-4 px-6">
          <h3 className="font-medium text-base mb-2">Subscriptions</h3>
          {[
            { name: "Web Dev Simplified", avatar: "https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDk3MjMyNjl8&ixlib=rb-4.1.0&q=80&w=1080", new: true },
            { name: "Coding Addict", avatar: "https://images.unsplash.com/photo-1683142028215-8529d43701fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDk3MjMyNjl8&ixlib=rb-4.1.0&q=80&w=1080", new: false },
            { name: "Traversy Media", avatar: "https://images.unsplash.com/34/BA1yLjNnQCI1yisIZGEi_2013-07-16_1922_IMG_9873.jpg?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDk3MjMyNzB8&ixlib=rb-4.1.0&q=80&w=1080", new: true },
            { name: "The Net Ninja", avatar: "https://images.unsplash.com/photo-1471400974796-1c823d00a96f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDk3MjMyNzB8&ixlib=rb-4.1.0&q=80&w=1080", new: false }
          ].map((channel, index) => (
            <Link
              key={index}
              to={`/channel/${channel.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="flex items-center py-2 hover:bg-gray-100 rounded px-2"
            >
              <div className="w-6 h-6 rounded-full overflow-hidden relative">
                <img src={channel.avatar} alt={channel.name} className="w-full h-full object-cover" />
                {channel.new && (
                  <span className="absolute top-0 right-0 w-2 h-2 bg-blue-500 rounded-full"></span>
                )}
              </div>
              <span className="ml-4 text-sm">{channel.name}</span>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Overlay when mobile menu is open */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </header>
  );
};

export default Navbar;