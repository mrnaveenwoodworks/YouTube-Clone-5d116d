import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const [showMore, setShowMore] = useState(false);

  const mainCategories = [
    { id: "home", label: "Home", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><path d="M40,216H216V120a8,8,0,0,0-2.34-5.66l-80-80a8,8,0,0,0-11.32,0l-80,80A8,8,0,0,0,40,120Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/></svg>, path: "/" },
    { id: "shorts", label: "Shorts", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><rect x="32" y="48" width="192" height="120" rx="8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><line x1="32" y1="208" x2="224" y2="208" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><polygon points="148 108 116 88 116 128 148 108" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/></svg>, path: "/shorts" },
    { id: "subscriptions", label: "Subscriptions", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><rect x="48" y="120" width="88" height="88" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><path d="M208,188v12a8,8,0,0,1-8,8H180" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><line x1="208" y1="116" x2="208" y2="140" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><path d="M184,48h16a8,8,0,0,1,8,8V72" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><line x1="116" y1="48" x2="140" y2="48" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><path d="M48,76V56a8,8,0,0,1,8-8H68" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/></svg>, path: "/subscriptions" }
  ];

  const exploreCategories = [
    { id: "trending", label: "Trending", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><path d="M112,96l26.27-72C159.86,41.92,208,88.15,208,144a80,80,0,0,1-160,0c0-30.57,14.42-58.26,31-80Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/></svg>, path: "/trending" },
    { id: "music", label: "Music", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><circle cx="88" cy="184" r="40" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><polyline points="128 184 128 40 208 64" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/></svg>, path: "/music" },
    { id: "gaming", label: "Gaming", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><line x1="152" y1="104" x2="176" y2="104" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><line x1="72" y1="104" x2="104" y2="104" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><line x1="88" y1="88" x2="88" y2="120" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><path d="M105.91,152,63.8,199.8a28,28,0,0,1-47.37-24.66L32.79,91a52,52,0,0,1,51.1-43H172a52,52,0,1,1,0,104Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><path d="M150.09,152l42.11,47.8a28,28,0,0,0,47.37-24.66L223.21,91" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/></svg>, path: "/gaming" },
    { id: "news", label: "News", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><path d="M16,88v92a20,20,0,0,0,20,20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><line x1="104" y1="108" x2="176" y2="108" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><line x1="104" y1="148" x2="176" y2="148" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><path d="M56,180V64a8,8,0,0,1,8-8H216a8,8,0,0,1,8,8V184a16,16,0,0,1-16,16H36A20,20,0,0,0,56,180Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/></svg>, path: "/news" },
    { id: "sports", label: "Sports", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><path d="M127.83,32A96,96,0,0,1,32,127.83" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><path d="M224,128.17A96,96,0,0,0,128.17,224" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/></svg>, path: "/sports" }
  ];

  const subscriptions = [
    {
      id: "tech123",
      name: "Tech Masters",
      avatar: "https://images.unsplash.com/photo-1499914485622-a88fac536970?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDk3MjMzNzF8&ixlib=rb-4.1.0&q=80&w=1080",
      isLive: true
    },
    {
      id: "cooking456",
      name: "Cooking Guide",
      avatar: "https://images.unsplash.com/photo-1499125650409-2c437d5cca77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDk3MjMzNzJ8&ixlib=rb-4.1.0&q=80&w=1080",
      isLive: false
    },
    {
      id: "fitness789",
      name: "Fitness Pro",
      avatar: "https://images.unsplash.com/photo-1586401100295-7a8096fd231a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDk3MjMzNzJ8&ixlib=rb-4.1.0&q=80&w=1080",
      isLive: true
    },
    {
      id: "travel101",
      name: "Travel Adventures",
      avatar: "https://images.unsplash.com/photo-1504752509934-8b4044d2135f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Mzk2MDh8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDk3MjMzNzN8&ixlib=rb-4.1.0&q=80&w=1080",
      isLive: false
    }
  ];

  const moreCategories = [
    { id: "library", label: "Library", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><rect x="48" y="40" width="64" height="176" rx="8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><path d="M217.67,205.77l-46.81,10a8,8,0,0,1-9.5-6.21L128.18,51.8a8.07,8.07,0,0,1,6.15-9.57l46.81-10a8,8,0,0,1,9.5,6.21L223.82,196.2A8.07,8.07,0,0,1,217.67,205.77Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><line x1="48" y1="76" x2="112" y2="76" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><line x1="48" y1="180" x2="112" y2="180" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><line x1="133.99" y1="79.42" x2="196.44" y2="66" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><line x1="141.45" y1="114.93" x2="203.91" y2="101.51" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><line x1="155.56" y1="182" x2="218.01" y2="168.58" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/></svg>, path: "/library" },
    { id: "history", label: "History", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><polyline points="128 72 128 128 184 128" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/></svg>, path: "/history" },
    { id: "watchLater", label: "Watch Later", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><polyline points="128 72 128 128 184 128" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/></svg>, path: "/playlist/watch-later" },
    { id: "liked", label: "Liked Videos", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><path d="M32,104H80a0,0,0,0,1,0,0V208a0,0,0,0,1,0,0H32a8,8,0,0,1-8-8V112A8,8,0,0,1,32,104Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><path d="M80,104l40-80a32,32,0,0,1,32,32V80h64a16,16,0,0,1,15.87,18l-12,96A16,16,0,0,1,204,208H80" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/></svg>, path: "/playlist/liked" },
    { id: "downloads", label: "Downloads", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><rect x="40" y="40" width="176" height="176" rx="8" transform="translate(0 256) rotate(-90)" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><polyline points="96 112 96 160 144 160" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/><line x1="160" y1="96" x2="96" y2="160" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/></svg>, path: "/downloads" }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const footerLinksPrimary = [
    { label: "About", path: "/about" },
    { label: "Press", path: "/press" },
    { label: "Copyright", path: "/copyright" },
    { label: "Contact us", path: "/contact" },
    { label: "Creators", path: "/creators" },
    { label: "Advertise", path: "/advertise" },
    { label: "Developers", path: "/developers" },
  ];

  const footerLinksSecondary = [
    { label: "Terms", path: "/terms" },
    { label: "Privacy", path: "/privacy" },
    { label: "Policy & Safety", path: "/policy-safety" },
    { label: "How YouTube works", path: "/how-youtube-works" },
    { label: "Test new features", path: "/new" },
  ];

  return (
    <aside className="w-64 fixed top-16 left-0 bottom-0 bg-white overflow-y-auto hidden md:block border-r border-gray-200">
      <div className="px-2 py-4">
        {/* Main Categories */}
        <div className="mb-4">
          {mainCategories.map((category) => (
            <Link
              key={category.id}
              to={category.path}
              className={`flex items-center px-3 py-2 rounded-lg text-sm ${
                isActive(category.path)
                  ? "bg-gray-100 font-medium"
                  : "hover:bg-gray-100"
              }`}
            >
              <span className="mr-6">{category.icon}</span>
              <span>{category.label}</span>
            </Link>
          ))}
        </div>

        <div className="border-t border-gray-200 my-2"></div>

        {/* Explore Section */}
        <div className="mb-4">
          <h3 className="px-3 py-2 text-sm font-medium text-gray-500">Explore</h3>
          {exploreCategories.map((category) => (
            <Link
              key={category.id}
              to={category.path}
              className={`flex items-center px-3 py-2 rounded-lg text-sm ${
                isActive(category.path)
                  ? "bg-gray-100 font-medium"
                  : "hover:bg-gray-100"
              }`}
            >
              <span className="mr-6">{category.icon}</span>
              <span>{category.label}</span>
            </Link>
          ))}
        </div>

        <div className="border-t border-gray-200 my-2"></div>

        {/* Subscriptions Section */}
        <div className="mb-4">
          <h3 className="px-3 py-2 text-sm font-medium text-gray-500">Subscriptions</h3>
          {subscriptions.map((subscription) => (
            <Link
              key={subscription.id}
              to={`/channel/${subscription.id}`}
              className={`flex items-center px-3 py-2 rounded-lg text-sm ${
                isActive(`/channel/${subscription.id}`)
                  ? "bg-gray-100"
                  : "hover:bg-gray-100"
              }`}
            >
              <div className="w-6 h-6 rounded-full overflow-hidden relative mr-6 flex-shrink-0">
                <img
                  src={subscription.avatar || "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200"}
                  alt={`${subscription.name} channel avatar`}
                  className="w-full h-full object-cover"
                />
                {subscription.isLive && (
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <span className="truncate">{subscription.name}</span>
            </Link>
          ))}
          <button
            onClick={() => setShowMore(!showMore)}
            className="flex items-center px-3 py-2 w-full text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            <span className="mr-6">
              {showMore ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><polyline points="48 152 128 88 208 152" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><polyline points="48 104 128 168 208 104" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"/></svg>
              )}
            </span>
            {showMore ? "Show less" : `Show ${moreCategories.length} more`}
          </button>
        </div>

        {/* More Categories (conditionally rendered) */}
        {showMore && (
          <>
            <div className="border-t border-gray-200 my-2"></div>
            <div className="mb-4">
              {moreCategories.map((category) => (
                <Link
                  key={category.id}
                  to={category.path}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm ${
                    isActive(category.path)
                      ? "bg-gray-100 font-medium"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <span className="mr-6">{category.icon}</span>
                  <span>{category.label}</span>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* Footer Links */}
        <div className="px-3 py-4 text-xs text-gray-500">
          <div className="flex flex-wrap gap-x-2 gap-y-1 mb-2">
            {footerLinksPrimary.map(link => (
              <Link key={link.label} to={link.path} className="hover:text-gray-700">{link.label}</Link>
            ))}
          </div>
          <div className="flex flex-wrap gap-x-2 gap-y-1">
            {footerLinksSecondary.map(link => (
              <Link key={link.label} to={link.path} className="hover:text-gray-700">{link.label}</Link>
            ))}
          </div>
          <div className="mt-4">
            © {new Date().getFullYear()} Google LLC
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;