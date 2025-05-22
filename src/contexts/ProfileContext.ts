import { createContext, useContext } from "react";

export const ProfileContext = createContext();

export function useProfileContext() {
  return useContext(ProfileContext);
}
