import { useReducer } from "react";
import { fetchProfileWithId } from "../appwrite/profile/fetchProfileWithId";
import { fetchAllPostsWithId } from "../appwrite/profile/fetchAllPostsWithId";
import { ProfileContext } from "./ProfileContext";
import type { Models } from "appwrite";

type InitialState = {
  state: "idle" | "error" | "loading" | "finished";
  profileData: Models.Document | null;
  profilePostsData: Models.Document[] | null;
};

const initialState: InitialState = {
  state: "idle",
  profileData: null,
  profilePostsData: null,
};

type Action =
  | {
      type: "SET_STATE_DATA";
      payload: {
        profileData: Models.Document;
        postData: {
          documents: Models.Document[];
          total: number;
        };
      };
    }
  | { type: "SET_STATE_LOADING" }
  | { type: "SET_STATE_IDLE" }
  | { type: "SET_STATE_ERROR" }
  | { type: "CLEAN_UP" };

function reducer(state: InitialState, action: Action): InitialState {
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
      throw new Error(`Unhandled action type: ${(action as Action).type}`);
  }
}

type ProfileContextValue = {
  state: "idle" | "error" | "loading" | "finished";
  profileData: Models.Document | null;
  profilePostsData: Models.Document[] | null;
  dispatch: React.ActionDispatch<[action: Action]>;
  startFetchingProfiles: (userId: string) => Promise<void>;
};

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function startFetchingProfiles(userId: string): Promise<void> {
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

  const value: ProfileContextValue = {
    ...state,
    dispatch,
    startFetchingProfiles,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}

export type { ProfileContextValue };
