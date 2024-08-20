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
} from "@mantine/core";
import Post from "../../components/Post";
import { useEffect } from "react";
import { useProfileContext } from "../../contexts/ProfileContext";
import { useLocation, useNavigate } from "react-router-dom";
import { IconArrowLeft } from "@tabler/icons-react";

export default function Profile() {
  const { startFetchingProfiles, state, profileData, profilePostsData } =
    useProfileContext();

  const location = useLocation();
  const userId = location.pathname.split("/")[2];
const navigate = useNavigate()
  useEffect(function () {
    async function fetchProfile() {
      await startFetchingProfiles(userId);
    }
    fetchProfile();
  }, []);

  return (
    <>
      <Group>
        <ActionIcon onClick={() => navigate(-1)}
          variant="default"
          color="gray"
          size="lg"
          radius="xl"
          aria-label="Settings"
        >
          <IconArrowLeft
            style={{ width: "70%", height: "70%" }}
            stroke={1.5}
          />
        </ActionIcon>
      </Group>
      {state == "loading" ||
        (state == "idle" && <Loader color="blue" type="bars" />)}
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

function AllPosts({ postsData }) {
  return (
    <>
      <Divider mb={"xs"} />
      {postsData.map(el => 
        <Post document={el} />
      )}
    </>
  );
}

function ProfileData({ profileData }) {
  return (
    <Paper radius="md" p="lg" bg="var(--mantine-color-body)">
      <Avatar
        src={profileData.avatar_url || undefined}
        alt="profile"
        width={120}
        height={120}
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
      {/* <Text ta="center" c="dimmed" fz="sm">
        My Intersts ivle dance and cing dacing dacning only and only
      </Text> */}
      <Button variant="default" fullWidth mt="md">
        Send message
      </Button>
    </Paper>
  );
}
