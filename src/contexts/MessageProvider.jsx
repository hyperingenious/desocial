import { useReducer } from "react";
import { MessageContext } from "./MessageContext";
import conf from "../helpers/conf";
import appwriteService from "../appwrite/appwrite";

const initialState = {
  state: "idle",
  chat: null,
  receiver: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "setState":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export function MessageProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function initializeChat(receiverstate, userId) {
    try {
      const userDocument = await appwriteService.databases.getDocument(
        conf.databaseId, // databaseId
        conf.userCollectionId, // collectionId
        userId,
        []
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  return (
    <MessageContext.Provider value={{ state, dispatch, initializeChat }}>
      {children}
    </MessageContext.Provider>
  );
}
