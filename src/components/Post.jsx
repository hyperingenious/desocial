import {
  Card,
  Group,
  Text,
  Menu,
  ActionIcon,
  Image,
   rem,
  Avatar,
  Badge,
  Title,
  Stack,
 } from "@mantine/core";
import {
  IconDots,
  IconEye,
  IconFileZip,
  IconHeart,
  IconMessageCircle,
  IconTrash,
} from "@tabler/icons-react";

function Post() {
  return (
    <Card withBorder radius="md" mb={'xs'}>
      <Card.Section inheritPadding py="xs">
        <Group justify="space-between">
          <Group gap={"xs"} justify="flex-start">
            <Avatar
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png"
              alt="it's me"
            />

            <Stack
              bg="var(--mantine-color-body)"
              align="flex-start"
              justify="start"
              gap="0"
            >
              <Title order={6}>Bablesh Khalifa</Title>
              <Badge size="xs" variant="light" color="grape">
                BCA I
              </Badge>
            </Stack>
          </Group>

          <Menu withinPortal position="bottom-end" shadow="sm">
            <Menu.Target>
              <ActionIcon variant="subtle" color="gray">
                <IconDots style={{ width: rem(16), height: rem(16) }} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                leftSection={
                  <IconFileZip style={{ width: rem(14), height: rem(14) }} />
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
                  <IconTrash style={{ width: rem(14), height: rem(14) }} />
                }
                color="red"
              >
                Delete all
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Card.Section>

      <Text c="dark" size="sm">
        <Text span inherit c="var(--mantine-color-anchor)">
          200+ images uploaded
        </Text>{" "}
        since last visit, review them to select which one should be added to
        your gallery
      </Text>

      <Card.Section mt="sm" px={"sm"} mb={0} shadow={"sm"}>
        <Image
          radius="sm"
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-4.png"
        />
      </Card.Section>

      <Card.Section px={"sm"} pt={'5'} shadow={"sm"}>
        <Text size="xs" c="dark" fw={600}>
          5:41 PM · Aug 13, 2024
        </Text>
      </Card.Section>


      <Card.Section px={"sm"} mt={'5'} pb={"sm"} shadow={"sm"}>
        <Group>
          <Group gap={0}>
            <IconMessageCircle size={'20'} color="var(--mantine-color-dark-text)" />
            <Text size="xs" c="dark" fw={600}>
              12
            </Text>
          </Group>
          <Group gap={0}>
            <IconHeart size={'20'}  color="var(--mantine-color-dark-text)" />
            <Text size="xs" c="dark" fw={600}>
              12
            </Text>
          </Group>
        </Group>
      </Card.Section>
    </Card>
  );
}

export default Post;
