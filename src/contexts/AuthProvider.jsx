import { useEffect, useState } from "react";
import authService from "../appwrite/auth/auth";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState("idle");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
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

  const value = {
    authState,
    isAuthenticated,
    user,
  };

    return (
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}
