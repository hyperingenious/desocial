import { useDisclosure } from "@mantine/hooks";
import { PostContext } from "./PostContext";
import { useState } from "react";
import { creatPost } from "../appwrite/create/createPost";
 
export function PostProvider({ children }) {
  const [postState, setPostState] = useState("idle");
  const [image, setImage] = useState(null);
  const [
    createNewPostModalState,
    { open: openCreateNewPostModal, close: closeCreateNewPostModal },
  ] = useDisclosure(false);

  const [userId, setUserId] = useState(null);

  function cleanUp() {
    closeCreateNewPostModal();
    setPostState("idle" );
    setImage(null);
  }

  async function handleCreateNewPost({ postText , setPostText}) {
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

  const value = {
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
    user: { setUserId, userId },
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}
