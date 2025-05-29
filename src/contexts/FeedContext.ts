import { createContext, useContext } from "react";
import type { FeedContextValue } from "./FeedProvider";

export const FeedContext = createContext<FeedContextValue | null>(null);

export function useFeedContext() {
  return useContext(FeedContext);
}
