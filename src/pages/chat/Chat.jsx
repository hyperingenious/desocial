import {
  Avatar,
  Button,
  Center,
  Group,
  rem,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { IconSend2 } from "@tabler/icons-react";
import { useEffect } from "react";
import { useMessageContext } from "../../contexts/MessageContext";
import { usePostContext } from "../../contexts/PostContext";

export default function Chat() {
  const { state, dispatch, initializeChat } = useMessageContext();
  const thestate = usePostContext()

  useEffect(() => {
    async function hhi() {
      await initializeChat(userId);
    }
    hhi();
  }, []);

  const sendIconLeft = (
    <IconSend2 color="black" style={{ width: rem(16), height: rem(16) }} />
  );
  
  return (
    <>
      <Group
        bg={"#f1f3f5"}
        m={"sm"}
        styles={{ root: { borderRadius: "100px" } }}
        gap={"xs"}
        p={"xs"}
      >
        <Avatar
          size={"sm"}
          src="https://yt3.ggpht.com/ytc/AIdro_m05oPc8I5nhz_ej6JdKoxA6vglaI76AMqtDELBj1s2o0o=s68-c-k-c0x00ffffff-no-rj"
          alt="it's me"
        />
        <Text size="sm" fw={500}>
          Saurav's Alt
        </Text>
      </Group>
      <Stack
        h={300}
        p={"xs"}
        bg="var(--mantine-color-body)"
        align="stretch"
        justify="center"
        gap={5}
      >
        <Group variant="default" justify="flex-end">
          <Button variant="filled" size="sm" radius="xl">
            That is just for test
          </Button>
        </Group>
        <Group variant="default">
          <Button variant="filled" size="sm" radius="xl">
            Button
          </Button>
        </Group>
        <Group variant="default" justify="flex-end">
          <Button variant="filled" size="sm" radius="xl">
            Button
          </Button>
        </Group>
      </Stack>

      <Center w={"100%"} pos={"fixed"} bottom={"0"}>
        <TextInput
          styles={{ input: { border: "none", fontSize: "12px" } }}
          w={"100%"}
          miw={300}
          maw={400}
          m={"sm"}
          leftSectionleftSectionPointerEvents="none"
          rightSection={sendIconLeft}
          size="md"
          variant="filled"
          radius="xl"
          placeholder="Input placeholder"
        />
      </Center>
    </>
  );
}
