import { createContext, useContext } from "react";

// Create the AuthContext
export const FeedContext = createContext();

// Custom hook to use the AuthContext
export function useFeedContext() {
  return useContext(FeedContext);
}
