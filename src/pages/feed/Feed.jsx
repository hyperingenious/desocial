import { useEffect } from "react";
import Post from "../../components/Post";
import { useFeedContext } from "../../contexts/FeedContext"; // Fix the typo and ensure the import path is correct
import { Loader, Stack, Text } from "@mantine/core";
import { useAuthContext } from "../../contexts/AuthContext";

function Feed() {
  const { isAuthenticated } = useAuthContext();
  const {
    startFetchingFeed,
    state: { feedState, feedPostsData },
  } = useFeedContext(); // Destructure the necessary state or methods
useEffect(() => {
    if (!isAuthenticated) return;
    async function fetchPosts() {
      await startFetchingFeed();
    }
    fetchPosts();
  }, [isAuthenticated]);

  if (feedState === "idle") {
    return (
      <Stack
        h={300}
        bg="var(--mantine-color-body)"
        align="center"
        justify="center"
        gap="md"
      >
        <Loader color="blue" type="oval" />
      </Stack>
    );
  }

  if (feedState === "loading") {
    return (
      <Stack
        h={300}
        bg="var(--mantine-color-body)"
        align="center"
        justify="center"
        gap="md"
      >
        <Loader color="blue" type="oval" />
      </Stack>
    );
  }

  if (feedState === "error") {
    return <Text>Error fetching posts</Text>;
  }

  if (feedState === "finished") {
    return (
      <Stack spacing="md">
        {feedPostsData.map((document) => 
         <Post key={document.$id} document={document} />
        )}
      </Stack>
    );
  }
}

export default Feed;
