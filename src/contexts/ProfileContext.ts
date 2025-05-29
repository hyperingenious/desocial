import { createContext, useContext } from "react";
import { type ProfileContextValue } from "./ProfileProvider";

export const ProfileContext = createContext<ProfileContextValue | null>(null);

export function useProfileContext() {
  return useContext(ProfileContext);
}
