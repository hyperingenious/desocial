import { useEffect, useState } from "react";
import authService from "../appwrite/auth/auth";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import type { Models } from "appwrite";

  type AuthContextValue = {
    setUser: React.Dispatch<
      React.SetStateAction<
        Models.Session | Models.User<Models.Preferences> | null
      >
    >;
    authState: "idle" | "loading" | "finished" | "error";
    isAuthenticated: boolean;
    user: Models.Session | Models.User<Models.Preferences> | null;
  };


export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<
    "idle" | "loading" | "finished" | "error"
  >("idle");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<
    Models.Session | Models.User<Models.Preferences> | null
  >(null);
  const navigate = useNavigate();

  useEffect(
    function () {
      async function checkAuth() {
        try {
          setAuthState("loading");
          await authService.getUser(setUser, setIsAuthenticated);
          setAuthState("finished");
        } catch (error) {
          setAuthState("error");
          console.error(error);
          navigate("/authenticate");
          throw error;
        }
      }
      checkAuth();
    },
    [navigate]
  );

  const value: AuthContextValue = {
    setUser,
    authState,
    isAuthenticated,
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export type {AuthContextValue}