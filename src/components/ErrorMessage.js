import React from "react";
import { Link } from "react-router-dom";

const DefaultErrorIllustration = () => (
  <div className="mb-6 text-red-500 dark:text-red-400">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="80" height="80" className="fill-current">
      <rect width="256" height="256" fill="none"/>
      <path d="M142.41,40.22l87.46,151.87A16,16,0,0,1,215.46,216H40.54a16,16,0,0,1-14.41-23.91L113.59,40.22a16,16,0,0,1,28.82,0Z" opacity="0.2"/>
      <path d="M142.41,40.22l87.46,151.87A16,16,0,0,1,215.46,216H40.54a16,16,0,0,1-14.41-23.91L113.59,40.22a16,16,0,0,1,28.82,0Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
      <line x1="128" y1="104" x2="128" y2="144" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
      <circle cx="128" cy="180" r="12"/>
    </svg>
  </div>
);

const ErrorMessage = ({
  title = "Oops! Something went wrong.",
  message = "We encountered an unexpected issue. Please try again or contact support if the problem persists.",
  illustration, // Custom illustration component or SVG element
  actions, // Array of { text: string, onClick: function, to: string (optional for Link), primary: boolean (optional) }
  details, // Optional string or component for displaying technical error details
  containerClassName = "min-h-[calc(100vh-200px)]", // Allows customization of min-height for different contexts
}) => {
  const IllustrationComponent = illustration || DefaultErrorIllustration;

  const defaultActions = [
    {
      text: "Try Again",
      onClick: () => window.location.reload(),
      primary: false,
    },
    {
      text: "Go Home",
      to: "/",
      primary: true,
    },
  ];

  const finalActions = actions && actions.length > 0 ? actions : defaultActions;

  return (
    <div className={`flex flex-col items-center justify-center text-center p-6 ${containerClassName}`}>
      <IllustrationComponent />
      
      <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-gray-800 dark:text-white">
        {title}
      </h2>
      
      <p className="text-gray-600 dark:text-gray-300 max-w-lg mb-6">
        {message}
      </p>

      {details && (
        <div className="mb-6 p-3 bg-gray-100 dark:bg-gray-700 rounded-md text-xs text-gray-500 dark:text-gray-400 max-w-md w-full overflow-x-auto">
          <p className="font-mono whitespace-pre-wrap">{typeof details === "string" ? details : <pre>{JSON.stringify(details, null, 2)}</pre>}</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4">
        {finalActions.map((action, index) => (
          action.to ? (
            <Link
              key={index}
              to={action.to}
              onClick={action.onClick} // Allow onClick even for Links
              className={`px-6 py-2.5 rounded-full font-semibold transition-colors duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                action.primary || (index === finalActions.length -1 && finalActions.length > 1) // Make last button primary if not specified
                  ? "bg-youtube-red text-white hover:bg-red-700 focus:ring-red-500"
                  : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500 focus:ring-gray-400"
              }`}
            >
              {action.text}
            </Link>
          ) : (
            <button
              key={index}
              onClick={action.onClick}
              className={`px-6 py-2.5 rounded-full font-semibold transition-colors duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                action.primary
                  ? "bg-youtube-red text-white hover:bg-red-700 focus:ring-red-500"
                  : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500 focus:ring-gray-400"
              }`}
            >
              {action.text}
            </button>
          )
        ))}
      </div>
    </div>
  );
};

export default ErrorMessage;