import {
  Avatar,
  Text,
  Button,
  Paper,
  Divider,
  Badge,
  Loader,
  Group,
  ActionIcon,
  Center,
} from "@mantine/core";
import Post from "../../components/Post";
import { useEffect } from "react";
import { useProfileContext } from "../../contexts/ProfileContext";
import { useLocation, useNavigate } from "react-router-dom";
import { IconArrowLeft } from "@tabler/icons-react";
import type { Models } from "appwrite";

export default function Profile() {
  const profileContext = useProfileContext();

  if (!profileContext) {
    return (
      <Center maw={400} h={100}>
        <Text>Profile context not available</Text>
      </Center>
    );
  }

  const { startFetchingProfiles, state, profileData, profilePostsData } =
    profileContext;

  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProfile() {
      await startFetchingProfiles(userId);
    }
    fetchProfile();
  }, [userId, startFetchingProfiles]);

  return (
    <>
      <Group>
        <ActionIcon
          onClick={() => navigate(-1)}
          variant="default"
          color="gray"
          size="lg"
          radius="xl"
          m={"xs"}
          aria-label="Settings"
        >
          <IconArrowLeft style={{ width: "70%", height: "70%" }} stroke={1.5} />
        </ActionIcon>
      </Group>
      {state == "loading" && (
        <Center maw={400} h={100}>
          <Loader color="blue" type="oval" />
        </Center>
      )}
      {state == "idle" && (
        <Center maw={400} h={100}>
          <Loader color="blue" type="oval" />
        </Center>
      )}
      {state == "finished" && profileData && profilePostsData && (
        <>
          <ProfileData profileData={profileData} />
          <AllPosts postsData={profilePostsData} />
        </>
      )}
      {state === "error" && <Text>Error</Text>}
    </>
  );
}

interface PostData {
  $id: string;
  // Add other post properties as needed
}

interface ProfileDataProps {
  profileData: Models.Document;
}

function AllPosts({ postsData }: { postsData: PostData[] }) {
  return (
    <>
      <Divider mb={"xs"} />
      {postsData.map((el) => (
        <Post key={el.$id} document={el} />
      ))}
    </>
  );
}

function ProfileData({ profileData }: ProfileDataProps) {
  return (
    <Paper radius="md" p="lg" bg="var(--mantine-color-body)">
      <Avatar
        src={profileData.avatar_url || undefined}
        alt="profile"
        size={120}
        radius={120}
        mx="auto"
      />

      <Text my={"xs"} style={{ display: "flex", justifyContent: "center" }}>
        <Badge variant="light" size="lg" color="gray">
          {profileData.course}
          {""}
          {profileData.semester}
        </Badge>
      </Text>
      <Text ta="center" fz="lg" fw={500}>
        {profileData.name}
      </Text>
      <Button radius={"lg"} variant="default" fullWidth mt="md">
        Send message
      </Button>
    </Paper>
  );
}
