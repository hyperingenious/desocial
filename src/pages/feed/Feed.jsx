import { useEffect } from "react";
import Post from "../../components/Post";
import { useFeedContext } from "../../contexts/FeedContext"; // Fix the typo and ensure the import path is correct
import { Group, Loader, Stack, Text } from "@mantine/core";

function Feed() {
  const {
    startFetchingFeed,
    state: { feedState, feedPostsData },
  } = useFeedContext(); // Destructure the necessary state or methods

  useEffect(() => {
    async function fetchPosts() {
      await startFetchingFeed();
    }
    fetchPosts();
  }, []);

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
      <>
        <div>
          {feedPostsData.map((document) => {
            if (!document?.user) return;
            return <Post key={document.$id} document={document} />;
          })}
        </div>
      </>
    );
  }
}

export default Feed;
