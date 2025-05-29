import { useEffect } from "react";
import Post from "../../components/Post";
import { useFeedContext } from "../../contexts/FeedContext";
import { Loader, Stack, Text } from "@mantine/core";
import { useAuthContext } from "../../contexts/AuthContext";

function Feed() {
  const auth = useAuthContext();
  const feed = useFeedContext();

  if (!auth || !feed) {
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

  const { isAuthenticated } = auth;
  const {
    startFetchingFeed,
    state: { feedState, feedPostsData },
  } = feed;

  useEffect(() => {
    if (!isAuthenticated) {
      startFetchingFeed();
    }
  }, [isAuthenticated, startFetchingFeed]);

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

  if (feedState === "finished" && feedPostsData) {
    return (
      <Stack gap="md">
        {feedPostsData.map((document) => (
          <Post key={document.$id} document={document} />
        ))}
      </Stack>
    );
  }
}

export default Feed;
