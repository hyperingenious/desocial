import {
  Avatar,
  Button,
  Group,
  Image,
  Modal,
  rem,
  Stack,
  Textarea,
  Text,
  Loader,
  ActionIcon,
} from "@mantine/core";
import { IconPhotoPlus, IconUpload, IconX } from "@tabler/icons-react";
import {
  Dropzone,
  IMAGE_MIME_TYPE,
  type FileWithPath,
} from "@mantine/dropzone";
import { usePostContext } from "../../contexts/PostContext";
import { useState } from "react";

export default function CreateNewPostModal() {
  const {
    image: { image, setImage },
    post: { postState },
    modal: {
      modalState: createNewPostModalState,
      modalMethods: { closeCreateNewPostModal },
    },
    handleCreateNewPost,
  } = usePostContext();

  const [postText, setPostText] = useState("");

  return (
    <Modal
      styles={{
        header: {
          display: "none",
        },
      }}
      radius={"lg"}
      opened={createNewPostModalState}
      onClose={closeCreateNewPostModal}
      centered
    >
      <Stack gap={"0"} pt={"sm"}>
        <Avatar
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png"
          alt="it's me"
        />
        <Textarea
          onChange={(e) => {
            setPostText(e.target.value);
          }}
          value={postText}
          variant="unstyled"
          size="md"
          styles={{ input: { height: "150px" } }}
          placeholder="Try share someting..."
        />
        <Group gap={"xs"} justify="space-between">
          {image ? (
            <Group gap={5}>
              <IconX
                onClick={() => setImage(() => null)}
                size={14}
                cursor={"pointer"}
              />
              <Image
                radius="xs"
                h={25}
                w={"auto"}
                fit="cover"
                src={image.url}
              />
            </Group>
          ) : (
            <DZ setImage={setImage} />
          )}
          <Text c={"dimmed"} size="sm" fw={500} mr={5}>
            <span
              style={{ color: `${postText.length > 280 ? "red" : "gray"}` }}
            >
              {postText.length}
            </span>
            /280
          </Text>
        </Group>
        <Group justify="flex-end" mt={"xs"}>
          <Button
            variant="gradient"
            onClick={() => handleCreateNewPost({ postText, setPostText })}
            disabled={!postText.length || postText.length > 280 ? true : false}
            radius={"xl"}
            size="sm"
            color="dark"
          >
            {postState === "loading" && (
              <Loader color="rgba(255, 255, 255, 1)" size={"md"} type="dots" />
            )}
            {postState !== "loading" && "Create Post"}
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}

function DZ({
  setImage,
}: {
  setImage: React.Dispatch<
    React.SetStateAction<{
      file: FileWithPath;
      url: string;
    } | null>
  >;
}) {
  return (
    <Dropzone
      onDrop={(files) => {
        const file = files[0];
        const url = URL.createObjectURL(file);
        setImage({ url, file });
      }}
      onReject={(files) => files}
      maxSize={5 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
      styles={{
        root: {
          padding: 0,
          border: "none",
        },
      }}
    >
      <Dropzone.Accept>
        <IconUpload
          style={{
            width: rem(52),
            height: rem(52),
            color: "var(--mantine-color-blue-6)",
          }}
          stroke={1.5}
        />
      </Dropzone.Accept>
      <Dropzone.Reject>
        <IconX
          style={{
            width: rem(52),
            height: rem(52),
            color: "var(--mantine-color-red-6)",
          }}
          stroke={1.5}
        />
      </Dropzone.Reject>
      <Dropzone.Idle>
        <Group>
          <ActionIcon
            variant="light"
            size="xl"
            radius="xl"
            aria-label="Settings"
          >
            <IconPhotoPlus
              style={{ width: "70%", height: "70%" }}
              stroke={1.5}
            />
          </ActionIcon>
        </Group>
      </Dropzone.Idle>
    </Dropzone>
  );
}
