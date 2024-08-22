import { createContext, useContext } from "react";

// Create the AuthContext
export const AuthContext = createContext();

// Custom hook to use the AuthContext
export function useAuthContext() {
  return useContext(AuthContext);
}