import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  AppShell as Shell,
  Burger,
  Group,
  Skeleton,
  Center,
  Loader,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import CreateNew from "./CreateNew";
import CreateNewPostModal from "./CreateNewPostModal";
import { usePostContext } from "../../contexts/PostContext";
import { useAuthContext } from "../../contexts/AuthContext";

export default function AppShell() {
  const auth = useAuthContext();
  const navigate = useNavigate();

  let isAuthenticated;
  let authState;

  if (auth !== null) {
    isAuthenticated = auth.isAuthenticated;
    authState = auth.authState;
  }

  useEffect(
    function () {
      if (auth !== null) {
        const { isAuthenticated, authState } = auth;
        if (authState === "error") {
          navigate("/authenticate");
          return;
        }
        if (isAuthenticated && window.location.pathname === "/") {
          navigate("/feed");
        }
      }
    },
    [auth, navigate]
  );

  return (
    <>
      {isAuthenticated && <ShellContent />}
      {authState === "loading" && (
        <Center h={100}>
          <Loader color="blue" type="oval" />
        </Center>
      )}
    </>
  );
}

function ShellContent() {
  const [opened, { toggle }] = useDisclosure();
  const {
    modal: {
      modalMethods: { openCreateNewPostModal },
    },
  } = usePostContext();

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
              <svg
                width="40"
                height="40"
                viewBox="0 0 1820 1820"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="910" cy="910" r="910" fill="#0047FF" />
                <path
                  d="M825.659 801.652C866.426 758.037 748.426 358.269 825.659 284.269C902.892 210.269 938.891 239.269 950.082 284.269C961.273 329.268 950.082 801.652 950.082 801.652L1374.89 1032.27C1374.89 1032.27 1404.89 1106.27 1328.39 1074.17C1251.89 1042.08 982.082 852.153 950.082 926.269C918.082 1000.38 1007.5 1404 1036 1401C1064.5 1398 1467.39 1189 1328.39 1300.5C1189.39 1412 1198.39 1428.27 1078.39 1554.27C958.393 1680.27 938.891 1331.04 889.892 1344.77C840.892 1358.49 798.892 1540.27 741.392 1537.77C683.892 1535.27 640.999 1472 682 1472C723.001 1472 798.891 1353.27 798.891 1334.77C798.891 1316.27 809.427 927.268 825.659 875.767C841.891 824.266 511.892 1076.27 478.873 1074.17C445.855 1072.08 428.892 1061.77 445.392 1020.77C461.892 979.766 784.892 845.266 825.659 801.652Z"
                  fill="white"
                />
              </svg>
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
        <Shell.Main
          style={{
            paddingInlineEnd: "calc(var(--app-shell-aside-offset, 0rem))",
            paddingInlineStart: "calc(var(--app-shell-navbar-offset, 0rem)",
            paddingTop: "calc(var(--app-shell-header-offset, 0rem))",
          }}
        >
          <Outlet />
          <CreateNewPostModal />
        </Shell.Main>
        <Shell.Aside p="md">Aside</Shell.Aside>
      </Shell>
    </>
  );
}
