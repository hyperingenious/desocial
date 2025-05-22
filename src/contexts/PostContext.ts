import  { createContext, useContext } from 'react';

// Create the AuthContext
export const PostContext = createContext();

// Custom hook to use the AuthContext
export function usePostContext() {
  return useContext(PostContext);
}
