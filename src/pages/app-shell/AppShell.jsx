import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AppShell as Shell, Burger, Group, Skeleton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MantineLogo } from "@mantinex/mantine-logo";
import { getUser } from "../../appwrite/auth/auth";
import CreateNew from "./CreateNew";
import CreateNewPostModal from "./CreateNewPostModal";
import { usePostContext } from "../../contexts/PostContext";

export default function AppShell() {
  const [opened, { toggle }] = useDisclosure();
  const navigate = useNavigate();

  const {
    modal: {
      modalMethods: { openCreateNewPostModal },
    },
    user:{setUserId}
  } = usePostContext();

  useEffect(function () {
    async function checkAuth() {
      await getUser(navigate, setUserId );
    }
    checkAuth();
  }, []);

  return (
    <>
      <Shell
        header={{ height: 60 }}
        footer={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        aside={{
          width: 300,
          breakpoint: "md",
          collapsed: { desktop: false, mobile: true },
        }}
        padding="md"
      >
        <Shell.Header>
          <Group h="100%" px="md" justify="space-between">
            <Group>
              <Burger
                opened={opened}
                onClick={toggle}
                hiddenFrom="sm"
                size="sm"
              />
              <MantineLogo size={30} />
            </Group>
            <CreateNew open={openCreateNewPostModal} />
          </Group>
        </Shell.Header>
        <Shell.Navbar p="md">
          Navbar
          {Array(15)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} h={28} mt="sm" animate={false} />
            ))}
        </Shell.Navbar>
        <Shell.Main>
          <Outlet />
          <CreateNewPostModal />
        </Shell.Main>
        <Shell.Aside p="md">Aside</Shell.Aside>
      </Shell>
    </>
  );
}
