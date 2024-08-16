import { Button, Menu, rem } from "@mantine/core";
import { IconCash, IconPlus, IconUsersGroup } from "@tabler/icons-react";

function CreateNew({ open }) {
    return (
      <Menu shadow="md" width={200} radius={'lg'}>
        <Menu.Target>
          <Button
            leftSection={<IconPlus size={14} />}
            variant="outline"
            color="dark"
            size="xs"
            radius={"xl"}
          >
            Create
          </Button>
        </Menu.Target>
  
        <Menu.Dropdown>
          <Menu.Item
            onClick={open}
            leftSection={<IconPlus style={{ width: rem(14), height: rem(14) }} />}
          >
            Create Post
          </Menu.Item>
          <Menu.Item
            leftSection={
              <IconUsersGroup style={{ width: rem(14), height: rem(14) }} />
            }
          >
            Create Group
          </Menu.Item>
          <Menu.Item
            leftSection={<IconCash style={{ width: rem(14), height: rem(14) }} />}
          >
            Fundraise
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    );
  }

  export default CreateNew;