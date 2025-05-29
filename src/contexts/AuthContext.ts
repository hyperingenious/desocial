import { createContext, useContext } from "react";
import type { AuthContextValue } from "./AuthProvider";

// Create the AuthContext
export const AuthContext = createContext<AuthContextValue | null>(null);

// Custom hook to use the AuthContext
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("usePostContext must be used within a PostProvider");
  }
  return useContext(AuthContext);
}
