import { createContext, useContext } from "react";

// Create the AuthContext
export const MessageContext = createContext();

// Custom hook to use the AuthContext
export function useMessageContext() {
  return useContext(MessageContext);
}
