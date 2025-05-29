import { createContext, useContext } from 'react';
import type { PostContextValue } from './PostProvider';

export const PostContext = createContext<PostContextValue | null>(null);

export function usePostContext() {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePostContext must be used within a PostProvider');
  }
  return context;
}
