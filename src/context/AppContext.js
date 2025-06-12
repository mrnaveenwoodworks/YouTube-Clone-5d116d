import React, { createContext, useContext, useReducer, useEffect } from "react";
import { DEFAULT_VIDEO_URL } from "../utils/api"; // Import the default video URL

// Initial state
const initialState = {
  user: null,
  theme: "light",
  sidebar: {
    isOpen: true,
    width: 240
  },
  search: {
    recentSearches: [],
    searchHistory: []
  },
  playback: {
    currentVideoId: null,
    currentVideoDetails: null,
    volume: 1,
    quality: "auto",
    playbackSpeed: 1,
    autoplay: true,
    isPlaying: false,
    progress: 0,
    duration: 0
  },
  filters: {
    selectedCategory: "all",
    sortBy: "relevance",
    uploadDate: "any",
    duration: "any",
    features: []
  },
  ui: {
    isMobileMenuOpen: false,
    isSearchBarFocused: false,
    activeModals: [],
    notifications: []
  },
  loading: {
    feed: false,
    videoDetail: false,
    searchResults: false,
    comments: false,
    suggestions: false
  },
  error: {
    globalError: null,
    componentErrors: {},
  },
  config: { // New config section
    fallbackVideo: {
      url: DEFAULT_VIDEO_URL, // Use imported constant
      id: "dQw4w9WgXcQ", // Extracted from URL for consistency if needed
      title: "Content Not Available - Enjoy this classic!",
      channelTitle: "Fallback Channel"
    }
  }
};

// Action types
const ActionTypes = {
  SET_USER: "SET_USER",
  SET_THEME: "SET_THEME",
  TOGGLE_SIDEBAR: "TOGGLE_SIDEBAR",
  SET_SIDEBAR_WIDTH: "SET_SIDEBAR_WIDTH",
  ADD_RECENT_SEARCH: "ADD_RECENT_SEARCH",
  CLEAR_SEARCH_HISTORY: "CLEAR_SEARCH_HISTORY",
  SET_CURRENT_VIDEO_ID: "SET_CURRENT_VIDEO_ID",
  SET_CURRENT_VIDEO_DETAILS: "SET_CURRENT_VIDEO_DETAILS",
  UPDATE_PLAYBACK_SETTINGS: "UPDATE_PLAYBACK_SETTINGS",
  SET_PLAYER_STATE: "SET_PLAYER_STATE",
  UPDATE_FILTERS: "UPDATE_FILTERS",
  TOGGLE_MOBILE_MENU: "TOGGLE_MOBILE_MENU",
  SET_SEARCH_BAR_FOCUS: "SET_SEARCH_BAR_FOCUS",
  PUSH_NOTIFICATION: "PUSH_NOTIFICATION",
  REMOVE_NOTIFICATION: "REMOVE_NOTIFICATION",
  TOGGLE_MODAL: "TOGGLE_MODAL",
  SET_LOADING_STATE: "SET_LOADING_STATE",
  SET_GLOBAL_ERROR: "SET_GLOBAL_ERROR",
  CLEAR_GLOBAL_ERROR: "CLEAR_GLOBAL_ERROR",
  SET_COMPONENT_ERROR: "SET_COMPONENT_ERROR",
  CLEAR_COMPONENT_ERROR: "CLEAR_COMPONENT_ERROR",
  UPDATE_FALLBACK_VIDEO_CONFIG: "UPDATE_FALLBACK_VIDEO_CONFIG" // New action type
};

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_USER:
      return { ...state, user: action.payload };
    case ActionTypes.SET_THEME:
      return { ...state, theme: action.payload };
    case ActionTypes.TOGGLE_SIDEBAR:
      return { ...state, sidebar: { ...state.sidebar, isOpen: !state.sidebar.isOpen } };
    case ActionTypes.SET_SIDEBAR_WIDTH:
      return { ...state, sidebar: { ...state.sidebar, width: action.payload } };
    case ActionTypes.ADD_RECENT_SEARCH:
      return {
        ...state,
        search: {
          ...state.search,
          recentSearches: [
            action.payload,
            ...state.search.recentSearches.filter(term => term !== action.payload)
          ].slice(0, 10)
        }
      };
    case ActionTypes.CLEAR_SEARCH_HISTORY:
      return { ...state, search: { ...state.search, recentSearches: [], searchHistory: [] } };
    case ActionTypes.SET_CURRENT_VIDEO_ID:
      return { ...state, playback: { ...state.playback, currentVideoId: action.payload, currentVideoDetails: null } };
    case ActionTypes.SET_CURRENT_VIDEO_DETAILS:
      return { ...state, playback: { ...state.playback, currentVideoDetails: action.payload } };
    case ActionTypes.UPDATE_PLAYBACK_SETTINGS:
      return { ...state, playback: { ...state.playback, ...action.payload } };
    case ActionTypes.SET_PLAYER_STATE:
      return { ...state, playback: { ...state.playback, ...action.payload } };
    case ActionTypes.UPDATE_FILTERS:
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case ActionTypes.TOGGLE_MOBILE_MENU:
      return { ...state, ui: { ...state.ui, isMobileMenuOpen: !state.ui.isMobileMenuOpen } };
    case ActionTypes.SET_SEARCH_BAR_FOCUS:
      return { ...state, ui: { ...state.ui, isSearchBarFocused: action.payload } };
    case ActionTypes.PUSH_NOTIFICATION:
      return { ...state, ui: { ...state.ui, notifications: [...state.ui.notifications, action.payload] } };
    case ActionTypes.REMOVE_NOTIFICATION:
      return { ...state, ui: { ...state.ui, notifications: state.ui.notifications.filter(n => n.id !== action.payload) } };
    case ActionTypes.TOGGLE_MODAL:
      return {
        ...state,
        ui: {
          ...state.ui,
          activeModals: action.payload.isOpen
            ? [...state.ui.activeModals, action.payload.modalId]
            : state.ui.activeModals.filter(id => id !== action.payload.modalId)
        }
      };
    case ActionTypes.SET_LOADING_STATE:
      return { ...state, loading: { ...state.loading, [action.payload.key]: action.payload.value } };
    case ActionTypes.SET_GLOBAL_ERROR:
      return { ...state, error: { ...state.error, globalError: action.payload } };
    case ActionTypes.CLEAR_GLOBAL_ERROR:
      return { ...state, error: { ...state.error, globalError: null } };
    case ActionTypes.SET_COMPONENT_ERROR:
      return {
        ...state,
        error: {
          ...state.error,
          componentErrors: {
            ...state.error.componentErrors,
            [action.payload.key]: action.payload.error
          }
        }
      };
    case ActionTypes.CLEAR_COMPONENT_ERROR:
      // eslint-disable-next-line no-case-declarations
      const { [action.payload.key]: _, ...remainingComponentErrors } = state.error.componentErrors;
      return {
        ...state,
        error: {
          ...state.error,
          componentErrors: remainingComponentErrors
        }
      };
    case ActionTypes.UPDATE_FALLBACK_VIDEO_CONFIG: // Handle new action
      return {
        ...state,
        config: {
          ...state.config,
          fallbackVideo: {
            ...state.config.fallbackVideo,
            ...action.payload
          }
        }
      };
    default:
      if (action.type.startsWith("SET_") && state.hasOwnProperty(action.type.substring(4).toLowerCase())) {
        return { ...state, [action.type.substring(4).toLowerCase()]: action.payload };
      }
      return state;
  }
};

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const persistedStateJSON = localStorage.getItem("appState");
    if (persistedStateJSON) {
      try {
        const persistedState = JSON.parse(persistedStateJSON);
        if (persistedState.theme) dispatch({ type: ActionTypes.SET_THEME, payload: persistedState.theme });
        if (persistedState.playback) {
          const { currentVideoId, currentVideoDetails, isPlaying, progress, duration, ...playbackSettings } = persistedState.playback;
          dispatch({ type: ActionTypes.UPDATE_PLAYBACK_SETTINGS, payload: playbackSettings });
        }
        if (persistedState.search && persistedState.search.recentSearches) {
          persistedState.search.recentSearches.forEach(term =>
            dispatch({ type: ActionTypes.ADD_RECENT_SEARCH, payload: term })
          );
        }
        if (persistedState.sidebar) {
          if (typeof persistedState.sidebar.isOpen === "boolean") {
            dispatch({ type: "SET_SIDEBAR_STATE_FROM_PERSISTENCE", payload: persistedState.sidebar }); // Custom type for clarity
          }
        }
        if (persistedState.config && persistedState.config.fallbackVideo) { // Load persisted fallback config
            dispatch({ type: ActionTypes.UPDATE_FALLBACK_VIDEO_CONFIG, payload: persistedState.config.fallbackVideo });
        }
      } catch (error) {
        console.error("Error loading persisted state from localStorage:", error);
        localStorage.removeItem("appState");
      }
    }
  }, []);

  useEffect(() => {
    const stateToPersist = {
      theme: state.theme,
      playback: {
        volume: state.playback.volume,
        quality: state.playback.quality,
        playbackSpeed: state.playback.playbackSpeed,
        autoplay: state.playback.autoplay
      },
      search: {
        recentSearches: state.search.recentSearches
      },
      sidebar: {
        isOpen: state.sidebar.isOpen,
        width: state.sidebar.width
      },
      config: { // Persist config including fallback video
        fallbackVideo: state.config.fallbackVideo
      }
    };
    localStorage.setItem("appState", JSON.stringify(stateToPersist));
  }, [state.theme, state.playback, state.search.recentSearches, state.sidebar, state.config.fallbackVideo]);

  const actions = {
    setUser: (user) => dispatch({ type: ActionTypes.SET_USER, payload: user }),
    setTheme: (theme) => dispatch({ type: ActionTypes.SET_THEME, payload: theme }),
    toggleSidebar: () => dispatch({ type: ActionTypes.TOGGLE_SIDEBAR }),
    setSidebarWidth: (width) => dispatch({ type: ActionTypes.SET_SIDEBAR_WIDTH, payload: width }),
    addRecentSearch: (term) => dispatch({ type: ActionTypes.ADD_RECENT_SEARCH, payload: term }),
    clearSearchHistory: () => dispatch({ type: ActionTypes.CLEAR_SEARCH_HISTORY }),
    setCurrentVideoId: (videoId) => dispatch({ type: ActionTypes.SET_CURRENT_VIDEO_ID, payload: videoId }),
    setCurrentVideoDetails: (videoDetails) => dispatch({ type: ActionTypes.SET_CURRENT_VIDEO_DETAILS, payload: videoDetails }),
    updatePlaybackSettings: (settings) => dispatch({ type: ActionTypes.UPDATE_PLAYBACK_SETTINGS, payload: settings }),
    setPlayerState: (playerState) => dispatch({ type: ActionTypes.SET_PLAYER_STATE, payload: playerState }),
    updateFilters: (filters) => dispatch({ type: ActionTypes.UPDATE_FILTERS, payload: filters }),
    toggleMobileMenu: () => dispatch({ type: ActionTypes.TOGGLE_MOBILE_MENU }),
    setSearchBarFocus: (isFocused) => dispatch({ type: ActionTypes.SET_SEARCH_BAR_FOCUS, payload: isFocused }),
    pushNotification: (notification) => {
      const id = Date.now() + Math.random();
      dispatch({ type: ActionTypes.PUSH_NOTIFICATION, payload: { ...notification, id } });
      setTimeout(() => dispatch({ type: ActionTypes.REMOVE_NOTIFICATION, payload: id }), notification.duration || 5000);
    },
    removeNotification: (id) => dispatch({ type: ActionTypes.REMOVE_NOTIFICATION, payload: id }),
    toggleModal: (modalId, isOpen) => dispatch({ type: ActionTypes.TOGGLE_MODAL, payload: { modalId, isOpen } }),
    setLoadingState: (key, value) => dispatch({ type: ActionTypes.SET_LOADING_STATE, payload: { key, value } }),
    setGlobalError: (error) => dispatch({ type: ActionTypes.SET_GLOBAL_ERROR, payload: error }),
    clearGlobalError: () => dispatch({ type: ActionTypes.CLEAR_GLOBAL_ERROR }),
    setComponentError: (key, error) => dispatch({ type: ActionTypes.SET_COMPONENT_ERROR, payload: { key, error } }),
    clearComponentError: (key) => dispatch({ type: ActionTypes.CLEAR_COMPONENT_ERROR, payload: { key } }),
    updateFallbackVideoConfig: (config) => dispatch({ type: ActionTypes.UPDATE_FALLBACK_VIDEO_CONFIG, payload: config}) // New action dispatcher
  };

  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

export default AppContext;