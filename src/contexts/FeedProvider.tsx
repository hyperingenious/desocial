import { useReducer } from "react";
import { FeedContext } from "./FeedContext";
import { fetchFeedPosts } from "../appwrite/feed/fetchFeedPosts";
import type { Models } from "appwrite";

type FeedState = "idle" | "loading" | "error" | "finished";

type InitialState = {
  feedState: FeedState;
  feedPostsData: Models.Document[] | null;
};

const initialState: InitialState = {
  feedState: "idle",
  feedPostsData: null,
};

type Action =
  | { type: "SET_FEED_STATE_LOADING" }
  | { type: "SET_FEED_STATE_IDLE" }
  | { type: "SET_FEED_STATE_ERROR" }
  | { type: "SET_FEED_POSTS_DATA"; payload: Models.Document[] }
  | { type: "CLEAN_UP" };

function reducer(state: InitialState, action: Action): InitialState {
  switch (action.type) {
    case "SET_FEED_STATE_LOADING":
      return { ...state, feedState: "loading" };
    case "SET_FEED_STATE_IDLE":
      return { ...state, feedState: "idle" };
    case "SET_FEED_STATE_ERROR":
      return { ...state, feedState: "error" };
    case "SET_FEED_POSTS_DATA":
      return {
        ...state,
        feedPostsData: action.payload,
        feedState: "finished",
      };
    case "CLEAN_UP":
      return initialState;
    default:
      throw new Error(`Unhandled action type: ${(action as Action).type}`);
  }
}

type FeedContextValue = {
  state: InitialState;
  dispatch: React.ActionDispatch<[action: Action]>;
  startFetchingFeed: () => Promise<void>;
};

export function FeedProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  async function startFetchingFeed(): Promise<void> {
    try {
      const data = await fetchFeedPosts();
      if (!data?.documents) {
        throw new Error("Something went wrong with the data");
      }
      const { documents } = data;

      dispatch({
        type: "SET_FEED_POSTS_DATA",
        payload: documents.reverse() as Models.Document[],
      });
    } catch (error) {
      console.error(error);
      dispatch({ type: "SET_FEED_STATE_ERROR" });
    }
  }

  const value: FeedContextValue = { state, dispatch, startFetchingFeed };
  return <FeedContext.Provider value={value}>{children}</FeedContext.Provider>;
}

export type { FeedContextValue };