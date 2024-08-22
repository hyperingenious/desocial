import {
  Card,
  Group,
  Text,
  Menu,
  ActionIcon,
  Image,
  rem,
  Avatar,
  Stack,
  Tooltip,
  Divider,
  Modal,
} from "@mantine/core";
import {
  IconDots,
  IconEye,
  IconFileZip,
  IconHeart,
  IconMessageCircle,
  IconTrash,
} from "@tabler/icons-react";
import {
  formatDateToCustomString,
  intToRoman,
} from "../helpers/little_helpers";
import { Link } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

function Post({ document }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [currentZoomedImage, setCurrentZoomedImage] = useState(null);
  
  function handleImageClick() {
    open(); 
    setCurrentZoomedImage(document?.image_url);
  }
  return (
    <>
      <Modal
        centered
        styles={{header: {display:'none'}, body: { padding: 0 } }}
        opened={opened}
        onClose={close}
      >
        <Image radius="sm"  src={currentZoomedImage} />
      </Modal>
      <Card radius="md">
        <Card.Section inheritPadding py={"xs"}>
          <Group style={{ alignItems: "flex-start" }} wrap="nowrap">
            <Link
              style={{ textDecoration: "none" }}
              to={`/profile/${document?.user?.$id}`}
            >
              {document.user.avatar_url && (
                <Avatar src={document.user.avatar_url} alt={"user"} />
              )}
              {!document?.user.avatar_url && <Avatar radius="xl" />}
            </Link>

            <Stack w={"100%"} gap={0} mr={"sm"}>
              <Group p={0} m={0} justify="space-between">
                <Group bg="var(--mantine-color-body)">
                  <Text
                    fw={500}
                    size="md"
                    c={"black"}
                    style={{
                      textDecoration: "none",
                      fontFamily: "TwitterFont, sans-serif",
                    }}
                  >
                    {document?.user?.name}
                  </Text>
                  <Text size="xs" c={"dimmed"}>
                    {document?.user?.course}{" "}
                    {intToRoman(Number(document?.user?.semester))}
                  </Text>
                </Group>
                <Menu
                  withinPortal
                  position="bottom-end"
                  radius={"lg"}
                  shadow="sm"
                >
                  <Menu.Target>
                    <ActionIcon variant="subtle" radius={"xl"} color="gray">
                      <IconDots style={{ width: rem(16), height: rem(16) }} />
                    </ActionIcon>
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Item
                      leftSection={
                        <IconFileZip
                          style={{ width: rem(14), height: rem(14) }}
                        />
                      }
                    >
                      Download zip
                    </Menu.Item>
                    <Menu.Item
                      leftSection={
                        <IconEye style={{ width: rem(14), height: rem(14) }} />
                      }
                    >
                      Preview all
                    </Menu.Item>
                    <Menu.Item
                      leftSection={
                        <IconTrash
                          style={{ width: rem(14), height: rem(14) }}
                        />
                      }
                      color="red"
                    >
                      Delete all
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>

              <Text c="black" size="md">
                {document?.post_text}
              </Text>
              {document?.image_url && (
                <Card.Section mt="xs" px={"sm"} mb={0} shadow={"sm"}>
                  <Image
                    style={{ cursor: "pointer" }}
                    radius="lg"
                    miw={250}
                    maw={300}
                    h={200}
                    onClick={handleImageClick}
                    src={document?.image_url}
                  />
                </Card.Section>
              )}

              <Card.Section px={"sm"} pt={"5"} shadow={"sm"}>
                <Text
                  size="xs"
                  style={{ marginLeft: "5px" }}
                  c="dimmed"
                  fw={"normal"}
                >
                  {document?.$createdAt &&
                    formatDateToCustomString(document?.$createdAt)}
                </Text>
              </Card.Section>

              <Card.Section px={"sm"} mt={"5"} pb={"sm"} shadow={"sm"}>
                <Group>
                  <Group gap={0}>
                    <ActionIcon variant="subtle" color="gray" radius={"xl"}>
                      <Tooltip label="Comment" color="dark" position="bottom">
                        <IconMessageCircle size={"24"} color="gray" />
                      </Tooltip>
                    </ActionIcon>
                    <Text size="xs" c="gray" fw={600}>
                      12
                    </Text>
                  </Group>
                  <Group gap={0}>
                    <ActionIcon variant="subtle" color="gray" radius={"xl"}>
                      <Tooltip label="Like" color="dark" position="bottom">
                        <IconHeart size={"24"} color="gray" />
                      </Tooltip>
                    </ActionIcon>
                    <Text size="xs" c="gray" fw={600}>
                      12
                    </Text>
                  </Group>
                </Group>
              </Card.Section>
            </Stack>
          </Group>
        </Card.Section>
      </Card>
      <Divider />
    </>
  );
}

export default Post;
