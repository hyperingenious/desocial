import { useReducer } from "react";
import { fetchProfileWithId } from "../appwrite/profile/fetchProfileWithId";
import { fetchAllPostsWithId } from "../appwrite/profile/fetchAllPostsWithId";
import { ProfileContext } from "./ProfileContext";

const initialState = {
  state: "idle",
  profileData: null,
  profilePostsData: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_STATE_DATA":
      return {
        ...state,
        profileData: action.payload.profileData,
        profilePostsData: action.payload.postData.documents,
        state: "finished",
      };
    case "SET_STATE_LOADING":
      return {
        ...state,
        state: "loading",
      };
    case "SET_STATE_IDLE":
      return {
        ...state,
        state: "idle",
      };
    case "SET_STATE_ERROR":
      return {
        ...state,
        state: "error",
      };
    case "CLEAN_UP":
      return {
        ...initialState,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export function ProfileProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function startFetchingProfiles(userId) {
    dispatch({ type: "SET_STATE_LOADING" });
    try {
      const postData = await fetchAllPostsWithId(userId);
      const profileData = await fetchProfileWithId(userId);
      dispatch({ type: "SET_STATE_DATA", payload: { profileData, postData } });
    } catch (error) {
      dispatch({ type: "SET_STATE_ERROR" });
      console.error(error);
      throw error;
    }
  }

  return (
    <ProfileContext.Provider value={{ ...state, dispatch, startFetchingProfiles }}>
      {children}
    </ProfileContext.Provider>
  );
}