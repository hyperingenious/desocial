import { useReducer } from "react";
import { FeedContext } from "./FeedContext";
import { fetchFeedPosts } from "../appwrite/feed/fetchFeedPosts";
import { useAuthContext } from "./AuthContext";

const initialState = {
  feedState: "idle",
  feedPostsData: null,
};

function reducer(state, action) {
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
      return {
        ...initialState,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}


export function FeedProvider({ children }) {
  const authContext = useAuthContext();
  const userId = authContext.user ? authContext.user.$id : null;
  const [state, dispatch] = useReducer(reducer, initialState);

  async function startFetchingFeed() {
    try {
      const data = await fetchFeedPosts(userId);

      if (!data?.documents) throw error;

      const { documents } = data;
      
      dispatch({ type: "SET_FEED_POSTS_DATA", payload: documents.reverse() });
    } catch (error) {
      console.error(error);
      dispatch({ type: "SET_FEED_STATE_ERROR" });
    }
  }

  return (
    <FeedContext.Provider value={{ state, dispatch, startFetchingFeed }}>
      {children}
    </FeedContext.Provider>
  );
}
