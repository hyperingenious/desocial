import { useDisclosure } from "@mantine/hooks";
import { PostContext } from "./PostContext";
import { useState } from "react";
import { creatPost } from "../appwrite/create/createPost";
import { useAuthContext } from "./AuthContext";
import type { FileWithPath } from "@mantine/dropzone";

type PostContextValue = {
  image: {
    image: null | {
      file: FileWithPath;
      url: string;
    };
    setImage: React.Dispatch<
      React.SetStateAction<null | {
        file: FileWithPath;
        url: string;
      }>
    >;
  };
  post: {
    postState: "loading" | "finished" | "idle" | "error";
    setPostState: React.Dispatch<
      React.SetStateAction<"loading" | "finished" | "idle" | "error">
    >;
  };
  modal: {
    modalState: boolean;
    modalMethods: {
      openCreateNewPostModal: () => void;
      closeCreateNewPostModal: () => void;
    };
  };
  handleCreateNewPost: (params: {
    postText: string;
    setPostText: React.Dispatch<React.SetStateAction<string>>;
  }) => Promise<void>;
};

export function PostProvider({ children }: { children: React.ReactNode }) {
  const authContext = useAuthContext();
  const userId = authContext.user ? authContext.user.$id : null;

  const [postState, setPostState] = useState<
    "loading" | "finished" | "idle" | "error"
  >("idle");
  const [image, setImage] = useState<null | {
    file: FileWithPath;
    url: string;
  }>(null);

  const [
    createNewPostModalState,
    { open: openCreateNewPostModal, close: closeCreateNewPostModal },
  ] = useDisclosure(false);

  function cleanUp() {
    closeCreateNewPostModal();
    setPostState("idle");
    setImage(null);
  }

  async function handleCreateNewPost({
    postText,
    setPostText,
  }: {
    postText: string;
    setPostText: React.Dispatch<React.SetStateAction<string>>;
  }) {
    if (!postText.length || postText.length > 280) return;

    try {
      setPostState("loading");
      await creatPost({ image: image?.file, postText, userId });
      setPostState("finished");

      cleanUp();
      setPostText("");
    } catch (err) {
      setPostState("error");
      console.error(err);
      throw err;
    }
  }
  const value: PostContextValue = {
    image: { image, setImage },
    post: { postState, setPostState },
    modal: {
      modalState: createNewPostModalState,
      modalMethods: {
        openCreateNewPostModal,
        closeCreateNewPostModal,
      },
    },
    handleCreateNewPost,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}
export type { PostContextValue };
